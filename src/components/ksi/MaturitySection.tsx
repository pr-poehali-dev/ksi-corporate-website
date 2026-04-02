import Icon from "@/components/ui/icon";

/* ─── Site Stages Visual ────────────────────────────────────────────────────
   Три стадии готовности — как три строительных площадки:
   готовая к сдаче, в процессе стройки, на стадии проектирования.
────────────────────────────────────────────────────────────────────────── */
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
        <linearGradient id="ssg3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* ПЛОЩАДКА 1 — операционное ядро (готово, достроено) */}
      <g transform="translate(10,10)">
        {/* Фундамент */}
        <rect x="0" y="65" width="120" height="6" fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="0.6" strokeOpacity="0.4" />
        {/* Здание */}
        <rect x="10" y="22" width="100" height="43" fill="url(#ssg1)" stroke="#00d4ff" strokeWidth="0.9" strokeOpacity="0.5" />
        {/* Окна 2 ряда */}
        {[0,1,2,3].map(j => (
          <rect key={`w1a${j}`} x={15 + j*23} y={28} width={14} height={10} fill="rgba(0,212,255,0.2)" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.5" />
        ))}
        {[0,1,2,3].map(j => (
          <rect key={`w1b${j}`} x={15 + j*23} y={44} width={14} height={10} fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.4" />
        ))}
        {/* Крыша */}
        <rect x="6" y="16" width="108" height="8" fill="rgba(0,212,255,0.18)" stroke="#00d4ff" strokeWidth="0.7" strokeOpacity="0.55" />
        {/* Лейбл */}
        <text x="60" y="10" textAnchor="middle" fill="#00d4ff" fillOpacity="0.7" fontSize="7" fontFamily="IBM Plex Mono" letterSpacing="1">АКТИВНА</text>
      </g>

      {/* Разрыв 1 */}
      <line x1="140" y1="20" x2="158" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="3,3" />
      <line x1="140" y1="75" x2="158" y2="75" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="3,3" />

      {/* ПЛОЩАДКА 2 — в разработке (стройка) */}
      <g transform="translate(158,10)">
        <rect x="0" y="65" width="120" height="6" fill="rgba(123,47,255,0.1)" stroke="#7b2fff" strokeWidth="0.6" strokeOpacity="0.35" />
        {/* Каркас — частично готово */}
        <rect x="10" y="30" width="100" height="35" fill="url(#ssg2)" stroke="#7b2fff" strokeWidth="0.7" strokeOpacity="0.4" />
        {/* Вертикальные стойки каркаса */}
        {[0,1,2,3].map(j => (
          <line key={`s2v${j}`} x1={10 + j*34} y1={30} x2={10 + j*34} y2={65} stroke="#7b2fff" strokeWidth="0.6" strokeOpacity="0.4" />
        ))}
        {/* Горизонтальные перекрытия */}
        <line x1="10" y1="46" x2="110" y2="46" stroke="#7b2fff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4,3" />
        {/* Несколько заполненных проёмов */}
        {[0,1].map(j => (
          <rect key={`w2${j}`} x={15 + j*34} y={35} width={20} height={10} fill="rgba(123,47,255,0.15)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.4" />
        ))}
        {/* Строительный кран (линии) */}
        <line x1="95" y1="12" x2="95" y2="30" stroke="#7b2fff" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="80" y1="14" x2="110" y2="14" stroke="#7b2fff" strokeWidth="0.6" strokeOpacity="0.3" />
        <line x1="80" y1="14" x2="75" y2="30" stroke="#7b2fff" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="2,2" />
        <text x="60" y="10" textAnchor="middle" fill="#7b2fff" fillOpacity="0.6" fontSize="7" fontFamily="IBM Plex Mono" letterSpacing="0.5">BETA · R&D</text>
      </g>

      {/* Разрыв 2 */}
      <line x1="288" y1="20" x2="306" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="3,3" />
      <line x1="288" y1="75" x2="306" y2="75" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="3,3" />

      {/* ПЛОЩАДКА 3 — формируется (пустой участок) */}
      <g transform="translate(306,10)">
        <rect x="0" y="65" width="144" height="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        {/* Разметка участка — только контур */}
        <rect x="10" y="34" width="124" height="31" fill="url(#ssg3)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" strokeDasharray="5,4" />
        {/* Пунктирная разметка */}
        <line x1="10" y1="50" x2="134" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="4,4" />
        <line x1="72" y1="34" x2="72" y2="65" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="4,4" />
        {/* Маркер */}
        <circle cx="72" cy="49" r="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
        <circle cx="72" cy="49" r="1.5" fill="rgba(255,255,255,0.3)" />
        <text x="72" y="10" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="IBM Plex Mono" letterSpacing="0.5">ФОРМИРУЕТСЯ</text>
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
    bg: "rgba(123,47,255,0.04)",
    border: "rgba(123,47,255,0.2)",
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
    color: "rgba(255,255,255,0.4)",
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.08)",
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
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-label mb-4">◆ Стадии развития</div>
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight">
              Три стадии — как три площадки:<br />
              <span className="text-white/45">готово, в стройке, на проектировании.</span>
            </h2>
          </div>
          <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-xs">
            Публично обозначаем стадию каждого направления.
            Рабочий принцип — не декларировать то, чего нет.
          </p>
        </div>

        {/* Site stages visual */}
        <div className="mb-8 px-4 py-5 rounded-sm"
          style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <SiteStagesVisual />
        </div>

        {/* Три колонки */}
        <div className="grid md:grid-cols-3 gap-4">
          {MATURITY_COLUMNS.map((col) => (
            <div key={col.id} className="overflow-hidden rounded-sm"
              style={{ border: `1px solid ${col.border}` }}>
              {/* Заголовок колонки */}
              <div className="px-5 py-4 flex items-center justify-between"
                style={{ background: col.bg, borderBottom: `1px solid ${col.border}` }}>
                <div>
                  <div className="font-oswald text-white font-semibold text-sm mb-0.5">{col.label}</div>
                  <div className="font-ibm text-xs" style={{ color: col.color }}>{col.sublabel}</div>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
              </div>

              {/* Список направлений */}
              <div>
                {col.items.map((item, i) => (
                  <a key={i} href={item.href}
                    className="flex items-start gap-3 px-5 py-4 group transition-all"
                    style={{
                      borderBottom: i < col.items.length - 1 ? `1px solid ${col.border}50` : "none",
                      background: "transparent",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = col.bg)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <div className="w-0.5 h-full self-stretch flex-shrink-0 mt-1.5" style={{ background: col.color, opacity: 0.4, minHeight: 8 }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-oswald text-white text-sm font-medium group-hover:text-ksi-cyan transition-colors mb-1">
                        {item.name}
                      </div>
                      <p className="font-ibm text-white/32 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    <Icon name="ChevronRight" size={11} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-35 transition-opacity text-white" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <a href="/roadmap" className="font-ibm text-xs text-white/22 hover:text-white/50 transition-colors">
            Публичная дорожная карта →
          </a>
        </div>
      </div>
    </section>
  );
}
