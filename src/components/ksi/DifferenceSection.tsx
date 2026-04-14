import Icon from "@/components/ui/icon";

const POINTS = [
  { icon: "Layers", text: "Структура, а не хаотичный набор инструментов" },
  { icon: "Building2", text: "Логика девелопера, а не просто набор нейросетей" },
  { icon: "UserCheck", text: "Операторская верификация результата" },
  { icon: "ArrowUpRight", text: "Движение от прикладных решений к собственной платформе" },
  { icon: "Network", text: "Единая экосистема, а не набор разрозненных сервисов" },
];

export function DifferenceSection() {
  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,20,1), rgba(10,10,15,1))" }}>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Левая — заголовок */}
          <div>
            <div className="section-label mb-4">◆ Отличие подхода</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Не поток генераций,<br />
              <span className="text-gradient-main">а управляемый</span><br />
              интеллектуальный результат
            </h2>
            <p className="font-ibm text-white/45 text-lg leading-relaxed">
              АО КСИ выстраивает системную модель, в которой каждый инструмент
              работает в рамках единой архитектуры и верифицируется до передачи заказчику.
            </p>
          </div>

          {/* Правая — тезисы */}
          <div className="space-y-4">
            {POINTS.map((point, i) => (
              <div key={i} className="flex items-center gap-5 p-4 rounded-sm transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{
                    background: i % 2 === 0 ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)"}`,
                  }}>
                  <Icon name={point.icon} size={16}
                    style={{ color: i % 2 === 0 ? "#00d4ff" : "#7b2fff", opacity: 0.7 }} />
                </div>
                <p className="font-ibm text-white/55 text-base">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
