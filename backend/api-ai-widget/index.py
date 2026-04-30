"""
ИИ-виджет АО КСИ — прокси к Cloudflare Worker + сохранение истории в БД.
Поддерживает: отправку вопроса, получение истории, сохранение лида, очистку сессии.
"""

import json
import os
import time
import urllib.request
import urllib.parse
import psycopg2
from datetime import datetime

WORKER_BASE = "https://patient-union-74df.landsearchservice.workers.dev"
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id, X-Authorization",
    "Access-Control-Max-Age": "86400",
}


def get_db():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def ok(data: dict) -> dict:
    return {"statusCode": 200, "headers": {**CORS_HEADERS, "Content-Type": "application/json"}, "body": json.dumps(data, ensure_ascii=False, default=str)}


def err(msg: str, code: int = 400) -> dict:
    return {"statusCode": code, "headers": {**CORS_HEADERS, "Content-Type": "application/json"}, "body": json.dumps({"error": msg})}


def ask_worker(question: str) -> str:
    """Отправляем вопрос в Cloudflare Worker и получаем ответ."""
    encoded = urllib.parse.quote(question)
    url = f"{WORKER_BASE}/api/text-get?q={encoded}"
    req = urllib.request.Request(url, headers={"User-Agent": "AOKSI-Widget/1.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        raw = resp.read().decode("utf-8")
        try:
            data = json.loads(raw)
            if isinstance(data, dict):
                return data.get("answer") or data.get("text") or data.get("response") or raw
            return raw
        except Exception:
            return raw


def ensure_session(conn, session_id: str, user_id, source_page: str):
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO t_p64876520_ksi_corporate_websit.ai_chat_sessions (session_id, user_id, source_page) "
            "VALUES (%s, %s, %s) ON CONFLICT (session_id) DO UPDATE SET updated_at = NOW(), user_id = COALESCE(%s, ai_chat_sessions.user_id)",
            (session_id, user_id, source_page, user_id)
        )
    conn.commit()


def save_message(conn, session_id: str, user_id, role: str, content: str, page_url: str, metadata: dict):
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO t_p64876520_ksi_corporate_websit.ai_chat_messages "
            "(session_id, user_id, role, content, page_url, metadata) VALUES (%s, %s, %s, %s, %s, %s)",
            (session_id, user_id, role, content, page_url, json.dumps(metadata))
        )
    conn.commit()


def handler(event: dict, context) -> dict:
    method = event.get("httpMethod", "GET")

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = {}
    if event.get("body"):
        try:
            body = json.loads(event["body"])
        except Exception:
            pass

    action = body.get("action", "ask")

    # --- ASK: отправить вопрос ИИ ---
    if method == "POST" and action == "ask":
        question = (body.get("question") or "").strip()
        session_id = body.get("sessionId") or ""
        user_id = body.get("userId")
        page_url = body.get("pageUrl") or ""
        source_page = body.get("sourcePage") or page_url
        is_quick = body.get("isQuick", False)

        if not question:
            return err("question is required")
        if not session_id:
            return err("sessionId is required")

        # Запрашиваем ИИ
        try:
            answer = ask_worker(question)
        except Exception as e:
            return err(f"worker_error: {str(e)}", 502)

        # Сохраняем в БД (только если есть user_id или по желанию всегда)
        try:
            conn = get_db()
            ensure_session(conn, session_id, user_id, source_page)
            meta_user = {"isQuick": is_quick, "userAgent": body.get("userAgent", "")}
            save_message(conn, session_id, user_id, "user", question, page_url, meta_user)
            save_message(conn, session_id, user_id, "assistant", answer, page_url, {})
            conn.close()
        except Exception:
            pass  # не блокируем ответ при ошибке БД

        return ok({"answer": answer, "sessionId": session_id})

    # --- GET HISTORY: история диалога из БД ---
    if method == "GET":
        qs = event.get("queryStringParameters") or {}
        session_id = qs.get("sessionId") or ""
        if not session_id:
            return err("sessionId is required")
        try:
            conn = get_db()
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT role, content, created_at, metadata FROM t_p64876520_ksi_corporate_websit.ai_chat_messages "
                    "WHERE session_id = %s ORDER BY created_at ASC LIMIT 100",
                    (session_id,)
                )
                rows = cur.fetchall()
            conn.close()
            messages = [{"role": r[0], "content": r[1], "createdAt": r[2].isoformat(), "metadata": r[3]} for r in rows]
            return ok({"messages": messages})
        except Exception as e:
            return err(str(e), 500)

    # --- SAVE LEAD: передать запрос специалисту ---
    if method == "POST" and action == "lead":
        session_id = body.get("sessionId") or ""
        user_id = body.get("userId")
        name = body.get("name") or ""
        company = body.get("company") or ""
        phone = body.get("phone") or ""
        email = body.get("email") or ""
        request_text = body.get("requestText") or ""
        chat_summary = body.get("chatSummary") or ""

        if not session_id:
            return err("sessionId is required")

        try:
            conn = get_db()
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO t_p64876520_ksi_corporate_websit.ai_leads "
                    "(session_id, user_id, name, company, phone, email, request_text, chat_summary) "
                    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                    (session_id, user_id, name, company, phone, email, request_text, chat_summary)
                )
            conn.commit()
            conn.close()
        except Exception as e:
            return err(str(e), 500)

        return ok({"saved": True})

    return err("Unknown action or method", 400)
