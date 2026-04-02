import Icon from "@/components/ui/icon";
import { STATS } from "./data";

const HERO_BG = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/files/2116a75d-3959-4f90-b237-7e4a87ff500e.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#080810" }}>
      {/* Aerial masterplan фон на всю секцию */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        {/* Затемнение левой части для читаемости текста */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, rgba(8,8,16,0.92) 0%, rgba(8,8,16,0.75) 35%, rgba(8,8,16,0.3) 65%, rgba(8,8,16,0.15) 100%)",
        }} />
        {/* Нижний fade */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(8,8,16,0.4) 0%, transparent 30%, transparent 70%, rgba(8,8,16,0.85) 100%)",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
          <div className="section-label mb-6 fade-in-up stagger-1">
            ◆ Головная структура группы &nbsp;·&nbsp; АО КСИ &nbsp;·&nbsp; Москва
          </div>
          <h1 className="font-oswald font-bold text-5xl md:text-6xl xl:text-7xl leading-none mb-2 fade-in-up stagger-2">
            <span className="text-white">КРИПТО</span>
          </h1>
          <h1 className="font-oswald font-bold text-5xl md:text-6xl xl:text-7xl leading-none mb-6 fade-in-up stagger-3">
            <span className="text-gradient-main">СТРОЙ</span>
            <span className="text-white"> ИНВЕСТ</span>
          </h1>
          <p className="font-ibm text-white/35 text-[11px] tracking-[0.22em] uppercase mb-8 fade-in-up stagger-3">
            Девелопмент &nbsp;·&nbsp; Земельные активы &nbsp;·&nbsp; Цифровая инфраструктура &nbsp;·&nbsp; Аналитика
          </p>
          <p className="font-ibm text-white/72 text-lg leading-relaxed mb-10 max-w-lg fade-in-up stagger-4">
            АО КСИ — оператор цифровой девелоперской инфраструктуры. Управляет экосистемой
            направлений на пересечении рынка недвижимости, технологий и профессиональной
            экспертизы. Не строительная компания. Не фонд. Платформа нового типа.
          </p>

          <div className="flex flex-wrap gap-4 fade-in-up stagger-5">
            <a href="/ecosystem" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">
              Как устроена экосистема
            </a>
            <a href="/partners" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">
              Найти свою роль
            </a>
          </div>

          <div className="mt-12 fade-in-up stagger-6">
            <div className="font-ibm text-white/20 text-xs mb-4">Кто вы</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Землевладельцам", href: "/partners", icon: "MapPin" },
                { label: "Девелоперам", href: "/partners", icon: "Building2" },
                { label: "Инвесторам", href: "/partners", icon: "TrendingUp" },
                { label: "Технопартнёрам", href: "/partners", icon: "Code2" },
                { label: "Медиа", href: "/media", icon: "Newspaper" },
              ].map((item, i) => (
                <a key={i} href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-ibm text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(8,8,16,0.5)", backdropFilter: "blur(4px)" }}>
                  <Icon name={item.icon} size={11} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {STATS.map((stat, i) => (
            <div key={i} className="fade-in-up" style={{ animationDelay: `${0.1 * i + 0.3}s`, opacity: 0 }}>
              <div className="font-oswald text-3xl font-semibold text-gradient-cyan">
                {stat.value}<span className="text-xl">{stat.suffix}</span>
              </div>
              <div className="font-ibm text-white/35 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
