import Icon from "@/components/ui/icon";

const ACTIVE = [
  { icon: "BrainCircuit", title: "Лаборатория ИИ", text: "Нейронный слой и интеллектуальные модели контура." },
  { icon: "Building2", title: "Центр реализации активов", text: "Капитализация, упаковка и вывод активов в рынок." },
  { icon: "Map", title: "Служба земельного поиска", text: "Поиск, анализ и подготовка площадок." },
  { icon: "Layers", title: "Студия проектного креатива", text: "Концепции, визуальные материалы и презентации." },
];

const PLANNED = [
  "Управление технического заказчика",
  "Управление тендеров и контрактации",
  "Коммерческое управление",
  "Юридическая служба",
  "Управление проектирования",
  "Управление строительного контроля",
  "Инвестиционно-аналитическое управление",
  "Управление развития проектов",
  "Финансовое управление",
  "Управление маркетинга и коммуникаций",
  "Управление клиентского продукта",
  "Управление эксплуатации",
];

export function InternalContoursSection() {
  return (
    <section id="contours" className="relative py-28 sm:py-36" style={{ background: "#06080d" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/45 mb-5">
            ◆ Архитектура системы
          </p>
          <h2 className="font-oswald text-white font-semibold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Внутренние контуры<br />АО КСИ
          </h2>
          <p className="font-ibm text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
            Из этих внутренних контуров поэтапно собирается интеллектуальная система кооперативного девелопмента нового поколения.
          </p>
        </div>

        {/* Active */}
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#00d4ff]/60 mb-4">
          Активные контуры
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {ACTIVE.map((a) => (
            <div
              key={a.title}
              className="p-6 sm:p-7 rounded-sm transition-all"
              style={{
                background: "linear-gradient(160deg, rgba(0,212,255,0.05) 0%, rgba(0,212,255,0.01) 100%)",
                border: "1px solid rgba(0,212,255,0.18)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.18)")}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-sm shrink-0"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}
                >
                  <Icon name={a.icon} size={18} className="text-[#00d4ff]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-oswald text-white text-lg font-medium tracking-wide">
                      {a.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[8px] tracking-wider uppercase"
                      style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "rgba(110,231,183,0.85)" }}>
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Активен
                    </span>
                  </div>
                  <p className="font-ibm text-white/45 text-sm leading-relaxed">
                    {a.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Planned */}
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35 mb-4">
          Контуры в разработке
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PLANNED.map((p) => (
            <div
              key={p}
              className="group relative p-4 rounded-sm transition-all cursor-default"
              style={{
                background: "rgba(15,21,32,0.4)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)")}
            >
              <p className="font-ibm text-white/35 text-sm">{p}</p>
              <span className="absolute right-3 top-3 font-mono text-[9px] tracking-wider uppercase text-white/15 group-hover:text-[#00d4ff]/60 transition-colors">
                В разработке
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}