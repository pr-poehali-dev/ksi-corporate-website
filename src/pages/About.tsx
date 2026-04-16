import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

export default function About() {
  return (
    <PageLayout breadcrumb={[{ label: "О компании" }]}>
      {/* Hero */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/files/10c8e8f3-5bfd-4d3a-bc58-2c67d60c7c99.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.12 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.6) 50%, rgba(10,10,15,0.88) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.4) 0%, rgba(10,10,15,0.92) 100%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ О компании</div>
            <h1 className="font-oswald text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
              Акционерное общество «КриптоСтройИнвест»
              <span className="block text-white/60 text-2xl md:text-3xl xl:text-4xl mt-1">(АО КСИ)</span>
            </h1>
            <h2 className="font-oswald font-medium text-xl md:text-2xl leading-snug mb-8">
              <span className="text-gradient-main">Оператор интеллектуальной инфраструктуры</span>{" "}
              <span className="text-white/75">для девелопмента</span>
            </h2>
            <p className="font-ibm text-white/50 text-lg leading-relaxed mb-5">
              АО КСИ развивает внутренние службы и прикладные контуры, обеспечивающие
              создание виртуального девелопера. Ключевой проект компании — «КриптоМетры»,
              интеллектуальная система распределённого девелопмента.
            </p>
            <p className="font-ibm text-white/30 text-base leading-relaxed mb-8">
              Акционерное общество, зарегистрированное по российскому корпоративному законодательству.
              Основана в 2023 году. Москва.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/cryptometry" className="btn-primary-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer">Проект КриптоМетры</a>
              <a href="/directions" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer">Внутренние службы</a>
              <a href="/roadmap" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer" style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>Roadmap</a>
            </div>
          </div>
        </div>
      </section>

      {/* Миссия */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label mb-5">◆ Замысел</div>
              <h2 className="font-oswald text-4xl font-semibold text-white leading-tight mb-6">
                Что стоит за<br />
                <span className="text-gradient-cyan">АО КСИ</span>
              </h2>
              <p className="font-ibm text-white/55 text-lg leading-relaxed mb-5">
                Оператор интеллектуальной инфраструктуры для девелопмента.
                Управляющая компания проекта «КриптоМетры» — интеллектуальной системы
                распределённого девелопмента.
              </p>
              <p className="font-ibm text-white/40 text-base leading-relaxed mb-5">
                Ключевой проект компании — «КриптоМетры», интеллектуальная система
                распределённого девелопмента. Каждая внутренняя служба, каждый обученный
                контур — это движение к системе, меняющей подход к работе с недвижимостью.
              </p>
              <p className="font-ibm text-white/30 text-base leading-relaxed">
                Горизонт работы — долгий. Модель — системная.
                Ценность накапливается в инфраструктуре, данных и профессиональных компетенциях.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Год основания", value: "2023", color: "cyan" },
                  { label: "Правовая форма", value: "АО", color: "purple" },
                  { label: "Внутренние службы", value: "4", color: "cyan" },
                  { label: "Ключевой проект", value: "КМ", color: "purple" },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-sm text-center" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className={`font-oswald text-3xl font-bold mb-2 ${item.color === "cyan" ? "text-gradient-cyan" : "text-gradient-purple"}`}>{item.value}</div>
                    <div className="font-ibm text-white/40 text-xs tracking-wide uppercase">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-sm" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-mono-ibm text-ksi-cyan/40 text-xs mb-3 tracking-widest">ПОЗИЦИОНИРОВАНИЕ</div>
                <div className="space-y-2">
                  {[
                    "Оператор интеллектуальной инфраструктуры",
                    "Управляющая компания",
                    "Проект виртуального девелопера",
                    "Ключевой проект — КриптоМетры",
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan/40 flex-shrink-0" />
                      <span className="font-ibm text-white/45 text-sm">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Что строит компания */}
      <section className="py-20 border-t border-ksi-border/30"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,14,26,1), rgba(10,10,15,1))" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Логика проекта</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-4">
            Как устроен<br /><span className="text-gradient-main">проект АО КСИ</span>
          </h2>
          <p className="font-ibm text-white/42 text-base mb-12 max-w-2xl">
            Компания строит систему послойно: от внутренних служб и прикладных контуров —
            к единому интеллектуальному ядру.
          </p>

          <div className="space-y-1">
            {[
              { level: "Управляющая компания", name: "АО КриптоСтройИнвест", desc: "Стратегия, управление, технологическая надстройка", color: "#00d4ff" },
              { level: "Ключевой проект", name: "КриптоМетры", desc: "Интеллектуальная система распределённого девелопмента", color: "#00d4ff" },
              { level: "Технологическое ядро", name: "Лаборатория ИИ", desc: "Интеллектуальная инфраструктура, обучение, развитие системы", color: "#7b2fff" },
              { level: "Операторский контур", name: "Центр реализации активов", desc: "Сопровождение и реализация активов в логике проекта", color: "#00d4ff" },
              { level: "Земельный контур", name: "Служба земельного поиска", desc: "Поиск, анализ площадок, земельно-имущественные задачи", color: "#7b2fff" },
              { level: "Креативный контур", name: "Студия проектного креатива", desc: "Визуальная, концептуальная и презентационная упаковка", color: "#00d4ff" },
            ].map((item, i) => (
              <div key={i} className="flex items-stretch group"
                style={{ borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div className="w-0.5 flex-shrink-0" style={{ background: item.color, opacity: 0.35 }} />
                <div className="flex items-center px-4 flex-shrink-0 w-10"
                  style={{ background: "rgba(255,255,255,0.01)" }}>
                  <span className="font-ibm text-[9px]" style={{ color: item.color, opacity: 0.5 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 grid md:grid-cols-3 gap-4 py-4 pr-6" style={{ paddingLeft: i * 12 }}>
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
            ))}
          </div>

          <div className="mt-10 flex gap-4">
            <a href="/directions" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer">Подробнее о службах</a>
            <a href="/cryptometry" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer" style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>О проекте КриптоМетры</a>
          </div>
        </div>
      </section>

      {/* Принципы */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Принципы</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-3">На чём строится проект</h2>
          <p className="font-ibm text-white/40 text-base mb-12 max-w-2xl">
            Не декларации. Операционные ограничения, которым следует команда при каждом решении.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "Layers", title: "Системность", desc: "Каждое решение — часть архитектуры. Компания строится как управляемая система, а не набор проектов.", color: "#00d4ff" },
              { icon: "Clock", title: "Долгий горизонт", desc: "Виртуальный девелопер не появится за ночь. Ценность создаётся через инфраструктуру и компетенции, которые накапливаются.", color: "#7b2fff" },
              { icon: "UserCheck", title: "Профессиональный стандарт", desc: "Работаем с профессиональными участниками рынка. Уровень диалога и качество результата соответствуют.", color: "#00d4ff" },
              { icon: "Eye", title: "Прозрачность стадии", desc: "Публично обозначаем стадию каждого контура. Активна, Beta, R&D — без преувеличения готовности.", color: "#7b2fff" },
            ].map((v, i) => (
              <div key={i} className="p-6 rounded-sm" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                  style={{ background: `${v.color}08`, border: `1px solid ${v.color}18` }}>
                  <Icon name={v.icon} size={18} style={{ color: v.color, opacity: 0.7 }} />
                </div>
                <div className="font-oswald text-white/80 font-medium text-base mb-2">{v.title}</div>
                <p className="font-ibm text-white/38 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Философия */}
      <section className="py-20 border-t border-ksi-border/30"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,22,1), rgba(10,10,15,1))" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="section-label mb-4 justify-center flex">◆ Замысел</div>
          <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight mb-8">
            Почему<br /><span className="text-gradient-main">виртуальный девелопер</span>
          </h2>
          <p className="font-ibm text-white/48 text-base leading-relaxed mb-5">
            Девелопмент — одна из самых сложных и хаотичных отраслей.
            Десятки участников, сотни решений, тысячи документов — и при этом
            критически мало интеллектуальной инфраструктуры, которая помогает
            принимать решения, а не только фиксировать их.
          </p>
          <p className="font-ibm text-white/35 text-base leading-relaxed mb-5">
            АО КСИ создаётся для того, чтобы построить эту инфраструктуру.
            Не заменить людей алгоритмами — а усилить профессионалов
            через интеллектуальные контуры, методологию и операторский контроль.
          </p>
          <p className="font-ibm text-white/22 text-sm leading-relaxed">
            Это долгий путь. Но каждый день работы — это шаг к системе,
            которая однажды изменит способ работы с недвижимостью.
          </p>
        </div>
      </section>

      {/* Команда */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Команда</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-3">Команда проекта</h2>
          <p className="font-ibm text-white/45 text-base mb-10 max-w-2xl">Информация о команде предоставляется по запросу</p>
          <div className="p-8 rounded-sm text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <Icon name="Users" size={32} className="text-white/20 mx-auto mb-4" />
            <p className="font-ibm text-white/35 text-sm mb-5">
              Информация о составе команды и ключевых специалистах
              доступна для верифицированных партнёров и участников проекта.
            </p>
            <a href="/contacts" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm inline-block cursor-pointer">
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
              <div className="p-8 rounded-sm h-full" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-4">ПРАВОВАЯ ОГОВОРКА</div>
                <p className="font-ibm text-white/42 text-sm leading-relaxed mb-4">
                  АО «КриптоСтройИнвест» не осуществляет и не организует публичное
                  привлечение денежных средств от физических и юридических лиц.
                </p>
                <p className="font-ibm text-white/42 text-sm leading-relaxed mb-4">
                  Отдельные модели участия в проектах компании реализуются исключительно
                  в рамках индивидуально структурируемых юридических конструкций —
                  партнёрских соглашений, корпоративных договоров или иных
                  предусмотренных законом механизмов.
                </p>
                <p className="font-ibm text-white/42 text-sm leading-relaxed">
                  Деятельность компании осуществляется в соответствии с требованиями
                  действующего российского законодательства.
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
            <h3 className="font-oswald text-3xl font-semibold text-white mb-3">Обсудить участие в проекте</h3>
            <p className="font-ibm text-white/45 text-base mb-8 max-w-lg mx-auto">
              Если вам близка идея интеллектуального девелопмента —
              команда открыта к диалогу
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contacts" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">Связаться с командой</a>
              <a href="/cryptometry" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">О проекте КриптоМетры</a>
              <a href="/directions" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">Внутренние службы</a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}