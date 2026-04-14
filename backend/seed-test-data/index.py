"""Сидирование тестовых данных для платформы КСИ.

Создаёт тестового клиента, компанию, подключает модули,
создаёт задачи и КМ-операции. Обновляет пароль администратора.
Функция идемпотентна — проверяет наличие данных перед вставкой.
"""

import json
import os
import uuid
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

CLIENT_EMAIL = "client@test.ksi"
CLIENT_PASSWORD = "TestClient2026!"
CLIENT_FULL_NAME = "Иванов Иван Александрович"

ADMIN_EMAIL = "admin@ksi.group"
ADMIN_PASSWORD = "KsiAdmin2026!"


def make_response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps(body, default=str, ensure_ascii=False),
    }


def get_connection():
    return psycopg2.connect(DATABASE_URL)


def hash_password(password: str) -> str:
    """Хэширование пароля с помощью bcrypt."""
    return bcrypt.hashpw(
        password.encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")


def handler(event: dict, context) -> dict:
    """Точка входа: создание тестовых данных для платформы КСИ."""
    method = event.get("httpMethod", event.get("method", ""))
    if method == "OPTIONS":
        return make_response(200, {})

    if method != "POST":
        return make_response(405, {"error": "Method not allowed"})

    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        now = datetime.now(timezone.utc)
        results = {}

        # ── 1. Обновляем пароль администратора ──
        admin_hash = hash_password(ADMIN_PASSWORD)
        cur.execute(
            "UPDATE users SET password_hash = %s, updated_at = %s "
            "WHERE email = %s",
            (admin_hash, now, ADMIN_EMAIL),
        )
        results["admin_password_updated"] = cur.rowcount > 0

        # ── 2. Создаём тестового клиента ──
        cur.execute(
            "SELECT id FROM users WHERE email = %s",
            (CLIENT_EMAIL,),
        )
        existing_user = cur.fetchone()

        if existing_user:
            client_user_id = str(existing_user["id"])
            results["client_user"] = "already exists"
        else:
            client_user_id = str(uuid.uuid4())
            client_hash = hash_password(CLIENT_PASSWORD)
            cur.execute(
                "INSERT INTO users "
                "(id, email, password_hash, full_name, user_type, status, created_at, updated_at) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                (
                    client_user_id, CLIENT_EMAIL, client_hash,
                    CLIENT_FULL_NAME, "client", "active", now, now,
                ),
            )
            results["client_user"] = "created"

        # ── 3. Создаём тестовую компанию ──
        company_inn = "7712345678"
        cur.execute(
            "SELECT id FROM companies WHERE inn = %s",
            (company_inn,),
        )
        existing_company = cur.fetchone()

        if existing_company:
            company_id = str(existing_company["id"])
            results["company"] = "already exists"
        else:
            company_id = str(uuid.uuid4())
            cur.execute(
                "INSERT INTO companies "
                "(id, name, inn, ogrn, company_type, status, "
                "balance_available, contact_person, contact_email, contact_phone, "
                "created_at, updated_at) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (
                    company_id,
                    "ООО «Горизонт Девелопмент»",
                    company_inn,
                    "1177712345678",
                    "developer",
                    "active",
                    15000,
                    "Иванов И.А.",
                    CLIENT_EMAIL,
                    "+7 (495) 123-45-67",
                    now,
                    now,
                ),
            )
            results["company"] = "created"

        # ── 4. Связываем пользователя с компанией ──
        cur.execute(
            "SELECT id FROM company_users WHERE company_id = %s AND user_id = %s",
            (company_id, client_user_id),
        )
        if cur.fetchone():
            results["company_user_link"] = "already exists"
        else:
            cur.execute(
                "INSERT INTO company_users (id, company_id, user_id, role, created_at, updated_at) "
                "VALUES (%s, %s, %s, %s, %s, %s)",
                (str(uuid.uuid4()), company_id, client_user_id, "owner", now, now),
            )
            results["company_user_link"] = "created"

        # ── 5. Подключаем модули к компании ──
        cur.execute(
            "SELECT id, name, slug FROM modules ORDER BY sort_order ASC LIMIT 5"
        )
        modules = cur.fetchall()

        modules_connected = []
        for idx, mod in enumerate(modules):
            module_id = str(mod["id"])
            cur.execute(
                "SELECT id FROM company_modules WHERE company_id = %s AND module_id = %s",
                (company_id, module_id),
            )
            if cur.fetchone():
                modules_connected.append({"module": mod["slug"], "status": "already exists"})
                continue

            # Первые 4 — active, пятый — pilot
            cm_status = "active" if idx < 4 else "pilot"
            cur.execute(
                "INSERT INTO company_modules (id, company_id, module_id, status, connected_at) "
                "VALUES (%s, %s, %s, %s, %s)",
                (str(uuid.uuid4()), company_id, module_id, cm_status, now),
            )
            modules_connected.append({"module": mod["slug"], "status": cm_status})

        results["modules_connected"] = modules_connected

        # ── 6. Создаём тестовые задачи ──
        # Получаем первый модуль для привязки задач
        first_module_id = str(modules[0]["id"]) if modules else None

        sample_tasks = [
            {
                "title": "Анализ земельного участка в Подмосковье",
                "description": "Провести юридический анализ участка 12 га в Одинцовском районе.",
                "status": "new",
                "priority": "high",
                "km_estimate": 500,
            },
            {
                "title": "Подготовка визуализации жилого комплекса",
                "description": "3D-визуализация фасадов и благоустройства для ЖК «Горизонт».",
                "status": "in_progress",
                "priority": "normal",
                "km_estimate": 1200,
                "km_reserved": 1200,
            },
            {
                "title": "Оценка инвестиционной привлекательности",
                "description": "Финмодель для проекта многоэтажного ЖК, расчёт IRR и NPV.",
                "status": "review",
                "priority": "normal",
                "km_estimate": 800,
                "km_reserved": 800,
                "km_charged": 600,
            },
            {
                "title": "Маркетинговая стратегия продаж",
                "description": "Разработка стратегии продвижения для старта продаж ЖК.",
                "status": "done",
                "priority": "low",
                "km_estimate": 350,
                "km_reserved": 350,
                "km_charged": 350,
            },
            {
                "title": "Кадастровый анализ территории",
                "description": "Проверка кадастровых данных и границ для участка под коммерческую застройку.",
                "status": "new",
                "priority": "high",
                "km_estimate": 400,
            },
        ]

        tasks_created = []
        for task_data in sample_tasks:
            # Проверяем по title + company_id для идемпотентности
            cur.execute(
                "SELECT id FROM tasks WHERE company_id = %s AND title = %s",
                (company_id, task_data["title"]),
            )
            if cur.fetchone():
                tasks_created.append({"title": task_data["title"], "status": "already exists"})
                continue

            task_id = str(uuid.uuid4())
            deadline = now + timedelta(days=14)
            cur.execute(
                "INSERT INTO tasks "
                "(id, company_id, module_id, title, description, status, priority, "
                "creator_id, km_estimate, km_reserved, km_charged, deadline, created_at, updated_at) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (
                    task_id, company_id, first_module_id,
                    task_data["title"], task_data["description"],
                    task_data["status"], task_data["priority"],
                    client_user_id,
                    task_data.get("km_estimate", 0),
                    task_data.get("km_reserved", 0),
                    task_data.get("km_charged", 0),
                    deadline, now, now,
                ),
            )

            # Лог статуса
            cur.execute(
                "INSERT INTO task_status_log (id, task_id, old_status, new_status, changed_by, created_at) "
                "VALUES (%s, %s, NULL, %s, %s, %s)",
                (str(uuid.uuid4()), task_id, task_data["status"], client_user_id, now),
            )

            tasks_created.append({"title": task_data["title"], "status": "created"})

        results["tasks"] = tasks_created

        # ── 7. Создаём КМ-операции ──
        # Проверяем, есть ли уже операции для этой компании
        cur.execute(
            "SELECT COUNT(*) as cnt FROM km_operations WHERE company_id = %s",
            (company_id,),
        )
        km_count = cur.fetchone()["cnt"]

        if km_count > 0:
            results["km_operations"] = "already exist"
        else:
            # Получаем текущий баланс
            cur.execute(
                "SELECT balance_available, balance_reserved FROM companies WHERE id = %s",
                (company_id,),
            )
            bal = cur.fetchone()
            available = float(bal["balance_available"])
            reserved = float(bal["balance_reserved"])

            km_ops = [
                {
                    "operation_type": "topup",
                    "amount": 20000,
                    "reason": "Первоначальное пополнение баланса",
                },
                {
                    "operation_type": "reserve",
                    "amount": 1200,
                    "reason": "Резерв КМ для задачи: Подготовка визуализации",
                },
                {
                    "operation_type": "reserve",
                    "amount": 800,
                    "reason": "Резерв КМ для задачи: Оценка инвестиционной привлекательности",
                },
                {
                    "operation_type": "charge",
                    "amount": 600,
                    "reason": "Списание КМ: частичное выполнение оценки",
                },
                {
                    "operation_type": "reserve",
                    "amount": 350,
                    "reason": "Резерв КМ для задачи: Маркетинговая стратегия",
                },
                {
                    "operation_type": "charge",
                    "amount": 350,
                    "reason": "Списание КМ: маркетинговая стратегия выполнена",
                },
            ]

            ops_created = []
            for op in km_ops:
                op_id = str(uuid.uuid4())
                amount = op["amount"]
                balance_before = available
                reserved_before = reserved

                if op["operation_type"] == "topup":
                    available += amount
                elif op["operation_type"] == "reserve":
                    available -= amount
                    reserved += amount
                elif op["operation_type"] == "charge":
                    reserved -= amount

                balance_after = available
                reserved_after = reserved

                cur.execute(
                    "INSERT INTO km_operations "
                    "(id, company_id, operation_type, amount, "
                    "balance_before, balance_after, reserved_before, reserved_after, "
                    "reason, operator_id, created_at) "
                    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (
                        op_id, company_id, op["operation_type"], amount,
                        balance_before, balance_after,
                        reserved_before, reserved_after,
                        op["reason"], client_user_id, now,
                    ),
                )
                ops_created.append(op["operation_type"])

            # Обновляем баланс компании до итогового состояния
            cur.execute(
                "UPDATE companies SET balance_available = %s, balance_reserved = %s, updated_at = %s "
                "WHERE id = %s",
                (available, reserved, now, company_id),
            )

            results["km_operations"] = ops_created
            results["final_balance"] = {
                "available": available,
                "reserved": reserved,
            }

        conn.commit()

        return make_response(200, {
            "success": True,
            "message": "Тестовые данные успешно созданы",
            "details": results,
        })

    except Exception as exc:
        if conn:
            conn.rollback()
        return make_response(500, {"error": f"Internal server error: {str(exc)}"})
    finally:
        if conn:
            conn.close()
