const LAND_BG = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/files/10c8e8f3-5bfd-4d3a-bc58-2c67d60c7c99.jpg";

const STEPS = [
  { num: "01", label: "Земельный актив", desc: "Поиск, проверка, структуризация через LSS и Земельную аналитику" },
  { num: "02", label: "Аналитика", desc: "ИИ-анализ потенциала, кадастровые и градостроительные данные" },
  { num: "03", label: "Структурирование", desc: "Правовая архитектура, модели участия, роли сторон" },
  { num: "04", label: "Платформа КриптоМетры", desc: "Операционная среда: единая управляемая структура" },
  { num: "05", label: "Реализация через Fee-Dev", desc: "Упаковка, подрядчики, контроль экономики проекта" },
  { num: "06", label: "Управление", desc: "Постдевелоперское сопровождение, доходные модели" },
];

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Шапка */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label mb-4">◆ Как работает модель</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight">
              От земельного актива<br />
              <span className="text-gradient-purple">до реализации и управления</span>
            </h2>
          </div>
          <p className="font-ibm text-white/40 text-base leading-relaxed max-w-sm">
            АО КСИ координирует полный девелоперский цикл — от обнаружения актива
            до постдевелоперского сопровождения.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Левая колонка — фото земли + overlay */}
          <div className="relative rounded-sm overflow-hidden" style={{ minHeight: 420 }}>
            <img
              src={LAND_BG}
              alt="Земельный актив — аналитический overlay"
              className="w-full h-full object-cover absolute inset-0"
              style={{ opacity: 0.55 }}
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(135deg, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.2) 50%, rgba(10,10,15,0.6) 100%)",
            }} />

            {/* Overlay-подписи поверх изображения */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <div className="font-ibm text-[10px] text-white/30 tracking-widest uppercase">Аналитический overlay</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan" style={{ boxShadow: "0 0 4px #00d4ff" }} />
                  <span className="font-ibm text-[10px] text-ksi-cyan/50">Актив</span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Площадь участка", value: "12.4 га" },
                  { label: "Категория", value: "Земли населённых пунктов" },
                  { label: "Потенциал", value: "Жилое строительство" },
                  { label: "Стадия", value: "Аналитика и due diligence" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="font-ibm text-white/30 text-xs">{item.label}</span>
                    <span className="font-ibm text-white/60 text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка — lifecycle шаги */}
          <div>
            <div className="font-ibm text-white/20 text-xs tracking-[0.18em] uppercase mb-6">
              Операционный цикл
            </div>
            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <div key={i} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 z-10"
                      style={{
                        background: i < 2 ? "rgba(0,212,255,0.08)" : i < 4 ? "rgba(123,47,255,0.08)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${i < 2 ? "rgba(0,212,255,0.25)" : i < 4 ? "rgba(123,47,255,0.25)" : "rgba(255,255,255,0.08)"}`,
                      }}>
                      <span className="font-ibm text-xs font-medium"
                        style={{ color: i < 2 ? "#00d4ff" : i < 4 ? "#7b2fff" : "rgba(255,255,255,0.4)" }}>
                        {step.num}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-px flex-1 my-1" style={{
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                        minHeight: 16,
                      }} />
                    )}
                  </div>
                  <div className="pb-5 flex-1 pt-1.5">
                    <div className="font-oswald text-white/85 font-medium text-sm mb-1">{step.label}</div>
                    <p className="font-ibm text-white/35 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <a href="/ecosystem" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
                Архитектура экосистемы →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
