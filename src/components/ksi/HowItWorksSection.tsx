export function HowItWorksSection() {
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-label mb-4">◆ Как это работает</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white mb-16 leading-tight">
          Интеллект девелопера —<br />
          <span className="text-gradient-main">доступен прямо сейчас</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Левая колонка — объяснение */}
          <div>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-8">
              Пока система виртуального девелопера строится, сотрудники АО КСИ — усиленные, 
              выверенными и настроенными ИИ-инструментами — решают реальные задачи участников рынка.
            </p>
            <p className="font-ibm text-white/40 text-base leading-relaxed mb-8">
              Каждый запрос, поступающий в систему, становится обучающим кейсом. 
              Система анализирует задачу, формирует решение, фиксирует паттерн. 
              Чем больше задач — тем умнее становится виртуальный девелопер.
            </p>
            <div className="border-l-2 border-ksi-cyan/30 pl-6">
              <p className="font-ibm text-white/60 text-base italic">
                «Ваша задача сегодня — обучение системы завтра»
              </p>
            </div>
          </div>

          {/* Правая колонка — схема */}
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Участник ставит задачу",
                desc: "Анализ участка, финансовая модель, концепция, структура партнёрства — любая реальная девелоперская задача.",
                color: "cyan",
              },
              {
                step: "02",
                title: "Система обрабатывает запрос",
                desc: "Сотрудники АО КСИ + ИИ-инструменты работают над задачей. Формируется решение.",
                color: "purple",
              },
              {
                step: "03",
                title: "Результат и начисление КриптоМетров",
                desc: "Участник получает результат. Система фиксирует кейс. На счёт начисляются КриптоМетры.",
                color: "cyan",
              },
              {
                step: "04",
                title: "Система становится умнее",
                desc: "Каждый кейс обогащает виртуального девелопера. Ранние участники становятся соавторами системы.",
                color: "purple",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-5 border border-white/8 bg-white/[0.02] rounded-sm">
                <div className={`font-ibm text-xs font-bold flex-shrink-0 mt-1 ${item.color === "cyan" ? "text-ksi-cyan" : "text-purple-400"}`}>
                  {item.step}
                </div>
                <div>
                  <div className="font-oswald text-white text-lg font-medium mb-1">{item.title}</div>
                  <div className="font-ibm text-white/40 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
