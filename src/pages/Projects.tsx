import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    icon: "BrainCircuit",
    title: "Лаборатория ИИ",
    role: "Технологическое ядро",
    desc: "Интеллектуальная инфраструктура, настройка, обучение и развитие системы.",
    color: "#7b2fff",
    status: "R&D",
    href: "/directions/ai-lab",
  },
  {
    icon: "TrendingUp",
    title: "Центр реализации активов",
    role: "Операторский контур",
    desc: "Сопровождение и реализация активов в логике проекта.",
    color: "#00d4ff",
    status: "Активна",
    href: "/directions/fee-dev",
  },
  {
    icon: "Search",
    title: "Служба земельного поиска",
    role: "Земельный контур",
    desc: "Поиск участков, анализ площадок и земельно-имущественные задачи.",
    color: "#7b2fff",
    status: "Beta",
    href: "/directions/lss",
  },
  {
    icon: "Palette",
    title: "Студия проектного креатива",
    role: "Креативный контур",
    desc: "Визуальная, концептуальная и презентационная упаковка решений.",
    color: "#00d4ff",
    status: "Активна",
    href: "/directions/ai-production",
  },
];

export default function Projects() {
  return (
    <PageLayout breadcrumb={[{ label: "Проекты" }]}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Проекты АО КСИ</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Один проект.<br />
              <span className="text-gradient-cyan">Четыре внутренние службы.</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              АО КСИ развивает единственный ключевой проект — КриптоМетры.
              Четыре внутренние службы обеспечивают его работу и развитие.
            </p>
          </div>
        </div>
      </section>

      {/* КриптоМетры — ключевой проект */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <a href="/cryptometry" className="block group">
            <div className="rounded-sm p-8 md:p-10" style={{ background: "rgba(0,212,255,0.02)", border: "1px solid rgba(0,212,255,0.15)", boxShadow: "0 0 50px rgba(0,212,255,0.04)" }}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
                  <span className="font-mono-ibm text-ksi-cyan/70 text-xs tracking-widest">КЛЮЧЕВОЙ ПРОЕКТ</span>
                </div>
                <span className="font-mono-ibm text-xs px-2.5 py-1 rounded-sm" style={{ background: "rgba(0,212,255,0.08)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}>Развитие</span>
              </div>

              <div className="grid lg:grid-cols-5 gap-10 items-center">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-sm flex items-center justify-center" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                      <Icon name="Hexagon" size={28} className="text-ksi-cyan" />
                    </div>
                    <div>
                      <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white group-hover:text-ksi-cyan transition-colors">КриптоМетры</h2>
                      <div className="font-ibm text-white/25 text-xs tracking-widest uppercase mt-1">Интеллектуальная система распределённого девелопмента</div>
                    </div>
                  </div>
                  <p className="font-ibm text-white/55 text-base leading-relaxed mb-6">
                    Ключевой проект АО КСИ, в рамках которого создаётся система нового типа:
                    единая интеллектуальная среда для решения задач девелопмента, недвижимости
                    и земельно-имущественного контура.
                  </p>
                  <span className="font-oswald text-ksi-cyan/50 text-xs uppercase tracking-wider group-hover:text-ksi-cyan transition-colors flex items-center gap-2">
                    Подробнее о проекте <Icon name="ArrowRight" size={13} />
                  </span>
                </div>

                <div className="lg:col-span-2 space-y-2">
                  {[
                    { icon: "Layers", text: "Единая интеллектуальная система" },
                    { icon: "GitBranch", text: "Распределённая логика девелопмента" },
                    { icon: "BrainCircuit", text: "Гибридная модель ИИ и операторов" },
                    { icon: "Users", text: "Внутренние службы АО КСИ" },
                    { icon: "Target", text: "Решение реальных задач" },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                        <Icon name={f.icon} size={13} className="text-ksi-cyan/60" />
                      </div>
                      <span className="font-ibm text-white/48 text-sm">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Внутренние службы */}
      <section className="py-20 border-t border-ksi-border/30"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,14,26,1), rgba(10,10,15,1))" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Обеспечивающие контуры</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-3">Внутренние службы</h2>
          <p className="font-ibm text-white/42 text-base mb-12 max-w-2xl">
            Четыре службы АО КСИ обеспечивают работу и развитие КриптоМетров.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => {
              const statusColor = s.status === "R&D" ? "#c050ff" : s.status === "Beta" ? "#7b2fff" : "#00d4ff";
              return (
                <a key={i} href={s.href} className="group block">
                  <div className="p-6 rounded-sm h-full transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${s.color}20`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-sm flex items-center justify-center"
                        style={{ background: `${s.color}08`, border: `1px solid ${s.color}18` }}>
                        <Icon name={s.icon} size={20} style={{ color: s.color, opacity: 0.75 }} />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                        <span className="font-mono-ibm text-xs" style={{ color: statusColor, opacity: 0.7 }}>{s.status}</span>
                      </div>
                    </div>
                    <div className="font-ibm text-white/20 text-[10px] tracking-widest uppercase mb-1">{s.role}</div>
                    <h3 className="font-oswald text-white/80 text-lg font-medium mb-2 group-hover:text-white transition-colors">{s.title}</h3>
                    <p className="font-ibm text-white/38 text-sm leading-relaxed mb-3">{s.desc}</p>
                    <span className="font-oswald text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.color }}>
                      Подробнее →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-oswald text-3xl font-semibold text-white mb-4">
            Обсудить задачу<br /><span className="text-gradient-main">или участие в проекте</span>
          </h2>
          <p className="font-ibm text-white/40 text-base mb-8">
            Если вам близка идея интеллектуального девелопмента — команда открыта к диалогу.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">Связаться с командой</a>
            <a href="/ecosystem" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">Архитектура проекта</a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
