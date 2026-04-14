import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/files/c3047f69-299d-49f8-9718-3bb88004e08a.jpg";
const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/6dabea3b-bb29-4450-a60d-b56dafacbcc1.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#080810" }}>
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.82) 30%, rgba(8,8,16,0.4) 65%, rgba(8,8,16,0.25) 100%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(8,8,16,0.5) 0%, transparent 25%, transparent 65%, rgba(8,8,16,0.9) 100%)",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-20 w-full flex-1 flex flex-col">
        <div className="flex justify-center pt-4 pb-8">
          <div className="hero-logo-container relative">
            <img
              src={LOGO_URL}
              alt="КСИ"
              className="hero-logo-neon"
              style={{ width: 140, height: "auto" }}
            />
            <div className="hero-logo-glow" />
          </div>
        </div>

        <div className="max-w-3xl flex-1 flex flex-col justify-center">
          <div className="section-label mb-5 fade-in-up stagger-1">
            ◆ Управляющая компания &nbsp;·&nbsp; АО КСИ &nbsp;·&nbsp; Москва
          </div>

          <h1 className="font-oswald font-bold text-4xl md:text-5xl xl:text-6xl leading-tight mb-4 fade-in-up stagger-2">
            <span className="text-white">АО КСИ</span>
          </h1>
          <h2 className="font-oswald font-medium text-2xl md:text-3xl xl:text-4xl leading-tight mb-8 fade-in-up stagger-3">
            <span className="text-gradient-main">Управляющая компания экосистемы</span><br />
            <span className="text-white/80">ИИ-решений для девелопмента</span>
          </h2>

          <p className="font-ibm text-white/60 text-lg leading-relaxed mb-10 max-w-2xl fade-in-up stagger-4">
            АО КСИ формирует архитектуру, в которой Лаборатория ИИ, прикладные модули
            и флагманский проект КриптоМетры объединяются в единую систему интеллектуальных
            решений для рынка недвижимости.
          </p>

          <div className="flex flex-wrap gap-4 fade-in-up stagger-5">
            <a href="#ai-lab" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              Лаборатория ИИ
            </a>
            <a href="#cryptometry" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
              КриптоМетры
            </a>
            <a href="#modules" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer" style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
              Модули экосистемы
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-16 pt-10 max-w-2xl"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { value: "1", suffix: "", label: "Управляющая компания", sub: "АО КСИ" },
            { value: "12", suffix: "+", label: "Прикладных модулей", sub: "в экосистеме" },
            { value: "1", suffix: "", label: "Флагманский проект", sub: "КриптоМетры" },
          ].map((stat, i) => (
            <div key={i} className="fade-in-up" style={{ animationDelay: `${0.1 * i + 0.3}s`, opacity: 0 }}>
              <div className="font-oswald text-3xl font-semibold text-gradient-cyan">
                {stat.value}<span className="text-xl">{stat.suffix}</span>
              </div>
              <div className="font-ibm text-white/45 text-sm mt-1">{stat.label}</div>
              <div className="font-ibm text-white/20 text-xs mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
