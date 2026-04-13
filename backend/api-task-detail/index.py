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
    """Получение детальной информации о задаче по ID."""
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

        task_id = get_query_param(event, "id")
        if not task_id:
            return make_response(400, {"error": "Task id parameter is required"})

        # Основная информация о задаче
        cur.execute(
            "SELECT t.id, t.title, t.description, t.status, t.priority, "
            "t.deadline, t.estimate_hours, t.created_at, t.updated_at, "
            "t.company_id, t.module_id, t.creator_id, t.curator_id, t.executor_id, "
            "c.name as company_name, m.name as module_name, "
            "uc.full_name as creator_name, uc.email as creator_email, "
            "ucur.full_name as curator_name, ucur.email as curator_email, "
            "uex.full_name as executor_name, uex.email as executor_email "
            "FROM tasks t "
            "LEFT JOIN companies c ON c.id = t.company_id "
            "LEFT JOIN modules m ON m.id = t.module_id "
            "LEFT JOIN users uc ON uc.id = t.creator_id "
            "LEFT JOIN users ucur ON ucur.id = t.curator_id "
            "LEFT JOIN users uex ON uex.id = t.executor_id "
            "WHERE t.id = %s",
            (task_id,),
        )
        columns = [desc[0] for desc in cur.description]
        row = cur.fetchone()
        if not row:
            return make_response(404, {"error": "Task not found"})

        t = dict(zip(columns, row))

        # Проверка доступа для клиента
        if user["user_type"] == "client":
            cur.execute(
                "SELECT company_id FROM company_users WHERE user_id = %s LIMIT 1",
                (user["id"],),
            )
            cu_row = cur.fetchone()
            if not cu_row or str(cu_row[0]) != str(t["company_id"]):
                return make_response(403, {"error": "Access denied"})

        task = {
            "id": str(t["id"]),
            "title": t["title"],
            "description": t["description"],
            "status": t["status"],
            "priority": t["priority"],
            "deadline": str(t["deadline"]) if t["deadline"] else None,
            "estimate_hours": float(t["estimate_hours"]) if t["estimate_hours"] else None,
            "created_at": str(t["created_at"]),
            "updated_at": str(t["updated_at"]) if t["updated_at"] else None,
            "company": {
                "id": str(t["company_id"]) if t["company_id"] else None,
                "name": t["company_name"],
            },
            "module": {
                "id": str(t["module_id"]) if t["module_id"] else None,
                "name": t["module_name"],
            },
            "creator": {
                "id": str(t["creator_id"]) if t["creator_id"] else None,
                "name": t["creator_name"],
                "email": t["creator_email"],
            },
            "curator": {
                "id": str(t["curator_id"]) if t["curator_id"] else None,
                "name": t["curator_name"],
                "email": t["curator_email"],
            } if t["curator_id"] else None,
            "executor": {
                "id": str(t["executor_id"]) if t["executor_id"] else None,
                "name": t["executor_name"],
                "email": t["executor_email"],
            } if t["executor_id"] else None,
        }

        # Комментарии
        cur.execute(
            "SELECT tc.id, tc.message, tc.is_internal, tc.created_at, "
            "u.id as user_id, u.full_name, u.email "
            "FROM task_comments tc "
            "JOIN users u ON u.id = tc.user_id "
            "WHERE tc.task_id = %s ORDER BY tc.created_at ASC",
            (task_id,),
        )
        cols_c = [desc[0] for desc in cur.description]
        comments = []
        for r in cur.fetchall():
            rc = dict(zip(cols_c, r))
            # Клиенты не видят внутренние комментарии
            if user["user_type"] == "client" and rc["is_internal"]:
                continue
            comments.append({
                "id": str(rc["id"]),
                "message": rc["message"],
                "is_internal": rc["is_internal"],
                "created_at": str(rc["created_at"]),
                "user": {
                    "id": str(rc["user_id"]),
                    "name": rc["full_name"],
                    "email": rc["email"],
                },
            })

        # Вложения
        cur.execute(
            "SELECT id, file_name, file_url, file_size, created_at "
            "FROM task_attachments WHERE task_id = %s ORDER BY created_at ASC",
            (task_id,),
        )
        attachments = []
        for r in cur.fetchall():
            attachments.append({
                "id": str(r[0]), "file_name": r[1], "file_url": r[2],
                "file_size": r[3], "created_at": str(r[4]),
            })

        # История статусов
        cur.execute(
            "SELECT sl.id, sl.old_status, sl.new_status, sl.created_at, "
            "u.full_name as changed_by_name "
            "FROM task_status_log sl "
            "LEFT JOIN users u ON u.id = sl.changed_by "
            "WHERE sl.task_id = %s ORDER BY sl.created_at ASC",
            (task_id,),
        )
        status_history = []
        for r in cur.fetchall():
            status_history.append({
                "id": str(r[0]),
                "old_status": r[1],
                "new_status": r[2],
                "created_at": str(r[3]),
                "changed_by_name": r[4],
            })

        return make_response(200, {
            "task": task,
            "comments": comments,
            "attachments": attachments,
            "status_history": status_history,
        })

    except Exception as exc:
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()
