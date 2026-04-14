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
        icon: "FileSearch",
        title: "Цифровые досье",
        desc: "Структурированная информация об участках и объектах для принятия решений.",
        href: "/directions/lss",
      },
      {
        icon: "BrainCircuit",
        title: "Лаборатория ИИ",
        desc: "Интеллектуальная инфраструктура, обучение и развитие системы КриптоМетры.",
        href: "/directions/ai-lab",
      },
    ],
  },
  {
    id: "creative",
    title: "Креатив и упаковка",
    color: "#7b2fff",
    modules: [
      {
        icon: "Palette",
        title: "Студия проектного креатива",
        desc: "Визуальная, концептуальная и презентационная упаковка решений и проектов.",
        href: "/directions/ai-production",
      },
      {
        icon: "Presentation",
        title: "Визуальная упаковка",
        desc: "Презентационные материалы, концепции и визуальные коммуникации для девелоперов.",
        href: "/directions/ai-production",
      },
      {
        icon: "Bot",
        title: "ИИ-персонажи и аватары",
        desc: "Цифровые персонажи и медийные решения для проектов и презентаций.",
        href: "/directions/ai-production",
      },
    ],
  },
  {
    id: "operations",
    title: "Структурирование и реализация",
    color: "#5599cc",
    modules: [
      {
        icon: "TrendingUp",
        title: "Центр реализации активов",
        desc: "Упаковка активов, структурирование проектов и интеграция профессиональных исполнителей.",
        href: "/directions/fee-dev",
      },
      {
        icon: "Settings2",
        title: "Операторское сопровождение",
        desc: "Сопровождение девелоперских задач: от анализа до реализации в логике проекта.",
        href: "/directions/fee-dev",
      },
      {
        icon: "Scale",
        title: "Юридическое структурирование",
        desc: "Формирование правовой архитектуры и логики участия в проектах.",
        href: "/directions/fee-dev",
      },
    ],
  },
];

export function ModulesSection() {
  return (
    <section id="modules" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4">◆ Прикладные контуры системы</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
          Прикладные ИИ-модули<br />
          <span className="text-gradient-main">для девелоперских задач</span>
        </h2>
        <p className="font-ibm text-white/50 text-lg leading-relaxed mb-16 max-w-3xl">
          Отдельные модули системы КриптоМетры уже сегодня могут использоваться как самостоятельные
          решения для девелоперов, владельцев активов и партнёров рынка.
        </p>

        <div className="space-y-16">
          {CLUSTERS.map((cluster) => (
            <div key={cluster.id}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-6 rounded-full" style={{ background: cluster.color, opacity: 0.6 }} />
                <h3 className="font-oswald text-xl font-medium text-white/75">{cluster.title}</h3>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${cluster.color}20, transparent)` }} />
              </div>

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
            Все внутренние службы
          </a>
        </div>
      </div>
    </section>
  );
}
