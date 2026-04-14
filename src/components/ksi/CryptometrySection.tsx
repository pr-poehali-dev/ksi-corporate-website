import Icon from "@/components/ui/icon";

const FACETS = [
  { icon: "Target", title: "Стратегический проект", desc: "Единственный проект АО КСИ и центральная система, через которую решаются задачи девелопмента." },
  { icon: "LayoutGrid", title: "Пространство управления", desc: "Среда управления задачами, активами, компетенциями и прикладными контурами в единой логике." },
  { icon: "BrainCircuit", title: "Интеллектуальная среда", desc: "Среда будущего интеллектуального девелопмента, где ИИ-инструменты работают как единый контур." },
  { icon: "Puzzle", title: "Точка сборки", desc: "Пространство, объединяющее внутренние службы АО КСИ и прикладные контуры в целостную систему." },
];

export function CryptometrySection() {
  return (
    <section id="cryptometry" className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,22,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,212,255,0.04), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="section-label mb-4 justify-center flex">◆ Единственный проект АО КСИ</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            КриптоМетры —<br />
            <span className="text-gradient-cyan">интеллектуальная система</span><br />
            <span className="text-white/80">распределённого девелопмента</span>
          </h2>
          <p className="font-ibm text-white/50 text-lg leading-relaxed max-w-3xl mx-auto">
            КриптоМетры — единственный проект АО КСИ и центральная система,
            через которую в перспективе решаются задачи девелопмента, недвижимости
            и земельно-имущественного контура.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {FACETS.map((item, i) => (
            <div key={i} className="p-6 rounded-sm transition-all duration-300"
              style={{
                background: "rgba(0,212,255,0.02)",
                border: "1px solid rgba(0,212,255,0.08)",
              }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 rounded-sm flex items-center justify-center"
                  style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <Icon name={item.icon} size={20} className="text-ksi-cyan opacity-70" />
                </div>
                <h3 className="font-oswald text-white/80 text-lg font-medium">{item.title}</h3>
              </div>
              <p className="font-ibm text-white/40 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-sm text-center" style={{
          background: "rgba(0,212,255,0.02)",
          borderLeft: "3px solid rgba(0,212,255,0.25)",
        }}>
          <p className="font-ibm text-white/40 text-base leading-relaxed max-w-2xl mx-auto">
            КриптоМетры — не личный кабинет, не кошелёк и не токенизированная оболочка.
            Это интеллектуальная система, через которую АО КСИ выстраивает единый контур
            решения девелоперских задач.
          </p>
        </div>

        <div className="mt-10 text-center">
          <a href="/cryptometry" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
            Подробнее о КриптоМетрах
          </a>
        </div>
      </div>
    </section>
  );
}
