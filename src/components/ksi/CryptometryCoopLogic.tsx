import Icon from "@/components/ui/icon";

const THESES = [
  {
    icon: "Users",
    title: "Объединение участников вокруг проекта",
    desc: "Кооперативный контур собирает девелоперов, владельцев активов, землевладельцев и партнёров системы в одной управляемой среде.",
  },
  {
    icon: "Route",
    title: "Интеллектуальная маршрутизация задач",
    desc: "Запросы участников распределяются между прикладными модулями и внутренними службами через единый интеллектуальный слой.",
  },
  {
    icon: "Database",
    title: "Цифровая среда для активов и сценариев",
    desc: "Активы, проекты и сценарии реализации описываются и сопоставляются внутри единой цифровой среды кооперативной системы.",
  },
  {
    icon: "GitMerge",
    title: "Переход от модулей к целостной системе",
    desc: "Поэтапная сборка прикладных модулей в управляемую кооперативную модель распределённого девелопмента.",
  },
];

export default function CryptometryCoopLogic() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,22,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(123,47,255,0.05), transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="section-label mb-4">◆ Кооперативная логика</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Кооперативная логика<br />
            <span className="text-gradient-purple">КриптоМетров</span>
          </h2>
          <p className="font-ibm text-white/50 text-base md:text-lg leading-relaxed">
            КриптоМетры развиваются как цифровой и интеллектуальный контур кооперативной модели,
            в которой активы, участники, прикладные модули, спрос и сценарии реализации могут
            быть собраны в новую архитектуру распределённого девелопмента.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {THESES.map((t, i) => {
            const accent = i % 2 === 0 ? "#00d4ff" : "#7b2fff";
            return (
              <div key={i} className="p-6 rounded-sm"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${accent}10`,
                      border: `1px solid ${accent}25`,
                    }}>
                    <Icon name={t.icon} size={17} style={{ color: accent, opacity: 0.75 }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-oswald text-white/85 text-lg font-medium mb-2 tracking-wide">
                      {t.title}
                    </h3>
                    <p className="font-ibm text-white/42 text-sm leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
