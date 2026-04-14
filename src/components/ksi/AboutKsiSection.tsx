import Icon from "@/components/ui/icon";

const THESES = [
  { icon: "Building", text: "Управляющая компания проекта КриптоМетры" },
  { icon: "Layers", text: "Единый контур управления проектом, службами и инфраструктурой" },
  { icon: "Users", text: "Внутренние профессиональные службы, а не набор внешних сервисов" },
  { icon: "BrainCircuit", text: "Интеллектуальная инфраструктура как основа работы системы" },
  { icon: "Clock", text: "Долгий цикл и накопление компетенций" },
];

export function AboutKsiSection() {
  return (
    <section id="about-ksi" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-start">
          <div>
            <div className="section-label mb-4">◆ Управляющая компания</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              АО КСИ —<br />
              <span className="text-gradient-main">управляющий контур</span><br />
              <span className="text-white/70 text-3xl md:text-4xl">проекта</span>
            </h2>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-10">
              АО КСИ не выступает как набор отдельных сервисов. Компания управляет проектом
              КриптоМетры, внутренними службами и интеллектуальной инфраструктурой, необходимыми
              для решения девелоперских задач через единую систему.
            </p>

            <div className="space-y-4">
              {THESES.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ borderLeft: "2px solid rgba(0,212,255,0.3)" }}>
                    <Icon name={item.icon} size={15} className="text-ksi-cyan opacity-65" />
                  </div>
                  <p className="font-ibm text-white/50 text-base leading-relaxed pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-sm overflow-hidden" style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div className="p-6 pb-4">
                <div className="font-mono-ibm text-white/20 text-[10px] tracking-[0.2em] uppercase mb-5">
                  Структура управления
                </div>
                {/* Визуальная иерархия */}
                <div className="space-y-3">
                  <div className="p-4 rounded-sm" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}>
                    <div className="flex items-center gap-3">
                      <Icon name="Building" size={18} className="text-ksi-cyan opacity-80" />
                      <div>
                        <div className="font-oswald text-white/85 text-lg font-medium">АО КСИ</div>
                        <div className="font-mono-ibm text-ksi-cyan/40 text-[9px] tracking-wider">УПРАВЛЯЮЩАЯ КОМПАНИЯ</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.1)" }} />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: "BrainCircuit", name: "Лаборатория ИИ" },
                      { icon: "TrendingUp", name: "Центр реализации" },
                      { icon: "Search", name: "Служба зем. поиска" },
                      { icon: "Palette", name: "Студия креатива" },
                    ].map((s, i) => (
                      <div key={i} className="p-3 rounded-sm" style={{ background: "rgba(123,47,255,0.04)", border: "1px solid rgba(123,47,255,0.1)" }}>
                        <Icon name={s.icon} size={14} className="text-ksi-purple/60 mb-1.5" />
                        <div className="font-ibm text-white/45 text-xs">{s.name}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.1)" }} />
                  </div>

                  <div className="p-4 rounded-sm" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}>
                    <div className="flex items-center gap-3">
                      <Icon name="Hexagon" size={18} className="text-ksi-cyan opacity-70" />
                      <div>
                        <div className="font-oswald text-white/75 text-base font-medium">КриптоМетры</div>
                        <div className="font-mono-ibm text-ksi-cyan/30 text-[9px] tracking-wider">ЕДИНСТВЕННЫЙ ПРОЕКТ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)" }}>
                <p className="font-ibm text-white/22 text-xs leading-relaxed">
                  Все внутренние службы подчинены одной задаче — обеспечению работы
                  интеллектуальной системы КриптоМетры.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
