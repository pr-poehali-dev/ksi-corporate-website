import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    icon: "BrainCircuit",
    title: "Лаборатория ИИ",
    subtitle: "AI Lab · PropTech Intelligence",
    desc: "Технологическое ядро компании. Отвечает за интеллектуальную инфраструктуру, настройку, обучение и развитие системы КриптоМетры. Разрабатывает ИИ-решения для земельного рынка, девелопмента и аналитики.",
    tags: ["ИИ-инфраструктура", "Обучение системы", "Аналитика"],
    color: "#7b2fff",
    href: "/directions/ai-lab",
    stat: "Технологическое ядро",
  },
  {
    icon: "TrendingUp",
    title: "Центр реализации активов",
    subtitle: "Fee-Development · Asset Operator",
    desc: "Внутренний контур сопровождения и реализации активов в логике проекта. Упаковка, структурирование, интеграция исполнителей и логика вывода активов на рынок.",
    tags: ["Упаковка активов", "Структурирование", "Реализация"],
    color: "#00d4ff",
    href: "/directions/fee-dev",
    stat: "Операторский контур",
  },
  {
    icon: "Search",
    title: "Служба земельного поиска",
    subtitle: "Land Search Service · Analytics",
    desc: "Контур, отвечающий за поиск участков, анализ площадок и работу с земельно-имущественными задачами. Аналитический поиск, фильтрация и структуризация земельных активов.",
    tags: ["Поиск участков", "Анализ площадок", "Земельная аналитика"],
    color: "#7b2fff",
    href: "/directions/lss",
    stat: "Земельный контур",
  },
  {
    icon: "Palette",
    title: "Студия проектного креатива",
    subtitle: "Creative Studio · Visual & Concept",
    desc: "Контур визуальной, концептуальной и презентационной упаковки решений, идей и материалов. Создание презентаций, визуальных коммуникаций и объясняющего контента.",
    tags: ["Презентации", "Визуальная упаковка", "Концепции"],
    color: "#00d4ff",
    href: "/directions/ai-production",
    stat: "Креативный контур",
  },
];

export default function Directions() {
  return (
    <PageLayout breadcrumb={[{ label: "Внутренние службы" }]}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(123,47,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Структура компании</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Внутренние службы<br />
              <span className="text-gradient-purple">АО КСИ</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              АО КСИ — оператор интеллектуальной инфраструктуры для девелопмента.
              Внутренние службы компании обеспечивают создание виртуального девелопера
              и развитие ключевого проекта — КриптоМетры.
            </p>
          </div>
        </div>
      </section>

      {/* Связь с КриптоМетрами */}
      <section className="py-14 border-t border-b border-ksi-border/30"
        style={{ background: "rgba(0,212,255,0.015)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <Icon name="Hexagon" size={22} className="text-ksi-cyan" />
              </div>
              <div>
                <h3 className="font-oswald text-white/80 text-lg font-medium mb-1">Все службы работают на один проект</h3>
                <p className="font-ibm text-white/40 text-sm leading-relaxed max-w-xl">
                  Внутренние службы АО КСИ обеспечивают работу и развитие КриптоМетров —
                  интеллектуальной системы распределённого девелопмента.
                </p>
              </div>
            </div>
            <a href="/cryptometry" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer flex-shrink-0">
              О проекте КриптоМетры →
            </a>
          </div>
        </div>
      </section>

      {/* 4 службы */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-5">
            {SERVICES.map((s, i) => (
              <a key={i} href={s.href} className="block group">
                <div className="rounded-sm p-7 md:p-8 transition-all duration-300 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${s.color}25`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-13 h-13 rounded-sm flex items-center justify-center"
                          style={{ background: `${s.color}08`, border: `1px solid ${s.color}18`, width: 52, height: 52 }}>
                          <Icon name={s.icon} size={24} style={{ color: s.color, opacity: 0.75 }} />
                        </div>
                        <div>
                          <div className="font-mono-ibm text-white/20 text-[10px] tracking-widest mb-1">{s.subtitle}</div>
                          <h2 className="font-oswald text-2xl md:text-3xl font-semibold text-white group-hover:text-ksi-cyan transition-colors">
                            {s.title}
                          </h2>
                        </div>
                      </div>
                      <p className="font-ibm text-white/48 text-base leading-relaxed">{s.desc}</p>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-4">
                      <span className="font-mono-ibm text-xs px-3 py-1.5 rounded-sm"
                        style={{ background: `${s.color}08`, color: s.color, border: `1px solid ${s.color}18`, opacity: 0.7 }}>
                        {s.stat}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {s.tags.map(t => (
                          <span key={t} className="font-ibm text-[10px] px-2 py-0.5 rounded-sm"
                            style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.30)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="font-oswald text-xs uppercase tracking-wider text-transparent group-hover:text-ksi-cyan/60 transition-all flex items-center gap-2">
                        Подробнее <Icon name="ArrowRight" size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Как службы работают вместе */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-5">◆ Единая логика</div>
              <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-5">
                Как службы работают<br /><span className="text-gradient-main">вместе</span>
              </h2>
              <p className="font-ibm text-white/50 text-base leading-relaxed mb-5">
                Каждая внутренняя служба АО КСИ — не изолированный отдел, а рабочий контур
                единой системы. Земельный поиск питает данные для анализа, Лаборатория ИИ
                обрабатывает и усиливает все процессы, Студия креатива упаковывает результаты,
                а Центр реализации доводит проект до сделки.
              </p>
              <p className="font-ibm text-white/32 text-sm leading-relaxed">
                Вместе они формируют основу КриптоМетров — интеллектуальной системы
                распределённого девелопмента, где задачи решаются в единой среде.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { from: "Служба земельного поиска", to: "Данные и активы", icon: "ArrowRight" },
                { from: "Лаборатория ИИ", to: "Аналитика и интеллект", icon: "ArrowRight" },
                { from: "Студия проектного креатива", to: "Визуальная упаковка", icon: "ArrowRight" },
                { from: "Центр реализации активов", to: "Сопровождение и сделки", icon: "ArrowRight" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="font-ibm text-white/55 text-sm flex-1">{item.from}</span>
                  <Icon name={item.icon} size={14} className="text-ksi-cyan/30 flex-shrink-0" />
                  <span className="font-ibm text-white/30 text-sm flex-1 text-right">{item.to}</span>
                </div>
              ))}
              <div className="text-center pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm"
                  style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}>
                  <Icon name="Hexagon" size={14} className="text-ksi-cyan/60" />
                  <span className="font-oswald text-white/50 text-sm">КриптоМетры</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-oswald text-3xl font-semibold text-white mb-4">
            Обсудить задачу<br /><span className="text-gradient-main">с конкретной службой</span>
          </h2>
          <p className="font-ibm text-white/40 text-base mb-8">
            Если у вас есть задача, которую можно решить через одну из внутренних
            служб АО КСИ — свяжитесь с нами.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              Обсудить задачу
            </a>
            <a href="/cryptometry" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              О системе КриптоМетры
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}