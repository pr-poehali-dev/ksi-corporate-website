import Icon from "@/components/ui/icon";

const MODES = [
  {
    color: "#00d4ff",
    hours: "24",
    label: "часа",
    mode: "Стандартный режим",
    desc: "Ориентир по первичной обработке для большинства типовых прикладных запросов.",
    tags: ["Земельный анализ", "Первичная концепция", "Упаковка актива"],
    icon: "Clock",
  },
  {
    color: "#a070ff",
    hours: "12",
    label: "часов",
    mode: "Ускоренный режим",
    desc: "Для срочных сценариев, требующих оперативного ответа и приоритетной обработки.",
    tags: ["Срочный запрос", "Приоритетная задача", "Быстрый результат"],
    icon: "Zap",
  },
];

export function SpeedSection() {
  return (
    <section
      id="speed"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(11,10,20,1), rgba(10,10,15,1))" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="section-label mb-5">◆ Скорость обработки</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl xl:text-6xl leading-tight mb-6">
              <span className="text-gradient-cyan">До 24 часов</span>
              <span className="text-white/90"> — стандарт.</span>
              <br />
              <span className="text-gradient-main">До 12 часов</span>
              <span className="text-white/90"> — срочно.</span>
            </h2>
            <p className="font-ibm text-white/60 text-base leading-relaxed mb-4">
              АО КСИ выстраивает операционную модель так, чтобы переводить запросы в прикладной результат
              без длинного производственного цикла. Для большинства типовых задач ориентир по первичной
              обработке — до 24 часов. Для срочных сценариев возможен ускоренный режим — до 12 часов.
            </p>
            <p className="font-ibm text-white/35 text-sm leading-relaxed">
              Фактический срок зависит от типа задачи, объёма исходных данных и необходимого уровня проработки.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {MODES.map((m, i) => (
              <div
                key={i}
                className="p-7 rounded-sm relative overflow-hidden"
                style={{
                  background: `${m.color}06`,
                  border: `1px solid ${m.color}30`,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${m.color}80, transparent)` }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center"
                    style={{ background: `${m.color}12`, border: `1px solid ${m.color}30` }}
                  >
                    <Icon name={m.icon} size={18} style={{ color: m.color }} />
                  </div>
                  <span
                    className="font-mono-ibm text-[10px] tracking-widest uppercase"
                    style={{ color: m.color, opacity: 0.85 }}
                  >
                    {m.mode}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className="font-oswald font-bold leading-none"
                    style={{ fontSize: "4rem", color: m.color }}
                  >
                    {m.hours}
                  </span>
                  <span
                    className="font-oswald text-2xl"
                    style={{ color: m.color, opacity: 0.7 }}
                  >
                    {m.label}
                  </span>
                </div>

                <p className="font-ibm text-white/55 text-sm leading-relaxed mb-5">
                  {m.desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="font-mono-ibm text-[9px] tracking-wider uppercase px-2 py-1 rounded-sm"
                      style={{
                        background: `${m.color}08`,
                        border: `1px solid ${m.color}20`,
                        color: m.color,
                        opacity: 0.85,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
