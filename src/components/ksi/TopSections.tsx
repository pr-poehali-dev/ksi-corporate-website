import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS, STATS, ECOSYSTEM_NODES, CONNECTIONS } from "./data";

export function EcosystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const getPos = (node: typeof ECOSYSTEM_NODES[0]) => ({
      x: (node.x / 100) * canvas.offsetWidth,
      y: (node.y / 100) * canvas.offsetHeight,
    });

    const draw = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      CONNECTIONS.forEach(([fromId, toId], idx) => {
        const from = ECOSYSTEM_NODES.find(n => n.id === fromId)!;
        const to = ECOSYSTEM_NODES.find(n => n.id === toId)!;
        const fp = getPos(from);
        const tp = getPos(to);

        const gradient = ctx.createLinearGradient(fp.x, fp.y, tp.x, tp.y);
        gradient.addColorStop(0, "rgba(0,212,255,0.18)");
        gradient.addColorStop(1, "rgba(123,47,255,0.18)");

        ctx.beginPath();
        ctx.moveTo(fp.x, fp.y);
        ctx.lineTo(tp.x, tp.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();

        const progress = ((time * 0.0004 + idx * 0.13) % 1);
        const px = fp.x + (tp.x - fp.x) * progress;
        const py = fp.y + (tp.y - fp.y) * progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00d4ff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00d4ff";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ECOSYSTEM_NODES.forEach((node, ni) => {
        const pos = getPos(node);
        const pulse = Math.sin(time * 0.0018 + ni * 0.9) * 0.12 + 0.88;
        const r = (node.size / 2) * pulse;

        const glowGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r * 2.8);
        glowGrad.addColorStop(0, node.color + "28");
        glowGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        const ringGrad = ctx.createRadialGradient(pos.x, pos.y, r * 0.4, pos.x, pos.y, r);
        ringGrad.addColorStop(0, node.color + "35");
        ringGrad.addColorStop(1, node.color + "18");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = ringGrad;
        ctx.strokeStyle = node.color + "70";
        ctx.lineWidth = node.isPrimary ? 2 : 1;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffffdd";
        ctx.font = `${node.isPrimary ? "600" : "400"} ${node.isPrimary ? "10px" : "8px"} 'IBM Plex Sans', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, pos.x, pos.y);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-ksi-dark/95 backdrop-blur-md border-b border-ksi-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/6cc3c0d3-b169-4aea-b654-cf24515a3fb0.png"
            alt="КСИ"
            className="h-9 w-auto flex-shrink-0"
          />
          <div className="font-mono-ibm text-white/50 text-[9px] tracking-widest hidden sm:block">КриптоСтройИнвест</div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
        </div>

        <a href="/contacts" className="hidden lg:block btn-primary-ksi px-5 py-2 text-sm rounded-sm cursor-pointer">
          Связаться
        </a>

        <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-ksi-dark/98 border-t border-ksi-border px-6 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="block nav-link py-2" onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="/contacts" className="block btn-primary-ksi px-5 py-2 text-sm rounded-sm text-center mt-4" onClick={() => setMobileOpen(false)}>
            Связаться
          </a>
        </div>
      )}
    </nav>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-ksi-cyan/5 blur-3xl float-animation" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-ksi-purple/8 blur-3xl float-animation" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-ksi-cyan/5 rotate-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-ksi-purple/5" style={{ animation: "rotateSlow 30s linear infinite reverse" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-6 fade-in-up stagger-1">
              ◆ Головная структура группы &nbsp;·&nbsp; АО КСИ &nbsp;·&nbsp; Москва
            </div>
            <h1 className="font-oswald font-bold text-5xl md:text-6xl xl:text-7xl leading-none mb-2 fade-in-up stagger-2">
              <span className="text-white glitch-text" data-text="КРИПТО">КРИПТО</span>
            </h1>
            <h1 className="font-oswald font-bold text-5xl md:text-6xl xl:text-7xl leading-none mb-6 fade-in-up stagger-3">
              <span className="text-gradient-main">СТРОЙ</span>
              <span className="text-white"> ИНВЕСТ</span>
            </h1>
            <p className="font-ibm text-white/40 text-xs tracking-widest uppercase mb-8 fade-in-up stagger-3">
              Девелопмент &nbsp;·&nbsp; Цифровая инфраструктура &nbsp;·&nbsp; ИИ &nbsp;·&nbsp; Аналитика &nbsp;·&nbsp; Земельный рынок
            </p>
            <p className="font-ibm text-white/70 text-lg leading-relaxed mb-10 max-w-lg fade-in-up stagger-4">
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

            {/* Аудиторный роутер */}
            <div className="mt-12 fade-in-up stagger-6">
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-4">БЫСТРЫЙ ВХОД ПО РОЛИ</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Землевладельцам", href: "/partners#land", icon: "MapPin" },
                  { label: "Девелоперам", href: "/partners#developer", icon: "Building2" },
                  { label: "Технопартнёрам", href: "/partners#tech", icon: "Code2" },
                  { label: "Инвесторам", href: "/partners#investor", icon: "TrendingUp" },
                  { label: "Медиа", href: "/media", icon: "Newspaper" },
                ].map((item, i) => (
                  <a key={i} href={item.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-ibm text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                    style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                    <Icon name={item.icon} size={11} />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-center lg:justify-end fade-in-up stagger-2">
              <img
                src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/6cc3c0d3-b169-4aea-b654-cf24515a3fb0.png"
                alt="КСИ"
                className="h-32 w-auto opacity-80"
                style={{ filter: "drop-shadow(0 0 24px rgba(0,212,255,0.25))" }}
              />
            </div>
            <div className="relative h-[380px] lg:h-[440px]">
              <div className="absolute inset-0 rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
                <div className="absolute inset-0 shimmer pointer-events-none" />
                <EcosystemCanvas />
              </div>
              <div className="absolute -top-3 -right-1 font-mono-ibm text-ksi-cyan/25 text-xs tracking-widest">
                ECOSYSTEM MAP v1.0
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-ksi-border">
          {STATS.map((stat, i) => (
            <div key={i} className="fade-in-up" style={{ animationDelay: `${0.1 * i + 0.3}s`, opacity: 0 }}>
              <div className="font-oswald text-3xl font-semibold text-gradient-cyan">
                {stat.value}<span className="text-xl">{stat.suffix}</span>
              </div>
              <div className="font-ibm text-white/40 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono-ibm text-white/20 text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-ksi-cyan/40 to-transparent" />
      </div>
    </section>
  );
}

export function AboutSection() {
  const hierarchy = [
    {
      level: "01",
      title: "АО КСИ",
      role: "Головная структура",
      desc: "Управляющая и технологическая надстройка. Формирует стратегию, управляет инфраструктурой, координирует направления.",
      color: "cyan",
    },
    {
      level: "02",
      title: "КриптоМетры",
      role: "Флагманский продукт",
      desc: "Операционная среда распределённого девелопмента. Центральная платформа группы.",
      color: "cyan",
    },
    {
      level: "03",
      title: "Технологические платформы",
      role: "ИИ-лаб · ИИ-продакшн · Лицензирование",
      desc: "Инфраструктура ИИ, цифровых медиапродуктов и передачи технологий партнёрам.",
      color: "purple",
    },
    {
      level: "04",
      title: "Аналитика и данные",
      role: "LSS · Земельная аналитика · Медиацентр",
      desc: "Data-продукты, земельный поиск, аналитические базы и интеллектуальное сопровождение.",
      color: "purple",
    },
    {
      level: "05",
      title: "Операционные сервисы",
      role: "Fee-Dev · Управление недвижимостью",
      desc: "Девелоперский оператор, управление объектами и постдевелоперское сопровождение.",
      color: "cyan",
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,212,255,0.3) 39px, rgba(0,212,255,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,212,255,0.3) 39px, rgba(0,212,255,0.3) 40px)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="section-label mb-6">◆ Роль АО КСИ в экосистеме</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-8">
              Не строительная компания.<br />
              <span className="text-gradient-cyan">Не фонд. Не стартап.</span>
            </h2>
            <p className="font-ibm text-white/65 text-lg leading-relaxed mb-6">
              АО «КриптоСтройИнвест» — головная управляющая структура многопрофильной группы.
              Оператор цифровой девелоперской инфраструктуры, объединяющей рынок недвижимости,
              технологические платформы и профессиональную экспертизу.
            </p>
            <p className="font-ibm text-white/45 text-base leading-relaxed mb-10">
              АО КСИ формирует среду, в которой работают землевладельцы, девелоперы,
              аналитические системы, ИИ-инструменты и профессиональные операторы.
              Горизонт — долгий цикл. Модель — системная. Ценность — в инфраструктуре
              и компетенциях, которые накапливаются.
            </p>

            <div className="space-y-3 mb-10">
              {[
                { icon: "Layers", text: "Головная структура мультинаправленной группы" },
                { icon: "Globe", text: "Оператор цифровой девелоперской инфраструктуры" },
                { icon: "BrainCircuit", text: "ИИ-компетенции, земельная аналитика, data-продукты" },
                { icon: "Scale", text: "Структурирование сложных партнёрских механизмов" },
                { icon: "Shield", text: "Правовая корректность и прозрачность структур" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    <Icon name={item.icon} size={16} className="text-ksi-cyan" />
                  </div>
                  <p className="font-ibm text-white/60 text-sm leading-relaxed pt-2">{item.text}</p>
                </div>
              ))}
            </div>

            <a href="/about" className="btn-outline-ksi px-6 py-2.5 rounded-sm text-sm inline-block cursor-pointer">
              Подробнее о компании →
            </a>
          </div>

          <div className="relative space-y-3">
            <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-5">ИЕРАРХИЯ ЭКОСИСТЕМЫ</div>
            {hierarchy.map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-sm transition-all"
                style={{ background: "rgba(255,255,255,0.015)", border: `1px solid ${item.color === "cyan" ? "rgba(0,212,255,0.08)" : "rgba(123,47,255,0.08)"}` }}>
                <div className="font-mono-ibm text-xs flex-shrink-0 mt-0.5" style={{ color: item.color === "cyan" ? "rgba(0,212,255,0.35)" : "rgba(123,47,255,0.35)" }}>{item.level}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-oswald text-white text-sm font-medium">{item.title}</span>
                    {i === 0 && (
                      <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm" style={{ color: "#00d4ff", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>Ядро</span>
                    )}
                  </div>
                  <div className="font-mono-ibm text-xs mb-1.5" style={{ color: item.color === "cyan" ? "rgba(0,212,255,0.4)" : "rgba(123,47,255,0.4)" }}>{item.role}</div>
                  <p className="font-ibm text-white/35 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="p-4 rounded-sm mt-2" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">ПРАВОВАЯ ОГОВОРКА</div>
              <p className="font-ibm text-white/30 text-xs leading-relaxed">
                Компания не осуществляет публичного привлечения денежных средств.
                Отдельные модели участия реализуются в рамках специальных юридических
                конструкций и партнёрских механизмов, формируемых индивидуально.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}