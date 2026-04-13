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
    """Получение баланса КМ для компании."""
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

        # Определяем company_id
        if user["user_type"] == "client":
            cur.execute(
                "SELECT company_id FROM company_users WHERE user_id = %s LIMIT 1",
                (user["id"],),
            )
            row = cur.fetchone()
            if not row:
                return make_response(403, {"error": "No company assigned"})
            company_id = str(row[0])
        else:
            company_id = get_query_param(event, "company_id")
            if not company_id:
                return make_response(400, {"error": "company_id parameter is required for admin"})

        # Баланс компании
        cur.execute(
            "SELECT balance_available, balance_reserved, bonus_balance, bonus_expires_at "
            "FROM companies WHERE id = %s",
            (company_id,),
        )
        bal = cur.fetchone()
        if not bal:
            return make_response(404, {"error": "Company not found"})

        # Суммы операций
        cur.execute(
            "SELECT "
            "COALESCE(SUM(CASE WHEN operation_type = 'charge' THEN amount ELSE 0 END), 0) as total_charged, "
            "COALESCE(SUM(CASE WHEN operation_type = 'topup' THEN amount ELSE 0 END), 0) as total_topped_up "
            "FROM km_operations WHERE company_id = %s",
            (company_id,),
        )
        sums = cur.fetchone()

        return make_response(200, {
            "company_id": company_id,
            "available": float(bal[0]) if bal[0] else 0,
            "reserved": float(bal[1]) if bal[1] else 0,
            "bonus": float(bal[2]) if bal[2] else 0,
            "bonus_expires_at": str(bal[3]) if bal[3] else None,
            "total_charged": float(sums[0]) if sums else 0,
            "total_topped_up": float(sums[1]) if sums else 0,
        })

    except Exception as exc:
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()
