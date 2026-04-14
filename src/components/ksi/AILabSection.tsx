import Icon from "@/components/ui/icon";

const CAPABILITIES = [
  { icon: "Cpu", text: "Разработка и обучение собственного интеллектуального контура" },
  { icon: "TestTube", text: "Тестирование прикладных решений для рынка" },
  { icon: "Puzzle", text: "Внедрение ИИ-инструментов в процессы других девелоперов" },
  { icon: "Layers", text: "Формирование архитектуры будущего ИИ-девелопера" },
  { icon: "Network", text: "Объединение отдельных модулей в единую систему" },
];

export function AILabSection() {
  return (
    <section id="ai-lab" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 70% 50%, rgba(123,47,255,0.06), transparent)" }} />
      <div className="absolute inset-0 parcel-bg pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Левая — основное описание (3 колонки) */}
          <div className="lg:col-span-3">
            <div className="section-label mb-4" style={{ color: "#7b2fff" }}>◆ Технологическое ядро</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
              Лаборатория ИИ —<br />
              <span className="text-gradient-purple">технологическое ядро</span> АО КСИ
            </h2>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-10 max-w-2xl">
              Именно здесь создаются, обучаются и собираются прикладные интеллектуальные
              решения для девелопмента, недвижимости и смежных процессов.
            </p>

            <div className="space-y-4 mb-10">
              {CAPABILITIES.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: "rgba(123,47,255,0.06)",
                      border: "1px solid rgba(123,47,255,0.15)",
                    }}>
                    <Icon name={item.icon} size={16} className="text-ksi-purple opacity-70" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="font-ibm text-white/55 text-base leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="/directions/ai-lab" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer"
              style={{ background: "linear-gradient(135deg, #7b2fff, #5a1fcc)" }}>
              Подробнее о Лаборатории ИИ
            </a>
          </div>

          {/* Правая — визуальный акцент (2 колонки) */}
          <div className="lg:col-span-2">
            <div className="rounded-sm overflow-hidden" style={{
              background: "linear-gradient(135deg, rgba(123,47,255,0.06), rgba(123,47,255,0.02))",
              border: "1px solid rgba(123,47,255,0.12)",
            }}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center"
                    style={{ background: "rgba(123,47,255,0.15)" }}>
                    <Icon name="BrainCircuit" size={20} className="text-ksi-purple" />
                  </div>
                  <div>
                    <div className="font-oswald text-white/80 text-lg font-medium">AI Lab</div>
                    <div className="font-mono-ibm text-ksi-purple/50 text-[10px] tracking-wider">R&D · PROPTECH INTELLIGENCE</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Земельный рынок", status: "active" },
                    { label: "Девелоперская аналитика", status: "active" },
                    { label: "Цифровые интерфейсы", status: "active" },
                    { label: "Автономные агенты", status: "rd" },
                    { label: "Собственные модели", status: "rd" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 rounded-sm"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <span className="font-ibm text-white/50 text-sm">{item.label}</span>
                      <span className="font-mono-ibm text-[9px] tracking-wider px-2 py-0.5 rounded-sm"
                        style={{
                          background: item.status === "active" ? "rgba(123,47,255,0.15)" : "rgba(255,255,255,0.05)",
                          color: item.status === "active" ? "#a070ff" : "rgba(255,255,255,0.3)",
                        }}>
                        {item.status === "active" ? "АКТИВНО" : "R&D"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(123,47,255,0.08)", background: "rgba(123,47,255,0.02)" }}>
                <p className="font-ibm text-white/25 text-xs leading-relaxed">
                  Лаборатория ИИ объединяет внешние нейросетевые контуры
                  с собственной методологией АО КСИ для создания прикладных решений.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
