import { useState } from "react";
import Icon from "@/components/ui/icon";
import { DIRECTIONS, PROJECTS } from "./data";

function DirectionCard({ dir, i, featured = false }: { dir: typeof DIRECTIONS[0]; i: number; featured?: boolean }) {
  const isCyan = dir.color === "cyan";
  const accentColor = isCyan ? "#00d4ff" : "#7b2fff";
  const bgAccent = isCyan ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)";
  const borderAccent = isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)";

  return (
    <div
      className={`card-ksi rounded-sm group cursor-pointer flex flex-col ${featured ? "p-8 row-span-1" : "p-6"}`}
      style={featured ? { borderColor: "rgba(0,212,255,0.3)", boxShadow: "0 0 40px rgba(0,212,255,0.07), 0 8px 32px rgba(0,0,0,0.4)" } : {}}
    >
      {featured && (
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
          <span className="font-mono-ibm text-ksi-cyan text-xs tracking-widest">ФЛАГМАНСКОЕ НАПРАВЛЕНИЕ</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div
          className={`flex items-center justify-center rounded-sm flex-shrink-0 ${featured ? "w-14 h-14" : "w-11 h-11"}`}
          style={{ background: bgAccent, border: `1px solid ${borderAccent}` }}
        >
          <Icon name={dir.icon} size={featured ? 26 : 20} style={{ color: accentColor }} />
        </div>
        <span
          className="font-mono-ibm text-xs px-2 py-1 rounded-sm tracking-wider"
          style={{ background: bgAccent, color: accentColor, border: `1px solid ${borderAccent}` }}
        >
          {dir.stat}
        </span>
      </div>

      <div className="font-mono-ibm text-white/25 text-[10px] tracking-widest mb-1.5 uppercase">{dir.subtitle}</div>
      <h3 className={`font-oswald font-medium text-white leading-tight mb-3 group-hover:text-ksi-cyan transition-colors ${featured ? "text-2xl" : "text-lg"}`}>
        {dir.title}
      </h3>
      <p className={`font-ibm text-white/50 leading-relaxed flex-1 ${featured ? "text-base" : "text-sm"}`}>{dir.desc}</p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {dir.tags.map((tag) => (
          <span
            key={tag}
            className="font-ibm text-[10px] px-2 py-0.5 rounded-sm"
            style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-transparent group-hover:text-ksi-cyan/60 transition-all">
        <span className="font-mono-ibm text-xs tracking-widest">ПОДРОБНЕЕ</span>
        <Icon name="ArrowRight" size={13} />
      </div>
    </div>
  );
}

const DIRECTION_CLUSTERS = [
  {
    id: "core",
    label: "Ядро и платформы",
    desc: "Флагман и операционный центр группы",
    color: "cyan",
    accentColor: "rgba(0,212,255,0.5)",
    borderColor: "rgba(0,212,255,0.15)",
    bgColor: "rgba(0,212,255,0.03)",
    indices: [0, 1, 2, 3],
  },
  {
    id: "analytics",
    label: "Аналитика и операционный контур",
    desc: "Данные, земельный поиск, девелоперский оператор",
    color: "purple",
    accentColor: "rgba(123,47,255,0.5)",
    borderColor: "rgba(123,47,255,0.15)",
    bgColor: "rgba(123,47,255,0.03)",
    indices: [4, 5, 6, 7],
  },
  {
    id: "services",
    label: "Расширяющие сервисы",
    desc: "Лицензирование, консалтинг, медиа, образование",
    color: "dim",
    accentColor: "rgba(255,255,255,0.3)",
    borderColor: "rgba(255,255,255,0.08)",
    bgColor: "rgba(255,255,255,0.015)",
    indices: [8, 9, 10, 11],
  },
];

export function DirectionsSection() {
  return (
    <section id="directions" className="py-32 relative">
      <div className="absolute inset-0 parcel-bg opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="section-label mb-4">◆ Направления деятельности</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
              Карта группы: <span className="text-gradient-purple">12 направлений</span>
            </h2>
            <p className="font-ibm text-white/45 text-base max-w-sm">
              Три уровня экосистемы — от операционного ядра до расширяющих сервисов
            </p>
          </div>
        </div>

        {/* Кластеры */}
        <div className="space-y-10">
          {DIRECTION_CLUSTERS.map((cluster) => (
            <div key={cluster.id}>
              {/* Cluster header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: cluster.accentColor }} />
                  <span className="font-oswald text-white text-lg font-semibold">{cluster.label}</span>
                </div>
                <div className="flex-1 h-px" style={{ background: cluster.borderColor }} />
                <span className="font-ibm text-xs flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>{cluster.desc}</span>
              </div>

              {/* Cards grid */}
              <div className={`grid gap-4 ${cluster.id === "core" ? "grid-cols-1 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-4"}`}>
                {cluster.indices.map((idx) => {
                  const dir = DIRECTIONS[idx];
                  if (!dir) return null;
                  const isFeature = idx === 0;
                  return (
                    <a key={dir.id} href={`/directions/${dir.id}`}
                      className={`group rounded-sm cursor-pointer flex flex-col transition-all ${isFeature ? "lg:col-span-2 p-7" : "p-5"}`}
                      style={{ background: cluster.bgColor, border: `1px solid ${cluster.borderColor}` }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = cluster.accentColor)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = cluster.borderColor)}
                    >
                      {isFeature && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
                          <span className="font-mono-ibm text-ksi-cyan text-xs tracking-widest">ФЛАГМАН</span>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                          style={{ background: `${cluster.accentColor}18`, border: `1px solid ${cluster.accentColor}40` }}>
                          <Icon name={dir.icon} size={18} style={{ color: cluster.accentColor }} />
                        </div>
                        <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm"
                          style={{ color: cluster.accentColor, background: `${cluster.accentColor}12`, border: `1px solid ${cluster.accentColor}30` }}>
                          {dir.stat}
                        </span>
                      </div>
                      <h3 className={`font-oswald font-medium text-white leading-tight mb-2 group-hover:text-ksi-cyan transition-colors ${isFeature ? "text-xl" : "text-base"}`}>
                        {dir.title}
                      </h3>
                      <p className="font-ibm text-white/45 text-xs leading-relaxed flex-1">{dir.desc.slice(0, 90)}{dir.desc.length > 90 ? "…" : ""}</p>
                      <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-60 transition-opacity">
                        <span className="font-mono-ibm text-xs text-white tracking-widest">Подробнее</span>
                        <Icon name="ArrowRight" size={11} className="text-white" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="/directions" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">
            Все направления →
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
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-14">
          <div className="section-label mb-4">◆ Прикладные продукты</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
              Операционное ядро <span className="text-gradient-cyan">группы</span>
            </h2>
            <p className="font-ibm text-white/45 text-base max-w-sm">
              Пять прикладных продуктов для работы с земельными активами, девелоперской средой и цифровой инфраструктурой
            </p>
          </div>
        </div>

        {/* Табы */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          {PROJECTS.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
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

        {/* Основной блок */}
        <div className="grid lg:grid-cols-5 gap-6 transition-all duration-300">

          {/* Левая панель — детали активного проекта */}
          <div className="lg:col-span-3 card-ksi rounded-sm p-8 flex flex-col" style={{ borderColor: isCyan ? "rgba(0,212,255,0.25)" : "rgba(123,47,255,0.25)", boxShadow: `0 0 50px ${isCyan ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)"}` }}>
            {/* Шапка */}
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

            <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm inline-block self-start cursor-pointer" style={!isCyan ? { background: "linear-gradient(135deg, #7b2fff, #a855f7)", color: "#fff" } : {}}>
              Узнать подробнее
            </a>
          </div>

          {/* Правая панель — возможности */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-1 px-1">Применение</div>
            {project.features.map((feat, fi) => (
              <div
                key={fi}
                className="flex items-center gap-4 p-4 rounded-sm transition-all"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: isCyan ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)", border: `1px solid ${isCyan ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)"}` }}>
                  <Icon name={feat.icon} size={14} style={{ color: accentColor }} />
                </div>
                <span className="font-ibm text-white/60 text-sm">{feat.text}</span>
              </div>
            ))}

            {/* Мини-навигация по проектам */}
            <div className="mt-auto pt-4 border-t border-ksi-border/40">
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-3">ДРУГИЕ ПРОДУКТЫ</div>
              <div className="space-y-1">
                {PROJECTS.filter((_, i) => i !== activeIdx).slice(0, 3).map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(PROJECTS.indexOf(p))}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-left transition-all hover:bg-white/3 group"
                    style={{ background: "transparent" }}
                  >
                    <Icon name={p.icon} size={13} className="text-white/25 group-hover:text-white/50 transition-colors" />
                    <span className="font-ibm text-white/30 text-xs group-hover:text-white/55 transition-colors">{p.name}</span>
                    <Icon name="ArrowRight" size={11} className="ml-auto text-white/15 group-hover:text-white/35 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}