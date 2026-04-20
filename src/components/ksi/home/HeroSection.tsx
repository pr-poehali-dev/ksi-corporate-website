import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Reveal } from "./Reveal";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Фон: сетка + свечение */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #7b2fff 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <Reveal delay={0} duration={600} direction="none">
          <div className="inline-flex items-center gap-3 mb-10 px-4 py-2 border border-ksi-cyan/20 bg-ksi-cyan/[0.04] rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-ksi-cyan animate-pulse flex-shrink-0" />
            <span className="font-ibm text-ksi-cyan/80 text-xs tracking-[0.2em] uppercase">
              Виртуальный девелопер · Ранний доступ открыт
            </span>
          </div>
        </Reveal>

        <Reveal delay={100} duration={700}>
          <h1 className="font-oswald text-6xl md:text-8xl lg:text-[96px] font-semibold leading-[0.9] mb-8 text-white tracking-tight">
            АО КСИ —<br />
            <span className="text-gradient-main">виртуальный</span><br />
            девелопер
          </h1>
        </Reveal>

        <Reveal delay={220} duration={600}>
          <p className="font-ibm text-white/55 text-xl md:text-2xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Рынок может подключиться к его интеллекту уже сейчас.
          </p>
          <p className="font-ibm text-white/30 text-base max-w-xl mx-auto mb-12 leading-relaxed">
            Мы продаём не консалтинг и не услуги. Мы продаём доступ к интеллекту девелопера —
            усиленному ИИ, обученному на реальных проектах.
          </p>
        </Reveal>

        <Reveal delay={340} duration={600}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link to="/early-access" className="btn-primary-ksi px-10 py-4 text-base font-medium rounded-sm">
              Запросить ранний доступ
            </Link>
            <Link to="/coauthor" className="flex items-center gap-2 border border-white/15 hover:border-white/35 text-white/55 hover:text-white/90 transition-all px-10 py-4 text-base font-ibm rounded-sm">
              Стать соавтором
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
          <p className="font-ibm text-white/20 text-xs tracking-[0.15em] mb-20">
            Только для юридических лиц · B2B · НДС
          </p>
        </Reveal>

        {/* Три отличия */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {[
            {
              label: "Не консалтинг",
              desc: "Советы не продаём. Решаем реальные девелоперские задачи — от анализа участка до финансовой модели.",
              delay: 420,
            },
            {
              label: "Не ИИ-стартап",
              desc: "Реальные команды. Реальные проекты. ИИ усиливает людей, а не заменяет их.",
              delay: 520,
            },
            {
              label: "Не каталог объектов",
              desc: "Проекты — это кейсы обучения системы. Не предложения о продаже, а живая практика интеллекта.",
              delay: 620,
            },
          ].map((item) => (
            <Reveal key={item.label} delay={item.delay} duration={600}>
              <div className="border border-white/8 bg-white/[0.025] p-6 rounded-sm h-full">
                <div className="font-ibm text-ksi-cyan/60 text-xs tracking-[0.2em] uppercase mb-2">◆</div>
                <div className="font-oswald text-white text-xl font-medium mb-2">{item.label}</div>
                <div className="font-ibm text-white/38 text-sm leading-relaxed">{item.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <Icon name="ChevronDown" size={22} className="text-white" />
      </div>
    </section>
  );
}
