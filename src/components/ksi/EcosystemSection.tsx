/* ─── Development Lifecycle Diagram ────────────────────────────────────────
   Визуализация операционного цикла как девелоперской диаграммы:
   участок → аналитика → структурирование → платформа → реализация → управление.
   Не SaaS flowchart, а site development lifecycle plate.
────────────────────────────────────────────────────────────────────────── */
function DevelopmentLifecycleDiagram() {
  const stages = [
    { num: "01", label: "Земельный актив", short: "Актив", color: "#00d4ff", bg: "rgba(0,212,255,0.12)" },
    { num: "02", label: "Аналитика", short: "Анализ", color: "#00aadd", bg: "rgba(0,170,221,0.1)" },
    { num: "03", label: "Структурирование", short: "Структура", color: "#5577ee", bg: "rgba(85,119,238,0.1)" },
    { num: "04", label: "Платформа", short: "Среда", color: "#7b2fff", bg: "rgba(123,47,255,0.12)" },
    { num: "05", label: "Реализация", short: "Стройка", color: "#9944dd", bg: "rgba(153,68,221,0.1)" },
    { num: "06", label: "Управление", short: "Эксплуатация", color: "rgba(255,255,255,0.5)", bg: "rgba(255,255,255,0.05)" },
  ];

  const W = 520, H = 280;
  const stageW = 72, stageH = 180;
  const startX = 10, gap = 14;

  return (
    <div className="w-full overflow-x-auto" style={{ minWidth: 340 }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }} preserveAspectRatio="xMinYMid meet">
        <defs>
          <linearGradient id="lcGround" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#7b2fff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="lcArrow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7b2fff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Полоса земли / основание */}
        <rect x={startX} y={H - 22} width={W - 20} height={8}
          fill="url(#lcGround)" rx="1" />
        <text x={startX + 4} y={H - 8}
          fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="IBM Plex Mono" letterSpacing="1.5">
          ЗЕМЕЛЬНЫЙ КОНТУР · ДЕВЕЛОПЕРСКИЙ ЦИКЛ · АО КСИ
        </text>

        {/* Стрелка-поток над колонками */}
        <defs>
          <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(123,47,255,0.4)" />
          </marker>
        </defs>
        <line
          x1={startX + stageW * 0.5} y1={14}
          x2={startX + (stageW + gap) * 5 + stageW * 0.5} y2={14}
          stroke="url(#lcArrow)" strokeWidth="1" strokeDasharray="4,3"
          markerEnd="url(#arrowHead)"
        />
        <text x={(W - 20) / 2} y={11}
          textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="5.5" fontFamily="IBM Plex Mono">
          операционный цикл
        </text>

        {stages.map((s, i) => {
          const x = startX + i * (stageW + gap);
          // Высота колонки убывает слева направо — визуально показывает рост/стадийность
          const colH = stageH - i * 8;
          const colY = H - 22 - colH;

          return (
            <g key={i}>
              {/* Тело стадии — как строительная колонна */}
              <rect x={x} y={colY} width={stageW} height={colH}
                fill={s.bg}
                stroke={s.color} strokeWidth={i === 0 ? 1.2 : 0.7} strokeOpacity={i === 0 ? 0.65 : 0.4}
                rx="1"
              />

              {/* Штриховка внутри (имитация плана) */}
              {Array.from({ length: Math.floor(colH / 18) }).map((_, j) => (
                <line key={`hl${i}_${j}`}
                  x1={x + 6} y1={colY + 24 + j * 18}
                  x2={x + stageW - 6} y2={colY + 24 + j * 18}
                  stroke={s.color} strokeWidth="0.4" strokeOpacity="0.15"
                />
              ))}

              {/* Крыша / навершие */}
              <rect x={x - 2} y={colY - 4} width={stageW + 4} height={6}
                fill={s.color} fillOpacity="0.2"
                stroke={s.color} strokeWidth="0.7" strokeOpacity="0.5"
                rx="0.5"
              />

              {/* Номер */}
              <text x={x + stageW / 2} y={colY + 15}
                textAnchor="middle"
                fill={s.color} fillOpacity="0.8"
                fontSize="7" fontFamily="IBM Plex Mono" fontWeight="bold">
                {s.num}
              </text>

              {/* Короткое название */}
              <text x={x + stageW / 2} y={colY + colH - 12}
                textAnchor="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="6" fontFamily="IBM Plex Sans" letterSpacing="0.3">
                {s.short}
              </text>

              {/* Полное название под колонкой */}
              <text x={x + stageW / 2} y={H - 26}
                textAnchor="middle"
                fill={s.color} fillOpacity="0.55"
                fontSize="5.5" fontFamily="IBM Plex Mono">
                {s.label}
              </text>
            </g>
          );
        })}

        {/* Центральная точка управления — АО КСИ над всем */}
        <circle cx={startX + (stageW + gap) * 2 + stageW * 0.5} cy={24}
          r="5" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5">
          <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={startX + (stageW + gap) * 2 + stageW * 0.5} cy={24}
          r="2" fill="#00d4ff" fillOpacity="0.9" />
        <text x={startX + (stageW + gap) * 2 + stageW * 0.5 + 10} y={28}
          fill="rgba(0,212,255,0.5)" fontSize="5.5" fontFamily="IBM Plex Mono">
          АО КСИ
        </text>
      </svg>
    </div>
  );
}

export function EcosystemSection() {
  const platforms = [
    { node: "КриптоМетры", role: "Флагманская система распределённого девелопмента", color: "cyan", href: "/directions/cryptometry" },
    { node: "Лаборатория ИИ", role: "ИИ-инструменты для анализа активов и рынка", color: "purple", href: "/directions/ai-lab" },
    { node: "LSS", role: "Аналитический поиск земельных активов", color: "purple", href: "/directions/lss" },
    { node: "Земельная аналитика", role: "Data-продукты и картографические решения", color: "cyan", href: "/directions/land-data" },
    { node: "Fee-Dev Оператор", role: "Среда для профессиональных девелоперов", color: "purple", href: "/directions/fee-dev" },
    { node: "Медиа & Аналитика", role: "Исследования и интеллектуальное сопровождение", color: "cyan", href: "/media" },
  ];

  return (
    <section id="ecosystem" className="py-28 relative overflow-hidden">
      {/* Горизонтальные линии — строительные отметки */}
      <div className="absolute inset-0 pointer-events-none">
        {[15, 30, 45, 60, 75, 90].map(pct => (
          <div key={pct} className="absolute left-0 right-0 h-px"
            style={{ top: `${pct}%`, background: "rgba(255,255,255,0.018)" }} />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(123,47,255,0.15), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Шапка секции ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label mb-4">◆ Как работает модель</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight">
              От земельного актива<br />
              <span className="text-gradient-purple">до реализации и управления</span>
            </h2>
          </div>
          <p className="font-ibm text-white/45 text-base leading-relaxed max-w-sm">
            АО КСИ координирует полный девелоперский цикл — от обнаружения актива
            до постдевелоперского сопровождения.
          </p>
        </div>

        {/* ── Lifecycle диаграмма ── */}
        <div className="mb-16 p-6 rounded-sm"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
          <DevelopmentLifecycleDiagram />
        </div>

        {/* ── Описание + платформы ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-8">
              Каждый этап цикла обеспечен инструментом группы.
              Инфраструктура АО КСИ работает сквозно — от земли до управления объектом.
              Не точечные сервисы, а единая операционная среда.
            </p>
            <a href="/ecosystem" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
              Архитектура экосистемы →
            </a>
          </div>

          {/* Платформы по оси */}
          <div>
            <div className="font-ibm text-white/20 text-xs tracking-[0.18em] uppercase mb-4">
              Инструменты группы
            </div>
            <div className="space-y-0">
              {platforms.map((item, i) => (
                <a key={i} href={item.href}
                  className="flex items-center gap-4 py-3 group transition-all"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Порядковый номер в стиле стадии */}
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `1px solid ${item.color === "cyan" ? "rgba(0,212,255,0.3)" : "rgba(123,47,255,0.3)"}`,
                      borderRadius: "2px",
                    }}>
                    <span className="font-ibm text-[9px]"
                      style={{ color: item.color === "cyan" ? "rgba(0,212,255,0.6)" : "rgba(123,47,255,0.6)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-oswald text-white/70 text-sm font-medium w-36 flex-shrink-0 group-hover:text-ksi-cyan transition-colors">
                    {item.node}
                  </span>
                  <span className="font-ibm text-white/28 text-xs">{item.role}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
