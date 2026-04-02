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

function ParcelMapVisual() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#080810" }}>
      {/* Masterplan SVG — urban block parcels with analytics overlay */}
      <svg viewBox="0 0 520 460" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="parcelCyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="parcelPurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7b2fff" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="parcelDim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="scanLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(0,212,255,0.12)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Base urban grid — street network */}
        {[0,80,160,240,320,400,480].map(x => (
          <line key={`vg${x}`} x1={x} y1="0" x2={x} y2="460" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        ))}
        {[0,60,120,180,240,300,360,420].map(y => (
          <line key={`hg${y}`} x1="0" y1={y} x2="520" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        ))}

        {/* Major roads — thicker */}
        <line x1="0" y1="180" x2="520" y2="180" stroke="rgba(255,255,255,0.09)" strokeWidth="2"/>
        <line x1="0" y1="300" x2="520" y2="300" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
        <line x1="160" y1="0" x2="160" y2="460" stroke="rgba(255,255,255,0.09)" strokeWidth="2"/>
        <line x1="320" y1="0" x2="320" y2="460" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>

        {/* BLOCK 1 — флагманский актив (highlighted cyan) */}
        <rect x="168" y="188" width="140" height="100" fill="url(#parcelCyan)" stroke="#00d4ff" strokeWidth="1.2" strokeOpacity="0.5"/>
        <rect x="172" y="192" width="132" height="92" fill="none" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.25" strokeDasharray="4,4"/>
        {/* Inner blocks */}
        <rect x="172" y="192" width="62" height="42" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.3"/>
        <rect x="238" y="192" width="62" height="42" fill="rgba(0,212,255,0.05)" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.2"/>
        <rect x="172" y="238" width="128" height="42" fill="rgba(0,212,255,0.06)" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.2"/>

        {/* BLOCK 2 — purple zone */}
        <rect x="8" y="8" width="140" height="160" fill="url(#parcelPurple)" stroke="#7b2fff" strokeWidth="0.8" strokeOpacity="0.4"/>
        <rect x="12" y="12" width="64" height="72" fill="rgba(123,47,255,0.07)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.25"/>
        <rect x="80" y="12" width="64" height="72" fill="rgba(123,47,255,0.05)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.2"/>
        <rect x="12" y="88" width="132" height="72" fill="rgba(123,47,255,0.06)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.2"/>

        {/* BLOCK 3 — dim right top */}
        <rect x="328" y="8" width="180" height="160" fill="url(#parcelDim)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
        <rect x="332" y="12" width="84" height="152" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4"/>
        <rect x="420" y="12" width="84" height="72" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4"/>
        <rect x="420" y="88" width="84" height="76" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4"/>

        {/* BLOCK 4 — bottom left */}
        <rect x="8" y="308" width="140" height="144" fill="url(#parcelDim)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
        <rect x="12" y="312" width="132" height="64" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4"/>
        <rect x="12" y="380" width="64" height="68" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
        <rect x="80" y="380" width="64" height="68" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>

        {/* BLOCK 5 — bottom right */}
        <rect x="328" y="308" width="184" height="144" fill="rgba(123,47,255,0.03)" stroke="#7b2fff" strokeWidth="0.5" strokeOpacity="0.2"/>
        <rect x="332" y="312" width="88" height="136" fill="rgba(123,47,255,0.04)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.15"/>
        <rect x="424" y="312" width="84" height="64" fill="rgba(123,47,255,0.03)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.12"/>
        <rect x="424" y="380" width="84" height="68" fill="rgba(123,47,255,0.02)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.1"/>

        {/* Analytics overlay — measurement lines */}
        <line x1="168" y1="165" x2="308" y2="165" stroke="#00d4ff" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="3,5"/>
        <line x1="168" y1="160" x2="168" y2="170" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.5"/>
        <line x1="308" y1="160" x2="308" y2="170" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.5"/>

        {/* Parcel labels */}
        <text x="238" y="243" textAnchor="middle" fill="rgba(0,212,255,0.7)" fontSize="7" fontFamily="IBM Plex Mono" letterSpacing="1">КриптоМетры</text>
        <text x="78" y="90" textAnchor="middle" fill="rgba(123,47,255,0.6)" fontSize="6" fontFamily="IBM Plex Mono" letterSpacing="0.5">LSS</text>
        <text x="404" y="90" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="IBM Plex Mono" letterSpacing="0.5">Fee-Dev</text>
        <text x="78" y="382" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="IBM Plex Mono" letterSpacing="0.5">Аналитика</text>
        <text x="416" y="382" textAnchor="middle" fill="rgba(123,47,255,0.35)" fontSize="6" fontFamily="IBM Plex Mono" letterSpacing="0.5">ИИ-лаб</text>

        {/* Dimension labels */}
        <text x="238" y="158" textAnchor="middle" fill="rgba(0,212,255,0.4)" fontSize="6" fontFamily="IBM Plex Mono">140 × 100 м</text>

        {/* Data nodes overlay — analytics pins */}
        <circle cx="238" cy="238" r="5" fill="#00d4ff" fillOpacity="0.2" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.6" filter="url(#glow)"/>
        <circle cx="238" cy="238" r="2" fill="#00d4ff" fillOpacity="0.9"/>
        <circle cx="78" cy="90" r="3.5" fill="#7b2fff" fillOpacity="0.3" stroke="#7b2fff" strokeWidth="0.8" strokeOpacity="0.5"/>
        <circle cx="78" cy="90" r="1.5" fill="#7b2fff" fillOpacity="0.8"/>

        {/* Scan line animation */}
        <rect x="0" y="0" width="520" height="30" fill="url(#scanLine)" opacity="0.6">
          <animateTransform attributeName="transform" type="translate" from="0 -30" to="0 490" dur="5s" repeatCount="indefinite"/>
        </rect>

        {/* Corner coordinates */}
        <text x="4" y="12" fill="rgba(255,255,255,0.15)" fontSize="5.5" fontFamily="IBM Plex Mono">55.7522°N</text>
        <text x="4" y="20" fill="rgba(255,255,255,0.15)" fontSize="5.5" fontFamily="IBM Plex Mono">37.6156°E</text>

        {/* North arrow */}
        <g transform="translate(490,20)">
          <line x1="0" y1="8" x2="0" y2="-2" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
          <polygon points="0,-4 -2,2 2,2" fill="rgba(255,255,255,0.3)"/>
          <text x="0" y="16" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="5" fontFamily="IBM Plex Mono">N</text>
        </g>

        {/* Scale bar */}
        <line x1="168" y1="450" x2="308" y2="450" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <line x1="168" y1="447" x2="168" y2="453" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <line x1="308" y1="447" x2="308" y2="453" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <text x="238" y="444" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="IBM Plex Mono">500 м</text>
      </svg>

      {/* Gradient overlays — vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(8,8,16,0.7) 100%)"
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to right, rgba(8,8,16,0.5) 0%, transparent 20%, transparent 80%, rgba(8,8,16,0.3) 100%)"
      }} />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#0a0a0f" }}>
      {/* Subtle architectural background */}
      <div className="absolute inset-0 parcel-bg opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-ksi-cyan/3 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-ksi-purple/4 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
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
            <p className="font-ibm text-white/40 text-xs tracking-widest uppercase mb-8 fade-in-up stagger-3">
              Девелопмент &nbsp;·&nbsp; Цифровая инфраструктура &nbsp;·&nbsp; ИИ &nbsp;·&nbsp; Земельный рынок
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
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-4">Кто вы</div>
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
                    style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                    <Icon name={item.icon} size={11} />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Parcel map visual */}
          <div className="relative h-[420px] lg:h-[480px] fade-in-up stagger-2">
            <div className="absolute inset-0 rounded-sm overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <ParcelMapVisual />
            </div>
            {/* Corner labels */}
            <div className="absolute top-3 left-3 asset-label">Генеральный план · АО КСИ</div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
              <span className="asset-label" style={{ color: "rgba(0,212,255,0.4)" }}>Активный актив</span>
            </div>
            <div className="absolute bottom-3 left-3 asset-label">Масштаб 1:5000</div>
            <div className="absolute bottom-3 right-3 asset-label">Московский регион</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
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

          {/* Layered hierarchy diagram */}
          <div className="relative">
            <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-6">Архитектура группы</div>

            {/* SVG layered stack */}
            <div className="relative">
              {hierarchy.map((item, i) => {
                const widths = ["100%", "92%", "84%", "84%", "76%"];
                const indents = [0, 16, 32, 32, 48];
                const isCyan = item.color === "cyan";
                const borderCol = isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.15)";
                const accentCol = isCyan ? "rgba(0,212,255,0.5)" : "rgba(123,47,255,0.5)";
                const bgCol = isCyan ? "rgba(0,212,255,0.04)" : "rgba(123,47,255,0.03)";
                return (
                  <div key={i} style={{ marginLeft: indents[i], marginBottom: i < 4 ? 0 : 0, position: "relative" }}>
                    {/* Connector line from previous */}
                    {i > 0 && (
                      <div style={{
                        position: "absolute",
                        left: -indents[i] + indents[i - 1] + 16,
                        top: -16,
                        width: 1,
                        height: 20,
                        background: `linear-gradient(to bottom, ${hierarchy[i-1].color === "cyan" ? "rgba(0,212,255,0.3)" : "rgba(123,47,255,0.25)"}, ${borderCol})`,
                      }} />
                    )}
                    <div
                      className="flex items-center gap-4 px-5 py-3.5 mb-2"
                      style={{
                        background: bgCol,
                        border: `1px solid ${borderCol}`,
                        borderRadius: "2px",
                        width: widths[i],
                      }}
                    >
                      <div className="font-mono-ibm text-xs flex-shrink-0 w-6" style={{ color: accentCol }}>{item.level}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-oswald text-white text-sm font-medium">{item.title}</span>
                          {i === 0 && (
                            <span className="font-mono-ibm text-[9px] px-1.5 py-0.5 rounded-sm" style={{ color: "#00d4ff", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}>ЯДРО</span>
                          )}
                        </div>
                        <div className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.role}</div>
                      </div>
                      {/* Width indicator bar */}
                      <div className="flex-shrink-0 hidden sm:block" style={{ width: 32, height: 2, background: borderCol, borderRadius: 1 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-sm mt-4" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)" }}>
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