import Icon from "@/components/ui/icon";

const STEPS = [
  { num: "01", icon: "ClipboardList", title: "Запрос", color: "#00d4ff" },
  { num: "02", icon: "BrainCircuit", title: "Интеллектуальная обработка", color: "#7b2fff" },
  { num: "03", icon: "UserCheck", title: "Внутренняя верификация", color: "#7b2fff" },
  { num: "04", icon: "CheckCircle", title: "Финальный результат", color: "#00d4ff" },
];

export function HybridModelSection() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(15,15,28,1), rgba(10,10,15,1))" }}>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4">◆ Модель работы</div>
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight mb-5">
              Гибридная модель<br />
              <span className="text-gradient-main">интеллектуального производства</span>
            </h2>
            <p className="font-ibm text-white/50 text-base leading-relaxed mb-4">
              АО КСИ строит модель, в которой передовые ИИ-технологии, внутренняя методология
              и профессиональная операторская верификация объединяются в единый прикладной результат.
            </p>
            <p className="font-ibm text-white/32 text-sm leading-relaxed">
              Заказчик получает не поток сырых генераций, а собранное, проверенное и доведённое решение.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-sm flex items-center justify-center"
                    style={{ background: `${step.color}10`, border: `1px solid ${step.color}20` }}>
                    <Icon name={step.icon} size={22} style={{ color: step.color, opacity: 0.7 }} />
                  </div>
                  <span className="font-mono-ibm text-[8px] tracking-wider text-center" style={{ color: step.color, opacity: 0.5 }}>
                    {step.num}
                  </span>
                  <span className="font-ibm text-white/40 text-[11px] text-center leading-tight max-w-[90px]">
                    {step.title}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-6 h-px mt-[-24px]" style={{ background: `linear-gradient(90deg, ${step.color}30, ${STEPS[i+1].color}30)` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
