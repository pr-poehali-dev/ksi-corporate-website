import json
import os
import hashlib
from datetime import datetime, timezone

import psycopg2
import psycopg2.extras


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Authorization",
}

DATABASE_URL = os.environ.get("DATABASE_URL", "")


def make_response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps(body, default=str),
    }


def get_connection():
    return psycopg2.connect(DATABASE_URL)


def extract_token(event: dict) -> str | None:
    headers = event.get("headers") or {}
    normalized = {k.lower(): v for k, v in headers.items()}
    auth_value = normalized.get("x-authorization", "")
    if not auth_value:
        return None
    if auth_value.startswith("Bearer "):
        return auth_value[7:].strip()
    return auth_value.strip()


def handler(event: dict, context) -> dict:
    method = event.get("httpMethod", event.get("method", ""))
    if method == "OPTIONS":
        return make_response(200, {})

    if method != "POST":
        return make_response(405, {"error": "Method not allowed"})

    raw_token = extract_token(event)
    if not raw_token:
        return make_response(401, {"error": "Authorization token is required"})

    token_hash = hashlib.sha256(raw_token.encode("utf-8")).hexdigest()

    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor()

        now = datetime.now(timezone.utc)

        # Invalidate session by setting expires_at to now
        cur.execute(
            "UPDATE user_sessions SET expires_at = %s "
            "WHERE token_hash = %s AND expires_at > %s",
            (now, token_hash, now),
        )

        conn.commit()

        return make_response(200, {"success": True})

    except Exception as exc:
        if conn:
            conn.rollback()
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()
