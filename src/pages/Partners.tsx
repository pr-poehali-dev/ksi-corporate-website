import { useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const AUDIENCES = [
  {
    icon: "MapPin",
    title: "Землевладельцы",
    role: "Ваш актив — основа проекта",
    color: "cyan",
    intro: "Если у вас есть земельный участок и вы ищете модель его реализации без самостоятельного управления девелоперским циклом — АО КСИ предлагает структурированные форматы вовлечения актива в проект.",
    details: "Мы проводим предварительный анализ участка через LSS, оцениваем девелоперский потенциал и предлагаем модель участия, при которой актив работает без его продажи. Все механизмы структурируются юридически корректно.",
    offers: [
      { icon: "Search", text: "Аналитический анализ участка через LSS" },
      { icon: "FileText", text: "Структурирование модели вовлечения" },
      { icon: "Settings2", text: "Подключение к Fee-Dev платформе" },
      { icon: "Scale", text: "Юридическое оформление механизма" },
    ],
    cta: "Предоставить информацию об участке",
    disclaimer: null,
  },
  {
    icon: "Building2",
    title: "Девелоперы",
    role: "Ваша компетенция + наша инфраструктура",
    color: "purple",
    intro: "Профессиональным девелоперам АО КСИ предоставляет операционную среду, аналитические инструменты и технологическую поддержку. Мы не конкурируем — мы расширяем возможности.",
    details: "Fee-Dev платформа позволяет работать с активами, которые поступают через LSS и КриптоМетры. Лаборатория ИИ обеспечивает аналитику. Земельная аналитика даёт данные. Вы приносите девелоперскую экспертизу.",
    offers: [
      { icon: "Settings2", text: "Fee-Dev платформа и операционная среда" },
      { icon: "Search", text: "Поток активов через LSS" },
      { icon: "BrainCircuit", text: "ИИ-инструменты анализа и due diligence" },
      { icon: "DatabaseZap", text: "Земельная аналитика и данные" },
    ],
    cta: "Обсудить формат сотрудничества",
    disclaimer: null,
  },
  {
    icon: "TrendingUp",
    title: "Инвесторы",
    role: "Участие в группе с долгим горизонтом",
    color: "cyan",
    intro: "Для стратегических и финансовых инвесторов АО КСИ формирует структурированные модели участия в группе и отдельных направлениях. Акцент — на долгосрочном сотрудничестве.",
    details: "Компания не осуществляет публичного привлечения денежных средств. Модели участия формируются индивидуально в рамках юридически корректных конструкций — партнёрских соглашений, корпоративных договоров или иных предусмотренных законом механизмов.",
    offers: [
      { icon: "FileText", text: "Информационный меморандум по запросу" },
      { icon: "Scale", text: "Индивидуальные структуры участия" },
      { icon: "Handshake", text: "Диалог с командой группы" },
      { icon: "PieChart", text: "Доступ к диверсифицированному портфелю направлений" },
    ],
    cta: "Запросить информационный меморандум",
    disclaimer: "Компания не осуществляет публичного привлечения денежных средств. Отдельные модели участия реализуются в рамках специальных юридических конструкций и партнёрских механизмов, формируемых индивидуально.",
  },
  {
    icon: "Handshake",
    title: "Стратегические партнёры",
    role: "Совместное развитие направлений",
    color: "purple",
    intro: "Институциональные и отраслевые партнёры, заинтересованные в совместном развитии направлений группы: создание совместных структур, разработка продуктов, расширение рыночного присутствия.",
    details: "АО КСИ открыто к созданию совместных предприятий, партнёрских структур и совместной разработке продуктов в сферах PropTech, ИИ, земельной аналитики и цифрового девелопмента.",
    offers: [
      { icon: "Network", text: "Создание совместных партнёрских структур" },
      { icon: "Code2", text: "Совместная разработка продуктов" },
      { icon: "Globe", text: "Расширение рыночного присутствия" },
      { icon: "Layers", text: "Участие в отдельных направлениях группы" },
    ],
    cta: "Предложить партнёрство",
    disclaimer: null,
  },
  {
    icon: "Code2",
    title: "Технологические партнёры",
    role: "Интеграция и совместная разработка",
    color: "cyan",
    intro: "IT-компании, разработчики, поставщики данных и платформенных решений. АО КСИ открыто к интеграциям, лицензионным соглашениям и совместной разработке в сфере PropTech и ИИ.",
    details: "Лаборатория ИИ и направление Лицензирования обеспечивают взаимодействие с технологическими партнёрами. Форматы: API-интеграции, white-label, co-development, лицензирование данных.",
    offers: [
      { icon: "Code2", text: "API-интеграции с платформами группы" },
      { icon: "PackageCheck", text: "Лицензирование решений" },
      { icon: "Cpu", text: "Совместные R&D-проекты" },
      { icon: "DatabaseZap", text: "Доступ к земельным данным и ИИ-моделям" },
    ],
    cta: "Обсудить техническую интеграцию",
    disclaimer: null,
  },
  {
    icon: "Sparkles",
    title: "Заказчики ИИ-решений",
    role: "Специализированные инструменты под задачу",
    color: "purple",
    intro: "Компаниям, ищущим ИИ-инструменты для недвижимости, аналитики, управления или медиа — Лаборатория ИИ и ИИ-продакшн КСИ разрабатывают и лицензируют специализированные решения.",
    details: "Не универсальные AI-инструменты, а отраслевые решения, обученные на данных и задачах рынка недвижимости. От ИИ-моделей анализа участков до цифровых аватаров для презентаций.",
    offers: [
      { icon: "BrainCircuit", text: "Разработка ИИ-инструментов под задачу" },
      { icon: "PackageCheck", text: "Лицензирование готовых решений" },
      { icon: "Bot", text: "ИИ-аватары и цифровые персонажи" },
      { icon: "Monitor", text: "Объясняющие интерфейсы и UX-нарративы" },
    ],
    cta: "Обсудить разработку решения",
    disclaimer: null,
  },
  {
    icon: "Newspaper",
    title: "Медиа и аналитики",
    role: "Экспертиза и аналитические данные",
    color: "cyan",
    intro: "Профессиональным изданиям и отраслевым аналитикам — экспертные материалы, комментарии, исследования по рынку недвижимости, земельному сегменту и цифровому девелопменту.",
    details: "Медиацентр АО КСИ формирует аналитическую позицию группы. Мы готовы предоставлять экспертные комментарии, аналитические материалы и данные для профессионального использования.",
    offers: [
      { icon: "BarChart2", text: "Аналитические обзоры и исследования" },
      { icon: "MessageSquare", text: "Экспертные комментарии по запросу" },
      { icon: "FileText", text: "Материалы Медиацентра КСИ" },
      { icon: "Mail", text: "Подписка на аналитическую рассылку" },
    ],
    cta: "Запросить экспертный комментарий",
    disclaimer: null,
  },
];

export default function Partners() {
  const [activeIdx, setActiveIdx] = useState(0);
  const aud = AUDIENCES[activeIdx];
  const isCyan = aud.color === "cyan";

  return (
    <PageLayout breadcrumb={[{ label: "Партнёрам" }]}>
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(123,47,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Работаем с профессионалами рынка</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Ваша роль<br />
              <span className="text-gradient-purple">в экосистеме АО КСИ</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Выберите ваш профиль — и узнайте, что именно мы можем предложить
            </p>
          </div>
        </div>
      </section>

      {/* Навигация по аудиториям */}
      <section className="border-t border-b border-ksi-border/30 sticky top-[73px] z-40 bg-ksi-dark/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 flex-wrap">
          {AUDIENCES.map((a, i) => (
            <button key={i} onClick={() => setActiveIdx(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-sm font-ibm text-sm transition-all"
              style={activeIdx === i
                ? { background: a.color === "cyan" ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)", color: a.color === "cyan" ? "#00d4ff" : "#7b2fff", border: `1px solid ${a.color === "cyan" ? "rgba(0,212,255,0.3)" : "rgba(123,47,255,0.3)"}` }
                : { background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >
              <Icon name={a.icon} size={14} />
              {a.title}
            </button>
          ))}
        </div>
      </section>

      {/* Детальная карточка */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 card-ksi rounded-sm p-8" style={{ borderColor: isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)", boxShadow: `0 0 40px ${isCyan ? "rgba(0,212,255,0.05)" : "rgba(123,47,255,0.05)"}` }}>
              <div className="flex items-start gap-4 mb-7">
                <div className="w-14 h-14 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: isCyan ? "rgba(0,212,255,0.08)" : "rgba(123,47,255,0.08)", border: `1px solid ${isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)"}` }}>
                  <Icon name={aud.icon} size={24} style={{ color: isCyan ? "#00d4ff" : "#7b2fff" }} />
                </div>
                <div>
                  <div className="font-mono-ibm text-xs tracking-widest mb-1" style={{ color: isCyan ? "rgba(0,212,255,0.5)" : "rgba(123,47,255,0.5)" }}>{aud.role.toUpperCase()}</div>
                  <h2 className="font-oswald text-3xl text-white font-semibold">{aud.title}</h2>
                </div>
              </div>
              <p className="font-ibm text-white/65 text-lg leading-relaxed mb-5">{aud.intro}</p>
              <p className="font-ibm text-white/50 text-base leading-relaxed mb-8">{aud.details}</p>
              {aud.disclaimer && (
                <div className="p-5 rounded-sm mb-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">ПРАВОВАЯ ОГОВОРКА</div>
                  <p className="font-ibm text-white/35 text-xs leading-relaxed">{aud.disclaimer}</p>
                </div>
              )}
              <a href="/contacts" className="btn-primary-ksi px-8 py-3.5 rounded-sm text-sm inline-block cursor-pointer" style={!isCyan ? { background: "linear-gradient(135deg, #7b2fff, #a855f7)", color: "#fff" } : {}}>
                {aud.cta}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-1">ЧТО МЫ ПРЕДЛАГАЕМ</div>
              {aud.offers.map((offer, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: isCyan ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)", border: `1px solid ${isCyan ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)"}` }}>
                    <Icon name={offer.icon} size={14} style={{ color: isCyan ? "#00d4ff" : "#7b2fff" }} />
                  </div>
                  <span className="font-ibm text-white/60 text-sm">{offer.text}</span>
                </div>
              ))}
              <div className="mt-auto pt-4 border-t border-ksi-border/30">
                <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-3">ДРУГИЕ АУДИТОРИИ</div>
                {AUDIENCES.filter((_, i) => i !== activeIdx).slice(0, 4).map((a, i) => (
                  <button key={i} onClick={() => setActiveIdx(AUDIENCES.indexOf(a))} className="w-full flex items-center gap-3 py-2 text-left group">
                    <Icon name={a.icon} size={13} className="text-white/20 group-hover:text-white/45 transition-colors flex-shrink-0" />
                    <span className="font-ibm text-white/25 text-xs group-hover:text-white/50 transition-colors">{a.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Как строится взаимодействие */}
      <section className="py-16 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Процесс</div>
          <h2 className="font-oswald text-3xl text-white mb-10">Как строится взаимодействие</h2>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { step: "01", title: "Обращение", desc: "Напишите нам через форму, укажите вашу роль и суть запроса" },
              { step: "02", title: "Квалификация", desc: "Мы рассматриваем обращение и направляем его в профильное направление" },
              { step: "03", title: "Первый диалог", desc: "Предметный разговор с профильным специалистом группы" },
              { step: "04", title: "Формат работы", desc: "Формируем предложение или структуру сотрудничества" },
            ].map((s, i) => (
              <div key={i} className="card-ksi p-6 rounded-sm">
                <div className="font-oswald text-4xl font-bold mb-4" style={{ color: "rgba(0,212,255,0.2)" }}>{s.step}</div>
                <div className="font-oswald text-white font-medium text-lg mb-2">{s.title}</div>
                <p className="font-ibm text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="font-oswald text-3xl text-white mb-3">Готовы к предметному разговору?</h3>
          <p className="font-ibm text-white/45 mb-8 max-w-xl mx-auto">Укажите вашу роль в форме — это помогает нам ответить точно и быстро</p>
          <a href="/contacts" className="btn-primary-ksi px-10 py-3.5 rounded-sm text-sm inline-block cursor-pointer">Написать нам →</a>
        </div>
      </section>
    </PageLayout>
  );
}
