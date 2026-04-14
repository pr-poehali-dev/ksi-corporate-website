import { useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Аналитика", "Позиция", "Исследования", "Комментарии"];

const ARTICLES = [
  { cat: "Аналитика", date: "Март 2024", title: "Цифровой девелопмент: состояние и перспективы рынка", desc: "Обзор текущего состояния PropTech-сегмента в России: платформенные модели, ИИ-инструменты, изменение логики участия в проектах.", readTime: "8 мин", tag: "Рынок недвижимости" },
  { cat: "Позиция", date: "Февраль 2024", title: "Виртуальный девелопер: новая операционная модель", desc: "Что стоит за термином «виртуальный девелопмент» и почему это не маркетинговое слово, а описание реальной операционной логики.", readTime: "6 мин", tag: "Модели работы" },
  { cat: "Исследования", date: "Январь 2024", title: "Земельный рынок России: данные и тенденции", desc: "Структурированный анализ земельного рынка по регионам: динамика цен, девелоперская активность, зоны потенциала.", readTime: "12 мин", tag: "Земельный рынок" },
  { cat: "Аналитика", date: "Декабрь 2023", title: "ИИ в недвижимости: где реальность, где хайп", desc: "Критический разбор применения искусственного интеллекта в сфере недвижимости. Что работает, что пока не работает.", readTime: "10 мин", tag: "ИИ & PropTech" },
  { cat: "Комментарии", date: "Ноябрь 2023", title: "Коллективные модели участия: правовой контекст", desc: "Экспертный комментарий к актуальным правовым вопросам организации коллективного участия в девелоперских проектах.", readTime: "5 мин", tag: "Право & Структуры" },
  { cat: "Исследования", date: "Октябрь 2023", title: "Редевелопмент как стратегия: кейсы и методология", desc: "Анализ подходов к редевелопменту промышленных и устаревших объектов. Методология оценки потенциала и сценарии реализации.", readTime: "15 мин", tag: "Редевелопмент" },
];

export default function Media() {
  const [cat, setCat] = useState("Все");
  const filtered = cat === "Все" ? ARTICLES : ARTICLES.filter(a => a.cat === cat);

  return (
    <PageLayout breadcrumb={[{ label: "Медиа и аналитика" }]}>
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Медиа и аналитика</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Позиция. Исследования.<br />
              <span className="text-gradient-cyan">Аналитический контур.</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Аналитическая позиция АО КСИ по темам,
              в которых команда имеет прямую экспертизу.
            </p>
          </div>
        </div>
      </section>

      {/* Фильтр */}
      <section className="border-t border-b border-ksi-border/30 sticky top-[73px] z-40 bg-ksi-dark/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="font-ibm text-sm px-4 py-1.5 rounded-sm transition-all"
              style={cat === c
                ? { background: "rgba(0,212,255,0.12)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)" }
                : { background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >{c}</button>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Первый материал — широкий */}
          {filtered.length > 0 && (
            <div className="card-ksi p-8 rounded-sm mb-6 group cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.15)" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono-ibm text-xs px-2.5 py-1 rounded-sm" style={{ background: "rgba(0,212,255,0.08)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}>{filtered[0].cat}</span>
                <span className="font-ibm text-white/30 text-xs">{filtered[0].date}</span>
                <span className="font-ibm text-white/25 text-xs">{filtered[0].readTime} чтения</span>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="font-mono-ibm text-ksi-cyan/40 text-xs tracking-widest mb-3 block">{filtered[0].tag}</span>
                  <h2 className="font-oswald text-3xl text-white font-semibold mb-4 group-hover:text-ksi-cyan transition-colors">{filtered[0].title}</h2>
                  <p className="font-ibm text-white/55 text-base leading-relaxed">{filtered[0].desc}</p>
                </div>
                <div className="flex items-center justify-end">
                  <div className="btn-outline-ksi px-6 py-3 rounded-sm text-sm cursor-pointer inline-flex items-center gap-2">
                    Читать материал <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Сетка остальных */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(1).map((a, i) => (
              <div key={i} className="card-ksi p-6 rounded-sm group cursor-pointer flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm" style={{ background: "rgba(123,47,255,0.08)", color: "#7b2fff", border: "1px solid rgba(123,47,255,0.2)" }}>{a.cat}</span>
                  <span className="font-ibm text-white/25 text-xs">{a.date}</span>
                </div>
                <span className="font-mono-ibm text-white/30 text-[10px] tracking-widest mb-2">{a.tag}</span>
                <h3 className="font-oswald text-white font-medium text-xl mb-3 group-hover:text-ksi-cyan transition-colors flex-1">{a.title}</h3>
                <p className="font-ibm text-white/45 text-sm leading-relaxed mb-5">{a.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-ibm text-white/25 text-xs">{a.readTime} чтения</span>
                  <div className="flex items-center gap-2 text-transparent group-hover:text-ksi-cyan/60 transition-all">
                    <span className="font-mono-ibm text-xs tracking-widest">ЧИТАТЬ</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Для журналистов */}
      <section className="py-16 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="section-label mb-4">◆ Для журналистов и редакций</div>
              <h2 className="font-oswald text-3xl text-white mb-4">Экспертные комментарии</h2>
              <p className="font-ibm text-white/55 text-base leading-relaxed mb-6">
                Специалисты АО КСИ готовы предоставить экспертную позицию по темам:
                цифровой девелопмент, земельный рынок, ИИ в недвижимости, PropTech.
              </p>
              <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm inline-block cursor-pointer">Запросить комментарий</a>
            </div>
            <div>
              <div className="section-label mb-4">◆ Подписка на аналитику</div>
              <h2 className="font-oswald text-3xl text-white mb-4">Получайте материалы АО КСИ</h2>
              <p className="font-ibm text-white/55 text-base leading-relaxed mb-6">
                Исследования, позиции, рыночные обзоры — для профессиональных участников рынка.
                Без рекламы и маркетинга.
              </p>
              <div className="flex gap-3">
                <input type="email" placeholder="your@email.com" className="flex-1 bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
                <button className="btn-primary-ksi px-5 py-3 rounded-sm text-sm cursor-pointer flex-shrink-0">Подписаться</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}