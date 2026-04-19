import Icon from "@/components/ui/icon";

const ROLES = [
  {
    icon: "BrainCircuit",
    color: "#00d4ff",
    role: "АО КСИ",
    subtitle: "Интеллект",
    points: [
      "Находит землю",
      "Упаковывает проект",
      "Привлекает капитал",
      "Контролирует каждый этап",
    ],
  },
  {
    icon: "HardHat",
    color: "#a070ff",
    role: "Партнёры",
    subtitle: "Физическое воплощение",
    points: [
      "Профессиональные Fee-девелоперы",
      "Подрядчики и генподрядчики",
      "Строят объект — отвечают за бетон и кирпич",
      "Несут профессиональную ответственность",
    ],
  },
];

export function StrategySection() {
  return (
    <section
      id="strategy"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,12,26,1), rgba(10,10,15,1))" }}
    >
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="section-label mb-4">◆ Стратегия АО КСИ</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            От прикладных модулей —<br />
            <span className="text-gradient-main">к ОС Виртуального девелопера</span>
          </h2>
          <p className="font-oswald text-white/70 text-xl md:text-2xl leading-snug mb-6">
            Мы не просто создаём софт. Мы строим «мозг» для новой модели строительного бизнеса.
          </p>
          <p className="font-ibm text-white/55 text-base leading-relaxed mb-4">
            Сегодня наши модули — это самостоятельные сервисы, которые решают ваши задачи за 24 часа.
            Но для нас это — этап обучения. Каждый кейс, проходящий через «Службу земельного поиска»
            или «Студию креатива», обучает наши алгоритмы и формирует базу данных для будущей платформы.
          </p>
        </div>

        <div
          className="p-7 md:p-9 rounded-sm mb-8"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="px-3 py-1 rounded-sm font-mono-ibm text-[10px] tracking-widest uppercase"
              style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}
            >
              Asset-Light Model
            </div>
          </div>

          <h3 className="font-oswald text-white text-2xl md:text-3xl leading-tight mb-4">
            Мы строим <span className="text-gradient-main">Виртуального девелопера</span>
          </h3>
          <p className="font-ibm text-white/60 text-base leading-relaxed">
            Система, которая позволит инициировать и управлять масштабными стройками
            без раздутых штатов и владения парком техники.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {ROLES.map((r, i) => (
            <div
              key={i}
              className="p-7 rounded-sm relative overflow-hidden"
              style={{
                background: `${r.color}04`,
                border: `1px solid ${r.color}22`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${r.color}60, transparent)` }}
              />

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center"
                  style={{ background: `${r.color}10`, border: `1px solid ${r.color}30` }}
                >
                  <Icon name={r.icon} size={22} style={{ color: r.color }} />
                </div>
                <div>
                  <div className="font-mono-ibm text-[10px] tracking-widest uppercase" style={{ color: r.color, opacity: 0.85 }}>
                    {r.role}
                  </div>
                  <h3 className="font-oswald text-white text-xl leading-tight">
                    {r.subtitle}
                  </h3>
                </div>
              </div>

              <ul className="space-y-2.5">
                {r.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-3 font-ibm text-white/60 text-sm leading-relaxed">
                    <Icon name="Check" size={14} style={{ color: r.color, opacity: 0.8 }} className="mt-[3px] flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
