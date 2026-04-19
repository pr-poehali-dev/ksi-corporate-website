import { useState } from "react";
import Icon from "@/components/ui/icon";

const TABS = [
  {
    id: "land",
    label: "Земельный поиск",
    icon: "MapPin",
    color: "#00d4ff",
    title: "Модуль земельного поиска",
    desc: "Контур для поиска участков, анализа площадок и подготовки земельных активов к переговорам, девелоперской оценке и дальнейшему движению в рынок.",
    results: [
      "Подбор площадок под критерии задачи",
      "Первичная оценка участка",
      "Структурированное досье по площадке",
      "Сокращение времени на ручной поиск и фильтрацию",
      "Подготовка базы для дальнейших решений",
    ],
    requests: [
      { text: "Подберите 10 участков под light industrial в Московской области", time: "24 ч" },
      { text: "Найдите площадки под редевелопмент в Москве", time: "24 ч" },
      { text: "Сравните 3 участка по девелоперскому потенциалу", time: "12 ч" },
      { text: "Подготовьте первичное досье по земельному активу", time: "24 ч" },
      { text: "Найдите внерыночные площадки под заданный сценарий", time: "24 ч" },
    ],
    cta: "Обсудить земельную задачу",
    href: "/contacts?topic=land",
  },
  {
    id: "assets",
    label: "Реализация активов",
    icon: "TrendingUp",
    color: "#a070ff",
    title: "Модуль реализации активов",
    desc: "Контур для капитализации, структурирования и сопровождения активов — от подготовки сценария реализации до вывода в переговорный и рыночный контур.",
    results: [
      "Упаковка актива в понятный рыночный объект",
      "Сценарии реализации",
      "Подготовка к продаже или партнёрскому формату",
      "Помощь в формировании инвестиционного интереса",
      "Сопровождение логики вывода актива в реализацию",
    ],
    requests: [
      { text: "Подготовьте сценарии реализации земельного актива", time: "24 ч" },
      { text: "Упакуйте площадку для переговоров с девелопером", time: "12 ч" },
      { text: "Подготовьте актив к продаже или совместному освоению", time: "24 ч" },
      { text: "Сформируйте материалы для диалога с инвестором", time: "24 ч" },
      { text: "Покажите, как повысить инвестиционную привлекательность актива", time: "24 ч" },
    ],
    cta: "Обсудить актив",
    href: "/contacts?topic=assets",
  },
  {
    id: "creative",
    label: "Проектный креатив",
    icon: "Palette",
    color: "#00d4ff",
    title: "Модуль проектного креатива",
    desc: "Контур для визуальной, концептуальной и презентационной сборки проектных идей, активов и материалов — от гипотезы до коммуникации с рынком.",
    results: [
      "Презентации и визуальные материалы",
      "Проверка гипотез",
      "Генерация архитектурных и дизайнерских идей",
      "Подготовка к переговорам",
      "Экспресс-упаковка материалов в ускоренном режиме",
    ],
    requests: [
      { text: "Соберите презентацию проекта", time: "24 ч" },
      { text: "Проверьте визуальную гипотезу участка", time: "12 ч" },
      { text: "Сгенерируйте 3 направления архитектурной подачи", time: "24 ч" },
      { text: "Подготовьте материалы к переговорам с землевладельцем", time: "24 ч" },
      { text: "Соберите быстрый визуальный пакет за 24 часа", time: "24 ч" },
    ],
    cta: "Обсудить проектную задачу",
    href: "/contacts?topic=developer",
  },
];

export function ModuleExamplesSection() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section
      id="module-examples"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,10,22,1), rgba(10,10,15,1))" }}
    >
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="max-w-3xl mb-12">
          <div className="section-label mb-4">◆ Практическое применение</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Примеры работы<br />
            <span className="text-gradient-main">с модулями</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed">
            АО КСИ уже сегодня использует прикладные контуры для решения конкретных задач
            девелопмента, недвижимости и земельно-имущественной сферы.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              className="flex items-center gap-2.5 px-5 py-3 rounded-sm font-oswald text-sm tracking-wide transition-all duration-200 cursor-pointer"
              style={{
                background: active === i ? `${t.color}12` : "rgba(255,255,255,0.03)",
                border: `1px solid ${active === i ? `${t.color}50` : "rgba(255,255,255,0.08)"}`,
                color: active === i ? t.color : "rgba(255,255,255,0.45)",
                boxShadow: active === i ? `0 0 20px ${t.color}15` : "none",
              }}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          className="rounded-sm overflow-hidden"
          style={{ border: `1px solid ${tab.color}20`, background: `${tab.color}03` }}
        >
          <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${tab.color}70, transparent)` }} />

          <div className="grid lg:grid-cols-5 gap-0">

            {/* Left: description + results */}
            <div
              className="lg:col-span-2 p-8 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: `${tab.color}15` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: `${tab.color}10`, border: `1px solid ${tab.color}30` }}
                >
                  <Icon name={tab.icon} size={22} style={{ color: tab.color }} />
                </div>
                <h3 className="font-oswald text-white text-xl font-medium leading-tight">{tab.title}</h3>
              </div>

              <p className="font-ibm text-white/55 text-sm leading-relaxed">{tab.desc}</p>

              <div>
                <div
                  className="font-mono-ibm text-[10px] tracking-widest uppercase mb-3"
                  style={{ color: tab.color, opacity: 0.8 }}
                >
                  Что получаете
                </div>
                <ul className="space-y-2.5">
                  {tab.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 font-ibm text-white/65 text-sm leading-relaxed">
                      <Icon name="Check" size={13} style={{ color: tab.color, opacity: 0.8 }} className="mt-[3px] flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={tab.href}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-sm font-oswald text-sm tracking-wider uppercase transition-all mt-auto"
                style={{
                  background: `${tab.color}12`,
                  border: `1px solid ${tab.color}40`,
                  color: tab.color,
                  alignSelf: "flex-start",
                }}
              >
                {tab.cta}
                <Icon name="ArrowRight" size={15} />
              </a>
            </div>

            {/* Right: sample requests */}
            <div className="lg:col-span-3 p-8">
              <div
                className="font-mono-ibm text-[10px] tracking-widest uppercase mb-5"
                style={{ color: tab.color, opacity: 0.8 }}
              >
                Примеры запросов к системе
              </div>

              <div className="space-y-3">
                {tab.requests.map((req, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4 p-4 rounded-sm transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${tab.color}07`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${tab.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 mt-[1px]"
                      style={{ background: `${tab.color}10`, border: `1px solid ${tab.color}22` }}
                    >
                      <Icon name="MessageSquare" size={13} style={{ color: tab.color, opacity: 0.8 }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-ibm text-white/75 text-sm leading-relaxed">
                        «{req.text}»
                      </p>
                    </div>

                    <div
                      className="flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-sm"
                      style={{ background: `${tab.color}08`, border: `1px solid ${tab.color}20` }}
                    >
                      <Icon name="Clock" size={10} style={{ color: tab.color, opacity: 0.7 }} />
                      <span
                        className="font-mono-ibm text-[9px] tracking-wider"
                        style={{ color: tab.color, opacity: 0.85 }}
                      >
                        {req.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 flex items-start gap-3 p-4 rounded-sm"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <Icon name="Info" size={14} className="text-white/30 mt-[2px] flex-shrink-0" />
                <p className="font-ibm text-white/35 text-xs leading-relaxed">
                  Указанное время — ориентир по стандартному режиму обработки. Сроки уточняются при постановке задачи.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
