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

interface Company {
  id: string;
  name: string;
  lastMessage?: string;
  lastAt?: string;
  userMsgCount: number;
}

export default function AdminChat() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      loadMessages(selectedCompany.id);
      // Polling каждые 10 сек
      pollRef.current = setInterval(() => {
        loadMessages(selectedCompany.id, true);
      }, 10000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [selectedCompany]);

  const loadCompanies = async () => {
    try {
      const data = await api.get("api-chat", { companies: "1" });
      setCompanies(data.companies || []);
    } catch (_e) {
      // ignore
    } finally {
      setCompaniesLoading(false);
    }
  };

  const loadMessages = async (companyId: string, silent = false) => {
    if (!silent) setMessagesLoading(true);
    try {
      const data = await api.get("api-chat", { company_id: companyId });
      setMessages(data.messages || []);
    } catch (_e) {
      // ignore
    } finally {
      if (!silent) setMessagesLoading(false);
    }
  };

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setMessages([]);
    setInput("");
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading || !selectedCompany) return;

    setLoading(true);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const data = await api.post("api-chat", {
        message: text,
        company_id: selectedCompany.id,
      });
      setMessages((prev) => [...prev, data.message]);
      loadCompanies();
    } catch (_e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (deletingId) return;
    setDeletingId(msgId);
    try {
      await api.delete("api-chat", { message_id: msgId });
      setMessages((prev) => prev.filter((m) => m.id !== msgId));
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
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

  const formatDate = (ts?: string) => {
    if (!ts) return "";
    const d = new Date(ts);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return formatTime(ts);
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
  };

  const getSenderStyle = (sender: Message["sender"]) => {
    switch (sender) {
      case "user":
        return "bg-white/5 border border-white/8 text-white/75";
      case "ai":
        return "bg-[#0f1a2e] border border-cyan-500/15 text-white/75";
      case "operator":
        return "bg-cyan-500/10 text-white/85";
      case "system":
        return "bg-transparent border border-white/8 italic text-white/35";
    }
  };

  const getSenderNameColor = (sender: Message["sender"]) => {
    switch (sender) {
      case "ai": return "text-cyan-400/70";
      case "operator": return "text-cyan-300/80";
      case "user": return "text-white/40";
      default: return "text-white/25";
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 overflow-hidden rounded-lg border border-[#1a1a2e]">
      {/* Sidebar — список компаний */}
      <div className="flex w-72 shrink-0 flex-col border-r border-[#1a1a2e] bg-[#0a0a12]">
        <div className="flex items-center gap-2 border-b border-[#1a1a2e] px-4 py-3">
          <Icon name="MessageSquare" size={15} className="text-cyan-400" />
          <p className="text-sm font-medium text-white/70">Чаты клиентов</p>
          {companies.length > 0 && (
            <span className="ml-auto rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] text-cyan-400">
              {companies.length}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {companiesLoading ? (
            <div className="flex items-center justify-center py-10">
              <Icon name="Loader2" size={18} className="animate-spin text-white/20" />
            </div>
          ) : companies.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <Icon name="MessageSquareDashed" size={28} className="mx-auto mb-2 text-white/15" />
              <p className="text-xs text-white/25">Нет активных чатов</p>
            </div>
          ) : (
            companies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleSelectCompany(company)}
                className={cn(
                  "flex w-full flex-col gap-0.5 border-b border-[#1a1a2e] px-4 py-3 text-left transition-colors hover:bg-white/3",
                  selectedCompany?.id === company.id && "bg-cyan-500/5 border-l-2 border-l-cyan-500"
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-white/75">{company.name}</p>
                  <span className="ml-2 shrink-0 text-[10px] text-white/25">{formatDate(company.lastAt)}</span>
                </div>
                {company.lastMessage && (
                  <p className="truncate text-[11px] text-white/35">{company.lastMessage}</p>
                )}
                {company.userMsgCount > 0 && (
                  <p className="text-[10px] text-white/20">{company.userMsgCount} сообщ. от клиента</p>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Область чата */}
      <div className="flex flex-1 flex-col bg-[#12121c]">
        {!selectedCompany ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3">
            <Icon name="MessageSquare" size={36} className="text-white/10" />
            <p className="text-sm text-white/25">Выберите компанию для ответа</p>
          </div>
        ) : (
          <>
            {/* Header чата */}
            <div className="flex items-center gap-3 border-b border-[#1a1a2e] px-5 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10 text-xs font-bold text-cyan-400">
                {selectedCompany.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white/80">{selectedCompany.name}</p>
                <p className="text-[11px] text-white/30">Вы отвечаете от имени оператора</p>
              </div>
              <button
                onClick={() => loadMessages(selectedCompany.id)}
                className="rounded-md p-1.5 text-white/25 hover:text-white/60 transition-colors"
                title="Обновить"
              >
                <Icon name="RefreshCw" size={14} />
              </button>
            </div>

            {/* Сообщения */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-5">
              {messagesLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Icon name="Loader2" size={20} className="animate-spin text-white/20" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <Icon name="MessageSquareDashed" size={24} className="text-white/15" />
                  <p className="text-xs text-white/25">Нет сообщений</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "group flex",
                      msg.sender === "operator" ? "justify-end" : "justify-start"
                    )}
                    onMouseEnter={() => setHoveredId(msg.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative max-w-[75%]">
                      {hoveredId === msg.id && (
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          disabled={deletingId === msg.id}
                          className={cn(
                            "absolute -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-400/70 hover:bg-red-500/40 hover:text-red-400 transition-all",
                            msg.sender === "operator" ? "-left-6" : "-right-6"
                          )}
                          title="Удалить сообщение"
                        >
                          {deletingId === msg.id
                            ? <Icon name="Loader2" size={10} className="animate-spin" />
                            : <Icon name="X" size={10} />
                          }
                        </button>
                      )}
                      <div className={cn("rounded-lg px-4 py-3", getSenderStyle(msg.sender))}>
                        {msg.senderName && (
                          <p className={cn("mb-1 text-[10px] font-semibold tracking-wide", getSenderNameColor(msg.sender))}>
                            {msg.sender === "ai" && <span className="mr-1">🤖</span>}
                            {msg.sender === "operator" && <span className="mr-1">👤</span>}
                            {msg.sender === "user" && <span className="mr-1">🏢</span>}
                            {msg.senderName}
                          </p>
                        )}
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                        <p className={cn("mt-1 text-right text-[10px]", msg.sender === "operator" ? "text-white/25" : "text-white/15")}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Ввод оператора */}
            <div className="border-t border-[#1a1a2e] p-4">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Напишите ответ клиенту... (Enter — отправить)"
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
                Сообщение будет отправлено от вашего имени как оператора КСИ
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}