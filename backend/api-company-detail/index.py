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
    """Получение детальной информации о компании по ID."""
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

        company_id = get_query_param(event, "id")
        if not company_id:
            return make_response(400, {"error": "Company id parameter is required"})

        # Проверка доступа для клиентов
        if user["user_type"] == "client":
            cur.execute(
                "SELECT company_id FROM company_users WHERE user_id = %s LIMIT 1",
                (user["id"],),
            )
            row = cur.fetchone()
            if not row or str(row[0]) != company_id:
                return make_response(403, {"error": "Access denied"})

        # Основная информация о компании
        cur.execute(
            "SELECT id, name, inn, ogrn, company_type, status, "
            "contact_person, contact_email, contact_phone, "
            "balance_available, balance_reserved, bonus_balance, bonus_expires_at, "
            "created_at, updated_at "
            "FROM companies WHERE id = %s",
            (company_id,),
        )
        c = cur.fetchone()
        if not c:
            return make_response(404, {"error": "Company not found"})

        company = {
            "id": str(c[0]), "name": c[1], "inn": c[2], "ogrn": c[3],
            "company_type": c[4], "status": c[5],
            "contact_person": c[6], "contact_email": c[7], "contact_phone": c[8],
            "balance": {
                "available": float(c[9]) if c[9] else 0,
                "reserved": float(c[10]) if c[10] else 0,
                "bonus": float(c[11]) if c[11] else 0,
                "bonus_expires_at": str(c[12]) if c[12] else None,
            },
            "created_at": str(c[13]),
            "updated_at": str(c[14]) if c[14] else None,
        }

        # Сотрудники
        cur.execute(
            "SELECT u.id, u.email, u.full_name, u.phone, u.status, cu.role, cu.created_at "
            "FROM company_users cu "
            "JOIN users u ON u.id = cu.user_id "
            "WHERE cu.company_id = %s ORDER BY cu.created_at",
            (company_id,),
        )
        employees = []
        for r in cur.fetchall():
            employees.append({
                "id": str(r[0]), "email": r[1], "full_name": r[2],
                "phone": r[3], "status": r[4], "role": r[5],
                "joined_at": str(r[6]) if r[6] else None,
            })

        # Подключённые модули
        cur.execute(
            "SELECT m.id, m.name, m.slug, m.description, cm.status, cm.created_at "
            "FROM company_modules cm "
            "JOIN modules m ON m.id = cm.module_id "
            "WHERE cm.company_id = %s ORDER BY cm.created_at",
            (company_id,),
        )
        modules = []
        for r in cur.fetchall():
            modules.append({
                "id": str(r[0]), "name": r[1], "slug": r[2],
                "description": r[3], "status": r[4],
                "connected_at": str(r[5]) if r[5] else None,
            })

        # Статистика задач
        cur.execute(
            "SELECT status, COUNT(*) FROM tasks WHERE company_id = %s GROUP BY status",
            (company_id,),
        )
        task_stats = {}
        for r in cur.fetchall():
            task_stats[r[0]] = r[1]

        # Всего КМ-операций
        cur.execute(
            "SELECT COUNT(*), COALESCE(SUM(CASE WHEN operation_type = 'charge' THEN amount ELSE 0 END), 0) "
            "FROM km_operations WHERE company_id = %s",
            (company_id,),
        )
        km_row = cur.fetchone()
        km_stats = {
            "total_operations": km_row[0] if km_row else 0,
            "total_charged": float(km_row[1]) if km_row and km_row[1] else 0,
        }

        return make_response(200, {
            "company": company,
            "employees": employees,
            "modules": modules,
            "task_stats": task_stats,
            "km_stats": km_stats,
        })

    except Exception as exc:
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()
