import Icon from "@/components/ui/icon";

const STEPS = [
  {
    num: "01",
    icon: "MessageSquare",
    color: "#00d4ff",
    title: "Пользователь формулирует задачу",
    desc: "Запрос поступает в единый интерфейс взаимодействия и становится частью рабочего контура системы.",
  },
  {
    num: "02",
    icon: "UserCheck",
    color: "#4db8ff",
    title: "Запрос принимает специалист АО КСИ",
    desc: "Специалист уточняет задачу, определяет её тип и выбирает логику исполнения.",
  },
  {
    num: "03",
    icon: "BrainCircuit",
    color: "#a070ff",
    title: "Подключаются нейронные модели и контуры",
    desc: "Задача направляется в нужные модели и прикладные контуры. Специалист получает варианты решений и промежуточные результаты.",
  },
  {
    num: "04",
    icon: "ShieldCheck",
    color: "#8855ff",
    title: "Результат верифицируется и собирается",
    desc: "Полученные данные перепроверяются, фильтруются и собираются в прикладной ответ, соответствующий задаче.",
  },
  {
    num: "05",
    icon: "TrendingUp",
    color: "#7b2fff",
    title: "Система обучается на каждом запросе",
    desc: "Взаимодействие проходит через интеллектуальный контур, который обучается на решении прикладных задач и ускоряет будущие запросы.",
  },
];

export function HowWeWorkSection() {
  return (
    <section
      id="how-we-work"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,11,21,1), rgba(10,10,15,1))" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="max-w-3xl mb-14">
          <div className="section-label mb-4">◆ Практическая механика</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Как мы работаем<br />
            <span className="text-gradient-main">уже сегодня</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed">
            АО КСИ уже сейчас решает прикладные задачи через управляемый интеллектуальный контур,
            в котором живые специалисты, нейронные модели и внутренняя логика системы работают вместе.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-[27px] top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(0,212,255,0.4), rgba(123,47,255,0.4))" }}
          />

          <div className="space-y-5">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex gap-6 md:gap-10 items-start group">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-sm flex items-center justify-center z-10 relative transition-all duration-300"
                    style={{
                      background: `${step.color}10`,
                      border: `1px solid ${step.color}35`,
                    }}
                  >
                    <Icon name={step.icon} size={22} style={{ color: step.color }} />
                  </div>
                </div>

                <div
                  className="flex-1 p-6 rounded-sm transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.015)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${step.color}30`;
                    (e.currentTarget as HTMLElement).style.background = `${step.color}04`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)";
                  }}
                >
                  <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
                    <span
                      className="font-mono-ibm text-[11px] tracking-widest flex-shrink-0 mt-1"
                      style={{ color: step.color, opacity: 0.7 }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-oswald text-white text-xl font-medium mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="font-ibm text-white/55 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-8 p-7 rounded-sm flex items-start gap-5"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}
        >
          <div
            className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 mt-[2px]"
            style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.3)" }}
          >
            <Icon name="Cpu" size={18} className="text-ksi-cyan" />
          </div>
          <p className="font-ibm text-white/70 text-base leading-relaxed">
            На текущем этапе КриптоМетры развиваются как управляемая интеллектуальная система,
            в которой реальные запросы не только решаются, но и становятся материалом для обучения
            будущего виртуального девелопера.{" "}
            <span className="text-white/90">Каждая задача усиливает ядро системы.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
