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
    """Управление модулями: список, создание/обновление, подключение к компании."""
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
    """Получение списка всех модулей. Для клиента -- со статусом подключения."""
    cur.execute(
        "SELECT id, name, slug, description, status, created_at "
        "FROM modules ORDER BY name"
    )
    columns = [desc[0] for desc in cur.description]
    modules = []
    for row in cur.fetchall():
        r = dict(zip(columns, row))
        modules.append({
            "id": str(r["id"]),
            "name": r["name"],
            "slug": r["slug"],
            "description": r["description"],
            "status": r["status"],
            "created_at": str(r["created_at"]),
            "connection_status": None,
        })

    # Для клиента добавляем статус подключения
    if user["user_type"] == "client":
        cur.execute(
            "SELECT company_id FROM company_users WHERE user_id = %s LIMIT 1",
            (user["id"],),
        )
        cu_row = cur.fetchone()
        if cu_row:
            company_id = str(cu_row[0])
            cur.execute(
                "SELECT module_id, status FROM company_modules WHERE company_id = %s",
                (company_id,),
            )
            connections = {}
            for r in cur.fetchall():
                connections[str(r[0])] = r[1]

            for m in modules:
                m["connection_status"] = connections.get(m["id"])

    return make_response(200, {"items": modules})


def handle_post(event, cur, user):
    """Создание или обновление модуля (только для администратора)."""
    if user["user_type"] != "internal":
        return make_response(403, {"error": "Only internal users can manage modules"})

    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    name = (body.get("name") or "").strip()
    if not name:
        return make_response(400, {"error": "Module name is required"})

    slug = (body.get("slug") or "").strip()
    description = body.get("description", "")
    status = body.get("status", "active")
    now = datetime.now(timezone.utc)

    module_id = body.get("id")
    if module_id:
        # Обновление
        cur.execute(
            "UPDATE modules SET name = %s, slug = %s, description = %s, status = %s, updated_at = %s "
            "WHERE id = %s",
            (name, slug, description, status, now, module_id),
        )
        if cur.rowcount == 0:
            return make_response(404, {"error": "Module not found"})
        return make_response(200, {"id": module_id, "updated": True})
    else:
        # Создание
        module_id = str(uuid.uuid4())
        cur.execute(
            "INSERT INTO modules (id, name, slug, description, status, created_at, updated_at) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (module_id, name, slug, description, status, now, now),
        )
        return make_response(201, {"id": module_id, "name": name, "status": status})


def handle_put(event, cur, user):
    """Подключение модуля к компании (только для администратора)."""
    if user["user_type"] != "internal":
        return make_response(403, {"error": "Only internal users can connect modules"})

    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    company_id = body.get("company_id")
    module_id = body.get("module_id")
    status = body.get("status", "active")

    if not company_id or not module_id:
        return make_response(400, {"error": "company_id and module_id are required"})

    now = datetime.now(timezone.utc)

    # Upsert: обновить если существует, создать если нет
    cur.execute(
        "SELECT id FROM company_modules WHERE company_id = %s AND module_id = %s",
        (company_id, module_id),
    )
    existing = cur.fetchone()

    if existing:
        cur.execute(
            "UPDATE company_modules SET status = %s, updated_at = %s "
            "WHERE company_id = %s AND module_id = %s",
            (status, now, company_id, module_id),
        )
    else:
        cur.execute(
            "INSERT INTO company_modules (id, company_id, module_id, status, created_at, updated_at) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (str(uuid.uuid4()), company_id, module_id, status, now, now),
        )

    # Audit log
    cur.execute(
        "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (user["id"], "module_connected", "company_module", company_id,
         json.dumps({"module_id": module_id, "status": status}), now),
    )

    return make_response(200, {
        "company_id": company_id,
        "module_id": module_id,
        "status": status,
        "updated": True,
    })
