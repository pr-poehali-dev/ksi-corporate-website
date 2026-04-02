import Icon from "@/components/ui/icon";

export function AboutSection() {
  const hierarchy = [
    {
      level: "01",
      title: "АО КСИ",
      role: "Головная структура",
      desc: "Управляющая и технологическая надстройка. Формирует стратегию, управляет инфраструктурой, координирует направления.",
      color: "cyan",
    },
    {
      level: "02",
      title: "КриптоМетры",
      role: "Флагманский продукт",
      desc: "Операционная среда распределённого девелопмента. Центральная платформа группы.",
      color: "cyan",
    },
    {
      level: "03",
      title: "Технологические платформы",
      role: "ИИ-лаб · ИИ-продакшн · Лицензирование",
      desc: "Инфраструктура ИИ, цифровых медиапродуктов и передачи технологий партнёрам.",
      color: "purple",
    },
    {
      level: "04",
      title: "Аналитика и данные",
      role: "LSS · Земельная аналитика · Медиацентр",
      desc: "Data-продукты, земельный поиск, аналитические базы и интеллектуальное сопровождение.",
      color: "purple",
    },
    {
      level: "05",
      title: "Операционные сервисы",
      role: "Fee-Dev · Управление недвижимостью",
      desc: "Девелоперский оператор, управление объектами и постдевелоперское сопровождение.",
      color: "cyan",
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,212,255,0.3) 39px, rgba(0,212,255,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,212,255,0.3) 39px, rgba(0,212,255,0.3) 40px)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="section-label mb-6">◆ Роль АО КСИ в экосистеме</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-8">
              Не строительная компания.<br />
              <span className="text-gradient-cyan">Не фонд. Не стартап.</span>
            </h2>
            <p className="font-ibm text-white/65 text-lg leading-relaxed mb-6">
              АО «КриптоСтройИнвест» — головная управляющая структура многопрофильной группы.
              Оператор цифровой девелоперской инфраструктуры, объединяющей рынок недвижимости,
              технологические платформы и профессиональную экспертизу.
            </p>
            <p className="font-ibm text-white/45 text-base leading-relaxed mb-10">
              АО КСИ формирует среду, в которой работают землевладельцы, девелоперы,
              аналитические системы, ИИ-инструменты и профессиональные операторы.
              Горизонт — долгий цикл. Модель — системная. Ценность — в инфраструктуре
              и компетенциях, которые накапливаются.
            </p>

            <div className="space-y-3 mb-10">
              {[
                { icon: "Layers", text: "Головная структура мультинаправленной группы" },
                { icon: "Globe", text: "Оператор цифровой девелоперской инфраструктуры" },
                { icon: "BrainCircuit", text: "ИИ-компетенции, земельная аналитика, data-продукты" },
                { icon: "Scale", text: "Структурирование сложных партнёрских механизмов" },
                { icon: "Shield", text: "Правовая корректность и прозрачность структур" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    <Icon name={item.icon} size={16} className="text-ksi-cyan" />
                  </div>
                  <p className="font-ibm text-white/60 text-sm leading-relaxed pt-2">{item.text}</p>
                </div>
              ))}
            </div>

            <a href="/about" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm inline-block cursor-pointer">
              Подробнее о компании →
            </a>
          </div>

          {/* Layered hierarchy diagram */}
          <div className="relative">
            <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-6">Архитектура группы</div>

            {/* SVG layered stack */}
            <div className="relative">
              {hierarchy.map((item, i) => {
                const widths = ["100%", "92%", "84%", "84%", "76%"];
                const indents = [0, 16, 32, 32, 48];
                const isCyan = item.color === "cyan";
                const borderCol = isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.15)";
                const accentCol = isCyan ? "rgba(0,212,255,0.5)" : "rgba(123,47,255,0.5)";
                const bgCol = isCyan ? "rgba(0,212,255,0.04)" : "rgba(123,47,255,0.03)";
                return (
                  <div key={i} style={{ marginLeft: indents[i], marginBottom: i < 4 ? 0 : 0, position: "relative" }}>
                    {/* Connector line from previous */}
                    {i > 0 && (
                      <div style={{
                        position: "absolute",
                        left: -indents[i] + indents[i - 1] + 16,
                        top: -16,
                        width: 1,
                        height: 20,
                        background: `linear-gradient(to bottom, ${hierarchy[i-1].color === "cyan" ? "rgba(0,212,255,0.3)" : "rgba(123,47,255,0.25)"}, ${borderCol})`,
                      }} />
                    )}
                    <div
                      className="flex items-center gap-4 px-5 py-3.5 mb-2"
                      style={{
                        background: bgCol,
                        border: `1px solid ${borderCol}`,
                        borderRadius: "2px",
                        width: widths[i],
                      }}
                    >
                      <div className="font-mono-ibm text-xs flex-shrink-0 w-6" style={{ color: accentCol }}>{item.level}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-oswald text-white text-sm font-medium">{item.title}</span>
                          {i === 0 && (
                            <span className="font-mono-ibm text-[9px] px-1.5 py-0.5 rounded-sm" style={{ color: "#00d4ff", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}>ЯДРО</span>
                          )}
                        </div>
                        <div className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.role}</div>
                      </div>
                      {/* Width indicator bar */}
                      <div className="flex-shrink-0 hidden sm:block" style={{ width: 32, height: 2, background: borderCol, borderRadius: 1 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-sm mt-4" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">ПРАВОВАЯ ОГОВОРКА</div>
              <p className="font-ibm text-white/30 text-xs leading-relaxed">
                Компания не осуществляет публичного привлечения денежных средств.
                Отдельные модели участия реализуются в рамках специальных юридических
                конструкций и партнёрских механизмов, формируемых индивидуально.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
