import json
import os
import hashlib
from datetime import datetime, timezone

import psycopg2
import psycopg2.extras


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
}

DATABASE_URL = os.environ.get("DATABASE_URL", "")
SCHEMA = "t_p64876520_ksi_corporate_websit"


def make_response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps(body, default=str),
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


def handle_get(conn) -> dict:
    """Получение всех настроек сайта в виде словаря ключ-значение."""
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(
        "SELECT key, value FROM {schema}.site_settings ORDER BY key".format(
            schema=SCHEMA
        )
    )
    rows = cur.fetchall()
    settings = {row["key"]: row["value"] for row in rows}
    return make_response(200, {"settings": settings})


def handle_put(conn, event: dict) -> dict:
    """Обновление настроек сайта. Требует авторизации внутреннего пользователя."""
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    user = get_current_internal_user(cur, event)
    if not user:
        return make_response(403, {"error": "Access denied. Internal user required."})

    raw_body = event.get("body", "{}")
    if isinstance(raw_body, str):
        try:
            body = json.loads(raw_body)
        except json.JSONDecodeError:
            return make_response(400, {"error": "Invalid JSON body"})
    else:
        body = raw_body or {}

    settings = body.get("settings")
    if not settings or not isinstance(settings, dict):
        return make_response(400, {"error": "Field 'settings' is required and must be an object"})

    now = datetime.now(timezone.utc)

    for key, value in settings.items():
        cur.execute(
            "INSERT INTO {schema}.site_settings (key, value, updated_at) "
            "VALUES (%s, %s, %s) "
            "ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at".format(
                schema=SCHEMA
            ),
            (str(key), str(value), now),
        )

    conn.commit()

    # Возвращаем обновлённые настройки
    cur.execute(
        "SELECT key, value FROM {schema}.site_settings ORDER BY key".format(
            schema=SCHEMA
        )
    )
    rows = cur.fetchall()
    updated_settings = {row["key"]: row["value"] for row in rows}

    return make_response(200, {"settings": updated_settings})


def handler(event: dict, context) -> dict:
    """Управление настройками сайта (реквизиты компании и политика конфиденциальности).

    GET / — публичное получение всех настроек в виде словаря.
    PUT / — обновление настроек (только для внутренних пользователей).
    """
    method = event.get("httpMethod", event.get("method", ""))

    if method == "OPTIONS":
        return make_response(200, {})

    if method not in ("GET", "PUT"):
        return make_response(405, {"error": "Method not allowed"})

    conn = None
    try:
        conn = get_connection()

        if method == "GET":
            return handle_get(conn)

        if method == "PUT":
            return handle_put(conn, event)

    except Exception as exc:
        if conn:
            conn.rollback()
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()
