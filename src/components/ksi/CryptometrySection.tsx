import Icon from "@/components/ui/icon";

const POINTS = [
  { icon: "Target", text: "Стратегический вектор развития экосистемы" },
  { icon: "FlaskConical", text: "Поле применения и обучения интеллектуальной инфраструктуры" },
  { icon: "Puzzle", text: "Среда для объединения модулей в единую систему" },
  { icon: "ArrowRight", text: "Долгосрочный контур перехода от отдельных инструментов к целостной девелоперской модели" },
];

export function CryptometrySection() {
  return (
    <section id="cryptometry" className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,20,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(0,212,255,0.04), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Левая — визуальный блок */}
          <div>
            <div className="rounded-sm overflow-hidden relative" style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.03), rgba(0,212,255,0.01))",
              border: "1px solid rgba(0,212,255,0.1)",
              minHeight: 380,
            }}>
              {/* Схематичная визуализация — distributed development */}
              <div className="p-8 flex flex-col justify-between h-full" style={{ minHeight: 380 }}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                      <Icon name="Hexagon" size={24} className="text-ksi-cyan" />
                    </div>
                    <div>
                      <div className="font-oswald text-white text-xl font-medium">КриптоМетры</div>
                      <div className="font-mono-ibm text-ksi-cyan/40 text-[10px] tracking-wider">DISTRIBUTED DEVELOPMENT SYSTEM</div>
                    </div>
                  </div>

                  {/* Схема участников */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { icon: "MapPin", label: "Землевладельцы", sub: "Земельные активы" },
                      { icon: "Building2", label: "Девелоперы", sub: "Проектный контур" },
                      { icon: "Users", label: "Участники", sub: "Распределённая модель" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-sm text-center"
                        style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.08)" }}>
                        <Icon name={item.icon} size={18} className="text-ksi-cyan/60 mx-auto mb-2" />
                        <div className="font-ibm text-white/50 text-xs">{item.label}</div>
                        <div className="font-mono-ibm text-white/20 text-[8px] mt-0.5">{item.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Соединительная линия */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2))" }} />
                    <Icon name="ArrowDown" size={12} className="text-ksi-cyan/30" />
                    <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.2), transparent)" }} />
                  </div>

                  <div className="p-4 rounded-sm" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.08)" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="BrainCircuit" size={14} className="text-ksi-cyan/50" />
                      <span className="font-mono-ibm text-ksi-cyan/40 text-[9px] tracking-wider">ИНТЕЛЛЕКТУАЛЬНАЯ ИНФРАСТРУКТУРА</span>
                    </div>
                    <p className="font-ibm text-white/35 text-xs leading-relaxed">
                      Управление проектным циклом под контролем ИИ-систем АО КСИ
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-mono-ibm text-white/15 text-[9px] tracking-wider">ФЛАГМАНСКИЙ ПРОЕКТ</span>
                  <span className="font-mono-ibm text-ksi-cyan/30 text-[9px] tracking-wider">АО КСИ · 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Правая — текст */}
          <div>
            <div className="section-label mb-4">◆ Флагманский проект</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
              КриптоМетры —<br />
              <span className="text-gradient-cyan">флагманский проект</span><br />
              <span className="text-white/70 text-3xl md:text-4xl">экосистемы</span>
            </h2>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-10">
              КриптоМетры — система распределённого девелопмента, в рамках которой
              АО КСИ последовательно выстраивает собственную интеллектуальную инфраструктуру
              и тестирует модель будущего ИИ-управления проектным циклом.
            </p>

            <div className="space-y-4 mb-10">
              {POINTS.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ borderLeft: "2px solid rgba(0,212,255,0.3)" }}>
                    <Icon name={item.icon} size={14} className="text-ksi-cyan opacity-60" />
                  </div>
                  <p className="font-ibm text-white/50 text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <a href="/directions/cryptometry" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
              О проекте КриптоМетры
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
