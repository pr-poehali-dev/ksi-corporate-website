import Icon from "@/components/ui/icon";

const PHASES = [
  {
    period: "2025 – 2026",
    phase: "Фаза сервисов",
    status: "current",
    color: "#00d4ff",
    icon: "Play",
    title: "Запуск модулей. Обучение ИИ на рыночных задачах",
    points: [
      "Служба земельного поиска",
      "Студия проектного креатива",
      "Лаборатория ИИ",
      "Центр реализации активов",
    ],
    marker: "Мы здесь",
  },
  {
    period: "2026 – 2027",
    phase: "Фаза Оркестратора",
    status: "next",
    color: "#a070ff",
    icon: "Workflow",
    title: "Первые проекты в модели Виртуального девелопера",
    points: [
      "Привлечение Fee-партнёров",
      "Цифровой аудитор проектов",
      "Блокчейн-контур мониторинга",
      "Масштабирование модели",
    ],
    marker: "Скоро",
  },
  {
    period: "2027+",
    phase: "Фаза КриптоМетров",
    status: "future",
    color: "#7b2fff",
    icon: "Globe",
    title: "Глобальная платформа токенизации недвижимости",
    points: [
      "Распределённый девелопмент",
      "Токенизация активов и долей",
      "Доступ для частных инвесторов",
      "Экосистема виртуального девелопера",
    ],
    marker: "Горизонт",
  },
];

export function RoadmapTimelineSection() {
  return (
    <section
      id="roadmap"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,24,1), rgba(10,10,15,1))" }}
    >
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="section-label mb-4">◆ Дорожная карта</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Три фазы пути<br />
            <span className="text-gradient-main">к распределённому девелопменту</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed">
            Ясный путь от прикладных сервисов к глобальной платформе.
            Каждый этап — самостоятельный результат и фундамент для следующего.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute top-6 left-0 right-0 h-px hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,212,255,0.4) 0%, rgba(160,112,255,0.4) 50%, rgba(123,47,255,0.4) 100%)",
            }}
          />

          <div className="grid md:grid-cols-3 gap-5">
            {PHASES.map((p, i) => (
              <div key={i} className="relative">
                <div className="flex justify-start mb-4">
                  <div
                    className="relative w-12 h-12 rounded-sm flex items-center justify-center z-10"
                    style={{
                      background: p.status === "current" ? `${p.color}15` : "rgba(10,10,15,1)",
                      border: `1px solid ${p.color}45`,
                      boxShadow: p.status === "current" ? `0 0 20px ${p.color}40` : "none",
                    }}
                  >
                    <Icon name={p.icon} size={20} style={{ color: p.color }} />
                  </div>
                </div>

                <div
                  className="p-6 rounded-sm h-full"
                  style={{
                    background: p.status === "current" ? `${p.color}05` : "rgba(255,255,255,0.015)",
                    border: `1px solid ${p.status === "current" ? `${p.color}30` : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-mono-ibm text-[10px] tracking-widest uppercase"
                      style={{ color: p.color, opacity: 0.9 }}
                    >
                      {p.period}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-sm font-mono-ibm text-[9px] tracking-widest uppercase"
                      style={{
                        background:
                          p.status === "current"
                            ? `${p.color}18`
                            : "rgba(255,255,255,0.04)",
                        border:
                          p.status === "current"
                            ? `1px solid ${p.color}40`
                            : "1px solid rgba(255,255,255,0.08)",
                        color: p.status === "current" ? p.color : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {p.marker}
                    </span>
                  </div>

                  <h3 className="font-oswald text-white text-xl font-medium mb-2 leading-tight">
                    {p.phase}
                  </h3>
                  <p className="font-ibm text-white/55 text-sm leading-relaxed mb-5">
                    {p.title}
                  </p>

                  <ul className="space-y-2">
                    {p.points.map((pt, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 font-ibm text-white/45 text-xs leading-relaxed"
                      >
                        <Icon
                          name="Dot"
                          size={14}
                          style={{ color: p.color, opacity: 0.7 }}
                          className="mt-[1px] flex-shrink-0"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
