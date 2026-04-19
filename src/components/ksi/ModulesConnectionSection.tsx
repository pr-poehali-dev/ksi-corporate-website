import { useState } from "react";
import Icon from "@/components/ui/icon";

const TARIFFS = [
  {
    id: "basic",
    color: "#00d4ff",
    label: "Базовое подключение",
    sub: "Один модуль — одна задача",
    desc: "Для тестовой или точечной задачи. Понятный вход в систему без лишних обязательств.",
    features: [
      "1 прикладной модуль",
      "Обработка запроса до 24 часов",
      "Верификация специалистом АО КСИ",
      "Финальный структурированный результат",
    ],
    cta: "Подключить модуль",
    href: "/contacts?plan=basic",
    accent: false,
  },
  {
    id: "pro",
    color: "#a070ff",
    label: "Профессиональный контур",
    sub: "Несколько модулей — регулярная работа",
    desc: "Для компаний, которым нужна системная прикладная поддержка по нескольким направлениям.",
    features: [
      "До 3 прикладных модулей",
      "Приоритетная обработка запросов",
      "Ускоренный режим до 12 часов",
      "Персональный специалист сопровождения",
    ],
    cta: "Обсудить конфигурацию",
    href: "/contacts?plan=pro",
    accent: true,
  },
  {
    id: "custom",
    color: "#7b2fff",
    label: "Индивидуальная сборка",
    sub: "Кастомная конфигурация под компанию",
    desc: "Для тех, кто хочет настроить полноценный интеллектуальный контур под свою рабочую среду.",
    features: [
      "Все доступные модули",
      "Индивидуальная логика работы",
      "Интеграция нескольких контуров",
      "Стратегический диалог с АО КСИ",
    ],
    cta: "Собрать решение",
    href: "/contacts?plan=custom",
    accent: false,
  },
];

const MODULES = [
  {
    id: "lss",
    icon: "Search",
    color: "#00d4ff",
    title: "Служба земельного поиска",
    result: "Поиск площадок, анализ участков, подготовка земельного актива к диалогу и рынку",
    requests: [
      "Подберите 10 участков под light industrial в МО",
      "Найдите площадки под редевелопмент в границах Москвы",
      "Сравните 3 участка по потенциалу девелопмента",
      "Подготовьте первичное досье по площадке",
    ],
    href: "/directions/lss",
  },
  {
    id: "assets",
    icon: "TrendingUp",
    color: "#a070ff",
    title: "Центр реализации активов",
    result: "Капитализация, структурирование и сопровождение вывода актива в реализацию",
    requests: [
      "Упакуйте актив в форму для переговоров с девелопером",
      "Подготовьте сценарии реализации участка",
      "Помогите вывести актив в диалог с инвестором",
      "Соберите материалы для продажи или совместного освоения",
    ],
    href: "/directions/fee-dev",
  },
  {
    id: "creative",
    icon: "Palette",
    color: "#00d4ff",
    title: "Студия проектного креатива",
    result: "Презентации, визуальные концепции, экспресс-упаковка и подготовка к переговорам",
    requests: [
      "Соберите презентацию проекта за 24 часа",
      "Подготовьте материалы к переговорам с землевладельцем",
      "Проверьте визуальную гипотезу участка",
      "Сгенерируйте 3 направления архитектурной подачи",
    ],
    href: "/directions/ai-production",
  },
  {
    id: "ai-lab",
    icon: "BrainCircuit",
    color: "#7b2fff",
    title: "Лаборатория ИИ",
    result: "Прикладные ИИ-контуры, автоматизация, базы знаний и интеллектуальные сценарии",
    requests: [
      "Настройте бота по базе знаний компании",
      "Оцените, какие процессы можно автоматизировать ИИ",
      "Соберите внутренний ИИ-контур для команды развития",
      "Подготовьте сценарий интеллектуальной обработки входящих данных",
    ],
    href: "/directions/ai-lab",
  },
];

export function ModulesConnectionSection() {
  const [openModule, setOpenModule] = useState<string | null>(null);

  return (
    <section
      id="connect"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(8,6,18,1), rgba(12,9,26,1), rgba(8,6,18,1))" }}
    >
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.6) 30%, rgba(123,47,255,0.6) 70%, transparent 100%)" }} />
      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(123,47,255,0.4) 30%, rgba(0,212,255,0.4) 70%, transparent 100%)" }} />

      {/* Ambient glow top-left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)" }} />
      {/* Ambient glow bottom-right */}
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)" }} />

      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="section-label">◆ Подключение</div>
              <div
                className="px-3 py-1 rounded-sm font-mono-ibm text-[9px] tracking-widest uppercase"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.35)", color: "#00d4ff" }}
              >
                Доступно сейчас
              </div>
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              Подключение модулей<br />
              <span className="text-gradient-main">АО КСИ</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-3">
              Выберите формат, получите доступ к нужным модулям и ставьте запросы
              через интеллектуальный контур системы.
            </p>
            <p className="font-ibm text-white/38 text-sm leading-relaxed">
              Каждый модуль подключается как самостоятельный контур и в дальнейшем становится частью единой системы КриптоМетров.
            </p>
          </div>
          <a
            href="/contacts?plan=basic"
            className="btn-primary-ksi px-7 py-3.5 rounded-sm text-sm cursor-pointer whitespace-nowrap self-start md:self-auto flex-shrink-0"
          >
            Начать прямо сейчас
          </a>
        </div>

        {/* Tariffs */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {TARIFFS.map((t) => (
            <div
              key={t.id}
              className="relative flex flex-col p-7 rounded-sm overflow-hidden transition-transform duration-200 hover:-translate-y-1"
              style={{
                background: t.accent
                  ? `linear-gradient(160deg, ${t.color}12 0%, rgba(10,8,22,1) 60%)`
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${t.accent ? `${t.color}55` : "rgba(255,255,255,0.09)"}`,
                boxShadow: t.accent
                  ? `0 0 60px ${t.color}18, inset 0 1px 0 ${t.color}25`
                  : "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${t.color}${t.accent ? "cc" : "60"}, transparent)` }}
              />
              {t.accent && (
                <>
                  <div className="absolute inset-0 pointer-events-none rounded-sm" style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${t.color}08 0%, transparent 60%)` }} />
                  <div
                    className="absolute top-4 right-4 px-2.5 py-1 rounded-sm font-mono-ibm text-[9px] tracking-widest uppercase"
                    style={{ background: `${t.color}22`, border: `1px solid ${t.color}55`, color: t.color }}
                  >
                    Популярный
                  </div>
                </>
              )}

              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center mb-5"
                style={{ background: `${t.color}10`, border: `1px solid ${t.color}28` }}
              >
                <Icon name={t.id === "basic" ? "Package" : t.id === "pro" ? "Layers" : "Settings2"} size={20} style={{ color: t.color }} />
              </div>

              <h3 className="font-oswald text-white text-xl font-medium mb-1 leading-tight">{t.label}</h3>
              <div className="font-mono-ibm text-[10px] tracking-widest uppercase mb-4" style={{ color: t.color, opacity: 0.8 }}>{t.sub}</div>
              <p className="font-ibm text-white/50 text-sm leading-relaxed mb-6">{t.desc}</p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-ibm text-white/60 text-sm">
                    <Icon name="Check" size={14} style={{ color: t.color, opacity: 0.8 }} className="mt-[3px] flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={t.href}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm font-oswald text-sm tracking-wider uppercase transition-all"
                style={{
                  background: t.accent ? `${t.color}20` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${t.accent ? `${t.color}50` : "rgba(255,255,255,0.1)"}`,
                  color: t.accent ? t.color : "rgba(255,255,255,0.65)",
                }}
              >
                {t.cta}
                <Icon name="ArrowRight" size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Modules */}
        <div className="mb-14">
          <div className="flex items-baseline gap-4 mb-8">
            <h3 className="font-oswald text-2xl md:text-3xl text-white font-medium">Доступные модули</h3>
            <span className="font-mono-ibm text-[10px] tracking-widest uppercase text-white/35">Нажмите — увидите примеры запросов</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {MODULES.map((m) => (
              <div key={m.id} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenModule(openModule === m.id ? null : m.id)}
                  className="w-full text-left p-6 rounded-sm transition-all duration-200 cursor-pointer"
                  style={{
                    background: openModule === m.id ? `${m.color}07` : "rgba(255,255,255,0.015)",
                    border: `1px solid ${openModule === m.id ? `${m.color}35` : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ background: `${m.color}10`, border: `1px solid ${m.color}28` }}
                    >
                      <Icon name={m.icon} size={20} style={{ color: m.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h4 className="font-oswald text-white text-lg font-medium leading-tight">{m.title}</h4>
                        <Icon
                          name={openModule === m.id ? "ChevronUp" : "ChevronDown"}
                          size={16}
                          style={{ color: m.color, opacity: 0.7, flexShrink: 0 }}
                        />
                      </div>
                      <p className="font-ibm text-white/50 text-sm leading-relaxed">{m.result}</p>
                    </div>
                  </div>
                </button>

                {openModule === m.id && (
                  <div
                    className="mt-1 p-6 rounded-sm"
                    style={{ background: `${m.color}05`, border: `1px solid ${m.color}25` }}
                  >
                    <div className="font-mono-ibm text-[10px] tracking-widest uppercase mb-4" style={{ color: m.color, opacity: 0.8 }}>
                      Примеры запросов
                    </div>
                    <ul className="space-y-2.5 mb-5">
                      {m.requests.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 font-ibm text-white/70 text-sm leading-relaxed p-3 rounded-sm"
                          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
                        >
                          <Icon name="MessageSquare" size={13} style={{ color: m.color, opacity: 0.65 }} className="mt-[3px] flex-shrink-0" />
                          <span>«{r}»</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={m.href}
                      className="inline-flex items-center gap-2 font-oswald text-xs tracking-wider uppercase transition-all"
                      style={{ color: m.color, opacity: 0.85 }}
                    >
                      Подробнее о модуле <Icon name="ArrowRight" size={13} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div
          className="p-8 md:p-10 rounded-sm relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,212,255,0.05) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="font-oswald text-2xl md:text-3xl text-white font-medium mb-3 leading-tight">
                Начать с одного модуля или собрать свой контур
              </h3>
              <p className="font-ibm text-white/55 text-base leading-relaxed">
                АО КСИ помогает подключиться к системе поэтапно: от одной прикладной задачи
                до конфигурации нескольких модулей под вашу рабочую среду.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 flex-shrink-0">
              <a href="/contacts?plan=basic" className="btn-primary-ksi px-6 py-3 rounded-sm text-sm cursor-pointer whitespace-nowrap">
                Подключить модуль
              </a>
              <a href="/contacts?plan=pro" className="btn-outline-ksi px-6 py-3 rounded-sm text-sm cursor-pointer whitespace-nowrap">
                Обсудить конфигурацию
              </a>
              <a
                href="/contacts?topic=demo"
                className="px-6 py-3 rounded-sm font-oswald text-sm tracking-wider uppercase cursor-pointer whitespace-nowrap transition-all"
                style={{ border: "1px solid rgba(123,47,255,0.4)", color: "#a070ff" }}
              >
                Запросить демо
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}