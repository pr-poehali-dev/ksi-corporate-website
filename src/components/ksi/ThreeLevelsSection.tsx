import Icon from "@/components/ui/icon";

const LEVELS = [
  {
    num: "01",
    icon: "Building",
    title: "АО КСИ",
    role: "Управляющая компания",
    desc: "Определяет архитектуру, развитие и интеграцию решений. Формирует стратегию экосистемы и управляет её компонентами.",
    color: "#00d4ff",
    size: "large",
  },
  {
    num: "02",
    icon: "BrainCircuit",
    title: "Лаборатория ИИ",
    role: "Технологическое ядро",
    desc: "Создаёт, обучает и адаптирует интеллектуальные инструменты для девелоперских задач. Центр компетенций всей экосистемы.",
    color: "#7b2fff",
    size: "medium",
  },
  {
    num: "03",
    icon: "Hexagon",
    title: "КриптоМетры",
    role: "Флагманский проект",
    desc: "Система распределённого девелопмента, развиваемая под управлением интеллектуальной инфраструктуры АО КСИ.",
    color: "#00d4ff",
    size: "medium",
  },
];

export function ThreeLevelsSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4">◆ Архитектура экосистемы</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
          Три уровня<br /><span className="text-gradient-main">одной системы</span>
        </h2>
        <p className="font-ibm text-white/50 text-lg leading-relaxed mb-16 max-w-3xl">
          АО КСИ управляет развитием экосистемы, Лаборатория ИИ формирует её технологическое ядро,
          а КриптоМетры выступают флагманским проектом стратегического применения.
        </p>

        <div className="relative">
          {/* Вертикальная линия-соединитель */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(0,212,255,0.4), rgba(123,47,255,0.3), rgba(0,212,255,0.2))" }} />

          <div className="space-y-8">
            {LEVELS.map((level, i) => (
              <div key={i} className="relative flex items-start gap-6 md:gap-10 group">
                {/* Номер и иконка */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-16 h-16 md:w-24 md:h-24 rounded-sm flex flex-col items-center justify-center transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${level.color}08, ${level.color}15)`,
                      border: `1px solid ${level.color}30`,
                      boxShadow: `0 0 30px ${level.color}08`,
                    }}
                  >
                    <Icon name={level.icon} size={i === 0 ? 28 : 22} style={{ color: level.color, opacity: 0.8 }} />
                    <span className="font-mono-ibm text-[9px] mt-1" style={{ color: level.color, opacity: 0.5 }}>{level.num}</span>
                  </div>
                </div>

                {/* Контент */}
                <div
                  className={`flex-1 p-6 md:p-8 rounded-sm transition-all duration-300 ${i === 0 ? "md:py-10" : ""}`}
                  style={{
                    background: i === 0
                      ? "linear-gradient(135deg, rgba(0,212,255,0.04), rgba(0,212,255,0.01))"
                      : "rgba(255,255,255,0.015)",
                    border: `1px solid ${i === 0 ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono-ibm text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm"
                      style={{ background: `${level.color}15`, color: level.color, opacity: 0.8 }}>
                      {level.role}
                    </span>
                  </div>
                  <h3 className={`font-oswald font-semibold text-white mb-3 ${i === 0 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
                    {level.title}
                  </h3>
                  <p className="font-ibm text-white/50 text-base leading-relaxed max-w-2xl">
                    {level.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Стрелки между уровнями */}
          <div className="hidden md:flex items-center justify-center mt-10 gap-4 text-white/15">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06))" }} />
            <span className="font-mono-ibm text-[10px] tracking-[0.3em] uppercase">Единая интеллектуальная вертикаль</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.06), transparent)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
