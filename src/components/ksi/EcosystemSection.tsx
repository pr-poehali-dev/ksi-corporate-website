import { EcosystemCanvas } from "./TopSections";

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(123,47,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="section-label mb-6">◆ Карта экосистемы</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Единая цифровая <br />
              <span className="text-gradient-purple">инфраструктура</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-8">
              АО КСИ — ядро экосистемы. Вокруг него выстроены взаимосвязанные платформы,
              сервисы и технологические компоненты, создающие синергетический эффект.
            </p>

            <div className="space-y-0 mb-10">
              {[
                { node: "КриптоМетры", role: "Флагманская система распределённого девелопмента", color: "cyan" },
                { node: "Лаборатория ИИ", role: "ИИ-решения для недвижимости и девелопмента", color: "purple" },
                { node: "ИИ-продакшн", role: "Цифровые аватары, медиа и визуальные коммуникации", color: "cyan" },
                { node: "LSS", role: "Служба аналитического поиска земельных активов", color: "purple" },
                { node: "Земельная аналитика", role: "Data-продукты и картографические решения", color: "cyan" },
                { node: "Fee-Dev Оператор", role: "Среда для профессиональных девелоперов", color: "purple" },
                { node: "Медиа & Аналитика", role: "Исследования и интеллектуальное сопровождение", color: "cyan" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-ksi-border/30">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                  <span className="font-oswald text-white/75 text-sm font-medium w-40 flex-shrink-0">{item.node}</span>
                  <span className="font-ibm text-white/35 text-xs">{item.role}</span>
                </div>
              ))}
            </div>

            <a href="/contacts" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
              Стать частью экосистемы
            </a>
          </div>

          <div className="relative h-[500px] rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-purple/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-ksi-dark/30 pointer-events-none" />
            <EcosystemCanvas />
            <div className="absolute top-4 left-4 font-mono-ibm text-ksi-cyan/40 text-xs tracking-widest pointer-events-none">LIVE MAP</div>
            <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
              <span className="font-mono-ibm text-ksi-cyan/40 text-xs">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
