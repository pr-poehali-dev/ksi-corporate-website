import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

const WIDGET_URL = "https://functions.poehali.dev/2cd3918f-adc8-4de1-9063-4a0c1827bbe4";
const SESSION_KEY = "aoksi_ai_session_id";
const HISTORY_KEY = "aoksi_ai_chat_history";
const MIN_REPLY_DELAY = 1600;

const QUICK_QUESTIONS = [
  "Чем занимается АО КСИ?",
  "Земельный поиск",
  "Реализация активов",
  "КСИ Терминал",
  "Подключить проект",
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
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
  } catch {
    return [];
  }
}

function saveLocalHistory(msgs: ChatMessage[]) {
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(msgs));
}

export default function AoksiAiWidget() {
  const { user } = useAuth();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"online" | "thinking">("online");
  const [showLead, setShowLead] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: "", company: "", phone: "", email: "", requestText: "" });
  const [leadSaving, setLeadSaving] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const sessionId = useRef<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    sessionId.current = getOrCreateSessionId();
    setMessages(loadLocalHistory());
  }, []);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const addMessage = useCallback((msg: Omit<ChatMessage, "id" | "createdAt">) => {
    const full: ChatMessage = { ...msg, id: generateId(), createdAt: new Date().toISOString() };
    setMessages((prev) => {
      const next = [...prev, full];
      saveLocalHistory(next);
      return next;
    });
    return full;
  }, []);

  const sendQuestion = useCallback(async (question: string, isQuick = false) => {
    if (!question.trim() || loading) return;
    setInput("");
    setLoading(true);
    setStatus("thinking");

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
        addMessage({ role: "assistant", content: answer });
        setStatus("online");
        setLoading(false);
        if (!open) setHasUnread(true);
      }, remaining);
    } catch {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_REPLY_DELAY - elapsed);
      setTimeout(() => {
        addMessage({
          role: "assistant",
          content: "ИИ-оператор временно недоступен. Попробуйте позже или направьте запрос специалисту.",
        });
        setStatus("online");
        setLoading(false);
      }, remaining);
    }
  }, [loading, user, location.pathname, open, addMessage]);

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
    const newSid = "s_" + generateId();
    sessionStorage.setItem(SESSION_KEY, newSid);
    sessionId.current = newSid;
    setMessages([]);
    setShowLead(false);
    setLeadSent(false);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSaving(true);
    const summary = messages.slice(-6).map((m) => `${m.role === "user" ? "Вопрос" : "ИИ"}: ${m.content}`).join("\n");
    try {
      await fetch(WIDGET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "lead",
          sessionId: sessionId.current,
          userId: user?.id ?? null,
          ...leadForm,
          chatSummary: summary,
        }),
      });
      setLeadSent(true);
      addMessage({
        role: "assistant",
        content: "Ваша заявка принята. Специалист АО КСИ свяжется с вами в ближайшее время.",
      });
    } catch {
      addMessage({ role: "assistant", content: "Не удалось отправить заявку. Попробуйте позже." });
    } finally {
      setLeadSaving(false);
      setShowLead(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(true); setMinimized(false); }}
        aria-label="Вызвать ИИ-оператора АО КСИ"
        className={cn(
          "fixed bottom-6 right-6 z-[9990] flex items-center gap-2.5 rounded-full px-5 py-3",
          "bg-[#0a0a0f] border border-[#00d4ff]/30 shadow-[0_0_24px_rgba(0,212,255,0.18)]",
          "text-white/90 text-sm font-medium font-[IBM_Plex_Sans]",
          "transition-all duration-300 hover:border-[#00d4ff]/60 hover:shadow-[0_0_32px_rgba(0,212,255,0.3)]",
          "hover:bg-[#0f0f18] active:scale-95",
          open && "opacity-0 pointer-events-none scale-90"
        )}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00d4ff] opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00d4ff]" />
        </span>
        <Icon name="Bot" size={16} className="text-[#00d4ff]" />
        Вызвать ИИ
        {hasUnread && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#00d4ff] border-2 border-[#0a0a0f]" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className={cn(
            "fixed z-[9999] flex flex-col",
            "bottom-4 right-4",
            "w-[calc(100vw-2rem)] max-w-[460px]",
            minimized
              ? "h-[56px] overflow-hidden"
              : "h-[min(720px,calc(100vh-2rem))]",
            "rounded-2xl border border-[#00d4ff]/20",
            "bg-[#09090f]/95 backdrop-blur-xl",
            "shadow-[0_0_60px_rgba(0,212,255,0.12),0_20px_60px_rgba(0,0,0,0.6)]",
            "transition-all duration-300 ease-out",
            "sm:w-[460px]"
          )}
          style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 border-b border-[#00d4ff]/10 bg-[#0d0d18] px-4 py-3 rounded-t-2xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20">
              <Icon name="Bot" size={16} className="text-[#00d4ff]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white/90 leading-tight">ИИ-оператор АО КСИ</p>
              <p className={cn("text-[11px] leading-tight transition-colors", status === "thinking" ? "text-amber-400/80" : "text-[#00d4ff]/60")}>
                {status === "thinking" ? "анализирует запрос…" : "онлайн"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearHistory}
                className="rounded p-1.5 text-white/20 hover:text-white/50 transition-colors"
                title="Очистить диалог"
              >
                <Icon name="Trash2" size={13} />
              </button>
              <button
                onClick={() => setMinimized((v) => !v)}
                className="rounded p-1.5 text-white/20 hover:text-white/50 transition-colors"
                title={minimized ? "Развернуть" : "Свернуть"}
              >
                <Icon name={minimized ? "ChevronUp" : "Minus"} size={14} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-1.5 text-white/20 hover:text-red-400/70 transition-colors"
                title="Закрыть"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full py-8 text-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00d4ff]/8 border border-[#00d4ff]/15">
                      <Icon name="Bot" size={26} className="text-[#00d4ff]/60" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm font-medium">ИИ-оператор АО КСИ</p>
                      <p className="text-white/35 text-xs mt-1">Виртуальный девелопер. Спросите о модулях,<br/>земельном поиске, реализации активов, КСИ Терминале.</p>
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {msg.role === "assistant" && (
                      <div className="shrink-0 h-6 w-6 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mt-0.5">
                        <Icon name="Bot" size={12} className="text-[#00d4ff]" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                        msg.role === "user"
                          ? "bg-[#00d4ff]/12 border border-[#00d4ff]/20 text-white/85 rounded-br-sm"
                          : "bg-[#0f0f18] border border-white/6 text-white/75 rounded-bl-sm"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2 justify-start">
                    <div className="shrink-0 h-6 w-6 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mt-0.5">
                      <Icon name="Bot" size={12} className="text-[#00d4ff]" />
                    </div>
                    <div className="bg-[#0f0f18] border border-white/6 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1 items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]/60 animate-bounce [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]/60 animate-bounce [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]/60 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Lead form */}
              {showLead && !leadSent && (
                <div className="shrink-0 border-t border-white/6 bg-[#0d0d18] px-4 py-3">
                  <p className="text-[12px] text-white/50 mb-3 leading-relaxed">
                    Оставьте имя, компанию, телефон или email и кратко опишите задачу. Специалист АО КСИ вернётся с предложением.
                  </p>
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
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
                        className="w-full rounded-lg border border-white/8 bg-[#0a0a12] px-3 py-2 text-[13px] text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#00d4ff]/30"
                      />
                    ))}
                    <textarea
                      value={leadForm.requestText}
                      onChange={(e) => setLeadForm((f) => ({ ...f, requestText: e.target.value }))}
                      placeholder="Кратко опишите задачу"
                      rows={2}
                      className="w-full rounded-lg border border-white/8 bg-[#0a0a12] px-3 py-2 text-[13px] text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#00d4ff]/30 resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={leadSaving}
                        className="flex-1 rounded-lg bg-[#00d4ff]/15 border border-[#00d4ff]/25 px-3 py-2 text-[13px] text-[#00d4ff] font-medium hover:bg-[#00d4ff]/22 transition-colors disabled:opacity-50"
                      >
                        {leadSaving ? "Отправка…" : "Отправить заявку"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLead(false)}
                        className="rounded-lg border border-white/8 px-3 py-2 text-[13px] text-white/30 hover:text-white/50 transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Quick questions */}
              {!showLead && messages.length === 0 && (
                <div className="shrink-0 px-4 pb-2">
                  <p className="text-[11px] text-white/25 mb-2">Быстрые вопросы:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendQuestion(q, true)}
                        disabled={loading}
                        className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/6 px-3 py-1 text-[11px] text-[#00d4ff]/70 hover:bg-[#00d4ff]/12 hover:text-[#00d4ff] transition-colors disabled:opacity-40"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              {!showLead && (
                <div className="shrink-0 border-t border-white/6 px-3 py-3">
                  <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Напишите вопрос…"
                      rows={1}
                      disabled={loading}
                      className="flex-1 min-h-[38px] max-h-[96px] resize-none rounded-xl border border-white/8 bg-[#0a0a12] px-3 py-2.5 text-[13px] text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#00d4ff]/30 disabled:opacity-50 leading-snug overflow-y-auto"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="h-[38px] w-[38px] shrink-0 flex items-center justify-center rounded-xl bg-[#00d4ff]/15 border border-[#00d4ff]/25 text-[#00d4ff] hover:bg-[#00d4ff]/25 transition-colors disabled:opacity-30"
                    >
                      <Icon name="Send" size={15} />
                    </button>
                  </form>
                  {/* Specialist button */}
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => setShowLead(true)}
                      className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-[#00d4ff]/60 transition-colors"
                    >
                      <Icon name="UserRound" size={11} />
                      Передать запрос специалисту
                    </button>
                    <button
                      onClick={clearHistory}
                      className="text-[10px] text-white/15 hover:text-white/30 transition-colors"
                    >
                      Очистить диалог
                    </button>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="shrink-0 px-4 pb-3">
                <p className="text-[10px] text-white/18 leading-relaxed text-center">
                  Ответы ИИ-оператора носят информационный характер и требуют проверки специалистом АО КСИ перед практическим использованием.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
