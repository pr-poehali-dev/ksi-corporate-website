import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const ROADMAP = [
  {
    quarter: "2023 — 2024",
    phase: "Основание",
    phaseCode: "foundation",
    items: [
      { done: true, text: "Регистрация АО КСИ. Формирование головной структуры группы." },
      { done: true, text: "Определение архитектуры экосистемы и иерархии направлений." },
      { done: true, text: "Запуск флагманской платформы КриптоМетры в операционном режиме." },
      { done: true, text: "Запуск ИИ-продакшн: первые корпоративные проекты." },
      { done: true, text: "Запуск Fee-Dev платформы как оператора девелоперской среды." },
      { done: true, text: "Медиацентр: первые публикации и аналитические материалы." },
    ],
  },
  {
    quarter: "2024 — 2025",
    phase: "Развитие платформ",
    phaseCode: "growth",
    items: [
      { done: true, text: "LSS — Land Search Service переходит в стадию Beta." },
      { done: true, text: "Лаборатория ИИ: запуск R&D по отраслевым моделям анализа земельных активов." },
      { done: false, text: "Земельная аналитика & Data: формирование базы данных и первых data-продуктов." },
      { done: false, text: "КриптоМетры: расширение пула участников и структур. Пилотные проекты." },
      { done: false, text: "Лицензирование: первые партнёрские соглашения на передачу ИИ-инструментов." },
    ],
  },
  {
    quarter: "2025 — 2026",
    phase: "Масштабирование",
    phaseCode: "scale",
    items: [
      { done: false, text: "LSS: переход из Beta в полноценный рыночный сервис. Расширение охвата." },
      { done: false, text: "Управление недвижимостью: запуск в операционный режим." },
      { done: false, text: "Коллективные инвестиционные модели: оформление консалтинговых механизмов." },
      { done: false, text: "Образовательная платформа: первые программы для участников рынка." },
      { done: false, text: "Стратегический консалтинг: формирование практики advisory." },
    ],
  },
  {
    quarter: "2026+",
    phase: "Зрелость экосистемы",
    phaseCode: "maturity",
    items: [
      { done: false, text: "Полный операционный цикл: все 12 направлений в активном статусе." },
      { done: false, text: "Лицензирование технологий: международный выход, white-label, SaaS-модели." },
      { done: false, text: "Земельная аналитика: публичные data-продукты для рынка." },
      { done: false, text: "Медиацентр: отраслевой авторитет, регулярные исследования и публикации." },
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
    <PageLayout breadcrumb={[{ label: "Публичная дорожная карта" }]}>
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Публичная дорожная карта</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Roadmap<br />
              <span className="text-gradient-cyan">АО КСИ</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed mb-6">
              Прозрачная карта развития экосистемы — без обещаний, которых нет.
              Только то, что сделано, делается и планируется.
            </p>
            <p className="font-ibm text-white/35 text-sm leading-relaxed">
              Дорожная карта носит информационный характер и обновляется по мере развития направлений.
              АО КСИ не несёт юридических обязательств по срокам и составу работ, указанных здесь.
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
                          {doneCount}/{phase.items.length} выполнено
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 h-px ml-4" style={{ background: meta.border }} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 ml-0">
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
              Публичная дорожная карта отражает текущее видение развития группы. Сроки и приоритеты
              могут корректироваться в зависимости от рыночной конъюнктуры, партнёрских договорённостей
              и стратегических решений АО КСИ. Компания не несёт обязательств перед третьими лицами
              по срокам, указанным в дорожной карте.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
