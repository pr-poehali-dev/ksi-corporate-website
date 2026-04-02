import Icon from "@/components/ui/icon";

const MATURITY_COLUMNS = [
  {
    id: "active",
    label: "Операционное ядро",
    sublabel: "Активна",
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.05)",
    border: "rgba(0,212,255,0.18)",
    items: [
      { name: "КриптоМетры", desc: "Флагманская платформа. Операционная среда распределённого девелопмента.", href: "/directions/cryptometry" },
      { name: "ИИ-продакшн", desc: "Создание ИИ-аватаров, цифровых персонажей и корпоративных медиапродуктов.", href: "/directions/ai-production" },
      { name: "Fee-Dev платформа", desc: "Оператор девелоперской среды: упаковка активов, структурирование.", href: "/directions/fee-dev" },
      { name: "Медиа & Аналитический центр", desc: "Публикации, исследования, аналитическая позиция группы.", href: "/media" },
    ],
  },
  {
    id: "dev",
    label: "Развиваемые платформы",
    sublabel: "Beta · R&D",
    color: "#7b2fff",
    bg: "rgba(123,47,255,0.05)",
    border: "rgba(123,47,255,0.18)",
    items: [
      { name: "LSS — Земельный поиск", desc: "Аналитический поиск и структуризация земельных активов. В активной разработке.", href: "/directions/lss" },
      { name: "Лаборатория ИИ", desc: "Разработка отраслевых ИИ-инструментов для рынка недвижимости.", href: "/directions/ai-lab" },
      { name: "Земельная аналитика & Data", desc: "Data-продукты, цифровые досье и аналитические панели.", href: "/directions/land-data" },
    ],
  },
  {
    id: "forming",
    label: "Формируемые направления",
    sublabel: "Формируется · Консалтинг",
    color: "rgba(255,255,255,0.35)",
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.07)",
    items: [
      { name: "Управление недвижимостью", desc: "Цифровое управление объектами и постдевелоперское сопровождение.", href: "/directions/property-mgmt" },
      { name: "Коллективные модели участия", desc: "Проектирование правовой архитектуры и логики участия.", href: "/directions/invest-models" },
      { name: "Лицензирование технологий", desc: "Передача ИИ-сервисов и аналитических решений партнёрам.", href: "/directions/licensing" },
    ],
  },
];

export function MaturitySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label mb-4">◆ Зрелость направлений</div>
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight">
              Операционное ядро. Развиваемые платформы.<br />
              <span className="text-white/45">Формируемые направления.</span>
            </h2>
          </div>
          <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-xs">
            Публично обозначаем стадию каждого направления. Это рабочий принцип — не декларировать то, чего нет.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {MATURITY_COLUMNS.map((col) => (
            <div key={col.id} className="rounded-sm overflow-hidden" style={{ border: `1px solid ${col.border}` }}>
              {/* Column header */}
              <div className="px-5 py-4" style={{ background: col.bg, borderBottom: `1px solid ${col.border}` }}>
                <div className="font-oswald text-white font-semibold text-base mb-0.5">{col.label}</div>
                <div className="font-mono-ibm text-xs" style={{ color: col.color }}>{col.sublabel}</div>
              </div>

              {/* Items */}
              <div className="divide-y" style={{ borderColor: col.border }}>
                {col.items.map((item, i) => (
                  <a key={i} href={item.href}
                    className="flex items-start gap-3 px-5 py-4 group transition-all"
                    style={{ display: "flex", background: "transparent" }}
                    onMouseEnter={e => (e.currentTarget.style.background = col.bg)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: col.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-oswald text-white text-sm font-medium group-hover:text-ksi-cyan transition-colors mb-1">{item.name}</div>
                      <p className="font-ibm text-white/35 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    <Icon name="ChevronRight" size={12} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-40 transition-opacity text-white" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <a href="/roadmap" className="font-mono-ibm text-xs text-white/25 hover:text-white/50 transition-colors">
            Публичная дорожная карта →
          </a>
        </div>
      </div>
    </section>
  );
}
