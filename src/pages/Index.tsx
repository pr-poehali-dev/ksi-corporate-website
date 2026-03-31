import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "О компании", href: "#about" },
  { label: "Направления", href: "#directions" },
  { label: "Экосистема", href: "#ecosystem" },
  { label: "Проекты", href: "#projects" },
  { label: "Инвесторам", href: "#investors" },
  { label: "Партнёрам", href: "#partners" },
  { label: "Контакты", href: "#contacts" },
];

const DIRECTIONS = [
  {
    id: "cryptometry",
    icon: "Hexagon",
    title: "КриптоМетры",
    subtitle: "Flagship · Distributed Development",
    desc: "Флагманская система распределённого девелопмента и цифровой архитектуры участия в недвижимости. Объединяет землевладельцев, девелоперов и участников в единой среде.",
    color: "cyan",
    stat: "Флагман",
    tags: ["Распределённый девелопмент", "Цифровое участие", "Платформа"],
  },
  {
    id: "ai-lab",
    icon: "BrainCircuit",
    title: "Лаборатория ИИ",
    subtitle: "AI Lab · PropTech Intelligence",
    desc: "Разработка специализированных ИИ-решений для недвижимости, земельного рынка, девелопмента, аналитики, управления и цифровых интерфейсов.",
    color: "purple",
    stat: "AI R&D",
    tags: ["Земельный рынок", "Аналитика", "Цифровые интерфейсы"],
  },
  {
    id: "ai-production",
    icon: "Clapperboard",
    title: "ИИ-продакшн",
    subtitle: "AI Production · Digital Media",
    desc: "Создание ИИ-аватаров, корпоративных цифровых персонажей, видеопрезентаций, медийных оболочек и объясняющих визуальных коммуникаций для бизнеса.",
    color: "cyan",
    stat: "AI Media",
    tags: ["ИИ-аватары", "Видеопрезентации", "Digital Brand"],
  },
  {
    id: "invest-models",
    icon: "Network",
    title: "Коллективные инвестиционные модели",
    subtitle: "Collective Models · Structured Participation",
    desc: "Проектирование юридически корректных моделей коллективного участия в проектах недвижимости и инфраструктуры. Акцент — на структуре, логике и архитектуре, а не на привлечении средств.",
    color: "purple",
    stat: "Структуры",
    tags: ["Инвестиционная логика", "Юридические модели", "Архитектура участия"],
  },
  {
    id: "property-mgmt",
    icon: "Building2",
    title: "Управление недвижимостью",
    subtitle: "Property Management · Digital Ops",
    desc: "Цифровое и операционное управление объектами: эксплуатация, постдевелоперское сопровождение, сервисные и доходные процессы на базе цифровых инструментов.",
    color: "cyan",
    stat: "Операции",
    tags: ["Эксплуатация", "Постдевелопмент", "Доходные объекты"],
  },
  {
    id: "lss",
    icon: "Search",
    title: "Служба земельного поиска LSS",
    subtitle: "Land Search Service · Analytics",
    desc: "Аналитический поиск, фильтрация и предварительная структуризация земельных активов для девелопмента, инвестиций и редевелопмента.",
    color: "purple",
    stat: "LSS",
    tags: ["Поиск участков", "Фильтрация активов", "Редевелопмент"],
  },
  {
    id: "land-data",
    icon: "DatabaseZap",
    title: "Земельная аналитика & Data",
    subtitle: "Land Intelligence · Data Products",
    desc: "Базы данных, цифровые досье, картографические решения, аналитические панели и data-продукты для работы с земельными и девелоперскими активами.",
    color: "cyan",
    stat: "Data",
    tags: ["Базы данных", "Картография", "Аналитические панели"],
  },
  {
    id: "fee-dev",
    icon: "Settings2",
    title: "Девелоперский оператор",
    subtitle: "Fee-Development Platform · Operator",
    desc: "АО КСИ как оператор среды для профессиональных девелоперов: упаковка активов, структурирование проектов, логика реализации и интеграция исполнителей.",
    color: "purple",
    stat: "Fee-Dev",
    tags: ["Упаковка активов", "Структурирование", "Исполнители"],
  },
  {
    id: "licensing",
    icon: "PackageCheck",
    title: "Лицензирование технологий",
    subtitle: "Tech Licensing · Digital Solutions",
    desc: "Передача внешним партнёрам разработанных ИИ-сервисов, аналитических интерфейсов, медийных и цифровых решений по лицензионным моделям.",
    color: "cyan",
    stat: "Лицензии",
    tags: ["ИИ-сервисы", "White-label", "API & SaaS"],
  },
  {
    id: "media",
    icon: "Newspaper",
    title: "Медиа & Аналитический центр",
    subtitle: "Media Hub · Research & Insights",
    desc: "Публикации, исследования, рыночные обзоры, аналитические позиции и интеллектуальное сопровождение отрасли недвижимости и девелопмента.",
    color: "purple",
    stat: "Медиа",
    tags: ["Исследования", "Рыночная аналитика", "Контент"],
  },
  {
    id: "consulting",
    icon: "Compass",
    title: "Стратегический консалтинг",
    subtitle: "Advisory · Strategic Development",
    desc: "Экспертное сопровождение девелоперских и инвестиционных проектов: стратегия выхода на рынок, позиционирование активов, цифровая трансформация бизнеса.",
    color: "cyan",
    stat: "Advisory",
    tags: ["Стратегия", "Трансформация", "Экспертиза"],
  },
  {
    id: "edu",
    icon: "GraduationCap",
    title: "Образовательная платформа",
    subtitle: "Education · PropTech Academy",
    desc: "Программы, курсы и профессиональная среда для участников рынка недвижимости: от введения в цифровой девелопмент до продвинутых ИИ-инструментов.",
    color: "purple",
    stat: "Обучение",
    tags: ["Курсы", "Профессиональная среда", "PropTech Academy"],
  },
];

const PROJECTS = [
  {
    tag: "ФЛАГМАН",
    name: "КриптоМетры",
    type: "Платформа коллективного инвестирования",
    desc: "Первая в России платформа виртуального девелопмента. Объединяет землевладельцев, девелоперов и инвесторов в единую экосистему через механизм токенизации недвижимости.",
    features: ["Токенизация объектов", "Коллективное участие", "AI-аналитика рынка", "Прозрачный аудит"],
    status: "Активна",
    color: "cyan",
  },
  {
    tag: "ИНФРАСТРУКТУРА",
    name: "KSI Analytics",
    type: "Аналитическая платформа",
    desc: "Интеллектуальная система мониторинга и прогнозирования рынка недвижимости. Обрабатывает данные по 150+ регионам в режиме реального времени.",
    features: ["Рыночные прогнозы", "Тепловые карты", "Risk-scoring", "API для партнёров"],
    status: "Beta",
    color: "purple",
  },
  {
    tag: "СЕРВИС",
    name: "DevHub",
    type: "B2B платформа для девелоперов",
    desc: "Цифровой хаб для девелоперских компаний: управление проектами, взаимодействие с подрядчиками, документооборот и финансовый контроль.",
    features: ["Проектный менеджмент", "Электронный документооборот", "Финансовый контроль", "Маркетплейс услуг"],
    status: "Разработка",
    color: "cyan",
  },
];

const STATS = [
  { value: "₽2.4", suffix: " млрд", label: "Объём сделок под управлением" },
  { value: "150+", suffix: "", label: "Регионов в базе аналитики" },
  { value: "40+", suffix: "", label: "Партнёров экосистемы" },
  { value: "3", suffix: " платформы", label: "Цифровых продукта в экосистеме" },
];

const ECOSYSTEM_NODES = [
  { id: "ksi", label: "АО КСИ", x: 50, y: 50, size: 60, color: "#00d4ff", isPrimary: true },
  { id: "km", label: "КриптоМетры", x: 50, y: 16, size: 44, color: "#00d4ff", isPrimary: false },
  { id: "analytics", label: "KSI Analytics", x: 79, y: 34, size: 36, color: "#7b2fff", isPrimary: false },
  { id: "devhub", label: "DevHub", x: 79, y: 66, size: 36, color: "#7b2fff", isPrimary: false },
  { id: "ai", label: "AI Engine", x: 50, y: 84, size: 32, color: "#00d4ff", isPrimary: false },
  { id: "blockchain", label: "Blockchain", x: 21, y: 66, size: 32, color: "#7b2fff", isPrimary: false },
  { id: "production", label: "Production", x: 21, y: 34, size: 32, color: "#00aaff", isPrimary: false },
];

const CONNECTIONS = [
  ["ksi", "km"], ["ksi", "analytics"], ["ksi", "devhub"],
  ["ksi", "ai"], ["ksi", "blockchain"], ["ksi", "production"],
  ["km", "analytics"], ["km", "blockchain"], ["analytics", "ai"],
  ["devhub", "ai"], ["blockchain", "production"],
];

function EcosystemCanvas() {
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

function NavBar() {
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
          <div className="relative w-8 h-8 flex-shrink-0">
            <div className="absolute inset-0 border border-ksi-cyan/60 rotate-45" />
            <div className="absolute inset-1 border border-ksi-purple/60 rotate-12" />
            <div className="absolute inset-2 bg-ksi-cyan/20 rotate-45" />
          </div>
          <div>
            <div className="font-oswald font-semibold text-white text-sm tracking-widest uppercase">АО КСИ</div>
            <div className="font-mono-ibm text-ksi-cyan text-[9px] tracking-widest opacity-60">КриптоСтройИнвест</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
        </div>

        <a href="#contacts" className="hidden lg:block btn-primary-ksi px-5 py-2 text-sm rounded-sm cursor-pointer">
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
          <a href="#contacts" className="block btn-primary-ksi px-5 py-2 text-sm rounded-sm text-center mt-4" onClick={() => setMobileOpen(false)}>
            Связаться
          </a>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
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
            <div className="section-label mb-6 fade-in-up stagger-1">◆ Головная платформа экосистемы</div>
            <h1 className="font-oswald font-bold text-5xl md:text-6xl xl:text-7xl leading-none mb-2 fade-in-up stagger-2">
              <span className="text-white glitch-text" data-text="КРИПТО">КРИПТО</span>
            </h1>
            <h1 className="font-oswald font-bold text-5xl md:text-6xl xl:text-7xl leading-none mb-6 fade-in-up stagger-3">
              <span className="text-gradient-main">СТРОЙ</span>
              <span className="text-white"> ИНВЕСТ</span>
            </h1>
            <p className="font-ibm text-white/50 text-sm tracking-widest uppercase mb-8 fade-in-up stagger-3">
              АО КСИ &nbsp;·&nbsp; Виртуальный девелопер &nbsp;·&nbsp; Цифровая экосистема
            </p>
            <p className="font-ibm text-white/70 text-lg leading-relaxed mb-10 max-w-lg fade-in-up stagger-4">
              Первый виртуальный девелопер в России. Технологическая платформа, объединяющая
              недвижимость, искусственный интеллект, блокчейн и коллективное инвестирование
              в единую цифровую экосистему.
            </p>

            <div className="flex flex-wrap gap-4 fade-in-up stagger-5">
              <a href="#ecosystem" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">
                Изучить экосистему
              </a>
              <a href="#investors" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">
                Инвесторам
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 fade-in-up stagger-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ksi-cyan pulse-dot" />
                <span className="font-mono-ibm text-xs text-white/40">Платформа активна</span>
              </div>
              <div className="w-px h-4 bg-ksi-border" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ksi-purple pulse-dot" style={{ animationDelay: "0.5s" }} />
                <span className="font-mono-ibm text-xs text-white/40">3 продукта в разработке</span>
              </div>
            </div>
          </div>

          <div className="relative h-[450px] lg:h-[560px]">
            <div className="absolute inset-0 rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
              <div className="absolute inset-0 shimmer pointer-events-none" />
              <EcosystemCanvas />
            </div>
            <div className="absolute -top-3 -right-1 font-mono-ibm text-ksi-cyan/25 text-xs tracking-widest">
              ECOSYSTEM MAP v1.0
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

function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,212,255,0.3) 39px, rgba(0,212,255,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,212,255,0.3) 39px, rgba(0,212,255,0.3) 40px)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="section-label mb-6">◆ О компании</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-8">
              Виртуальный девелопер —<br />
              <span className="text-gradient-cyan">новая парадигма</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-6">
              АО «КриптоСтройИнвест» — головная структура экосистемы, объединяющей
              недвижимость, технологии и капитал. Мы не строим физически — мы создаём
              цифровую инфраструктуру, которая меняет правила игры в девелопменте.
            </p>
            <p className="font-ibm text-white/50 text-base leading-relaxed mb-10">
              Наша модель позволяет землевладельцам, девелоперам и инвесторам взаимодействовать
              через цифровые платформы, минуя традиционные барьеры входа. АО КСИ выступает
              технологической и стратегической надстройкой, обеспечивающей работу всей экосистемы.
            </p>

            <div className="space-y-4">
              {[
                { icon: "Layers", text: "Головная платформа мультинаправленной экосистемы" },
                { icon: "Globe", text: "Оператор цифровой девелоперской инфраструктуры" },
                { icon: "Zap", text: "Интеллектуальный центр: недвижимость + ИИ + блокчейн" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}>
                    <Icon name={item.icon} size={18} className="text-ksi-cyan" />
                  </div>
                  <p className="font-ibm text-white/70 text-sm leading-relaxed pt-2.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Год основания", value: "2023", color: "cyan" },
                { label: "Форма", value: "АО", color: "purple" },
                { label: "Направлений", value: "6+", color: "cyan" },
                { label: "Регионов охвата", value: "150+", color: "purple" },
              ].map((item, i) => (
                <div key={i} className="card-ksi p-6 rounded-sm text-center" style={{ borderColor: item.color === "cyan" ? "rgba(0,212,255,0.15)" : "rgba(123,47,255,0.15)" }}>
                  <div className={`font-oswald text-3xl font-bold mb-2 ${item.color === "cyan" ? "text-gradient-cyan" : "text-gradient-purple"}`}>
                    {item.value}
                  </div>
                  <div className="font-ibm text-white/40 text-xs tracking-wide uppercase">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 card-ksi p-6 rounded-sm" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
              <div className="font-mono-ibm text-ksi-cyan/60 text-xs mb-3 tracking-widest">МИССИЯ</div>
              <p className="font-ibm text-white/65 text-sm leading-relaxed italic">
                "Сделать участие в девелопменте доступным для каждого через технологии,
                прозрачность и цифровую инфраструктуру нового поколения."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectionCard({ dir, i, featured = false }: { dir: typeof DIRECTIONS[0]; i: number; featured?: boolean }) {
  const isCyan = dir.color === "cyan";
  const accentColor = isCyan ? "#00d4ff" : "#7b2fff";
  const bgAccent = isCyan ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)";
  const borderAccent = isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)";

  return (
    <div
      className={`card-ksi rounded-sm group cursor-pointer flex flex-col ${featured ? "p-8 row-span-1" : "p-6"}`}
      style={featured ? { borderColor: "rgba(0,212,255,0.3)", boxShadow: "0 0 40px rgba(0,212,255,0.07), 0 8px 32px rgba(0,0,0,0.4)" } : {}}
    >
      {featured && (
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
          <span className="font-mono-ibm text-ksi-cyan text-xs tracking-widest">ФЛАГМАНСКОЕ НАПРАВЛЕНИЕ</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div
          className={`flex items-center justify-center rounded-sm flex-shrink-0 ${featured ? "w-14 h-14" : "w-11 h-11"}`}
          style={{ background: bgAccent, border: `1px solid ${borderAccent}` }}
        >
          <Icon name={dir.icon} size={featured ? 26 : 20} style={{ color: accentColor }} />
        </div>
        <span
          className="font-mono-ibm text-xs px-2 py-1 rounded-sm tracking-wider"
          style={{ background: bgAccent, color: accentColor, border: `1px solid ${borderAccent}` }}
        >
          {dir.stat}
        </span>
      </div>

      <div className="font-mono-ibm text-white/25 text-[10px] tracking-widest mb-1.5 uppercase">{dir.subtitle}</div>
      <h3 className={`font-oswald font-medium text-white leading-tight mb-3 group-hover:text-ksi-cyan transition-colors ${featured ? "text-2xl" : "text-lg"}`}>
        {dir.title}
      </h3>
      <p className={`font-ibm text-white/50 leading-relaxed flex-1 ${featured ? "text-base" : "text-sm"}`}>{dir.desc}</p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {dir.tags.map((tag) => (
          <span
            key={tag}
            className="font-ibm text-[10px] px-2 py-0.5 rounded-sm"
            style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-transparent group-hover:text-ksi-cyan/60 transition-all">
        <span className="font-mono-ibm text-xs tracking-widest">ПОДРОБНЕЕ</span>
        <Icon name="ArrowRight" size={13} />
      </div>
    </div>
  );
}

function DirectionsSection() {
  return (
    <section id="directions" className="py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-label mb-4">◆ Направления деятельности</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
            12 направлений <span className="text-gradient-purple">экосистемы</span>
          </h2>
          <p className="font-ibm text-white/50 text-lg mt-4 max-w-2xl mx-auto">
            Каждое направление — самостоятельная компетенция. Вместе они образуют полный цикл цифрового девелопмента
          </p>
        </div>

        {/* Флагман — широкая карточка на всю ширину */}
        <div className="mb-5">
          <DirectionCard dir={DIRECTIONS[0]} i={0} featured={true} />
        </div>

        {/* Основной блок 2×2 + правая колонка из 2 */}
        <div className="grid lg:grid-cols-3 gap-5 mb-5">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {DIRECTIONS.slice(1, 5).map((dir, i) => (
              <DirectionCard key={dir.id} dir={dir} i={i + 1} />
            ))}
          </div>
          <div className="grid gap-5">
            {DIRECTIONS.slice(5, 7).map((dir, i) => (
              <DirectionCard key={dir.id} dir={dir} i={i + 5} />
            ))}
          </div>
        </div>

        {/* Нижний ряд — 5 карточек */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {DIRECTIONS.slice(7).map((dir, i) => (
            <DirectionCard key={dir.id} dir={dir} i={i + 7} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(123,47,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="section-label mb-6">◆ Карта экосистемы</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Единая цифровая <br />
              <span className="text-gradient-purple">инфраструктура</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-8">
              АО КСИ — ядро экосистемы. Вокруг него выстроены взаимосвязанные платформы,
              сервисы и технологические компоненты, создающие синергетический эффект.
            </p>

            <div className="space-y-0 mb-10">
              {[
                { node: "КриптоМетры", role: "Флагманская система распределённого девелопмента", color: "cyan" },
                { node: "Лаборатория ИИ", role: "ИИ-решения для недвижимости и девелопмента", color: "purple" },
                { node: "ИИ-продакшн", role: "Цифровые аватары, медиа и визуальные коммуникации", color: "cyan" },
                { node: "LSS", role: "Служба аналитического поиска земельных активов", color: "purple" },
                { node: "Земельная аналитика", role: "Data-продукты и картографические решения", color: "cyan" },
                { node: "Fee-Dev Оператор", role: "Среда для профессиональных девелоперов", color: "purple" },
                { node: "Медиа & Аналитика", role: "Исследования и интеллектуальное сопровождение", color: "cyan" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-ksi-border/30">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                  <span className="font-oswald text-white/75 text-sm font-medium w-40 flex-shrink-0">{item.node}</span>
                  <span className="font-ibm text-white/35 text-xs">{item.role}</span>
                </div>
              ))}
            </div>

            <a href="#contacts" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
              Стать частью экосистемы
            </a>
          </div>

          <div className="relative h-[500px] rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-purple/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-ksi-dark/30 pointer-events-none" />
            <EcosystemCanvas />
            <div className="absolute top-4 left-4 font-mono-ibm text-ksi-cyan/40 text-xs tracking-widest pointer-events-none">LIVE MAP</div>
            <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
              <span className="font-mono-ibm text-ksi-cyan/40 text-xs">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-label mb-4">◆ Проекты</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
            Цифровые продукты <span className="text-gradient-cyan">экосистемы</span>
          </h2>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          {PROJECTS.map((p, i) => (
            <button key={i} onClick={() => setActiveProject(i)} className={`font-oswald text-sm px-5 py-2.5 rounded-sm tracking-widest uppercase transition-all ${activeProject === i ? "bg-ksi-cyan text-ksi-dark" : "border border-ksi-border text-white/40 hover:text-white hover:border-white/20"}`}>
              {p.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div key={i} className={`card-ksi p-7 rounded-sm cursor-pointer transition-all duration-300 ${activeProject === i ? project.color === "cyan" ? "border-glow-cyan" : "border-glow-purple" : ""}`} onClick={() => setActiveProject(i)}>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono-ibm text-xs px-2.5 py-1 rounded-sm tracking-widest" style={{ background: project.color === "cyan" ? "rgba(0,212,255,0.1)" : "rgba(123,47,255,0.1)", color: project.color === "cyan" ? "#00d4ff" : "#7b2fff", border: `1px solid ${project.color === "cyan" ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)"}` }}>
                  {project.tag}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: project.status === "Активна" ? "#00d4ff" : project.status === "Beta" ? "#7b2fff" : "rgba(255,255,255,0.2)" }} />
                  <span className="font-mono-ibm text-xs text-white/30">{project.status}</span>
                </div>
              </div>

              <h3 className="font-oswald font-semibold text-white text-2xl mb-1">{project.name}</h3>
              <div className="font-ibm text-white/30 text-xs tracking-wide uppercase mb-4">{project.type}</div>
              <p className="font-ibm text-white/55 text-sm leading-relaxed mb-6">{project.desc}</p>

              <div className="space-y-2">
                {project.features.map((feat, fi) => (
                  <div key={fi} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                    <span className="font-ibm text-white/40 text-xs">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`mt-6 w-full py-2.5 rounded-sm font-oswald text-sm tracking-widest uppercase transition-all ${activeProject === i ? "btn-primary-ksi" : "border border-ksi-border text-white/30 hover:border-white/20 hover:text-white/50"}`}>
                Узнать подробнее
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InvestorsSection() {
  return (
    <section id="investors" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.02) 0%, rgba(123,47,255,0.02) 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="section-label mb-6">◆ Инвесторам</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Инвестиции <br />в <span className="text-gradient-cyan">будущее</span> девелопмента
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-10">
              АО КСИ открывает новые возможности для институциональных и частных инвесторов.
              Прозрачная структура, цифровые инструменты контроля и диверсифицированный
              портфель направлений снижают риски и обеспечивают устойчивый рост.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: "Shield", title: "Прозрачность", desc: "Блокчейн-аудит всех транзакций и решений" },
                { icon: "PieChart", title: "Диверсификация", desc: "6+ направлений в едином портфеле" },
                { icon: "Cpu", title: "Технологии", desc: "ИИ-аналитика для принятия решений" },
                { icon: "Users", title: "Команда", desc: "Опыт в девелопменте и IT от 10 лет" },
              ].map((item, i) => (
                <div key={i} className="card-ksi p-5 rounded-sm">
                  <Icon name={item.icon} size={20} className="text-ksi-cyan mb-3" />
                  <div className="font-oswald text-white text-base font-medium mb-1">{item.title}</div>
                  <div className="font-ibm text-white/40 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            <a href="#contacts" className="btn-primary-ksi px-8 py-3.5 rounded-sm text-sm inline-block cursor-pointer">
              Запросить инвестиционный меморандум
            </a>
          </div>

          <div className="space-y-4">
            {[
              { title: "Стратегическое участие", desc: "Вхождение в капитал головной структуры АО КСИ. Доступ к управлению и стратегическим решениям экосистемы.", badge: "M&A" },
              { title: "Портфельные инвестиции", desc: "Участие в финансировании отдельных проектов экосистемы с фиксированной доходностью и временным горизонтом.", badge: "PE" },
              { title: "Токенизированные активы", desc: "Покупка цифровых прав на объекты недвижимости через платформу КриптоМетры. Порог входа — от 50 000 ₽.", badge: "RWA" },
              { title: "Технологическое партнёрство", desc: "Совместное развитие продуктов с разделением доходов и интеллектуальной собственности.", badge: "Tech" },
            ].map((item, i) => (
              <div key={i} className="card-ksi p-6 rounded-sm group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-oswald text-white font-medium text-lg group-hover:text-ksi-cyan transition-colors">{item.title}</h3>
                  <span className="font-mono-ibm text-xs px-2 py-1 rounded-sm bg-ksi-border text-white/40 flex-shrink-0 ml-3">{item.badge}</span>
                </div>
                <p className="font-ibm text-white/50 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-transparent group-hover:text-ksi-cyan/60 transition-all">
                  <span className="font-mono-ibm text-xs tracking-widest">ПОДРОБНЕЕ</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section id="partners" className="py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-label mb-4">◆ Партнёрам</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
            Войдите в <span className="text-gradient-purple">экосистему</span>
          </h2>
          <p className="font-ibm text-white/50 text-lg mt-4 max-w-2xl mx-auto">
            Мы ищем компетентных партнёров для совместного развития рынка цифрового девелопмента
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            { icon: "MapPin", title: "Землевладельцы", desc: "Монетизируйте земельные активы через цифровую девелоперскую платформу без капитальных вложений", color: "cyan" },
            { icon: "Building", title: "Девелоперы", desc: "Получите доступ к цифровым инструментам, аналитике и инвестиционному капиталу через экосистему КСИ", color: "purple" },
            { icon: "Code2", title: "Технологические партнёры", desc: "Интегрируйте свои продукты в экосистему и получите доступ к растущей базе клиентов в сфере недвижимости", color: "cyan" },
            { icon: "Briefcase", title: "Финансовые институты", desc: "Создавайте совместные инвестиционные продукты на базе токенизированных активов недвижимости", color: "purple" },
          ].map((item, i) => (
            <div key={i} className="card-ksi p-6 rounded-sm text-center group cursor-pointer">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: item.color === "cyan" ? "rgba(0,212,255,0.08)" : "rgba(123,47,255,0.08)", border: `1px solid ${item.color === "cyan" ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)"}` }}>
                <Icon name={item.icon} size={24} className={item.color === "cyan" ? "text-ksi-cyan" : "text-ksi-purple"} />
              </div>
              <h3 className="font-oswald text-white font-medium text-lg mb-3 group-hover:text-ksi-cyan transition-colors">{item.title}</h3>
              <p className="font-ibm text-white/45 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center p-10 rounded-sm relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(123,47,255,0.04) 100%)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/30 to-transparent pointer-events-none" />
          <h3 className="font-oswald text-white text-2xl font-semibold mb-3">Готовы к диалогу?</h3>
          <p className="font-ibm text-white/50 text-base mb-8 max-w-xl mx-auto">
            Оставьте заявку — мы свяжемся в течение 24 часов и обсудим формат партнёрства
          </p>
          <a href="#contacts" className="btn-primary-ksi px-10 py-3.5 rounded-sm text-sm inline-block cursor-pointer">
            Предложить партнёрство
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "", type: "" });

  return (
    <section id="contacts" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-border to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="section-label mb-6">◆ Контакты</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Начнём <br /><span className="text-gradient-main">разговор</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-10">
              АО КСИ открыто к диалогу с девелоперами, инвесторами, технологическими
              партнёрами и землевладельцами. Напишите нам — мы ответим быстро.
            </p>

            <div className="space-y-6">
              {[
                { icon: "Mail", label: "Email", value: "info@ksi.ru" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "MapPin", label: "Адрес", value: "Москва, Россия" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 9:00–18:00 МСК" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    <Icon name={item.icon} size={16} className="text-ksi-cyan" />
                  </div>
                  <div>
                    <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-0.5">{item.label}</div>
                    <div className="font-ibm text-white/70 text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-ksi p-8 rounded-sm" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
            <div className="font-mono-ibm text-ksi-cyan/50 text-xs tracking-widest mb-6">ФОРМА ОБРАТНОЙ СВЯЗИ</div>

            <div className="space-y-4">
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ИМЯ *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ОРГАНИЗАЦИЯ</label>
                <input type="text" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} placeholder="Название компании" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">EMAIL *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ТИП ЗАПРОСА</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/60 text-sm focus:outline-none focus:border-ksi-cyan/40 transition-colors">
                  <option value="" className="bg-ksi-dark">Выберите тип</option>
                  <option value="invest" className="bg-ksi-dark">Инвестиции</option>
                  <option value="partner" className="bg-ksi-dark">Партнёрство</option>
                  <option value="developer" className="bg-ksi-dark">Для девелоперов</option>
                  <option value="land" className="bg-ksi-dark">Земельный участок</option>
                  <option value="other" className="bg-ksi-dark">Другое</option>
                </select>
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">СООБЩЕНИЕ</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Опишите ваш запрос..." rows={4} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors resize-none" />
              </div>

              <button className="btn-primary-ksi w-full py-4 rounded-sm text-sm mt-2 cursor-pointer">
                Отправить запрос
              </button>

              <p className="font-ibm text-white/25 text-xs text-center">
                Мы не передаём ваши данные третьим лицам
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ksi-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-7 h-7 flex-shrink-0">
                <div className="absolute inset-0 border border-ksi-cyan/60 rotate-45" />
                <div className="absolute inset-1 border border-ksi-purple/60 rotate-12" />
                <div className="absolute inset-2 bg-ksi-cyan/20 rotate-45" />
              </div>
              <span className="font-oswald font-semibold text-white tracking-widest uppercase text-sm">АО КриптоСтройИнвест</span>
            </div>
            <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-xs">
              Виртуальный девелопер. Цифровая экосистема для рынка недвижимости нового поколения.
            </p>
          </div>

          <div>
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">НАВИГАЦИЯ</div>
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="block font-ibm text-white/40 text-sm hover:text-white/70 transition-colors">{item.label}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">ПРОДУКТЫ</div>
            <div className="space-y-2">
              {["КриптоМетры", "KSI Analytics", "DevHub"].map((p) => (
                <div key={p} className="font-ibm text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">{p}</div>
              ))}
            </div>
            <div className="mt-6">
              <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-2">РЕКВИЗИТЫ</div>
              <div className="font-ibm text-white/25 text-xs leading-relaxed">
                ОГРН: 0000000000000<br />
                ИНН: 0000000000
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ksi-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-ibm text-white/25 text-xs">© 2024 АО «КриптоСтройИнвест». Все права защищены.</div>
          <div className="flex items-center gap-6">
            {["Политика конфиденциальности", "Пользовательское соглашение", "Реквизиты"].map((link) => (
              <span key={link} className="font-ibm text-white/25 text-xs hover:text-white/50 cursor-pointer transition-colors">{link}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <DirectionsSection />
      <EcosystemSection />
      <ProjectsSection />
      <InvestorsSection />
      <PartnersSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}