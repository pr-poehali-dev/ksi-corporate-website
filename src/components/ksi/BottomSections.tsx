import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";
import { EcosystemCanvas } from "./TopSections";

export function MaturitySection() {
  const items = [
    {
      name: "КриптоМетры",
      status: "Активна",
      statusCode: "active",
      desc: "Флагманская платформа. Операционная среда распределённого девелопмента в рабочем режиме.",
      href: "/directions/cryptometry",
    },
    {
      name: "ИИ-продакшн",
      status: "Активна",
      statusCode: "active",
      desc: "Создание ИИ-аватаров, цифровых персонажей и корпоративных медиапродуктов.",
      href: "/directions/ai-production",
    },
    {
      name: "Fee-Dev платформа",
      status: "Активна",
      statusCode: "active",
      desc: "Оператор девелоперской среды: упаковка активов, структурирование, интеграция исполнителей.",
      href: "/directions/fee-dev",
    },
    {
      name: "LSS — Земельный поиск",
      status: "Beta",
      statusCode: "beta",
      desc: "Сервис аналитического поиска и структуризации земельных активов. В активной разработке.",
      href: "/directions/lss",
    },
    {
      name: "Лаборатория ИИ",
      status: "R&D",
      statusCode: "rnd",
      desc: "Разработка отраслевых ИИ-инструментов для рынка недвижимости и девелопмента.",
      href: "/directions/ai-lab",
    },
    {
      name: "Земельная аналитика & Data",
      status: "R&D",
      statusCode: "rnd",
      desc: "Data-продукты, цифровые досье и аналитические панели по земельным активам.",
      href: "/directions/land-data",
    },
    {
      name: "Управление недвижимостью",
      status: "Формируется",
      statusCode: "forming",
      desc: "Цифровое управление объектами: постдевелоперское сопровождение и доходные сервисы.",
      href: "/directions/property-mgmt",
    },
    {
      name: "Коллективные модели участия",
      status: "Консалтинг",
      statusCode: "forming",
      desc: "Проектирование правовой архитектуры и логики участия. Структурирующая функция.",
      href: "/directions/invest-models",
    },
    {
      name: "Лицензирование технологий",
      status: "Формируется",
      statusCode: "forming",
      desc: "Передача ИИ-сервисов и аналитических решений внешним партнёрам по лицензионным моделям.",
      href: "/directions/licensing",
    },
    {
      name: "Медиа & Аналитический центр",
      status: "Активна",
      statusCode: "active",
      desc: "Публикации, исследования и аналитическая позиция группы по рынку недвижимости.",
      href: "/media",
    },
  ];

  const statusMeta: Record<string, { color: string; bg: string; border: string }> = {
    active: { color: "#00d4ff", bg: "rgba(0,212,255,0.07)", border: "rgba(0,212,255,0.2)" },
    beta: { color: "#7b2fff", bg: "rgba(123,47,255,0.07)", border: "rgba(123,47,255,0.2)" },
    rnd: { color: "rgba(255,255,255,0.5)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)" },
    forming: { color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.07)" },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-border to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label mb-4">◆ Зрелость направлений</div>
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight">
              Что работает. Что в разработке.<br />
              <span className="text-white/50">Что формируется.</span>
            </h2>
          </div>
          <p className="font-ibm text-white/40 text-sm leading-relaxed max-w-xs">
            Мы публично обозначаем стадию каждого направления. Это рабочий принцип группы — не декларировать то, чего нет.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {items.map((item, i) => {
            const meta = statusMeta[item.statusCode];
            return (
              <a key={i} href={item.href}
                className="group flex items-start gap-5 p-5 rounded-sm transition-all cursor-pointer"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = meta.border)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
              >
                <div className="flex-shrink-0 pt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: meta.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-oswald text-white text-sm font-medium group-hover:text-ksi-cyan transition-colors">{item.name}</span>
                    <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm flex-shrink-0"
                      style={{ color: meta.color, background: meta.bg, border: `1px solid ${meta.border}` }}>
                      {item.status}
                    </span>
                  </div>
                  <p className="font-ibm text-white/35 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <Icon name="ChevronRight" size={14} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-40 transition-opacity text-white" />
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-6 items-center">
          {[
            { code: "active", label: "Активна" },
            { code: "beta", label: "Beta / Пилот" },
            { code: "rnd", label: "R&D / Разработка" },
            { code: "forming", label: "Формируется" },
          ].map((s) => {
            const meta = statusMeta[s.code];
            return (
              <div key={s.code} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
                <span className="font-mono-ibm text-xs" style={{ color: meta.color }}>{s.label}</span>
              </div>
            );
          })}
          <a href="/roadmap" className="ml-auto font-mono-ibm text-xs text-white/25 hover:text-white/50 transition-colors">
            Публичная дорожная карта →
          </a>
        </div>
      </div>
    </section>
  );
}

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(123,47,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="section-label mb-6">◆ Карта экосистемы</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Единая цифровая <br />
              <span className="text-gradient-purple">инфраструктура</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-8">
              АО КСИ — ядро экосистемы. Вокруг него выстроены взаимосвязанные платформы,
              сервисы и технологические компоненты, создающие синергетический эффект.
            </p>

            <div className="space-y-0 mb-10">
              {[
                { node: "КриптоМетры", role: "Флагманская система распределённого девелопмента", color: "cyan" },
                { node: "Лаборатория ИИ", role: "ИИ-решения для недвижимости и девелопмента", color: "purple" },
                { node: "ИИ-продакшн", role: "Цифровые аватары, медиа и визуальные коммуникации", color: "cyan" },
                { node: "LSS", role: "Служба аналитического поиска земельных активов", color: "purple" },
                { node: "Земельная аналитика", role: "Data-продукты и картографические решения", color: "cyan" },
                { node: "Fee-Dev Оператор", role: "Среда для профессиональных девелоперов", color: "purple" },
                { node: "Медиа & Аналитика", role: "Исследования и интеллектуальное сопровождение", color: "cyan" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-ksi-border/30">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                  <span className="font-oswald text-white/75 text-sm font-medium w-40 flex-shrink-0">{item.node}</span>
                  <span className="font-ibm text-white/35 text-xs">{item.role}</span>
                </div>
              ))}
            </div>

            <a href="/contacts" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
              Стать частью экосистемы
            </a>
          </div>

          <div className="relative h-[500px] rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-purple/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-ksi-dark/30 pointer-events-none" />
            <EcosystemCanvas />
            <div className="absolute top-4 left-4 font-mono-ibm text-ksi-cyan/40 text-xs tracking-widest pointer-events-none">LIVE MAP</div>
            <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
              <span className="font-mono-ibm text-ksi-cyan/40 text-xs">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InvestorsSection() {
  return (
    <section id="investors" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.02) 0%, rgba(123,47,255,0.02) 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="section-label mb-6">◆ Инвесторам и финансовым партнёрам</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Участие в группе<br />
              <span className="text-gradient-cyan">с долгосрочным горизонтом</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-6">
              АО КСИ формирует структуры участия для стратегических и институциональных
              партнёров. Модель ориентирована на долгосрочное сотрудничество, а не
              на быстрые транзакции.
            </p>
            <p className="font-ibm text-white/45 text-base leading-relaxed mb-10">
              Компания не осуществляет публичного привлечения денежных средств.
              Отдельные модели участия реализуются в рамках специальных юридических
              конструкций и партнёрских механизмов.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: "Scale", title: "Юридическая структура", desc: "Корректно оформленные механизмы участия и партнёрства" },
                { icon: "PieChart", title: "Диверсификация", desc: "12 направлений в едином инфраструктурном портфеле" },
                { icon: "BrainCircuit", title: "Технологический актив", desc: "ИИ-платформы и data-продукты с масштабируемой моделью" },
                { icon: "Clock", title: "Долгий цикл", desc: "Горизонт работы — не квартал, а стратегический период" },
              ].map((item, i) => (
                <div key={i} className="card-ksi p-5 rounded-sm">
                  <Icon name={item.icon} size={18} className="text-ksi-cyan mb-3" />
                  <div className="font-oswald text-white text-sm font-medium mb-1">{item.title}</div>
                  <div className="font-ibm text-white/40 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            <a href="/contacts" className="btn-primary-ksi px-8 py-3.5 rounded-sm text-sm inline-block cursor-pointer">
              Запросить информационный меморандум
            </a>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Стратегическое участие в группе",
                desc: "Вхождение в капитал головной структуры АО КСИ. Доступ к управлению, стратегическим решениям и операционным активам экосистемы.",
                badge: "M&A",
                color: "cyan",
              },
              {
                title: "Проектное со-финансирование",
                desc: "Участие в финансировании отдельных проектов группы в рамках структурированных партнёрских соглашений с чётко определёнными условиями.",
                badge: "Project",
                color: "purple",
              },
              {
                title: "Технологическое инвестирование",
                desc: "Совместное развитие ИИ-продуктов и платформенных решений с разделением доходов, прав на интеллектуальную собственность и коммерческого результата.",
                badge: "Tech",
                color: "cyan",
              },
              {
                title: "Экосистемное партнёрство",
                desc: "Структурное участие в развитии отдельных направлений группы: земельная аналитика, цифровой девелопмент, ИИ-сервисы.",
                badge: "Eco",
                color: "purple",
              },
            ].map((item, i) => (
              <div key={i} className="card-ksi p-6 rounded-sm group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-oswald text-white font-medium text-base group-hover:text-ksi-cyan transition-colors">{item.title}</h3>
                  <span
                    className="font-mono-ibm text-xs px-2 py-1 rounded-sm flex-shrink-0 ml-3"
                    style={{
                      background: item.color === "cyan" ? "rgba(0,212,255,0.08)" : "rgba(123,47,255,0.08)",
                      color: item.color === "cyan" ? "#00d4ff" : "#7b2fff",
                      border: `1px solid ${item.color === "cyan" ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)"}`,
                    }}
                  >{item.badge}</span>
                </div>
                <p className="font-ibm text-white/45 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-transparent group-hover:text-ksi-cyan/60 transition-all">
                  <span className="font-mono-ibm text-xs tracking-widest">ОБСУДИТЬ</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const AUDIENCES = [
  {
    icon: "MapPin",
    title: "Землевладельцы",
    role: "Ваш актив",
    desc: "Земельный участок как основа девелоперского проекта. АО КСИ проводит предварительный анализ актива, структурирует логику его вовлечения в проект и предлагает модели участия без необходимости самостоятельно реализовывать девелоперский цикл.",
    actions: ["Анализ участка через LSS", "Структурирование модели вовлечения", "Подключение к девелоперской среде"],
    color: "cyan",
  },
  {
    icon: "Building2",
    title: "Девелоперы",
    role: "Ваша компетенция",
    desc: "Профессиональным девелоперам АО КСИ предоставляет операционную среду fee-development, аналитические инструменты, данные и технологическую поддержку проектов на всех стадиях реализации.",
    actions: ["Fee-Dev платформа", "Земельная аналитика и подбор участков", "ИИ-инструменты сопровождения"],
    color: "purple",
  },
  {
    icon: "Handshake",
    title: "Стратегические партнёры",
    role: "Совместное развитие",
    desc: "Институциональные и отраслевые партнёры, заинтересованные в совместном развитии направлений группы: создание совместных структур, разработка продуктов, расширение рыночного присутствия.",
    actions: ["Структурные партнёрства", "Совместные продукты и платформы", "Вхождение в направление группы"],
    color: "cyan",
  },
  {
    icon: "TrendingUp",
    title: "Инвесторы",
    role: "Участие в группе",
    desc: "Для стратегических и финансовых инвесторов — структурированные модели участия в группе и отдельных проектах. Без публичных предложений, в рамках индивидуальных юридических конструкций.",
    actions: ["Информационный меморандум", "Индивидуальные структуры участия", "Диалог с командой группы"],
    color: "purple",
  },
  {
    icon: "Code2",
    title: "Технологические партнёры",
    role: "Интеграция и лицензирование",
    desc: "IT-компании, разработчики, поставщики данных и платформенных решений. АО КСИ открыто к интеграциям, лицензионным соглашениям и совместной разработке в сфере PropTech и ИИ.",
    actions: ["API и интеграции", "Лицензирование решений", "Совместные R&D-проекты"],
    color: "cyan",
  },
  {
    icon: "Newspaper",
    title: "Медиа и аналитики",
    role: "Информация и экспертиза",
    desc: "Профессиональным изданиям и отраслевым аналитикам — экспертные материалы, комментарии, исследования по рынку недвижимости, земельному сегменту и цифровому девелопменту.",
    actions: ["Аналитический центр КСИ", "Экспертные комментарии", "Отраслевые исследования"],
    color: "purple",
  },
  {
    icon: "Sparkles",
    title: "Заказчики ИИ-решений",
    role: "Под ваши задачи",
    desc: "Компаниям, ищущим ИИ-инструменты для недвижимости, аналитики, управления или медиа — Лаборатория ИИ и ИИ-продакшн КСИ разрабатывают и лицензируют специализированные решения.",
    actions: ["Разработка ИИ-инструментов", "Лицензирование готовых решений", "ИИ-аватары и digital-персонажи"],
    color: "cyan",
  },
];

export function PartnersSection() {
  const [activeAudience, setActiveAudience] = useState(0);
  const aud = AUDIENCES[activeAudience];
  const isCyan = aud.color === "cyan";

  return (
    <section id="partners" className="py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="section-label mb-4">◆ С кем работает АО КСИ</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
            Ваша роль <span className="text-gradient-purple">в экосистеме</span>
          </h2>
          <p className="font-ibm text-white/50 text-lg mt-4 max-w-2xl mx-auto">
            Выберите, кто вы — и узнайте, что АО КСИ может предложить именно вам
          </p>
        </div>

        {/* Табы аудиторий */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {AUDIENCES.map((a, i) => (
            <button
              key={i}
              onClick={() => setActiveAudience(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-sm font-ibm text-sm transition-all duration-200"
              style={activeAudience === i
                ? { background: a.color === "cyan" ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)", color: a.color === "cyan" ? "#00d4ff" : "#7b2fff", border: `1px solid ${a.color === "cyan" ? "rgba(0,212,255,0.3)" : "rgba(123,47,255,0.3)"}` }
                : { background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >
              <Icon name={a.icon} size={14} />
              {a.title}
            </button>
          ))}
        </div>

        {/* Детальная карточка активной аудитории */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div
            className="lg:col-span-2 card-ksi rounded-sm p-8"
            style={{ borderColor: isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)", boxShadow: `0 0 40px ${isCyan ? "rgba(0,212,255,0.05)" : "rgba(123,47,255,0.05)"}` }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ background: isCyan ? "rgba(0,212,255,0.08)" : "rgba(123,47,255,0.08)", border: `1px solid ${isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)"}` }}
              >
                <Icon name={aud.icon} size={22} style={{ color: isCyan ? "#00d4ff" : "#7b2fff" }} />
              </div>
              <div>
                <div className="font-mono-ibm text-xs tracking-widest mb-1" style={{ color: isCyan ? "rgba(0,212,255,0.5)" : "rgba(123,47,255,0.5)" }}>{aud.role.toUpperCase()}</div>
                <h3 className="font-oswald text-white text-2xl font-semibold">{aud.title}</h3>
              </div>
            </div>
            <p className="font-ibm text-white/60 text-base leading-relaxed mb-8">{aud.desc}</p>
            <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm inline-block cursor-pointer" style={!isCyan ? { background: "linear-gradient(135deg, #7b2fff, #a855f7)", color: "#fff" } : {}}>
              Начать диалог
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-1">ЧТО МЫ ПРЕДЛАГАЕМ</div>
            {aud.actions.map((action, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-sm"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: isCyan ? "#00d4ff" : "#7b2fff" }}
                />
                <span className="font-ibm text-white/55 text-sm">{action}</span>
              </div>
            ))}

            <div className="mt-auto pt-4 border-t border-ksi-border/30">
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-3">ДРУГИЕ АУДИТОРИИ</div>
              {AUDIENCES.filter((_, i) => i !== activeAudience).slice(0, 3).map((a, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAudience(AUDIENCES.indexOf(a))}
                  className="w-full flex items-center gap-3 py-2 text-left group"
                >
                  <Icon name={a.icon} size={13} className="text-white/20 group-hover:text-white/45 transition-colors flex-shrink-0" />
                  <span className="font-ibm text-white/25 text-xs group-hover:text-white/50 transition-colors">{a.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactsSection() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "", role: "" });

  return (
    <section id="contacts" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-border to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="section-label mb-6">◆ Контакты</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Начнём<br /><span className="text-gradient-main">предметный разговор</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-10">
              АО КСИ ведёт диалог с профессиональными участниками рынка.
              Укажите вашу роль и задачу — это поможет нам ответить по существу.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: "Mail", label: "Email", value: "info@ksi.ru" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "MapPin", label: "Адрес", value: "Москва, Россия" },
                { icon: "Clock", label: "Режим ответа", value: "Рабочие дни, в течение 24 часов" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    <Icon name={item.icon} size={16} className="text-ksi-cyan" />
                  </div>
                  <div>
                    <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-0.5">{item.label}</div>
                    <div className="font-ibm text-white/65 text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Дисклеймер */}
            <div className="p-5 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">ПРАВОВАЯ ОГОВОРКА</div>
              <p className="font-ibm text-white/30 text-xs leading-relaxed">
                Компания не осуществляет публичного привлечения денежных средств.
                Отдельные модели участия реализуются в рамках специальных юридических
                конструкций и партнёрских механизмов, формируемых индивидуально.
              </p>
            </div>
          </div>

          <div className="card-ksi p-8 rounded-sm" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
            <div className="font-mono-ibm text-ksi-cyan/50 text-xs tracking-widest mb-6">ФОРМА ОБРАЩЕНИЯ</div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ИМЯ *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
                </div>
                <div>
                  <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ОРГАНИЗАЦИЯ</label>
                  <input type="text" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} placeholder="Компания" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">EMAIL *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ВЫ ПРЕДСТАВЛЯЕТЕ *</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/60 text-sm focus:outline-none focus:border-ksi-cyan/40 transition-colors">
                  <option value="" className="bg-ksi-dark">Выберите роль</option>
                  <option value="land" className="bg-ksi-dark">Землевладелец</option>
                  <option value="developer" className="bg-ksi-dark">Девелопер / застройщик</option>
                  <option value="investor" className="bg-ksi-dark">Инвестор / финансовый партнёр</option>
                  <option value="strategic" className="bg-ksi-dark">Стратегический партнёр</option>
                  <option value="tech" className="bg-ksi-dark">Технологический партнёр</option>
                  <option value="ai-client" className="bg-ksi-dark">Заказчик ИИ-решений</option>
                  <option value="media" className="bg-ksi-dark">Медиа / аналитик</option>
                  <option value="other" className="bg-ksi-dark">Другое</option>
                </select>
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">СУТЬ ЗАПРОСА</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Кратко опишите задачу или вопрос..." rows={4} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors resize-none" />
              </div>

              <button className="btn-primary-ksi w-full py-4 rounded-sm text-sm mt-2 cursor-pointer">
                Отправить обращение
              </button>

              <p className="font-ibm text-white/20 text-xs text-center leading-relaxed">
                Данные не передаются третьим лицам и используются исключительно
                для обработки вашего обращения
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ksi-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/6cc3c0d3-b169-4aea-b654-cf24515a3fb0.png"
                alt="КСИ"
                className="h-10 w-auto flex-shrink-0"
              />
              <span className="font-oswald font-semibold text-white tracking-widest uppercase text-sm">АО КриптоСтройИнвест</span>
            </div>
            <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-xs">
              Виртуальный девелопер. Цифровая экосистема для рынка недвижимости нового поколения.
            </p>
          </div>

          <div>
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">НАВИГАЦИЯ</div>
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="block font-ibm text-white/40 text-sm hover:text-white/70 transition-colors">{item.label}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">ПРОДУКТЫ</div>
            <div className="space-y-2">
              {[
                { label: "КриптоМетры", href: "/directions/cryptometry" },
                { label: "LSS — Земельный поиск", href: "/directions/lss" },
                { label: "Лаборатория ИИ", href: "/directions/ai-lab" },
                { label: "Fee-Dev платформа", href: "/directions/fee-dev" },
              ].map((p) => (
                <a key={p.href} href={p.href} className="block font-ibm text-white/40 text-sm hover:text-white/70 transition-colors">{p.label}</a>
              ))}
            </div>
            <div className="mt-6">
              <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-3">СПРАВОЧНЫЕ РАЗДЕЛЫ</div>
              <div className="space-y-2">
                <a href="/roadmap" className="block font-ibm text-white/35 text-xs hover:text-white/60 transition-colors">Дорожная карта →</a>
                <a href="/glossary" className="block font-ibm text-white/35 text-xs hover:text-white/60 transition-colors">Глоссарий →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ksi-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-ibm text-white/25 text-xs">© 2024 АО «КриптоСтройИнвест». Все права защищены.</div>
          <div className="flex items-center gap-6">
            {["Политика конфиденциальности", "Пользовательское соглашение", "Реквизиты"].map((link) => (
              <span key={link} className="font-ibm text-white/25 text-xs hover:text-white/50 cursor-pointer transition-colors">{link}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}