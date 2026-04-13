import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "system" | "operator";
  senderName?: string;
  timestamp: string;
  taskId?: string;
}

const WELCOME_MESSAGES: Message[] = [
  {
    id: "sys-1",
    text: "Добро пожаловать в диалог с командой КСИ. Здесь вы можете обсудить задачи, задать вопросы по модулям или загрузить документы.",
    sender: "system",
    senderName: "Система КСИ",
    timestamp: new Date().toISOString(),
  },
  {
    id: "sys-2",
    text: "Для создания новой задачи опишите её здесь или перейдите в раздел \"Задачи\". Ваш куратор ответит в рабочее время (Пн--Пт, 10:00--19:00 МСК).",
    sender: "operator",
    senderName: "Куратор КСИ",
    timestamp: new Date().toISOString(),
  },
];

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(WELCOME_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      text,
      sender: "user",
      senderName: user?.full_name ?? "Вы",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulated auto-reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          text: "Спасибо за сообщение. Куратор ответит вам в ближайшее время. Для срочных вопросов используйте приоритет \"Критичный\" при создании задачи.",
          sender: "operator",
          senderName: "Куратор КСИ",
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-lg border border-[#1a1a2e] bg-[#12121c]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#1a1a2e] px-5 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10">
          <Icon name="MessageSquare" size={16} className="text-cyan-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-white/80">Диалог с командой КСИ</p>
          <p className="text-[11px] text-white/30">Онлайн-чат и обсуждение задач</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[75%] rounded-lg px-4 py-3",
                msg.sender === "user" && "bg-cyan-500/10 text-white/80",
                msg.sender === "system" && "border border-[#1a1a2e] bg-[#0f0f18] italic text-white/40",
                msg.sender === "operator" && "bg-[#0f0f18] text-white/70"
              )}
            >
              {msg.sender !== "user" && (
                <p className={cn(
                  "mb-1 text-[10px] font-medium",
                  msg.sender === "system" ? "text-white/25" : "text-cyan-400/60"
                )}>
                  {msg.senderName}
                </p>
              )}
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
              {msg.taskId && (
                <a
                  href={`/cabinet/tasks/${msg.taskId}`}
                  className="mt-1 inline-flex items-center gap-1 text-[11px] text-cyan-400/70 hover:text-cyan-400"
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
      </div>

      {/* Input */}
      <div className="border-t border-[#1a1a2e] p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Опишите задачу, загрузите документ или задайте вопрос по модулю"
            className="flex-1 border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80 placeholder:text-white/20"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="btn-primary-ksi h-10 w-10 shrink-0 p-0"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
