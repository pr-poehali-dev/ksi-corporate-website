import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const VALUES = [
  {
    icon: "Layers",
    title: "Системность",
    desc: "Каждое решение — часть архитектуры, а не отдельная инициатива. Группа строится как управляемая система, а не как набор проектов.",
  },
  {
    icon: "Scale",
    title: "Правовая чистота",
    desc: "Механизмы участия, партнёрства и взаимодействия оформляются корректно. Без серых зон, без непрозрачных конструкций.",
  },
  {
    icon: "Clock",
    title: "Долгий цикл",
    desc: "Горизонт работы — стратегический. Ценность создаётся через инфраструктуру и компетенции, которые накапливаются со временем.",
  },
  {
    icon: "UserCheck",
    title: "Профессиональный стандарт",
    desc: "Работаем с профессиональными участниками рынка. Уровень диалога и качество результата соответствуют этому стандарту.",
  },
];

const STRUCTURE = [
  {
    level: "Головная структура",
    name: "АО КриптоСтройИнвест",
    desc: "Управление группой, стратегия, технологическая надстройка",
    color: "cyan",
  },
  {
    level: "Флагманская платформа",
    name: "КриптоМетры",
    desc: "Система распределённого девелопмента",
    color: "cyan",
  },
  {
    level: "Технологические направления",
    name: "Лаборатория ИИ · ИИ-продакшн · Лицензирование",
    desc: "Разработка, производство и лицензирование цифровых решений",
    color: "purple",
  },
  {
    level: "Аналитические сервисы",
    name: "LSS · Земельная аналитика & Data",
    desc: "Данные, поиск и структуризация земельных активов",
    color: "purple",
  },
  {
    level: "Операционные направления",
    name: "Fee-Dev Platform · Управление недвижимостью",
    desc: "Реализация проектов и управление объектами",
    color: "cyan",
  },
  {
    level: "Сопровождение",
    name: "Коллективные модели · Консалтинг · Медиацентр",
    desc: "Структурирование, экспертиза, интеллектуальное лидерство",
    color: "purple",
  },
];

export default function About() {
  return (
    <PageLayout breadcrumb={[{ label: "О компании" }]}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        {/* Горизонтальные строительные отметки */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.02) 79px, rgba(255,255,255,0.02) 80px)",
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.035) 0%, transparent 60%)" }} />
        {/* Парцельный мотив правого края */}
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" viewBox="0 0 256 400" preserveAspectRatio="xMaxYMid slice">
            <rect x="10" y="20" width="100" height="80" fill="none" stroke="white" strokeWidth="1"/>
            <rect x="120" y="20" width="120" height="38" fill="none" stroke="white" strokeWidth="0.7"/>
            <rect x="120" y="66" width="120" height="34" fill="none" stroke="white" strokeWidth="0.7"/>
            <rect x="10" y="110" width="230" height="60" fill="none" stroke="white" strokeWidth="0.8"/>
            <rect x="10" y="180" width="110" height="200" fill="none" stroke="white" strokeWidth="0.7"/>
            <rect x="130" y="180" width="110" height="95" fill="none" stroke="white" strokeWidth="0.7"/>
            <rect x="130" y="285" width="110" height="95" fill="none" stroke="white" strokeWidth="0.7"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Головная структура группы</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              АО «КриптоСтройИнвест»
            </h1>
            <p className="font-ibm text-white/65 text-xl leading-relaxed mb-4">
              Оператор цифровой девелоперской инфраструктуры. Головная управляющая
              структура группы на пересечении рынка недвижимости, технологий и профессиональной экспертизы.
            </p>
            <p className="font-ibm text-white/40 text-base leading-relaxed mb-8">
              Акционерное общество, зарегистрированное по российскому корпоративному законодательству.
              Основана в 2023 году. Не строительная компания. Не фонд. Платформа нового типа.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/ecosystem" className="btn-primary-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer">Архитектура экосистемы</a>
              <a href="/roadmap" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer">Дорожная карта</a>
              <a href="/glossary" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer">Глоссарий</a>
            </div>
          </div>
        </div>
      </section>

      {/* Позиционирование */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label mb-5">◆ Что такое АО КСИ</div>
              <h2 className="font-oswald text-4xl font-semibold text-white leading-tight mb-6">
                Не строительная компания.<br />
                <span className="text-gradient-cyan">Не инвестиционный фонд.</span>
              </h2>
              <p className="font-ibm text-white/65 text-lg leading-relaxed mb-5">
                АО КСИ — головная структура группы, которая создаёт и управляет
                цифровой инфраструктурой для рынка недвижимости. Компания работает
                на пересечении профессионального девелопмента, технологий и аналитики.
              </p>
              <p className="font-ibm text-white/50 text-base leading-relaxed mb-5">
                Наш продукт — не объект недвижимости. Наш продукт — среда,
                в которой объекты создаются эффективнее, прозрачнее и с правильной
                логикой участия сторон.
              </p>
              <p className="font-ibm text-white/50 text-base leading-relaxed mb-8">
                Горизонт работы — долгий цикл. Модель — системная, а не проектная.
                Ценность накапливается в инфраструктуре, данных и профессиональных
                связях, которые масштабируются независимо от конкретного объекта.
              </p>
              <div className="p-5 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">ПРАВОВАЯ ОГОВОРКА</div>
                <p className="font-ibm text-white/35 text-xs leading-relaxed">
                  Компания не осуществляет публичного привлечения денежных средств.
                  Отдельные модели участия реализуются в рамках специальных юридических
                  конструкций и партнёрских механизмов, формируемых индивидуально.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Год основания", value: "2023", color: "cyan" },
                  { label: "Правовая форма", value: "АО", color: "purple" },
                  { label: "Направлений", value: "12+", color: "cyan" },
                  { label: "Регионов охвата", value: "150+", color: "purple" },
                ].map((item, i) => (
                  <div key={i} className="card-ksi p-6 rounded-sm text-center" style={{ borderColor: item.color === "cyan" ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)" }}>
                    <div className={`font-oswald text-3xl font-bold mb-2 ${item.color === "cyan" ? "text-gradient-cyan" : "text-gradient-purple"}`}>{item.value}</div>
                    <div className="font-ibm text-white/40 text-xs tracking-wide uppercase">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="card-ksi p-6 rounded-sm">
                <div className="font-mono-ibm text-ksi-cyan/50 text-xs mb-3 tracking-widest">ПОЗИЦИОНИРОВАНИЕ</div>
                <div className="space-y-2">
                  {["Investment holding", "Digital infrastructure company", "PropTech platform", "AI-enabled real estate operator", "Fee-development operator"].map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-ksi-cyan/50 flex-shrink-0" />
                      <span className="font-ibm text-white/50 text-sm">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Структура группы */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Архитектура группы</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-3">Структура АО КСИ</h2>
          <p className="font-ibm text-white/50 text-lg mb-12 max-w-2xl">
            Единая управляемая структура с синергией между направлениями
          </p>
          {/* Архитектурная таблица структуры — без card-ksi, строгие горизонтальные линии */}
          <div className="overflow-hidden rounded-sm" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            {STRUCTURE.map((item, i) => {
              const isCyan = item.color === "cyan";
              const accentColor = isCyan ? "#00d4ff" : "#7b2fff";
              const indentPx = i * 16;
              return (
                <div key={i} className="flex items-stretch group"
                  style={{ borderBottom: i < STRUCTURE.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  {/* Цветной акцент-бар слева */}
                  <div className="w-0.5 flex-shrink-0" style={{ background: accentColor, opacity: 0.35 + i * 0.05 }} />
                  {/* Номер */}
                  <div className="flex items-center px-4 flex-shrink-0 w-10"
                    style={{ background: "rgba(255,255,255,0.01)" }}>
                    <span className="font-ibm text-[9px]" style={{ color: accentColor, opacity: 0.5 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Контент с отступом (иерархия) */}
                  <div className="flex-1 grid md:grid-cols-3 gap-4 py-4 pr-6" style={{ paddingLeft: indentPx }}>
                    <div className="flex items-center">
                      <span className="font-ibm text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>{item.level}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-oswald text-white font-medium text-sm group-hover:text-ksi-cyan transition-colors">{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-ibm text-white/38 text-xs">{item.desc}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ценности */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Корпоративные принципы</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-3">Основания, на которых мы работаем</h2>
          <p className="font-ibm text-white/40 text-base mb-12 max-w-2xl">
            Принципы — не декларация. Это операционные ограничения, которым мы следуем при принятии решений.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {VALUES.map((v, i) => (
              <div key={i} className="card-ksi p-6 rounded-sm flex gap-5">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <Icon name={v.icon} size={18} className="text-ksi-cyan" />
                </div>
                <div>
                  <div className="font-oswald text-white font-medium text-lg mb-2">{v.title}</div>
                  <p className="font-ibm text-white/45 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Дополнительные принципы */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "Eye",
                title: "Прозрачность зрелости",
                desc: "Мы публично обозначаем стадию каждого направления. Активна, Beta, R&D или формируется — без преувеличения готовности.",
              },
              {
                icon: "HandshakeIcon",
                title: "Профессиональный диалог",
                desc: "Работаем только с профессиональными участниками рынка. Уровень диалога и требования к партнёрам соответствуют этому стандарту.",
              },
              {
                icon: "GitBranch",
                title: "Синергия над автономией",
                desc: "Каждое направление создаёт ценность как часть системы. Данные, инфраструктура и компетенции разделяются между направлениями.",
              },
            ].map((p, i) => (
              <div key={i} className="p-5 rounded-sm" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-9 h-9 rounded-sm flex items-center justify-center mb-3" style={{ background: "rgba(123,47,255,0.08)", border: "1px solid rgba(123,47,255,0.15)" }}>
                  <Icon name={p.icon} size={16} style={{ color: "#7b2fff" }} />
                </div>
                <div className="font-oswald text-white font-medium text-sm mb-2">{p.title}</div>
                <p className="font-ibm text-white/40 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда (заглушка) */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Команда</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-3">Команда группы</h2>
          <p className="font-ibm text-white/50 text-lg mb-10">Информация о команде предоставляется по запросу</p>
          <div className="p-8 rounded-sm text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <Icon name="Users" size={32} className="text-white/20 mx-auto mb-4" />
            <p className="font-ibm text-white/35 text-sm">
              Информация о составе команды и ключевых специалистах группы
              доступна для верифицированных партнёров и инвесторов.
            </p>
            <a href="/contacts" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm inline-block mt-5 cursor-pointer">
              Запросить информацию
            </a>
          </div>
        </div>
      </section>

      {/* Правовой статус */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="section-label mb-5">◆ Правовой статус</div>
              <h2 className="font-oswald text-4xl font-semibold text-white mb-8">Юридическая информация</h2>
              <div className="space-y-4">
                {[
                  { label: "Полное наименование", value: "Акционерное общество «КриптоСтройИнвест»" },
                  { label: "Сокращённое наименование", value: "АО «КСИ»" },
                  { label: "ОГРН", value: "0000000000000" },
                  { label: "ИНН", value: "0000000000" },
                  { label: "Юридический адрес", value: "Москва, Россия" },
                  { label: "Год регистрации", value: "2023" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-3 border-b border-ksi-border/40">
                    <span className="font-mono-ibm text-white/30 text-xs tracking-widest w-48 flex-shrink-0 pt-0.5">{item.label}</span>
                    <span className="font-ibm text-white/65 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a href="/documents" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm inline-block cursor-pointer">
                  Документы компании →
                </a>
              </div>
            </div>
            <div>
              <div className="card-ksi p-8 rounded-sm h-full" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-4">ПРАВОВАЯ ОГОВОРКА (ПОЛНАЯ ВЕРСИЯ)</div>
                <p className="font-ibm text-white/45 text-sm leading-relaxed mb-4">
                  АО «КриптоСтройИнвест» не осуществляет и не организует публичное
                  привлечение денежных средств от физических и юридических лиц.
                </p>
                <p className="font-ibm text-white/45 text-sm leading-relaxed mb-4">
                  Отдельные модели участия в проектах группы реализуются исключительно
                  в рамках индивидуально структурируемых юридических конструкций —
                  партнёрских соглашений, корпоративных договоров или иных
                  предусмотренных законом механизмов.
                </p>
                <p className="font-ibm text-white/45 text-sm leading-relaxed">
                  Деятельность компании осуществляется в соответствии с требованиями
                  действующего российского законодательства, применимого к каждому
                  конкретному направлению работы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center p-12 rounded-sm relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(123,47,255,0.04) 100%)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/30 to-transparent" />
            <h3 className="font-oswald text-3xl font-semibold text-white mb-3">Готовы к диалогу?</h3>
            <p className="font-ibm text-white/50 text-base mb-8 max-w-lg mx-auto">
              Укажите вашу роль и задачу — мы ответим по существу
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contacts" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">Написать нам</a>
              <a href="/directions" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">Направления деятельности</a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}