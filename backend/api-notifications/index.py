import json
import os
import hashlib
from datetime import datetime, timezone

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


def parse_body(event):
    raw_body = event.get("body")
    if raw_body is None or raw_body == "":
        return {}
    if isinstance(raw_body, str):
        try:
            return json.loads(raw_body)
        except (json.JSONDecodeError, ValueError):
            return None
    if isinstance(raw_body, dict):
        return raw_body
    return {}


def handler(event: dict, context) -> dict:
    """Управление уведомлениями: получение списка и отметка как прочитанных."""
    method = event.get("httpMethod", event.get("method", ""))
    if method == "OPTIONS":
        return make_response(200, {})

    conn = None
    try:
        conn = get_db()
        cur = conn.cursor()
        user = get_current_user(event, cur)
        if not user:
            return make_response(401, {"error": "Unauthorized"})

        if method == "GET":
            return handle_get(event, cur, user)
        elif method == "POST":
            result = handle_post(event, cur, user)
            conn.commit()
            return result
        else:
            return make_response(405, {"error": "Method not allowed"})

    except Exception as exc:
        if conn:
            conn.rollback()
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()


def handle_get(event, cur, user):
    """Получение списка уведомлений для текущего пользователя."""
    unread_only = get_query_param(event, "unread_only", "false").lower() == "true"
    page = int(get_query_param(event, "page", "1"))
    per_page = min(int(get_query_param(event, "per_page", "50")), 100)
    offset = (page - 1) * per_page

    conditions = ["n.user_id = %s"]
    params = [user["id"]]

    if unread_only:
        conditions.append("n.is_read = false")

    where_clause = "WHERE " + " AND ".join(conditions)

    cur.execute(f"SELECT COUNT(*) FROM notifications n {where_clause}", params)
    total = cur.fetchone()[0]

    # Количество непрочитанных
    cur.execute(
        "SELECT COUNT(*) FROM notifications WHERE user_id = %s AND is_read = false",
        (user["id"],),
    )
    unread_count = cur.fetchone()[0]

    cur.execute(
        f"SELECT n.id, n.title, n.message, n.notification_type, n.is_read, "
        f"n.entity_type, n.entity_id, n.created_at "
        f"FROM notifications n {where_clause} "
        f"ORDER BY n.created_at DESC LIMIT %s OFFSET %s",
        params + [per_page, offset],
    )

    columns = [desc[0] for desc in cur.description]
    items = []
    for row in cur.fetchall():
        r = dict(zip(columns, row))
        items.append({
            "id": str(r["id"]),
            "title": r["title"],
            "message": r["message"],
            "notification_type": r["notification_type"],
            "is_read": r["is_read"],
            "entity_type": r["entity_type"],
            "entity_id": str(r["entity_id"]) if r["entity_id"] else None,
            "created_at": str(r["created_at"]),
        })

    return make_response(200, {
        "items": items,
        "total": total,
        "unread_count": unread_count,
        "page": page,
        "per_page": per_page,
    })


def handle_post(event, cur, user):
    """Отметка уведомлений как прочитанных."""
    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    now = datetime.now(timezone.utc)

    if body.get("all"):
        # Пометить все как прочитанные
        cur.execute(
            "UPDATE notifications SET is_read = true, read_at = %s "
            "WHERE user_id = %s AND is_read = false",
            (now, user["id"]),
        )
        marked = cur.rowcount
        return make_response(200, {"success": True, "marked_read": marked})

    notification_id = body.get("id")
    if not notification_id:
        return make_response(400, {"error": "Notification id or {all: true} is required"})

    cur.execute(
        "UPDATE notifications SET is_read = true, read_at = %s "
        "WHERE id = %s AND user_id = %s",
        (now, notification_id, user["id"]),
    )

    if cur.rowcount == 0:
        return make_response(404, {"error": "Notification not found"})

    return make_response(200, {"success": True, "id": notification_id})
