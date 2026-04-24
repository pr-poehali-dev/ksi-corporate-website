import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai" | "operator" | "system";
  senderName?: string;
  timestamp: string;
  taskId?: string;
}

const WELCOME_MESSAGE: Message = {
  id: "sys-welcome",
  text: "Добро пожаловать в чат с ИИ-ассистентом КСИ. Опишите вашу задачу — я её обработаю и передам оператору для выполнения.",
  sender: "ai",
  senderName: "ИИ КСИ",
  timestamp: new Date().toISOString(),
};

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await api.get("api-chat");
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
      }
    } catch {
      // Если ошибка — оставляем приветственное сообщение
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      text,
      sender: "user",
      senderName: user?.full_name ?? "Вы",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setInput("");
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const data = await api.post("api-chat", { message: text });

      setMessages((prev) => {
        const withoutTemp = prev.filter((m) => m.id !== tempUserMsg.id);
        return [
          ...withoutTemp,
          { ...data.userMessage },
          { ...data.aiMessage },
        ];
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          text: "Не удалось отправить сообщение. Попробуйте ещё раз.",
          sender: "system",
          senderName: "Система КСИ",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const getSenderStyle = (sender: Message["sender"]) => {
    switch (sender) {
      case "user":
        return "bg-cyan-500/10 text-white/80";
      case "ai":
        return "bg-[#0f1a2e] border border-cyan-500/15 text-white/75";
      case "operator":
        return "bg-[#0f0f18] border border-purple-500/15 text-white/75";
      case "system":
        return "bg-transparent border border-white/8 italic text-white/35";
    }
  };

  const getSenderNameStyle = (sender: Message["sender"]) => {
    switch (sender) {
      case "ai":
        return "text-cyan-400/70";
      case "operator":
        return "text-purple-400/70";
      default:
        return "text-white/30";
    }
  };

  const getSenderIcon = (sender: Message["sender"]) => {
    switch (sender) {
      case "ai":
        return "Bot";
      case "operator":
        return "UserCheck";
      case "system":
        return "Info";
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-lg border border-[#1a1a2e] bg-[#12121c]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#1a1a2e] px-5 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10">
          <Icon name="Bot" size={16} className="text-cyan-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white/80">ИИ-ассистент КСИ</p>
          <p className="text-[11px] text-white/30">Приём и обработка задач · Передача оператору</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] text-white/25">онлайн</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {initialLoading ? (
          <div className="flex items-center justify-center py-10">
            <Icon name="Loader2" size={20} className="animate-spin text-white/20" />
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.sender !== "user" && (
                  <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5">
                    {getSenderIcon(msg.sender) && (
                      <Icon
                        name={getSenderIcon(msg.sender)!}
                        size={12}
                        className={
                          msg.sender === "ai"
                            ? "text-cyan-400"
                            : msg.sender === "operator"
                            ? "text-purple-400"
                            : "text-white/30"
                        }
                      />
                    )}
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg px-4 py-3",
                    getSenderStyle(msg.sender)
                  )}
                >
                  {msg.sender !== "user" && msg.senderName && (
                    <p className={cn("mb-1 text-[10px] font-semibold tracking-wide", getSenderNameStyle(msg.sender))}>
                      {msg.senderName}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                  {msg.taskId && (
                    <a
                      href={`/cabinet/tasks/${msg.taskId}`}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] text-cyan-400/70 hover:text-cyan-400"
                    >
                      <Icon name="ExternalLink" size={10} /> Открыть задачу
                    </a>
                  )}
                  <p className={cn(
                    "mt-1 text-right text-[10px]",
                    msg.sender === "user" ? "text-white/25" : "text-white/15"
                  )}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5">
                  <Icon name="Bot" size={12} className="text-cyan-400" />
                </div>
                <div className="rounded-lg border border-cyan-500/15 bg-[#0f1a2e] px-4 py-3">
                  <p className="text-[10px] font-semibold tracking-wide text-cyan-400/70 mb-2">ИИ КСИ</p>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[#1a1a2e] p-4">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Опишите вашу задачу... (Enter — отправить, Shift+Enter — новая строка)"
            rows={1}
            disabled={loading}
            className="flex-1 resize-none rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-3 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-cyan-500/30 disabled:opacity-50 transition-colors"
            style={{ minHeight: "40px", maxHeight: "120px" }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="btn-primary-ksi h-10 w-10 shrink-0 p-0"
          >
            {loading ? (
              <Icon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <Icon name="Send" size={16} />
            )}
          </Button>
        </div>
        <p className="mt-2 text-[10px] text-white/15 text-center">
          ИИ обработает запрос и передаст задачу оператору КСИ
        </p>
      </div>
    </div>
  );
}
