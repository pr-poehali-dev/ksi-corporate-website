import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { REAL_PROJECTS } from "@/components/ksi/data";

export default function ProjectsList() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse, #00d4ff 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="section-label mb-4">◆ Кейсы обучения</div>
          <h1 className="font-oswald text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
            Проекты АО КСИ —<br /><span className="text-gradient-main">не объекты продажи</span>
          </h1>
          <p className="font-ibm text-white/45 text-lg max-w-2xl">
            Каждый проект — это задача, которую виртуальный девелопер решил и запомнил. 
            Это кейсы обучения системы. Реальные активы, реальные задачи, реальный интеллект.
          </p>
        </div>
      </section>

      {/* Проекты */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {REAL_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="group relative border border-white/8 bg-white/[0.02] p-8 rounded-sm hover:border-ksi-cyan/30 transition-all duration-300 flex flex-col"
              >
                <div className="absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-sm"
                  style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }} />

                <div className="flex items-start justify-between mb-6">
                  <Icon name={project.icon as "Waves"} size={28} className="text-ksi-cyan/50" />
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-ibm text-xs text-white/25 border border-white/10 px-2 py-0.5 rounded-sm">
                      {project.stage}
                    </span>
                    <span className="font-ibm text-xs text-white/20">{project.area}</span>
                  </div>
                </div>

                <h2 className="font-oswald text-2xl font-semibold text-white mb-1 group-hover:text-ksi-cyan transition-colors">
                  {project.name}
                </h2>
                <div className="font-ibm text-white/35 text-sm mb-4">
                  {project.location} · {project.type}
                </div>
                <p className="font-ibm text-white/45 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="border-t border-white/6 pt-4">
                  <div className="font-ibm text-white/20 text-xs tracking-[0.1em] uppercase mb-2">Система изучила</div>
                  <div className="flex flex-wrap gap-2">
                    {project.lessons.slice(0, 2).map((l) => (
                      <span key={l} className="font-ibm text-xs text-white/35 bg-white/[0.04] border border-white/8 px-2 py-1 rounded-sm">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 font-ibm text-ksi-cyan/50 text-xs group-hover:text-ksi-cyan transition-colors mt-4">
                  Открыть кейс <Icon name="ArrowRight" size={12} />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="border border-white/8 bg-white/[0.02] p-8 rounded-sm text-center">
            <Icon name="Plus" size={24} className="text-ksi-cyan/40 mx-auto mb-4" />
            <h3 className="font-oswald text-2xl font-semibold text-white mb-2">
              Поставить задачу по своему проекту
            </h3>
            <p className="font-ibm text-white/40 text-sm mb-6 max-w-md mx-auto">
              Ваш актив или проект может стать следующим обучающим кейсом виртуального девелопера.
            </p>
            <Link to="/early-access" className="btn-primary-ksi inline-flex px-8 py-3 text-sm rounded-sm">
              Запросить ранний доступ
            </Link>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
