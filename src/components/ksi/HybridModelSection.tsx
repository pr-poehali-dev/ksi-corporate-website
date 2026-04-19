import Icon from "@/components/ui/icon";

const AI_TASKS = [
  "Анализирует объявления, потоки и каталоги",
  "Сортирует и фильтрует входящий шум",
  "Ускоряет первичную оценку площадок",
  "Генерирует варианты концепций и визуализаций",
];

const HUMAN_TASKS = [
  "Проверяет и верифицирует результат",
  "Принимает ключевые решения",
  "Даёт профессиональное заключение",
  "Несёт ответственность за финальную упаковку",
];

export function HybridModelSection() {
  return (
    <section
      id="hybrid"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(15,15,28,1), rgba(10,10,15,1))" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="section-label mb-4">◆ Человек + ИИ</div>
          <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight mb-5">
            Мы не заменяем людей ИИ.<br />
            <span className="text-gradient-main">Мы строим гибридную модель.</span>
          </h2>
          <p className="font-ibm text-white/55 text-base leading-relaxed">
            ИИ автоматизирует первичные задачи, убирает шум и ускоряет анализ.
            Ключевые решения остаются за живыми специалистами и подрядчиками.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-14">
          <div
            className="p-7 rounded-sm"
            style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)" }}
              >
                <Icon name="BrainCircuit" size={20} style={{ color: "#00d4ff" }} />
              </div>
              <div>
                <div className="font-mono-ibm text-[10px] tracking-widest uppercase text-ksi-cyan/70">Машина</div>
                <h3 className="font-oswald text-white text-xl">Что делает ИИ</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {AI_TASKS.map((t, i) => (
                <li key={i} className="flex items-start gap-3 font-ibm text-white/60 text-sm leading-relaxed">
                  <Icon name="Check" size={16} className="text-ksi-cyan/60 mt-[2px] flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="p-7 rounded-sm"
            style={{ background: "rgba(123,47,255,0.03)", border: "1px solid rgba(123,47,255,0.15)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center"
                style={{ background: "rgba(123,47,255,0.08)", border: "1px solid rgba(123,47,255,0.25)" }}
              >
                <Icon name="UserCheck" size={20} style={{ color: "#a070ff" }} />
              </div>
              <div>
                <div className="font-mono-ibm text-[10px] tracking-widest uppercase" style={{ color: "#a070ff", opacity: 0.8 }}>Человек</div>
                <h3 className="font-oswald text-white text-xl">Что делают специалисты</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {HUMAN_TASKS.map((t, i) => (
                <li key={i} className="flex items-start gap-3 font-ibm text-white/60 text-sm leading-relaxed">
                  <Icon name="Check" size={16} style={{ color: "#a070ff", opacity: 0.7 }} className="mt-[2px] flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="p-7 rounded-sm"
          style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="section-label mb-4">◆ Стратегический переход</div>
          <h3 className="font-oswald text-2xl md:text-3xl text-white mb-8 leading-tight">
            От <span className="text-ksi-cyan">90% человек / 10% ИИ</span> — к{" "}
            <span className="text-gradient-main">10% человек / 90% ИИ</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono-ibm text-[10px] tracking-widest uppercase text-white/40">Сегодня</span>
              </div>
              <div className="flex h-10 rounded-sm overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <div
                  className="flex items-center justify-center font-oswald text-sm"
                  style={{ width: "90%", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)" }}
                >
                  Человек 90%
                </div>
                <div
                  className="flex items-center justify-center font-oswald text-xs"
                  style={{ width: "10%", background: "rgba(0,212,255,0.2)", color: "#00d4ff" }}
                >
                  ИИ 10%
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono-ibm text-[10px] tracking-widest uppercase" style={{ color: "#a070ff", opacity: 0.8 }}>В перспективе</span>
              </div>
              <div className="flex h-10 rounded-sm overflow-hidden" style={{ border: "1px solid rgba(123,47,255,0.25)" }}>
                <div
                  className="flex items-center justify-center font-oswald text-xs"
                  style={{ width: "10%", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                >
                  Чел. 10%
                </div>
                <div
                  className="flex items-center justify-center font-oswald text-sm"
                  style={{
                    width: "90%",
                    background: "linear-gradient(90deg, rgba(0,212,255,0.18), rgba(123,47,255,0.25))",
                    color: "#ffffff",
                  }}
                >
                  ИИ 90%
                </div>
              </div>
            </div>
          </div>

          <p className="font-ibm text-white/40 text-sm leading-relaxed mt-6">
            Переход постепенный и управляемый. Рост автоматизации идёт только там,
            где технология уже показала устойчивую точность на реальных кейсах.
          </p>
        </div>
      </div>
    </section>
  );
}
