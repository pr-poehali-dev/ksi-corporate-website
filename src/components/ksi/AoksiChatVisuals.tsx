import Icon from "@/components/ui/icon";
import { CollectedData } from "@/components/ksi/AoksiChatTypes";

// ─── Neural background grid ───────────────────────────────────────────────────

export function NeuralBackground() {
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

// ─── Status indicator ─────────────────────────────────────────────────────────

export function StatusIndicator({ thinking }: { thinking: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: 5,
              height: 5,
              background: thinking ? "#00d4ff" : "rgba(0,212,255,0.2)",
              opacity: thinking ? 1 : 0.4,
              transform: thinking ? "scaleY(1.4)" : "scaleY(1)",
              transitionDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </div>
      <span
        className="font-mono text-[9px] tracking-[0.15em] uppercase transition-colors duration-300"
        style={{ color: thinking ? "rgba(0,212,255,0.7)" : "rgba(255,255,255,0.2)" }}
      >
        {thinking ? "Обрабатываю запрос…" : "Онлайн · Готов к диалогу"}
      </span>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mt-0.5">
        <Icon name="Bot" size={13} className="text-[#00d4ff]" />
      </div>
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3"
        style={{ background: "rgba(15,21,32,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]/40 animate-bounce"
            style={{ animationDelay: `${i * 150}ms`, animationDuration: "1s" }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Collected data panel ─────────────────────────────────────────────────────

const COLLECTED_FIELD_LABELS: Record<string, string> = {
  region: "Регион",
  city: "Город",
  area: "Площадь",
  budget: "Бюджет",
  assetType: "Тип объекта",
  documents: "Документы",
  role: "Роль",
};

export function CollectedDataPanel({ data }: { data: CollectedData }) {
  const entries = Object.entries(COLLECTED_FIELD_LABELS)
    .map(([key, label]) => ({ key, label, value: data[key as keyof CollectedData] }))
    .filter(({ key, value }) => {
      if (!value) return false;
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
