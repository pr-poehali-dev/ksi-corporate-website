import { useState } from "react";
import Icon from "@/components/ui/icon";

export function InvestorsSection() {
  return (
    <section id="investors" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.02) 0%, rgba(123,47,255,0.02) 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="section-label mb-6">◆ Участие в проекте</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Форматы участия<br />
              <span className="text-gradient-cyan">в развитии проекта</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-6">
              АО КСИ формирует структуры участия для профессиональных партнёров.
              Модель ориентирована на долгосрочное сотрудничество, а не
              на быстрые транзакции.
            </p>
            <p className="font-ibm text-white/45 text-base leading-relaxed mb-10">
              Компания не осуществляет публичного привлечения денежных средств.
              Форматы участия формируются индивидуально в рамках
              юридически корректных конструкций.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: "Scale", title: "Юридическая структура", desc: "Корректно оформленные механизмы участия и партнёрства" },
                { icon: "Layers", title: "Единая архитектура", desc: "4 внутренние службы в единой системе КриптоМетры" },
                { icon: "BrainCircuit", title: "Интеллектуальный актив", desc: "ИИ-инфраструктура и данные с накапливаемой ценностью" },
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
              Обсудить участие в проекте
            </a>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Стратегическое участие",
                desc: "Вхождение в капитал управляющей структуры АО КСИ. Доступ к управлению, стратегическим решениям и операционным активам системы.",
                badge: "M&A",
                color: "cyan",
              },
              {
                title: "Проектное со-финансирование",
                desc: "Участие в финансировании отдельных задач проекта в рамках структурированных партнёрских соглашений с чётко определёнными условиями.",
                badge: "Project",
                color: "purple",
              },
              {
                title: "Технологическое партнёрство",
                desc: "Совместное развитие интеллектуальных контуров системы с разделением прав на интеллектуальную собственность и коммерческого результата.",
                badge: "Tech",
                color: "cyan",
              },
              {
                title: "Участие в контурах системы",
                desc: "Структурное участие в развитии внутренних служб: Лаборатория ИИ, Центр реализации активов, Служба земельного поиска, Студия проектного креатива.",
                badge: "Ops",
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
    icon: "Building2",
    title: "Девелоперы",
    role: "Ваша компетенция + наша инфраструктура",
    desc: "Профессиональным девелоперам АО КСИ предоставляет интеллектуальные контуры, аналитические инструменты и операторскую поддержку через систему КриптоМетры.",
    actions: ["Центр реализации активов", "Служба земельного поиска", "ИИ-инструменты сопровождения"],
    color: "cyan",
  },
  {
    icon: "MapPin",
    title: "Землевладельцы",
    role: "Ваш актив — основа проекта",
    desc: "Земельный участок как основа проекта. АО КСИ проводит анализ актива через Службу земельного поиска, структурирует модель реализации через Центр реализации активов.",
    actions: ["Анализ участка через LSS", "Структурирование модели реализации", "Сопровождение через Центр реализации"],
    color: "purple",
  },
  {
    icon: "BarChart3",
    title: "Владельцы активов",
    role: "Структурирование и вывод на рынок",
    desc: "Профессиональное структурирование, упаковка и сопровождение реализации активов через операторский и креативный контуры АО КСИ.",
    actions: ["Упаковка и структурирование", "Визуальная презентация", "Логика реализации"],
    color: "cyan",
  },
  {
    icon: "Users",
    title: "Проектные команды",
    role: "Инструменты для принятия решений",
    desc: "Проектным командам — доступ к аналитическим инструментам, земельным данным и интеллектуальным контурам системы КриптоМетры.",
    actions: ["ИИ-аналитика и прогнозы", "Земельные данные и досье", "Подготовка концепций"],
    color: "purple",
  },
  {
    icon: "FlaskConical",
    title: "Бета-тестеры",
    role: "Участие в развитии системы",
    desc: "Профессиональные участники рынка, готовые тестировать, обучать и настраивать интеллектуальные контуры КриптоМетров на реальных задачах.",
    actions: ["Тестирование контуров", "Обучение системы", "Совместная отработка сценариев"],
    color: "cyan",
  },
];

export function PartnersSection() {
  const [activeAudience, setActiveAudience] = useState(0);
  const aud = AUDIENCES[activeAudience];
  const isCyan = aud.color === "cyan";

  return (
    <section id="partners" className="py-32 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.015) 0%, rgba(123,47,255,0.015) 100%)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="mb-14">
          <div className="section-label mb-4">◆ Сотрудничество</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
              Кому уже может <span className="text-gradient-purple">быть полезно</span>
            </h2>
            <p className="font-ibm text-white/45 text-base max-w-sm">
              Выберите ваш профиль — и узнайте, как контуры АО КСИ решают ваши задачи
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {AUDIENCES.map((a, i) => (
            <button key={i} onClick={() => setActiveAudience(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-sm font-ibm text-sm transition-all duration-200"
              style={activeAudience === i
                ? { background: a.color === "cyan" ? "rgba(0,212,255,0.1)" : "rgba(123,47,255,0.1)", color: a.color === "cyan" ? "#00d4ff" : "#7b2fff", border: `1px solid ${a.color === "cyan" ? "rgba(0,212,255,0.3)" : "rgba(123,47,255,0.3)"}` }
                : { background: "transparent", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.07)" }
              }>
              <Icon name={a.icon} size={14} />
              {a.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 card-ksi rounded-sm p-8"
            style={{
              borderColor: isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)",
              boxShadow: `0 0 40px ${isCyan ? "rgba(0,212,255,0.04)" : "rgba(123,47,255,0.04)"}`
            }}>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{
                  background: isCyan ? "rgba(0,212,255,0.1)" : "rgba(123,47,255,0.1)",
                  border: `1px solid ${isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)"}`
                }}>
                <Icon name={aud.icon} size={22} style={{ color: isCyan ? "#00d4ff" : "#7b2fff" }} />
              </div>
              <div>
                <h3 className="font-oswald text-white text-2xl font-semibold">{aud.title}</h3>
                <p className="font-ibm text-white/35 text-xs mt-0.5">{aud.role}</p>
              </div>
            </div>
            <p className="font-ibm text-white/55 text-base leading-relaxed mb-6">{aud.desc}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {aud.actions.map((action, i) => (
                <span key={i} className="font-ibm text-xs px-3 py-1.5 rounded-sm"
                  style={{
                    background: isCyan ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)",
                    color: isCyan ? "rgba(0,212,255,0.65)" : "rgba(123,47,255,0.65)",
                    border: `1px solid ${isCyan ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)"}`
                  }}>
                  {action}
                </span>
              ))}
            </div>
            <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm inline-block cursor-pointer"
              style={!isCyan ? { background: "linear-gradient(135deg, #7b2fff, #a855f7)", color: "#fff" } : {}}>
              Связаться с командой
            </a>
          </div>

          <div className="lg:col-span-2 space-y-2">
            <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2 px-1">ВСЕ ПРОФИЛИ</div>
            {AUDIENCES.map((a, i) => (
              <button key={i} onClick={() => setActiveAudience(i)}
                className="w-full flex items-start gap-4 p-4 rounded-sm text-left transition-all group"
                style={activeAudience === i
                  ? { background: a.color === "cyan" ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)", border: `1px solid ${a.color === "cyan" ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)"}` }
                  : { background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }
                }>
                <Icon name={a.icon} size={16} style={{ color: activeAudience === i ? (a.color === "cyan" ? "#00d4ff" : "#7b2fff") : "rgba(255,255,255,0.3)" }} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-oswald text-sm font-medium" style={{ color: activeAudience === i ? "#fff" : "rgba(255,255,255,0.5)" }}>{a.title}</div>
                  <div className="font-ibm text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{a.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a href="/partners" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">
            Подробнее о сотрудничестве →
          </a>
        </div>
      </div>
    </section>
  );
}
