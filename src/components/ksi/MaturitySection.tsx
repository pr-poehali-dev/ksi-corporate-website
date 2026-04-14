import Icon from "@/components/ui/icon";

function SiteStagesVisual() {
  return (
    <svg viewBox="0 0 460 90" className="w-full" style={{ maxHeight: 90 }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="ssg1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="ssg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7b2fff" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <g transform="translate(10,10)">
        <rect x="0" y="65" width="200" height="6" fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="0.6" strokeOpacity="0.4" />
        <rect x="10" y="22" width="180" height="43" fill="url(#ssg1)" stroke="#00d4ff" strokeWidth="0.9" strokeOpacity="0.5" />
        {[0,1,2,3,4,5].map(j => (
          <rect key={`w1a${j}`} x={15 + j*28} y={28} width={18} height={10} fill="rgba(0,212,255,0.2)" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.5" />
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`w1b${j}`} x={15 + j*28} y={44} width={18} height={10} fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.4" />
        ))}
        <rect x="6" y="16" width="188" height="8" fill="rgba(0,212,255,0.18)" stroke="#00d4ff" strokeWidth="0.7" strokeOpacity="0.55" />
        <text x="100" y="10" textAnchor="middle" fill="#00d4ff" fillOpacity="0.7" fontSize="7" fontFamily="IBM Plex Mono" letterSpacing="1">АКТИВНА</text>
      </g>

      <line x1="220" y1="20" x2="238" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="3,3" />
      <line x1="220" y1="75" x2="238" y2="75" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="3,3" />

      <g transform="translate(238,10)">
        <rect x="0" y="65" width="210" height="6" fill="rgba(123,47,255,0.1)" stroke="#7b2fff" strokeWidth="0.6" strokeOpacity="0.35" />
        <rect x="10" y="30" width="190" height="35" fill="url(#ssg2)" stroke="#7b2fff" strokeWidth="0.7" strokeOpacity="0.4" />
        {[0,1,2,3,4].map(j => (
          <line key={`s2v${j}`} x1={10 + j*48} y1={30} x2={10 + j*48} y2={65} stroke="#7b2fff" strokeWidth="0.6" strokeOpacity="0.4" />
        ))}
        <line x1="10" y1="46" x2="200" y2="46" stroke="#7b2fff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4,3" />
        {[0,1,2].map(j => (
          <rect key={`w2${j}`} x={15 + j*48} y={35} width={30} height={10} fill="rgba(123,47,255,0.15)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.4" />
        ))}
        <line x1="180" y1="12" x2="180" y2="30" stroke="#7b2fff" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="165" y1="14" x2="195" y2="14" stroke="#7b2fff" strokeWidth="0.6" strokeOpacity="0.3" />
        <text x="105" y="10" textAnchor="middle" fill="#7b2fff" fillOpacity="0.6" fontSize="7" fontFamily="IBM Plex Mono" letterSpacing="0.5">BETA · R&D</text>
      </g>
    </svg>
  );
}

const MATURITY_COLUMNS = [
  {
    id: "active",
    label: "Операционное ядро",
    sublabel: "Активна",
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.04)",
    border: "rgba(0,212,255,0.2)",
    items: [
      { name: "КриптоМетры", desc: "Ключевой проект. Интеллектуальная система распределённого девелопмента.", href: "/cryptometry" },
      { name: "Центр реализации активов", desc: "Операторский контур: упаковка активов, структурирование, реализация.", href: "/directions/fee-dev" },
      { name: "Студия проектного креатива", desc: "Креативный контур: визуальная, концептуальная и презентационная упаковка.", href: "/directions/ai-production" },
    ],
  },
  {
    id: "dev",
    label: "Развиваемые контуры",
    sublabel: "Beta · R&D",
    color: "#7b2fff",
    bg: "rgba(123,47,255,0.04)",
    border: "rgba(123,47,255,0.2)",
    items: [
      { name: "Служба земельного поиска (LSS)", desc: "Земельный контур: поиск, анализ площадок и формирование цифровых досье.", href: "/directions/lss" },
      { name: "Лаборатория ИИ", desc: "Технологическое ядро: интеллектуальная инфраструктура, обучение и развитие системы.", href: "/directions/ai-lab" },
    ],
  },
];

export function MaturitySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-label mb-4">◆ Стадии развития</div>
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight">
              Две стадии — два контура:<br />
              <span className="text-white/45">работающее ядро и развиваемые службы.</span>
            </h2>
          </div>
          <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-xs">
            Публично обозначаем стадию каждого контура.
            Рабочий принцип — не декларировать то, чего нет.
          </p>
        </div>

        <div className="mb-8 px-4 py-5 rounded-sm"
          style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}>
          <SiteStagesVisual />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {MATURITY_COLUMNS.map((col) => (
            <div key={col.id} className="rounded-sm overflow-hidden" style={{ border: `1px solid ${col.border}` }}>
              <div className="p-4 flex items-center justify-between" style={{ background: col.bg, borderBottom: `1px solid ${col.border}` }}>
                <div>
                  <h3 className="font-oswald text-white font-medium text-base">{col.label}</h3>
                  <span className="font-ibm text-xs" style={{ color: col.color, opacity: 0.6 }}>{col.sublabel}</span>
                </div>
                <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: col.color }} />
              </div>
              <div className="divide-y" style={{ borderColor: `${col.color}15` }}>
                {col.items.map((item, i) => (
                  <a key={i} href={item.href} className="block p-4 group transition-all hover:bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-oswald text-white/80 text-sm font-medium group-hover:text-white transition-colors">{item.name}</span>
                      <Icon name="ArrowRight" size={12} className="text-white/15 group-hover:text-white/35 transition-colors" />
                    </div>
                    <p className="font-ibm text-white/35 text-xs leading-relaxed">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
