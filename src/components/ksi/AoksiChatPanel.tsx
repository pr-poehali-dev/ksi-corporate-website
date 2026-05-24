import { RefObject } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";
import {
  ChatMessage,
  DialogState,
  LeadForm,
  IntentType,
  QUICK_QUESTIONS,
  INACTIVITY_MESSAGE,
} from "@/components/ksi/AoksiChatTypes";
import {
  NeuralBackground,
  StatusIndicator,
  TypingIndicator,
  CollectedDataPanel,
} from "@/components/ksi/AoksiChatVisuals";

interface AoksiChatPanelProps {
  // state
  messages: ChatMessage[];
  dialogState: DialogState;
  input: string;
  loading: boolean;
  thinking: boolean;
  showLead: boolean;
  leadSent: boolean;
  leadForm: LeadForm;
  leadSaving: boolean;
  showInactivityPrompt: boolean;
  // refs
  inputRef: RefObject<HTMLTextAreaElement>;
  bottomRef: RefObject<HTMLDivElement>;
  // handlers
  onClose: () => void;
  onClearHistory: () => void;
  onSendQuestion: (q: string, isQuick?: boolean, intent?: IntentType | null) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onInputChange: (value: string) => void;
  onShowLead: (v: boolean) => void;
  onLeadFormChange: (f: LeadForm) => void;
  onLeadSubmit: (e: React.FormEvent) => void;
  onContinueInactivity: () => void;
}

const intentLabels: Record<string, string> = {
  land_search: "Земельный поиск",
  asset_realization: "Реализация актива",
  project_creative: "Проектный креатив",
  ksi_terminal: "КСИ Терминал",
  ai_lab: "Лаборатория ИИ",
  connect_project: "Подключить проект",
  ready_to_lead: "Передача специалисту",
  general: "Общий вопрос",
};

export function AoksiChatPanel({
  messages,
  dialogState,
  input,
  loading,
  thinking,
  showLead,
  leadSent,
  leadForm,
  leadSaving,
  showInactivityPrompt,
  inputRef,
  bottomRef,
  onClose,
  onClearHistory,
  onSendQuestion,
  onSubmit,
  onKeyDown,
  onInputChange,
  onShowLead,
  onLeadFormChange,
  onLeadSubmit,
  onContinueInactivity,
}: AoksiChatPanelProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "rgba(4,6,12,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
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
                {dialogState.activeIntent && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-mono tracking-wide uppercase"
                    style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", color: "rgba(0,212,255,0.6)" }}
                  >
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

              <button
                onClick={onClearHistory}
                className="rounded-lg p-2 text-white/20 hover:text-white/50 hover:bg-white/5 transition-colors"
                title="Начать новый диалог"
              >
                <Icon name="RotateCcw" size={14} />
              </button>

              <button
                onClick={onClose}
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
                  onClick={() => onSendQuestion(label, true, intent)}
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
                  onClick={onContinueInactivity}
                  className="rounded-lg px-3 py-1 text-[12px] text-[#00d4ff]/70 transition-all"
                  style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}
                >
                  Продолжить тему
                </button>
                <button
                  onClick={onClearHistory}
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
                  onClick={() => onSendQuestion(label, true, intent)}
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
            <form onSubmit={onLeadSubmit} className="grid grid-cols-2 gap-2">
              {[
                { key: "name", placeholder: "Имя" },
                { key: "company", placeholder: "Компания" },
                { key: "phone", placeholder: "Телефон" },
                { key: "email", placeholder: "Email" },
              ].map(({ key, placeholder }) => (
                <input
                  key={key}
                  value={leadForm[key as keyof LeadForm]}
                  onChange={(e) => onLeadFormChange({ ...leadForm, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="rounded-lg border border-white/8 bg-white/[0.04] px-3 py-2 text-[13px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#00d4ff]/30 transition-colors"
                />
              ))}
              <textarea
                value={leadForm.requestText}
                onChange={(e) => onLeadFormChange({ ...leadForm, requestText: e.target.value })}
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
                  onClick={() => onShowLead(false)}
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
            <form onSubmit={onSubmit} className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={onKeyDown}
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
                onClick={() => onShowLead(true)}
                className="flex items-center gap-1.5 text-[11px] text-white/20 hover:text-[#00d4ff]/50 transition-colors font-ibm"
              >
                <Icon name="UserRound" size={11} />
                Передать запрос специалисту
              </button>
              <button
                onClick={onClearHistory}
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
  );
}
