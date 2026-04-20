import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { REAL_PROJECTS } from "@/components/ksi/data";
import { Reveal } from "./Reveal";

export function ProjectsSection() {
  return (
    <section className="py-24 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal delay={0}>
          <div className="section-label mb-4">◆ 5 контуров обучения</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight">
              5 реальных проектов.<br />
              <span className="text-gradient-main">5 кейсов обучения.</span>
            </h2>
            <Link to="/projects" className="font-ibm text-ksi-cyan/55 hover:text-ksi-cyan text-sm flex items-center gap-1 transition-colors self-start md:self-auto flex-shrink-0">
              Все проекты <Icon name="ArrowRight" size={13} />
            </Link>
          </div>
          <p className="font-ibm text-white/35 text-base mb-12 max-w-2xl">
            Каждый из этих проектов — не объект продажи. Это реальная задача, которую система решила
            и запомнила. Так строится интеллект виртуального девелопера.
          </p>
        </Reveal>

        {/* Сетка проектов */}
        <Reveal delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REAL_PROJECTS.map((project, idx) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className={`group relative border border-white/8 bg-white/[0.02] p-6 rounded-sm hover:border-ksi-cyan/30 transition-all duration-300 flex flex-col ${idx === 0 ? "lg:col-span-2" : ""}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top right, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />

                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Icon name={project.icon as "Waves"} size={20} className="text-ksi-cyan/45" />
                    <span className="font-ibm text-white/20 text-xs">{project.location}</span>
                  </div>
                  <span className="font-ibm text-[10px] text-white/22 border border-white/8 px-2 py-0.5 rounded-sm tracking-[0.1em] uppercase">
                    {project.stage}
                  </span>
                </div>

                <h3 className="font-oswald text-2xl font-semibold text-white mb-1 group-hover:text-ksi-cyan transition-colors duration-200">
                  {project.name}
                </h3>
                <div className="font-ibm text-white/30 text-sm mb-4">{project.type} · {project.area}</div>
                <p className="font-ibm text-white/45 text-sm leading-relaxed mb-5 flex-1">
                  {project.tagline}
                </p>

                {/* Что изучила система */}
                <div className="border-t border-white/6 pt-4">
                  <div className="font-ibm text-white/18 text-[10px] tracking-[0.15em] uppercase mb-2">Система изучила</div>
                  <div className="flex flex-wrap gap-2">
                    {project.lessons.slice(0, 2).map((l) => (
                      <span key={l} className="font-ibm text-xs text-white/32 bg-white/[0.04] border border-white/6 px-2.5 py-1 rounded-sm">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 font-ibm text-ksi-cyan/45 text-xs group-hover:text-ksi-cyan transition-colors mt-4">
                  Открыть кейс <Icon name="ArrowRight" size={11} />
                </div>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* CTA под проектами */}
        <Reveal delay={200}>
          <div className="mt-6 border border-white/8 bg-white/[0.015] p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-ibm text-white/38 text-sm">
              Ваш актив может стать следующим обучающим кейсом виртуального девелопера.
            </p>
            <Link to="/early-access" className="btn-primary-ksi px-6 py-2.5 text-sm rounded-sm flex-shrink-0">
              Поставить задачу
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}