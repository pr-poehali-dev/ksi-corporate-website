import Icon from "@/components/ui/icon";

const STAGES = [
  { num: "01", title: "Формирование внутренних служб", desc: "Выстраивание Лаборатории ИИ, Центра реализации активов, Службы земельного поиска и Студии проектного креатива.", icon: "Users", status: "active", color: "#00d4ff" },
  { num: "02", title: "Запуск стартовых контуров системы", desc: "Первые функции КриптоМетров доступны клиентам через единый интерфейс взаимодействия.", icon: "Rocket", status: "active", color: "#00d4ff" },
  { num: "03", title: "Интеграция в единый интеллектуальный интерфейс", desc: "Внутренние службы объединяются в целостную систему с общей аналитической и операционной базой.", icon: "Puzzle", status: "next", color: "#7b2fff" },
  { num: "04", title: "КриптоМетры как целостная система", desc: "Полноценная интеллектуальная система распределённого девелопмента под управлением АО КСИ.", icon: "Hexagon", status: "planned", color: "#7b2fff" },
];

export function RoadmapSection() {
  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,22,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-35" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-label mb-4 justify-center flex">◆ Этапы развития</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
            От отдельных контуров —<br />
            <span className="text-gradient-main">к целостной системе</span>
          </h2>
          <p className="font-ibm text-white/45 text-lg max-w-2xl mx-auto">
            КриптоМетры развиваются поэтапно: от стартовых функций и внутренних служб —
            к интегрированной интеллектуальной системе распределённого девелопмента.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.4), rgba(0,212,255,0.25), rgba(123,47,255,0.2), rgba(123,47,255,0.1))" }} />

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {STAGES.map((stage, i) => (
              <div key={i} className="relative text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-6">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                      style={{
                        background: stage.status === "active" ? `${stage.color}20` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${stage.status !== "planned" ? `${stage.color}40` : "rgba(255,255,255,0.08)"}`,
                      }}>
                      <Icon name={stage.icon} size={16} style={{
                        color: stage.status !== "planned" ? stage.color : "rgba(255,255,255,0.3)",
                      }} />
                    </div>
                    {stage.status === "active" && (
                      <div className="absolute inset-0 rounded-full animate-pulse"
                        style={{ boxShadow: `0 0 20px ${stage.color}30` }} />
                    )}
                  </div>
                </div>

                <div className="font-mono-ibm text-[9px] tracking-wider mb-2"
                  style={{ color: stage.status === "active" ? stage.color : stage.status === "next" ? stage.color : "rgba(255,255,255,0.2)" }}>
                  {stage.status === "active" ? "ТЕКУЩИЙ ЭТАП" : stage.status === "next" ? "СЛЕДУЮЩИЙ" : `ЭТАП ${stage.num}`}
                </div>

                <h4 className="font-oswald text-white/75 text-sm font-medium mb-2 leading-snug">{stage.title}</h4>
                <p className="font-ibm text-white/30 text-xs leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a href="/roadmap" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
            Смотреть roadmap
          </a>
        </div>
      </div>
    </section>
  );
}
