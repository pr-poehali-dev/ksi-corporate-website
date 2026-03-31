import { useEffect, useRef } from "react";
import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";
import { ECOSYSTEM_NODES, CONNECTIONS } from "@/components/ksi/data";

function BigEcosystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    const getPos = (node: typeof ECOSYSTEM_NODES[0]) => ({
      x: (node.x / 100) * canvas.offsetWidth,
      y: (node.y / 100) * canvas.offsetHeight,
    });
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      CONNECTIONS.forEach(([fromId, toId], idx) => {
        const from = ECOSYSTEM_NODES.find(n => n.id === fromId)!;
        const to = ECOSYSTEM_NODES.find(n => n.id === toId)!;
        const fp = getPos(from); const tp = getPos(to);
        const g = ctx.createLinearGradient(fp.x, fp.y, tp.x, tp.y);
        g.addColorStop(0, "rgba(0,212,255,0.2)"); g.addColorStop(1, "rgba(123,47,255,0.2)");
        ctx.beginPath(); ctx.moveTo(fp.x, fp.y); ctx.lineTo(tp.x, tp.y);
        ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.stroke();
        const pr = ((time * 0.0004 + idx * 0.13) % 1);
        ctx.beginPath(); ctx.arc(fp.x + (tp.x - fp.x) * pr, fp.y + (tp.y - fp.y) * pr, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00d4ff"; ctx.shadowBlur = 10; ctx.shadowColor = "#00d4ff"; ctx.fill(); ctx.shadowBlur = 0;
      });
      ECOSYSTEM_NODES.forEach((node, ni) => {
        const pos = getPos(node);
        const pulse = Math.sin(time * 0.0018 + ni * 0.9) * 0.12 + 0.88;
        const r = (node.size / 2) * pulse;
        const glowGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r * 3);
        glowGrad.addColorStop(0, node.color + "30"); glowGrad.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(pos.x, pos.y, r * 3, 0, Math.PI * 2); ctx.fillStyle = glowGrad; ctx.fill();
        const rg = ctx.createRadialGradient(pos.x, pos.y, r * 0.4, pos.x, pos.y, r);
        rg.addColorStop(0, node.color + "40"); rg.addColorStop(1, node.color + "20");
        ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rg; ctx.strokeStyle = node.color + "80"; ctx.lineWidth = node.isPrimary ? 2 : 1; ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#ffffffee";
        ctx.font = `${node.isPrimary ? "600" : "400"} ${node.isPrimary ? "11px" : "9px"} 'IBM Plex Sans', sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(node.label, pos.x, pos.y);
      });
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

const CONNECTIONS_TEXT = [
  { from: "КриптоМетры", to: "LSS", desc: "Найденные участки становятся основой проектов" },
  { from: "КриптоМетры", to: "Лаборатория ИИ", desc: "ИИ-аналитика встроена в платформу" },
  { from: "КриптоМетры", to: "Fee-Dev", desc: "Операционная реализация проектов" },
  { from: "LSS", to: "Земельная аналитика", desc: "Данные питают поисковый сервис" },
  { from: "Лаборатория ИИ", to: "Все платформы", desc: "ИИ-инструменты — сквозной сервис" },
  { from: "Fee-Dev", to: "Управление", desc: "Реализованные объекты переходят в управление" },
  { from: "ИИ-продакшн", to: "Медиацентр", desc: "Медиаконтент усиливает позицию группы" },
  { from: "Лицензирование", to: "Внешние партнёры", desc: "Технологии выходят за пределы группы" },
];

export default function Ecosystem() {
  return (
    <PageLayout breadcrumb={[{ label: "Экосистема" }]}>
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5">◆ Архитектура экосистемы</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              АО КСИ — ядро,<br />
              <span className="text-gradient-cyan">а не набор проектов</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              Единая управляемая структура, в которой каждое направление усиливает остальные.
            </p>
          </div>
        </div>
      </section>

      {/* Визуал + список */}
      <section className="py-16 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative h-[500px] rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
              <div className="absolute top-4 left-4 font-mono-ibm text-ksi-cyan/40 text-xs tracking-widest pointer-events-none z-10">ECOSYSTEM MAP</div>
              <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
                <span className="font-mono-ibm text-ksi-cyan/40 text-xs">LIVE</span>
              </div>
              <BigEcosystemCanvas />
            </div>
            <div>
              <div className="section-label mb-5">◆ Состав экосистемы</div>
              <div className="space-y-0">
                {[
                  { node: "АО КСИ", role: "Головная структура группы", color: "cyan", isPrimary: true },
                  { node: "КриптоМетры", role: "Флагманская платформа девелопмента", color: "cyan" },
                  { node: "Лаборатория ИИ", role: "R&D и ИИ-инструменты", color: "purple" },
                  { node: "LSS", role: "Аналитический поиск земли", color: "purple" },
                  { node: "Земельная аналитика", role: "Data-продукты и базы данных", color: "cyan" },
                  { node: "ИИ-продакшн", role: "Цифровые медиапродукты", color: "cyan" },
                  { node: "Fee-Dev Оператор", role: "Операционная среда девелопера", color: "purple" },
                  { node: "Управление недвижимостью", role: "Постдевелоперский цикл", color: "cyan" },
                  { node: "Коллективные модели", role: "Структурирование участия", color: "purple" },
                  { node: "Лицензирование", role: "Передача технологий партнёрам", color: "cyan" },
                  { node: "Медиацентр", role: "Интеллектуальное лидерство", color: "purple" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-ksi-border/25">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                    <span className={`font-oswald text-sm font-medium w-44 flex-shrink-0 ${item.isPrimary ? "text-ksi-cyan" : "text-white/75"}`}>{item.node}</span>
                    <span className="font-ibm text-white/35 text-xs">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Связи */}
      <section className="py-16 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-4">◆ Как направления работают вместе</div>
          <h2 className="font-oswald text-3xl font-semibold text-white mb-10">Синергия внутри группы</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {CONNECTIONS_TEXT.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-sm card-ksi">
                <div className="flex items-center gap-2 flex-shrink-0 w-44">
                  <span className="font-ibm text-white/65 text-sm">{c.from}</span>
                </div>
                <Icon name="ArrowRight" size={14} className="text-ksi-cyan/40 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-ibm text-white/65 text-sm">{c.to}</span>
                  <p className="font-ibm text-white/30 text-xs mt-1">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Виртуальный девелопер */}
      <section className="py-16 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="section-label mb-5">◆ Модель работы</div>
              <h2 className="font-oswald text-4xl font-semibold text-white leading-tight mb-6">
                Виртуальный девелопер —<br />
                <span className="text-gradient-purple">это не метафора</span>
              </h2>
              <p className="font-ibm text-white/60 text-base leading-relaxed mb-5">
                Виртуальный девелопер — операционная модель, в которой девелоперский цикл реализуется через цифровую инфраструктуру, а не физическую организацию.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "X", label: "Без собственного строительного подразделения", desc: "Реализация через сеть профессиональных операторов" },
                  { icon: "X", label: "Без собственного земельного банка", desc: "Активы вовлекаются через партнёрские механизмы" },
                  { icon: "Check", label: "Со своими технологиями", desc: "ИИ-платформы и аналитические системы собственной разработки" },
                  { icon: "Check", label: "С управляемой экосистемой", desc: "Каждый проект — структурированная среда с чёткими ролями" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 ${item.icon === "Check" ? "" : ""}`} style={{ background: item.icon === "Check" ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${item.icon === "Check" ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.08)"}` }}>
                      <Icon name={item.icon === "Check" ? "Check" : "Minus"} size={12} style={{ color: item.icon === "Check" ? "#00d4ff" : "rgba(255,255,255,0.25)" }} />
                    </div>
                    <div>
                      <div className="font-ibm text-white/70 text-sm font-medium">{item.label}</div>
                      <div className="font-ibm text-white/35 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="section-label mb-2">◆ Классический vs. Виртуальный</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { col: "Классический девелопер", items: ["Собственная стройка", "Земельный банк", "Штат подрядчиков", "Централизованное финансирование", "Физическая организация"], type: "classic" },
                  { col: "Виртуальный девелопер (АО КСИ)", items: ["Цифровая инфраструктура", "Партнёрские активы", "Верифицированная сеть", "Структурированные модели", "Платформенная среда"], type: "virtual" },
                ].map((col, ci) => (
                  <div key={ci} className="card-ksi p-5 rounded-sm" style={{ borderColor: col.type === "virtual" ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.06)" }}>
                    <div className="font-oswald text-sm font-medium mb-4" style={{ color: col.type === "virtual" ? "#00d4ff" : "rgba(255,255,255,0.45)" }}>{col.col}</div>
                    <div className="space-y-2">
                      {col.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: col.type === "virtual" ? "#00d4ff" : "rgba(255,255,255,0.2)" }} />
                          <span className="font-ibm text-xs" style={{ color: col.type === "virtual" ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="font-oswald text-3xl text-white mb-3">Хотите стать частью экосистемы?</h3>
          <p className="font-ibm text-white/45 mb-8">Расскажите о вашей роли и задаче</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/partners" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">Ваша роль в экосистеме</a>
            <a href="/contacts" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">Написать нам</a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
