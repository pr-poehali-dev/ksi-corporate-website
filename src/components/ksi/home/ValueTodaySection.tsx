import Icon from "@/components/ui/icon";

const VALUES = [
  {
    icon: "Map",
    title: "Земля",
    text: "Поиск, анализ и подготовка площадок под девелоперский сценарий внутри кооперативной модели.",
  },
  {
    icon: "Building2",
    title: "Активы",
    text: "Капитализация, упаковка и сопровождение вывода актива в переговорный и рыночный контур системы.",
  },
  {
    icon: "Layers",
    title: "Проектная упаковка",
    text: "Презентации, визуальные концепции, материалы к переговорам, проверка гипотез.",
  },
  {
    icon: "BrainCircuit",
    title: "ИИ-контуры",
    text: "Единый управляющий слой: нейронные модели и интеллектуальная логика связывают все элементы системы.",
  },
];

export function ValueTodaySection() {
  return (
    <section className="relative py-28 sm:py-36" style={{ background: "#06080d" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/45 mb-5">
            ◆ Что уже работает внутри кооперативной системы
          </p>
          <h2 className="font-oswald text-white font-semibold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Практическая ценность<br />уже сегодня
          </h2>
          <p className="font-ibm text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
            АО КСИ уже сейчас развивает прикладные контуры, которые дают рынку реальный результат
            и одновременно собираются в кооперативную систему распределённого девелопмента нового поколения.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => (
            <div key={v.title}
              className="relative group p-8 rounded-sm transition-all duration-500"
              style={{
                background: "linear-gradient(160deg, rgba(0,212,255,0.04) 0%, rgba(0,212,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.28)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-sm mb-6"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.18)" }}
              >
                <Icon name={v.icon} size={20} className="text-[#00d4ff]" />
              </div>
              <h3 className="font-oswald text-white text-2xl font-medium mb-3 tracking-wide">
                {v.title}
              </h3>
              <p className="font-ibm text-white/50 text-sm leading-relaxed">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
