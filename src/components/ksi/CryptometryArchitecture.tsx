import Icon from "@/components/ui/icon";

const INPUTS = [
  { icon: "Users", label: "Участники", desc: "девелоперы, владельцы активов, землевладельцы, партнёры" },
  { icon: "Building2", label: "Активы", desc: "земельные участки, объекты, проекты" },
  { icon: "Puzzle", label: "Модули", desc: "земельный поиск, реализация, креатив" },
  { icon: "BrainCircuit", label: "ИИ-контур", desc: "нейронные модели и интеллектуальный слой" },
];

export default function CryptometryArchitecture() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,212,255,0.06), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(123,47,255,0.05), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="section-label mb-4 justify-center flex">◆ Архитектура системы</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Как собирается<br />
            <span className="text-gradient-main">кооперативная система</span>
          </h2>
          <p className="font-ibm text-white/45 text-base md:text-lg leading-relaxed">
            КриптоМетры — интеллектуальный и цифровой контур, через который участники, активы,
            прикладные модули и ИИ-слой собираются в единую кооперативную архитектуру распределённого
            девелопмента.
          </p>
        </div>

        {/* Schema */}
        <div className="relative max-w-5xl mx-auto">
          {/* Inputs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {INPUTS.map((item, i) => {
              const isAccent = item.icon === "BrainCircuit";
              const accent = isAccent ? "#7b2fff" : "#00d4ff";
              return (
                <div
                  key={i}
                  className="relative p-5 rounded-sm transition-all"
                  style={{
                    background: `${accent}05`,
                    border: `1px solid ${accent}20`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-sm flex items-center justify-center mb-3"
                    style={{
                      background: `${accent}10`,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    <Icon name={item.icon} size={18} style={{ color: accent, opacity: 0.85 }} />
                  </div>
                  <div
                    className="font-oswald text-white/90 text-sm font-medium mb-1 tracking-wide"
                  >
                    {item.label}
                  </div>
                  <p className="font-ibm text-white/35 text-[11px] leading-relaxed">
                    {item.desc}
                  </p>
                  {/* connector down */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-px h-10 hidden lg:block"
                    style={{
                      background: `linear-gradient(to bottom, ${accent}40, transparent)`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile connector */}
          <div className="flex justify-center lg:hidden mb-4">
            <Icon name="ChevronDown" size={20} className="text-ksi-cyan/40" />
          </div>

          {/* КриптоМетры — центральный контур */}
          <div className="relative">
            <div
              className="relative rounded-sm overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(123,47,255,0.08) 100%)",
                border: "1px solid rgba(0,212,255,0.35)",
                boxShadow:
                  "0 0 40px rgba(0,212,255,0.1), inset 0 0 60px rgba(123,47,255,0.04)",
              }}
            >
              {/* glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.12), transparent 70%)",
                }}
              />

              <div className="relative p-8 md:p-12 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-sm mb-4"
                    style={{
                      background: "rgba(0,212,255,0.1)",
                      border: "1px solid rgba(0,212,255,0.25)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#00d4ff" }} />
                    <span className="font-mono-ibm text-[10px] tracking-[0.22em] uppercase text-[#00d4ff]">
                      Интеллектуальный и цифровой контур
                    </span>
                  </div>
                  <h3 className="font-oswald text-white text-3xl md:text-4xl font-semibold mb-3 tracking-wide">
                    КриптоМетры
                  </h3>
                  <p className="font-ibm text-white/55 text-sm md:text-base leading-relaxed max-w-xl">
                    Связывают участников, активы, прикладные модули и интеллектуальный слой в одну
                    управляемую среду. ИИ внутри КриптоМетров — единый управляющий контур, который
                    усиливает и координирует все элементы системы.
                  </p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div
                    className="relative w-28 h-28 flex items-center justify-center"
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(0,212,255,0.18), transparent 70%)",
                      }}
                    />
                    <div
                      className="absolute inset-2 rounded-full"
                      style={{ border: "1px solid rgba(0,212,255,0.25)" }}
                    />
                    <div
                      className="absolute inset-5 rounded-full"
                      style={{ border: "1px solid rgba(123,47,255,0.2)" }}
                    />
                    <div
                      className="relative w-12 h-12 rounded-sm flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(0,212,255,0.18), rgba(123,47,255,0.18))",
                        border: "1px solid rgba(0,212,255,0.4)",
                      }}
                    >
                      <Icon name="Hexagon" size={22} className="text-[#00d4ff]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center my-8">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-px h-12"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,212,255,0.4), rgba(0,212,255,0))",
                }}
              />
              <Icon name="ChevronDown" size={18} className="text-[#00d4ff]/50" />
            </div>
          </div>

          {/* Output */}
          <div
            className="relative p-7 md:p-9 rounded-sm text-center"
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="font-mono-ibm text-[10px] tracking-[0.22em] uppercase text-white/30 mb-2">
              Результат сборки
            </div>
            <h3
              className="font-oswald text-white text-2xl md:text-3xl font-semibold tracking-wide leading-tight"
            >
              Кооперативная система<br />
              <span className="text-gradient-main">распределённого девелопмента</span>
            </h3>
            <p className="font-ibm text-white/35 text-sm leading-relaxed mt-4 max-w-2xl mx-auto">
              Управляемая среда, в которой проекты, участники и интеллектуальные контуры работают
              как единая модель работы с активами и девелоперскими сценариями.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
