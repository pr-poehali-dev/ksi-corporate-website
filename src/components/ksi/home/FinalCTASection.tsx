import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export function FinalCTASection() {
  return (
    <section className="py-32 border-t border-white/6 relative overflow-hidden">
      {/* Фоновое свечение */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(0,212,255,0.07) 0%, transparent 60%)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Бейдж */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-ksi-cyan/20 bg-ksi-cyan/[0.04] rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-ibm text-white/50 text-xs tracking-[0.2em] uppercase">
            Ранний доступ открыт прямо сейчас
          </span>
        </div>

        <h2 className="font-oswald text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[0.95] mb-8">
          Войдите, пока<br />
          <span className="text-gradient-main">ещё рано</span>
        </h2>

        <p className="font-ibm text-white/50 text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          Чем раньше вы входите в систему — тем больше ваш вклад зафиксирован.
          Тем значительнее статус соавтора.
        </p>
        <p className="font-ibm text-white/25 text-base max-w-xl mx-auto mb-14">
          Позже войти можно будет всегда. Но соавтором первого круга — только сейчас.
        </p>

        {/* CTA кнопки */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/early-access" className="btn-primary-ksi px-12 py-4 text-base font-medium rounded-sm">
            Запросить ранний доступ
          </Link>
          <Link to="/contacts" className="flex items-center gap-2 border border-white/15 hover:border-white/35 text-white/55 hover:text-white/90 transition-all px-10 py-4 text-base font-ibm rounded-sm">
            Персональное приглашение
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>

        {/* Разделитель */}
        <div className="flex items-center gap-6 justify-center mb-8">
          <div className="h-px flex-1 bg-white/6 max-w-32" />
          <span className="font-ibm text-white/15 text-xs tracking-[0.2em] uppercase">или</span>
          <div className="h-px flex-1 bg-white/6 max-w-32" />
        </div>

        {/* Страницы для изучения */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Соавторство", href: "/coauthor", icon: "Star" },
            { label: "Стоимость", href: "/pricing", icon: "Tag" },
            { label: "Правовая основа", href: "/legal", icon: "Scale" },
            { label: "Проекты", href: "/projects", icon: "FolderOpen" },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center justify-center gap-2 p-3 border border-white/8 bg-white/[0.02] hover:border-white/15 text-white/35 hover:text-white/60 transition-all rounded-sm"
            >
              <Icon name={item.icon as "Star"} size={13} />
              <span className="font-ibm text-xs">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Нижняя пометка */}
        <p className="font-ibm text-white/18 text-xs mt-10">
          Только для юридических лиц · B2B · НДС · Договорная основа
        </p>
      </div>
    </section>
  );
}
