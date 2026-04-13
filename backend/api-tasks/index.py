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
    """Управление задачами: список, создание, обновление."""
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
    """Получение списка задач с фильтрами и пагинацией."""
    page = int(get_query_param(event, "page", "1"))
    per_page = min(int(get_query_param(event, "per_page", "20")), 100)
    offset = (page - 1) * per_page

    conditions = []
    params = []

    # Клиент видит только задачи своей компании
    if user["user_type"] == "client":
        company_id, _ = get_user_company(cur, user["id"])
        if not company_id:
            return make_response(200, {"items": [], "total": 0, "page": page, "per_page": per_page})
        conditions.append("t.company_id = %s")
        params.append(company_id)
    else:
        # Внутренний пользователь может фильтровать по company_id
        cid = get_query_param(event, "company_id")
        if cid:
            conditions.append("t.company_id = %s")
            params.append(cid)

    status_filter = get_query_param(event, "status")
    if status_filter:
        conditions.append("t.status = %s")
        params.append(status_filter)

    module_filter = get_query_param(event, "module_id")
    if module_filter:
        conditions.append("t.module_id = %s")
        params.append(module_filter)

    priority_filter = get_query_param(event, "priority")
    if priority_filter:
        conditions.append("t.priority = %s")
        params.append(priority_filter)

    curator_filter = get_query_param(event, "curator_id")
    if curator_filter:
        conditions.append("t.curator_id = %s")
        params.append(curator_filter)

    where_clause = ("WHERE " + " AND ".join(conditions)) if conditions else ""

    cur.execute(f"SELECT COUNT(*) FROM tasks t {where_clause}", params)
    total = cur.fetchone()[0]

    cur.execute(
        f"SELECT t.id, t.title, t.status, t.priority, t.deadline, "
        f"t.created_at, t.company_id, t.module_id, "
        f"t.creator_id, t.curator_id, t.executor_id, "
        f"t.estimate_hours, "
        f"c.name as company_name, m.name as module_name, "
        f"uc.full_name as creator_name, "
        f"ucur.full_name as curator_name, "
        f"uex.full_name as executor_name "
        f"FROM tasks t "
        f"LEFT JOIN companies c ON c.id = t.company_id "
        f"LEFT JOIN modules m ON m.id = t.module_id "
        f"LEFT JOIN users uc ON uc.id = t.creator_id "
        f"LEFT JOIN users ucur ON ucur.id = t.curator_id "
        f"LEFT JOIN users uex ON uex.id = t.executor_id "
        f"{where_clause} "
        f"ORDER BY t.created_at DESC LIMIT %s OFFSET %s",
        params + [per_page, offset],
    )

    columns = [desc[0] for desc in cur.description]
    items = []
    for row in cur.fetchall():
        r = dict(zip(columns, row))
        items.append({
            "id": str(r["id"]),
            "title": r["title"],
            "status": r["status"],
            "priority": r["priority"],
            "deadline": str(r["deadline"]) if r["deadline"] else None,
            "created_at": str(r["created_at"]),
            "company_id": str(r["company_id"]) if r["company_id"] else None,
            "company_name": r["company_name"],
            "module_id": str(r["module_id"]) if r["module_id"] else None,
            "module_name": r["module_name"],
            "creator_name": r["creator_name"],
            "curator_name": r["curator_name"],
            "executor_name": r["executor_name"],
            "estimate_hours": float(r["estimate_hours"]) if r["estimate_hours"] else None,
        })

    return make_response(200, {
        "items": items, "total": total, "page": page, "per_page": per_page,
    })


def handle_post(event, cur, user):
    """Создание новой задачи."""
    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    title = (body.get("title") or "").strip()
    if not title:
        return make_response(400, {"error": "Task title is required"})

    module_id = body.get("module_id")
    priority = body.get("priority", "medium")
    deadline = body.get("deadline")
    description = body.get("description", "")

    # Определяем компанию
    if user["user_type"] == "client":
        company_id, _ = get_user_company(cur, user["id"])
        if not company_id:
            return make_response(403, {"error": "No company assigned"})
    else:
        company_id = body.get("company_id")

    task_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)

    cur.execute(
        "INSERT INTO tasks (id, title, description, status, priority, deadline, "
        "company_id, module_id, creator_id, created_at, updated_at) "
        "VALUES (%s, %s, %s, 'new', %s, %s, %s, %s, %s, %s, %s)",
        (task_id, title, description, priority, deadline,
         company_id, module_id, user["id"], now, now),
    )

    # Лог статуса
    cur.execute(
        "INSERT INTO task_status_log (id, task_id, old_status, new_status, changed_by, created_at) "
        "VALUES (%s, %s, NULL, 'new', %s, %s)",
        (str(uuid.uuid4()), task_id, user["id"], now),
    )

    # Audit log
    cur.execute(
        "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (user["id"], "task_created", "task", task_id,
         json.dumps({"title": title, "priority": priority}), now),
    )

    return make_response(201, {
        "id": task_id, "title": title, "status": "new", "priority": priority,
    })


def handle_put(event, cur, user):
    """Обновление задачи (статус, куратор, исполнитель, оценка и т.д.)."""
    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    task_id = body.get("id")
    if not task_id:
        return make_response(400, {"error": "Task id is required"})

    # Проверяем существование задачи
    cur.execute("SELECT id, status, company_id FROM tasks WHERE id = %s", (task_id,))
    task_row = cur.fetchone()
    if not task_row:
        return make_response(404, {"error": "Task not found"})

    old_status = task_row[1]
    task_company_id = str(task_row[2]) if task_row[2] else None

    # Проверка доступа для клиента
    if user["user_type"] == "client":
        company_id, _ = get_user_company(cur, user["id"])
        if task_company_id != company_id:
            return make_response(403, {"error": "Access denied"})

    allowed_fields = [
        "title", "description", "status", "priority", "deadline",
        "curator_id", "executor_id", "estimate_hours", "module_id",
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
    params.append(task_id)

    cur.execute(f"UPDATE tasks SET {', '.join(sets)} WHERE id = %s", params)

    # Лог изменения статуса
    new_status = body.get("status")
    if new_status and new_status != old_status:
        cur.execute(
            "INSERT INTO task_status_log (id, task_id, old_status, new_status, changed_by, created_at) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (str(uuid.uuid4()), task_id, old_status, new_status, user["id"], now),
        )

    # Audit log
    cur.execute(
        "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (user["id"], "task_updated", "task", task_id,
         json.dumps({k: body[k] for k in allowed_fields if k in body}, default=str), now),
    )

    return make_response(200, {"id": task_id, "updated": True})
