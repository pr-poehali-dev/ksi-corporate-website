import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const LAYERS = [
  { label: "ОПЕРАТОР ИНФРАСТРУКТУРЫ", name: "АО КСИ", desc: "Оператор интеллектуальной инфраструктуры для девелопмента", color: "#00d4ff", primary: true },
  { label: "КЛЮЧЕВОЙ ПРОЕКТ", name: "КриптоМетры", desc: "Интеллектуальная система распределённого девелопмента", color: "#00d4ff", href: "/cryptometry" },
  { label: "ТЕХНОЛОГИЧЕСКОЕ ЯДРО", name: "Лаборатория ИИ", desc: "Интеллектуальная инфраструктура, обучение и развитие системы", color: "#7b2fff", href: "/directions/ai-lab" },
  { label: "ОПЕРАТОРСКИЙ КОНТУР", name: "Центр реализации активов", desc: "Сопровождение и реализация активов в логике проекта", color: "#00d4ff", href: "/directions/fee-dev" },
  { label: "ЗЕМЕЛЬНЫЙ КОНТУР", name: "Служба земельного поиска", desc: "Поиск, анализ площадок, земельно-имущественные задачи", color: "#7b2fff", href: "/directions/lss" },
  { label: "КРЕАТИВНЫЙ КОНТУР", name: "Студия проектного креатива", desc: "Визуальная, концептуальная и презентационная упаковка", color: "#00d4ff", href: "/directions/ai-production" },
];

const SYNERGY = [
  { from: "Служба земельного поиска", arrow: "Данные и активы", to: "КриптоМетры" },
  { from: "Лаборатория ИИ", arrow: "Аналитика и интеллект", to: "Все контуры системы" },
  { from: "Студия проектного креатива", arrow: "Визуальная упаковка", to: "КриптоМетры / Заказчик" },
  { from: "Центр реализации активов", arrow: "Сопровождение и сделки", to: "Реальные проекты" },
];

const PRINCIPLES = [
  { icon: "Layers", title: "Единая система", desc: "Каждая служба — не изолированный отдел, а рабочий контур единой интеллектуальной среды." },
  { icon: "RefreshCw", title: "Обратная связь", desc: "Опыт каждой задачи возвращается в систему — данные, методология и точность растут с каждым запросом." },
  { icon: "GitBranch", title: "Распределённая логика", desc: "Задачи решаются через подключение нужных контуров, а не через жёсткую маршрутизацию." },
  { icon: "BrainCircuit", title: "Гибридная модель", desc: "ИИ, методология и операторская верификация работают вместе — не автономный ИИ и не ручной сервис." },
];

export default function Ecosystem() {
  return (
    <PageLayout breadcrumb={[{ label: "Архитектура проекта" }]}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/files/2116a75d-3959-4f90-b237-7e4a87ff500e.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.15 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.5) 0%, rgba(10,10,15,0.92) 100%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Архитектура проекта</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Как устроен<br />
              <span className="text-gradient-cyan">проект АО КСИ</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Оператор интеллектуальной инфраструктуры для девелопмента.
              Управляющая компания проекта «КриптоМетры». Четыре внутренние службы
              обеспечивают создание виртуального девелопера.
            </p>
          </div>
        </div>
      </section>

      {/* Слои архитектуры */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Структура</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-3">Слои проекта</h2>
          <p className="font-ibm text-white/42 text-base mb-12 max-w-2xl">
            АО КСИ развивает систему послойно: от оператора инфраструктуры через ключевой
            проект КриптоМетры к прикладным контурам внутренних служб.
          </p>

          <div className="space-y-1">
            {LAYERS.map((item, i) => (
              <a key={i} href={item.href || "#"} className={`flex items-stretch group ${item.href ? "cursor-pointer" : ""}`}
                style={{ borderBottom: i < LAYERS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div className="w-0.5 flex-shrink-0" style={{ background: item.color, opacity: 0.4 }} />
                <div className="flex items-center px-4 flex-shrink-0 w-10" style={{ background: "rgba(255,255,255,0.01)" }}>
                  <span className="font-ibm text-[9px]" style={{ color: item.color, opacity: 0.5 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 grid md:grid-cols-3 gap-4 py-5 pr-6" style={{ paddingLeft: i > 1 ? 20 : 0 }}>
                  <div className="flex items-center">
                    <span className="font-ibm text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>{item.label}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-oswald text-sm font-medium transition-colors ${item.primary ? "text-ksi-cyan" : "text-white/75 group-hover:text-white"}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-ibm text-white/38 text-xs">{item.desc}</span>
                    {item.href && <Icon name="ArrowRight" size={12} className="text-white/15 group-hover:text-ksi-cyan/50 transition-colors ml-3 flex-shrink-0" />}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Синергия */}
      <section className="py-20 border-t border-ksi-border/30"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,14,26,1), rgba(10,10,15,1))" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label mb-5">◆ Синергия</div>
              <h2 className="font-oswald text-4xl font-semibold text-white mb-5">
                Как контуры<br /><span className="text-gradient-main">работают вместе</span>
              </h2>
              <p className="font-ibm text-white/48 text-base leading-relaxed mb-5">
                Каждая внутренняя служба — не изолированный отдел. Земельный поиск питает
                данные для анализа, Лаборатория ИИ обрабатывает и усиливает все процессы,
                Студия креатива упаковывает результаты, а Центр реализации доводит проект до сделки.
              </p>
              <p className="font-ibm text-white/30 text-sm leading-relaxed">
                Вместе они формируют основу КриптоМетров — интеллектуальной системы
                распределённого девелопмента, где задачи решаются в единой среде.
              </p>
            </div>
            <div className="space-y-3">
              {SYNERGY.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="font-ibm text-white/55 text-sm flex-1">{item.from}</span>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <Icon name="ArrowRight" size={12} className="text-ksi-cyan/30" />
                    <span className="font-ibm text-white/18 text-[9px] mt-0.5">{item.arrow}</span>
                  </div>
                  <span className="font-ibm text-white/30 text-sm flex-1 text-right">{item.to}</span>
                </div>
              ))}
              <div className="text-center pt-3">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm"
                  style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}>
                  <Icon name="Hexagon" size={15} className="text-ksi-cyan/60" />
                  <span className="font-oswald text-white/50 text-sm">→ КриптоМетры</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Принципы архитектуры */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Принципы</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-3">Архитектурные принципы</h2>
          <p className="font-ibm text-white/40 text-base mb-12 max-w-2xl">
            Почему это не набор отдельных проектов, а единая система.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="p-6 rounded-sm" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                  style={{
                    background: i % 2 === 0 ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)"}`,
                  }}>
                  <Icon name={p.icon} size={18} style={{ color: i % 2 === 0 ? "#00d4ff" : "#7b2fff", opacity: 0.7 }} />
                </div>
                <div className="font-oswald text-white/75 font-medium text-base mb-2">{p.title}</div>
                <p className="font-ibm text-white/35 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-oswald text-3xl font-semibold text-white mb-4">
            Подробнее о каждом<br /><span className="text-gradient-main">элементе системы</span>
          </h2>
          <p className="font-ibm text-white/40 text-base mb-8">
            Изучите ключевой проект и внутренние службы АО КСИ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/cryptometry" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">О проекте КриптоМетры</a>
            <a href="/directions" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">Внутренние службы</a>
            <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer" style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>Связаться</a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}