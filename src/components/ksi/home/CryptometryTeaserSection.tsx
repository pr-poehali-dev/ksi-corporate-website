import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export function CryptometryTeaserSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden" style={{ background: "#080b13" }}>
      {/* Свечения */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "-10%", right: "-10%",
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-10%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/50 mb-6">
          ◆ Ключевой проект АО КСИ
        </p>
        <h2 className="font-oswald text-white font-semibold leading-[0.95] mb-7"
          style={{ fontSize: "clamp(46px, 7vw, 110px)" }}>
          <span style={{
            background: "linear-gradient(90deg, #00d4ff 0%, #7b2fff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            КриптоМетры
          </span>
        </h2>
        <p className="font-ibm text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          Ключевой проект и флагманский контур интеллектуальной системы распределённого девелопмента.
        </p>
        <p className="font-ibm text-white/40 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-12">
          КриптоМетры собирают прикладные модули, внутренние контуры и модели участия
          в единую среду для работы с активами и проектами — включая кооперативные механизмы девелопмента.
        </p>
        <Link
          to="/cryptometry"
          className="inline-flex items-center gap-2 font-ibm font-semibold text-sm tracking-[0.14em] uppercase px-10 py-4 rounded-sm transition-all"
          style={{
            background: "#00d4ff",
            color: "#0a0a0f",
            boxShadow: "0 0 30px rgba(0,212,255,0.22)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 45px rgba(0,212,255,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.22)")}
        >
          Подробнее о КриптоМетрах
          <Icon name="ArrowRight" size={15} />
        </Link>
      </div>
    </section>
  );
}