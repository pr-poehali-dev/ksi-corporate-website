import Icon from "@/components/ui/icon";

const ISOMETRIC_BG = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/files/58a3bc6a-4e23-4813-a8ca-97ebbd7301a9.jpg";

const HIERARCHY = [
  { level: "01", title: "АО КСИ", role: "Головная структура", color: "#00d4ff" },
  { level: "02", title: "КриптоМетры", role: "Флагманский продукт", color: "#00d4ff" },
  { level: "03", title: "Технологические платформы", role: "ИИ-лаб · ИИ-продакшн · Лицензирование", color: "#7b2fff" },
  { level: "04", title: "Аналитика и данные", role: "LSS · Земельная аналитика · Медиацентр", color: "#7b2fff" },
  { level: "05", title: "Операционные сервисы", role: "Fee-Dev · Управление недвижимостью", color: "#5599cc" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-start">

          {/* Левая колонка — текст */}
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
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{ borderLeft: "2px solid rgba(0,212,255,0.3)" }}>
                    <Icon name={item.icon} size={15} className="text-ksi-cyan opacity-70" />
                  </div>
                  <p className="font-ibm text-white/58 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <a href="/about" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm inline-block cursor-pointer">
              Подробнее о компании →
            </a>
          </div>

          {/* Правая колонка — architectural visual + иерархия */}
          <div>
            {/* Фоновый ассет — изометрия девелопмента */}
            <div className="relative rounded-sm overflow-hidden mb-6" style={{ height: 240 }}>
              <img
                src={ISOMETRIC_BG}
                alt="Архитектурная визуализация"
                className="w-full h-full object-cover"
                style={{ opacity: 0.65 }}
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.7) 100%)",
              }} />
              <div className="absolute bottom-4 left-5">
                <div className="font-ibm text-white/25 text-[10px] tracking-widest uppercase">Архитектура девелоперской группы</div>
              </div>
            </div>

            {/* Иерархия — строгая таблица */}
            <div className="overflow-hidden rounded-sm" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              {HIERARCHY.map((item, i) => (
                <div key={i} className="flex items-stretch"
                  style={{ borderBottom: i < HIERARCHY.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="w-0.5 flex-shrink-0" style={{ background: item.color, opacity: 0.5 }} />
                  <div className="flex items-center px-3 flex-shrink-0 w-10" style={{ background: "rgba(255,255,255,0.015)" }}>
                    <span className="font-ibm text-[9px]" style={{ color: item.color, opacity: 0.6 }}>{item.level}</span>
                  </div>
                  <div className="flex-1 py-3 px-4 flex items-center justify-between gap-4" style={{ paddingLeft: 8 + i * 12 }}>
                    <span className="font-oswald text-white/80 text-sm font-medium">{item.title}</span>
                    <span className="font-ibm text-white/30 text-[11px] text-right hidden sm:block">{item.role}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-3 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/15 mt-1.5 flex-shrink-0" />
              <p className="font-ibm text-white/25 text-xs leading-relaxed">
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
