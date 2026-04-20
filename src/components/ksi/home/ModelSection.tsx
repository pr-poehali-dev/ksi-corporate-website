import { Reveal } from "./Reveal";

export function ModelSection() {
  return (
    <section className="py-24 border-t border-white/6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[500px] h-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at right, #00d4ff 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Левая — суть */}
          <div>
            <Reveal delay={0}>
              <div className="section-label mb-5">◆ Новая категория</div>
              <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-8">
                Виртуальный девелопер —<br />
                <span className="text-gradient-main">это не метафора</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="font-ibm text-white/55 text-lg leading-relaxed mb-6">
                АО КСИ строит систему, которая умеет думать как девелопер: анализировать землю,
                формировать концепцию, моделировать финансы, структурировать партнёрства.
              </p>
              <p className="font-ibm text-white/38 text-base leading-relaxed mb-8">
                Пока система обучается — её интеллект уже доступен. Сотрудники АО КСИ,
                усиленные точно настроенными ИИ-инструментами, решают реальные задачи рынка.
                Каждый запрос становится частью обучения.
              </p>
              <div className="border-l-2 border-ksi-cyan/30 pl-6">
                <p className="font-ibm text-white/60 text-base italic leading-relaxed">
                  «Доступ к интеллекту девелопера — уже сейчас.<br />
                  Участие в его обучении — навсегда.»
                </p>
              </div>
            </Reveal>
          </div>

          {/* Правая — схема работы */}
          <Reveal delay={100}>
            <div className="space-y-3">
              {[
                {
                  num: "01",
                  accent: "cyan",
                  title: "Участник ставит задачу",
                  desc: "Анализ участка, финансовая модель, концепция застройки, структура партнёрства — любая реальная девелоперская задача.",
                },
                {
                  num: "02",
                  accent: "purple",
                  title: "Виртуальный девелопер формирует решение",
                  desc: "Команда АО КСИ + ИИ-инструменты обрабатывают запрос. Результат — документ, аналитика или рекомендация.",
                },
                {
                  num: "03",
                  accent: "cyan",
                  title: "Система обучается",
                  desc: "Кейс фиксируется. Паттерн записывается. Виртуальный девелопер становится умнее.",
                },
                {
                  num: "04",
                  accent: "purple",
                  title: "Участник получает КриптоМетры",
                  desc: "За вклад в обучение начисляются КриптоМетры — единицы зафиксированного участия в системе.",
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-5 p-5 border border-white/8 bg-white/[0.02] rounded-sm group hover:border-white/15 transition-all">
                  <span className={`font-ibm text-xs font-bold flex-shrink-0 mt-1 w-7 ${item.accent === "cyan" ? "text-ksi-cyan" : "text-purple-400"}`}>
                    {item.num}
                  </span>
                  <div>
                    <div className="font-oswald text-white text-lg font-medium mb-1">{item.title}</div>
                    <div className="font-ibm text-white/38 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}