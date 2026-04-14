import Icon from "@/components/ui/icon";

const START_STEPS = [
  { num: "01", icon: "ClipboardList", title: "Пользователь ставит задачу", desc: "Запрос формулируется в терминах бизнеса — найти участок, проанализировать актив, упаковать проект.", color: "#00d4ff" },
  { num: "02", icon: "Cpu", title: "Система определяет компетенцию", desc: "Интеллектуальный контур анализирует задачу и определяет, какие внутренние службы необходимо подключить.", color: "#7b2fff" },
  { num: "03", icon: "Users", title: "Подключаются внутренние службы АО КСИ", desc: "Лаборатория ИИ, Центр реализации, Служба земельного поиска или Студия креатива обеспечивают выполнение.", color: "#7b2fff" },
  { num: "04", icon: "CheckCircle", title: "Формируется прикладной результат", desc: "Результат проходит верификацию и передаётся заказчику — проверенный, доведённый, готовый к применению.", color: "#00d4ff" },
];

const CHAT_EXAMPLES = [
  "Найти участок под ИЖС в Подмосковье до 50 км от МКАД",
  "Проанализировать земельный актив по кадастровому номеру",
  "Подобрать подрядчика для геодезических работ",
  "Рассчитать параметры застройки с учётом льгот",
  "Подготовить концепцию жилого комплекса",
  "Упаковать проект для презентации инвестору",
  "Сопроводить решение по реализации актива",
];

const CONTOURS = [
  { icon: "BrainCircuit", title: "Лаборатория ИИ", desc: "Развитие интеллектуальной инфраструктуры, логики системы и обучающего контура.", color: "#7b2fff", href: "/directions/ai-lab" },
  { icon: "TrendingUp", title: "Центр реализации активов", desc: "Капитализация, партнёрское структурирование и реализация активов в логике КриптоМетров.", color: "#00d4ff", href: "/directions/fee-dev" },
  { icon: "Search", title: "Служба земельного поиска", desc: "Контур поиска площадок, анализа участков и работы с земельными задачами.", color: "#7b2fff", href: "/directions/lss" },
  { icon: "Palette", title: "Студия проектного креатива", desc: "Контур концептуальной, визуальной и презентационной упаковки решений.", color: "#00d4ff", href: "/directions/ai-production" },
];

function HowItWorksBlock() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4">◆ На стартовом этапе</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              Как КриптоМетры<br />работают<br /><span className="text-gradient-main">на старте</span>
            </h2>
            <p className="font-ibm text-white/50 text-lg leading-relaxed mb-6">
              На старте КриптоМетры развиваются не как полностью автономная система,
              а как управляемый интеллектуальный контур, в котором ИИ, внутренняя методология
              и профессиональные службы АО КСИ работают вместе.
            </p>
            <div className="p-4 rounded-sm" style={{ background: "rgba(0,212,255,0.02)", borderLeft: "2px solid rgba(0,212,255,0.25)" }}>
              <p className="font-ibm text-white/38 text-sm leading-relaxed">
                Это гибридная интеллектуальная система под управлением АО КСИ —
                не полностью автономный ИИ и не просто ручной сервис.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {START_STEPS.map((step, i) => (
              <div key={i}>
                <div className="flex items-start gap-4 p-4 rounded-sm"
                  style={{ background: `${step.color}04`, border: `1px solid ${step.color}10` }}>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: `${step.color}10`, border: `1px solid ${step.color}20` }}>
                    <Icon name={step.icon} size={17} style={{ color: step.color, opacity: 0.65 }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="font-mono-ibm text-[9px]" style={{ color: step.color, opacity: 0.5 }}>{step.num}</span>
                      <h4 className="font-oswald text-white/80 text-base font-medium">{step.title}</h4>
                    </div>
                    <p className="font-ibm text-white/35 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < START_STEPS.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div className="w-px h-3" style={{ background: `${step.color}20` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBlock() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,24,1), rgba(10,10,15,1))" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4" style={{ color: "#7b2fff" }}>◆ Интерфейс системы</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              Единый<br /><span className="text-gradient-purple">интеллектуальный</span><br />интерфейс
            </h2>
            <p className="font-ibm text-white/50 text-lg leading-relaxed mb-6">
              В перспективе основным интерфейсом КриптоМетров становится интеллектуальный чат,
              через который пользователь ставит задачи, получает уточнения,
              отслеживает статус и принимает готовые решения.
            </p>
            <div className="space-y-3">
              {[
                "Не нужно разбираться, в какую именно службу обращаться",
                "Система сама направляет задачу в нужный контур",
                "АО КСИ остаётся внутри процесса как управляющая среда",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-ksi-purple/50" />
                  <p className="font-ibm text-white/42 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm overflow-hidden" style={{
            background: "rgba(123,47,255,0.03)",
            border: "1px solid rgba(123,47,255,0.1)",
          }}>
            <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(123,47,255,0.08)" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(123,47,255,0.15)" }}>
                <Icon name="Hexagon" size={13} className="text-ksi-purple/70" />
              </div>
              <span className="font-oswald text-white/60 text-sm">КриптоМетры · Чат</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <div className="p-5 space-y-3">
              <div className="font-mono-ibm text-white/18 text-[10px] tracking-wider mb-3">ПРИМЕРЫ ЗАПРОСОВ</div>
              {CHAT_EXAMPLES.map((ex, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <Icon name="MessageSquare" size={12} className="text-ksi-purple/30 mt-0.5 flex-shrink-0" />
                  <span className="font-ibm text-white/40 text-xs leading-relaxed">{ex}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-3" style={{ borderTop: "1px solid rgba(123,47,255,0.06)", background: "rgba(123,47,255,0.02)" }}>
              <p className="font-ibm text-white/20 text-[11px] text-center">
                Один вход — единый интеллектуальный контур решения задач
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContoursBlock() {
  return (
    <section id="contours" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4">◆ Обеспечивающие контуры</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
          Какие контуры обеспечивают<br /><span className="text-gradient-main">работу системы</span>
        </h2>
        <p className="font-ibm text-white/42 text-lg leading-relaxed mb-12 max-w-2xl">
          КриптоМетры не существуют в отрыве от инфраструктуры.
          Их работу обеспечивают внутренние службы АО КСИ.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {CONTOURS.map((c, i) => (
            <a key={i} href={c.href}
              className="group flex items-start gap-5 p-6 rounded-sm transition-all duration-300 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${c.color}20`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                style={{ background: `${c.color}08`, border: `1px solid ${c.color}18` }}>
                <Icon name={c.icon} size={20} style={{ color: c.color, opacity: 0.7 }} />
              </div>
              <div className="flex-1">
                <h3 className="font-oswald text-white/80 text-lg font-medium mb-2 group-hover:text-white transition-colors">{c.title}</h3>
                <p className="font-ibm text-white/36 text-sm leading-relaxed mb-2">{c.desc}</p>
                <span className="font-oswald text-xs uppercase tracking-wider" style={{ color: c.color, opacity: 0.5 }}>О службе →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CryptometrySystem() {
  return (
    <>
      <HowItWorksBlock />
      <ChatBlock />
      <ContoursBlock />
    </>
  );
}