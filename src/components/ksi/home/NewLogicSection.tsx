import Icon from "@/components/ui/icon";

const CONTRASTS = [
  {
    icon: "Building",
    label: "Классический девелопмент",
    points: [
      "Высокая концентрация капитала в одной точке",
      "Управление, риски и решения замкнуты на одном операторе",
      "Длинный цикл и закрытая логика проекта",
    ],
    tone: "muted",
  },
  {
    icon: "Network",
    label: "Кооперативная модель АО КСИ",
    points: [
      "Распределённое участие и компетенции в одной системе",
      "Прикладные модули, спрос и интеллектуальные контуры собираются вместе",
      "Новая модель коллективного освоения сложных активов и проектов",
    ],
    tone: "active",
  },
];

export function NewLogicSection() {
  return (
    <section className="relative py-28 sm:py-36" style={{ background: "#080b13" }}>
      {/* свечение */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 1000,
            height: 500,
            background: "radial-gradient(ellipse, rgba(123,47,255,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/45 mb-5">
            ◆ Стратегическая рамка
          </p>
          <h2
            className="font-oswald text-white font-semibold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Новая логика освоения<br />сложных активов
          </h2>
          <p className="font-ibm text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
            Классический девелопмент требует высокой концентрации капитала, риска и управления в одной точке.
            АО КСИ развивает интеллектуальную систему кооперативного девелопмента, в которой участие, компетенции,
            спрос и интеллектуальные контуры могут быть собраны в новую модель коллективного освоения проектов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CONTRASTS.map((c) => {
            const isActive = c.tone === "active";
            return (
              <div
                key={c.label}
                className="p-8 rounded-sm"
                style={
                  isActive
                    ? {
                        background:
                          "linear-gradient(160deg, rgba(0,212,255,0.06) 0%, rgba(123,47,255,0.04) 100%)",
                        border: "1px solid rgba(0,212,255,0.28)",
                      }
                    : {
                        background: "rgba(15,21,32,0.4)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }
                }
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-sm"
                    style={
                      isActive
                        ? {
                            background: "rgba(0,212,255,0.1)",
                            border: "1px solid rgba(0,212,255,0.25)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }
                    }
                  >
                    <Icon
                      name={c.icon}
                      size={16}
                      className={isActive ? "text-[#00d4ff]" : "text-white/40"}
                    />
                  </div>
                  <p
                    className="font-mono text-[10px] tracking-[0.22em] uppercase"
                    style={{
                      color: isActive ? "rgba(0,212,255,0.7)" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {c.label}
                  </p>
                </div>
                <ul className="space-y-3">
                  {c.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 font-ibm leading-relaxed"
                      style={{
                        color: isActive ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.4)",
                        fontSize: "14.5px",
                      }}
                    >
                      <span
                        className="inline-block flex-shrink-0 mt-2 w-1 h-1 rounded-full"
                        style={{
                          background: isActive ? "#00d4ff" : "rgba(255,255,255,0.25)",
                        }}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}