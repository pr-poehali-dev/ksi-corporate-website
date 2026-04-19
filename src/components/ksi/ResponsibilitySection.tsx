import Icon from "@/components/ui/icon";

const LAYERS = [
  {
    icon: "Cpu",
    color: "#00d4ff",
    role: "АО КСИ",
    title: "Интеллектуальная инфраструктура",
    points: [
      "Анализ и обработка данных",
      "Упаковка и координация",
      "Методология и контроль качества",
    ],
  },
  {
    icon: "HardHat",
    color: "#a070ff",
    role: "Профессиональные подрядчики",
    title: "Физическая реализация",
    points: [
      "Fee-девелопмент",
      "Проектирование и строительство",
      "Эксплуатация и управление",
    ],
  },
];

export function ResponsibilitySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="section-label mb-4">◆ Архитектура ответственности</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Кто за что<br />
            <span className="text-gradient-main">отвечает</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed">
            Система не подменяет профессиональную ответственность — она повышает точность,
            скорость и прозрачность работы всех участников.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {LAYERS.map((layer, i) => (
            <div
              key={i}
              className="p-7 rounded-sm"
              style={{
                background: `${layer.color}04`,
                border: `1px solid ${layer.color}20`,
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center"
                  style={{ background: `${layer.color}10`, border: `1px solid ${layer.color}30` }}
                >
                  <Icon name={layer.icon} size={22} style={{ color: layer.color }} />
                </div>
                <div>
                  <div className="font-mono-ibm text-[10px] tracking-widest uppercase" style={{ color: layer.color, opacity: 0.8 }}>
                    {layer.role}
                  </div>
                  <h3 className="font-oswald text-white text-xl leading-tight">
                    {layer.title}
                  </h3>
                </div>
              </div>

              <ul className="space-y-2.5">
                {layer.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-3 font-ibm text-white/55 text-sm leading-relaxed">
                    <Icon name="Dot" size={16} style={{ color: layer.color }} className="mt-[1px] flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="p-6 rounded-sm flex items-start gap-4"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Icon name="ShieldCheck" size={22} className="text-ksi-cyan/70 flex-shrink-0 mt-[2px]" />
          <p className="font-ibm text-white/55 text-base leading-relaxed">
            АО КСИ отвечает за интеллектуальную инфраструктуру, анализ, упаковку и координацию.
            Физическая реализация проектов остаётся за профессиональными подрядчиками и fee-девелоперами,
            которые несут за неё профессиональную ответственность.
          </p>
        </div>
      </div>
    </section>
  );
}
