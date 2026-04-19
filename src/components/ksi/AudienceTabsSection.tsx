import { useState } from "react";
import Icon from "@/components/ui/icon";

const TABS = [
  {
    id: "land",
    label: "Землевладельцам",
    icon: "MapPin",
    color: "#00d4ff",
    desc: "АО КСИ помогает землевладельцам и инициаторам проектов подготовить актив к рынку, оценить сценарии реализации и встроить участок в понятную девелоперскую логику.",
    points: [
      { icon: "ScanSearch", text: "Первичный анализ участка и потенциала" },
      { icon: "Package", text: "Упаковка актива в форму для переговоров" },
      { icon: "Route", text: "Поиск сценария реализации" },
      { icon: "Users", text: "Подготовка к диалогу с девелоперами и инвесторами" },
      { icon: "Link", text: "Подключение к контуру КриптоМетров" },
    ],
    cta: "Обсудить участок",
    href: "/contacts?topic=land",
  },
  {
    id: "developer",
    label: "Девелоперам",
    icon: "Building2",
    color: "#a070ff",
    desc: "АО КСИ помогает девелоперам усиливать существующие процессы через прикладные службы, интеллектуальные контуры и пилотные сценарии виртуального девелопера.",
    points: [
      { icon: "Search", text: "Поиск площадок и усиление земельного развития" },
      { icon: "Presentation", text: "Упаковка проектов и презентационные материалы" },
      { icon: "Lightbulb", text: "Проверка гипотез и первичная визуализация" },
      { icon: "BrainCircuit", text: "Прикладные ИИ-контуры под задачи компании" },
      { icon: "FlaskConical", text: "Участие в бета-тестировании КриптоМетров" },
    ],
    cta: "Обсудить пилотную задачу",
    href: "/contacts?topic=developer",
  },
  {
    id: "assets",
    label: "Владельцам активов",
    icon: "Landmark",
    color: "#00d4ff",
    desc: "АО КСИ помогает превращать актив в понятный рыночный объект через анализ, упаковку, капитализацию и выстраивание логики реализации.",
    points: [
      { icon: "BarChart3", text: "Структурирование и капитализация актива" },
      { icon: "ArrowUpRight", text: "Подготовка к продаже или партнёрскому сценарию" },
      { icon: "Handshake", text: "Поиск девелоперского или инвестиционного интереса" },
      { icon: "Sparkles", text: "Визуальная и презентационная упаковка" },
      { icon: "Layers", text: "Сопровождение логики реализации" },
    ],
    cta: "Обсудить актив",
    href: "/contacts?topic=assets",
  },
  {
    id: "partners",
    label: "Партнёрам",
    icon: "Network",
    color: "#7b2fff",
    desc: "АО КСИ открыто к работе с теми, кто хочет участвовать в создании новой интеллектуальной модели девелопмента — не только как заказчик, но и как партнёр.",
    points: [
      { icon: "Zap", text: "Участие в пилотных задачах" },
      { icon: "Settings2", text: "Тестирование и настройка прикладных контуров" },
      { icon: "GraduationCap", text: "Обучение системы на совместных кейсах" },
      { icon: "GitMerge", text: "Совместная отработка сценариев" },
      { icon: "Globe", text: "Стратегический диалог вокруг КриптоМетров" },
    ],
    cta: "Обсудить сотрудничество",
    href: "/contacts?topic=partners",
  },
];

export function AudienceTabsSection() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section
      id="for-whom"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,12,22,1), rgba(10,10,15,1))" }}
    >
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="section-label mb-4">◆ Практическая ценность</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Что мы предлагаем<br />
            <span className="text-gradient-main">уже сегодня</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed">
            АО КСИ развивает виртуального девелопера поэтапно, но уже сейчас работает с конкретными
            задачами рынка через внутренние службы, прикладные контуры и проект КриптоМетры.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              className="flex items-center gap-2.5 px-5 py-3 rounded-sm font-oswald text-sm tracking-wide transition-all duration-200 cursor-pointer"
              style={{
                background: active === i ? `${t.color}14` : "rgba(255,255,255,0.03)",
                border: `1px solid ${active === i ? `${t.color}50` : "rgba(255,255,255,0.08)"}`,
                color: active === i ? t.color : "rgba(255,255,255,0.5)",
                boxShadow: active === i ? `0 0 18px ${t.color}18` : "none",
              }}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        <div
          className="rounded-sm overflow-hidden transition-all duration-300"
          style={{
            background: `${tab.color}04`,
            border: `1px solid ${tab.color}25`,
          }}
        >
          <div
            className="h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${tab.color}70, transparent)` }}
          />

          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r" style={{ borderColor: `${tab.color}15` }}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center"
                  style={{ background: `${tab.color}10`, border: `1px solid ${tab.color}30` }}
                >
                  <Icon name={tab.icon} size={22} style={{ color: tab.color }} />
                </div>
                <h3 className="font-oswald text-white text-2xl font-medium">
                  {tab.label}
                </h3>
              </div>

              <p className="font-ibm text-white/60 text-base leading-relaxed mb-8">
                {tab.desc}
              </p>

              <a
                href={tab.href}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-sm font-oswald text-sm tracking-wider uppercase transition-all"
                style={{
                  background: `${tab.color}15`,
                  border: `1px solid ${tab.color}45`,
                  color: tab.color,
                }}
              >
                {tab.cta}
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>

            <div className="p-8 lg:p-10">
              <div
                className="font-mono-ibm text-[10px] tracking-widest uppercase mb-5"
                style={{ color: tab.color, opacity: 0.8 }}
              >
                Что вы получаете
              </div>
              <ul className="space-y-4">
                {tab.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 mt-[1px]"
                      style={{ background: `${tab.color}08`, border: `1px solid ${tab.color}20` }}
                    >
                      <Icon name={p.icon} size={15} style={{ color: tab.color, opacity: 0.85 }} />
                    </div>
                    <span className="font-ibm text-white/70 text-sm leading-relaxed pt-1.5">
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
