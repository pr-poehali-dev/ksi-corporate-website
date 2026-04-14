const HERO_BG = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/files/c3047f69-299d-49f8-9718-3bb88004e08a.jpg";
const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/6dabea3b-bb29-4450-a60d-b56dafacbcc1.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#080810" }}>
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.3 }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, rgba(8,8,16,0.96) 0%, rgba(8,8,16,0.85) 30%, rgba(8,8,16,0.45) 65%, rgba(8,8,16,0.3) 100%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(8,8,16,0.5) 0%, transparent 25%, transparent 60%, rgba(8,8,16,0.92) 100%)",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-20 w-full flex-1 flex flex-col">
        <div className="flex justify-center pt-4 pb-8">
          <div className="hero-logo-container relative">
            <img src={LOGO_URL} alt="КСИ" className="hero-logo-neon" style={{ width: 130, height: "auto" }} />
            <div className="hero-logo-glow" />
          </div>
        </div>

        <div className="max-w-3xl flex-1 flex flex-col justify-center">
          <div className="section-label mb-5 fade-in-up stagger-1">
            ◆ Управляющая компания &nbsp;·&nbsp; АО КСИ &nbsp;·&nbsp; Москва
          </div>

          <h1 className="font-oswald font-bold text-4xl md:text-5xl xl:text-6xl leading-tight mb-3 fade-in-up stagger-2">
            <span className="text-white">АО КСИ</span>
          </h1>
          <h2 className="font-oswald font-medium text-xl md:text-2xl xl:text-3xl leading-snug mb-8 fade-in-up stagger-3">
            <span className="text-white/80">Управляющая компания проекта</span><br />
            <span className="text-gradient-main">«КриптоМетры»</span>
          </h2>

          <p className="font-ibm text-white/55 text-lg leading-relaxed mb-10 max-w-2xl fade-in-up stagger-4">
            АО КСИ управляет развитием КриптоМетров — интеллектуальной системы
            распределённого девелопмента, работу которой обеспечивают внутренние службы
            компании, интеллектуальная инфраструктура и профессиональный операционный контур.
          </p>

          <div className="flex flex-wrap gap-4 fade-in-up stagger-5">
            <a href="#cryptometry" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              О системе КриптоМетры
            </a>
            <a href="#services" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              Внутренние службы АО КСИ
            </a>
            <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer" style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
              Обсудить задачу
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { value: "АО КСИ", label: "Управляющая компания" },
            { value: "1", label: "Единственный проект", sub: "КриптоМетры" },
            { value: "4", label: "Внутренние службы" },
            { value: "ИИ", label: "Гибридная модель", sub: "производства" },
          ].map((stat, i) => (
            <div key={i} className="fade-in-up" style={{ animationDelay: `${0.1 * i + 0.3}s`, opacity: 0 }}>
              <div className="font-oswald text-2xl md:text-3xl font-semibold text-gradient-cyan">{stat.value}</div>
              <div className="font-ibm text-white/45 text-sm mt-1">{stat.label}</div>
              {"sub" in stat && <div className="font-ibm text-white/20 text-xs mt-0.5">{stat.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
