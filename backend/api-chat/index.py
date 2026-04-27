import json
import os
import hashlib
import uuid
from datetime import datetime, timezone
from urllib.request import urlopen, Request

import psycopg2

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
}

DATABASE_URL = os.environ.get("DATABASE_URL", "")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")

SYSTEM_PROMPT = """Ты — ИИ-ассистент АО «КСИ» (КриптоСтройИнвест), виртуального девелопера.
АО КСИ выполняет задачи в сфере юридических и финансовых услуг через личный кабинет для юридических лиц.
Оператор — это живой специалист КСИ, который выполняет задачи клиента.

Твоя роль:
1. Принять запрос от клиента, кратко переформулировать его суть (2-3 предложения)
2. Дать краткий ответ или пояснение по запросу
3. Сообщить, что задача передана оператору для выполнения
4. Быть вежливым, профессиональным, лаконичным

Стиль общения: деловой, без лишних слов. Используй «вы» (с маленькой буквы).
Никогда не говори, что ты ChatGPT или OpenAI. Ты — ИИ-ассистент КСИ.
Отвечай только на русском языке."""


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
        "SELECT u.id, u.email, u.full_name, u.user_type, u.internal_role "
        "FROM user_sessions s JOIN users u ON u.id = s.user_id "
        "WHERE s.token_hash = %s AND s.expires_at > NOW()",
        (token_hash,),
    )
    row = cur.fetchone()
    if not row:
        return None
    return {"id": str(row[0]), "email": row[1], "full_name": row[2],
            "user_type": row[3], "internal_role": row[4]}


def get_user_company(cur, user_id):
    cur.execute(
        "SELECT company_id FROM company_users WHERE user_id = %s LIMIT 1",
        (user_id,),
    )
    row = cur.fetchone()
    return str(row[0]) if row else None


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


def call_openai(messages: list) -> str:
    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": messages,
        "max_tokens": 500,
        "temperature": 0.7,
    }).encode("utf-8")
    req = Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urlopen(req, timeout=25) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data["choices"][0]["message"]["content"].strip()


def handler(event: dict, context) -> dict:
    """ИИ-ассистент чата ЛК: GET - история/список, POST - отправка сообщения, DELETE - удаление."""
    method = event.get("httpMethod", event.get("method", "GET"))

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": {**CORS_HEADERS, "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS"}, "body": ""}

    conn, cur = get_db()
    try:
        user = get_current_user(event, cur)
        if not user:
            return make_response(401, {"error": "Unauthorized"})

        is_internal = user["user_type"] == "internal"

        if method == "GET":
            if is_internal and get_query_param(event, "companies") == "1":
                return handle_get_companies(cur)
            company_id = get_query_param(event, "company_id") if is_internal else get_user_company(cur, user["id"])
            if not company_id:
                return make_response(403, {"error": "No company"})
            return handle_get_messages(cur, company_id)

        elif method == "POST":
            body = parse_body(event)
            if is_internal:
                company_id = body.get("company_id") or get_query_param(event, "company_id")
                if not company_id:
                    return make_response(400, {"error": "company_id required"})
                return handle_operator_post(body, cur, conn, user, company_id)
            else:
                company_id = get_user_company(cur, user["id"])
                if not company_id:
                    return make_response(403, {"error": "No company assigned"})
                return handle_client_post(body, cur, conn, user, company_id)

        elif method == "DELETE":
            body = parse_body(event)
            msg_id = body.get("message_id") or get_query_param(event, "message_id")
            if not msg_id:
                return make_response(400, {"error": "message_id required"})
            return handle_delete_message(cur, conn, user, msg_id, is_internal)

        return make_response(405, {"error": "Method not allowed"})

    except Exception as exc:
        conn.rollback()
        return make_response(500, {"error": str(exc)})
    finally:
        conn.close()


def handle_get_companies(cur):
    """Список компаний с последним сообщением и кол-вом сообщений от клиентов."""
    cur.execute(
        "SELECT c.id, c.name, "
        "  (SELECT message FROM chat_messages WHERE company_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message, "
        "  (SELECT created_at FROM chat_messages WHERE company_id = c.id ORDER BY created_at DESC LIMIT 1) as last_at, "
        "  (SELECT COUNT(*) FROM chat_messages WHERE company_id = c.id AND sender_type = 'user') as user_msg_count "
        "FROM companies c "
        "WHERE EXISTS (SELECT 1 FROM chat_messages WHERE company_id = c.id) "
        "ORDER BY last_at DESC NULLS LAST"
    )
    rows = cur.fetchall()
    companies = []
    for row in rows:
        companies.append({
            "id": str(row[0]),
            "name": row[1],
            "lastMessage": row[2],
            "lastAt": row[3].isoformat() if row[3] else None,
            "userMsgCount": row[4],
        })
    return make_response(200, {"companies": companies})


def handle_get_messages(cur, company_id):
    """История сообщений чата компании."""
    cur.execute(
        "SELECT id, message, sender_type, sender_name, task_id, created_at, metadata "
        "FROM chat_messages WHERE company_id = %s "
        "ORDER BY created_at ASC LIMIT 200",
        (company_id,),
    )
    rows = cur.fetchall()
    messages = []
    for row in rows:
        meta = row[6] or {}
        messages.append({
            "id": str(row[0]),
            "text": row[1],
            "sender": row[2],
            "senderName": row[3],
            "taskId": str(row[4]) if row[4] else None,
            "timestamp": row[5].isoformat() if row[5] else None,
            "attachments": meta.get("attachments") or [],
        })
    return make_response(200, {"messages": messages})


def handle_operator_post(body, cur, conn, user, company_id):
    """Оператор отправляет сообщение в чат компании."""
    text = (body.get("message") or "").strip()
    if not text:
        return make_response(400, {"error": "Сообщение не может быть пустым"})

    now = datetime.now(timezone.utc)
    msg_id = str(uuid.uuid4())
    cur.execute(
        "INSERT INTO chat_messages (id, company_id, user_id, message, sender_type, sender_name, created_at) "
        "VALUES (%s, %s, %s, %s, 'operator', %s, %s)",
        (msg_id, company_id, user["id"], text, user["full_name"], now),
    )
    conn.commit()

    return make_response(200, {
        "message": {
            "id": msg_id,
            "text": text,
            "sender": "operator",
            "senderName": user["full_name"],
            "timestamp": now.isoformat(),
        }
    })


def find_scripted_answer(cur, text: str):
    """Ищет запрограммированный ответ по тексту вопроса (нечёткое совпадение)."""
    cur.execute("SELECT messages FROM scripted_dialogs ORDER BY sort_order ASC, created_at ASC")
    rows = cur.fetchall()
    text_lower = text.lower().strip()
    for row in rows:
        messages = row[0] or []
        for msg in messages:
            q = (msg.get("questionText") or "").lower().strip()
            if not q:
                continue
            # Точное или частичное совпадение (вопрос содержится в тексте или текст содержит вопрос)
            if q == text_lower or q in text_lower or text_lower in q:
                return msg
    return None


def handle_client_post(body, cur, conn, user, company_id):
    """Клиент отправляет сообщение — сначала ищем запрограммированный ответ, иначе GPT."""
    text = (body.get("message") or "").strip()
    if not text:
        return make_response(400, {"error": "Сообщение не может быть пустым"})

    now = datetime.now(timezone.utc)

    # Сохраняем сообщение клиента
    user_msg_id = str(uuid.uuid4())
    cur.execute(
        "INSERT INTO chat_messages (id, company_id, user_id, message, sender_type, sender_name, created_at) "
        "VALUES (%s, %s, %s, %s, 'user', %s, %s)",
        (user_msg_id, company_id, user["id"], text, user["full_name"], now),
    )

    # Проверяем запрограммированные ответы
    scripted = find_scripted_answer(cur, text)

    if scripted:
        ai_text = scripted.get("answerText") or ""
        ai_attachments = scripted.get("answerAttachments") or []
    else:
        ai_attachments = []
        # Контекст для ИИ (последние 10 сообщений)
        cur.execute(
            "SELECT sender_type, message FROM chat_messages "
            "WHERE company_id = %s ORDER BY created_at DESC LIMIT 10",
            (company_id,),
        )
        history_rows = list(reversed(cur.fetchall()))

        openai_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for row in history_rows:
            if row[0] == "user":
                openai_messages.append({"role": "user", "content": row[1]})
            elif row[0] in ("ai", "operator", "system"):
                openai_messages.append({"role": "assistant", "content": row[1]})

        if OPENAI_API_KEY:
            try:
                ai_text = call_openai(openai_messages)
            except Exception:
                ai_text = "Запрос принят. Оператор КСИ ответит вам в ближайшее время в рабочее время (Пн–Пт, 10:00–19:00 МСК)."
        else:
            ai_text = "Запрос принят. Оператор КСИ ответит вам в ближайшее время в рабочее время (Пн–Пт, 10:00–19:00 МСК)."

    # Сохраняем ответ ИИ (с вложениями в metadata)
    ai_msg_id = str(uuid.uuid4())
    metadata = {"attachments": ai_attachments} if ai_attachments else {}
    cur.execute(
        "INSERT INTO chat_messages (id, company_id, message, sender_type, sender_name, created_at, metadata) "
        "VALUES (%s, %s, %s, 'ai', 'ИИ КСИ', %s, %s::jsonb)",
        (ai_msg_id, company_id, ai_text, now, json.dumps(metadata, ensure_ascii=False)),
    )

    conn.commit()

    return make_response(200, {
        "userMessage": {
            "id": user_msg_id,
            "text": text,
            "sender": "user",
            "senderName": user["full_name"],
            "timestamp": now.isoformat(),
            "attachments": [],
        },
        "aiMessage": {
            "id": ai_msg_id,
            "text": ai_text,
            "sender": "ai",
            "senderName": "ИИ КСИ",
            "timestamp": now.isoformat(),
            "attachments": ai_attachments,
        },
    })


def handle_delete_message(cur, conn, user, msg_id, is_internal):
    """Удаление сообщения из чата (оператор — любое, клиент — только своё)."""
    cur.execute(
        "SELECT id, sender_type, user_id FROM chat_messages WHERE id = %s",
        (msg_id,),
    )
    row = cur.fetchone()
    if not row:
        return make_response(404, {"error": "Сообщение не найдено"})

    sender_type = row[1]
    owner_user_id = str(row[2]) if row[2] else None

    if not is_internal and owner_user_id != user["id"]:
        return make_response(403, {"error": "Нет прав для удаления"})

    cur.execute("DELETE FROM chat_messages WHERE id = %s", (msg_id,))
    conn.commit()
    return make_response(200, {"deleted": True})