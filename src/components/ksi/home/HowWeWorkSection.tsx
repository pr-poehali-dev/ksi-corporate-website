import Icon from "@/components/ui/icon";

const STEPS = [
  {
    icon: "MessageSquare",
    title: "Пользователь ставит задачу через чат",
    text: "Запрос приходит в операционный контур АО КСИ через ИИ-оператора или прямой канал.",
  },
  {
    icon: "UserRound",
    title: "Запрос принимает специалист АО КСИ",
    text: "Живой специалист проверяет контекст, формулирует постановку и выбирает сценарий обработки.",
  },
  {
    icon: "BrainCircuit",
    title: "Подключаются нейронные модели и внутренние контуры",
    text: "Задача проходит через нейронный слой, прикладные модули и внутренние службы АО КСИ.",
  },
  {
    icon: "ShieldCheck",
    title: "Результат проходит верификацию и сборку",
    text: "Каждый ответ собирается и проверяется специалистами перед возвратом пользователю.",
  },
  {
    icon: "Repeat",
    title: "Система обучается на каждом запросе",
    text: "Каждый кейс усиливает интеллектуальный контур и повышает качество следующих обработок.",
  },
];

export function HowWeWorkSection() {
  return (
    <section id="how-it-works" className="relative py-28 sm:py-36" style={{ background: "#06080d" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/45 mb-5">
            ◆ Интеллектуальный контур системы
          </p>
          <h2 className="font-oswald text-white font-semibold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Как мы работаем<br />уже сегодня
          </h2>
          <p className="font-ibm text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
            На текущем этапе АО КСИ уже решает прикладные задачи через интеллектуальный контур системы,
            в котором живые специалисты, нейронные модели и внутренние модули работают вместе.
          </p>
        </div>

        <div className="space-y-3">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto_auto_1fr] gap-5 sm:gap-7 items-start p-5 sm:p-6 rounded-sm transition-all"
              style={{
                background: "rgba(15,21,32,0.4)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
            >
              <span className="font-mono text-[#00d4ff]/40 text-xs tracking-[0.2em] mt-1.5">
                0{i + 1}
              </span>
              <div
                className="flex items-center justify-center w-10 h-10 rounded-sm"
                style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}
              >
                <Icon name={s.icon} size={16} className="text-[#00d4ff]" />
              </div>
              <div>
                <h3 className="font-oswald text-white text-lg sm:text-xl font-medium mb-1.5 tracking-wide">
                  {s.title}
                </h3>
                <p className="font-ibm text-white/45 text-sm leading-relaxed">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}