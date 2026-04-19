import Icon from "@/components/ui/icon";

const PILLARS = [
  {
    icon: "Blocks",
    color: "#00d4ff",
    label: "Принцип 1",
    title: "Blockchain-мониторинг",
    subtitle: "«Чёрный ящик» проекта — в реальном времени",
    desc:
      "Каждое действие сотрудника, каждое решение ИИ и каждая финансовая транзакция записываются в блокчейн. Это неизменяемый журнал проекта, доступный инвестору 24/7.",
    facts: [
      "Неизменяемая запись событий",
      "Онлайн-доступ инвестора к контуру",
      "Автоматический аудит и сверка",
    ],
  },
  {
    icon: "Handshake",
    color: "#a070ff",
    label: "Принцип 2",
    title: "Fee-Development",
    subtitle: "Лучшие на рынке строители — под нашим контролем",
    desc:
      "Мы не конкурируем со строителями. Мы нанимаем лидеров рынка для реализации наших упакованных проектов. Вы получаете экспертизу топовых застройщиков под присмотром нашего цифрового аудитора.",
    facts: [
      "Осознанный выбор в пользу эффективности",
      "Экспертиза профильных застройщиков",
      "Контроль через цифрового аудитора",
    ],
  },
];

export function TrustArchitectureSection() {
  return (
    <section
      id="trust"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,10,20,1), rgba(10,10,15,1))" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="section-label mb-4">◆ Архитектура доверия</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Технологический контроль<br />
            <span className="text-gradient-main">и прозрачность</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed">
            Виртуальный девелопмент АО КСИ опирается на два фундаментальных принципа,
            снижающих человеческий фактор и коррупционные риски.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className="p-8 rounded-sm relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: `1px solid ${p.color}22`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}70, transparent)` }}
              />

              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center"
                  style={{ background: `${p.color}10`, border: `1px solid ${p.color}30` }}
                >
                  <Icon name={p.icon} size={22} style={{ color: p.color }} />
                </div>
                <div
                  className="px-3 py-1 rounded-sm font-mono-ibm text-[10px] tracking-widest uppercase"
                  style={{
                    background: `${p.color}08`,
                    border: `1px solid ${p.color}25`,
                    color: p.color,
                  }}
                >
                  {p.label}
                </div>
              </div>

              <h3 className="font-oswald text-white text-2xl font-medium leading-tight mb-2">
                {p.title}
              </h3>
              <div
                className="font-ibm italic text-sm mb-5 leading-snug"
                style={{ color: p.color, opacity: 0.85 }}
              >
                {p.subtitle}
              </div>

              <p className="font-ibm text-white/55 text-sm leading-relaxed mb-5">
                {p.desc}
              </p>

              <ul className="space-y-2.5">
                {p.facts.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 font-ibm text-white/55 text-sm leading-relaxed">
                    <Icon name="ShieldCheck" size={14} style={{ color: p.color, opacity: 0.75 }} className="mt-[3px] flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="p-6 rounded-sm flex items-start gap-4"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}
        >
          <Icon name="Lightbulb" size={22} className="text-ksi-cyan flex-shrink-0 mt-[2px]" />
          <p className="font-ibm text-white/65 text-base leading-relaxed">
            <span className="text-white/90 font-medium">Аналогия:</span> Apple не собирает телефоны сам —
            он проектирует, задаёт стандарт и контролирует Foxconn. АО КСИ действует так же:
            мы не конкурируем со строителями, а задаём цифровой стандарт и контролируем реализацию.
          </p>
        </div>
      </div>
    </section>
  );
}
