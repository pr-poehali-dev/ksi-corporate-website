import { useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";

const TERMS = [
  {
    term: "АО КСИ",
    category: "Компания",
    definition: "Акционерное общество «КриптоСтройИнвест» — оператор кооперативной системы распределённого девелопмента. Внутри неё развиваются прикладные контуры, управляющий ИИ-слой и интеллектуальный контур КриптоМетров.",
  },
  {
    term: "Кооперативная система распределённого девелопмента",
    category: "Модель",
    definition: "Базовая модель АО КСИ. Управляемая среда, в которой участники, активы, прикладные модули, интеллектуальный контур и сценарии реализации собираются в единую архитектуру работы с недвижимостью и проектами.",
  },
  {
    term: "Кооперативная архитектура",
    category: "Модель",
    definition: "Принцип, по которому строится АО КСИ: вместо концентрации риска, капитала и управления в одной точке — распределённое участие компетенций, активов и интеллектуальных контуров в одной управляемой системе.",
  },
  {
    term: "Распределённый девелопмент",
    category: "Модель",
    definition: "Формат реализации девелоперского цикла, в котором функции и ресурсы (земля, экспертиза, управление, анализ, спрос) распределяются между участниками внутри единой кооперативной системы под управлением оператора и интеллектуального контура.",
  },
  {
    term: "КриптоМетры",
    category: "Проект",
    definition: "Ключевой проект АО КСИ — интеллектуальный и цифровой контур кооперативной системы распределённого девелопмента. Собирает прикладные модули, внутренние контуры и модели участия в единую среду нового поколения.",
  },
  {
    term: "Интеллектуальный и цифровой контур",
    category: "Архитектура",
    definition: "Роль КриптоМетров внутри кооперативной системы. Не отдельный продукт, а связывающий слой, который маршрутизирует задачи, объединяет участников и обеспечивает работу прикладных контуров через интеллектуальную логику.",
  },
  {
    term: "Управляющий контур",
    category: "Архитектура",
    definition: "Роль ИИ-слоя внутри кооперативной системы. Лаборатория ИИ как единый управляющий и усиливающий контур: связывает прикладные модули, обучается на реальных задачах и повышает качество работы всех остальных контуров.",
  },
  {
    term: "Прикладной контур",
    category: "Архитектура",
    definition: "Внутренняя служба АО КСИ как часть кооперативной системы. Не изолированный отдел, а прикладной модуль, через который система работает с конкретным типом задач: земля, активы, креатив. Подключается через интеллектуальный контур.",
  },
  {
    term: "Внутренние контуры",
    category: "Архитектура",
    definition: "Все рабочие контуры АО КСИ внутри кооперативной системы: управляющий (Лаборатория ИИ), прикладной (Центр реализации), земельный (LSS), креативный (Студия). Раньше назывались «внутренние службы»; теперь обозначаются именно как контуры системы.",
  },
  {
    term: "Лаборатория ИИ",
    category: "Служба",
    definition: "Единый управляющий и усиливающий контур кооперативной системы АО КСИ. Нейронные модели и интеллектуальная логика связывают прикладные модули и встраиваются в КриптоМетры. Не отдельная R&D-команда, а технологическое ядро системы.",
  },
  {
    term: "Центр реализации активов",
    category: "Служба",
    definition: "Прикладной контур кооперативной системы для работы с активами: упаковка, капитализация, партнёрское структурирование и вывод в продажу, совместное освоение или инвестиционный диалог. Не брокер и не агентство.",
  },
  {
    term: "Служба земельного поиска (LSS)",
    category: "Служба",
    definition: "Земельный контур кооперативной системы. Поиск участков, анализ площадок и работа с земельно-имущественными активами под управлением интеллектуального слоя Лаборатории ИИ.",
  },
  {
    term: "Студия проектного креатива",
    category: "Служба",
    definition: "Креативный и коммуникационный контур кооперативной системы. Визуальная, концептуальная и презентационная упаковка проектов и активов — для рынка, переговоров и принятия решений участниками системы.",
  },
  {
    term: "Участник системы",
    category: "Модель",
    definition: "Девелопер, владелец актива, землевладелец или стратегический партнёр, входящий в кооперативную систему АО КСИ через один из прикладных контуров или сценариев участия.",
  },
  {
    term: "Контур (внутри системы)",
    category: "Архитектура",
    definition: "Базовая единица архитектуры АО КСИ. Может быть оператором, интеллектуальным контуром, управляющим слоем, прикладным модулем или контуром участия. Все контуры собираются в одну кооперативную систему через КриптоМетры.",
  },
  {
    term: "Fee-Development (Fee-Dev)",
    category: "Модель",
    definition: "Модель, при которой оператор реализует проект за вознаграждение, не принимая на себя риски владения активом. Логика работы прикладного контура реализации активов внутри кооперативной системы АО КСИ.",
  },
  {
    term: "Due Diligence",
    category: "Процесс",
    definition: "Процедура всесторонней проверки актива или проекта. В кооперативной системе АО КСИ частично автоматизирована через управляющий ИИ-слой Лаборатории ИИ.",
  },
  {
    term: "Цифровое досье",
    category: "Процесс",
    definition: "Структурированный набор данных по участку или объекту, формируемый земельным контуром: юридические параметры, градостроительный контекст, рыночная аналитика, визуальные материалы. Подаётся в интеллектуальный контур системы.",
  },
  {
    term: "PropTech",
    category: "Отрасль",
    definition: "Property Technology — цифровые технологии и программные решения для рынка недвижимости. АО КСИ работает на стыке PropTech и ИИ как оператор кооперативной системы распределённого девелопмента.",
  },
  {
    term: "Редевелопмент",
    category: "Отрасль",
    definition: "Перепрофилирование и повторное использование существующих объектов или территорий. Один из типов задач, которые решаются внутри кооперативной системы через земельный и прикладной контуры.",
  },
];

const CATEGORIES = ["Все", "Компания", "Проект", "Модель", "Архитектура", "Служба", "Процесс", "Отрасль"];

export default function Glossary() {
  const [filter, setFilter] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = TERMS.filter(t => {
    const matchCat = filter === "Все" || t.category === filter;
    const matchSearch = search === "" || t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PageLayout breadcrumb={[{ label: "Глоссарий" }]}>
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(123,47,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Глоссарий</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Термины<br />
              <span className="text-gradient-purple">кооперативной системы</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Единая терминология АО КСИ: кооперативная система, прикладные и управляющие
              контуры, КриптоМетры, модели участия и процессы внутри системы.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-ksi-border/30 sticky top-[73px] z-40 bg-ksi-dark/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по термину или определению..."
            className="flex-1 bg-ksi-dark border border-ksi-border rounded-sm px-4 py-2.5 font-ibm text-white/70 text-sm placeholder-white/25 focus:outline-none focus:border-ksi-cyan/40 transition-colors"
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className="px-3 py-2 rounded-sm font-ibm text-xs transition-all"
                style={filter === cat
                  ? { background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.25)" }
                  : { background: "transparent", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-8">
            {filtered.length} {filtered.length === 1 ? "термин" : filtered.length < 5 ? "термина" : "терминов"}
          </div>

          <div className="space-y-3">
            {filtered.map((t, i) => (
              <div key={i} className="p-6 rounded-sm"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h2 className="font-oswald text-white text-lg font-medium">{t.term}</h2>
                  <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm"
                    style={{ background: "rgba(0,212,255,0.06)", color: "rgba(0,212,255,0.5)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    {t.category}
                  </span>
                </div>
                <p className="font-ibm text-white/48 text-sm leading-relaxed">{t.definition}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-ibm text-white/25 text-sm">Ничего не найдено. Попробуйте изменить запрос или категорию.</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}