import Icon from "@/components/ui/icon";

const POINTS = [
  { icon: "Building", text: "Один управляющий центр — АО КСИ" },
  { icon: "Hexagon", text: "Один проект — КриптоМетры" },
  { icon: "Users", text: "Внутренние службы, а не россыпь внешних сервисов" },
  { icon: "BrainCircuit", text: "Интеллектуальный контур вместо хаотичного набора инструментов" },
  { icon: "CheckCircle", text: "Единый прикладной результат для клиента" },
];

export function DifferenceSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4">◆ Принцип</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Не набор разрозненных услуг,<br />
              <span className="text-gradient-main">а единая система</span>
            </h2>
            <p className="font-ibm text-white/45 text-lg leading-relaxed">
              АО КСИ выстраивает одну систему, в которой все внутренние контуры
              работают на единый результат и управляются из одного центра.
            </p>
          </div>

          <div className="space-y-4">
            {POINTS.map((point, i) => (
              <div key={i} className="flex items-center gap-5 p-4 rounded-sm"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
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
