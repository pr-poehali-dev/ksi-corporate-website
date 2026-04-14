import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    num: "01",
    icon: "BrainCircuit",
    title: "Лаборатория ИИ",
    role: "Технологическое ядро",
    desc: "Ключевое технологическое ядро, отвечающее за интеллектуальную инфраструктуру, настройку, обучение и развитие системы.",
    color: "#7b2fff",
    href: "/directions/ai-lab",
  },
  {
    num: "02",
    icon: "TrendingUp",
    title: "Центр реализации активов",
    role: "Операционный контур",
    desc: "Внутренний контур сопровождения и реализации активов в логике системы КриптоМетров.",
    color: "#00d4ff",
    href: "/directions/fee-dev",
  },
  {
    num: "03",
    icon: "Search",
    title: "Служба земельного поиска",
    role: "Земельный контур",
    desc: "Внутренняя служба, обеспечивающая задачи земельного поиска, анализа площадок и работы с земельно-имущественными запросами.",
    color: "#7b2fff",
    href: "/directions/lss",
  },
  {
    num: "04",
    icon: "Palette",
    title: "Студия проектного креатива",
    role: "Креативный контур",
    desc: "Внутренний контур концептуальной, визуальной и презентационной упаковки решений, материалов и проектных идей внутри системы.",
    color: "#00d4ff",
    href: "/directions/ai-production",
  },
];

export function InternalServicesSection() {
  return (
    <section id="services" className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,24,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 parcel-bg pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-label mb-4 justify-center flex">◆ Внутренние службы АО КСИ</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
            Внутренние службы,<br />
            <span className="text-gradient-main">обеспечивающие работу системы</span>
          </h2>
          <p className="font-ibm text-white/45 text-lg leading-relaxed max-w-3xl mx-auto">
            Работу КриптоМетров обеспечивает не абстрактный набор инструментов,
            а внутренние контуры АО КСИ, каждый из которых отвечает за свой класс компетенций.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <a key={i} href={service.href} className="group block p-6 md:p-8 rounded-sm transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: `1px solid rgba(255,255,255,0.06)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${service.color}25`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${service.color}06`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center"
                    style={{ background: `${service.color}08`, border: `1px solid ${service.color}18` }}>
                    <Icon name={service.icon} size={22} style={{ color: service.color, opacity: 0.75 }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono-ibm text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm"
                      style={{ background: `${service.color}10`, color: service.color, opacity: 0.6 }}>
                      {service.role}
                    </span>
                  </div>
                  <h3 className="font-oswald text-white/80 text-xl font-medium mb-3 group-hover:text-white/95 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-ibm text-white/40 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="font-ibm text-white/22 text-sm">
            Все службы подчинены единой задаче — обеспечению работы системы КриптоМетры.
          </p>
        </div>
      </div>
    </section>
  );
}
