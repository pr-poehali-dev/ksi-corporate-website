import { useState } from "react";
import Icon from "@/components/ui/icon";
import { DIRECTIONS, PROJECTS } from "./data";

export function DirectionsSection() {
  return (
    <section id="directions" className="py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <img src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/4a21ac91-a1a0-42e5-85ac-4c4837a8ef21.jpeg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.06 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.4) 30%, rgba(10,10,15,0.4) 70%, rgba(10,10,15,0.8) 100%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="section-label mb-4">◆ Внутренние службы</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
              Контуры системы: <span className="text-gradient-purple">4 внутренние службы</span>
            </h2>
            <p className="font-ibm text-white/45 text-base max-w-sm">
              Четыре службы АО КСИ, обеспечивающие работу и развитие КриптоМетров
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIRECTIONS.map((dir) => {
            const isCyan = dir.color === "cyan";
            const accentColor = isCyan ? "#00d4ff" : "#7b2fff";
            const bgAccent = isCyan ? "rgba(0,212,255,0.04)" : "rgba(123,47,255,0.04)";
            const borderAccent = isCyan ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)";

            return (
              <a key={dir.id} href={`/directions/${dir.id}`}
                className="group rounded-sm cursor-pointer flex flex-col p-6 transition-all"
                style={{ background: bgAccent, border: `1px solid ${borderAccent}` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}40`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = borderAccent)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}25` }}>
                    <Icon name={dir.icon} size={20} style={{ color: accentColor }} />
                  </div>
                  <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm"
                    style={{ color: accentColor, background: `${accentColor}10`, border: `1px solid ${accentColor}20` }}>
                    {dir.stat}
                  </span>
                </div>
                <h3 className="font-oswald font-medium text-white text-lg leading-tight mb-2 group-hover:text-ksi-cyan transition-colors">
                  {dir.title}
                </h3>
                <p className="font-ibm text-white/45 text-sm leading-relaxed flex-1">{dir.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {dir.tags.map((tag) => (
                    <span key={tag} className="font-ibm text-[10px] px-2 py-0.5 rounded-sm"
                      style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-60 transition-opacity">
                  <span className="font-mono-ibm text-xs text-white tracking-widest">Подробнее</span>
                  <Icon name="ArrowRight" size={11} className="text-white" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="/directions" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">
            Все внутренние службы →
          </a>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const project = PROJECTS[activeIdx];
  const isCyan = project.color === "cyan";
  const accentColor = isCyan ? "#00d4ff" : "#7b2fff";
  const statusColor = project.status === "Активна" ? "#00d4ff" : project.status === "Beta" ? "#7b2fff" : project.status === "R&D" ? "#c050ff" : "rgba(255,255,255,0.3)";

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-14">
          <div className="section-label mb-4">◆ Ключевой проект</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
              Операционное ядро <span className="text-gradient-cyan">проекта</span>
            </h2>
            <p className="font-ibm text-white/45 text-base max-w-sm">
              Единственный ключевой проект АО КСИ — интеллектуальная система распределённого девелопмента
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 transition-all duration-300">
          <div className="lg:col-span-3 card-ksi rounded-sm p-8 flex flex-col" style={{ borderColor: isCyan ? "rgba(0,212,255,0.25)" : "rgba(123,47,255,0.25)", boxShadow: `0 0 50px ${isCyan ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)"}` }}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: isCyan ? "rgba(0,212,255,0.1)" : "rgba(123,47,255,0.1)", border: `1px solid ${isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)"}` }}>
                  <Icon name={project.icon} size={22} style={{ color: accentColor }} />
                </div>
                <div>
                  <span className="font-mono-ibm text-xs tracking-widest px-2 py-0.5 rounded-sm" style={{ background: isCyan ? "rgba(0,212,255,0.08)" : "rgba(123,47,255,0.08)", color: accentColor, border: `1px solid ${isCyan ? "rgba(0,212,255,0.18)" : "rgba(123,47,255,0.18)"}` }}>
                    {project.tag}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: statusColor }} />
                <span className="font-mono-ibm text-xs" style={{ color: statusColor }}>{project.status}</span>
              </div>
            </div>

            <h3 className="font-oswald font-semibold text-white text-3xl mb-1">{project.name}</h3>
            <div className="font-ibm text-white/30 text-xs tracking-widest uppercase mb-5">{project.type}</div>
            <p className="font-ibm text-white/65 text-base leading-relaxed mb-8 flex-1">{project.desc}</p>

            <a href="/cryptometry" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm inline-block self-start cursor-pointer">
              Подробнее о проекте
            </a>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-1 px-1">КЛЮЧЕВЫЕ ХАРАКТЕРИСТИКИ</div>
            {project.features.map((feat, fi) => (
              <div key={fi} className="flex items-center gap-4 p-4 rounded-sm transition-all"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: isCyan ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)", border: `1px solid ${isCyan ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)"}` }}>
                  <Icon name={feat.icon} size={14} style={{ color: accentColor }} />
                </div>
                <span className="font-ibm text-white/60 text-sm">{feat.text}</span>
              </div>
            ))}

            <div className="mt-auto pt-4 border-t border-ksi-border/40">
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-3">ВНУТРЕННИЕ СЛУЖБЫ</div>
              <div className="space-y-1">
                {DIRECTIONS.slice(0, 4).map((d, i) => (
                  <a key={i} href={`/directions/${d.id}`}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-left transition-all group"
                    style={{ background: "transparent" }}>
                    <Icon name={d.icon} size={13} className="text-white/25 group-hover:text-white/50 transition-colors" />
                    <span className="font-ibm text-white/30 text-xs group-hover:text-white/55 transition-colors">{d.title}</span>
                    <Icon name="ArrowRight" size={11} className="ml-auto text-white/15 group-hover:text-white/35 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
