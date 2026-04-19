import Icon from "@/components/ui/icon";

const LEVELS = [
  {
    label: "Сегодня",
    icon: "Zap",
    color: "#00d4ff",
    title: "Что АО КСИ делает сейчас",
    desc: "Внедряем прикладные ИИ-модули и внутренние службы как самостоятельные продукты для девелопмента: земельный поиск, проектный креатив, лаборатория ИИ, центр реализации активов.",
    tag: "Рабочие продукты",
  },
  {
    label: "Параллельно",
    icon: "GitBranch",
    color: "#a070ff",
    title: "Что строится параллельно",
    desc: "Каждый выполненный кейс используется для обучения будущей интеллектуальной системы. Мы фиксируем данные, решения и сценарии, превращая практику в технологию.",
    tag: "Накопление знаний",
  },
  {
    label: "Перспектива",
    icon: "Telescope",
    color: "#7b2fff",
    title: "Во что это вырастет",
    desc: "Виртуальный девелопер — интеллектуальная система распределённого девелопмента: находит участок, анализирует его, формирует первичную концепцию, создаёт ТЗ и передаёт проект профессиональным fee-девелоперам.",
    tag: "Долгосрочная цель",
  },
];

export function AboutKsiSection() {
  return (
    <section id="about-ksi" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="section-label mb-4">◆ Что такое АО КСИ</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
            Три уровня работы<br /><span className="text-gradient-main">одной компании</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed mb-12">
            АО КСИ работает одновременно на трёх горизонтах: прикладные продукты сегодня,
            обучение системы параллельно, виртуальный девелопер в перспективе.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {LEVELS.map((level, i) => (
            <div
              key={i}
              className="p-7 rounded-sm relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${level.color}60, transparent)` }}
              />

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{ background: `${level.color}10`, border: `1px solid ${level.color}25` }}
                >
                  <Icon name={level.icon} size={18} style={{ color: level.color }} />
                </div>
                <span
                  className="font-mono-ibm text-[10px] tracking-widest uppercase"
                  style={{ color: level.color, opacity: 0.75 }}
                >
                  {level.label}
                </span>
              </div>

              <h3 className="font-oswald text-white text-xl font-medium mb-3 leading-tight">
                {level.title}
              </h3>
              <p className="font-ibm text-white/50 text-sm leading-relaxed mb-5">
                {level.desc}
              </p>

              <div
                className="inline-block px-3 py-1 rounded-sm font-mono-ibm text-[10px] tracking-wider uppercase"
                style={{
                  background: `${level.color}08`,
                  border: `1px solid ${level.color}20`,
                  color: level.color,
                }}
              >
                {level.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
