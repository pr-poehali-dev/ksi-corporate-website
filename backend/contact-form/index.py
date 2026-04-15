import json
import os
import hashlib
import urllib.request
import urllib.error
from datetime import datetime, timezone

import psycopg2
import psycopg2.extras


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
}

DATABASE_URL = os.environ.get("DATABASE_URL", "")
SCHEMA = "t_p64876520_ksi_corporate_websit"

ROLE_LABELS = {
    "developer": "Девелопер / застройщик",
    "land": "Землевладелец",
    "asset-owner": "Владелец актива",
    "project-team": "Проектная / инвестиционная команда",
    "beta": "Хочу участвовать в бета-тестировании",
    "other": "Другое",
}


def make_response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps(body, default=str, ensure_ascii=False),
    }


def get_connection():
    return psycopg2.connect(DATABASE_URL)


def extract_token(event: dict) -> str | None:
    """Извлечение токена из заголовка X-Authorization."""
    headers = event.get("headers") or {}
    normalized = {k.lower(): v for k, v in headers.items()}
    auth_value = normalized.get("x-authorization", "")
    if not auth_value:
        return None
    if auth_value.startswith("Bearer "):
        return auth_value[7:].strip()
    return auth_value.strip()


def get_current_internal_user(cur, event: dict) -> dict | None:
    """Проверка авторизации и получение внутреннего пользователя (admin)."""
    raw_token = extract_token(event)
    if not raw_token:
        return None

    token_hash = hashlib.sha256(raw_token.encode("utf-8")).hexdigest()

    cur.execute(
        "SELECT u.id, u.email, u.full_name, u.user_type, u.internal_role, u.status "
        "FROM user_sessions s JOIN users u ON u.id = s.user_id "
        "WHERE s.token_hash = %s AND s.expires_at > %s",
        (token_hash, datetime.now(timezone.utc)),
    )
    row = cur.fetchone()
    if not row:
        return None

    user = {
        "id": row["id"],
        "email": row["email"],
        "full_name": row["full_name"],
        "user_type": row["user_type"],
        "internal_role": row["internal_role"],
        "status": row["status"],
    }

    if user["status"] != "active":
        return None
    if user["user_type"] != "internal":
        return None

    return user


def get_telegram_settings(cur) -> dict:
    """Получение настроек Telegram из таблицы site_settings."""
    cur.execute(
        "SELECT key, value FROM {schema}.site_settings "
        "WHERE key IN ('telegram_bot_token', 'telegram_chat_id', 'telegram_notifications_enabled') "
        "ORDER BY key".format(schema=SCHEMA)
    )
    rows = cur.fetchall()
    settings = {row["key"]: row["value"] for row in rows}
    return settings


def send_telegram_message(bot_token: str, chat_id: str, text: str) -> bool:
    """Отправка сообщения в Telegram через Bot API. Возвращает True при успехе."""
    url = "https://api.telegram.org/bot{token}/sendMessage".format(token=bot_token)
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status == 200
    except (urllib.error.URLError, urllib.error.HTTPError, OSError) as exc:
        print("Telegram API error: {exc}".format(exc=exc))
        return False


def escape_html(text: str) -> str:
    """Экранирование спецсимволов HTML для Telegram."""
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def parse_body(event: dict) -> dict:
    """Разбор тела запроса из event."""
    raw_body = event.get("body", "{}")
    if isinstance(raw_body, str):
        try:
            return json.loads(raw_body)
        except (json.JSONDecodeError, TypeError):
            return {}
    return raw_body or {}


def handle_contact_form(conn, event: dict) -> dict:
    """Обработка отправки контактной формы."""
    body = parse_body(event)

    # Если это запрос на тестирование Telegram — перенаправляем
    if body.get("action") == "test":
        return handle_test_telegram(conn, event)

    name = (body.get("name") or "").strip()
    email = (body.get("email") or "").strip()
    org = (body.get("org") or "").strip()
    role = (body.get("role") or "").strip()
    message = (body.get("message") or "").strip()

    if not name:
        return make_response(400, {"error": "Поле 'name' обязательно"})
    if not email:
        return make_response(400, {"error": "Поле 'email' обязательно"})

    role_label = ROLE_LABELS.get(role, role or "\u2014")

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    tg_settings = get_telegram_settings(cur)

    bot_token = tg_settings.get("telegram_bot_token", "").strip()
    chat_id = tg_settings.get("telegram_chat_id", "").strip()
    notifications_enabled = tg_settings.get("telegram_notifications_enabled", "false")

    if notifications_enabled == "true" and bot_token and chat_id:
        tg_text = (
            "\U0001f4e8 <b>\u041d\u043e\u0432\u043e\u0435 \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u0435 \u0441 \u0441\u0430\u0439\u0442\u0430</b>\n\n"
            "<b>\u0418\u043c\u044f:</b> {name}\n"
            "<b>\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f:</b> {org}\n"
            "<b>Email:</b> {email}\n"
            "<b>\u0420\u043e\u043b\u044c:</b> {role}\n"
            "<b>\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435:</b>\n{message}"
        ).format(
            name=escape_html(name),
            org=escape_html(org) if org else "\u2014",
            email=escape_html(email),
            role=escape_html(role_label),
            message=escape_html(message) if message else "\u2014",
        )

        ok = send_telegram_message(bot_token, chat_id, tg_text)
        if not ok:
            print("Warning: Telegram notification failed, but form data was received")

    return make_response(200, {
        "success": True,
        "message": "\u041e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e",
    })


def handle_test_telegram(conn, event: dict) -> dict:
    """Тестирование подключения к Telegram. Требует авторизации внутреннего пользователя."""
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    user = get_current_internal_user(cur, event)
    if not user:
        return make_response(403, {"error": "Access denied. Internal user required."})

    tg_settings = get_telegram_settings(cur)

    bot_token = tg_settings.get("telegram_bot_token", "").strip()
    chat_id = tg_settings.get("telegram_chat_id", "").strip()

    if not bot_token:
        return make_response(400, {"error": "telegram_bot_token не настроен"})
    if not chat_id:
        return make_response(400, {"error": "telegram_chat_id не настроен"})

    test_text = "\u2705 \u0422\u0435\u0441\u0442\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435. \u0423\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f \u0441 \u0441\u0430\u0439\u0442\u0430 \u041a\u0421\u0418 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e."

    ok = send_telegram_message(bot_token, chat_id, test_text)
    if not ok:
        return make_response(502, {"error": "Не удалось отправить сообщение в Telegram. Проверьте токен и chat_id."})

    return make_response(200, {"success": True})


def handler(event: dict, context) -> dict:
    """Обработка контактной формы и отправка уведомлений в Telegram.

    POST / — отправка обращения с контактной формы сайта.
    POST / (action=test) — тестирование подключения к Telegram (только для admin).
    OPTIONS / — CORS preflight.
    """
    method = event.get("httpMethod", event.get("method", ""))

    if method == "OPTIONS":
        return make_response(200, {})

    if method != "POST":
        return make_response(405, {"error": "Method not allowed"})

    conn = None
    try:
        conn = get_connection()
        return handle_contact_form(conn, event)

    except Exception as exc:
        if conn:
            conn.rollback()
        print("Internal error: {exc}".format(exc=exc))
        return make_response(500, {"error": "Internal server error: {exc}".format(exc=str(exc))})
    finally:
        if conn:
            conn.close()
