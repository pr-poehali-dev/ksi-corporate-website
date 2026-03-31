import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";
import { DIRECTIONS } from "@/components/ksi/data";

const FILTERS = [
  { label: "Все", value: "all" },
  { label: "Технологии", value: "tech", ids: ["ai-lab", "ai-production", "licensing"] },
  { label: "Аналитика & Data", value: "data", ids: ["lss", "land-data"] },
  { label: "Девелопмент", value: "dev", ids: ["cryptometry", "fee-dev", "property-mgmt", "invest-models"] },
  { label: "Медиа & Знания", value: "media", ids: ["media", "consulting", "edu"] },
];

import { useState } from "react";

export default function Directions() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? DIRECTIONS
    : DIRECTIONS.filter(d => {
        const f = FILTERS.find(f => f.value === activeFilter);
        return f?.ids?.includes(d.id);
      });

  const flagship = DIRECTIONS.find(d => d.id === "cryptometry")!;
  const rest = filtered.filter(d => d.id !== "cryptometry");

  return (
    <PageLayout breadcrumb={[{ label: "Направления" }]}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(123,47,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Направления деятельности</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              12 направлений —<br />
              <span className="text-gradient-purple">единая инфраструктура</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Каждое направление — самостоятельная компетенция.
              Вместе они образуют полный цикл цифрового девелопмента.
            </p>
          </div>
        </div>
      </section>

      {/* Фильтры */}
      <section className="border-t border-b border-ksi-border/30 sticky top-[73px] z-40 bg-ksi-dark/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className="font-ibm text-sm px-4 py-1.5 rounded-sm transition-all"
              style={activeFilter === f.value
                ? { background: "rgba(0,212,255,0.12)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)" }
                : { background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Флагман */}
          {(activeFilter === "all" || activeFilter === "dev") && (
            <a href="/directions/cryptometry" className="block mb-6">
              <div className="card-ksi p-8 rounded-sm group cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.25)", boxShadow: "0 0 40px rgba(0,212,255,0.06)" }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
                    <span className="font-mono-ibm text-ksi-cyan text-xs tracking-widest">ФЛАГМАНСКОЕ НАПРАВЛЕНИЕ</span>
                  </div>
                  <span className="font-mono-ibm text-xs px-2 py-1 rounded-sm" style={{ background: "rgba(0,212,255,0.08)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}>Активна</span>
                </div>
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-sm flex items-center justify-center" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                        <Icon name="Hexagon" size={26} className="text-ksi-cyan" />
                      </div>
                      <div>
                        <div className="font-mono-ibm text-white/25 text-[10px] tracking-widest mb-1">FLAGSHIP · DISTRIBUTED DEVELOPMENT</div>
                        <h2 className="font-oswald text-3xl font-semibold text-white group-hover:text-ksi-cyan transition-colors">КриптоМетры</h2>
                      </div>
                    </div>
                    <p className="font-ibm text-white/55 text-base leading-relaxed">{flagship.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {flagship.tags.map(t => (
                      <span key={t} className="font-ibm text-xs px-2.5 py-1 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.07)" }}>{t}</span>
                    ))}
                    <div className="w-full mt-3 flex items-center gap-2 text-ksi-cyan/50 group-hover:text-ksi-cyan transition-colors">
                      <span className="font-mono-ibm text-xs tracking-widest">ПОДРОБНЕЕ</span>
                      <Icon name="ArrowRight" size={13} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          )}

          {/* Сетка остальных */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(dir => (
              <a key={dir.id} href={`/directions/${dir.id}`} className="block">
                <div className="card-ksi p-6 rounded-sm group cursor-pointer h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-sm flex items-center justify-center" style={{ background: dir.color === "cyan" ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)", border: `1px solid ${dir.color === "cyan" ? "rgba(0,212,255,0.18)" : "rgba(123,47,255,0.18)"}` }}>
                      <Icon name={dir.icon} size={20} style={{ color: dir.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                    </div>
                    <span className="font-mono-ibm text-xs px-2 py-1 rounded-sm" style={{ background: dir.color === "cyan" ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)", color: dir.color === "cyan" ? "#00d4ff" : "#7b2fff", border: `1px solid ${dir.color === "cyan" ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)"}` }}>
                      {dir.stat}
                    </span>
                  </div>
                  <div className="font-mono-ibm text-white/25 text-[10px] tracking-widest mb-1.5 uppercase">{dir.subtitle}</div>
                  <h3 className="font-oswald font-medium text-white text-lg mb-2 group-hover:text-ksi-cyan transition-colors">{dir.title}</h3>
                  <p className="font-ibm text-white/45 text-sm leading-relaxed flex-1">{dir.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                    {dir.tags.map(t => (
                      <span key={t} className="font-ibm text-[10px] px-2 py-0.5 rounded-sm" style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.30)", border: "1px solid rgba(255,255,255,0.06)" }}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-transparent group-hover:text-ksi-cyan/60 transition-all">
                    <span className="font-mono-ibm text-xs tracking-widest">ПОДРОБНЕЕ</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Интеграция направлений */}
      <section className="py-16 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-5">◆ Синергия направлений</div>
              <h2 className="font-oswald text-3xl font-semibold text-white mb-5">Как направления работают вместе</h2>
              <p className="font-ibm text-white/55 text-base leading-relaxed mb-6">
                Каждое направление АО КСИ усиливает другие. Земельная аналитика питает LSS,
                LSS питает КриптоМетры и Fee-Dev платформу, Лаборатория ИИ обслуживает
                все платформы, Медиацентр формирует репутацию группы.
              </p>
              <a href="/ecosystem" className="btn-outline-ksi px-6 py-3 rounded-sm text-sm inline-block cursor-pointer">
                Архитектура экосистемы →
              </a>
            </div>
            <div className="space-y-2">
              {[
                { from: "Земельная аналитика", to: "LSS", desc: "Данные питают поиск" },
                { from: "LSS", to: "КриптоМетры", desc: "Найденные активы входят в платформу" },
                { from: "Лаборатория ИИ", to: "Все платформы", desc: "ИИ-инструменты встроены во всю экосистему" },
                { from: "Fee-Dev", to: "Управление", desc: "Реализованные проекты переходят в управление" },
                { from: "ИИ-продакшн", to: "Медиацентр", desc: "Медиаконтент усиливает аналитический центр" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="font-ibm text-white/60 text-sm w-36 flex-shrink-0">{item.from}</span>
                  <Icon name="ArrowRight" size={14} className="text-ksi-cyan/40 flex-shrink-0" />
                  <span className="font-ibm text-white/60 text-sm w-36 flex-shrink-0">{item.to}</span>
                  <span className="font-ibm text-white/30 text-xs">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
