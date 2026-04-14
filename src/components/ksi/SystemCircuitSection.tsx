import Icon from "@/components/ui/icon";

const STEPS = [
  { num: "01", icon: "ClipboardList", title: "Клиент ставит задачу", desc: "Запрос формулируется в терминах бизнеса заказчика и поступает в систему КриптоМетры.", color: "#00d4ff" },
  { num: "02", icon: "Cpu", title: "Система определяет компетенцию", desc: "Интеллектуальный контур анализирует задачу и определяет, какие внутренние службы необходимо подключить.", color: "#7b2fff" },
  { num: "03", icon: "Users", title: "Подключаются внутренние службы", desc: "Лаборатория ИИ, Центр реализации активов, Служба земельного поиска или Студия проектного креатива обеспечивают выполнение.", color: "#7b2fff" },
  { num: "04", icon: "ScanSearch", title: "Формируется и верифицируется результат", desc: "Результат проходит внутреннюю верификацию — проверку, отбор и доведение до прикладного уровня.", color: "#00d4ff" },
  { num: "05", icon: "CheckCircle", title: "Клиент получает прикладное решение", desc: "Заказчик получает не поток сырых данных, а конкретный, проверенный и готовый к применению результат.", color: "#00d4ff" },
];

export function SystemCircuitSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-start">
          <div>
            <div className="section-label mb-4">◆ Как устроена система</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Как работает контур<br />
              <span className="text-gradient-main">КриптоМетров</span>
            </h2>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-8">
              Клиент взаимодействует с системой как с единым интеллектуальным контуром,
              а внутренние службы АО КСИ обеспечивают выполнение, проверку и доведение результата.
            </p>

            <div className="p-5 rounded-sm" style={{
              background: "rgba(0,212,255,0.02)",
              borderLeft: "2px solid rgba(0,212,255,0.25)",
            }}>
              <p className="font-ibm text-white/40 text-sm leading-relaxed">
                Клиент не выбирает, в какую службу обратиться. Система сама определяет
                нужную компетенцию, подключает внутренние контуры и формирует единый результат.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {STEPS.map((step, i) => (
              <div key={i}>
                <div className="flex items-start gap-5 p-5 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex-shrink-0 w-11 h-11 rounded-sm flex items-center justify-center"
                    style={{ background: `${step.color}10`, border: `1px solid ${step.color}18` }}>
                    <Icon name={step.icon} size={18} style={{ color: step.color, opacity: 0.7 }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="font-mono-ibm text-[9px]" style={{ color: step.color, opacity: 0.5 }}>{step.num}</span>
                      <h4 className="font-oswald text-white/80 text-base font-medium">{step.title}</h4>
                    </div>
                    <p className="font-ibm text-white/35 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div className="w-px h-3" style={{ background: `linear-gradient(to bottom, ${step.color}25, ${STEPS[i + 1].color}25)` }} />
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
