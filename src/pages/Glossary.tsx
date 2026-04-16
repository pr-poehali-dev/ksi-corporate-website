import { useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";

const TERMS = [
  {
    term: "АО КСИ",
    category: "Компания",
    definition: "Акционерное общество «КриптоСтройИнвест» — оператор интеллектуальной инфраструктуры для девелопмента. Управляющая компания проекта «КриптоМетры».",
  },
  {
    term: "Виртуальный девелопер",
    category: "Замысел",
    definition: "Долгосрочная цель АО КСИ — интеллектуальная система, способная выполнять задачи девелопмента через внутренние службы, прикладные контуры и гибридную модель: ИИ + методология + операторская верификация. Не автономный ИИ и не ручной сервис.",
  },
  {
    term: "КриптоМетры",
    category: "Проект",
    definition: "Ключевой и единственный проект АО КСИ — интеллектуальная система распределённого девелопмента. Объединяет четыре внутренних контура в единую среду для решения задач недвижимости и земельно-имущественного рынка. Не является инвестиционным инструментом.",
  },
  {
    term: "Распределённый девелопмент",
    category: "Модель",
    definition: "Формат реализации девелоперского цикла, при котором различные функции и ресурсы (земля, экспертиза, управление, анализ) распределяются между профессиональными участниками в рамках единой интеллектуальной системы. Противопоставляется модели, где один застройщик берёт весь цикл.",
  },
  {
    term: "Гибридная модель",
    category: "Модель",
    definition: "Принцип работы системы КриптоМетры: задачи решаются через сочетание ИИ-инструментов, проверенной методологии и операторской (человеческой) верификации. ИИ усиливает, но не замещает профессиональную экспертизу.",
  },
  {
    term: "Контур системы",
    category: "Архитектура",
    definition: "Внутренняя служба АО КСИ, выполняющая определённую функцию в рамках проекта КриптоМетры. Не изолированный отдел, а рабочий контур единой интеллектуальной среды. Четыре контура: технологический, операторский, земельный, креативный.",
  },
  {
    term: "Лаборатория ИИ",
    category: "Служба",
    definition: "Технологическое ядро системы. Отвечает за интеллектуальную инфраструктуру, обучение, настройку и развитие ИИ-контуров КриптоМетров. Модели обучаются на данных земельного рынка и девелопмента, а не на универсальных датасетах.",
  },
  {
    term: "Центр реализации активов",
    category: "Служба",
    definition: "Операторский контур системы. Сопровождение и реализация активов в логике проекта: структурирование, упаковка, вывод на рынок. Работает с объектами, которые поступают через земельный контур.",
  },
  {
    term: "Служба земельного поиска (LSS)",
    category: "Служба",
    definition: "Земельный контур системы. Поиск участков, анализ площадок, формирование цифровых досье и земельно-имущественные задачи. Данные LSS питают аналитику всей системы.",
  },
  {
    term: "Студия проектного креатива",
    category: "Служба",
    definition: "Креативный контур системы. Визуальная, концептуальная и презентационная упаковка решений: от концепций объектов до материалов для заказчиков и партнёров.",
  },
  {
    term: "Fee-Development (Fee-Dev)",
    category: "Модель",
    definition: "Модель, при которой девелоперский оператор реализует проект за вознаграждение (fee), не принимая на себя риски владения активом. Логика работы Центра реализации активов АО КСИ.",
  },
  {
    term: "Due Diligence",
    category: "Процесс",
    definition: "Процедура всесторонней проверки актива или проекта: юридическая, градостроительная и рыночная составляющие. В системе КриптоМетры частично автоматизирована через инструменты Лаборатории ИИ.",
  },
  {
    term: "Цифровое досье",
    category: "Процесс",
    definition: "Структурированный набор данных по земельному участку или объекту: юридические параметры, градостроительный контекст, рыночная аналитика, визуальные материалы. Формируется Службой земельного поиска.",
  },
  {
    term: "PropTech",
    category: "Отрасль",
    definition: "Property Technology — совокупность цифровых технологий и программных решений для рынка недвижимости. АО КСИ работает на стыке PropTech и ИИ, создавая интеллектуальную систему для девелопмента.",
  },
  {
    term: "Редевелопмент",
    category: "Отрасль",
    definition: "Перепрофилирование и повторное использование существующих объектов недвижимости или территорий. Один из типов задач, которые решает система КриптоМетры через земельный контур.",
  },
];

const CATEGORIES = ["Все", "Компания", "Замысел", "Проект", "Архитектура", "Служба", "Модель", "Процесс", "Отрасль"];

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
              <span className="text-gradient-purple">проекта</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Ключевые понятия системы АО КСИ: проект, контуры, модели, процессы.
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