import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { REAL_PROJECTS } from "./data";

export function ProjectsPreviewSection() {
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-label mb-4">◆ Кейсы обучения</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight">
            Реальные проекты —<br />
            <span className="text-gradient-main">не объекты продажи</span>
          </h2>
          <p className="font-ibm text-white/35 text-sm max-w-xs">
            Каждый проект — это задача, которую система решила и запомнила. Так виртуальный девелопер учится.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {REAL_PROJECTS.map((project, idx) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className={`group relative border border-white/8 bg-white/[0.02] p-6 rounded-sm hover:border-ksi-cyan/30 transition-all duration-300 ${idx === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-sm"
                style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }} />

              <div className="flex items-start justify-between mb-4">
                <Icon name={project.icon as "Waves"} size={22} className="text-ksi-cyan/50" />
                <span className="font-ibm text-xs text-white/25 border border-white/10 px-2 py-0.5 rounded-sm">
                  {project.stage}
                </span>
              </div>

              <h3 className="font-oswald text-xl font-medium text-white mb-1 group-hover:text-ksi-cyan transition-colors">
                {project.name}
              </h3>
              <div className="font-ibm text-white/35 text-sm mb-3">{project.location} · {project.type}</div>
              <div className="font-ibm text-white/25 text-xs mb-4">{project.area}</div>

              <p className="font-ibm text-white/45 text-sm leading-relaxed mb-4">
                {project.tagline}
              </p>

              <div className="flex items-center gap-1 font-ibm text-ksi-cyan/60 text-xs group-hover:text-ksi-cyan transition-colors">
                Смотреть кейс <Icon name="ArrowRight" size={12} />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 border border-white/12 hover:border-white/25 text-white/50 hover:text-white/80 transition-all px-6 py-3 text-sm font-ibm rounded-sm">
            Все проекты
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
