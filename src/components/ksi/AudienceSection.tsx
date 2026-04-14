import Icon from "@/components/ui/icon";

const SEGMENTS = [
  {
    icon: "Building2",
    title: "Девелоперам",
    benefits: [
      "ИИ-аналитика земельных активов и проектных площадок",
      "Автоматизация предпроектной подготовки",
      "Доступ к инструментам fee-development и структурирования",
    ],
    color: "#00d4ff",
  },
  {
    icon: "MapPin",
    title: "Землевладельцам и владельцам активов",
    benefits: [
      "Цифровое досье и аналитика участка",
      "Структурированный выход на девелоперский рынок",
      "Интеллектуальная упаковка актива для сделки",
    ],
    color: "#7b2fff",
  },
  {
    icon: "TrendingUp",
    title: "Инвестиционным и проектным командам",
    benefits: [
      "Аналитические модели и прогнозирование",
      "Цифровые инструменты для due diligence",
      "Партнёрские модели участия в экосистеме",
    ],
    color: "#00d4ff",
  },
  {
    icon: "Handshake",
    title: "Партнёрам рынка",
    benefits: [
      "Лицензирование ИИ-решений и технологий",
      "Интеграция в экосистему как оператор или подрядчик",
      "Доступ к медийным и аналитическим инструментам",
    ],
    color: "#7b2fff",
  },
];

export function AudienceSection() {
  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,22,1), rgba(10,10,15,1))" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4">◆ Для кого экосистема</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
          Кому уже сегодня может быть полезна<br />
          <span className="text-gradient-main">экосистема АО КСИ</span>
        </h2>
        <p className="font-ibm text-white/40 text-base mb-16 max-w-2xl">
          Каждый сегмент получает набор инструментов, адаптированных под его задачи в рамках единой платформы.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {SEGMENTS.map((seg, i) => (
            <div key={i} className="p-6 rounded-sm transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{ background: `${seg.color}10`, border: `1px solid ${seg.color}20` }}>
                  <Icon name={seg.icon} size={18} style={{ color: seg.color, opacity: 0.7 }} />
                </div>
                <h3 className="font-oswald text-white/80 text-lg font-medium">{seg.title}</h3>
              </div>
              <div className="space-y-2.5">
                {seg.benefits.map((b, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: seg.color, opacity: 0.4 }} />
                    <p className="font-ibm text-white/40 text-sm leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
