import json
import os
import hashlib
import uuid
from datetime import datetime, timezone

import psycopg2
import psycopg2.extras


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
}

DATABASE_URL = os.environ.get("DATABASE_URL", "")

VALID_OPERATION_TYPES = [
    "topup", "bonus", "reserve", "unreserve", "charge", "correction", "refund",
]


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


def parse_body(event):
    raw_body = event.get("body")
    if raw_body is None or raw_body == "":
        return {}
    if isinstance(raw_body, str):
        try:
            return json.loads(raw_body)
        except (json.JSONDecodeError, ValueError):
            return None
    if isinstance(raw_body, dict):
        return raw_body
    return {}


def handler(event: dict, context) -> dict:
    """Управление КМ-операциями: список и создание операций."""
    method = event.get("httpMethod", event.get("method", ""))
    if method == "OPTIONS":
        return make_response(200, {})

    conn = None
    try:
        conn = get_db()
        cur = conn.cursor()
        user = get_current_user(event, cur)
        if not user:
            return make_response(401, {"error": "Unauthorized"})

        if method == "GET":
            return handle_get(event, cur, user)
        elif method == "POST":
            result = handle_post(event, cur, user)
            conn.commit()
            return result
        else:
            return make_response(405, {"error": "Method not allowed"})

    except Exception as exc:
        if conn:
            conn.rollback()
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()


def handle_get(event, cur, user):
    """Получение списка КМ-операций с фильтрами и пагинацией."""
    page = int(get_query_param(event, "page", "1"))
    per_page = min(int(get_query_param(event, "per_page", "20")), 100)
    offset = (page - 1) * per_page

    conditions = []
    params = []

    if user["user_type"] == "client":
        cur.execute(
            "SELECT company_id FROM company_users WHERE user_id = %s LIMIT 1",
            (user["id"],),
        )
        row = cur.fetchone()
        if not row:
            return make_response(200, {"items": [], "total": 0, "page": page, "per_page": per_page})
        conditions.append("o.company_id = %s")
        params.append(str(row[0]))
    else:
        cid = get_query_param(event, "company_id")
        if cid:
            conditions.append("o.company_id = %s")
            params.append(cid)

    op_type = get_query_param(event, "type")
    if op_type:
        conditions.append("o.operation_type = %s")
        params.append(op_type)

    module_id = get_query_param(event, "module_id")
    if module_id:
        conditions.append("o.module_id = %s")
        params.append(module_id)

    date_from = get_query_param(event, "date_from")
    if date_from:
        conditions.append("o.created_at >= %s")
        params.append(date_from)

    date_to = get_query_param(event, "date_to")
    if date_to:
        conditions.append("o.created_at <= %s")
        params.append(date_to)

    where_clause = ("WHERE " + " AND ".join(conditions)) if conditions else ""

    cur.execute(f"SELECT COUNT(*) FROM km_operations o {where_clause}", params)
    total = cur.fetchone()[0]

    cur.execute(
        f"SELECT o.id, o.company_id, o.operation_type, o.amount, o.reason, "
        f"o.task_id, o.module_id, o.balance_before, o.balance_after, "
        f"o.reserved_before, o.reserved_after, o.created_at, o.created_by, "
        f"c.name as company_name, u.full_name as created_by_name, "
        f"m.name as module_name "
        f"FROM km_operations o "
        f"LEFT JOIN companies c ON c.id = o.company_id "
        f"LEFT JOIN users u ON u.id = o.created_by "
        f"LEFT JOIN modules m ON m.id = o.module_id "
        f"{where_clause} "
        f"ORDER BY o.created_at DESC LIMIT %s OFFSET %s",
        params + [per_page, offset],
    )

    columns = [desc[0] for desc in cur.description]
    items = []
    for row in cur.fetchall():
        r = dict(zip(columns, row))
        items.append({
            "id": str(r["id"]),
            "company_id": str(r["company_id"]) if r["company_id"] else None,
            "company_name": r["company_name"],
            "operation_type": r["operation_type"],
            "amount": float(r["amount"]) if r["amount"] else 0,
            "reason": r["reason"],
            "task_id": str(r["task_id"]) if r["task_id"] else None,
            "module_id": str(r["module_id"]) if r["module_id"] else None,
            "module_name": r["module_name"],
            "balance_before": float(r["balance_before"]) if r["balance_before"] is not None else None,
            "balance_after": float(r["balance_after"]) if r["balance_after"] is not None else None,
            "reserved_before": float(r["reserved_before"]) if r["reserved_before"] is not None else None,
            "reserved_after": float(r["reserved_after"]) if r["reserved_after"] is not None else None,
            "created_at": str(r["created_at"]),
            "created_by_name": r["created_by_name"],
        })

    return make_response(200, {
        "items": items, "total": total, "page": page, "per_page": per_page,
    })


def handle_post(event, cur, user):
    """Создание КМ-операции (только для внутренних пользователей)."""
    if user["user_type"] != "internal":
        return make_response(403, {"error": "Only internal users can create KM operations"})

    body = parse_body(event)
    if body is None:
        return make_response(400, {"error": "Invalid JSON body"})

    company_id = body.get("company_id")
    operation_type = body.get("operation_type")
    amount = body.get("amount")
    reason = body.get("reason", "")
    task_id = body.get("task_id")
    module_id = body.get("module_id")

    if not company_id:
        return make_response(400, {"error": "company_id is required"})
    if not operation_type or operation_type not in VALID_OPERATION_TYPES:
        return make_response(400, {
            "error": f"operation_type must be one of: {', '.join(VALID_OPERATION_TYPES)}"
        })
    if amount is None or float(amount) <= 0:
        return make_response(400, {"error": "amount must be a positive number"})

    amount = float(amount)

    # Получаем текущий баланс
    cur.execute(
        "SELECT balance_available, balance_reserved, bonus_balance "
        "FROM companies WHERE id = %s FOR UPDATE",
        (company_id,),
    )
    bal = cur.fetchone()
    if not bal:
        return make_response(404, {"error": "Company not found"})

    available = float(bal[0]) if bal[0] else 0
    reserved = float(bal[1]) if bal[1] else 0
    bonus = float(bal[2]) if bal[2] else 0

    balance_before = available
    reserved_before = reserved
    new_available = available
    new_reserved = reserved
    new_bonus = bonus

    if operation_type == "topup":
        new_available = available + amount
    elif operation_type == "bonus":
        new_bonus = bonus + amount
    elif operation_type == "reserve":
        if available < amount:
            return make_response(400, {"error": f"Insufficient balance. Available: {available}, requested: {amount}"})
        new_available = available - amount
        new_reserved = reserved + amount
    elif operation_type == "unreserve":
        if reserved < amount:
            return make_response(400, {"error": f"Insufficient reserved balance. Reserved: {reserved}, requested: {amount}"})
        new_available = available + amount
        new_reserved = reserved - amount
    elif operation_type == "charge":
        if reserved < amount:
            return make_response(400, {"error": f"Insufficient reserved balance for charge. Reserved: {reserved}, requested: {amount}"})
        new_reserved = reserved - amount
    elif operation_type == "correction":
        new_available = available + amount  # amount может быть положительным или отрицательным через reason
    elif operation_type == "refund":
        new_available = available + amount

    # Обновляем баланс
    cur.execute(
        "UPDATE companies SET balance_available = %s, balance_reserved = %s, bonus_balance = %s, updated_at = %s "
        "WHERE id = %s",
        (new_available, new_reserved, new_bonus, datetime.now(timezone.utc), company_id),
    )

    balance_after = new_available
    reserved_after = new_reserved

    # Создаём запись операции
    op_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)

    cur.execute(
        "INSERT INTO km_operations (id, company_id, operation_type, amount, reason, "
        "task_id, module_id, balance_before, balance_after, reserved_before, reserved_after, "
        "created_by, created_at) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (op_id, company_id, operation_type, amount, reason,
         task_id, module_id, balance_before, balance_after,
         reserved_before, reserved_after, user["id"], now),
    )

    # Audit log
    cur.execute(
        "INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, created_at) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (user["id"], f"km_{operation_type}", "km_operation", op_id,
         json.dumps({
             "company_id": company_id, "amount": amount,
             "balance_before": balance_before, "balance_after": balance_after,
             "reserved_before": reserved_before, "reserved_after": reserved_after,
         }), now),
    )

    return make_response(201, {
        "id": op_id,
        "operation_type": operation_type,
        "amount": amount,
        "balance_before": balance_before,
        "balance_after": balance_after,
        "reserved_before": reserved_before,
        "reserved_after": reserved_after,
    })
