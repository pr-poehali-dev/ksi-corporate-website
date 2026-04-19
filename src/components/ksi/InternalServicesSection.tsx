import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    icon: "Search",
    title: "Служба земельного поиска",
    benefit: "Структурированная и выверенная информация — вместо шума и ручного обхода каталогов",
    desc: "Автоматизирует просмотр объявлений, брокерских потоков, закрытых каталогов и инструментов внерыночного поиска. Людям передаёт готовый, структурированный результат.",
    color: "#7b2fff",
    href: "/directions/lss",
  },
  {
    icon: "Palette",
    title: "Студия проектного креатива",
    benefit: "Первичная визуализация и точное ТЗ — за 24 часа вместо недель согласований",
    desc: "За 24 часа создаёт первичную визуализацию идей и помогает быстро сформировать точное ТЗ для архитектора или продакшена.",
    color: "#00d4ff",
    href: "/directions/ai-production",
  },
  {
    icon: "BrainCircuit",
    title: "Лаборатория ИИ",
    benefit: "Превращает опыт специалистов в масштабируемую технологию",
    desc: "Обучает систему на реальных кейсах. Действия, решения и сценарии превращаются в компонент будущего виртуального девелопера.",
    color: "#a070ff",
    href: "/directions/ai-lab",
  },
  {
    icon: "TrendingUp",
    title: "Центр реализации активов",
    benefit: "Актив, упакованный и готовый к выводу на рынок",
    desc: "Помогает собрать финансовую, юридическую и маркетинговую упаковку актива, подготовить его к выводу на рынок и к взаимодействию с fee-девелоперами.",
    color: "#00d4ff",
    href: "/directions/fee-dev",
  },
];

export function InternalServicesSection() {
  return (
    <section
      id="modules"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,24,1), rgba(10,10,15,1))" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4">◆ Модули и внутренние службы</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
          Что вы получаете<br />
          <span className="text-gradient-main">на практике</span>
        </h2>
        <p className="font-ibm text-white/50 text-lg leading-relaxed mb-12 max-w-2xl">
          Каждый модуль АО КСИ — это самостоятельный продукт с измеримой пользой:
          сокращение сроков, снятие нагрузки с команды, рост точности.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <a
              key={i}
              href={s.href}
              className="group flex flex-col p-7 rounded-sm transition-all duration-300 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${s.color}35`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div className="flex items-start gap-5 mb-5">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                  style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
                >
                  <Icon name={s.icon} size={22} style={{ color: s.color, opacity: 0.85 }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-oswald text-white text-xl font-medium mb-2 leading-tight group-hover:text-white transition-colors">
                    {s.title}
                  </h3>
                  <div
                    className="font-ibm text-sm leading-snug italic"
                    style={{ color: s.color, opacity: 0.85 }}
                  >
                    {s.benefit}
                  </div>
                </div>
              </div>

              <p className="font-ibm text-white/45 text-sm leading-relaxed mb-5 pl-[68px]">
                {s.desc}
              </p>

              <span
                className="font-oswald text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-block pl-[68px]"
                style={{ color: s.color, opacity: 0.7 }}
              >
                Подробнее о модуле →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
