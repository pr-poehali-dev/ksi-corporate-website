import Icon from "@/components/ui/icon";

const SEGMENTS = [
  { icon: "Building2", title: "Девелоперам", desc: "ИИ-аналитика, земельный поиск и прикладные контуры для проектных задач.", color: "#00d4ff" },
  { icon: "MapPin", title: "Землевладельцам", desc: "Цифровое досье участка, аналитика, интеллектуальная упаковка актива.", color: "#7b2fff" },
  { icon: "BarChart3", title: "Владельцам активов", desc: "Структурирование, сопровождение и вывод активов на рынок.", color: "#00d4ff" },
  { icon: "Users", title: "Проектным командам", desc: "Инструменты для due diligence, прогнозирования и принятия решений.", color: "#7b2fff" },
  { icon: "FlaskConical", title: "Бета-тестерам", desc: "Участие в обкатке интеллектуальных контуров на реальных задачах.", color: "#00d4ff" },
];

export function AudienceSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4">◆ Для кого</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
          Кому это уже<br /><span className="text-gradient-main">может быть полезно</span>
        </h2>
        <p className="font-ibm text-white/40 text-base mb-12 max-w-2xl">
          Даже на раннем этапе прикладные контуры АО КСИ могут решать конкретные задачи.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SEGMENTS.map((seg, i) => (
            <div key={i} className="p-5 rounded-sm"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                style={{ background: `${seg.color}08`, border: `1px solid ${seg.color}15` }}>
                <Icon name={seg.icon} size={18} style={{ color: seg.color, opacity: 0.65 }} />
              </div>
              <h3 className="font-oswald text-white/75 text-base font-medium mb-2">{seg.title}</h3>
              <p className="font-ibm text-white/32 text-xs leading-relaxed">{seg.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
