import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    icon: "BrainCircuit",
    title: "Лаборатория ИИ",
    desc: "Технологическое ядро компании, отвечающее за интеллектуальную инфраструктуру, настройку, обучение и развитие системы.",
    color: "#7b2fff",
    href: "/directions/ai-lab",
  },
  {
    icon: "TrendingUp",
    title: "Центр реализации активов",
    desc: "Внутренний контур сопровождения и реализации активов в логике проекта.",
    color: "#00d4ff",
    href: "/directions/fee-dev",
  },
  {
    icon: "Search",
    title: "Служба земельного поиска",
    desc: "Контур, отвечающий за поиск участков, анализ площадок и работу с земельно-имущественными задачами.",
    color: "#7b2fff",
    href: "/directions/lss",
  },
  {
    icon: "Palette",
    title: "Студия проектного креатива",
    desc: "Контур визуальной, концептуальной и презентационной упаковки решений, идей и материалов.",
    color: "#00d4ff",
    href: "/directions/ai-production",
  },
];

export function InternalServicesSection() {
  return (
    <section id="structure" className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,24,1), rgba(10,10,15,1))" }}>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4">◆ Внутренние службы</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
          Внутренние службы<br /><span className="text-gradient-main">АО КСИ</span>
        </h2>
        <p className="font-ibm text-white/45 text-lg leading-relaxed mb-12 max-w-2xl">
          Внутренние службы компании формируют прикладные контуры будущего виртуального девелопера.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <a key={i} href={s.href}
              className="group flex items-start gap-5 p-6 rounded-sm transition-all duration-300 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${s.color}25`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                style={{ background: `${s.color}08`, border: `1px solid ${s.color}18` }}>
                <Icon name={s.icon} size={22} style={{ color: s.color, opacity: 0.75 }} />
              </div>
              <div className="flex-1">
                <h3 className="font-oswald text-white/80 text-lg font-medium mb-2 group-hover:text-white transition-colors">
                  {s.title}
                </h3>
                <p className="font-ibm text-white/38 text-sm leading-relaxed mb-3">{s.desc}</p>
                <span className="font-oswald text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-block"
                  style={{ color: s.color, opacity: 0.6 }}>
                  Подробнее →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
