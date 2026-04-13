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
    """Получение данных дашборда для кабинета клиента или администратора."""
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

        if user["user_type"] == "client":
            # Получаем компанию клиента
            cur.execute(
                "SELECT cu.company_id FROM company_users cu WHERE cu.user_id = %s LIMIT 1",
                (user["id"],),
            )
            row = cur.fetchone()
            if not row:
                return make_response(403, {"error": "No company assigned"})
            company_id = str(row[0])

            # Баланс
            cur.execute(
                "SELECT balance_available, balance_reserved, bonus_balance, bonus_expires_at "
                "FROM companies WHERE id = %s",
                (company_id,),
            )
            bal = cur.fetchone()
            balance = {
                "available": float(bal[0]) if bal and bal[0] else 0,
                "reserved": float(bal[1]) if bal and bal[1] else 0,
                "bonus": float(bal[2]) if bal and bal[2] else 0,
                "bonus_expires_at": str(bal[3]) if bal and bal[3] else None,
            } if bal else {"available": 0, "reserved": 0, "bonus": 0, "bonus_expires_at": None}

            # Активные задачи
            cur.execute(
                "SELECT COUNT(*) FROM tasks WHERE company_id = %s AND status NOT IN ('completed', 'cancelled')",
                (company_id,),
            )
            active_tasks = cur.fetchone()[0]

            # Ожидающие согласования
            cur.execute(
                "SELECT COUNT(*) FROM tasks WHERE company_id = %s AND status = 'pending_approval'",
                (company_id,),
            )
            pending_approvals = cur.fetchone()[0]

            # Последние операции КМ
            cur.execute(
                "SELECT id, operation_type, amount, reason, created_at "
                "FROM km_operations WHERE company_id = %s ORDER BY created_at DESC LIMIT 5",
                (company_id,),
            )
            recent_ops = []
            for r in cur.fetchall():
                recent_ops.append({
                    "id": str(r[0]), "operation_type": r[1],
                    "amount": float(r[2]) if r[2] else 0,
                    "reason": r[3], "created_at": str(r[4]),
                })

            # Активные модули
            cur.execute(
                "SELECT COUNT(*) FROM company_modules WHERE company_id = %s AND status = 'active'",
                (company_id,),
            )
            active_modules = cur.fetchone()[0]

            return make_response(200, {
                "role": "client",
                "balance": balance,
                "active_tasks": active_tasks,
                "pending_approvals": pending_approvals,
                "recent_operations": recent_ops,
                "active_modules": active_modules,
            })

        else:
            # Внутренний сотрудник / админ
            cur.execute("SELECT COUNT(*) FROM companies")
            total_companies = cur.fetchone()[0]

            cur.execute(
                "SELECT COUNT(*) FROM tasks WHERE status NOT IN ('completed', 'cancelled')"
            )
            active_tasks = cur.fetchone()[0]

            cur.execute("SELECT COALESCE(SUM(amount), 0) FROM km_operations")
            total_km = float(cur.fetchone()[0])

            cur.execute(
                "SELECT COUNT(*) FROM tasks WHERE status = 'pending_approval'"
            )
            pending_approvals = cur.fetchone()[0]

            cur.execute(
                "SELECT id, operation_type, amount, reason, created_at, company_id "
                "FROM km_operations ORDER BY created_at DESC LIMIT 5"
            )
            recent_ops = []
            for r in cur.fetchall():
                recent_ops.append({
                    "id": str(r[0]), "operation_type": r[1],
                    "amount": float(r[2]) if r[2] else 0,
                    "reason": r[3], "created_at": str(r[4]),
                    "company_id": str(r[5]) if r[5] else None,
                })

            return make_response(200, {
                "role": "internal",
                "total_companies": total_companies,
                "active_tasks": active_tasks,
                "total_km": total_km,
                "pending_approvals": pending_approvals,
                "recent_operations": recent_ops,
            })

    except Exception as exc:
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()
