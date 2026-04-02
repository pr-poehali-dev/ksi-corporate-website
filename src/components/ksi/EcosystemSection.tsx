export function EcosystemSection() {
  const steps = [
    {
      num: "01",
      label: "Земельный актив",
      desc: "Поиск, проверка, предварительная структуризация через LSS и Земельную аналитику",
      color: "#00d4ff",
      icon: "◈",
    },
    {
      num: "02",
      label: "Аналитика и due diligence",
      desc: "ИИ-анализ потенциала, кадастровые и градостроительные данные, рыночный контекст",
      color: "rgba(0,212,255,0.6)",
      icon: "◉",
    },
    {
      num: "03",
      label: "Структурирование",
      desc: "Правовая архитектура участия, модели вовлечения, роли сторон, документальное сопровождение",
      color: "#7b2fff",
      icon: "◈",
    },
    {
      num: "04",
      label: "Платформа КриптоМетры",
      desc: "Операционная среда: землевладелец, девелопер, участники — единая управляемая структура",
      color: "#7b2fff",
      icon: "◉",
    },
    {
      num: "05",
      label: "Реализация через Fee-Dev",
      desc: "Оператор среды: упаковка, подключение подрядчиков, контроль экономики проекта",
      color: "rgba(123,47,255,0.6)",
      icon: "◈",
    },
    {
      num: "06",
      label: "Управление и сопровождение",
      desc: "Постдевелоперское управление, доходные модели, медийное и аналитическое сопровождение",
      color: "rgba(255,255,255,0.35)",
      icon: "◉",
    },
  ];

  return (
    <section id="ecosystem" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(123,47,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="section-label mb-6">◆ Как работает модель</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              От актива<br />
              <span className="text-gradient-purple">до реализации</span>
            </h2>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-10">
              АО КСИ — ядро экосистемы. Координирует весь цикл: от обнаружения земельного актива
              до его операционной реализации и постдевелоперского сопровождения.
              Каждый этап обеспечен инструментами группы.
            </p>

            {/* Platform links */}
            <div className="space-y-2">
              {[
                { node: "КриптоМетры", role: "Флагманская система распределённого девелопмента", color: "cyan", href: "/directions/cryptometry" },
                { node: "Лаборатория ИИ", role: "ИИ-инструменты для анализа активов и рынка", color: "purple", href: "/directions/ai-lab" },
                { node: "LSS", role: "Аналитический поиск земельных активов", color: "purple", href: "/directions/lss" },
                { node: "Земельная аналитика", role: "Data-продукты и картографические решения", color: "cyan", href: "/directions/land-data" },
                { node: "Fee-Dev Оператор", role: "Среда для профессиональных девелоперов", color: "purple", href: "/directions/fee-dev" },
                { node: "Медиа & Аналитика", role: "Исследования и интеллектуальное сопровождение", color: "cyan", href: "/media" },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-4 py-2 border-b group transition-all" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                  <span className="font-oswald text-white/70 text-sm font-medium w-36 flex-shrink-0 group-hover:text-ksi-cyan transition-colors">{item.node}</span>
                  <span className="font-ibm text-white/30 text-xs">{item.role}</span>
                </a>
              ))}
            </div>

            <a href="/ecosystem" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer mt-8">
              Архитектура экосистемы
            </a>
          </div>

          {/* Process flow diagram */}
          <div className="relative">
            <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-6">Операционный цикл группы</div>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="relative flex gap-5">
                  {/* Connector line */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 z-10"
                      style={{ background: `${step.color}14`, border: `1px solid ${step.color}40` }}>
                      <span className="font-mono-ibm text-xs" style={{ color: step.color }}>{step.num}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 my-1" style={{ background: `linear-gradient(to bottom, ${step.color}50, ${steps[i+1].color}30)`, minHeight: 20 }} />
                    )}
                  </div>
                  <div className="pb-5 flex-1">
                    <div className="font-oswald text-white font-medium text-sm mb-1">{step.label}</div>
                    <p className="font-ibm text-white/40 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom label */}
            <div className="mt-4 pt-4 flex items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <span className="text-ksi-cyan text-xs">АО</span>
              </div>
              <span className="font-ibm text-white/35 text-xs">АО КСИ координирует каждый этап цикла</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
