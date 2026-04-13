import json
import os
import hashlib
import uuid
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
    """Управление компаниями: список, создание, обновление."""
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
        elif method == "PUT":
            result = handle_put(event, cur, user)
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
    """Получение списка компаний с пагинацией и фильтрами."""
    page = int(get_query_param(event, "page", "1"))
    per_page = min(int(get_query_param(event, "per_page", "20")), 100)
    offset = (page - 1) * per_page

    status_filter = get_query_param(event, "status")
    type_filter = get_query_param(event, "type")
    search = get_query_param(event, "search")

    conditions = []
    params = []

    if user["user_type"] == "client":
        # Клиент видит только свою компанию
        cur.execute(
            "SELECT company_id FROM company_users WHERE user_id = %s LIMIT 1",
            (user["id"],),
        )
        row = cur.fetchone()
        if not row:
            return make_response(200, {"items": [], "total": 0, "page": page, "per_page": per_page})
        conditions.append("c.id = %s")
        params.append(str(row[0]))

    if status_filter:
        conditions.append("c.status = %s")
        params.append(status_filter)

    if type_filter:
        conditions.append("c.company_type = %s")
        params.append(type_filter)

    if search:
        conditions.append("c.name ILIKE %s")
        params.append(f"%{search}%")

    where_clause = ("WHERE " + " AND ".join(conditions)) if conditions else ""

    # Total count
    cur.execute(f"SELECT COUNT(*) FROM companies c {where_clause}", params)
    total = cur.fetchone()[0]

    # Fetch page
    cur.execute(
        f"SELECT c.id, c.name, c.inn, c.ogrn, c.company_type, c.status, "
        f"c.contact_person, c.contact_email, c.contact_phone, "
        f"c.balance_available, c.balance_reserved, c.bonus_balance, c.bonus_expires_at, "
        f"c.created_at "
        f"FROM companies c {where_clause} "
        f"ORDER BY c.created_at DESC LIMIT %s OFFSET %s",
        params + [per_page, offset],
    )
    items = []
    for r in cur.fetchall():
        items.append({
            "id": str(r[0]), "name": r[1], "inn": r[2], "ogrn": r[3],
            "company_type": r[4], "status": r[5],
            "contact_person": r[6], "contact_email": r[7], "contact_phone": r[8],
            "balance": {
                "available": float(r[9]) if r[9] else 0,
                "reserved": float(r[10]) if r[10] else 0,
                "bonus": float(r[11]) if r[11] else 0,
                "bonus_expires_at": str(r[12]) if r[12] else None,
            },
            "created_at": str(r[13]),
        })

    return make_response(200, {
        "items": items, "total": total, "page": page, "per_page": per_page,
    })


def handle_post(event, cur, user):
    """Создание новой компании (только для администратора)."""
    if user["user_type"] != "internal":
        return make_response(403, {"error": "Only internal users can create companies"})

    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    name = (body.get("name") or "").strip()
    if not name:
        return make_response(400, {"error": "Company name is required"})

    company_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)

    cur.execute(
        "INSERT INTO companies (id, name, inn, ogrn, company_type, contact_person, "
        "contact_email, contact_phone, status, balance_available, balance_reserved, "
        "bonus_balance, created_at, updated_at) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'active', 0, 0, 0, %s, %s)",
        (
            company_id, name,
            body.get("inn"), body.get("ogrn"),
            body.get("company_type", "standard"),
            body.get("contact_person"), body.get("contact_email"),
            body.get("contact_phone"), now, now,
        ),
    )

    # Audit log
    cur.execute(
        "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (user["id"], "company_created", "company", company_id,
         json.dumps({"name": name}), now),
    )

    return make_response(201, {"id": company_id, "name": name, "status": "active"})


def handle_put(event, cur, user):
    """Обновление компании (только для администратора)."""
    if user["user_type"] != "internal":
        return make_response(403, {"error": "Only internal users can update companies"})

    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    company_id = body.get("id")
    if not company_id:
        return make_response(400, {"error": "Company id is required"})

    # Build dynamic update
    allowed_fields = [
        "name", "inn", "ogrn", "company_type", "status",
        "contact_person", "contact_email", "contact_phone",
    ]
    sets = []
    params = []
    for field in allowed_fields:
        if field in body:
            sets.append(f"{field} = %s")
            params.append(body[field])

    if not sets:
        return make_response(400, {"error": "No fields to update"})

    now = datetime.now(timezone.utc)
    sets.append("updated_at = %s")
    params.append(now)
    params.append(company_id)

    cur.execute(
        f"UPDATE companies SET {', '.join(sets)} WHERE id = %s",
        params,
    )

    if cur.rowcount == 0:
        return make_response(404, {"error": "Company not found"})

    # Audit log
    cur.execute(
        "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (user["id"], "company_updated", "company", company_id,
         json.dumps({k: body[k] for k in allowed_fields if k in body}), now),
    )

    return make_response(200, {"id": company_id, "updated": True})
