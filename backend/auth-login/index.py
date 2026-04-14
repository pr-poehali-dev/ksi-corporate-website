import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta, timezone

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


def handler(event: dict, context) -> dict:
    method = event.get("httpMethod", event.get("method", ""))
    if method == "OPTIONS":
        return make_response(200, {})

    if method != "POST":
        return make_response(405, {"error": "Method not allowed"})

    # Parse body
    raw_body = event.get("body", "{}")
    if isinstance(raw_body, str):
        try:
            body = json.loads(raw_body)
        except json.JSONDecodeError:
            return make_response(400, {"error": "Invalid JSON body"})
    else:
        body = raw_body or {}

    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""

    if not email or not password:
        return make_response(400, {"error": "Email and password are required"})

    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        # Fetch user by email
        cur.execute(
            "SELECT id, email, full_name, user_type, internal_role, password_hash, status "
            "FROM users WHERE email = %s LIMIT 1",
            (email,),
        )
        user = cur.fetchone()

        if not user:
            return make_response(401, {"error": "Invalid email or password"})

        if user["status"] != "active":
            return make_response(403, {"error": "Account is deactivated"})

        # Verify password
        stored_hash = user["password_hash"]
        if isinstance(stored_hash, str):
            stored_hash = stored_hash.encode("utf-8")

        if not bcrypt.checkpw(password.encode("utf-8"), stored_hash):
            return make_response(401, {"error": "Invalid email or password"})

        # Generate session token
        raw_token = secrets.token_hex(32)
        token_hash = hashlib.sha256(raw_token.encode("utf-8")).hexdigest()
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(days=30)

        cur.execute(
            "INSERT INTO user_sessions (user_id, token_hash, expires_at, created_at) "
            "VALUES (%s, %s, %s, %s)",
            (user["id"], token_hash, expires_at, now),
        )

        # Update last_login_at
        cur.execute(
            "UPDATE users SET last_login_at = %s WHERE id = %s",
            (now, user["id"]),
        )

        # Audit log
        cur.execute(
            "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (user["id"], "login", "user", str(user["id"]), json.dumps({"email": email}), now),
        )

        # Fetch company info if client
        company_info = None
        if user["user_type"] == "client":
            cur.execute(
                "SELECT c.id, c.name, cu.role "
                "FROM company_users cu "
                "JOIN companies c ON c.id = cu.company_id "
                "WHERE cu.user_id = %s LIMIT 1",
                (user["id"],),
            )
            company_row = cur.fetchone()
            if company_row:
                company_info = {
                    "id": company_row["id"],
                    "name": company_row["name"],
                    "role": company_row["role"],
                }

        conn.commit()

        return make_response(200, {
            "user": {
                "id": user["id"],
                "email": user["email"],
                "full_name": user["full_name"],
                "user_type": user["user_type"],
                "internal_role": user.get("internal_role"),
            },
            "company": company_info,
            "token": raw_token,
        })

    except Exception as exc:
        if conn:
            conn.rollback()
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()