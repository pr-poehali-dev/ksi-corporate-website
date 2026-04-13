import json
import os
import hashlib

import psycopg2
import psycopg2.extras


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
}

DATABASE_URL = os.environ.get("DATABASE_URL", "")


def make_response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps(body, default=str),
    }


def get_db():
    return psycopg2.connect(DATABASE_URL)


def get_current_user(event, cur):
    headers = event.get("headers") or {}
    auth = headers.get("X-Authorization", "") or headers.get("x-authorization", "")
    if not auth.startswith("Bearer "):
        return None
    token = auth[7:]
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    cur.execute(
        "SELECT u.id, u.email, u.full_name, u.user_type, u.internal_role, u.status "
        "FROM user_sessions s JOIN users u ON u.id = s.user_id "
        "WHERE s.token_hash = %s AND s.expires_at > NOW()",
        (token_hash,),
    )
    row = cur.fetchone()
    if not row:
        return None
    return {
        "id": str(row[0]), "email": row[1], "full_name": row[2],
        "user_type": row[3], "internal_role": row[4], "status": row[5],
    }


def get_query_param(event, name, default=None):
    params = event.get("queryStringParameters") or {}
    return params.get(name, default)


def handler(event: dict, context) -> dict:
    """Просмотр журнала аудита (только для администраторов)."""
    method = event.get("httpMethod", event.get("method", ""))
    if method == "OPTIONS":
        return make_response(200, {})

    if method != "GET":
        return make_response(405, {"error": "Method not allowed"})

    conn = None
    try:
        conn = get_db()
        cur = conn.cursor()
        user = get_current_user(event, cur)
        if not user:
            return make_response(401, {"error": "Unauthorized"})

        if user["user_type"] != "internal":
            return make_response(403, {"error": "Only internal users can access audit log"})

        page = int(get_query_param(event, "page", "1"))
        per_page = min(int(get_query_param(event, "per_page", "50")), 100)
        offset = (page - 1) * per_page

        conditions = []
        params = []

        user_id_filter = get_query_param(event, "user_id")
        if user_id_filter:
            conditions.append("a.user_id = %s")
            params.append(user_id_filter)

        entity_type_filter = get_query_param(event, "entity_type")
        if entity_type_filter:
            conditions.append("a.entity_type = %s")
            params.append(entity_type_filter)

        action_filter = get_query_param(event, "action")
        if action_filter:
            conditions.append("a.action = %s")
            params.append(action_filter)

        date_from = get_query_param(event, "date_from")
        if date_from:
            conditions.append("a.created_at >= %s")
            params.append(date_from)

        date_to = get_query_param(event, "date_to")
        if date_to:
            conditions.append("a.created_at <= %s")
            params.append(date_to)

        where_clause = ("WHERE " + " AND ".join(conditions)) if conditions else ""

        cur.execute(f"SELECT COUNT(*) FROM audit_log a {where_clause}", params)
        total = cur.fetchone()[0]

        cur.execute(
            f"SELECT a.id, a.user_id, a.action, a.entity_type, a.entity_id, "
            f"a.details, a.created_at, "
            f"u.full_name as user_name, u.email as user_email "
            f"FROM audit_log a "
            f"LEFT JOIN users u ON u.id = a.user_id "
            f"{where_clause} "
            f"ORDER BY a.created_at DESC LIMIT %s OFFSET %s",
            params + [per_page, offset],
        )

        columns = [desc[0] for desc in cur.description]
        items = []
        for row in cur.fetchall():
            r = dict(zip(columns, row))
            # Парсим details
            details = r["details"]
            if isinstance(details, str):
                try:
                    details = json.loads(details)
                except (json.JSONDecodeError, ValueError):
                    pass

            items.append({
                "id": str(r["id"]),
                "user_id": str(r["user_id"]) if r["user_id"] else None,
                "user_name": r["user_name"],
                "user_email": r["user_email"],
                "action": r["action"],
                "entity_type": r["entity_type"],
                "entity_id": str(r["entity_id"]) if r["entity_id"] else None,
                "details": details,
                "created_at": str(r["created_at"]),
            })

        return make_response(200, {
            "items": items, "total": total, "page": page, "per_page": per_page,
        })

    except Exception as exc:
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()
