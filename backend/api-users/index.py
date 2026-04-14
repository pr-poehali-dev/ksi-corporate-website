import json
import os
import hashlib
import uuid
from datetime import datetime, timezone

import bcrypt
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


def get_user_company(cur, user_id):
    cur.execute(
        "SELECT company_id, role FROM company_users WHERE user_id = %s LIMIT 1",
        (user_id,),
    )
    row = cur.fetchone()
    if not row:
        return None, None
    return str(row[0]), row[1]


def handler(event: dict, context) -> dict:
    """Управление пользователями: список, создание, обновление."""
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
    """Получение списка пользователей с фильтрами и пагинацией."""
    page = int(get_query_param(event, "page", "1"))
    per_page = min(int(get_query_param(event, "per_page", "20")), 100)
    offset = (page - 1) * per_page

    conditions = []
    params = []

    if user["user_type"] == "client":
        # Клиент-владелец/директор видит только сотрудников своей компании
        company_id, company_role = get_user_company(cur, user["id"])
        if not company_id or company_role not in ("owner", "director", "admin"):
            return make_response(403, {"error": "Insufficient permissions"})
        conditions.append(
            "u.id IN (SELECT user_id FROM company_users WHERE company_id = %s)"
        )
        params.append(company_id)
    else:
        # Администратор может фильтровать по компании
        cid = get_query_param(event, "company_id")
        if cid:
            conditions.append(
                "u.id IN (SELECT user_id FROM company_users WHERE company_id = %s)"
            )
            params.append(cid)

    search = get_query_param(event, "search")
    if search:
        conditions.append("(u.full_name ILIKE %s OR u.email ILIKE %s)")
        params.extend([f"%{search}%", f"%{search}%"])

    status_filter = get_query_param(event, "status")
    if status_filter:
        conditions.append("u.status = %s")
        params.append(status_filter)

    user_type_filter = get_query_param(event, "user_type")
    if user_type_filter:
        conditions.append("u.user_type = %s")
        params.append(user_type_filter)

    where_clause = ("WHERE " + " AND ".join(conditions)) if conditions else ""

    cur.execute(f"SELECT COUNT(*) FROM users u {where_clause}", params)
    total = cur.fetchone()[0]

    cur.execute(
        f"SELECT u.id, u.email, u.full_name, u.phone, u.user_type, "
        f"u.internal_role, u.status, u.created_at, u.last_login_at "
        f"FROM users u {where_clause} "
        f"ORDER BY u.created_at DESC LIMIT %s OFFSET %s",
        params + [per_page, offset],
    )

    columns = [desc[0] for desc in cur.description]
    items = []
    for row in cur.fetchall():
        r = dict(zip(columns, row))
        items.append({
            "id": str(r["id"]),
            "email": r["email"],
            "full_name": r["full_name"],
            "phone": r["phone"],
            "user_type": r["user_type"],
            "internal_role": r["internal_role"],
            "status": r["status"],
            "created_at": str(r["created_at"]),
            "last_login_at": str(r["last_login_at"]) if r["last_login_at"] else None,
        })

    return make_response(200, {
        "items": items, "total": total, "page": page, "per_page": per_page,
    })


def handle_post(event, cur, user):
    """Создание нового пользователя."""
    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    full_name = (body.get("full_name") or "").strip()
    phone = body.get("phone")
    user_type = body.get("user_type", "client")
    internal_role = body.get("internal_role")
    company_id = body.get("company_id")
    company_role = body.get("company_role", "employee")

    if not email:
        return make_response(400, {"error": "Email is required"})
    if not password or len(password) < 8:
        return make_response(400, {"error": "Password must be at least 8 characters"})
    if not full_name:
        return make_response(400, {"error": "Full name is required"})

    # Проверка прав
    if user["user_type"] == "client":
        # Клиент-владелец может создавать пользователей только для своей компании
        own_company_id, own_role = get_user_company(cur, user["id"])
        if own_role not in ("owner", "director", "admin"):
            return make_response(403, {"error": "Insufficient permissions"})
        company_id = own_company_id
        user_type = "client"  # Клиент не может создавать внутренних пользователей

    # Проверяем уникальность email
    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
    if cur.fetchone():
        return make_response(409, {"error": "User with this email already exists"})

    # Хэшируем пароль
    password_hash = bcrypt.hashpw(
        password.encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")

    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)

    cur.execute(
        "INSERT INTO users (id, email, password_hash, full_name, phone, user_type, "
        "internal_role, status, created_at, updated_at) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, 'active', %s, %s)",
        (user_id, email, password_hash, full_name, phone, user_type,
         internal_role, now, now),
    )

    # Привязка к компании
    if company_id:
        cur.execute(
            "INSERT INTO company_users (id, company_id, user_id, role, created_at) "
            "VALUES (%s, %s, %s, %s, %s)",
            (str(uuid.uuid4()), company_id, user_id, company_role, now),
        )

    # Audit log
    cur.execute(
        "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (user["id"], "user_created", "user", user_id,
         json.dumps({"email": email, "user_type": user_type, "company_id": company_id}), now),
    )

    return make_response(201, {
        "id": user_id,
        "email": email,
        "full_name": full_name,
        "user_type": user_type,
        "status": "active",
    })


def handle_put(event, cur, user):
    """Обновление пользователя."""
    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    target_id = body.get("id")
    if not target_id:
        return make_response(400, {"error": "User id is required"})

    # Проверка прав для клиента
    if user["user_type"] == "client":
        own_company_id, own_role = get_user_company(cur, user["id"])
        if own_role not in ("owner", "director", "admin"):
            return make_response(403, {"error": "Insufficient permissions"})
        # Проверяем что целевой пользователь принадлежит той же компании
        cur.execute(
            "SELECT company_id FROM company_users WHERE user_id = %s AND company_id = %s",
            (target_id, own_company_id),
        )
        if not cur.fetchone():
            return make_response(403, {"error": "Cannot update users outside your company"})

    allowed_fields = ["full_name", "phone", "status", "internal_role", "user_type"]
    sets = []
    params = []
    for field in allowed_fields:
        if field in body:
            sets.append(f"{field} = %s")
            params.append(body[field])

    # Обновление пароля если передан
    new_password = body.get("password")
    if new_password:
        if len(new_password) < 8:
            return make_response(400, {"error": "Password must be at least 8 characters"})
        pw_hash = bcrypt.hashpw(
            new_password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")
        sets.append("password_hash = %s")
        params.append(pw_hash)

    if not sets:
        return make_response(400, {"error": "No fields to update"})

    now = datetime.now(timezone.utc)
    sets.append("updated_at = %s")
    params.append(now)
    params.append(target_id)

    cur.execute(f"UPDATE users SET {', '.join(sets)} WHERE id = %s", params)

    if cur.rowcount == 0:
        return make_response(404, {"error": "User not found"})

    # Обновление роли в компании если указана
    if "company_role" in body and "company_id" in body:
        cur.execute(
            "UPDATE company_users SET role = %s WHERE user_id = %s AND company_id = %s",
            (body["company_role"], target_id, body["company_id"]),
        )

    # Audit log
    cur.execute(
        "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (user["id"], "user_updated", "user", target_id,
         json.dumps({k: body[k] for k in allowed_fields if k in body}, default=str), now),
    )

    return make_response(200, {"id": target_id, "updated": True})