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
    """Добавление комментария к задаче."""
    method = event.get("httpMethod", event.get("method", ""))
    if method == "OPTIONS":
        return make_response(200, {})

    if method != "POST":
        return make_response(405, {"error": "Method not allowed"})

    conn = None
    try:
        conn = get_db()
        cur = conn.cursor()
        user = get_current_user(event, cur)
        if not user:
            return make_response(401, {"error": "Unauthorized"})

        body = parse_body(event)
        if body is None:
            return make_response(400, {"error": "Invalid JSON body"})

        task_id = body.get("task_id")
        message = (body.get("message") or "").strip()
        is_internal = bool(body.get("is_internal", False))

        if not task_id:
            return make_response(400, {"error": "task_id is required"})
        if not message:
            return make_response(400, {"error": "message is required"})

        # Проверяем существование задачи
        cur.execute("SELECT id, company_id FROM tasks WHERE id = %s", (task_id,))
        task_row = cur.fetchone()
        if not task_row:
            return make_response(404, {"error": "Task not found"})

        task_company_id = str(task_row[1]) if task_row[1] else None

        # Проверка доступа для клиента
        if user["user_type"] == "client":
            cur.execute(
                "SELECT company_id FROM company_users WHERE user_id = %s LIMIT 1",
                (user["id"],),
            )
            cu_row = cur.fetchone()
            if not cu_row or str(cu_row[0]) != task_company_id:
                return make_response(403, {"error": "Access denied"})
            # Клиенты не могут создавать внутренние комментарии
            is_internal = False

        comment_id = str(uuid.uuid4())
        now = datetime.now(timezone.utc)

        cur.execute(
            "INSERT INTO task_comments (id, task_id, user_id, message, is_internal, created_at) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (comment_id, task_id, user["id"], message, is_internal, now),
        )

        # Audit log
        cur.execute(
            "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (user["id"], "comment_added", "task", task_id,
             json.dumps({"comment_id": comment_id, "is_internal": is_internal}), now),
        )

        conn.commit()

        return make_response(201, {
            "id": comment_id,
            "task_id": task_id,
            "message": message,
            "is_internal": is_internal,
            "created_at": str(now),
            "user": {
                "id": user["id"],
                "name": user["full_name"],
                "email": user["email"],
            },
        })

    except Exception as exc:
        if conn:
            conn.rollback()
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()
