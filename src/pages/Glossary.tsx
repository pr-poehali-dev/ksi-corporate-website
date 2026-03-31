import { useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";

const TERMS = [
  {
    term: "АО КСИ",
    category: "Компания",
    definition: "АО «КриптоСтройИнвест» — головная управляющая структура группы. Оператор цифровой девелоперской инфраструктуры, объединяющей направления в сфере недвижимости, технологий и профессиональной экспертизы.",
  },
  {
    term: "Виртуальный девелопер",
    category: "Модель",
    definition: "Модель, при которой АО КСИ выполняет функции девелоперского оператора без концентрации всех ресурсов в одной организации. Земля, капитал, экспертиза и технологии соединяются в управляемой цифровой среде через систему структурированных ролей и партнёрских механизмов.",
  },
  {
    term: "КриптоМетры",
    category: "Продукт",
    definition: "Флагманская платформа АО КСИ. Цифровая операционная среда для реализации девелоперских проектов через распределённую модель. Объединяет землевладельцев, девелоперов и профессиональных участников в единой структуре с прозрачной логикой проектов. Не является инвестиционным инструментом или платформой публичного привлечения средств.",
  },
  {
    term: "Распределённый девелопмент",
    category: "Модель",
    definition: "Формат реализации девелоперского цикла, при котором различные функции и ресурсы (земля, финансирование, экспертиза, управление) распределяются между профессиональными участниками в рамках единой управляемой структуры. Противопоставляется традиционной концентрированной модели, где один застройщик берёт весь цикл.",
  },
  {
    term: "Fee-Development (Fee-Dev)",
    category: "Модель",
    definition: "Модель, при которой девелоперский оператор реализует проект за вознаграждение (fee), не принимая на себя риски владения активом. АО КСИ выступает Fee-Dev платформой: организует среду, структурирует проекты, подключает профессиональных исполнителей.",
  },
  {
    term: "LSS — Land Search Service",
    category: "Продукт",
    definition: "Служба земельного поиска АО КСИ. Специализированный аналитический сервис поиска, фильтрации и предварительной структуризации земельных активов под девелопмент, инвестиции и редевелопмент. Работает с объектами по всей России.",
  },
  {
    term: "Лаборатория ИИ",
    category: "Продукт",
    definition: "R&D-направление группы по разработке специализированных ИИ-инструментов для рынка недвижимости. Ключевое отличие — отраслевая специализация: модели обучены на данных земельного рынка и девелопмента, а не на универсальных датасетах.",
  },
  {
    term: "Земельная аналитика & Data",
    category: "Продукт",
    definition: "Направление по созданию data-продуктов для работы с земельными и девелоперскими активами: базы данных, цифровые досье, картографические решения, аналитические панели. Обеспечивает информационную инфраструктуру экосистемы.",
  },
  {
    term: "Коллективные инвестиционные модели",
    category: "Структурирование",
    definition: "Направление АО КСИ по проектированию юридически корректных архитектур коллективного участия в проектах. Акцент — на логике и правовой структуре, а не на привлечении средств. Деятельность носит консалтинговый и структурирующий характер.",
  },
  {
    term: "Экосистема АО КСИ",
    category: "Компания",
    definition: "Совокупность взаимосвязанных направлений, платформ и сервисов группы, управляемых из единого центра (АО КСИ). Ключевой принцип: направления создают синергию, а не работают изолированно — данные LSS используются в КриптоМетрах, ИИ-лаб усиливает аналитику, Fee-Dev работает с активами, которые находит LSS.",
  },
  {
    term: "PropTech",
    category: "Отрасль",
    definition: "Property Technology — совокупность цифровых технологий и программных решений для рынка недвижимости. Включает платформы для покупки/продажи, аналитические инструменты, системы управления объектами, ИИ-решения для девелопмента.",
  },
  {
    term: "Due Diligence",
    category: "Процесс",
    definition: "Процедура всесторонней проверки актива, проекта или партнёра перед принятием решения. В контексте АО КСИ — предварительная аналитическая оценка земельного участка или девелоперского проекта, включая юридическую, градостроительную и рыночную составляющие.",
  },
  {
    term: "Редевелопмент",
    category: "Отрасль",
    definition: "Перепрофилирование и повторное использование существующих объектов недвижимости или территорий: промышленных зон, устаревших построек, неэффективно используемых участков. Одно из направлений работы LSS.",
  },
  {
    term: "White-Label",
    category: "Бизнес-модель",
    definition: "Модель лицензирования, при которой разработанное решение передаётся партнёру для использования под его собственным брендом. АО КСИ предоставляет white-label-доступ к ИИ-инструментам и платформам группы через направление лицензирования технологий.",
  },
  {
    term: "Информационный меморандум",
    category: "Документ",
    definition: "Документ, содержащий структурированную информацию о компании, проекте или модели участия. Предоставляется потенциальным инвесторам и стратегическим партнёрам по запросу для предварительного ознакомления. Не является публичной офертой.",
  },
  {
    term: "Модели участия",
    category: "Структурирование",
    definition: "Юридически оформленные механизмы вхождения в проекты или направления группы для партнёров, инвесторов и участников. Формируются индивидуально в рамках действующего законодательства. АО КСИ не осуществляет публичного привлечения средств.",
  },
];

const CATEGORIES = ["Все", "Компания", "Модель", "Продукт", "Структурирование", "Отрасль", "Процесс", "Бизнес-модель", "Документ"];

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
              <span className="text-gradient-purple">и определения</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Ключевые понятия экосистемы АО КСИ: продукты, модели, отраслевые термины.
              Для тех, кто хочет понимать, а не только слышать.
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
                    style={{ color: "rgba(0,212,255,0.6)", background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    {t.category}
                  </span>
                </div>
                <p className="font-ibm text-white/50 text-sm leading-relaxed">{t.definition}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-ibm text-white/25 text-sm">По вашему запросу ничего не найдено.</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
