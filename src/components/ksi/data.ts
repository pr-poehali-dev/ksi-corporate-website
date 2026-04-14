export const NAV_ITEMS = [
  { label: "О компании", href: "/about" },
  { label: "Проект КриптоМетры", href: "/cryptometry" },
  { label: "Внутренние службы", href: "/directions" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Глоссарий", href: "/glossary" },
  { label: "Контакты", href: "/contacts" },
];

export const DIRECTIONS = [
  {
    id: "ai-lab",
    icon: "BrainCircuit",
    title: "Лаборатория ИИ",
    subtitle: "AI Lab · PropTech Intelligence",
    desc: "Технологическое ядро компании. Отвечает за интеллектуальную инфраструктуру, настройку, обучение и развитие системы КриптоМетры.",
    color: "purple",
    stat: "Технологическое ядро",
    tags: ["ИИ-инфраструктура", "Обучение системы", "Аналитика"],
  },
  {
    id: "fee-dev",
    icon: "TrendingUp",
    title: "Центр реализации активов",
    subtitle: "Fee-Development · Asset Operator",
    desc: "Внутренний контур сопровождения и реализации активов в логике проекта.",
    color: "cyan",
    stat: "Операторский контур",
    tags: ["Упаковка активов", "Структурирование", "Реализация"],
  },
  {
    id: "lss",
    icon: "Search",
    title: "Служба земельного поиска",
    subtitle: "Land Search Service · Analytics",
    desc: "Контур, отвечающий за поиск участков, анализ площадок и работу с земельно-имущественными задачами.",
    color: "purple",
    stat: "Земельный контур",
    tags: ["Поиск участков", "Анализ площадок", "Земельная аналитика"],
  },
  {
    id: "ai-production",
    icon: "Palette",
    title: "Студия проектного креатива",
    subtitle: "Creative Studio · Visual & Concept",
    desc: "Контур визуальной, концептуальной и презентационной упаковки решений, идей и материалов.",
    color: "cyan",
    stat: "Креативный контур",
    tags: ["Презентации", "Визуальная упаковка", "Концепции"],
  },
];

export const PROJECTS = [
  {
    tag: "КЛЮЧЕВОЙ ПРОЕКТ",
    icon: "Hexagon",
    name: "КриптоМетры",
    type: "Интеллектуальная система распределённого девелопмента",
    desc: "Ключевой проект АО КСИ, в рамках которого создаётся система нового типа: единая интеллектуальная среда для решения задач девелопмента, недвижимости и земельно-имущественного контура.",
    features: [
      { icon: "Layers", text: "Единая интеллектуальная система" },
      { icon: "GitBranch", text: "Распределённая логика девелопмента" },
      { icon: "BrainCircuit", text: "Гибридная модель ИИ и операторов" },
      { icon: "Users", text: "Внутренние службы АО КСИ" },
      { icon: "Target", text: "Решение реальных девелоперских задач" },
    ],
    status: "Развитие",
    color: "cyan",
  },
];

export const STATS = [
  { value: "₽2.4", suffix: " млрд", label: "Объём сделок под управлением" },
  { value: "150+", suffix: "", label: "Регионов в базе аналитики" },
  { value: "40+", suffix: "", label: "Партнёров экосистемы" },
  { value: "3", suffix: " платформы", label: "Цифровых продукта в экосистеме" },
];

export const ECOSYSTEM_NODES = [
  { id: "ksi", label: "АО КСИ", x: 50, y: 50, size: 60, color: "#00d4ff", isPrimary: true },
  { id: "km", label: "КриптоМетры", x: 50, y: 16, size: 44, color: "#00d4ff", isPrimary: false },
  { id: "analytics", label: "KSI Analytics", x: 79, y: 34, size: 36, color: "#7b2fff", isPrimary: false },
  { id: "devhub", label: "DevHub", x: 79, y: 66, size: 36, color: "#7b2fff", isPrimary: false },
  { id: "ai", label: "AI Engine", x: 50, y: 84, size: 32, color: "#00d4ff", isPrimary: false },
  { id: "blockchain", label: "Blockchain", x: 21, y: 66, size: 32, color: "#7b2fff", isPrimary: false },
  { id: "production", label: "Production", x: 21, y: 34, size: 32, color: "#00aaff", isPrimary: false },
];

export const CONNECTIONS = [
  ["ksi", "km"], ["ksi", "analytics"], ["ksi", "devhub"],
  ["ksi", "ai"], ["ksi", "blockchain"], ["ksi", "production"],
  ["km", "analytics"], ["km", "blockchain"], ["analytics", "ai"],
  ["devhub", "ai"], ["blockchain", "production"],
];