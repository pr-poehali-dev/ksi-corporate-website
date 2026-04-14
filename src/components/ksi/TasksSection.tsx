import Icon from "@/components/ui/icon";

const TASKS = [
  { icon: "MapPin", text: "Поиск земельного участка" },
  { icon: "ScanSearch", text: "Анализ площадки" },
  { icon: "Users", text: "Подбор подрядчика" },
  { icon: "Calculator", text: "Расчёт льготы" },
  { icon: "Palette", text: "Проектная и визуальная упаковка" },
  { icon: "FileText", text: "Сопровождение актива" },
  { icon: "BarChart3", text: "Инвестиционная аналитика" },
  { icon: "Building2", text: "Структурирование проекта" },
];

export function TasksSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-label mb-4 justify-center flex">◆ Прикладные задачи</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
            Задачи, на которые ориентирована<br />
            <span className="text-gradient-main">система КриптоМетры</span>
          </h2>
          <p className="font-ibm text-white/45 text-lg leading-relaxed max-w-2xl mx-auto">
            Система развивается как единый интеллектуальный контур
            для решения прикладных задач девелопмента.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {TASKS.map((task, i) => (
            <div key={i} className="p-5 rounded-sm text-center transition-all duration-300 group"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-sm flex items-center justify-center mx-auto mb-3"
                style={{
                  background: i % 2 === 0 ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)",
                  border: `1px solid ${i % 2 === 0 ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)"}`,
                }}>
                <Icon name={task.icon} size={18}
                  style={{ color: i % 2 === 0 ? "#00d4ff" : "#7b2fff", opacity: 0.65 }} />
              </div>
              <p className="font-ibm text-white/50 text-sm leading-snug">{task.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="font-ibm text-white/25 text-sm max-w-xl mx-auto">
            Это не услуги разных отделов, а примеры задач одной системы.
            Каждая задача обрабатывается единым интеллектуальным контуром КриптоМетров.
          </p>
        </div>
      </div>
    </section>
  );
}
