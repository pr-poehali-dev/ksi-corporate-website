import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

import {
  CHAT_API_URL,
  LEAD_API_URL,
  SESSION_KEY,
  HISTORY_KEY,
  DIALOG_STATE_KEY,
  MIN_REPLY_DELAY,
  INACTIVITY_TIMEOUT_MS,
  GREETING,
  IntentType,
  DialogState,
  ChatMessage,
  LeadForm,
  defaultDialogState,
  generateId,
  getOrCreateSessionId,
  loadLocalHistory,
  saveLocalHistory,
  loadDialogState,
  saveDialogState,
  updateDialogStateAfterExchange,
  isGreeting,
} from "@/components/ksi/AoksiChatTypes";

import { AoksiChatPanel } from "@/components/ksi/AoksiChatPanel";

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
  }, [open]);

  // Скролл вниз при новых сообщениях
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  // Сохранение истории при изменении
  useEffect(() => {
    if (messages.length > 0) saveLocalHistory(messages);
  }, [messages]);

  const addMessage = useCallback((msg: Omit<ChatMessage, "id" | "createdAt">) => {
    const full: ChatMessage = {
      ...msg,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => {
      const updated = [...prev, full];
      saveLocalHistory(updated);
      return updated;
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

    // Снимаем историю ДО добавления нового сообщения
    const historySnapshot = messages.map((m) => ({ role: m.role, content: m.content }));

    addMessage({ role: "user", content: question, isQuick });

    const startedAt = Date.now();

    const cleanHistory = historySnapshot
      .filter((item) => item && (item.role === "user" || item.role === "assistant") && item.content)
      .slice(-8)
      .map((item) => ({ role: item.role, content: item.content }));

    let answer = "Не удалось получить ответ. Попробуйте ещё раз или передайте запрос специалисту.";

    try {
      const payload = {
        message: question,
        pageContext: location.pathname,
        sessionId: sessionId.current,
        history: cleanHistory,
      };

      const resp = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify(payload),
      });

      let data: Record<string, unknown> | null = null;
      let rawText = "";

      try {
        rawText = await resp.text();
        data = rawText ? JSON.parse(rawText) : null;
      } catch (parseErr) {
        console.error("[AOKSI CHAT] JSON parse error:", parseErr);
        console.error("[AOKSI CHAT] Raw response:", rawText);
      }

      if (!resp.ok) {
        console.error("[AOKSI CHAT] Backend error");
        console.error("[AOKSI CHAT] URL:", CHAT_API_URL);
        console.error("[AOKSI CHAT] Status:", resp.status);
        console.error("[AOKSI CHAT] Response body:", data);
      } else if (!data || typeof data.answer !== "string" || !(data.answer as string).trim()) {
        console.error("[AOKSI CHAT] Empty or invalid answer");
        console.error("[AOKSI CHAT] URL:", CHAT_API_URL);
        console.error("[AOKSI CHAT] Response body:", data);
      } else {
        answer = (data.answer as string).trim();
      }
    } catch (err) {
      console.error("[AOKSI CHAT] Network/runtime error:", err);
      console.error("[AOKSI CHAT] URL:", CHAT_API_URL);
    }

    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, MIN_REPLY_DELAY - elapsed);

    setTimeout(() => {
      setThinking(false);
      addMessage({ role: "assistant", content: answer });
      setLoading(false);
      if (!open) setHasUnread(true);

      setDialogState((prev) => {
        const updated = updateDialogStateAfterExchange(prev, question, answer, forcedIntent ?? undefined);
        saveDialogState(updated);
        return updated;
      });
    }, remaining);
  }, [loading, messages, user, location.pathname, open, addMessage, resetInactivityTimer]);

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
      await fetch(LEAD_API_URL, {
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
        const updated = { ...prev, stage: "ready_to_lead" as const, lastActivityAt: Date.now() };
        saveDialogState(updated);
        return updated;
      });
    } catch {
      addMessage({ role: "assistant", content: "Не удалось отправить заявку. Попробуйте позже." });
    } finally {
      setLeadSaving(false);
    }
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
        <AoksiChatPanel
          messages={messages}
          dialogState={dialogState}
          input={input}
          loading={loading}
          thinking={thinking}
          showLead={showLead}
          leadSent={leadSent}
          leadForm={leadForm}
          leadSaving={leadSaving}
          showInactivityPrompt={showInactivityPrompt}
          inputRef={inputRef}
          bottomRef={bottomRef}
          onClose={() => setOpen(false)}
          onClearHistory={clearHistory}
          onSendQuestion={sendQuestion}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          onInputChange={setInput}
          onShowLead={setShowLead}
          onLeadFormChange={setLeadForm}
          onLeadSubmit={handleLeadSubmit}
          onContinueInactivity={() => { setShowInactivityPrompt(false); resetInactivityTimer(); }}
        />
      )}
    </>
  );
}