import Icon from "@/components/ui/icon";

export function CryptometrySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.04), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4">◆ Ключевой проект</div>
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              КриптоМетры
            </h2>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-6">
              Интеллектуальная система распределённого девелопмента — ключевой проект АО КСИ,
              вокруг которого формируется архитектура будущего виртуального девелопера.
            </p>
            <p className="font-ibm text-white/35 text-base leading-relaxed mb-8">
              Подробности о системе, её устройстве и текущем этапе развития —
              на отдельной странице проекта.
            </p>
            <a href="/cryptometry" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
              Подробнее о КриптоМетрах
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="p-6 rounded-sm" style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.03), rgba(0,212,255,0.01))",
              border: "1px solid rgba(0,212,255,0.1)",
            }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-sm flex items-center justify-center"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <Icon name="Hexagon" size={22} className="text-ksi-cyan" />
                </div>
                <div>
                  <div className="font-oswald text-white/80 text-base font-medium">КриптоМетры</div>
                  <div className="font-mono-ibm text-ksi-cyan/35 text-[9px] tracking-wider">DISTRIBUTED DEVELOPMENT</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Интеллектуальная система",
                  "Распределённый девелопмент",
                  "Внутренние службы АО КСИ",
                  "Гибридная модель ИИ",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-sm"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan/40 flex-shrink-0" />
                    <span className="font-ibm text-white/45 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
