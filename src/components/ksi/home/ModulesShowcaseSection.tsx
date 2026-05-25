import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ContactModal } from "@/components/ksi/ContactModal";

interface ModuleDef {
  key: string;
  tab: string;
  title: string;
  description: string;
  outputs: string[];
  requests: string[];
}

const MODULES: ModuleDef[] = [
  {
    key: "land",
    tab: "Модуль земельного поиска",
    title: "Поиск и подготовка площадок",
    description:
      "Прикладной контур для девелоперов и владельцев капитала: подбор участков, оценка девелоперского потенциала, проработка сценариев и подготовка к переговорам.",
    outputs: [
      "Подбор площадок под целевой сценарий",
      "Предварительная оценка девелоперского потенциала",
      "Сводные карточки с метриками и ограничениями",
      "Материалы к переговорам с собственниками",
    ],
    requests: [
      "Нужен участок под ИЖС-кластер 8–15 га, Московская область, до 60 км от МКАД.",
      "Подобрать площадку под складской комплекс класса А, Подмосковье, юг.",
      "Найти землю под сегмент малоэтажной застройки, бюджет до 600 млн.",
    ],
  },
  {
    key: "assets",
    tab: "Модуль реализации активов",
    title: "Капитализация и вывод актива",
    description:
      "Контур для владельцев объектов и портфельных собственников: упаковка актива, проверка гипотез реализации, выход в переговорный и рыночный контур.",
    outputs: [
      "Аналитическая упаковка актива",
      "Сценарии реализации и капитализации",
      "Подготовка к переговорам с покупателями и партнёрами",
      "Сопровождение вывода актива",
    ],
    requests: [
      "Здание 4 800 м² в центре, нужно понять формат реализации и круг покупателей.",
      "Готовый бизнес-парк, требуется упаковка и стратегия продажи доли.",
      "Земельный массив 120 га, оценить варианты девелоперского сценария.",
    ],
  },
  {
    key: "creative",
    tab: "Модуль проектного креатива",
    title: "Проектная и переговорная упаковка",
    description:
      "Контур для проектов на стадии гипотезы, упаковки и презентации: концепции, визуальные материалы, нарратив, презентации для инвесторов и партнёров.",
    outputs: [
      "Концепции и визуальные сценарии проекта",
      "Презентации к переговорам и инвестиционным сессиям",
      "Брендовая и продуктовая упаковка",
      "Материалы для проверки рыночных гипотез",
    ],
    requests: [
      "Нужна презентация для встречи с банком по проекту жилого квартала.",
      "Собрать визуальную концепцию загородного кластера.",
      "Подготовить материалы по проекту реконцепции торгового центра.",
    ],
  },
];

export function ModulesShowcaseSection() {
  const [active, setActive] = useState(MODULES[0].key);
  const [modalOpen, setModalOpen] = useState(false);
  const current = MODULES.find((m) => m.key === active)!;

  return (
    <section className="relative py-28 sm:py-36" style={{ background: "#080b13" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/45 mb-5">
            ◆ Примеры работы с модулями
          </p>
          <h2 className="font-oswald text-white font-semibold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Три прикладных контура
          </h2>
          <p className="font-ibm text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
            Прикладные модули АО КСИ уже сейчас работают как отдельные контуры кооперативной системы
            и дают предметный результат для девелоперов, владельцев активов и участников рынка.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {MODULES.map((m) => (
            <button
              key={m.key}
              onClick={() => setActive(m.key)}
              className="font-ibm text-[12px] sm:text-[13px] tracking-wide px-5 py-2.5 rounded-sm transition-all"
              style={
                active === m.key
                  ? {
                      background: "rgba(0,212,255,0.12)",
                      border: "1px solid rgba(0,212,255,0.35)",
                      color: "#00d4ff",
                    }
                  : {
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.45)",
                    }
              }
            >
              {m.tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 sm:p-10 rounded-sm"
          style={{
            background: "linear-gradient(160deg, rgba(0,212,255,0.04) 0%, rgba(123,47,255,0.02) 100%)",
            border: "1px solid rgba(0,212,255,0.12)",
          }}
        >
          {/* Left: description + outputs */}
          <div>
            <h3 className="font-oswald text-white text-2xl sm:text-3xl font-medium mb-4 tracking-wide">
              {current.title}
            </h3>
            <p className="font-ibm text-white/55 text-sm sm:text-base leading-relaxed mb-7">
              {current.description}
            </p>

            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#00d4ff]/50 mb-3">
              Что получает пользователь
            </p>
            <ul className="space-y-2.5 mb-8">
              {current.outputs.map((o) => (
                <li key={o} className="flex items-start gap-3 text-white/65 font-ibm text-sm">
                  <span
                    className="inline-block flex-shrink-0 mt-2 w-1 h-1 rounded-full"
                    style={{ background: "#00d4ff" }}
                  />
                  {o}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 font-ibm font-semibold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-sm transition-all"
              style={{
                background: "#00d4ff",
                color: "#0a0a0f",
                boxShadow: "0 0 24px rgba(0,212,255,0.18)",
              }}
            >
              Передать запрос
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          {/* Right: requests */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#00d4ff]/50 mb-4">
              Примеры запросов
            </p>
            <div className="space-y-3">
              {current.requests.map((r, i) => (
                <div
                  key={i}
                  className="rounded-sm p-4 flex items-start gap-3"
                  style={{
                    background: "rgba(15,21,32,0.55)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Icon name="User" size={12} className="text-white/45" />
                  </div>
                  <p className="font-ibm text-white/75 text-[13px] sm:text-sm leading-relaxed">
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} defaultMessage={`Запрос по модулю: ${current.tab}`} />
    </section>
  );
}