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

SYSTEM_PROMPT = """Ты — ИИ-оператор АО КСИ. Твоя главная задача — вести диалог, понимать контекст и выявлять потребность пользователя.

Ты не справочник и не FAQ-бот. Не повторяй каждый раз общий рассказ об АО КСИ.

ЗАПРЕЩЕНО: начинать ответ со слова «Здравствуйте» или любого другого приветствия, если диалог уже идёт (в истории есть хотя бы одно сообщение). Приветствие уместно только в самом первом ответе, если история пуста.

Всегда учитывай историю диалога. Если пользователь отвечает коротко — например «Москва», «3 га», «для жилья», «продажа», «есть ГПЗУ» — воспринимай это как продолжение предыдущего вопроса, а не как новый самостоятельный запрос.

Главное правило: не спрашивай заново то, что пользователь уже сообщил.

Если пользователь сказал, что хочет найти участок под жильё:
- зафиксируй сценарий: земельный поиск;
- уточняй регион, площадь, формат проекта, бюджет, старую/новую Москву, наличие требований к документам;
- не возвращайся к вопросу «участок, актив или проект», потому что intent уже понятен.

Если пользователь сказал регион: продолжай сценарий поиска участка и уточняй следующий параметр.

Если пользователь сказал площадь: продолжай сценарий и уточняй назначение, бюджет или документы.

Если пользователь сказал, что хочет продать актив:
веди сценарий реализации актива: регион, тип актива, площадь, документы, цена, текущие попытки продажи.

Если пользователь спрашивает общий вопрос: ответь кратко и помоги выбрать направление.

Распознавание intent:
— участок/земля/ИЖС/КФХ → земельный поиск → уточняй регион, площадь, назначение, бюджет
— продажа/реализация объекта/актива → реализация актива → уточняй тип, регион, документы, цену
— презентация/концепция/визуализация → проектный креатив → уточняй стадию, формат, объект
— ИИ/автоматизация/чат-бот → лаборатория ИИ → уточняй задачу и контекст
— аналитика/мониторинг/данные → КСИ Терминал → уточняй что именно нужно

Стиль:
- коротко; живо; по-деловому;
- один следующий вопрос за раз;
- не выдавай длинные списки без необходимости;
- не повторяй каталог услуг;
- веди пользователя к понятному запросу.

Пример правильного диалога:
Пользователь: Хочу найти участок под жильё.
Ответ: Понял. Это задача для земельного поиска. В каком регионе или городе ищем участок?

Пользователь: Москва.
Ответ: Принял. Ищем участок под жилой проект в Москве. Рассматриваете только старые границы Москвы или новая Москва тоже подходит?

Пользователь: старая Москва.
Ответ: Хорошо, фокус — старая Москва. Какой масштаб нужен: небольшой участок под точечный проект или площадка под более крупный жилой комплекс?

Главная цель: постепенно собрать структуру запроса и, когда данных достаточно, предложить передать его специалисту АО КСИ.

Если пользователь готов оставить контакт — скажи: «Оставьте имя, компанию и телефон или email — специалист свяжется с вами».

---

КРИТИЧЕСКИ ВАЖНО: ты всегда получаешь dialogState и историю диалога.

Не угадывай контекст только по последнему сообщению. Сначала смотри:
1. activeIntent — уже установленный сценарий;
2. lastAssistantQuestion — последний вопрос, который ты задал;
3. collectedData — уже известные параметры;
4. последние сообщения пользователя в истории.

Если пользователь пишет короткий ответ — «Москва», «3 га», «старая Москва», «есть ГПЗУ», «продать» — воспринимай это как ответ на lastAssistantQuestion, если в dialogState есть активный сценарий. Не начинай диалог заново.

Если пользователь пишет «Привет», «Здравствуйте», «Добрый день»:
- не считай это ответом на старую бизнес-задачу;
- если activeIntent пуст — начни новый диалог мягко;
- если activeIntent установлен — мягко спроси: «Продолжим задачу по [теме] или начнём с нового вопроса?»

Не повторяй общий рассказ об АО КСИ, если activeIntent уже установлен.

Если activeIntent = land_search:
веди сценарий поиска участка, последовательно собирая:
регион → старые/новые границы (если Москва) → площадь → назначение → бюджет → документы → формат результата.

Если activeIntent = asset_realization:
веди сценарий реализации актива, последовательно собирая:
тип актива → регион → площадь → документы → цена → текущая стадия → целевой результат.

Если activeIntent = ksi_terminal:
веди сценарий аналитики, последовательно собирая:
рынок → период → сегмент → компании или активы → формат сводки.

В конце каждого ответа задавай только один следующий уточняющий вопрос."""


INTENT_LABELS = {
    "land_search": "Земельный поиск",
    "asset_realization": "Реализация активов",
    "project_creative": "Проектный креатив",
    "ksi_terminal": "КСИ Терминал",
    "ai_lab": "Лаборатория ИИ",
    "general": "Общий вопрос",
}

STAGE_LABELS = {
    "new": "новый диалог",
    "collecting_requirements": "сбор параметров",
    "answering": "отвечаю на вопрос",
    "ready_to_lead": "готов к передаче специалисту",
}


def build_prompt_with_history(question: str, history: list, dialog_state: dict | None = None) -> str:
    """Формирует полный prompt с историей диалога и dialogState для отправки в Worker."""
    lines = [SYSTEM_PROMPT]

    # Вставляем контекст состояния диалога
    if dialog_state:
        intent = dialog_state.get("activeIntent")
        stage = dialog_state.get("stage", "new")
        last_q = dialog_state.get("lastAssistantQuestion")
        collected = dialog_state.get("collectedData") or {}

        lines.append("\n--- ТЕКУЩЕЕ СОСТОЯНИЕ ДИАЛОГА ---")
        if intent:
            label = INTENT_LABELS.get(intent, intent)
            lines.append(f"Активный сценарий: {label} (intent={intent})")
        else:
            lines.append("Активный сценарий: не определён")
        lines.append(f"Этап: {STAGE_LABELS.get(stage, stage)}")
        if last_q:
            lines.append(f"Последний вопрос ИИ-оператора: «{last_q}»")

        # Уже собранные данные
        filled = {k: v for k, v in collected.items() if v}
        if filled:
            lines.append("Уже известно о пользователе: " + "; ".join(f"{k}={v}" for k, v in filled.items()))

        if intent and stage == "collecting_requirements":
            lines.append(
                "\nВАЖНО: Сценарий уже выбран. Не возвращайся к общему вопросу «участок, актив или проект?». "
                "Продолжай по текущему сценарию и задай следующий уточняющий вопрос."
            )

    lines.append("\n--- ИСТОРИЯ ДИАЛОГА ---")
    for msg in history[-20:]:
        role = msg.get("role", "user")
        content = (msg.get("content") or "").strip()
        if not content:
            continue
        prefix = "Пользователь" if role == "user" else "ИИ-оператор"
        lines.append(f"{prefix}: {content}")

    # Если диалог уже идёт — явно запрещаем приветствие в ответе
    if history:
        lines.append("\n[ПРАВИЛО]: Не начинай ответ с «Здравствуйте», «Добрый день» или любого приветствия. Диалог уже начат.")

    lines.append(f"\n--- НОВОЕ СООБЩЕНИЕ ПОЛЬЗОВАТЕЛЯ ---\nПользователь: {question}\n\nИИ-оператор:")
    return "\n".join(lines)


def extract_answer(raw: str) -> str | None:
    """Извлекает текст ответа из любого формата Worker-ответа."""
    try:
        data = json.loads(raw)
        if isinstance(data, dict):
            # Перебираем все возможные поля
            for key in ("answer", "text", "response", "result", "output", "message", "content"):
                val = data.get(key)
                if val and isinstance(val, str) and val.strip():
                    return val.strip()
            # Логируем неизвестную структуру
            print(f"[WORKER] Unknown response keys: {list(data.keys())}, raw={raw[:200]}")
            return None
        if isinstance(data, str) and data.strip():
            return data.strip()
        if isinstance(data, list) and data:
            first = data[0]
            if isinstance(first, str):
                return first.strip()
            if isinstance(first, dict):
                for key in ("answer", "text", "response", "content"):
                    val = first.get(key)
                    if val and isinstance(val, str):
                        return val.strip()
    except Exception:
        # Не JSON — возвращаем как текст если не пустой
        if raw and raw.strip():
            return raw.strip()
    print(f"[WORKER] Could not extract answer, raw={raw[:200]}")
    return None


def ask_worker(question: str, history: list | None = None, dialog_state: dict | None = None) -> str:
    """Отправляет запрос в Worker. POST /api/text → fallback GET /api/text-get."""
    full_prompt = build_prompt_with_history(question, history or [], dialog_state)
    prompt_len = len(full_prompt)
    print(f"[WORKER] Prompt length: {prompt_len} chars")

    # Попытка 1: POST /api/text
    post_error = None
    try:
        url = f"{WORKER_BASE}/api/text"
        payload = json.dumps({"q": full_prompt}, ensure_ascii=False).encode("utf-8")
        req = urllib.request.Request(
            url, data=payload,
            headers={"Content-Type": "application/json", "User-Agent": "AOKSI-Widget/1.0"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=20) as resp_obj:
            status = resp_obj.status
            raw = resp_obj.read().decode("utf-8")
        print(f"[WORKER] POST status={status}, raw_len={len(raw)}, preview={raw[:100]}")
        answer = extract_answer(raw)
        if answer:
            return answer
        post_error = f"POST returned no usable answer (raw={raw[:100]})"
    except Exception as e:
        post_error = str(e)
        print(f"[WORKER] POST failed: {post_error}")

    # Попытка 2: GET /api/text-get — только последний вопрос + минимальный контекст
    print(f"[WORKER] Falling back to GET, post_error={post_error}")
    # Для GET берём только вопрос + последние 3 сообщения — иначе URL слишком длинный
    history_short = (history or [])[-6:]
    short_prompt = build_prompt_with_history(question, history_short, dialog_state)
    # Ещё раз обрезаем если не влезает
    if len(short_prompt) > 4000:
        short_prompt = f"Ты — ИИ-оператор АО КСИ. Отвечай коротко и по-деловому, один вопрос в конце.\n\nПользователь: {question}\n\nИИ-оператор:"
    encoded = urllib.parse.quote(short_prompt)
    url = f"{WORKER_BASE}/api/text-get?q={encoded}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "AOKSI-Widget/1.0"})
        with urllib.request.urlopen(req, timeout=20) as resp_obj:
            status = resp_obj.status
            raw = resp_obj.read().decode("utf-8")
        print(f"[WORKER] GET status={status}, raw_len={len(raw)}, preview={raw[:100]}")
        answer = extract_answer(raw)
        if answer:
            return answer
    except Exception as e:
        print(f"[WORKER] GET failed: {e}")

    raise RuntimeError("Worker вернул пустой или нечитаемый ответ")


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
        # История диалога из фронтенда: [{role, content}, ...]
        history = body.get("history") or []
        if not isinstance(history, list):
            history = []
        # Обрезаем контент каждого сообщения для безопасности
        history = [{"role": str(m.get("role", "user")), "content": trunc(str(m.get("content", "")), 1000)} for m in history[-20:]]

        # dialogState — состояние диалога с фронтенда
        dialog_state = body.get("dialogState")
        if not isinstance(dialog_state, dict):
            dialog_state = None
        else:
            # Обрезаем строки внутри состояния для безопасности
            safe_ds = {}
            for k in ("activeIntent", "stage", "lastAssistantQuestion"):
                v = dialog_state.get(k)
                safe_ds[k] = trunc(str(v), 200) if v else None
            cd = dialog_state.get("collectedData") or {}
            safe_ds["collectedData"] = {ck: trunc(str(cv), 200) if cv else None for ck, cv in cd.items()}
            dialog_state = safe_ds

        if not question:
            return err("question is required")
        if not session_id:
            return err("sessionId is required")

        try:
            answer = ask_worker(question, history, dialog_state)
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