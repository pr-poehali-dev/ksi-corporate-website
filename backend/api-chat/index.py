import json
import os
import hashlib
import uuid
from datetime import datetime, timezone
from urllib.request import urlopen, Request
from urllib.error import URLError

import psycopg2
import psycopg2.extras

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
}

DATABASE_URL = os.environ.get("DATABASE_URL", "")
SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")
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


def call_openai(messages: list) -> str:
    """Вызов OpenAI Chat Completions API."""
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
    """ИИ-ассистент чата ЛК: GET - история сообщений, POST - отправка сообщения."""
    method = event.get("httpMethod", event.get("method", "GET"))

    if method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": "",
        }

    conn, cur = get_db()
    try:
        user = get_current_user(event, cur)
        if not user:
            return make_response(401, {"error": "Unauthorized"})

        company_id = get_user_company(cur, user["id"])
        if not company_id and user["user_type"] == "client":
            return make_response(403, {"error": "No company assigned"})

        if method == "GET":
            return handle_get(cur, user, company_id)
        elif method == "POST":
            result = handle_post(event, cur, conn, user, company_id)
            return result
        else:
            return make_response(405, {"error": "Method not allowed"})

    except Exception as exc:
        conn.rollback()
        return make_response(500, {"error": str(exc)})
    finally:
        conn.close()


def handle_get(cur, user, company_id):
    """Возвращает историю сообщений чата для компании."""
    cur.execute(
        "SELECT id, message, sender_type, sender_name, task_id, created_at, metadata "
        "FROM chat_messages WHERE company_id = %s "
        "ORDER BY created_at ASC LIMIT 100",
        (company_id,),
    )

    rows = cur.fetchall()
    messages = []
    for row in rows:
        messages.append({
            "id": str(row[0]),
            "text": row[1],
            "sender": row[2],
            "senderName": row[3],
            "taskId": str(row[4]) if row[4] else None,
            "timestamp": row[5].isoformat() if row[5] else None,
            "metadata": row[6] or {},
        })
    return make_response(200, {"messages": messages})


def handle_post(event, cur, conn, user, company_id):
    """Принимает сообщение от клиента, отвечает через ИИ, сохраняет оба."""
    body = parse_body(event)
    text = (body.get("message") or "").strip()
    if not text:
        return make_response(400, {"error": "Сообщение не может быть пустым"})

    now = datetime.now(timezone.utc)

    # 1. Сохраняем сообщение пользователя
    user_msg_id = str(uuid.uuid4())
    cur.execute(
        "INSERT INTO chat_messages (id, company_id, user_id, message, sender_type, sender_name, created_at) "
        "VALUES (%s, %s, %s, %s, 'user', %s, %s)",
        (user_msg_id, company_id, user["id"], text, user["full_name"], now),
    )

    # 2. Получаем последние 10 сообщений для контекста
    cur.execute(
        "SELECT sender_type, message FROM chat_messages "
        "WHERE company_id = %s ORDER BY created_at DESC LIMIT 10",
        (company_id,),
    )
    history_rows = list(reversed(cur.fetchall()))

    openai_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for row in history_rows:
        sender_type = row[0]
        msg_text = row[1]
        if sender_type == "user":
            openai_messages.append({"role": "user", "content": msg_text})
        elif sender_type in ("ai", "operator", "system"):
            openai_messages.append({"role": "assistant", "content": msg_text})

    # 3. Получаем ответ от ИИ
    ai_text = ""
    if OPENAI_API_KEY:
        try:
            ai_text = call_openai(openai_messages)
        except Exception as e:
            ai_text = "Запрос принят. Оператор КСИ ответит вам в ближайшее время в рабочее время (Пн–Пт, 10:00–19:00 МСК)."
    else:
        ai_text = "Запрос принят. Оператор КСИ ответит вам в ближайшее время в рабочее время (Пн–Пт, 10:00–19:00 МСК)."

    # 4. Сохраняем ответ ИИ
    ai_msg_id = str(uuid.uuid4())
    cur.execute(
        "INSERT INTO chat_messages (id, company_id, message, sender_type, sender_name, created_at) "
        "VALUES (%s, %s, %s, 'ai', 'ИИ КСИ', %s)",
        (ai_msg_id, company_id, ai_text, now),
    )

    conn.commit()

    return make_response(200, {
        "userMessage": {
            "id": user_msg_id,
            "text": text,
            "sender": "user",
            "senderName": user["full_name"],
            "timestamp": now.isoformat(),
        },
        "aiMessage": {
            "id": ai_msg_id,
            "text": ai_text,
            "sender": "ai",
            "senderName": "ИИ КСИ",
            "timestamp": now.isoformat(),
        },
    })