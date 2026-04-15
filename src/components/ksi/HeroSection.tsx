const HERO_BG = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/1cf1171b-7f91-468e-bee1-51f0c4cca384.jpeg";
const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/6dabea3b-bb29-4450-a60d-b56dafacbcc1.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#080810" }}>
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.28 }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, rgba(8,8,16,0.96) 0%, rgba(8,8,16,0.85) 30%, rgba(8,8,16,0.45) 65%, rgba(8,8,16,0.3) 100%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(8,8,16,0.5) 0%, transparent 25%, transparent 60%, rgba(8,8,16,0.92) 100%)",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 w-full flex-1 flex flex-col">
        <div className="flex justify-center pt-4 pb-6">
          <div className="hero-logo-container relative">
            <img src={LOGO_URL} alt="КСИ" className="hero-logo-neon" style={{ width: 120, height: "auto" }} />
            <div className="hero-logo-glow" />
          </div>
        </div>

        <div className="max-w-3xl flex-1 flex flex-col justify-center">
          <div className="section-label mb-5 fade-in-up stagger-1">
            ◆ Технологический проект &nbsp;·&nbsp; АО КСИ &nbsp;·&nbsp; Москва
          </div>

          <h1 className="font-oswald font-bold text-4xl md:text-5xl xl:text-6xl leading-tight mb-3 fade-in-up stagger-2">
            <span className="text-white">АО КСИ</span>
          </h1>
          <h2 className="font-oswald font-medium text-xl md:text-2xl xl:text-3xl leading-snug mb-8 fade-in-up stagger-3">
            <span className="text-gradient-main">Проект по созданию</span><br />
            <span className="text-white/80">виртуального девелопера</span>
          </h2>

          <p className="font-ibm text-white/55 text-lg leading-relaxed mb-10 max-w-2xl fade-in-up stagger-4">
            АО КСИ формирует интеллектуальную инфраструктуру нового типа для девелопмента.
            Компания развивает внутренние службы, прикладные контуры и флагманский проект
            КриптоМетры как основу будущей системы.
          </p>

          <div className="flex flex-wrap gap-4 fade-in-up stagger-5">
            <a href="/cryptometry" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              О проекте КриптоМетры
            </a>
            <a href="#structure" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              Структура АО КСИ
            </a>
            <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer" style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
              Обсудить сотрудничество
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}