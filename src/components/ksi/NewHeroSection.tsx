import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export function NewHeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #7b2fff 0%, transparent 70%)" }} />
        {/* Сетка */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Лейбл */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-ksi-cyan animate-pulse" />
          <span className="font-ibm text-ksi-cyan/80 text-xs tracking-[0.25em] uppercase">
            Виртуальный девелопер · Ранний доступ открыт
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-ksi-cyan animate-pulse" />
        </div>

        {/* Заголовок */}
        <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] mb-8 text-white">
          АО КСИ —<br />
          <span className="text-gradient-main">виртуальный</span><br />
          девелопер
        </h1>

        {/* Подзаголовок */}
        <p className="font-ibm text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
          Мы продаём не услуги и не консалтинг.<br />
          Мы продаём доступ к интеллекту девелопера —<br />
          усиленному ИИ, настроенному под реальные задачи рынка.
        </p>

        {/* Уточнение */}
        <p className="font-ibm text-white/25 text-sm mb-12">
          Только для юридических лиц · B2B · НДС
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/early-access" className="btn-primary-ksi px-8 py-4 text-base font-medium rounded-sm">
            Запросить ранний доступ
          </Link>
          <Link to="/coauthor" className="flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/60 hover:text-white/90 transition-all px-8 py-4 text-base rounded-sm">
            Стать соавтором
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>

        {/* Три тезиса */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left">
          {[
            { icon: "Brain", label: "Не консалтинг", desc: "Мы не продаём советы. Мы решаем реальные девелоперские задачи." },
            { icon: "Cpu", label: "Не ИИ-стартап", desc: "Реальные проекты. Реальные команды. ИИ усиливает, а не заменяет." },
            { icon: "Map", label: "Не каталог объектов", desc: "Проекты — это кейсы обучения системы, а не предложения о продаже." },
          ].map((item) => (
            <div key={item.label} className="border border-white/8 bg-white/[0.02] p-6 rounded-sm">
              <Icon name={item.icon as "Brain"} size={20} className="text-ksi-cyan/60 mb-3" />
              <div className="font-oswald text-white/90 text-lg font-medium mb-2">{item.label}</div>
              <div className="font-ibm text-white/40 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Стрелка вниз */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={20} className="text-white/20" />
      </div>
    </section>
  );
}
