import Icon from "@/components/ui/icon";

const WHAT_IS = [
  { icon: "Layers", text: "Единая интеллектуальная система, а не набор разрозненных функций" },
  { icon: "GitBranch", text: "Распределённая логика девелопмента — задачи, активы, компетенции в одной среде" },
  { icon: "Target", text: "Система решения задач, а не каталог услуг" },
  { icon: "TrendingUp", text: "Развитие от стартовых контуров к целостной модели виртуального девелопера" },
  { icon: "Building", text: "Прямая связь с управляющим и операторским контуром АО КСИ" },
];

const WHY_ITEMS = [
  "Снижение хаоса в девелоперских процессах",
  "Переход от разрозненных действий к единой интеллектуальной системе",
  "Интеграция аналитики, поиска, упаковки, сопровождения и реализации",
  "Накопление компетенций внутри одной среды",
  "Создание базы для будущего виртуального девелопера",
];

function HeroBlock() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,212,255,0.06), transparent)" }} />
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="section-label mb-5">◆ Ключевой проект АО КСИ</div>
          <h1 className="font-oswald font-bold text-5xl md:text-6xl xl:text-7xl leading-tight mb-3">
            <span className="text-white">КриптоМетры</span>
          </h1>
          <h2 className="font-oswald font-medium text-xl md:text-2xl xl:text-3xl leading-snug mb-8">
            <span className="text-gradient-cyan">Интеллектуальная система</span><br />
            <span className="text-white/75">распределённого девелопмента</span>
          </h2>
          <p className="font-ibm text-white/50 text-lg leading-relaxed mb-10 max-w-2xl">
            КриптоМетры — ключевой проект АО КСИ, в рамках которого создаётся система
            нового типа: единая интеллектуальная среда для решения задач девелопмента,
            недвижимости и земельно-имущественного контура.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#how-it-works" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              Как работает система
            </a>
            <a href="#contours" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              Внутренние контуры
            </a>
            <a href="#strategy" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer"
              style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
              Стратегическая перспектива
            </a>
            <a href="#beta" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer"
              style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
              Участвовать в бета-тестировании
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatIsBlock() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4">◆ О системе</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Что такое<br /><span className="text-gradient-cyan">КриптоМетры</span>
            </h2>
            <p className="font-ibm text-white/50 text-lg leading-relaxed">
              КриптоМетры — это не просто цифровой интерфейс и не набор разрозненных функций.
              Это интеллектуальная система распределённого девелопмента, в которой задачи,
              компетенции, внутренние службы и прикладные контуры собираются в единую среду.
            </p>
          </div>
          <div className="space-y-3">
            {WHAT_IS.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-sm"
                style={{ background: "rgba(0,212,255,0.02)", border: "1px solid rgba(0,212,255,0.08)" }}>
                <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                  <Icon name={item.icon} size={15} className="text-ksi-cyan/65" />
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

function WhyBlock() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,14,26,1), rgba(10,10,15,1))" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="section-label mb-4 justify-center flex">◆ Замысел</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Зачем создаются<br /><span className="text-gradient-main">КриптоМетры</span>
          </h2>
          <p className="font-ibm text-white/45 text-lg leading-relaxed">
            Классический девелопмент опирается на множество разрозненных функций, подрядчиков,
            процессов и точек принятия решений. КриптоМетры создаются как интеллектуальная
            система, которая со временем сможет собрать ключевые контуры этой среды в единую логику.
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {WHY_ITEMS.map((text, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-sm"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: i % 2 === 0 ? "#00d4ff" : "#7b2fff", opacity: 0.5 }} />
              <p className="font-ibm text-white/50 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CryptometryHero() {
  return (
    <>
      <HeroBlock />
      <WhatIsBlock />
      <WhyBlock />
    </>
  );
}