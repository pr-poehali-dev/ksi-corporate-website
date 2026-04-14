import Icon from "@/components/ui/icon";

const CLUSTERS = [
  {
    id: "analytics",
    title: "Аналитика и поиск",
    color: "#00d4ff",
    modules: [
      {
        icon: "Search",
        title: "Служба земельного поиска LSS",
        desc: "Аналитический поиск и фильтрация земельных активов для девелопмента и инвестиций.",
        href: "/directions/lss",
      },
      {
        icon: "DatabaseZap",
        title: "Земельная аналитика & Data",
        desc: "Цифровые досье, картографические решения и data-продукты для земельных активов.",
        href: "/directions/land-data",
      },
      {
        icon: "FileSearch",
        title: "Цифровые досье",
        desc: "Структурированная информация об объектах и участках для принятия решений.",
        href: "/directions/land-data",
      },
    ],
  },
  {
    id: "creative",
    title: "Креатив и упаковка",
    color: "#7b2fff",
    modules: [
      {
        icon: "Clapperboard",
        title: "Студия креатива · ИИ-продакшн",
        desc: "ИИ-аватары, видеопрезентации, цифровые персонажи и медийная оболочка для проектов.",
        href: "/directions/ai-production",
      },
      {
        icon: "Newspaper",
        title: "Медиа & Аналитический центр",
        desc: "Исследования, рыночные обзоры и интеллектуальное сопровождение отрасли.",
        href: "/directions/media",
      },
      {
        icon: "Presentation",
        title: "Визуальная упаковка",
        desc: "Презентационные материалы, брендинг и визуальные коммуникации для девелоперов.",
        href: "/directions/ai-production",
      },
    ],
  },
  {
    id: "operations",
    title: "Структурирование и сопровождение",
    color: "#5599cc",
    modules: [
      {
        icon: "Settings2",
        title: "Центр реализации активов · Fee-Dev",
        desc: "Упаковка активов, структурирование проектов и интеграция профессиональных исполнителей.",
        href: "/directions/fee-dev",
      },
      {
        icon: "Compass",
        title: "Стратегический консалтинг",
        desc: "Сопровождение девелоперских и инвестиционных проектов, стратегия выхода на рынок.",
        href: "/directions/consulting",
      },
      {
        icon: "Building2",
        title: "Управление и эксплуатация",
        desc: "Постдевелоперское сопровождение и цифровое управление объектами.",
        href: "/directions/property-mgmt",
      },
    ],
  },
];

export function ModulesSection() {
  return (
    <section id="modules" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4">◆ Прикладной слой экосистемы</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
          Прикладные ИИ-модули<br />
          <span className="text-gradient-main">для девелоперских задач</span>
        </h2>
        <p className="font-ibm text-white/50 text-lg leading-relaxed mb-16 max-w-3xl">
          Отдельные модули АО КСИ уже сегодня могут использоваться как самостоятельные
          решения для девелоперов, владельцев активов и партнёров рынка.
        </p>

        <div className="space-y-16">
          {CLUSTERS.map((cluster) => (
            <div key={cluster.id}>
              {/* Заголовок кластера */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-6 rounded-full" style={{ background: cluster.color, opacity: 0.6 }} />
                <h3 className="font-oswald text-xl font-medium text-white/75">{cluster.title}</h3>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${cluster.color}20, transparent)` }} />
              </div>

              {/* Карточки модулей */}
              <div className="grid md:grid-cols-3 gap-4">
                {cluster.modules.map((mod, i) => (
                  <a key={i} href={mod.href} className="group block p-5 rounded-sm transition-all duration-300 cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.015)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${cluster.color}30`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${cluster.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-sm flex items-center justify-center"
                        style={{ background: `${cluster.color}10`, border: `1px solid ${cluster.color}15` }}>
                        <Icon name={mod.icon} size={15} style={{ color: cluster.color, opacity: 0.7 }} />
                      </div>
                      <h4 className="font-oswald text-white/70 text-sm font-medium group-hover:text-white/90 transition-colors">
                        {mod.title}
                      </h4>
                    </div>
                    <p className="font-ibm text-white/35 text-sm leading-relaxed">{mod.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="/directions" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
            Все модули
          </a>
        </div>
      </div>
    </section>
  );
}
