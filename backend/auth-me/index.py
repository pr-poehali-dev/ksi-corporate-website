import json
import os
import hashlib
from datetime import datetime, timezone

import psycopg2
import psycopg2.extras


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
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
    # Normalize header keys to lower-case for consistent lookup
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

    if method != "GET":
        return make_response(405, {"error": "Method not allowed"})

    raw_token = extract_token(event)
    if not raw_token:
        return make_response(401, {"error": "Authorization token is required"})

    token_hash = hashlib.sha256(raw_token.encode("utf-8")).hexdigest()

    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        # Look up valid session
        cur.execute(
            "SELECT user_id FROM user_sessions "
            "WHERE token_hash = %s AND expires_at > %s "
            "LIMIT 1",
            (token_hash, datetime.now(timezone.utc)),
        )
        session = cur.fetchone()

        if not session:
            return make_response(401, {"error": "Invalid or expired session"})

        user_id = session["user_id"]

        # Fetch user
        cur.execute(
            "SELECT id, email, full_name, user_type, internal_role, status "
            "FROM users WHERE id = %s LIMIT 1",
            (user_id,),
        )
        user = cur.fetchone()

        if not user:
            return make_response(404, {"error": "User not found"})

        if user["status"] != "active":
            return make_response(403, {"error": "Account is deactivated"})

        # Fetch company info if client
        company_info = None
        if user["user_type"] == "client":
            cur.execute(
                "SELECT c.id, c.name, cu.role "
                "FROM company_users cu "
                "JOIN companies c ON c.id = cu.company_id "
                "WHERE cu.user_id = %s LIMIT 1",
                (user_id,),
            )
            company_row = cur.fetchone()
            if company_row:
                company_info = {
                    "id": company_row["id"],
                    "name": company_row["name"],
                    "role": company_row["role"],
                }

        return make_response(200, {
            "user": {
                "id": user["id"],
                "email": user["email"],
                "full_name": user["full_name"],
                "user_type": user["user_type"],
                "internal_role": user.get("internal_role"),
            },
            "company": company_info,
        })

    except Exception as exc:
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()