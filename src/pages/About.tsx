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
              <span className="text-gradient-main">Оператор интеллектуальной системы</span>{" "}
              <span className="text-white/75">распределённого девелопмента</span>
            </h2>
            <p className="font-ibm text-white/50 text-lg leading-relaxed mb-5">
              АО КСИ — оператор и субъект, стоящий за развитием интеллектуальной системы
              распределённого девелопмента. Компания отвечает за стратегию, архитектуру и
              стандарт работы системы. Это не сервис и не разовый проект — это длинная
              операторская задача с долгим горизонтом.
            </p>
            <p className="font-ibm text-white/30 text-base leading-relaxed mb-8">
              Акционерное общество, зарегистрированное по российскому корпоративному законодательству.
              Запущена в 2026 году. Москва.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/ecosystem" className="btn-primary-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer">Как устроена система</a>
              <a href="/cryptometry" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer">Проект КриптоМетры</a>
              <a href="/roadmap" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer" style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>Roadmap</a>
            </div>
          </div>
        </div>
      </section>

      {/* Кто такие АО КСИ */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label mb-5">◆ Кто такие АО КСИ</div>
              <h2 className="font-oswald text-4xl font-semibold text-white leading-tight mb-6">
                Компания, которая<br />
                <span className="text-gradient-cyan">строит систему</span>
              </h2>
              <p className="font-ibm text-white/55 text-lg leading-relaxed mb-5">
                АО «КриптоСтройИнвест» — российское акционерное общество, оператор
                интеллектуальной системы распределённого девелопмента. Компания отвечает
                за стратегию, развитие архитектуры и операционную работу системы.
              </p>
              <p className="font-ibm text-white/40 text-base leading-relaxed mb-5">
                Фокус — не отдельный продукт и не разовый проект. АО КСИ строит длинную
                инфраструктуру, в которой профессионалы рынка, активы и интеллектуальные
                контуры могут работать вместе по новым правилам.
              </p>
              <p className="font-ibm text-white/30 text-base leading-relaxed">
                Горизонт — долгий. Модель — распределённая и операторская. Ценность
                накапливается в инфраструктуре, данных, участниках и профессиональных компетенциях.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Год запуска", value: "2026", color: "cyan" },
                  { label: "Правовая форма", value: "АО", color: "purple" },
                  { label: "Юрисдикция", value: "РФ", color: "cyan" },
                  { label: "Горизонт работы", value: "10+", color: "purple" },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-sm text-center" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className={`font-oswald text-3xl font-bold mb-2 ${item.color === "cyan" ? "text-gradient-cyan" : "text-gradient-purple"}`}>{item.value}</div>
                    <div className="font-ibm text-white/40 text-xs tracking-wide uppercase">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-sm" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-mono-ibm text-ksi-cyan/40 text-xs mb-3 tracking-widest">КОРОТКО О КОМПАНИИ</div>
                <div className="space-y-2">
                  {[
                    "Оператор интеллектуальной системы распределённого девелопмента",
                    "Профессиональный фокус на девелопменте и активах",
                    "Долгий горизонт и системная модель работы",
                    "Прозрачная стадия каждого контура",
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

      {/* Роль оператора */}
      <section className="py-20 border-t border-ksi-border/30"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,14,26,1), rgba(10,10,15,1))" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Роль оператора</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-4">
            Что АО КСИ делает<br /><span className="text-gradient-main">как оператор системы</span>
          </h2>
          <p className="font-ibm text-white/45 text-base mb-12 max-w-2xl">
            Без оператора распределённый девелопмент остаётся набором отдельных ролей. АО КСИ собирает их в управляемую
            систему — отвечает за стратегию, архитектуру, развитие и операционный контур.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "Compass", title: "Стратегия", desc: "Задаёт направление развития системы, рамку и приоритеты на горизонте лет." },
              { icon: "Layers", title: "Архитектура", desc: "Определяет, как устроены контуры, как они связаны и как масштабируются." },
              { icon: "Activity", title: "Операционный контур", desc: "Ведёт ежедневную работу системы, координирует контуры и участников." },
              { icon: "Sparkles", title: "Развитие", desc: "Развивает интеллектуальный контур, методологию и стандарты работы." },
            ].map((item, i) => {
              const accent = i % 2 === 0 ? "#00d4ff" : "#7b2fff";
              return (
                <div key={i} className="p-6 rounded-sm" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                    style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}>
                    <Icon name={item.icon} size={18} style={{ color: accent, opacity: 0.8 }} />
                  </div>
                  <div className="font-oswald text-white/85 font-medium text-base mb-2">{item.title}</div>
                  <p className="font-ibm text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/ecosystem" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer">Как устроена система →</a>
            <a href="/directions" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm cursor-pointer" style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>Внутренние службы</a>
          </div>
        </div>
      </section>

      {/* Принципы */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">◆ Подход</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-3">На чём строится работа компании</h2>
          <p className="font-ibm text-white/40 text-base mb-12 max-w-2xl">
            Не декларации. Операционные ограничения, которым следует команда при каждом решении.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "Clock", title: "Долгий горизонт", desc: "Система не появится за ночь. Компания работает на длинной дистанции — ценность создаётся через инфраструктуру, участников и компетенции.", color: "#00d4ff" },
              { icon: "UserCheck", title: "Профессиональный стандарт", desc: "АО КСИ работает с профессиональными участниками рынка. Уровень диалога и качество результата соответствуют.", color: "#7b2fff" },
              { icon: "Eye", title: "Прозрачность стадии", desc: "Публично обозначаем стадию каждого контура. Активна, Beta, R&D — без преувеличения готовности.", color: "#00d4ff" },
              { icon: "ShieldCheck", title: "Операторская ответственность", desc: "Компания не передаёт критические решения вовне. За архитектуру, развитие и стандарт работы отвечает оператор.", color: "#7b2fff" },
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

      {/* Почему именно АО КСИ */}
      <section className="py-20 border-t border-ksi-border/30"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(13,13,22,1), rgba(10,10,15,1))" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="section-label mb-4 justify-center flex">◆ Почему именно АО КСИ</div>
          <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight mb-8">
            Почему эта компания —<br /><span className="text-gradient-main">оператор системы</span>
          </h2>
          <p className="font-ibm text-white/48 text-base leading-relaxed mb-5">
            Распределённый девелопмент не появляется сам. Чтобы он работал, нужен оператор —
            субъект, который отвечает за архитектуру, стандарты, развитие и операционный контур.
            АО КСИ занимает именно эту роль.
          </p>
          <p className="font-ibm text-white/35 text-base leading-relaxed mb-5">
            Компания создавалась не как сервис и не как продуктовая команда. Это
            юридическое лицо с долгим горизонтом, профессиональным фокусом на девелопменте
            и недвижимости и операторской ответственностью за систему.
          </p>
          <p className="font-ibm text-white/22 text-sm leading-relaxed">
            Без такого оператора распределённый девелопмент остаётся идеей.
            С ним — он становится управляемой системой.
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