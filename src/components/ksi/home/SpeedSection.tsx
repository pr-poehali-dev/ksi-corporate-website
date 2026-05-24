import Icon from "@/components/ui/icon";

export function SpeedSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden" style={{ background: "#080b13" }}>
      {/* Свечение */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 600,
            background: "radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/45 mb-5">
            ◆ Скорость обработки
          </p>
          <h2 className="font-oswald text-white font-semibold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}>
            Обработка запроса —<br />
            <span
              style={{
                background: "linear-gradient(90deg, #00d4ff 0%, #7b2fff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              до 24 часов
            </span>
          </h2>
          <p className="font-ibm text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            АО КСИ выстраивает работу так, чтобы типовые прикладные запросы переводились в результат
            без длинного производственного цикла.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {[
            {
              icon: "Clock",
              big: "до 24 ч",
              label: "Типовая задача",
              text: "Ориентир по первичной обработке прикладного запроса.",
            },
            {
              icon: "Zap",
              big: "до 12 ч",
              label: "Срочный сценарий",
              text: "Ускоренный режим обработки для приоритетных задач.",
            },
          ].map((c) => (
            <div
              key={c.label}
              className="p-8 rounded-sm"
              style={{
                background: "linear-gradient(160deg, rgba(0,212,255,0.06) 0%, rgba(0,212,255,0.02) 100%)",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-sm"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}
                >
                  <Icon name={c.icon} size={15} className="text-[#00d4ff]" />
                </div>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#00d4ff]/70">
                  {c.label}
                </p>
              </div>
              <div className="font-oswald text-white font-semibold leading-none mb-3"
                style={{ fontSize: "clamp(40px, 5vw, 68px)" }}>
                {c.big}
              </div>
              <p className="font-ibm text-white/50 text-sm leading-relaxed">
                {c.text}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center font-ibm text-white/30 text-xs leading-relaxed max-w-2xl mx-auto">
          Фактический срок зависит от типа задачи, объёма исходных данных и необходимого уровня проработки.
        </p>
      </div>
    </section>
  );
}
