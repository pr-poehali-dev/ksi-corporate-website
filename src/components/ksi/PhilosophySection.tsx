export function PhilosophySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-25" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4 text-center flex justify-center">◆ Замысел</div>
        <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight mb-8 text-center">
          Почему мы<br /><span className="text-gradient-main">делаем это</span>
        </h2>
        <div className="space-y-5">
          <p className="font-ibm text-white/50 text-base leading-relaxed">
            АО КСИ исходит из того, что следующий этап развития девелопмента связан
            не только с финансами, стройкой и продажами, но и с появлением интеллектуальных систем,
            способных усиливать профессиональный рынок, снижать хаос и собирать более точные решения.
          </p>
          <p className="font-ibm text-white/38 text-base leading-relaxed">
            Мы не пытаемся заменить людей алгоритмами.
            Мы строим инструмент, который делает профессионалов сильнее —
            через интеллектуальные контуры, методологию и операторский контроль.
          </p>
          <p className="font-ibm text-white/28 text-base leading-relaxed">
            Это долгий путь. Виртуальный девелопер не появится за ночь.
            Но каждая внутренняя служба, каждый решённый запрос, каждый обученный контур —
            это шаг к системе, которая однажды изменит способ работы с недвижимостью.
          </p>
        </div>
      </div>
    </section>
  );
}
