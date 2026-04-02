import Icon from "@/components/ui/icon";

/* ─── Facade Rhythm SVG ─────────────────────────────────────────────────────
   Визуализация иерархии группы как архитектурного фасадного ритма.
   Уровни = этажи. Ширина = масштаб влияния. Окна = подсистемы.
────────────────────────────────────────────────────────────────────────── */
function GroupArchitectureDiagram() {
  const levels = [
    {
      label: "АО КСИ",
      sublabel: "Головная структура · ЯДРО",
      color: "#00d4ff",
      width: 440,
      x: 10,
      y: 20,
      h: 54,
      windows: 8,
      primary: true,
    },
    {
      label: "КриптоМетры",
      sublabel: "Флагманский продукт",
      color: "#00d4ff",
      width: 360,
      x: 50,
      y: 84,
      h: 46,
      windows: 6,
      primary: false,
    },
    {
      label: "Технологические платформы",
      sublabel: "ИИ-лаб · ИИ-продакшн · Лицензирование",
      color: "#7b2fff",
      width: 300,
      x: 80,
      y: 140,
      h: 42,
      windows: 5,
      primary: false,
    },
    {
      label: "Аналитика и данные",
      sublabel: "LSS · Земельная аналитика · Медиацентр",
      color: "#7b2fff",
      width: 300,
      x: 80,
      y: 192,
      h: 42,
      windows: 5,
      primary: false,
    },
    {
      label: "Операционные сервисы",
      sublabel: "Fee-Dev · Управление недвижимостью",
      color: "#5599cc",
      width: 240,
      x: 110,
      y: 244,
      h: 40,
      windows: 4,
      primary: false,
    },
  ];

  return (
    <div className="relative w-full" style={{ height: 320 }}>
      <svg viewBox="0 0 460 310" className="w-full h-full" preserveAspectRatio="xMinYMid meet">
        <defs>
          <linearGradient id="agFill0" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="agFill1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="agFill2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7b2fff" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="agFill3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7b2fff" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="agFill4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5599cc" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#5599cc" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Земля / основание */}
        <rect x="0" y="288" width="460" height="6" fill="rgba(255,255,255,0.04)" />
        <line x1="0" y1="288" x2="460" y2="288" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <text x="5" y="300" fill="rgba(255,255,255,0.15)" fontSize="6" fontFamily="IBM Plex Mono" letterSpacing="1.5">ЗЕМЛЯ · ОСНОВАНИЕ · АКТИВЫ</text>

        {levels.map((lv, i) => (
          <g key={i}>
            {/* Коннектор к предыдущему уровню */}
            {i > 0 && (
              <line
                x1={lv.x + 16} y1={lv.y}
                x2={levels[i-1].x + 16} y2={levels[i-1].y + levels[i-1].h}
                stroke={lv.color} strokeWidth="0.6" strokeOpacity="0.3"
                strokeDasharray="3,3"
              />
            )}

            {/* Тело уровня */}
            <rect
              x={lv.x} y={lv.y}
              width={lv.width} height={lv.h}
              fill={`url(#agFill${i})`}
              stroke={lv.color}
              strokeWidth={lv.primary ? 1.2 : 0.7}
              strokeOpacity={lv.primary ? 0.6 : 0.35}
              rx="1"
            />

            {/* Фасадный ритм окон */}
            {Array.from({ length: lv.windows }).map((_, j) => {
              const ww = 18, wh = lv.h * 0.38;
              const gap = (lv.width - 32 - lv.windows * ww) / (lv.windows - 1);
              const wx = lv.x + 16 + j * (ww + gap);
              const wy = lv.y + lv.h * 0.25;
              return (
                <rect key={j}
                  x={wx} y={wy} width={ww} height={wh}
                  fill={lv.color}
                  fillOpacity={lv.primary ? 0.18 : 0.1}
                  stroke={lv.color}
                  strokeWidth="0.4"
                  strokeOpacity="0.4"
                  rx="0.5"
                />
              );
            })}

            {/* Лейбл — название уровня */}
            <text
              x={lv.x + 12} y={lv.y + 13}
              fill={lv.primary ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)"}
              fontSize={lv.primary ? 8.5 : 7}
              fontFamily="Oswald, sans-serif"
              fontWeight={lv.primary ? "600" : "400"}
              letterSpacing="1"
            >
              {lv.label}
            </text>
            <text
              x={lv.x + 12} y={lv.y + 22}
              fill={lv.color}
              fillOpacity="0.5"
              fontSize="5.5"
              fontFamily="IBM Plex Mono"
              letterSpacing="0.3"
            >
              {lv.sublabel}
            </text>

            {/* Линейка ширины (правый край) */}
            <line
              x1={lv.x + lv.width + 4} y1={lv.y}
              x2={lv.x + lv.width + 4} y2={lv.y + lv.h}
              stroke={lv.color} strokeWidth="0.5" strokeOpacity="0.2"
            />

            {/* ЯДРО-бейдж для первого уровня */}
            {lv.primary && (
              <g>
                <rect x={lv.x + lv.width - 38} y={lv.y + 6} width={30} height={12} rx="1"
                  fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="0.6" strokeOpacity="0.5" />
                <text x={lv.x + lv.width - 23} y={lv.y + 14.5}
                  textAnchor="middle" fill="#00d4ff" fontSize="6" fontFamily="IBM Plex Mono" letterSpacing="1">
                  ЯДРО
                </text>
              </g>
            )}
          </g>
        ))}

        {/* Вертикальная шкала глубины (левый край) */}
        <line x1="5" y1="20" x2="5" y2="284" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
        {levels.map((lv, i) => (
          <g key={`tick${i}`}>
            <line x1="2" y1={lv.y} x2="8" y2={lv.y}
              stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
            <text x="0" y={lv.y + 3.5} fill="rgba(255,255,255,0.18)" fontSize="4.5" fontFamily="IBM Plex Mono">
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Девелоперский фон — горизонтальные уровни вместо глобальной сетки */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="absolute left-0 right-0 h-px"
            style={{
              top: `${12 + i * 12}%`,
              background: `rgba(255,255,255,${i % 2 === 0 ? "0.022" : "0.01"})`,
            }} />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.08), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ── Левая колонка — текст ── */}
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

          {/* ── Правая колонка — архитектурная диаграмма ── */}
          <div>
            <div className="font-ibm text-white/20 text-xs tracking-[0.2em] uppercase mb-4">
              Структурная архитектура группы
            </div>
            <GroupArchitectureDiagram />
            <div className="mt-4 pt-4 flex items-start gap-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-2 h-2 rounded-full bg-ksi-cyan/40 mt-1 flex-shrink-0" />
              <p className="font-ibm text-white/28 text-xs leading-relaxed">
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
