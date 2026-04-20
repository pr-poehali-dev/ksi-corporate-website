import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

const CASES = [
  {
    id: 1,
    tag: "Земельный анализ",
    request: "14 га на берегу Азовского моря. Нужно понять: строить, продавать или партнёриться?",
    project: "Азовский сад",
    result: "Концепция малоэтажного посёлка с партнёрской структурой без прямых инвестиций со стороны землевладельца. Финансовая модель трёх сценариев.",
    icon: "Waves",
    color: "cyan",
    metrics: ["3 сценария", "Партнёрская структура", "5 дней"],
  },
  {
    id: 2,
    tag: "Финансовое структурирование",
    request: "Участок куплен на бридж. Проект не идёт. Как переупаковать актив и снять давление?",
    project: "Контур Fee Development",
    result: "Разработана схема переупаковки актива в контур КриптоМетры. Подготовлена структура партнёрства с оператором, снижающая долговую нагрузку.",
    icon: "TrendingUp",
    color: "purple",
    metrics: ["Схема партнёрства", "Снижение нагрузки", "7 дней"],
  },
  {
    id: 3,
    tag: "Концепция застройки",
    request: "22 га в черте Ростова. Сложный рельеф. Непонятно, с чего начать.",
    project: "Донские кварталы",
    result: "Поэтапная концепция освоения территории с разбивкой на очереди. Продуктовая линейка жилья под разные сегменты покупателей.",
    icon: "Building2",
    color: "cyan",
    metrics: ["Поэтапный план", "Продуктовая линейка", "6 дней"],
  },
  {
    id: 4,
    tag: "Региональная аналитика",
    request: "Хочу зайти в Калининград с дачным форматом. Есть участок 6 га. Что с рынком?",
    project: "Калининградские дачи",
    result: "Анализ спроса в регионе. Продуктовый дизайн дачного посёлка нового поколения. Сервисная модель управления.",
    icon: "TreePine",
    color: "purple",
    metrics: ["Рыночная аналитика", "Продуктовый дизайн", "4 дня"],
  },
];

export function CasesGallery() {
  const [active, setActive] = useState(0);
  const current = CASES[active];

  return (
    <section className="py-24 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal delay={0}>
          <div className="section-label mb-4">◆ Запрос → результат</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight">
              Как работает<br />
              <span className="text-gradient-main">виртуальный девелопер</span>
            </h2>
            <p className="font-ibm text-white/30 text-sm max-w-xs">
              Реальные запросы. Реальные решения. Реальное обучение системы.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Список кейсов */}
            <div className="lg:col-span-1 space-y-2">
              {CASES.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setActive(idx)}
                  className={`w-full text-left p-4 border rounded-sm transition-all duration-200 ${
                    active === idx
                      ? "border-ksi-cyan/35 bg-ksi-cyan/[0.05]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <div className={`font-ibm text-[10px] tracking-[0.15em] uppercase mb-1.5 ${active === idx ? "text-ksi-cyan/70" : "text-white/25"}`}>
                    {c.tag}
                  </div>
                  <div className={`font-oswald text-base font-medium transition-colors ${active === idx ? "text-white" : "text-white/45"}`}>
                    {c.project}
                  </div>
                </button>
              ))}
            </div>

            {/* Детальный кейс */}
            <div className="lg:col-span-2 border border-white/8 bg-white/[0.02] rounded-sm overflow-hidden">
              {/* Запрос */}
              <div className="border-b border-white/6 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-sm bg-white/8 flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageSquare" size={11} className="text-white/40" />
                  </div>
                  <span className="font-ibm text-white/25 text-xs tracking-[0.1em] uppercase">Запрос в систему</span>
                </div>
                <p className="font-ibm text-white/65 text-base leading-relaxed italic">
                  «{current.request}»
                </p>
              </div>

              {/* Результат */}
              <div className="p-6 border-b border-white/6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-sm bg-ksi-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle" size={11} className="text-ksi-cyan/70" />
                  </div>
                  <span className="font-ibm text-ksi-cyan/50 text-xs tracking-[0.1em] uppercase">Результат</span>
                </div>
                <p className="font-ibm text-white/55 text-sm leading-relaxed">
                  {current.result}
                </p>
              </div>

              {/* Метрики */}
              <div className="p-6 flex flex-wrap gap-3">
                {current.metrics.map((m) => (
                  <span key={m} className="font-ibm text-xs text-white/45 bg-white/[0.05] border border-white/8 px-3 py-1.5 rounded-sm">
                    {m}
                  </span>
                ))}
                <div className="ml-auto flex items-center gap-1 font-ibm text-white/20 text-xs">
                  <Icon name="BookOpen" size={11} />
                  Кейс зафиксирован в системе
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-6 text-center">
            <Link to="/early-access" className="font-ibm text-ksi-cyan/55 hover:text-ksi-cyan text-sm flex items-center gap-1 justify-center transition-colors">
              Поставить свою задачу <Icon name="ArrowRight" size={13} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}