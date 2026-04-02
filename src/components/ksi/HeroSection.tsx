import Icon from "@/components/ui/icon";
import { STATS } from "./data";

/* ─── Aerial Masterplan Visual ─────────────────────────────────────────────
   Тип B: схема квартала/участка с контурами, изометрическими объёмами,
   аналитическими оверлеями и девелоперской разметкой.
   Полностью средствами SVG — без зависимостей.
────────────────────────────────────────────────────────────────────────── */
function AerialMasterplan() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#060609" }}>
      <svg
        viewBox="0 0 600 520"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Land parcel fills */}
          <linearGradient id="gLand1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="gLand2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7b2fff" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="gLand3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.008" />
          </linearGradient>
          {/* Isometric face fills */}
          <linearGradient id="gIsoTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gIsoFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="gIsoSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="gIso2Top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7b2fff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gIso2Front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#7b2fff" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="gIso2Side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#7b2fff" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="gScan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(0,212,255,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="fGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="fSoft">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── базовая сетка кадастрового плана ──────────────────────────── */}
        {[0,60,120,180,240,300,360,420,480,540,600].map(x => (
          <line key={`vb${x}`} x1={x} y1="0" x2={x} y2="520"
            stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
        ))}
        {[0,60,120,180,240,300,360,420,480,520].map(y => (
          <line key={`hb${y}`} x1="0" y1={y} x2="600" y2={y}
            stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
        ))}

        {/* ── красные линии / магистрали ────────────────────────────────── */}
        <line x1="0" y1="200" x2="600" y2="200" stroke="rgba(255,255,255,0.07)" strokeWidth="2.5" />
        <line x1="0" y1="360" x2="600" y2="360" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
        <line x1="180" y1="0" x2="180" y2="520" stroke="rgba(255,255,255,0.07)" strokeWidth="2.5" />
        <line x1="360" y1="0" x2="360" y2="520" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />

        {/* ── УЧАСТОК A — флагманский (cyan), зона КриптоМетры ─────────── */}
        {/* Контур участка */}
        <polygon
          points="190,210 350,210 350,350 190,350"
          fill="url(#gLand1)"
          stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.55"
        />
        {/* Внутренняя разметка участка A */}
        <line x1="190" y1="270" x2="350" y2="270" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="6,4"/>
        <line x1="270" y1="210" x2="270" y2="350" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="6,4"/>

        {/* ИЗОМЕТРИЧЕСКИЙ ОБЪЁМ A — главное здание (КриптоМетры) */}
        {/* top face */}
        <polygon points="220,200 310,200 340,220 250,220"
          fill="url(#gIsoTop)" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.6" filter="url(#fSoft)" />
        {/* front face */}
        <polygon points="250,220 340,220 340,275 250,275"
          fill="url(#gIsoFront)" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.4" />
        {/* side face */}
        <polygon points="220,200 250,220 250,275 220,255"
          fill="url(#gIsoSide)" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.3" />
        {/* Окна — фасадный ритм */}
        {[0,1,2,3].map(j => (
          <rect key={`wa${j}`} x={257 + j * 20} y={228} width={10} height={16}
            fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.5" />
        ))}
        {[0,1,2,3].map(j => (
          <rect key={`wa2${j}`} x={257 + j * 20} y={250} width={10} height={16}
            fill="rgba(0,212,255,0.1)" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.4" />
        ))}
        {/* Метка объекта */}
        <text x="295" y="245" textAnchor="middle"
          fill="rgba(0,212,255,0.75)" fontSize="6.5" fontFamily="IBM Plex Mono" letterSpacing="1.5">
          КриптоМетры
        </text>
        <text x="295" y="253" textAnchor="middle"
          fill="rgba(0,212,255,0.4)" fontSize="5" fontFamily="IBM Plex Mono" letterSpacing="0.5">
          ФЛАГМАН
        </text>

        {/* ── УЧАСТОК B — purple зона (Аналитика/LSS) ──────────────────── */}
        <polygon
          points="20,20 170,20 170,185 20,185"
          fill="url(#gLand2)"
          stroke="#7b2fff" strokeWidth="1.2" strokeOpacity="0.45"
        />
        {/* Внутренняя разметка участка B */}
        <line x1="20" y1="100" x2="170" y2="100" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="5,4"/>
        <line x1="95" y1="20" x2="95" y2="185" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="5,4"/>

        {/* ИЗОМЕТРИЧЕСКИЙ ОБЪЁМ B — меньший (LSS) */}
        <polygon points="30,92 90,92 110,104 50,104"
          fill="url(#gIso2Top)" stroke="#7b2fff" strokeWidth="0.9" strokeOpacity="0.55" />
        <polygon points="50,104 110,104 110,148 50,148"
          fill="url(#gIso2Front)" stroke="#7b2fff" strokeWidth="0.7" strokeOpacity="0.4" />
        <polygon points="30,92 50,104 50,148 30,136"
          fill="url(#gIso2Side)" stroke="#7b2fff" strokeWidth="0.7" strokeOpacity="0.3" />
        {/* Окна */}
        {[0,1,2].map(j => (
          <rect key={`wb${j}`} x={57 + j * 17} y={110} width={9} height={12}
            fill="rgba(123,47,255,0.18)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.5" />
        ))}
        {[0,1,2].map(j => (
          <rect key={`wb2${j}`} x={57 + j * 17} y={128} width={9} height={12}
            fill="rgba(123,47,255,0.12)" stroke="#7b2fff" strokeWidth="0.4" strokeOpacity="0.35" />
        ))}
        <text x="70" y="122" textAnchor="middle"
          fill="rgba(123,47,255,0.7)" fontSize="6" fontFamily="IBM Plex Mono" letterSpacing="1">
          LSS
        </text>

        {/* ── УЧАСТОК C — top right dim зона ───────────────────────────── */}
        <polygon
          points="370,20 580,20 580,185 370,185"
          fill="url(#gLand3)"
          stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"
        />
        <line x1="370" y1="100" x2="580" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4" strokeDasharray="5,5"/>
        <line x1="475" y1="20" x2="475" y2="185" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4" strokeDasharray="5,5"/>
        {/* Малые объёмы */}
        <polygon points="380,78 430,78 445,88 395,88"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
        <polygon points="395,88 445,88 445,120 395,120"
          fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <polygon points="380,78 395,88 395,120 380,110"
          fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text x="412" y="102" textAnchor="middle"
          fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="IBM Plex Mono">Fee-Dev</text>

        {/* ── УЧАСТОК D — bottom left dim ──────────────────────────────── */}
        <polygon
          points="20,375 170,375 170,510 20,510"
          fill="url(#gLand3)"
          stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"
        />
        <polygon points="35,390 85,390 100,400 50,400"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
        <polygon points="50,400 100,400 100,435 50,435"
          fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <polygon points="35,390 50,400 50,435 35,425"
          fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="68" y="415" textAnchor="middle"
          fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="IBM Plex Mono">ИИ-лаб</text>

        {/* ── УЧАСТОК E — bottom right purple dim ──────────────────────── */}
        <polygon
          points="370,375 580,375 580,510 370,510"
          fill="rgba(123,47,255,0.04)"
          stroke="rgba(123,47,255,0.2)" strokeWidth="0.8"
        />
        <polygon points="385,385 455,385 475,398 405,398"
          fill="rgba(123,47,255,0.06)" stroke="#7b2fff" strokeWidth="0.6" strokeOpacity="0.35" />
        <polygon points="405,398 475,398 475,440 405,440"
          fill="rgba(123,47,255,0.04)" stroke="#7b2fff" strokeWidth="0.5" strokeOpacity="0.25" />
        <polygon points="385,385 405,398 405,440 385,427"
          fill="rgba(123,47,255,0.025)" stroke="#7b2fff" strokeWidth="0.5" strokeOpacity="0.2" />
        <text x="430" y="418" textAnchor="middle"
          fill="rgba(123,47,255,0.45)" fontSize="5.5" fontFamily="IBM Plex Mono">Управление</text>

        {/* ── аналитические оверлеи ────────────────────────────────────── */}
        {/* Размерная линия участка A */}
        <line x1="190" y1="193" x2="350" y2="193"
          stroke="#00d4ff" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="3,4" />
        <line x1="190" y1="189" x2="190" y2="197" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="350" y1="189" x2="350" y2="197" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
        <text x="270" y="190" textAnchor="middle"
          fill="rgba(0,212,255,0.45)" fontSize="5.5" fontFamily="IBM Plex Mono">160 × 140 м</text>

        {/* Размерная линия участка B */}
        <line x1="9" y1="100" x2="9" y2="185"
          stroke="#7b2fff" strokeWidth="0.6" strokeOpacity="0.3" strokeDasharray="3,4" />

        {/* Аналитический pin A с пульсом */}
        <circle cx="270" cy="280" r="8" fill="#00d4ff" fillOpacity="0.08"
          stroke="#00d4ff" strokeWidth="0.6" strokeOpacity="0.25">
          <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="270" cy="280" r="3.5" fill="#00d4ff" fillOpacity="0.3"
          stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="270" cy="280" r="1.5" fill="#00d4ff" fillOpacity="0.95" />

        {/* Аналитический pin B */}
        <circle cx="70" cy="160" r="6" fill="#7b2fff" fillOpacity="0.08"
          stroke="#7b2fff" strokeWidth="0.6" strokeOpacity="0.3">
          <animate attributeName="r" values="6;10;6" dur="4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="160" r="2.5" fill="#7b2fff" fillOpacity="0.9" />

        {/* Callout A */}
        <line x1="278" y1="276" x2="310" y2="258" stroke="#00d4ff" strokeWidth="0.6" strokeOpacity="0.35" strokeDasharray="2,3"/>
        <text x="313" y="257" fill="rgba(0,212,255,0.55)" fontSize="6" fontFamily="IBM Plex Mono">актив №1</text>
        <text x="313" y="265" fill="rgba(0,212,255,0.3)" fontSize="5" fontFamily="IBM Plex Mono">Оценка: A+</text>

        {/* ── координаты ───────────────────────────────────────────────── */}
        <text x="5" y="12" fill="rgba(255,255,255,0.13)" fontSize="5.5" fontFamily="IBM Plex Mono">55.7522°N</text>
        <text x="5" y="20" fill="rgba(255,255,255,0.13)" fontSize="5.5" fontFamily="IBM Plex Mono">37.6156°E</text>

        {/* ── север ────────────────────────────────────────────────────── */}
        <g transform="translate(574,22)">
          <circle cx="0" cy="0" r="9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
          <line x1="0" y1="7" x2="0" y2="-2" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
          <polygon points="0,-5 -2,1 2,1" fill="rgba(255,255,255,0.3)" />
          <text x="0" y="18" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="5" fontFamily="IBM Plex Mono">N</text>
        </g>

        {/* ── масштабная линейка ───────────────────────────────────────── */}
        <line x1="20" y1="510" x2="120" y2="510" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
        <line x1="20" y1="507" x2="20" y2="513" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
        <line x1="70" y1="507" x2="70" y2="513" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
        <line x1="120" y1="507" x2="120" y2="513" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
        <text x="70" y="505" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="5" fontFamily="IBM Plex Mono">500 м</text>

        {/* ── скан-линия ───────────────────────────────────────────────── */}
        <rect x="0" y="0" width="600" height="40" fill="url(#gScan)" opacity="0.7">
          <animateTransform attributeName="transform" type="translate"
            from="0 -40" to="0 560" dur="7s" repeatCount="indefinite" />
        </rect>

        {/* ── подпись генплана ─────────────────────────────────────────── */}
        <text x="300" y="516" textAnchor="middle"
          fill="rgba(255,255,255,0.1)" fontSize="5" fontFamily="IBM Plex Mono" letterSpacing="2">
          АО КСИ · ГЕНЕРАЛЬНЫЙ ПЛАН · МАСШТАБ 1:5000
        </text>
      </svg>

      {/* Виньетка по краям */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(6,6,9,0.65) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(6,6,9,0.55) 0%, transparent 18%, transparent 82%, rgba(6,6,9,0.4) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(6,6,9,0.4) 0%, transparent 15%, transparent 85%, rgba(6,6,9,0.5) 100%)" }} />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#080810" }}>
      {/* Очень тихая тектоническая сетка — не айти, а кадастр */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)",
        backgroundSize: "120px 120px",
      }} />
      {/* Атмосферное свечение — не круги, а пятна */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "20%", left: "5%",
          width: 600, height: 400,
          background: "radial-gradient(ellipse, rgba(0,212,255,0.035) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "0%",
          width: 500, height: 500,
          background: "radial-gradient(ellipse, rgba(123,47,255,0.03) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── левая колонка — позиционирование ── */}
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
            <p className="font-ibm text-white/35 text-[11px] tracking-[0.22em] uppercase mb-8 fade-in-up stagger-3">
              Девелопмент &nbsp;·&nbsp; Земельные активы &nbsp;·&nbsp; Цифровая инфраструктура &nbsp;·&nbsp; Аналитика
            </p>
            <p className="font-ibm text-white/68 text-lg leading-relaxed mb-10 max-w-lg fade-in-up stagger-4">
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

            {/* Вход по роли */}
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
                    style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                    <Icon name={item.icon} size={11} />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── правая колонка — aerial masterplan ── */}
          <div className="relative h-[440px] lg:h-[520px] fade-in-up stagger-2">
            <div className="absolute inset-0 overflow-hidden" style={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "2px",
            }}>
              <AerialMasterplan />
            </div>
            {/* Corner meta-labels — стиль архитектурного чертежа */}
            <div className="absolute top-3 left-3 font-ibm text-[10px] text-white/25 tracking-widest">
              ГЕНПЛАН · АО КСИ
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan" style={{ boxShadow: "0 0 4px #00d4ff" }}>
                <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
                <div style={{ animation: "blink 2s ease-in-out infinite" }} />
              </div>
              <span className="font-ibm text-[10px] text-ksi-cyan/40 tracking-widest">Активный актив</span>
            </div>
            <div className="absolute bottom-3 left-3 font-ibm text-[10px] text-white/18 tracking-widest">
              Кадастровый overlay · M 1:5000
            </div>
            <div className="absolute bottom-3 right-3 font-ibm text-[10px] text-white/18 tracking-widest">
              Московский регион
            </div>
          </div>
        </div>

        {/* ── Статистика ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
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
