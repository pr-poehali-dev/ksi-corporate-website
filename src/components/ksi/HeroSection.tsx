import Icon from "@/components/ui/icon";
import { STATS } from "./data";

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
