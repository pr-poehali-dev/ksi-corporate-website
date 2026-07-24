import Icon from "@/components/ui/icon";

const STRATEGY_POINTS = [
  { icon: "Layers", text: "Движение от прикладных модулей к целостной распределённой системе" },
  { icon: "Network", text: "Развитие среды взаимодействия участников, а не только инструментов" },
  { icon: "GitMerge", text: "Связывание интеллектуального контура, активов и сценариев реализации" },
  { icon: "Compass", text: "Формирование интеллектуальной системы распределённого девелопмента" },
];

function StrategyBlock() {
  return (
    <section id="strategy" className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,22,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(123,47,255,0.04), transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4" style={{ color: "#7b2fff" }}>◆ Стратегия</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              Стратегическая<br />
              <span className="text-gradient-purple">перспектива</span>
            </h2>
            <p className="font-ibm text-white/50 text-lg leading-relaxed mb-6">
              КриптоМетры создаются как ключевой цифровой и интеллектуальный контур интеллектуальной
              системы распределённого девелопмента, способный связывать активы, спрос, участников
              и сценарии реализации проектов в единой управляемой среде.
            </p>
            <p className="font-ibm text-white/35 text-sm leading-relaxed">
              На стартовом этапе система развивается через прикладные модули и внутренние
              контуры АО КСИ. Стратегическая цель шире: сформировать управляемую среду,
              в которой проекты, активы, компетенции и интеллектуальные контуры собираются
              в новую архитектуру девелопмента — с разными моделями реализации, включая кооперативную.
            </p>
          </div>

          <div className="space-y-3">
            {STRATEGY_POINTS.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-sm"
                style={{
                  background: "rgba(123,47,255,0.02)",
                  border: "1px solid rgba(123,47,255,0.08)",
                }}>
                <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "rgba(123,47,255,0.06)",
                    border: "1px solid rgba(123,47,255,0.14)",
                  }}>
                  <Icon name={item.icon} size={15} className="text-ksi-purple/65" />
                </div>
                <p className="font-ibm text-white/48 text-sm leading-relaxed pt-1.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const DEMAND_THESES = [
  { icon: "TrendingUp", title: "Формирование спроса", desc: "Не только сопровождение, но и последовательное создание организованного интереса к активам и проектам" },
  { icon: "Route", title: "Организованная логика", desc: "Переход от хаотичного рынка к среде, в которой актив и спрос связываются системно" },
  { icon: "Workflow", title: "Архитектура реализации", desc: "Прикладные модули как стартовая стадия на пути к целостной модели работы с проектами" },
];

function DemandModelBlock() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="section-label mb-4 justify-center flex">◆ Горизонт развития</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            От прикладных задач —<br />
            <span className="text-gradient-main">к модели реализации</span>
          </h2>
          <p className="font-ibm text-white/45 text-lg leading-relaxed">
            В классической модели актив часто зависит от поиска внешнего покупателя
            и разрозненных каналов спроса. КриптоМетры создаются как управляемая среда,
            в которой спрос, участники и сценарии реализации последовательно собираются
            внутри системы — через интеллектуальные контуры и управляемую логику взаимодействия.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {DEMAND_THESES.map((item, i) => (
            <div key={i} className="p-6 rounded-sm"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
              <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-4"
                style={{
                  background: i === 1 ? "rgba(123,47,255,0.06)" : "rgba(0,212,255,0.06)",
                  border: `1px solid ${i === 1 ? "rgba(123,47,255,0.14)" : "rgba(0,212,255,0.14)"}`,
                }}>
                <Icon name={item.icon} size={18}
                  style={{ color: i === 1 ? "#7b2fff" : "#00d4ff", opacity: 0.6 }} />
              </div>
              <h3 className="font-oswald text-white/75 text-base font-medium mb-2">{item.title}</h3>
              <p className="font-ibm text-white/35 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-10 p-5 rounded-sm"
          style={{
            background: "rgba(123,47,255,0.02)",
            borderLeft: "2px solid rgba(123,47,255,0.25)",
          }}>
          <p className="font-ibm text-white/38 text-sm leading-relaxed">
            Сегодня проект развивается через прикладные задачи: поиск участков,
            анализ площадок, упаковку, сопровождение. Но долгосрочный горизонт
            КриптоМетров связан с более глубокой целью — превратить эти функции
            в основу новой модели работы с проектами и активами, в которой
            накопление компетенций, участников и интеллектуальных контуров
            создаёт принципиально иное качество среды.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function CryptometryStrategy() {
  return (
    <>
      <StrategyBlock />
      <DemandModelBlock />
    </>
  );
}