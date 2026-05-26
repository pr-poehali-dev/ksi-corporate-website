import { useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const AUDIENCES = [
  {
    icon: "Building2",
    title: "Девелоперам",
    role: "Участие в кооперативной системе АО КСИ",
    color: "cyan",
    intro: "Девелоперам — вход в интеллектуальную систему кооперативного девелопмента: подключение к прикладным контурам, доступ к управляющему ИИ-слою и работа с активами в новой логике.",
    details: "Земельный контур даёт данные и площадки, Лаборатория ИИ — управляющий аналитический слой, Центр реализации — операторскую поддержку, Студия креатива — упаковку решений. Все контуры работают как единая система внутри КриптоМетров.",
    offers: [
      { icon: "Search", text: "Доступ к земельному контуру и аналитике" },
      { icon: "BrainCircuit", text: "Управляющий ИИ-слой для анализа и due diligence" },
      { icon: "TrendingUp", text: "Операторская поддержка Центра реализации" },
      { icon: "FlaskConical", text: "Участие в развитии кооперативной модели" },
    ],
    cta: "Обсудить участие",
  },
  {
    icon: "MapPin",
    title: "Землевладельцам",
    role: "Ваш актив внутри кооперативной системы",
    color: "purple",
    intro: "Землевладельцам — структурированные форматы вовлечения участка в кооперативную систему АО КСИ через земельный контур и интеллектуальный слой КриптоМетров.",
    details: "Земельный контур анализирует участок и формирует цифровое досье, ИИ-контур оценивает потенциал, Центр реализации структурирует сценарий капитализации внутри кооперативной модели.",
    offers: [
      { icon: "Search", text: "Анализ участка через земельный контур" },
      { icon: "FileText", text: "Цифровое досье актива в системе" },
      { icon: "TrendingUp", text: "Структурирование сценария капитализации" },
      { icon: "ShieldCheck", text: "Сопровождение внутри кооперативной модели" },
    ],
    cta: "Передать актив в работу",
  },
  {
    icon: "BarChart3",
    title: "Владельцам активов",
    role: "Капитализация и вывод внутри системы",
    color: "cyan",
    intro: "Владельцам объектов и портфельных позиций — упаковка, капитализация и вывод актива через прикладной контур кооперативной системы АО КСИ.",
    details: "Центр реализации формирует сценарий вывода (продажа, совместное освоение, инвестиционный диалог), Студия креатива упаковывает актив, Лаборатория ИИ обеспечивает управляющий аналитический слой.",
    offers: [
      { icon: "FileText", text: "Упаковка и структурирование актива" },
      { icon: "Palette", text: "Визуальная и презентационная упаковка" },
      { icon: "TrendingUp", text: "Сценарии реализации в логике системы" },
      { icon: "Users", text: "Подключение к контуру партнёров системы" },
    ],
    cta: "Обсудить актив",
  },
  {
    icon: "Handshake",
    title: "Стратегическим партнёрам",
    role: "Участие в сборке кооперативной системы",
    color: "purple",
    intro: "Стратегическим партнёрам — участие в практической сборке кооперативной системы АО КСИ: пилотные сценарии, развитие прикладных контуров и совместная отработка моделей.",
    details: "Это партнёрство не как подряд, а как соучастие в архитектуре новой системы. Доступ к ИИ-контуру, прикладным модулям и кооперативной логике взаимодействия с участниками.",
    offers: [
      { icon: "GitBranch", text: "Совместная отработка кооперативных сценариев" },
      { icon: "Network", text: "Доступ к управляющему ИИ-контуру системы" },
      { icon: "Briefcase", text: "Подключение собственных активов и проектов" },
      { icon: "Rocket", text: "Участие в развитии кооперативной архитектуры" },
    ],
    cta: "Обсудить партнёрство",
  },
  {
    icon: "FlaskConical",
    title: "Участникам пилотных контуров",
    role: "Тестирование и развитие модулей",
    color: "cyan",
    intro: "АО КСИ приглашает профессиональных участников рынка к тестированию прикладных контуров кооперативной системы и обучению интеллектуального управляющего слоя на реальных задачах.",
    details: "Подключение к бета-тестированию отдельных модулей, совместная отработка сценариев, участие в настройке кооперативной модели — внутри управляемой среды АО КСИ.",
    offers: [
      { icon: "FlaskConical", text: "Тестирование прикладных контуров" },
      { icon: "Settings2", text: "Подключение к настройке управляющего слоя" },
      { icon: "GitBranch", text: "Совместная отработка реальных сценариев" },
      { icon: "Rocket", text: "Участие в практической сборке системы" },
    ],
    cta: "Подключиться к контуру",
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
            <div className="section-label mb-5">◆ Участие в системе</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Участники<br />
              <span className="text-gradient-purple">кооперативной системы</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              АО КСИ — оператор интеллектуальной системы кооперативного девелопмента. Это
              не подряд и не коллаборация — это участие в сборке и развитии новой архитектуры.
              Выберите ваш профиль, чтобы увидеть формат входа в контур.
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
              <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-1 px-1">ФОРМАТЫ ВХОДА В СИСТЕМУ</div>
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
            <h3 className="font-oswald text-3xl font-semibold text-white mb-3">Свой профиль не подходит?</h3>
            <p className="font-ibm text-white/45 text-base mb-8 max-w-lg mx-auto">
              Опишите задачу или сценарий участия — команда АО КСИ ответит по существу
              и предложит формат входа в кооперативную систему.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contacts" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">Обсудить участие</a>
              <a href="/cryptometry" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">О проекте КриптоМетры</a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}