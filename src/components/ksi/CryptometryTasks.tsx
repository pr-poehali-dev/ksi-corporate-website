import Icon from "@/components/ui/icon";

const TASKS = [
  { icon: "MapPin", text: "Поиск земельного участка" },
  { icon: "ScanSearch", text: "Анализ площадки" },
  { icon: "FileText", text: "Первичная упаковка актива" },
  { icon: "Users", text: "Подбор подрядчика" },
  { icon: "Calculator", text: "Расчёт льгот и параметров" },
  { icon: "Presentation", text: "Подготовка презентации" },
  { icon: "Palette", text: "Визуальная упаковка проекта" },
  { icon: "TrendingUp", text: "Сопровождение логики реализации" },
];

const STAGES = [
  { num: "01", title: "Формирование внутренних служб и прикладных контуров", icon: "Users", status: "active" },
  { num: "02", title: "Решение реальных задач через управляемую гибридную модель", icon: "Wrench", status: "active" },
  { num: "03", title: "Интеграция функций в единый интеллектуальный интерфейс", icon: "Puzzle", status: "next" },
  { num: "04", title: "КриптоМетры как целостная система распределённого девелопмента", icon: "Hexagon", status: "planned" },
];

function TasksBlock() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,14,26,1), rgba(10,10,15,1))" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="section-label mb-4 justify-center flex">◆ Задачи</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
            На какие задачи ориентированы<br /><span className="text-gradient-cyan">КриптоМетры</span>
          </h2>
          <p className="font-ibm text-white/42 text-base max-w-2xl mx-auto">
            Это не список услуг. Это типы задач, которые система учится решать —
            комплексно, через единую интеллектуальную среду.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {TASKS.map((t, i) => (
            <div key={i} className="p-5 rounded-sm text-center"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-sm flex items-center justify-center mx-auto mb-3"
                style={{
                  background: i % 2 === 0 ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)",
                  border: `1px solid ${i % 2 === 0 ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)"}`,
                }}>
                <Icon name={t.icon} size={17} style={{ color: i % 2 === 0 ? "#00d4ff" : "#7b2fff", opacity: 0.6 }} />
              </div>
              <p className="font-ibm text-white/48 text-sm leading-snug">{t.text}</p>
            </div>
          ))}
        </div>
        <p className="font-ibm text-white/22 text-sm text-center mt-8">
          Это примеры задач единой системы, а не перечень услуг разных отделов.
        </p>
      </div>
    </section>
  );
}

function RoadmapBlock() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-25" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="section-label mb-4 justify-center flex">◆ Развитие</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
            От стартовых контуров —<br /><span className="text-gradient-main">к системе нового типа</span>
          </h2>
          <p className="font-ibm text-white/42 text-base max-w-2xl mx-auto">
            КриптоМетры развиваются поэтапно: от отдельных функций и внутренних служб —
            к целостной интеллектуальной системе распределённого девелопмента.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {STAGES.map((s, i) => {
            const color = s.status === "planned" ? "rgba(255,255,255,0.15)" : s.status === "next" ? "#7b2fff" : "#00d4ff";
            return (
              <div key={i} className="flex items-center gap-5 p-5 rounded-sm"
                style={{
                  background: s.status === "active" ? "rgba(0,212,255,0.02)" : "rgba(255,255,255,0.01)",
                  border: `1px solid ${s.status === "active" ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.05)"}`,
                }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon name={s.icon} size={16} style={{ color, opacity: s.status === "planned" ? 0.4 : 0.7 }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-oswald text-white/75 text-base font-medium">{s.title}</h4>
                </div>
                <span className="font-mono-ibm text-[9px] tracking-wider flex-shrink-0"
                  style={{ color, opacity: 0.6 }}>
                  {s.status === "active" ? "СЕЙЧАС" : s.status === "next" ? "ДАЛЕЕ" : `ЭТАП ${s.num}`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a href="/roadmap" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
            Смотреть roadmap
          </a>
        </div>
      </div>
    </section>
  );
}

function AccountingBlock() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,22,1), rgba(10,10,15,1))" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="section-label mb-4">◆ Инфраструктура</div>
          <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight mb-5">
            Внутренний контур<br /><span className="text-gradient-main">учёта и доступа</span>
          </h2>
          <p className="font-ibm text-white/48 text-base leading-relaxed mb-5">
            По мере развития системы в КриптоМетрах формируется собственный внутренний
            контур учёта, доступа и управления, необходимый для работы модулей,
            задач и пользовательских сценариев.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "Layers", title: "Учёт", desc: "Внутренняя единица учёта для расчётов внутри системы" },
              { icon: "Key", title: "Доступ", desc: "Управление доступом к модулям и контурам системы" },
              { icon: "Settings2", title: "Управление", desc: "Настройка параметров работы для каждого пользователя" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-sm"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <Icon name={item.icon} size={18} className="text-ksi-cyan/50 mb-3" />
                <div className="font-oswald text-white/65 text-sm font-medium mb-1">{item.title}</div>
                <p className="font-ibm text-white/30 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CryptometryTasks() {
  return (
    <>
      <TasksBlock />
      <RoadmapBlock />
      <AccountingBlock />
    </>
  );
}
