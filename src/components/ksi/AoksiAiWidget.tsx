import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

// ─── Constants ────────────────────────────────────────────────────────────────

const WIDGET_URL = "https://functions.poehali.dev/2cd3918f-adc8-4de1-9063-4a0c1827bbe4";
const SESSION_KEY = "aoksi_ai_session_id";
const HISTORY_KEY = "aoksi_ai_chat_history";
const DIALOG_STATE_KEY = "aoksi_ai_dialog_state";
const MIN_REPLY_DELAY = 1800;
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 минут

const GREETING =
  "Здравствуйте. Я ИИ-оператор АО КСИ. Могу помочь с участком, активом, проектом или аналитикой. С чем вы пришли?";

const INACTIVITY_MESSAGE =
  "Можем продолжить прежнюю тему или начать новый запрос. Что выбираете?";

const QUICK_QUESTIONS: { label: string; intent: IntentType | null }[] = [
  { label: "Чем занимается АО КСИ?", intent: "general" },
  { label: "Земельный поиск", intent: "land_search" },
  { label: "Реализация активов", intent: "asset_realization" },
  { label: "Проектный креатив", intent: "project_creative" },
  { label: "КСИ Терминал", intent: "ksi_terminal" },
  { label: "Подключить проект", intent: "ready_to_lead" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type IntentType =
  | "land_search"
  | "asset_realization"
  | "project_creative"
  | "ksi_terminal"
  | "ai_lab"
  | "ready_to_lead"
  | "general";

type StageType = "new" | "collecting_requirements" | "answering" | "ready_to_lead";

interface CollectedData {
  role: string | null;
  region: string | null;
  city: string | null;
  assetType: string | null;
  purpose: string | null;
  area: string | null;
  budget: string | null;
  documents: string | null;
  contact: string | null;
}

interface DialogState {
  activeIntent: IntentType | null;
  stage: StageType;
  lastAssistantQuestion: string | null;
  collectedData: CollectedData;
  lastActivityAt: number;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  isQuick?: boolean;
}

interface LeadForm {
  name: string;
  company: string;
  phone: string;
  email: string;
  requestText: string;
}

// ─── Default state ────────────────────────────────────────────────────────────

function defaultDialogState(): DialogState {
  return {
    activeIntent: null,
    stage: "new",
    lastAssistantQuestion: null,
    collectedData: {
      role: null, region: null, city: null, assetType: null,
      purpose: null, area: null, budget: null, documents: null, contact: null,
    },
    lastActivityAt: Date.now(),
  };
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getOrCreateSessionId(): string {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = "s_" + generateId();
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

function loadLocalHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLocalHistory(msgs: ChatMessage[]) {
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(msgs));
}

function loadDialogState(): DialogState {
  try {
    const raw = sessionStorage.getItem(DIALOG_STATE_KEY);
    return raw ? { ...defaultDialogState(), ...JSON.parse(raw) } : defaultDialogState();
  } catch { return defaultDialogState(); }
}

function saveDialogState(state: DialogState) {
  sessionStorage.setItem(DIALOG_STATE_KEY, JSON.stringify(state));
}

// ─── Intent detection from quick buttons ─────────────────────────────────────

function intentFromQuickLabel(label: string): IntentType | null {
  const q = QUICK_QUESTIONS.find((x) => x.label === label);
  return q?.intent ?? null;
}

// ─── Frontend dialogState updater (по простым правилам) ──────────────────────

function updateDialogStateAfterExchange(
  state: DialogState,
  userText: string,
  aiAnswer: string,
  forcedIntent?: IntentType | null,
): DialogState {
  const next = { ...state, lastActivityAt: Date.now() };

  // Установить intent если передан принудительно (быстрая кнопка)
  if (forcedIntent) {
    next.activeIntent = forcedIntent === "ready_to_lead" ? "ready_to_lead" : forcedIntent;
    next.stage = forcedIntent === "ready_to_lead" ? "ready_to_lead" : "collecting_requirements";
  }

  // Автоопределение intent по тексту пользователя (если ещё не установлен)
  if (!next.activeIntent) {
    const t = userText.toLowerCase();
    if (/участ|земл|ижс|кфх|надел|гектар|га\b/.test(t)) {
      next.activeIntent = "land_search";
      next.stage = "collecting_requirements";
    } else if (/продать|реализ|актив|объект|склад|здани/.test(t)) {
      next.activeIntent = "asset_realization";
      next.stage = "collecting_requirements";
    } else if (/презентац|концепц|визуализ|бренд|айдентик|креатив/.test(t)) {
      next.activeIntent = "project_creative";
      next.stage = "collecting_requirements";
    } else if (/аналитик|монитор|данн|терминал/.test(t)) {
      next.activeIntent = "ksi_terminal";
      next.stage = "collecting_requirements";
    } else if (/ии|чат.бот|автоматиз|нейр|алгоритм/.test(t)) {
      next.activeIntent = "ai_lab";
      next.stage = "collecting_requirements";
    }
  }

  // Извлечение данных по ключевым словам из последнего вопроса ИИ
  const lastQ = (state.lastAssistantQuestion || "").toLowerCase();
  const userLower = userText.toLowerCase();
  const cd = { ...next.collectedData };

  if (/регион|город|где|москв|питер|областi/.test(lastQ)) {
    cd.region = userText.trim();
    cd.city = userText.trim();
  } else if (/площадь|гектар|га|соток|размер/.test(lastQ)) {
    cd.area = userText.trim();
  } else if (/бюджет|стоимость|цена|сколько/.test(lastQ)) {
    cd.budget = userText.trim();
  } else if (/назначени|жильё|жилой|коммерч/.test(lastQ)) {
    cd.purpose = userText.trim();
  } else if (/документ|гпзу|разрешен/.test(lastQ)) {
    cd.documents = userText.trim();
  } else if (/тип|вид|формат|объект/.test(lastQ)) {
    cd.assetType = userText.trim();
  }

  // Прямые сигналы из текста (без привязки к вопросу)
  if (/старая москва|старые границы/.test(userLower)) cd.city = "Москва (старые границы)";
  if (/новая москва/.test(userLower)) cd.city = "Новая Москва";

  next.collectedData = cd;

  // Сохранить последний вопрос ИИ (если ответ содержит вопросительный знак)
  const lastSentence = aiAnswer.split(/[.!]/).reverse().find((s) => s.includes("?")) || null;
  next.lastAssistantQuestion = lastSentence ? lastSentence.trim() : null;

  // Переход в ready_to_lead если ИИ предложил оставить контакт
  if (/оставьте|телефон|email|специалист свяжется/.test(aiAnswer.toLowerCase())) {
    next.stage = "ready_to_lead";
  }

  return next;
}

// ─── Greeting messages ────────────────────────────────────────────────────────

const isGreeting = (text: string) =>
  /^(привет|здравствуй|добрый|доброе|hello|hi|ку|хай)\b/i.test(text.trim());

// ─── Visual components ────────────────────────────────────────────────────────

function NeuralBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="neural-grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="glow-center" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#neural-grid)" />
      <rect width="100%" height="100%" fill="url(#glow-center)" />
    </svg>
  );
}

function StatusIndicator({ thinking }: { thinking: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className={cn(
          "absolute inline-flex h-full w-full rounded-full opacity-75",
          thinking ? "animate-ping bg-amber-400" : "animate-ping bg-emerald-400"
        )} />
        <span className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          thinking ? "bg-amber-400" : "bg-emerald-400"
        )} />
      </span>
      <span className={cn(
        "font-mono text-[11px] tracking-[0.15em] uppercase transition-colors",
        thinking ? "text-amber-400/70" : "text-emerald-400/70"
      )}>
        {thinking ? "формирует ответ…" : "онлайн · готов к диалогу"}
      </span>
    </div>
  );
}

// Метки полей для отображения
const COLLECTED_FIELD_LABELS: Partial<Record<keyof CollectedData, string>> = {
  city: "Город / регион",
  region: "Регион",
  area: "Площадь",
  purpose: "Назначение",
  budget: "Бюджет",
  assetType: "Тип объекта",
  documents: "Документы",
  role: "Роль",
};

function CollectedDataPanel({ data }: { data: CollectedData }) {
  const entries = Object.entries(COLLECTED_FIELD_LABELS)
    .map(([key, label]) => ({ key, label, value: data[key as keyof CollectedData] }))
    .filter(({ key, value }) => {
      if (!value) return false;
      // Не дублируем city и region если они одинаковые
      if (key === "region" && data.city === data.region) return false;
      return true;
    });

  if (entries.length === 0) return null;

  return (
    <div
      className="relative z-10 flex-shrink-0 px-6 sm:px-8 py-2"
      style={{ borderBottom: "1px solid rgba(0,212,255,0.06)", background: "rgba(0,212,255,0.02)" }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon name="ClipboardList" size={10} className="text-[#00d4ff]/30" />
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#00d4ff]/30">
          Зафиксировано
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {entries.map(({ key, label, value }) => (
          <div
            key={key}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}
          >
            <span className="text-[9px] font-mono text-[#00d4ff]/35 uppercase tracking-wide">{label}</span>
            <span className="text-[11px] text-white/60 font-ibm">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mt-0.5">
        <Icon name="Bot" size={13} className="text-[#00d4ff]" />
      </div>
      <div className="rounded-2xl rounded-bl-sm bg-[#0f1520] border border-white/6 px-4 py-3">
        <p className="text-[11px] text-[#00d4ff]/50 font-mono tracking-wide mb-2 uppercase">
          Операционный центр формирует ответ…
        </p>
        <div className="flex gap-1.5 items-center">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]/50 animate-bounce [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]/50 animate-bounce [animation-delay:160ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]/50 animate-bounce [animation-delay:320ms]" />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AoksiAiWidget() {
  const { user } = useAuth();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [dialogState, setDialogState] = useState<DialogState>(defaultDialogState);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: "", company: "", phone: "", email: "", requestText: "" });
  const [leadSaving, setLeadSaving] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showInactivityPrompt, setShowInactivityPrompt] = useState(false);

  const sessionId = useRef<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const greetingShown = useRef(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Загрузка из хранилища при старте
  useEffect(() => {
    sessionId.current = getOrCreateSessionId();
    const saved = loadLocalHistory();
    const savedState = loadDialogState();
    setMessages(saved);
    setDialogState(savedState);
    if (saved.length > 0) greetingShown.current = true;
  }, []);

  // Таймер неактивности 30 мин
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    setShowInactivityPrompt(false);
    inactivityTimer.current = setTimeout(() => {
      setShowInactivityPrompt(true);
    }, INACTIVITY_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    if (open) resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [open, resetInactivityTimer]);

  // Блокировка скролла + приветствие
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 200);

      if (!greetingShown.current) {
        greetingShown.current = true;
        setTimeout(() => {
          setThinking(true);
          setTimeout(() => {
            addMessage({ role: "assistant", content: GREETING });
            setThinking(false);
          }, 1000);
        }, 300);
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, thinking]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const addMessage = useCallback((msg: Omit<ChatMessage, "id" | "createdAt">) => {
    const full: ChatMessage = { ...msg, id: generateId(), createdAt: new Date().toISOString() };
    setMessages((prev) => {
      const next = [...prev, full];
      saveLocalHistory(next);
      return next;
    });
    return full;
  }, []);

  const sendQuestion = useCallback(async (
    question: string,
    isQuick = false,
    forcedIntent?: IntentType | null,
  ) => {
    if (!question.trim() || loading) return;
    setInput("");
    setLoading(true);
    setThinking(true);
    setHasUnread(false);
    setShowInactivityPrompt(false);
    resetInactivityTimer();

    // Снимаем историю и состояние ДО добавления нового сообщения
    const historySnapshot = messages.map((m) => ({ role: m.role, content: m.content }));
    const stateSnapshot = { ...dialogState };

    // Для приветствий — не передаём активный intent, чтобы ИИ начал мягко
    const stateToSend = isGreeting(question)
      ? { ...stateSnapshot, activeIntent: null, stage: "new" as StageType }
      : stateSnapshot;

    addMessage({ role: "user", content: question, isQuick });

    const startedAt = Date.now();

    try {
      const resp = await fetch(WIDGET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          action: "ask",
          question,
          history: historySnapshot,
          dialogState: stateToSend,
          sessionId: sessionId.current,
          userId: user?.id ?? null,
          pageUrl: window.location.href,
          sourcePage: location.pathname,
          isQuick,
          userAgent: navigator.userAgent,
        }),
      });
      const data = await resp.json();
      const answer = data.answer || "ИИ-оператор не вернул ответ.";
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_REPLY_DELAY - elapsed);

      setTimeout(() => {
        setThinking(false);
        addMessage({ role: "assistant", content: answer });
        setLoading(false);
        if (!open) setHasUnread(true);

        // Обновляем dialogState по правилам фронтенда
        setDialogState((prev) => {
          const updated = updateDialogStateAfterExchange(prev, question, answer, forcedIntent ?? undefined);
          saveDialogState(updated);
          return updated;
        });
      }, remaining);
    } catch {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_REPLY_DELAY - elapsed);
      setTimeout(() => {
        setThinking(false);
        addMessage({ role: "assistant", content: "ИИ-оператор временно недоступен. Попробуйте позже или направьте запрос специалисту." });
        setLoading(false);
      }, remaining);
    }
  }, [loading, messages, dialogState, user, location.pathname, open, addMessage, resetInactivityTimer]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendQuestion(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion(input.trim());
    }
  };

  const clearHistory = () => {
    sessionStorage.removeItem(HISTORY_KEY);
    sessionStorage.removeItem(DIALOG_STATE_KEY);
    const newSid = "s_" + generateId();
    sessionStorage.setItem(SESSION_KEY, newSid);
    sessionId.current = newSid;
    setMessages([]);
    setDialogState(defaultDialogState());
    setShowLead(false);
    setLeadSent(false);
    setShowInactivityPrompt(false);
    greetingShown.current = false;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name && !leadForm.phone && !leadForm.email) return;
    setLeadSaving(true);
    const summary = messages.slice(-8).map((m) => `${m.role === "user" ? "Пользователь" : "ИИ"}: ${m.content}`).join("\n");
    try {
      await fetch(WIDGET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "lead",
          sessionId: sessionId.current,
          userId: user?.id ?? null,
          pageUrl: window.location.href,
          ...leadForm,
          chatSummary: summary,
        }),
      });
      setLeadSent(true);
      setShowLead(false);
      addMessage({ role: "assistant", content: "Запрос принят. Специалист АО КСИ свяжется с вами в ближайшее время." });
      setDialogState((prev) => {
        const updated = { ...prev, stage: "ready_to_lead" as StageType, lastActivityAt: Date.now() };
        saveDialogState(updated);
        return updated;
      });
    } catch {
      addMessage({ role: "assistant", content: "Не удалось отправить заявку. Попробуйте позже." });
    } finally {
      setLeadSaving(false);
    }
  };

  // Intent badge для хедера
  const intentLabels: Record<string, string> = {
    land_search: "Земельный поиск",
    asset_realization: "Реализация актива",
    project_creative: "Проектный креатив",
    ksi_terminal: "КСИ Терминал",
    ai_lab: "Лаборатория ИИ",
    ready_to_lead: "Передача специалисту",
    general: "Общий вопрос",
  };

  return (
    <>
      {/* ─── Плавающая кнопка ─── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Вызвать ИИ-оператора АО КСИ"
        className={cn(
          "fixed bottom-6 right-6 z-[9990] flex items-center gap-2.5 rounded-full px-5 py-3",
          "bg-[#080b12] border border-[#00d4ff]/25 shadow-[0_0_28px_rgba(0,212,255,0.15)]",
          "text-white/85 text-sm font-medium transition-all duration-300",
          "hover:border-[#00d4ff]/55 hover:shadow-[0_0_40px_rgba(0,212,255,0.28)] hover:bg-[#0c1019]",
          "active:scale-95",
          open && "opacity-0 pointer-events-none scale-90"
        )}
        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <Icon name="Bot" size={15} className="text-[#00d4ff]" />
        <span>Вызвать ИИ</span>
        {hasUnread && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#00d4ff] border-2 border-[#080b12]" />
        )}
      </button>

      {/* ─── Fullscreen overlay ─── */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: "rgba(4,6,12,0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            className="relative flex flex-col w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-3xl sm:rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #080c15 0%, #060a11 60%, #050810 100%)",
              border: "1px solid rgba(0,212,255,0.12)",
              boxShadow: "0 0 0 1px rgba(0,212,255,0.04), 0 0 80px rgba(0,212,255,0.08), 0 40px 120px rgba(0,0,0,0.8)",
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <NeuralBackground />

            {/* ─── Header ─── */}
            <div
              className="relative z-10 flex-shrink-0 px-6 py-4 sm:px-8 sm:py-5"
              style={{ borderBottom: "1px solid rgba(0,212,255,0.08)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#00d4ff]/40">
                      ◆ АО «КРИПТОСТРОЙИНВЕСТ»
                    </span>
                    {/* Intent badge */}
                    {dialogState.activeIntent && (
                      <span className="rounded-full px-2 py-0.5 text-[9px] font-mono tracking-wide uppercase"
                        style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", color: "rgba(0,212,255,0.6)" }}>
                        {intentLabels[dialogState.activeIntent] ?? dialogState.activeIntent}
                      </span>
                    )}
                  </div>
                  <h1 className="font-oswald text-white text-xl sm:text-2xl font-semibold leading-tight tracking-wide">
                    Операционный центр АО КСИ
                  </h1>
                  <p className="font-ibm text-white/30 text-xs mt-0.5 leading-relaxed hidden sm:block">
                    ИИ-оператор готов к диалогу, первичной навигации и формированию запроса
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Голосовой режим — disabled */}
                  <div className="relative group">
                    <button
                      disabled
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] border border-white/8 text-white/20 cursor-not-allowed"
                    >
                      <Icon name="Mic" size={12} />
                      <span className="hidden sm:inline">Голосовой</span>
                    </button>
                    <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-20">
                      <div className="bg-[#0f1520] border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white/50 whitespace-nowrap shadow-xl">
                        Скоро эта функция будет доступна
                      </div>
                    </div>
                  </div>

                  {/* Новый диалог */}
                  <button
                    onClick={clearHistory}
                    className="rounded-lg p-2 text-white/20 hover:text-white/50 hover:bg-white/5 transition-colors"
                    title="Начать новый диалог"
                  >
                    <Icon name="RotateCcw" size={14} />
                  </button>

                  {/* Закрыть */}
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-2 text-white/25 hover:text-white/70 hover:bg-white/5 transition-colors"
                    title="Закрыть"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>

              <StatusIndicator thinking={thinking} />
            </div>

            {/* ─── Быстрые вопросы (пустой чат) ─── */}
            {messages.length === 0 && !thinking && (
              <div
                className="relative z-10 flex-shrink-0 px-6 py-3 sm:px-8"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/20 mb-2">
                  Быстрый старт
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map(({ label, intent }) => (
                    <button
                      key={label}
                      onClick={() => sendQuestion(label, true, intent)}
                      disabled={loading}
                      className="rounded-full border border-[#00d4ff]/15 bg-[#00d4ff]/5 px-3 py-1 text-[11px] text-[#00d4ff]/55 hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]/80 hover:border-[#00d4ff]/30 transition-all disabled:opacity-30"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Зафиксированные данные ─── */}
            <CollectedDataPanel data={dialogState.collectedData} />

            {/* ─── Сообщения ─── */}
            <div
              className="relative z-10 flex-1 overflow-y-auto px-6 py-5 sm:px-8 space-y-4 min-h-0"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,212,255,0.1) transparent" }}
            >
              {messages.length === 0 && !thinking && (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)", boxShadow: "0 0 40px rgba(0,212,255,0.08)" }}
                  >
                    <Icon name="Bot" size={28} className="text-[#00d4ff]/50" />
                  </div>
                  <div>
                    <p className="font-oswald text-white/50 text-lg font-medium">ИИ-оператор АО КСИ</p>
                    <p className="font-ibm text-white/20 text-sm mt-1">Выберите вопрос или напишите свой</p>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "assistant" && (
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}
                    >
                      <Icon name="Bot" size={13} className="text-[#00d4ff]" />
                    </div>
                  )}
                  <div
                    className={cn("max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed", msg.role === "user" ? "rounded-br-sm text-white/85" : "rounded-bl-sm text-white/75")}
                    style={msg.role === "user"
                      ? { background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.15)" }
                      : { background: "rgba(15,21,32,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p className="whitespace-pre-wrap font-ibm">{msg.content}</p>
                  </div>
                  {msg.role === "user" && (
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Icon name="User" size={13} className="text-white/40" />
                    </div>
                  )}
                </div>
              ))}

              {thinking && <TypingIndicator />}

              {/* ─── Подсказка неактивности ─── */}
              {showInactivityPrompt && !thinking && (
                <div
                  className="rounded-xl px-4 py-3 text-sm text-white/50 font-ibm"
                  style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}
                >
                  <p className="mb-2">{INACTIVITY_MESSAGE}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setShowInactivityPrompt(false); resetInactivityTimer(); }}
                      className="rounded-lg px-3 py-1 text-[12px] text-[#00d4ff]/70 transition-all"
                      style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}
                    >
                      Продолжить тему
                    </button>
                    <button
                      onClick={clearHistory}
                      className="rounded-lg px-3 py-1 text-[12px] text-white/40 transition-all"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      Новый диалог
                    </button>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ─── Быстрые кнопки (активный чат) ─── */}
            {messages.length > 0 && !showLead && (
              <div
                className="relative z-10 flex-shrink-0 px-6 sm:px-8 py-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map(({ label, intent }) => (
                    <button
                      key={label}
                      onClick={() => sendQuestion(label, true, intent)}
                      disabled={loading}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] text-white/30 hover:border-[#00d4ff]/20 hover:text-[#00d4ff]/60 transition-all disabled:opacity-30"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Форма лида ─── */}
            {showLead && !leadSent && (
              <div
                className="relative z-10 flex-shrink-0 px-6 sm:px-8 py-4"
                style={{ borderTop: "1px solid rgba(0,212,255,0.1)", background: "rgba(0,212,255,0.02)" }}
              >
                <p className="font-ibm text-[12px] text-white/40 mb-3 leading-relaxed">
                  Давайте соберём запрос. Оставьте имя, компанию, телефон или email — специалист свяжется с вами.
                </p>
                <form onSubmit={handleLeadSubmit} className="grid grid-cols-2 gap-2">
                  {[
                    { key: "name", placeholder: "Имя" },
                    { key: "company", placeholder: "Компания" },
                    { key: "phone", placeholder: "Телефон" },
                    { key: "email", placeholder: "Email" },
                  ].map(({ key, placeholder }) => (
                    <input
                      key={key}
                      value={leadForm[key as keyof LeadForm]}
                      onChange={(e) => setLeadForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="rounded-lg border border-white/8 bg-white/[0.04] px-3 py-2 text-[13px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#00d4ff]/30 transition-colors"
                    />
                  ))}
                  <textarea
                    value={leadForm.requestText}
                    onChange={(e) => setLeadForm((f) => ({ ...f, requestText: e.target.value }))}
                    placeholder="Кратко опишите задачу"
                    rows={2}
                    className="col-span-2 rounded-lg border border-white/8 bg-white/[0.04] px-3 py-2 text-[13px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#00d4ff]/30 resize-none transition-colors"
                  />
                  <div className="col-span-2 flex gap-2">
                    <button
                      type="submit"
                      disabled={leadSaving}
                      className="flex-1 rounded-lg py-2 text-[13px] font-medium text-[#00d4ff] transition-all disabled:opacity-50"
                      style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.2)" }}
                    >
                      {leadSaving ? "Отправка…" : "Отправить запрос"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLead(false)}
                      className="rounded-lg px-4 py-2 text-[13px] text-white/30 hover:text-white/50 transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ─── Поле ввода ─── */}
            {!showLead && (
              <div
                className="relative z-10 flex-shrink-0 px-6 sm:px-8 py-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <form onSubmit={handleSubmit} className="flex gap-3 items-end">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Напишите вопрос или опишите задачу…"
                    rows={1}
                    disabled={loading}
                    className="flex-1 min-h-[42px] max-h-[120px] resize-none rounded-xl px-4 py-2.5 text-[14px] text-white/85 placeholder:text-white/20 focus:outline-none transition-colors disabled:opacity-50 leading-relaxed overflow-y-auto font-ibm"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="h-[42px] w-[42px] shrink-0 flex items-center justify-center rounded-xl transition-all disabled:opacity-30"
                    style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.25)" }}
                  >
                    <Icon name="Send" size={16} className="text-[#00d4ff]" />
                  </button>
                </form>

                <div className="flex items-center justify-between mt-2.5 gap-2">
                  <button
                    onClick={() => setShowLead(true)}
                    className="flex items-center gap-1.5 text-[11px] text-white/20 hover:text-[#00d4ff]/50 transition-colors font-ibm"
                  >
                    <Icon name="UserRound" size={11} />
                    Передать запрос специалисту
                  </button>
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-1 text-[10px] text-white/15 hover:text-white/30 transition-colors font-ibm"
                    title="Начать новый диалог"
                  >
                    <Icon name="RotateCcw" size={10} />
                    Новый диалог
                  </button>
                </div>
              </div>
            )}

            {/* ─── Дисклеймер ─── */}
            <div
              className="relative z-10 flex-shrink-0 px-6 sm:px-8 pb-3 pt-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
            >
              <p className="text-center text-[10px] text-white/14 leading-relaxed font-ibm">
                Ответы ИИ-оператора носят информационный характер и требуют проверки специалистом АО КСИ перед практическим использованием.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}