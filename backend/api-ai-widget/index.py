"""
ИИ-виджет АО КСИ.
Прокси к Cloudflare Worker + сохранение истории в БД + уведомления в Telegram.

Безопасность:
- TG-токен читается только server-side из site_settings
- frontend получает только { ok: true } или нейтральную ошибку
- токен никогда не логируется и не возвращается клиенту
- rate-limit: не более 3 лидов с одного session_id за 10 минут
"""

import json
import os
import urllib.request
import urllib.parse
import urllib.error
import psycopg2
import psycopg2.extras
from datetime import datetime, timezone, timedelta

WORKER_BASE = "https://patient-union-74df.landsearchservice.workers.dev"
SCHEMA = "t_p64876520_ksi_corporate_websit"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id, X-Authorization",
    "Access-Control-Max-Age": "86400",
}

# Rate limit: max 3 лида с одного session_id за RATE_WINDOW минут
RATE_LIMIT_COUNT = 3
RATE_WINDOW_MINUTES = 10

# Максимальные длины входных строк (защита от переполнения)
MAX_FIELD_LEN = 500
MAX_SUMMARY_LEN = 2000
MAX_QUESTION_LEN = 2000


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def get_db():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def resp(status: int, data: dict) -> dict:
    return {
        "statusCode": status,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps(data, ensure_ascii=False, default=str),
    }


def ok(data: dict) -> dict:
    return resp(200, data)


def err(msg: str, code: int = 400) -> dict:
    # Возвращаем нейтральное сообщение — без внутренних деталей
    return resp(code, {"error": msg})


def trunc(value: str, max_len: int) -> str:
    return (value or "")[:max_len]


def escape_html(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# ---------------------------------------------------------------------------
# Telegram — всё server-side, токен никуда не утекает
# ---------------------------------------------------------------------------

def get_telegram_settings(conn) -> dict:
    """Читает TG-настройки из site_settings. Токен остаётся только в памяти функции."""
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(
            f"SELECT key, value FROM {SCHEMA}.site_settings "
            "WHERE key IN ('telegram_bot_token', 'telegram_chat_id', 'telegram_notifications_enabled')"
        )
        return {row["key"]: row["value"] for row in cur.fetchall()}


def send_telegram(bot_token: str, chat_id: str, text: str) -> bool:
    """
    Отправка сообщения через Telegram Bot API.
    Токен присутствует только в URL запроса — не логируется, не возвращается клиенту.
    """
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }).encode("utf-8")
    req = urllib.request.Request(
        url, data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.status == 200
    except urllib.error.HTTPError as e:
        # Логируем только код ошибки, не URL (который содержит токен)
        print(f"[TG] HTTP error: {e.code}")
        return False
    except Exception:
        print("[TG] Send failed (network or timeout)")
        return False


def notify_lead(conn, *, name, company, phone, email, request_text, chat_summary, page_url):
    """Отправляет уведомление в TG. Ошибки не проброшены клиенту."""
    try:
        tg = get_telegram_settings(conn)
        token = tg.get("telegram_bot_token", "").strip()
        chat_id = tg.get("telegram_chat_id", "").strip()
        enabled = tg.get("telegram_notifications_enabled", "false")

        if enabled != "true" or not token or not chat_id:
            print("[TG] Notifications disabled or not configured")
            return

        summary_short = (chat_summary or "")[:600]
        if len(chat_summary or "") > 600:
            summary_short += "…"

        text = (
            "🤖 <b>Новая заявка — ИИ-виджет АО КСИ</b>\n\n"
            f"<b>Имя:</b> {escape_html(name or '—')}\n"
            f"<b>Компания:</b> {escape_html(company or '—')}\n"
            f"<b>Телефон:</b> {escape_html(phone or '—')}\n"
            f"<b>Email:</b> {escape_html(email or '—')}\n"
            f"<b>Задача:</b> {escape_html(request_text or '—')}\n"
            f"<b>Страница:</b> {escape_html(page_url or '—')}\n\n"
            f"<b>Фрагмент диалога:</b>\n{escape_html(summary_short or '—')}"
        )

        sent = send_telegram(token, chat_id, text)
        # Логируем только факт — без токена
        print(f"[TG] Lead notification {'sent' if sent else 'failed'} to chat_id=***")

    except Exception:
        # Любая внутренняя ошибка — молча, не раскрываем клиенту
        print("[TG] notify_lead internal error")


# ---------------------------------------------------------------------------
# Rate limit
# ---------------------------------------------------------------------------

def check_rate_limit(conn, session_id: str) -> bool:
    """True — можно продолжать. False — лимит превышен."""
    window_start = datetime.now(timezone.utc) - timedelta(minutes=RATE_WINDOW_MINUTES)
    with conn.cursor() as cur:
        cur.execute(
            f"SELECT COUNT(*) FROM {SCHEMA}.ai_leads "
            "WHERE session_id = %s AND created_at > %s",
            (session_id, window_start),
        )
        count = cur.fetchone()[0]
    return count < RATE_LIMIT_COUNT


# ---------------------------------------------------------------------------
# DB helpers
# ---------------------------------------------------------------------------

def ensure_session(conn, session_id: str, user_id, source_page: str):
    with conn.cursor() as cur:
        cur.execute(
            f"INSERT INTO {SCHEMA}.ai_chat_sessions (session_id, user_id, source_page) "
            "VALUES (%s, %s, %s) ON CONFLICT (session_id) "
            "DO UPDATE SET updated_at = NOW(), user_id = COALESCE(%s, ai_chat_sessions.user_id)",
            (session_id, user_id, source_page, user_id),
        )
    conn.commit()


def save_message(conn, session_id: str, user_id, role: str, content: str, page_url: str, metadata: dict):
    with conn.cursor() as cur:
        cur.execute(
            f"INSERT INTO {SCHEMA}.ai_chat_messages "
            "(session_id, user_id, role, content, page_url, metadata) VALUES (%s, %s, %s, %s, %s, %s)",
            (session_id, user_id, role, content, page_url, json.dumps(metadata)),
        )
    conn.commit()


# ---------------------------------------------------------------------------
# Worker proxy
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """Ты — ИИ-оператор АО КСИ.

Ты представляешь АО КСИ как операционный центр компании. Твоя роль — не просто отвечать на вопросы, а вести первичный диалог с посетителем сайта, помогать ему сориентироваться и выявлять его реальную потребность.

АО КСИ — оператор интеллектуальной инфраструктуры для девелопмента. Компания строит виртуального девелопера и развивает прикладные ИИ-модули для рынка недвижимости, земли, девелопмента и управления активами.

Ключевые направления:
1. Служба земельного поиска
2. Центр реализации активов
3. Студия проектного креатива
4. Лаборатория ИИ
5. КСИ Терминал
6. КриптоМетры

Главная цель: вовлечь пользователя в диалог, понять его ситуацию и помочь сформулировать первичный запрос.

Каждый ответ должен:
- отвечать на вопрос пользователя
- быть коротким и понятным
- звучать уверенно, спокойно и по-деловому
- мягко вести разговор дальше
- по возможности завершаться уточняющим вопросом

Стиль: русский язык, коротко, живо, деловито, без канцелярита, без длинных каталогов, без простыней текста, без юридических, финансовых и инвестиционных гарантий.

Не нужно перечислять все модули, если пользователь об этом прямо не просит. Если вопрос общий — ответь кратко и помоги сузить выбор.

Пример правильного ответа: «АО КСИ помогает работать с участками, активами и девелоперскими проектами — от поиска и упаковки до аналитики и ИИ-инструментов. С чем вы пришли: участок, актив или проект?»

Если пользователь уже описывает задачу: задай 1–2 уточняющих вопроса и предложи собрать запрос для специалиста.

Если пользователь спрашивает про цены: скажи, что стоимость зависит от модуля и объёма задачи. Предложи описать задачу.

Если пользователь готов передать запрос: попроси имя, компанию, телефон или email и краткое описание задачи.

Вопрос пользователя:"""


def ask_worker(question: str) -> str:
    full_prompt = f"{SYSTEM_PROMPT} {question}"
    encoded = urllib.parse.quote(full_prompt)
    url = f"{WORKER_BASE}/api/text-get?q={encoded}"
    req = urllib.request.Request(url, headers={"User-Agent": "AOKSI-Widget/1.0"})
    with urllib.request.urlopen(req, timeout=20) as resp_obj:
        raw = resp_obj.read().decode("utf-8")
    try:
        data = json.loads(raw)
        if isinstance(data, dict):
            return data.get("answer") or data.get("text") or data.get("response") or raw
        return raw
    except Exception:
        return raw


# ---------------------------------------------------------------------------
# Handler
# ---------------------------------------------------------------------------

def handler(event: dict, context) -> dict:
    method = event.get("httpMethod", "GET")

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body: dict = {}
    if event.get("body"):
        try:
            body = json.loads(event["body"])
        except Exception:
            return err("Invalid JSON body")

    action = body.get("action", "ask")

    # ------------------------------------------------------------------ ASK
    if method == "POST" and action == "ask":
        question = trunc((body.get("question") or "").strip(), MAX_QUESTION_LEN)
        session_id = trunc(body.get("sessionId") or "", 128)
        user_id = body.get("userId")
        page_url = trunc(body.get("pageUrl") or "", 512)
        source_page = trunc(body.get("sourcePage") or page_url, 512)
        is_quick = bool(body.get("isQuick", False))

        if not question:
            return err("question is required")
        if not session_id:
            return err("sessionId is required")

        try:
            answer = ask_worker(question)
        except Exception:
            return err("ИИ-оператор временно недоступен", 502)

        try:
            conn = get_db()
            ensure_session(conn, session_id, user_id, source_page)
            save_message(conn, session_id, user_id, "user", question, page_url,
                         {"isQuick": is_quick, "ua": trunc(body.get("userAgent", ""), 256)})
            save_message(conn, session_id, user_id, "assistant", answer, page_url, {})
            conn.close()
        except Exception:
            pass  # не блокируем ответ при ошибке БД

        return ok({"answer": answer, "sessionId": session_id})

    # --------------------------------------------------------- GET HISTORY
    if method == "GET":
        qs = event.get("queryStringParameters") or {}
        session_id = trunc(qs.get("sessionId") or "", 128)
        if not session_id:
            return err("sessionId is required")
        try:
            conn = get_db()
            with conn.cursor() as cur:
                cur.execute(
                    f"SELECT role, content, created_at FROM {SCHEMA}.ai_chat_messages "
                    "WHERE session_id = %s ORDER BY created_at ASC LIMIT 100",
                    (session_id,),
                )
                rows = cur.fetchall()
            conn.close()
            messages = [{"role": r[0], "content": r[1], "createdAt": r[2].isoformat()} for r in rows]
            return ok({"messages": messages})
        except Exception:
            return err("Не удалось загрузить историю", 500)

    # ----------------------------------------------------------------- LEAD
    if method == "POST" and action == "lead":
        session_id = trunc(body.get("sessionId") or "", 128)
        if not session_id:
            return err("sessionId is required")

        user_id = body.get("userId")
        name = trunc(body.get("name") or "", MAX_FIELD_LEN)
        company = trunc(body.get("company") or "", MAX_FIELD_LEN)
        phone = trunc(body.get("phone") or "", MAX_FIELD_LEN)
        email = trunc(body.get("email") or "", MAX_FIELD_LEN)
        request_text = trunc(body.get("requestText") or "", MAX_FIELD_LEN)
        # chat_summary приходит с фронта — обрезаем, но не возвращаем обратно
        chat_summary = trunc(body.get("chatSummary") or "", MAX_SUMMARY_LEN)
        page_url = trunc(body.get("pageUrl") or "", 512)

        # Минимальная валидация: хотя бы один контакт
        if not name and not phone and not email:
            return err("Укажите имя и контакт для связи")

        try:
            conn = get_db()

            # Rate limit
            if not check_rate_limit(conn, session_id):
                conn.close()
                return err("Слишком много заявок. Повторите позже.", 429)

            with conn.cursor() as cur:
                cur.execute(
                    f"INSERT INTO {SCHEMA}.ai_leads "
                    "(session_id, user_id, name, company, phone, email, request_text, chat_summary) "
                    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                    (session_id, user_id, name, company, phone, email, request_text, chat_summary),
                )
            conn.commit()

            print(f"[LEAD] Saved: session={session_id[:8]}*** name={name[:20]}")

            # TG-уведомление — полностью server-side, ничего не возвращаем клиенту
            notify_lead(
                conn,
                name=name, company=company, phone=phone, email=email,
                request_text=request_text, chat_summary=chat_summary,
                page_url=page_url,
            )

            conn.close()
        except Exception:
            return err("Не удалось сохранить заявку. Попробуйте позже.", 500)

        # Клиент получает только { ok: true }
        return ok({"ok": True})

    return err("Unknown action", 400)