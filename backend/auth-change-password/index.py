import json
import os
import hashlib
from datetime import datetime, timezone

import bcrypt
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

    # Authenticate via session token
    raw_token = extract_token(event)
    if not raw_token:
        return make_response(401, {"error": "Authorization token is required"})

    token_hash = hashlib.sha256(raw_token.encode("utf-8")).hexdigest()

    # Parse body
    raw_body = event.get("body")
    if raw_body is None or raw_body == "":
        body = {}
    elif isinstance(raw_body, str):
        try:
            body = json.loads(raw_body)
        except (json.JSONDecodeError, ValueError):
            return make_response(400, {"error": "Invalid JSON body"})
    elif isinstance(raw_body, dict):
        body = raw_body
    else:
        body = {}

    current_password = body.get("current_password") or ""
    new_password = body.get("new_password") or ""

    if not current_password or not new_password:
        return make_response(400, {"error": "current_password and new_password are required"})

    if len(new_password) < 8:
        return make_response(400, {"error": "New password must be at least 8 characters"})

    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        now = datetime.now(timezone.utc)

        # Validate session
        cur.execute(
            "SELECT user_id FROM user_sessions "
            "WHERE token_hash = %s AND expires_at > %s "
            "LIMIT 1",
            (token_hash, now),
        )
        session = cur.fetchone()

        if not session:
            return make_response(401, {"error": "Invalid or expired session"})

        user_id = session["user_id"]

        # Fetch user with password hash
        cur.execute(
            "SELECT id, email, password_hash, is_active "
            "FROM users WHERE id = %s LIMIT 1",
            (user_id,),
        )
        user = cur.fetchone()

        if not user:
            return make_response(404, {"error": "User not found"})

        if not user["is_active"]:
            return make_response(403, {"error": "Account is deactivated"})

        # Verify current password
        stored_hash = user["password_hash"]
        if isinstance(stored_hash, str):
            stored_hash = stored_hash.encode("utf-8")

        if not bcrypt.checkpw(current_password.encode("utf-8"), stored_hash):
            return make_response(401, {"error": "Current password is incorrect"})

        # Hash new password and update
        new_hash = bcrypt.hashpw(
            new_password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

        cur.execute(
            "UPDATE users SET password_hash = %s, updated_at = %s WHERE id = %s",
            (new_hash, now, user_id),
        )

        # Audit log
        cur.execute(
            "INSERT INTO audit_log (user_id, action, details, created_at) "
            "VALUES (%s, %s, %s, %s)",
            (user_id, "change_password", json.dumps({"email": user["email"]}), now),
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