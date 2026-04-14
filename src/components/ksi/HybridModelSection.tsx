import Icon from "@/components/ui/icon";

const STEPS = [
  { num: "01", icon: "ClipboardList", title: "Постановка задачи", desc: "Заказчик формулирует задачу в терминах своего бизнеса. Система переводит запрос в интеллектуальный контур.", color: "#00d4ff" },
  { num: "02", icon: "BrainCircuit", title: "Интеллектуальная обработка", desc: "Задача проходит через ИИ-инструменты и собственную методологию АО КСИ. Формируется набор предварительных результатов.", color: "#7b2fff" },
  { num: "03", icon: "UserCheck", title: "Внутренняя верификация", desc: "Специалисты внутренних служб отбирают, корректируют и доводят результат до прикладного уровня.", color: "#7b2fff" },
  { num: "04", icon: "CheckCircle", title: "Прикладной результат", desc: "Заказчик получает не поток сырых генераций, а отобранное и проверенное решение, прошедшее через контур системы.", color: "#00d4ff" },
];

export function HybridModelSection() {
  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(15,15,28,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-start">
          <div>
            <div className="section-label mb-4">◆ Модель исполнения</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Гибридная модель<br />
              <span className="text-gradient-main">интеллектуального</span><br />
              <span className="text-white/70 text-3xl md:text-4xl">производства</span>
            </h2>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-6">
              АО КСИ строит гибридную модель интеллектуального производства, в которой
              передовые ИИ-технологии, внутренняя методология и профессиональная операторская
              верификация объединяются в единый прикладной результат.
            </p>
            <div className="p-5 rounded-sm mb-8" style={{
              background: "rgba(0,212,255,0.03)",
              borderLeft: "2px solid rgba(0,212,255,0.3)",
            }}>
              <p className="font-ibm text-white/42 text-base leading-relaxed">
                Заказчик получает не поток сырых данных и генераций, а отобранное, проверенное
                и доведённое решение, прошедшее через интеллектуальный контур системы.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: "Cpu", text: "ИИ-технологии" },
                { icon: "FileText", text: "Внутренняя методология" },
                { icon: "Shield", text: "Операторская верификация" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Icon name={item.icon} size={14} className="text-ksi-cyan opacity-55" />
                  <span className="font-ibm text-white/40 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {STEPS.map((step, i) => (
              <div key={i}>
                <div className="flex items-start gap-5 p-5 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                    style={{ background: `${step.color}10`, border: `1px solid ${step.color}18` }}>
                    <Icon name={step.icon} size={20} style={{ color: step.color, opacity: 0.7 }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono-ibm text-[9px]" style={{ color: step.color, opacity: 0.5 }}>{step.num}</span>
                      <h4 className="font-oswald text-white/85 text-lg font-medium">{step.title}</h4>
                    </div>
                    <p className="font-ibm text-white/38 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4" style={{ background: `linear-gradient(to bottom, ${step.color}28, ${STEPS[i + 1].color}28)` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
