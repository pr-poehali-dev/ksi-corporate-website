import Icon from "@/components/ui/icon";

export function MaturitySection() {
  const items = [
    {
      name: "КриптоМетры",
      status: "Активна",
      statusCode: "active",
      desc: "Флагманская платформа. Операционная среда распределённого девелопмента в рабочем режиме.",
      href: "/directions/cryptometry",
    },
    {
      name: "ИИ-продакшн",
      status: "Активна",
      statusCode: "active",
      desc: "Создание ИИ-аватаров, цифровых персонажей и корпоративных медиапродуктов.",
      href: "/directions/ai-production",
    },
    {
      name: "Fee-Dev платформа",
      status: "Активна",
      statusCode: "active",
      desc: "Оператор девелоперской среды: упаковка активов, структурирование, интеграция исполнителей.",
      href: "/directions/fee-dev",
    },
    {
      name: "LSS — Земельный поиск",
      status: "Beta",
      statusCode: "beta",
      desc: "Сервис аналитического поиска и структуризации земельных активов. В активной разработке.",
      href: "/directions/lss",
    },
    {
      name: "Лаборатория ИИ",
      status: "R&D",
      statusCode: "rnd",
      desc: "Разработка отраслевых ИИ-инструментов для рынка недвижимости и девелопмента.",
      href: "/directions/ai-lab",
    },
    {
      name: "Земельная аналитика & Data",
      status: "R&D",
      statusCode: "rnd",
      desc: "Data-продукты, цифровые досье и аналитические панели по земельным активам.",
      href: "/directions/land-data",
    },
    {
      name: "Управление недвижимостью",
      status: "Формируется",
      statusCode: "forming",
      desc: "Цифровое управление объектами: постдевелоперское сопровождение и доходные сервисы.",
      href: "/directions/property-mgmt",
    },
    {
      name: "Коллективные модели участия",
      status: "Консалтинг",
      statusCode: "forming",
      desc: "Проектирование правовой архитектуры и логики участия. Структурирующая функция.",
      href: "/directions/invest-models",
    },
    {
      name: "Лицензирование технологий",
      status: "Формируется",
      statusCode: "forming",
      desc: "Передача ИИ-сервисов и аналитических решений внешним партнёрам по лицензионным моделям.",
      href: "/directions/licensing",
    },
    {
      name: "Медиа & Аналитический центр",
      status: "Активна",
      statusCode: "active",
      desc: "Публикации, исследования и аналитическая позиция группы по рынку недвижимости.",
      href: "/media",
    },
  ];

  const statusMeta: Record<string, { color: string; bg: string; border: string }> = {
    active: { color: "#00d4ff", bg: "rgba(0,212,255,0.07)", border: "rgba(0,212,255,0.2)" },
    beta: { color: "#7b2fff", bg: "rgba(123,47,255,0.07)", border: "rgba(123,47,255,0.2)" },
    rnd: { color: "rgba(255,255,255,0.5)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)" },
    forming: { color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.07)" },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-border to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label mb-4">◆ Зрелость направлений</div>
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight">
              Что работает. Что в разработке.<br />
              <span className="text-white/50">Что формируется.</span>
            </h2>
          </div>
          <p className="font-ibm text-white/40 text-sm leading-relaxed max-w-xs">
            Мы публично обозначаем стадию каждого направления. Это рабочий принцип группы — не декларировать то, чего нет.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {items.map((item, i) => {
            const meta = statusMeta[item.statusCode];
            return (
              <a key={i} href={item.href}
                className="group flex items-start gap-5 p-5 rounded-sm transition-all cursor-pointer"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = meta.border)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
              >
                <div className="flex-shrink-0 pt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: meta.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-oswald text-white text-sm font-medium group-hover:text-ksi-cyan transition-colors">{item.name}</span>
                    <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm flex-shrink-0"
                      style={{ color: meta.color, background: meta.bg, border: `1px solid ${meta.border}` }}>
                      {item.status}
                    </span>
                  </div>
                  <p className="font-ibm text-white/35 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <Icon name="ChevronRight" size={14} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-40 transition-opacity text-white" />
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-6 items-center">
          {[
            { code: "active", label: "Активна" },
            { code: "beta", label: "Beta / Пилот" },
            { code: "rnd", label: "R&D / Разработка" },
            { code: "forming", label: "Формируется" },
          ].map((s) => {
            const meta = statusMeta[s.code];
            return (
              <div key={s.code} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
                <span className="font-mono-ibm text-xs" style={{ color: meta.color }}>{s.label}</span>
              </div>
            );
          })}
          <a href="/roadmap" className="ml-auto font-mono-ibm text-xs text-white/25 hover:text-white/50 transition-colors">
            Публичная дорожная карта →
          </a>
        </div>
      </div>
    </section>
  );
}
