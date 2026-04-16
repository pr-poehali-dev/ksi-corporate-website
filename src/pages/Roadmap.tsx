import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const ROADMAP = [
  {
    quarter: "2026",
    phase: "Запуск и формирование контуров",
    phaseCode: "foundation",
    items: [
      { done: true, text: "Регистрация АО КСИ. Формирование управляющей структуры." },
      { done: true, text: "Определение замысла: виртуальный девелопер как долгосрочная цель." },
      { done: true, text: "Запуск КриптоМетров как ключевого проекта компании." },
      { done: true, text: "Формирование внутренних служб: Лаборатория ИИ, Центр реализации, Студия креатива." },
      { done: true, text: "Служба земельного поиска (LSS) переходит в стадию Beta." },
    ],
  },
  {
    quarter: "2026 — 2027",
    phase: "Развитие и пилотные задачи",
    phaseCode: "growth",
    items: [
      { done: false, text: "Лаборатория ИИ: R&D по интеллектуальной инфраструктуре системы." },
      { done: false, text: "Центр реализации активов: первые пилотные задачи через управляемый контур." },
      { done: false, text: "КриптоМетры: отработка гибридной модели на реальных запросах." },
      { done: false, text: "Студия проектного креатива: формирование методологии визуальной и концептуальной упаковки." },
      { done: false, text: "Приглашение девелоперов к бета-тестированию прикладных сценариев." },
    ],
  },
  {
    quarter: "2027 — 2028",
    phase: "Интеграция в систему",
    phaseCode: "scale",
    items: [
      { done: false, text: "Интеграция внутренних служб в единый интеллектуальный интерфейс КриптоМетров." },
      { done: false, text: "LSS: переход из Beta в рабочий контур системы." },
      { done: false, text: "Лаборатория ИИ: обучение контуров на реальных задачах, накопление данных." },
      { done: false, text: "Запуск интеллектуального чата как основного интерфейса взаимодействия." },
    ],
  },
  {
    quarter: "2028+",
    phase: "К виртуальному девелоперу",
    phaseCode: "maturity",
    items: [
      { done: false, text: "КриптоМетры как целостная интеллектуальная система распределённого девелопмента." },
      { done: false, text: "Все контуры работают в единой среде с единым интерфейсом." },
      { done: false, text: "Система накапливает компетенции и усиливается с каждым решённым запросом." },
      { done: false, text: "АО КСИ — оператор интеллектуальной инфраструктуры, обеспечивающей работу виртуального девелопера." },
    ],
  },
];

const STATUS_COLORS = {
  foundation: { color: "#00d4ff", bg: "rgba(0,212,255,0.07)", border: "rgba(0,212,255,0.2)" },
  growth: { color: "#7b2fff", bg: "rgba(123,47,255,0.07)", border: "rgba(123,47,255,0.2)" },
  scale: { color: "rgba(255,255,255,0.6)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.12)" },
  maturity: { color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.07)" },
};

export default function Roadmap() {
  return (
    <PageLayout breadcrumb={[{ label: "Roadmap" }]}>
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Дорожная карта</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              От стартовых контуров<br />
              <span className="text-gradient-cyan">к виртуальному девелоперу</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed mb-6">
              Оператор интеллектуальной инфраструктуры для девелопмента.
              Управляющая компания проекта «КриптоМетры».
            </p>
            <p className="font-ibm text-white/30 text-sm leading-relaxed">
              Дорожная карта носит информационный характер и обновляется по мере развития проекта.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            {ROADMAP.map((phase, pi) => {
              const meta = STATUS_COLORS[phase.phaseCode as keyof typeof STATUS_COLORS];
              const doneCount = phase.items.filter(i => i.done).length;
              return (
                <div key={pi}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="font-mono-ibm text-xs tracking-widest mb-1" style={{ color: meta.color }}>{phase.quarter}</div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-oswald text-2xl font-semibold text-white">{phase.phase}</h2>
                        <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm"
                          style={{ color: meta.color, background: meta.bg, border: `1px solid ${meta.border}` }}>
                          {doneCount}/{phase.items.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 h-px ml-4" style={{ background: meta.border }} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    {phase.items.map((item, ii) => (
                      <div key={ii} className="flex items-start gap-4 p-4 rounded-sm"
                        style={{ background: item.done ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)", border: `1px solid ${item.done ? meta.border : "rgba(255,255,255,0.05)"}` }}>
                        <div className="flex-shrink-0 mt-0.5">
                          {item.done
                            ? <Icon name="CheckCircle2" size={16} style={{ color: meta.color }} />
                            : <Icon name="Circle" size={16} className="text-white/15" />}
                        </div>
                        <p className="font-ibm text-sm leading-relaxed" style={{ color: item.done ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)" }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-6 rounded-sm" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="font-mono-ibm text-ksi-cyan/40 text-xs tracking-widest mb-3">ВАЖНО</div>
            <p className="font-ibm text-white/40 text-sm leading-relaxed max-w-2xl">
              Дорожная карта отражает текущее видение развития проекта. Сроки и приоритеты
              могут корректироваться. АО КСИ не несёт обязательств перед третьими лицами
              по срокам, указанным в дорожной карте.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/cryptometry" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">О проекте КриптоМетры</a>
            <a href="/directions" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">Внутренние службы</a>
            <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer" style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>Связаться с командой</a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}