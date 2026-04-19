import Icon from "@/components/ui/icon";

const PRODUCTS = [
  {
    badge: "24 часа",
    icon: "FileSearch",
    color: "#00d4ff",
    title: "Справка по участку за 24 часа",
    desc: "Оставьте заявку и кадастровый номер — получите первичную подробную справку по участку.",
    list: [
      "Характеристики и параметры ВРИ",
      "Ограничения, охранные зоны, риски",
      "Первичная оценка потенциала",
      "Рекомендации по дальнейшим шагам",
    ],
    cta: "Заказать справку",
    href: "/contacts?product=lss-brief",
  },
  {
    badge: "24 часа",
    icon: "Sparkles",
    color: "#a070ff",
    title: "Первичная концепция проекта за 24 часа",
    desc: "Дайте вводные — получите первичный визуальный концепт и вектор упаковки проекта.",
    list: [
      "Визуальное представление идеи",
      "Основной сценарий использования",
      "Вектор упаковки и ТЗ",
      "Материал для внутренней защиты идеи",
    ],
    cta: "Заказать концепцию",
    href: "/contacts?product=concept",
  },
];

export function EntryProductsSection() {
  return (
    <section
      id="products"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,10,20,1), rgba(10,10,15,1))" }}
    >
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="section-label mb-4">◆ Точки входа</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            С чего удобно<br />
            <span className="text-gradient-main">начать работу</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed">
            Два понятных продукта, которые дают быстрый, измеримый результат.
            Без долгих договорённостей и больших обязательств.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PRODUCTS.map((p, i) => (
            <div
              key={i}
              className="flex flex-col p-8 rounded-sm relative"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="absolute top-6 right-6 px-3 py-1 rounded-sm font-mono-ibm text-[10px] tracking-widest uppercase"
                style={{
                  background: `${p.color}12`,
                  border: `1px solid ${p.color}30`,
                  color: p.color,
                }}
              >
                {p.badge}
              </div>

              <div
                className="w-14 h-14 rounded-sm flex items-center justify-center mb-6"
                style={{ background: `${p.color}10`, border: `1px solid ${p.color}25` }}
              >
                <Icon name={p.icon} size={24} style={{ color: p.color }} />
              </div>

              <h3 className="font-oswald text-white text-2xl font-medium leading-tight mb-4">
                {p.title}
              </h3>
              <p className="font-ibm text-white/55 text-base leading-relaxed mb-6">
                {p.desc}
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {p.list.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 font-ibm text-white/55 text-sm leading-relaxed">
                    <Icon name="ChevronRight" size={14} style={{ color: p.color, opacity: 0.7 }} className="mt-[3px] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={p.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-oswald text-sm tracking-wider uppercase transition-all"
                style={{
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}40`,
                  color: p.color,
                  alignSelf: "flex-start",
                }}
              >
                {p.cta}
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
