import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/28655df5-bb72-4ef7-ba50-ca96e9a5ae13.png";

/* ─── Параллакс-мышь ─────────────────────────────────────── */
function useParallax(strength = 0.018) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [strength]);
  return offset;
}

/* ─── Счётчик строк (для нумерации у заголовка) ──────────── */
const STATS = [
  { value: "5", label: "кейсов обучения" },
  { value: "4", label: "внутренних контура" },
  { value: "2023", label: "год запуска" },
];

/* ─── Анимация появления ──────────────────────────────────── */
function useFadeIn(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

/* ─── Архитектурная SVG-схема (территория) ───────────────── */
function TerritoryMap({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Сетка */}
      <defs>
        <pattern id="t-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="glow-c" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-p" cx="80%" cy="70%" r="40%">
          <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#7b2fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="500" fill="url(#t-grid)" />
      <rect width="800" height="500" fill="url(#glow-c)" />
      <rect width="800" height="500" fill="url(#glow-p)" />

      {/* Кварталы */}
      <rect x="80" y="60" width="220" height="140" rx="1" stroke="rgba(0,212,255,0.18)" strokeWidth="0.8" />
      <rect x="320" y="60" width="140" height="60" rx="1" stroke="rgba(0,212,255,0.12)" strokeWidth="0.6" />
      <rect x="320" y="140" width="140" height="60" rx="1" stroke="rgba(0,212,255,0.10)" strokeWidth="0.6" />
      <rect x="480" y="60" width="240" height="140" rx="1" stroke="rgba(123,47,255,0.15)" strokeWidth="0.8" />

      {/* Разделительные дороги */}
      <line x1="0" y1="220" x2="800" y2="220" stroke="rgba(0,212,255,0.07)" strokeWidth="1" />
      <line x1="310" y1="0" x2="310" y2="220" stroke="rgba(0,212,255,0.07)" strokeWidth="1" />
      <line x1="470" y1="0" x2="470" y2="220" stroke="rgba(0,212,255,0.07)" strokeWidth="1" />

      {/* Нижние кварталы */}
      <rect x="80" y="260" width="100" height="180" rx="1" stroke="rgba(0,212,255,0.10)" strokeWidth="0.6" />
      <rect x="200" y="260" width="160" height="80" rx="1" stroke="rgba(0,212,255,0.10)" strokeWidth="0.6" />
      <rect x="200" y="360" width="160" height="80" rx="1" stroke="rgba(0,212,255,0.08)" strokeWidth="0.6" />
      <rect x="380" y="260" width="200" height="180" rx="1" stroke="rgba(123,47,255,0.12)" strokeWidth="0.8" />
      <rect x="600" y="260" width="120" height="80" rx="1" stroke="rgba(0,212,255,0.08)" strokeWidth="0.6" />
      <rect x="600" y="360" width="120" height="80" rx="1" stroke="rgba(0,212,255,0.08)" strokeWidth="0.6" />

      {/* Точки-узлы */}
      <circle cx="190" cy="130" r="3" fill="none" stroke="#00d4ff" strokeWidth="0.8" opacity="0.5" />
      <circle cx="190" cy="130" r="7" fill="none" stroke="#00d4ff" strokeWidth="0.3" opacity="0.3" />
      <circle cx="560" cy="130" r="3" fill="none" stroke="#7b2fff" strokeWidth="0.8" opacity="0.4" />
      <circle cx="560" cy="130" r="7" fill="none" stroke="#7b2fff" strokeWidth="0.3" opacity="0.25" />
      <circle cx="480" cy="350" r="3" fill="none" stroke="#00d4ff" strokeWidth="0.8" opacity="0.4" />

      {/* Соединительные линии */}
      <line x1="190" y1="130" x2="480" y2="350" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5" strokeDasharray="6,8" />
      <line x1="560" y1="130" x2="480" y2="350" stroke="rgba(123,47,255,0.05)" strokeWidth="0.5" strokeDasharray="6,8" />

      {/* Подписи кварталов */}
      <text x="108" y="78" fill="rgba(0,212,255,0.25)" fontSize="6" fontFamily="monospace" letterSpacing="2">КОНТУР А</text>
      <text x="497" y="78" fill="rgba(123,47,255,0.22)" fontSize="6" fontFamily="monospace" letterSpacing="2">КОНТУР Б</text>
      <text x="397" y="278" fill="rgba(123,47,255,0.18)" fontSize="6" fontFamily="monospace" letterSpacing="2">КОНТУР В</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export function HeroSection() {
  const parallax = useParallax(0.016);
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const v0 = useFadeIn(0);
  const v1 = useFadeIn(120);
  const v2 = useFadeIn(280);
  const v3 = useFadeIn(440);
  const v4 = useFadeIn(580);
  const v5 = useFadeIn(720);

  const fade = (v: boolean, dy = 22, delay = 0): React.CSSProperties => ({
    opacity: v ? 1 : 0,
    transform: v ? "none" : `translateY(${dy}px)`,
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse 120% 80% at 50% 0%, #0d1117 0%, #0a0a0f 55%)" }}
    >

      {/* ── Фоновый слой: карта территории + параллакс ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${parallax.x * -0.6}px, ${parallax.y * -0.6}px)`,
          transition: "transform 0.15s linear",
        }}
      >
        <div className="absolute inset-0 scale-110">
          <TerritoryMap opacity={0.9} />
        </div>
        {/* Затухание снизу */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 30%, #0a0a0f 90%)" }} />
        {/* Затухание по краям */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 100% at 50% 50%, transparent 40%, #0a0a0f 100%)" }} />
      </div>

      {/* ── Свечения ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            top: "5%", left: "50%",
            transform: `translate(-50%, 0) translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`,
            background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
            transition: "transform 0.2s linear",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            bottom: "-10%", right: "-5%",
            background: "radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Горизонтальная линия-разделитель вверху ── */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)" }} />

      {/* ════════ КОНТЕНТ ════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-80 pb-20 lg:pt-96">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* ── Левая колонка: основной контент ── */}
          <div className="lg:col-span-7 xl:col-span-6">

            {/* Статус-бейдж */}
            <div style={fade(v0)}>
              <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 border border-ksi-cyan/20 bg-ksi-cyan/[0.04] rounded-sm backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-ksi-cyan animate-pulse flex-shrink-0" />
                <span className="font-ibm text-ksi-cyan/75 text-xs tracking-[0.22em] uppercase">
                  Ранний доступ открыт
                </span>
                <span className="w-px h-3 bg-white/15" />
                <span className="font-ibm text-white/30 text-xs tracking-[0.1em]">B2B · НДС</span>
              </div>
            </div>

            {/* Заголовок */}
            <div style={fade(v1)}>
              <h1 className="font-oswald font-semibold text-white leading-[0.92] tracking-tight mb-6"
                style={{ fontSize: "clamp(52px, 7vw, 88px)" }}>
                Виртуальный<br />
                <span className="text-gradient-main">девелопер</span><br />
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.62em", letterSpacing: "0.04em" }}>
                  АО «КриптоСтройИнвест»
                </span>
              </h1>
            </div>

            {/* Подзаголовок */}
            <div style={fade(v2)}>
              <p className="font-ibm text-white/60 leading-relaxed mb-3"
                style={{ fontSize: "clamp(16px, 1.8vw, 20px)", maxWidth: 480 }}>
                Рынок получает доступ к интеллекту девелопера.
                Подключается к его обучению. Занимает раннюю позицию.
              </p>
              <p className="font-ibm text-white/30 text-sm leading-relaxed mb-10"
                style={{ maxWidth: 420 }}>
                Не консалтинг. Не ИИ-стартап. Не каталог объектов.
                Интеллектуальная девелоперская система — к которой можно подключиться уже сейчас.
              </p>
            </div>

            {/* CTA */}
            <div style={fade(v3)}>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  to="/early-access"
                  className="btn-primary-ksi px-8 py-3.5 text-sm font-medium rounded-sm text-center"
                  style={{ minWidth: 200 }}
                >
                  Получить ранний доступ
                </Link>
                <Link
                  to="/coauthor"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-ksi-cyan/40 text-white/50 hover:text-white/90 transition-all duration-300 px-8 py-3.5 text-sm font-ibm rounded-sm"
                >
                  Стать соавтором
                  <Icon name="ArrowRight" size={15} />
                </Link>
              </div>

              {/* Микротекст соавторства */}
              <div className="flex items-start gap-2.5 max-w-sm">
                <Icon name="Info" size={13} className="text-white/20 flex-shrink-0 mt-0.5" />
                <p className="font-ibm text-white/22 text-xs leading-relaxed">
                  Тот, кто входит сейчас, — не просто пользователь системы.
                  Он становится её соавтором и получает КриптоМетры.
                </p>
              </div>
            </div>
          </div>

          {/* ── Правая колонка: статус-панель ── */}
          <div className="lg:col-span-5 xl:col-span-6 hidden lg:flex flex-col gap-4">

            {/* Три числа */}
            <div style={fade(v4)}>
              <div className="grid grid-cols-3 gap-3">
                {STATS.map((s) => (
                  <div key={s.label}
                    className="border border-white/8 bg-white/[0.03] backdrop-blur-sm p-4 rounded-sm text-center">
                    <div className="font-oswald text-ksi-cyan text-2xl font-semibold mb-1">{s.value}</div>
                    <div className="font-ibm text-white/28 text-[11px] leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Схема работы */}
            <div style={fade(v5)}>
              <div className="border border-white/8 bg-white/[0.025] backdrop-blur-sm rounded-sm overflow-hidden">
                <div className="border-b border-white/6 px-5 py-3 flex items-center justify-between">
                  <span className="font-ibm text-white/20 text-[10px] tracking-[0.2em] uppercase">Схема доступа</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <span className="w-1.5 h-1.5 rounded-full bg-ksi-cyan/30" />
                    <span className="w-1.5 h-1.5 rounded-full bg-ksi-cyan/60" />
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { n: "01", text: "Юрлицо подключается к системе", accent: false },
                    { n: "02", text: "Ставит реальную девелоперскую задачу", accent: false },
                    { n: "03", text: "Виртуальный девелопер формирует решение", accent: true },
                    { n: "04", text: "Система обучается. Начисляются КриптоМетры", accent: true },
                  ].map((row) => (
                    <div key={row.n} className="flex items-center gap-3">
                      <span className={`font-ibm text-[10px] font-bold w-6 flex-shrink-0 ${row.accent ? "text-ksi-cyan" : "text-white/20"}`}>
                        {row.n}
                      </span>
                      <div className={`flex-1 h-px ${row.accent ? "bg-ksi-cyan/20" : "bg-white/6"}`} />
                      <span className={`font-ibm text-xs text-right max-w-[200px] leading-tight ${row.accent ? "text-white/60" : "text-white/30"}`}>
                        {row.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/6 px-5 py-3 flex items-center justify-between">
                  <span className="font-ibm text-white/18 text-[10px]">Только юридические лица</span>
                  <Link to="/legal" className="font-ibm text-ksi-cyan/40 hover:text-ksi-cyan/70 text-[10px] transition-colors flex items-center gap-1">
                    Правовая основа <Icon name="ArrowRight" size={9} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Нижняя полоса: три отличия ── */}
        <div className="mt-16 pt-8 border-t border-white/6"
          style={{
            ...fade(v5),
            transitionDelay: "50ms",
          }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "Ban",
                label: "Не консалтинг",
                desc: "Решаем реальные задачи. Анализ участка, концепция, финансовая модель, структура партнёрства.",
              },
              {
                icon: "Cpu",
                label: "Не ИИ-стартап",
                desc: "Реальные команды. Реальные проекты. ИИ усиливает людей — не заменяет их.",
              },
              {
                icon: "FolderX",
                label: "Не каталог объектов",
                desc: "Проекты — кейсы обучения системы. Живая практика интеллекта, а не витрина.",
              },
            ].map((item) => (
              <div key={item.label}
                className="flex gap-4 p-5 border border-white/6 bg-white/[0.02] rounded-sm group hover:border-ksi-cyan/20 transition-all duration-300">
                <Icon name={item.icon as "Ban"} size={16} className="text-ksi-cyan/35 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-oswald text-white text-base font-medium mb-1">{item.label}</div>
                  <div className="font-ibm text-white/32 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Большой логотип по центру под навбаром — исчезает при скролле ── */}
      <div
        className="absolute left-1/2 z-20 pointer-events-none flex flex-col items-center gap-1"
        style={{
          top: 72,
          opacity: scrolled ? 0 : 1,
          transform: scrolled
            ? "translateX(-50%) translateY(-12px) scale(0.25)"
            : "translateX(-50%) translateY(0) scale(1)",
          transition: "opacity 380ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1)",
          transformOrigin: "top center",
        }}
      >
        <img
          src={LOGO_URL}
          alt="АО КСИ"
          style={{
            width: 240,
            height: 240,
            objectFit: "contain",
            filter: "drop-shadow(0 0 32px rgba(0,212,255,0.30)) drop-shadow(0 0 80px rgba(0,212,255,0.12))",
          }}
        />
      </div>

      {/* Стрелка вниз */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-25">
        <Icon name="ChevronDown" size={20} className="text-white" />
      </div>
    </section>
  );
}