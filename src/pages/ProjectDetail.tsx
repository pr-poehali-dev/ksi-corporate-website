import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { REAL_PROJECTS } from "@/components/ksi/data";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = REAL_PROJECTS.find((p) => p.slug === slug);

  if (!project) return <NotFound />;

  const others = REAL_PROJECTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse, #00d4ff 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Link to="/projects" className="inline-flex items-center gap-2 font-ibm text-white/30 hover:text-white/60 text-sm mb-8 transition-colors">
            <Icon name="ArrowLeft" size={14} />
            Все проекты
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Icon name={project.icon as "Waves"} size={24} className="text-ksi-cyan/60" />
            <span className="font-ibm text-ksi-cyan/60 text-xs tracking-[0.2em] uppercase">
              Кейс обучения виртуального девелопера
            </span>
          </div>

          <h1 className="font-oswald text-5xl md:text-6xl font-semibold text-white mb-4 leading-tight">
            {project.name}
          </h1>
          <div className="font-ibm text-white/40 text-lg mb-2">
            {project.location} · {project.type}
          </div>
          <div className="font-ibm text-white/25 text-base mb-8">
            {project.tagline}
          </div>

          {/* Мета */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Площадь", value: project.area },
              { label: "Формат", value: project.type },
              { label: "Стадия", value: project.stage },
            ].map((item) => (
              <div key={item.label} className="border border-white/10 bg-white/[0.02] px-4 py-2 rounded-sm">
                <div className="font-ibm text-white/25 text-xs mb-0.5">{item.label}</div>
                <div className="font-oswald text-white text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Основной контент */}
            <div className="lg:col-span-2">
              <h2 className="font-oswald text-2xl font-semibold text-white mb-4">О проекте</h2>
              <p className="font-ibm text-white/50 text-base leading-relaxed mb-10">
                {project.description}
              </p>

              <h2 className="font-oswald text-2xl font-semibold text-white mb-4">
                Задачи, поставленные системе
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {project.tasks.map((task) => (
                  <div key={task} className="flex items-center gap-3 p-4 border border-white/8 bg-white/[0.02] rounded-sm">
                    <Icon name="CheckSquare" size={15} className="text-ksi-cyan/50 flex-shrink-0" />
                    <span className="font-ibm text-white/55 text-sm">{task}</span>
                  </div>
                ))}
              </div>

              <h2 className="font-oswald text-2xl font-semibold text-white mb-4">
                Что система изучила
              </h2>
              <div className="space-y-3 mb-10">
                {project.lessons.map((lesson, idx) => (
                  <div key={lesson} className="flex gap-4 p-4 border border-white/8 bg-white/[0.02] rounded-sm">
                    <span className="font-ibm text-ksi-cyan/40 text-xs font-bold mt-0.5 w-6 flex-shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-ibm text-white/55 text-sm">{lesson}</span>
                  </div>
                ))}
              </div>

              {/* Смысловой блок */}
              <div className="border-l-2 border-ksi-cyan/30 pl-6 mb-10">
                <p className="font-ibm text-white/45 text-base leading-relaxed italic">
                  Этот проект — не предложение о продаже. Это кейс, который обогатил виртуального девелопера 
                  реальным пониманием рынка, участка и задач.
                </p>
              </div>
            </div>

            {/* Боковая панель */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="border border-ksi-cyan/20 bg-ksi-cyan/[0.03] p-6 rounded-sm">
                  <h3 className="font-oswald text-white text-lg font-medium mb-3">
                    Поставить похожую задачу
                  </h3>
                  <p className="font-ibm text-white/40 text-sm leading-relaxed mb-5">
                    Если у вас схожий актив или задача — подключитесь к системе и получите результат.
                  </p>
                  <Link to="/early-access" className="btn-primary-ksi block text-center py-3 text-sm rounded-sm">
                    Запросить доступ
                  </Link>
                </div>

                <div className="border border-white/8 bg-white/[0.02] p-6 rounded-sm">
                  <h3 className="font-oswald text-white text-base font-medium mb-3">
                    Параметры кейса
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-ibm text-white/30 text-xs">Регион</span>
                      <span className="font-ibm text-white/55 text-xs">{project.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-ibm text-white/30 text-xs">Площадь</span>
                      <span className="font-ibm text-white/55 text-xs">{project.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-ibm text-white/30 text-xs">Тип</span>
                      <span className="font-ibm text-white/55 text-xs">{project.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-ibm text-white/30 text-xs">Стадия</span>
                      <span className="font-ibm text-white/55 text-xs">{project.stage}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Другие проекты */}
      {others.length > 0 && (
        <section className="py-16 border-t border-white/6">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-oswald text-2xl font-semibold text-white mb-6">Другие кейсы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {others.map((p) => (
                <Link key={p.slug} to={`/projects/${p.slug}`}
                  className="group border border-white/8 bg-white/[0.02] p-6 rounded-sm hover:border-ksi-cyan/25 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name={p.icon as "Waves"} size={18} className="text-ksi-cyan/40" />
                    <span className="font-ibm text-white/25 text-xs">{p.location}</span>
                  </div>
                  <div className="font-oswald text-white font-medium mb-1 group-hover:text-ksi-cyan transition-colors">
                    {p.name}
                  </div>
                  <div className="font-ibm text-white/35 text-sm">{p.tagline}</div>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/projects" className="font-ibm text-ksi-cyan/50 hover:text-ksi-cyan text-sm transition-colors flex items-center gap-1">
                Все проекты <Icon name="ArrowRight" size={13} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <NewFooter />
    </div>
  );
}
