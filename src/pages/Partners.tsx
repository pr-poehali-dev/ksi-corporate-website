import { useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const AUDIENCES = [
  {
    icon: "Building2",
    title: "Девелоперам",
    role: "Ваша компетенция + наша интеллектуальная инфраструктура",
    color: "cyan",
    intro: "Профессиональным девелоперам АО КСИ предоставляет интеллектуальные контуры, аналитические инструменты и операторскую поддержку через систему КриптоМетры.",
    details: "Вы можете подключать земельный поиск через LSS, использовать аналитику Лаборатории ИИ, получать операторскую поддержку Центра реализации — и участвовать в развитии системы.",
    offers: [
      { icon: "Search", text: "Земельный поиск и аналитика через LSS" },
      { icon: "BrainCircuit", text: "ИИ-инструменты анализа и due diligence" },
      { icon: "TrendingUp", text: "Операторская поддержка Центра реализации" },
      { icon: "FlaskConical", text: "Участие в бета-тестировании контуров" },
    ],
    cta: "Обсудить формат работы",
  },
  {
    icon: "MapPin",
    title: "Землевладельцам",
    role: "Ваш актив — основа проекта",
    color: "purple",
    intro: "Если у вас есть земельный участок и вы ищете модель его реализации — АО КСИ предлагает структурированные форматы вовлечения актива в проект через контуры КриптоМетров.",
    details: "Мы проводим анализ участка через Службу земельного поиска, оцениваем потенциал и предлагаем модель сопровождения через Центр реализации активов.",
    offers: [
      { icon: "Search", text: "Аналитический анализ участка" },
      { icon: "FileText", text: "Формирование цифрового досье актива" },
      { icon: "TrendingUp", text: "Структурирование модели реализации" },
      { icon: "ShieldCheck", text: "Сопровождение через Центр реализации" },
    ],
    cta: "Предоставить информацию об участке",
  },
  {
    icon: "BarChart3",
    title: "Владельцам активов",
    role: "Структурирование и вывод на рынок",
    color: "cyan",
    intro: "Владельцам объектов недвижимости и земельных активов — профессиональное структурирование, упаковка и сопровождение реализации через операторский контур АО КСИ.",
    details: "Центр реализации активов работает с задачами упаковки, структурирования и логики вывода на рынок. Студия проектного креатива обеспечивает визуальную и презентационную упаковку.",
    offers: [
      { icon: "FileText", text: "Упаковка и структурирование актива" },
      { icon: "Palette", text: "Визуальная и презентационная упаковка" },
      { icon: "TrendingUp", text: "Логика реализации и сопровождение" },
      { icon: "Users", text: "Интеграция подрядчиков и экспертов" },
    ],
    cta: "Обсудить работу с активом",
  },
  {
    icon: "Users",
    title: "Проектным командам",
    role: "Инструменты для принятия решений",
    color: "purple",
    intro: "Проектным и инвестиционным командам — доступ к аналитическим инструментам, земельным данным и интеллектуальным контурам системы КриптоМетры.",
    details: "Лаборатория ИИ предоставляет прогнозные модели и автоматизацию due diligence. Служба земельного поиска формирует структурированные досье. Студия креатива готовит презентационные материалы.",
    offers: [
      { icon: "BrainCircuit", text: "ИИ-аналитика и прогнозные модели" },
      { icon: "DatabaseZap", text: "Земельные данные и цифровые досье" },
      { icon: "Presentation", text: "Подготовка презентаций и концепций" },
      { icon: "Cpu", text: "Автоматизация аналитических процессов" },
    ],
    cta: "Обсудить инструменты",
  },
  {
    icon: "FlaskConical",
    title: "Бета-тестерам",
    role: "Участие в развитии системы",
    color: "cyan",
    intro: "АО КСИ приглашает профессиональных участников рынка к участию в тестировании, обучении и настройке интеллектуальных контуров КриптоМетров на реальных задачах.",
    details: "Вы можете подключиться к бета-тестированию отдельных контуров, участвовать в совместной отработке сценариев и помогать обучать систему на реальных данных.",
    offers: [
      { icon: "FlaskConical", text: "Тестирование отдельных контуров системы" },
      { icon: "Settings2", text: "Участие в обучении и настройке" },
      { icon: "GitBranch", text: "Совместная отработка сценариев" },
      { icon: "Rocket", text: "Участие в развитии виртуального девелопера" },
    ],
    cta: "Принять участие в тестировании",
  },
];

export default function Partners() {
  const [activeIdx, setActiveIdx] = useState(0);
  const aud = AUDIENCES[activeIdx];
  const isCyan = aud.color === "cyan";
  const accentColor = isCyan ? "#00d4ff" : "#7b2fff";
  const bgAccent = isCyan ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)";
  const borderAccent = isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)";

  return (
    <PageLayout breadcrumb={[{ label: "Сотрудничество" }]}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(123,47,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Сотрудничество</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Кому уже может<br />
              <span className="text-gradient-purple">быть полезно</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Выберите ваш профиль — и узнайте, как прикладные контуры АО КСИ
              могут решать ваши задачи уже сейчас.
            </p>
          </div>
        </div>
      </section>

      {/* Навигация */}
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
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 rounded-sm p-8" style={{ background: "rgba(255,255,255,0.015)", border: `1px solid ${borderAccent}` }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-sm flex items-center justify-center" style={{ background: bgAccent, border: `1px solid ${borderAccent}` }}>
                  <Icon name={aud.icon} size={22} style={{ color: accentColor }} />
                </div>
                <div>
                  <h2 className="font-oswald text-2xl font-semibold text-white">{aud.title}</h2>
                  <p className="font-ibm text-white/35 text-xs">{aud.role}</p>
                </div>
              </div>
              <p className="font-ibm text-white/60 text-base leading-relaxed mb-4">{aud.intro}</p>
              <p className="font-ibm text-white/40 text-sm leading-relaxed mb-8">{aud.details}</p>
              <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm inline-block cursor-pointer"
                style={!isCyan ? { background: "linear-gradient(135deg, #7b2fff, #a855f7)", color: "#fff" } : {}}>
                {aud.cta}
              </a>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-1 px-1">ЧТО МЫ ПРЕДЛАГАЕМ</div>
              {aud.offers.map((offer, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: bgAccent, border: `1px solid ${borderAccent}` }}>
                    <Icon name={offer.icon} size={15} style={{ color: accentColor }} />
                  </div>
                  <span className="font-ibm text-white/55 text-sm">{offer.text}</span>
                </div>
              ))}

              <div className="mt-auto pt-5 border-t border-ksi-border/30">
                <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-3">ДРУГИЕ ПРОФИЛИ</div>
                {AUDIENCES.filter((_, i) => i !== activeIdx).map((a, i) => (
                  <button key={i} onClick={() => setActiveIdx(AUDIENCES.indexOf(a))}
                    className="w-full flex items-center gap-3 py-2 text-left group">
                    <Icon name={a.icon} size={13} className="text-white/20 group-hover:text-white/45 transition-colors" />
                    <span className="font-ibm text-white/25 text-xs group-hover:text-white/50 transition-colors">{a.title}</span>
                    <Icon name="ArrowRight" size={11} className="ml-auto text-white/15 group-hover:text-white/35 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Общее приглашение */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center p-12 rounded-sm relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(123,47,255,0.04) 100%)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/30 to-transparent" />
            <h3 className="font-oswald text-3xl font-semibold text-white mb-3">Не нашли свой профиль?</h3>
            <p className="font-ibm text-white/45 text-base mb-8 max-w-lg mx-auto">
              Опишите вашу задачу — команда АО КСИ ответит по существу
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contacts" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">Связаться с командой</a>
              <a href="/cryptometry" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">О проекте КриптоМетры</a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
