import Icon from "@/components/ui/icon";

const THESES = [
  { icon: "Wrench", text: "Внутренние службы уже работают как прототипы будущих функций системы" },
  { icon: "CheckCircle", text: "Прикладные задачи девелопмента могут решаться уже сейчас" },
  { icon: "BrainCircuit", text: "ИИ, методология и операторская верификация работают вместе" },
  { icon: "TrendingUp", text: "Каждая служба усиливает будущую систему реальной практикой" },
  { icon: "Rocket", text: "Проект развивается не на уровне обещаний, а через работу с задачами" },
];

export function WorkingContoursSection() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,14,26,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-35" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4">◆ Уже сейчас</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              От идеи<br /><span className="text-gradient-main">к рабочим контурам</span>
            </h2>
            <p className="font-ibm text-white/50 text-lg leading-relaxed">
              АО КСИ не ограничивается концепцией. Компания уже формирует прикладные контуры,
              через которые можно решать реальные задачи девелопмента, недвижимости
              и земельно-имущественной сферы.
            </p>
          </div>

          <div className="space-y-3">
            {THESES.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-sm"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: i % 2 === 0 ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)"}`,
                  }}>
                  <Icon name={item.icon} size={15}
                    style={{ color: i % 2 === 0 ? "#00d4ff" : "#7b2fff", opacity: 0.65 }} />
                </div>
                <p className="font-ibm text-white/48 text-sm leading-relaxed pt-1.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
