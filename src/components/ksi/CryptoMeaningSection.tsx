import Icon from "@/components/ui/icon";

const MEANINGS = [
  {
    icon: "Lock",
    title: "Криптография",
    desc: "Защищённая цифровая среда для данных, документов и коммуникаций между участниками проектов.",
  },
  {
    icon: "Eye",
    title: "Прозрачность",
    desc: "Фиксация действий, решений и результатов так, чтобы процесс был понятен всем участникам.",
  },
  {
    icon: "Database",
    title: "Защищённая запись",
    desc: "Неизменяемость подтверждённых данных и проектных фактов — основа доверия в распределённой модели.",
  },
];

export function CryptoMeaningSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,24,1), rgba(10,10,15,1))" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="section-label mb-4">◆ Что значит «Крипто» в КСИ</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Это про криптографию.<br />
            <span className="text-gradient-main">Не про биржевую спекуляцию.</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed">
            «Крипто» в модели КСИ — это отсылка к криптографии, защищённой цифровой среде
            и неизменяемости записей. Это не про волатильные токены и не про спекулятивный рынок.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {MEANINGS.map((m, i) => (
            <div
              key={i}
              className="p-7 rounded-sm"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center mb-5"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.22)" }}
              >
                <Icon name={m.icon} size={20} className="text-ksi-cyan" />
              </div>
              <h3 className="font-oswald text-white text-lg font-medium mb-3">{m.title}</h3>
              <p className="font-ibm text-white/50 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        <div
          className="p-6 rounded-sm flex flex-col sm:flex-row items-start gap-4"
          style={{ background: "rgba(123,47,255,0.04)", border: "1px solid rgba(123,47,255,0.2)" }}
        >
          <Icon name="Info" size={22} style={{ color: "#a070ff" }} className="flex-shrink-0 mt-[2px]" />
          <p className="font-ibm text-white/60 text-base leading-relaxed">
            <span className="text-white/85 font-medium">Для ясности:</span> АО КСИ не выпускает и не торгует криптовалютами.
            Мы строим защищённую цифровую среду для девелоперов, инвесторов и землевладельцев —
            с понятной архитектурой данных и прозрачной фиксацией решений.
          </p>
        </div>
      </div>
    </section>
  );
}
