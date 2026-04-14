import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

/* ─── БЛОК 1. HERO ─── */
function HeroBlock() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,212,255,0.06), transparent)" }} />
      <div className="absolute inset-0 topo-bg pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="section-label mb-5">◆ Ключевой проект АО КСИ</div>
          <h1 className="font-oswald font-bold text-5xl md:text-6xl xl:text-7xl leading-tight mb-3">
            <span className="text-white">КриптоМетры</span>
          </h1>
          <h2 className="font-oswald font-medium text-xl md:text-2xl xl:text-3xl leading-snug mb-8">
            <span className="text-gradient-cyan">Интеллектуальная система</span><br />
            <span className="text-white/75">распределённого девелопмента</span>
          </h2>
          <p className="font-ibm text-white/50 text-lg leading-relaxed mb-10 max-w-2xl">
            КриптоМетры — ключевой проект АО КСИ, в рамках которого создаётся система
            нового типа: единая интеллектуальная среда для решения задач девелопмента,
            недвижимости и земельно-имущественного контура.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#how-it-works" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              Как работает система
            </a>
            <a href="#contours" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              Внутренние контуры
            </a>
            <a href="#beta" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer"
              style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
              Участвовать в бета-тестировании
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── БЛОК 2. ЧТО ТАКОЕ КРИПТОМЕТРЫ ─── */
const WHAT_IS = [
  { icon: "Layers", text: "Единая интеллектуальная система, а не набор разрозненных функций" },
  { icon: "GitBranch", text: "Распределённая логика девелопмента — задачи, активы, компетенции в одной среде" },
  { icon: "Target", text: "Система решения задач, а не каталог услуг" },
  { icon: "TrendingUp", text: "Развитие от стартовых контуров к целостной модели виртуального девелопера" },
  { icon: "Building", text: "Прямая связь с управляющим и операторским контуром АО КСИ" },
];

function WhatIsBlock() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4">◆ О системе</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Что такое<br /><span className="text-gradient-cyan">КриптоМетры</span>
            </h2>
            <p className="font-ibm text-white/50 text-lg leading-relaxed">
              КриптоМетры — это не просто цифровой интерфейс и не набор разрозненных функций.
              Это интеллектуальная система распределённого девелопмента, в которой задачи,
              компетенции, внутренние службы и прикладные контуры собираются в единую среду.
            </p>
          </div>
          <div className="space-y-3">
            {WHAT_IS.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-sm"
                style={{ background: "rgba(0,212,255,0.02)", border: "1px solid rgba(0,212,255,0.08)" }}>
                <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                  <Icon name={item.icon} size={15} className="text-ksi-cyan/65" />
                </div>
                <p className="font-ibm text-white/48 text-sm leading-relaxed pt-1.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── БЛОК 3. ЗАЧЕМ СОЗДАЁТСЯ ─── */
const WHY_ITEMS = [
  "Снижение хаоса в девелоперских процессах",
  "Переход от разрозненных действий к единой интеллектуальной системе",
  "Интеграция аналитики, поиска, упаковки, сопровождения и реализации",
  "Накопление компетенций внутри одной среды",
  "Создание базы для будущего виртуального девелопера",
];

function WhyBlock() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,14,26,1), rgba(10,10,15,1))" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="section-label mb-4 justify-center flex">◆ Замысел</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Зачем создаются<br /><span className="text-gradient-main">КриптоМетры</span>
          </h2>
          <p className="font-ibm text-white/45 text-lg leading-relaxed">
            Классический девелопмент опирается на множество разрозненных функций, подрядчиков,
            процессов и точек принятия решений. КриптоМетры создаются как интеллектуальная
            система, которая со временем сможет собрать ключевые контуры этой среды в единую логику.
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {WHY_ITEMS.map((text, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-sm"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: i % 2 === 0 ? "#00d4ff" : "#7b2fff", opacity: 0.5 }} />
              <p className="font-ibm text-white/50 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── БЛОК 4. КАК РАБОТАЕТ НА СТАРТЕ ─── */
const START_STEPS = [
  { num: "01", icon: "ClipboardList", title: "Пользователь ставит задачу", desc: "Запрос формулируется в терминах бизнеса — найти участок, проанализировать актив, упаковать проект.", color: "#00d4ff" },
  { num: "02", icon: "Cpu", title: "Система определяет компетенцию", desc: "Интеллектуальный контур анализирует задачу и определяет, какие внутренние службы необходимо подключить.", color: "#7b2fff" },
  { num: "03", icon: "Users", title: "Подключаются внутренние службы АО КСИ", desc: "Лаборатория ИИ, Центр реализации, Служба земельного поиска или Студия креатива обеспечивают выполнение.", color: "#7b2fff" },
  { num: "04", icon: "CheckCircle", title: "Формируется прикладной результат", desc: "Результат проходит верификацию и передаётся заказчику — проверенный, доведённый, готовый к применению.", color: "#00d4ff" },
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
                <div className="flex items-start gap-4 p-5 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex-shrink-0 w-11 h-11 rounded-sm flex items-center justify-center"
                    style={{ background: `${step.color}10`, border: `1px solid ${step.color}18` }}>
                    <Icon name={step.icon} size={18} style={{ color: step.color, opacity: 0.7 }} />
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

/* ─── БЛОК 5. ЧАТ КАК ИНТЕРФЕЙС ─── */
const CHAT_EXAMPLES = [
  "Найти участок под ИЖС в Подмосковье до 50 км от МКАД",
  "Проанализировать земельный актив по кадастровому номеру",
  "Подобрать подрядчика для геодезических работ",
  "Рассчитать параметры застройки с учётом льгот",
  "Подготовить концепцию жилого комплекса",
  "Упаковать проект для презентации инвестору",
  "Сопроводить решение по реализации актива",
];

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

          {/* Визуализация чата */}
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

/* ─── БЛОК 6. ВНУТРЕННИЕ КОНТУРЫ ─── */
const CONTOURS = [
  { icon: "BrainCircuit", title: "Лаборатория ИИ", desc: "Развитие интеллектуальной инфраструктуры, логики системы и обучающего контура.", color: "#7b2fff", href: "/directions/ai-lab" },
  { icon: "TrendingUp", title: "Центр реализации активов", desc: "Контур сопровождения и реализации активов в логике КриптоМетров.", color: "#00d4ff", href: "/directions/fee-dev" },
  { icon: "Search", title: "Служба земельного поиска", desc: "Контур поиска площадок, анализа участков и работы с земельными задачами.", color: "#7b2fff", href: "/directions/lss" },
  { icon: "Palette", title: "Студия проектного креатива", desc: "Контур концептуальной, визуальной и презентационной упаковки решений.", color: "#00d4ff", href: "/directions/ai-production" },
];

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

/* ─── БЛОК 7. ЗАДАЧИ СИСТЕМЫ ─── */
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
            Система развивается как единый интеллектуальный контур для решения
            девелоперских задач разного уровня.
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

/* ─── БЛОК 8. ЭТАПЫ РАЗВИТИЯ ─── */
const STAGES = [
  { num: "01", title: "Формирование внутренних служб и прикладных контуров", icon: "Users", status: "active" },
  { num: "02", title: "Решение реальных задач через управляемую гибридную модель", icon: "Wrench", status: "active" },
  { num: "03", title: "Интеграция функций в единый интеллектуальный интерфейс", icon: "Puzzle", status: "next" },
  { num: "04", title: "КриптоМетры как целостная система распределённого девелопмента", icon: "Hexagon", status: "planned" },
];

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

/* ─── БЛОК 9. ВНУТРЕННИЙ КОНТУР УЧЁТА ─── */
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

/* ─── БЛОК 10. БЕТА-ТЕСТИРОВАНИЕ ─── */
function BetaBlock() {
  return (
    <section id="beta" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.03), transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4">◆ Участие</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              Принять участие<br /><span className="text-gradient-main">в развитии системы</span>
            </h2>
            <p className="font-ibm text-white/48 text-lg leading-relaxed mb-8">
              АО КСИ приглашает девелоперов, владельцев активов и профессиональных участников
              рынка к участию в тестировании, обучении и настройке КриптоМетров
              на реальных прикладных задачах.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
                Принять участие
              </a>
              <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
                Обсудить тестирование
              </a>
              <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer"
                style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
                Связаться с командой
              </a>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { icon: "FlaskConical", text: "Подключение к бета-тестированию отдельных контуров" },
              { icon: "Settings2", text: "Участие в настройке и обучении системы" },
              { icon: "GitBranch", text: "Проверка прикладных сценариев на реальных данных" },
              { icon: "ClipboardList", text: "Интеграция реальных девелоперских задач" },
              { icon: "Rocket", text: "Участие в развитии будущего виртуального девелопера" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-sm"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{
                    background: i % 2 === 0 ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)"}`,
                  }}>
                  <Icon name={item.icon} size={15}
                    style={{ color: i % 2 === 0 ? "#00d4ff" : "#7b2fff", opacity: 0.6 }} />
                </div>
                <p className="font-ibm text-white/48 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── БЛОК 11. ФИЛОСОФИЯ ─── */
function PhilosophyBlock() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,20,1))" }}>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4 text-center flex justify-center">◆ Замысел</div>
        <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight mb-8 text-center">
          Почему это<br /><span className="text-gradient-main">важно</span>
        </h2>
        <p className="font-ibm text-white/48 text-base leading-relaxed mb-5">
          КриптоМетры создаются как попытка собрать в одной интеллектуальной системе то,
          что в классическом девелопменте часто существует разрозненно: знания, процессы,
          решения, исполнение и профессиональную ответственность.
        </p>
        <p className="font-ibm text-white/30 text-sm leading-relaxed">
          Это не обещание мгновенного результата. Это долгосрочная инженерная задача,
          решение которой проходит через практику — через реальные задачи, реальные службы
          и реальное развитие интеллектуальных контуров.
        </p>
      </div>
    </section>
  );
}

/* ─── СТРАНИЦА ─── */
export default function Cryptometry() {
  return (
    <PageLayout breadcrumb={[{ label: "Проект КриптоМетры" }]}>
      <HeroBlock />
      <WhatIsBlock />
      <WhyBlock />
      <HowItWorksBlock />
      <ChatBlock />
      <ContoursBlock />
      <TasksBlock />
      <RoadmapBlock />
      <AccountingBlock />
      <BetaBlock />
      <PhilosophyBlock />
    </PageLayout>
  );
}
