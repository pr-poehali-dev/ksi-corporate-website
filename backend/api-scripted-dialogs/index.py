import json
import os
import base64
import hashlib
import uuid
from datetime import datetime, timezone

import psycopg2
import boto3

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
}

DATABASE_URL = os.environ.get("DATABASE_URL", "")
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY", "")


def make_response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps(body, default=str, ensure_ascii=False),
    }


def get_db():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    return conn, cur


def get_current_user(event, cur):
    headers = event.get("headers") or {}
    auth = headers.get("X-Authorization", "") or headers.get("x-authorization", "")
    if not auth.startswith("Bearer "):
        return None
    token = auth[7:]
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    cur.execute(
        "SELECT u.id, u.email, u.full_name, u.user_type "
        "FROM user_sessions s JOIN users u ON u.id = s.user_id "
        "WHERE s.token_hash = %s AND s.expires_at > NOW()",
        (token_hash,),
    )
    row = cur.fetchone()
    if not row:
        return None
    return {"id": str(row[0]), "email": row[1], "full_name": row[2], "user_type": row[3]}


def parse_body(event):
    raw = event.get("body")
    if not raw:
        return {}
    if isinstance(raw, str):
        return json.loads(raw)
    return raw


def get_query_param(event, name, default=None):
    params = event.get("queryStringParameters") or {}
    return params.get(name, default)


def upload_file_to_s3(file_data_b64: str, filename: str, content_type: str) -> str:
    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )
    file_data = base64.b64decode(file_data_b64)
    key = f"scripted-dialogs/{uuid.uuid4()}/{filename}"
    s3.put_object(Bucket="files", Key=key, Body=file_data, ContentType=content_type)
    cdn_url = f"https://cdn.poehali.dev/projects/{AWS_ACCESS_KEY_ID}/bucket/{key}"
    return cdn_url


def handler(event: dict, context) -> dict:
    """CRUD для запрограммированных диалогов чата с поддержкой файлов."""
    method = event.get("httpMethod", event.get("method", "GET"))

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    conn, cur = get_db()
    try:
        user = get_current_user(event, cur)
        if not user:
            return make_response(401, {"error": "Unauthorized"})

        if user["user_type"] != "internal":
            return make_response(403, {"error": "Только для операторов"})

        if method == "GET":
            return handle_list(cur)

        elif method == "POST":
            body = parse_body(event)
            action = body.get("action", "create")
            if action == "upload_file":
                return handle_upload_file(body)
            return handle_create(body, cur, conn, user)

        elif method == "PUT":
            body = parse_body(event)
            dialog_id = body.get("id") or get_query_param(event, "id")
            if not dialog_id:
                return make_response(400, {"error": "id required"})
            return handle_update(body, dialog_id, cur, conn)

        elif method == "DELETE":
            body = parse_body(event)
            dialog_id = body.get("id") or get_query_param(event, "id")
            if not dialog_id:
                return make_response(400, {"error": "id required"})
            return handle_delete(dialog_id, cur, conn)

        return make_response(405, {"error": "Method not allowed"})

    except Exception as exc:
        conn.rollback()
        return make_response(500, {"error": str(exc)})
    finally:
        conn.close()


def handle_list(cur):
    """Список всех запрограммированных диалогов."""
    cur.execute(
        "SELECT id, title, question_text, question_attachments, "
        "answer_text, answer_attachments, sort_order, created_at "
        "FROM scripted_dialogs ORDER BY sort_order ASC, created_at ASC"
    )
    rows = cur.fetchall()
    dialogs = []
    for row in rows:
        dialogs.append({
            "id": str(row[0]),
            "title": row[1],
            "questionText": row[2],
            "questionAttachments": row[3] or [],
            "answerText": row[4],
            "answerAttachments": row[5] or [],
            "sortOrder": row[6],
            "createdAt": row[7].isoformat() if row[7] else None,
        })
    return make_response(200, {"dialogs": dialogs})


def handle_create(body, cur, conn, user):
    """Создать новый запрограммированный диалог."""
    title = (body.get("title") or "").strip()
    question_text = (body.get("questionText") or "").strip()
    answer_text = (body.get("answerText") or "").strip()
    question_attachments = body.get("questionAttachments") or []
    answer_attachments = body.get("answerAttachments") or []
    sort_order = body.get("sortOrder") or 0

    if not question_text or not answer_text:
        return make_response(400, {"error": "questionText и answerText обязательны"})

    dialog_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    cur.execute(
        "INSERT INTO scripted_dialogs (id, title, question_text, question_attachments, "
        "answer_text, answer_attachments, sort_order, created_by, created_at) "
        "VALUES (%s, %s, %s, %s::jsonb, %s, %s::jsonb, %s, %s, %s)",
        (dialog_id, title, question_text, json.dumps(question_attachments, ensure_ascii=False),
         answer_text, json.dumps(answer_attachments, ensure_ascii=False),
         sort_order, user["id"], now),
    )
    conn.commit()
    return make_response(200, {"id": dialog_id, "created": True})


def handle_update(body, dialog_id, cur, conn):
    """Обновить запрограммированный диалог."""
    title = (body.get("title") or "").strip()
    question_text = (body.get("questionText") or "").strip()
    answer_text = (body.get("answerText") or "").strip()
    question_attachments = body.get("questionAttachments") or []
    answer_attachments = body.get("answerAttachments") or []
    sort_order = body.get("sortOrder") or 0

    cur.execute(
        "UPDATE scripted_dialogs SET title=%s, question_text=%s, question_attachments=%s::jsonb, "
        "answer_text=%s, answer_attachments=%s::jsonb, sort_order=%s, updated_at=NOW() "
        "WHERE id=%s",
        (title, question_text, json.dumps(question_attachments, ensure_ascii=False),
         answer_text, json.dumps(answer_attachments, ensure_ascii=False),
         sort_order, dialog_id),
    )
    if cur.rowcount == 0:
        conn.rollback()
        return make_response(404, {"error": "Диалог не найден"})
    conn.commit()
    return make_response(200, {"updated": True})


def handle_delete(dialog_id, cur, conn):
    """Удалить запрограммированный диалог."""
    cur.execute("DELETE FROM scripted_dialogs WHERE id = %s", (dialog_id,))
    if cur.rowcount == 0:
        conn.rollback()
        return make_response(404, {"error": "Диалог не найден"})
    conn.commit()
    return make_response(200, {"deleted": True})


def handle_upload_file(body):
    """Загрузить файл для вложения к диалогу."""
    file_data = body.get("fileData")
    filename = body.get("filename", "file")
    content_type = body.get("contentType", "application/octet-stream")

    if not file_data:
        return make_response(400, {"error": "fileData required"})

    url = upload_file_to_s3(file_data, filename, content_type)
    return make_response(200, {
        "url": url,
        "filename": filename,
        "contentType": content_type,
    })
