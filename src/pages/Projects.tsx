import { useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";
import { PROJECTS } from "@/components/ksi/data";

const STATUS_FILTERS = ["Все", "Активна", "Beta", "R&D"];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [statusFilter, setStatusFilter] = useState("Все");

  const filtered = statusFilter === "Все" ? PROJECTS : PROJECTS.filter(p => p.status === statusFilter);
  const project = PROJECTS[activeIdx];
  const isCyan = project.color === "cyan";
  const accentColor = isCyan ? "#00d4ff" : "#7b2fff";
  const statusColor = project.status === "Активна" ? "#00d4ff" : project.status === "Beta" ? "#7b2fff" : project.status === "R&D" ? "#c050ff" : "rgba(255,255,255,0.3)";

  return (
    <PageLayout breadcrumb={[{ label: "Проекты & Продукты" }]}>
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Проекты & Продукты</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Цифровые продукты<br />
              <span className="text-gradient-cyan">операционного ядра</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Пять продуктов в разных стадиях зрелости. Не «в разработке» — в работе.
            </p>
          </div>
        </div>
      </section>

      {/* Фильтр статуса */}
      <section className="border-t border-b border-ksi-border/30 sticky top-[73px] z-40 bg-ksi-dark/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2">
          {STATUS_FILTERS.map(f => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className="font-mono-ibm text-xs px-4 py-1.5 rounded-sm transition-all tracking-widest"
              style={statusFilter === f
                ? { background: "rgba(0,212,255,0.12)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)" }
                : { background: "transparent", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >{f}</button>
          ))}
        </div>
      </section>

      {/* Основной блок */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Табы */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {PROJECTS.map((p, i) => (
              <button key={i} onClick={() => setActiveIdx(i)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-sm font-oswald text-xs tracking-widest uppercase transition-all duration-200"
                style={activeIdx === i
                  ? { background: p.color === "cyan" ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)", color: p.color === "cyan" ? "#00d4ff" : "#7b2fff", border: `1px solid ${p.color === "cyan" ? "rgba(0,212,255,0.35)" : "rgba(123,47,255,0.35)"}` }
                  : { background: "transparent", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                <Icon name={p.icon} size={13} />
                {p.name}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Левая — детали */}
            <div className="lg:col-span-3 card-ksi rounded-sm p-8 flex flex-col" style={{ borderColor: isCyan ? "rgba(0,212,255,0.25)" : "rgba(123,47,255,0.25)", boxShadow: `0 0 50px ${isCyan ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)"}` }}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: isCyan ? "rgba(0,212,255,0.1)" : "rgba(123,47,255,0.1)", border: `1px solid ${isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)"}` }}>
                    <Icon name={project.icon} size={22} style={{ color: accentColor }} />
                  </div>
                  <span className="font-mono-ibm text-xs tracking-widest px-2 py-0.5 rounded-sm" style={{ background: isCyan ? "rgba(0,212,255,0.08)" : "rgba(123,47,255,0.08)", color: accentColor, border: `1px solid ${isCyan ? "rgba(0,212,255,0.18)" : "rgba(123,47,255,0.18)"}` }}>{project.tag}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: statusColor }} />
                  <span className="font-mono-ibm text-xs" style={{ color: statusColor }}>{project.status}</span>
                </div>
              </div>
              <h2 className="font-oswald font-semibold text-white text-3xl mb-1">{project.name}</h2>
              <div className="font-ibm text-white/30 text-xs tracking-widest uppercase mb-5">{project.type}</div>
              <p className="font-ibm text-white/65 text-base leading-relaxed mb-8 flex-1">{project.desc}</p>
              <div className="flex gap-4 flex-wrap">
                <a href={`/directions/${project.name === "КриптоМетры" ? "cryptometry" : project.name === "Лаборатория ИИ" ? "ai-lab" : project.name === "Служба земельного поиска LSS" ? "lss" : project.name === "ИИ-продакшн" ? "ai-production" : "fee-dev"}`}
                  className="btn-primary-ksi px-7 py-3 rounded-sm text-sm inline-block cursor-pointer"
                  style={!isCyan ? { background: "linear-gradient(135deg, #7b2fff, #a855f7)", color: "#fff" } : {}}>
                  Подробнее о продукте
                </a>
                <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm inline-block cursor-pointer">Связаться</a>
              </div>
            </div>

            {/* Правая — возможности */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-1 px-1">КЛЮЧЕВЫЕ ВОЗМОЖНОСТИ</div>
              {project.features.map((feat, fi) => (
                <div key={fi} className="flex items-center gap-4 p-4 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: isCyan ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)", border: `1px solid ${isCyan ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)"}` }}>
                    <Icon name={feat.icon} size={14} style={{ color: accentColor }} />
                  </div>
                  <span className="font-ibm text-white/60 text-sm">{feat.text}</span>
                </div>
              ))}
              <div className="mt-auto pt-4 border-t border-ksi-border/40">
                <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-3">ДРУГИЕ ПРОДУКТЫ</div>
                {PROJECTS.filter((_, i) => i !== activeIdx).slice(0, 3).map((p, i) => (
                  <button key={i} onClick={() => setActiveIdx(PROJECTS.indexOf(p))}
                    className="w-full flex items-center gap-3 py-2 text-left group">
                    <Icon name={p.icon} size={13} className="text-white/20 group-hover:text-white/45 transition-colors" />
                    <span className="font-ibm text-white/25 text-xs group-hover:text-white/50 transition-colors">{p.name}</span>
                    <Icon name="ArrowRight" size={11} className="ml-auto text-white/15 group-hover:text-white/35 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Все продукты в виде таблицы */}
      <section className="py-16 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Все продукты группы</div>
          <div className="space-y-2">
            {filtered.map((p, i) => (
              <div key={i} className="card-ksi p-5 rounded-sm flex items-center gap-6 group cursor-pointer" onClick={() => setActiveIdx(PROJECTS.indexOf(p))}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: p.color === "cyan" ? "rgba(0,212,255,0.08)" : "rgba(123,47,255,0.08)", border: `1px solid ${p.color === "cyan" ? "rgba(0,212,255,0.18)" : "rgba(123,47,255,0.18)"}` }}>
                  <Icon name={p.icon} size={18} style={{ color: p.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                </div>
                <div className="flex-1 grid md:grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="font-oswald text-white font-medium group-hover:text-ksi-cyan transition-colors">{p.name}</div>
                    <div className="font-ibm text-white/35 text-xs mt-0.5">{p.type}</div>
                  </div>
                  <div className="font-ibm text-white/40 text-sm hidden md:block">{p.desc.slice(0, 80)}...</div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.status === "Активна" ? "#00d4ff" : p.status === "Beta" ? "#7b2fff" : "#c050ff" }} />
                    <span className="font-mono-ibm text-xs text-white/40">{p.status}</span>
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-white/20 group-hover:text-white/45 transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
