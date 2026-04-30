import { useEffect, useRef, useState } from "react";
import { ContactModal } from "@/components/ksi/ContactModal";
import { useEarlyAccessModal } from "@/contexts/EarlyAccessModalContext";

const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/28655df5-bb72-4ef7-ba50-ca96e9a5ae13.png";

function useFadeIn(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { openModal: openEarlyAccessModal } = useEarlyAccessModal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const v0 = useFadeIn(100);
  const v1 = useFadeIn(260);
  const v2 = useFadeIn(420);
  const v3 = useFadeIn(560);
  const v4 = useFadeIn(700);

  const fade = (v: boolean, dy = 28): React.CSSProperties => ({
    opacity: v ? 1 : 0,
    transform: v ? "none" : `translateY(${dy}px)`,
    transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)",
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 140% 90% at 50% -10%, #0d1117 0%, #0a0a0f 55%, #080808 100%)",
      }}
    >
      {/* Тонкая сетка */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.35 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0V60" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Свечения */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute",
          top: "10%", left: "50%",
          transform: "translateX(-50%)",
          width: 900, height: 600,
          background: "radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-5%", right: "-5%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* Горизонтальная линия сверху */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.18), transparent)" }} />

      {/* Логотип (исчезает при скролле) */}
      <div
        className="absolute left-1/2 z-20 pointer-events-none flex flex-col items-center"
        style={{
          top: 72,
          opacity: scrolled ? 0 : 1,
          transform: scrolled
            ? "translateX(-50%) translateY(-14px) scale(0.22)"
            : "translateX(-50%) translateY(0) scale(1)",
          transition: "opacity 380ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1)",
          transformOrigin: "top center",
        }}
      >
        <img
          src={LOGO_URL}
          alt="АО КСИ"
          style={{ width: 160, height: 160, objectFit: "contain", filter: "brightness(1.05)" }}
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center" style={{ paddingTop: "18rem", paddingBottom: "10rem" }}>

        {/* Надпись-метка */}
        <div style={fade(v0)} className="mb-10">
          <span className="inline-flex items-center gap-2.5 font-ibm text-[11px] tracking-[0.28em] uppercase"
            style={{ color: "rgba(0,212,255,0.65)" }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "rgba(0,212,255,0.8)",
              boxShadow: "0 0 8px rgba(0,212,255,0.5)",
              display: "inline-block",
            }} />
            АО «КриптоСтройИнвест»
          </span>
        </div>

        {/* Заголовок */}
        <div style={fade(v1)} className="mb-8">
          <h1
            className="font-oswald font-bold text-white leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(42px, 6.5vw, 96px)" }}
          >
            Оператор интеллектуальной системы
            <br />
            <span style={{
              background: "linear-gradient(90deg, #00d4ff 0%, #7b2fff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              распределённого девелопмента
            </span>
          </h1>
        </div>

        {/* Разделитель */}
        <div style={fade(v2)} className="flex items-center justify-center gap-6 mb-10">
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(0,212,255,0.4)" }} />
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Основной текст */}
        <div style={fade(v2)}>
          <p
            className="font-ibm text-white/55 leading-relaxed mx-auto mb-5"
            style={{ fontSize: "clamp(15px, 1.6vw, 19px)", maxWidth: 680 }}
          >
            Мы создаём виртуального девелопера — технологическую систему нового типа
            для работы с активами и проектами, которые классический рынок реализует долго,
            неэффективно или не реализует на приемлемых условиях вовсе.
          </p>
          <p
            className="font-ibm font-medium mx-auto"
            style={{ fontSize: "clamp(14px, 1.4vw, 17px)", color: "rgba(0,212,255,0.55)", maxWidth: 560 }}
          >
            Приглашаем к практическому развёртыванию системы на реальных объектах и задачах.
          </p>
        </div>

        {/* Кнопки */}
        <div style={fade(v3)} className="flex flex-col sm:flex-row gap-4 justify-center mt-14 mb-7">
          <button
            onClick={openEarlyAccessModal}
            className="inline-flex items-center justify-center font-ibm font-semibold text-sm tracking-[0.12em] uppercase px-10 py-4 rounded-sm transition-all duration-300"
            style={{
              background: "#00d4ff",
              color: "#0a0a0f",
              border: "1px solid rgba(0,212,255,0.5)",
              boxShadow: "0 0 30px rgba(0,212,255,0.2)",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 45px rgba(0,212,255,0.4)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.2)")}
          >
            Передать актив в работу
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center font-ibm font-medium text-sm tracking-[0.12em] uppercase px-10 py-4 rounded-sm transition-all duration-300"
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)";
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            Запросить предложение
          </button>
        </div>

        {/* Подпись */}
        <div style={fade(v4)}>
          <p className="font-ibm text-white/18 text-xs tracking-[0.2em] uppercase">
            Новая инфраструктура девелопмента.
          </p>
        </div>

      </div>

      {/* Нижняя линия */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent)" }} />

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} defaultMessage="Запрос предложения" />
    </section>
  );
}