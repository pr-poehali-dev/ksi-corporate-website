import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export function DevelopersSection() {
  return (
    <section className="py-24 border-t border-white/6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 bottom-0 w-[600px] h-[600px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #7b2fff 0%, transparent 65%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Метка */}
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-purple-500/25 bg-purple-500/[0.04] rounded-sm">
          <Icon name="Building2" size={13} className="text-purple-400/70" />
          <span className="font-ibm text-purple-400/70 text-xs tracking-[0.15em] uppercase">Для действующих девелоперов</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Участок куплен.<br />Бридж давит.<br />
              <span style={{ color: "#a78bfa" }}>Система может помочь.</span>
            </h2>

            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-6">
              Если проект находится под давлением бридж-кредита или классической долговой модели —
              АО КСИ открывает отдельный контур для переупаковки актива.
            </p>
            <p className="font-ibm text-white/35 text-base leading-relaxed mb-8">
              Это не рефинансирование и не антикризисное агентство. Это движение от модели
              «земля на балансе + долг + давление сроков» к более гибкому проектному контуру —
              в направлении логики Fee Development.
            </p>

            <div className="space-y-3 mb-10">
              {[
                {
                  icon: "RefreshCw",
                  title: "Переупаковка актива",
                  desc: "Актив вводится в контур системы КриптоМетры. Появляются новые сценарии реализации.",
                },
                {
                  icon: "TrendingDown",
                  title: "Снижение долговой нагрузки",
                  desc: "Партнёрские механики позволяют сдвинуться с точки «только кредит».",
                },
                {
                  icon: "ArrowUpRight",
                  title: "Движение к Fee Development",
                  desc: "Поэтапный переход к модели, где девелопер управляет проектом без полного риска на балансе.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 border border-white/8 bg-white/[0.02] rounded-sm">
                  <Icon name={item.icon as "RefreshCw"} size={18} className="text-purple-400/55 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-oswald text-white font-medium mb-0.5">{item.title}</div>
                    <div className="font-ibm text-white/38 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/contacts" className="inline-flex items-center gap-2 border border-purple-500/30 hover:border-purple-400/50 text-purple-400/70 hover:text-purple-300 transition-all px-8 py-3.5 text-sm font-ibm rounded-sm">
              Обсудить контур
              <Icon name="ArrowRight" size={14} />
            </Link>
          </div>

          {/* Правая — сравнение двух сценариев */}
          <div className="space-y-4">
            <div className="p-6 border border-red-500/15 bg-red-500/[0.03] rounded-sm">
              <div className="font-ibm text-red-400/50 text-xs tracking-[0.15em] uppercase mb-3">Сценарий A · Текущий</div>
              <div className="space-y-2">
                {[
                  "Участок на балансе",
                  "Бридж-кредит давит на сроки",
                  "Классическая девелоперская модель",
                  "Полный риск на своём балансе",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Icon name="Minus" size={12} className="text-red-400/40 flex-shrink-0" />
                    <span className="font-ibm text-white/35 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Icon name="ArrowDown" size={20} className="text-white/20" />
            </div>

            <div className="p-6 border border-purple-500/20 bg-purple-500/[0.04] rounded-sm">
              <div className="font-ibm text-purple-400/60 text-xs tracking-[0.15em] uppercase mb-3">Сценарий B · С АО КСИ</div>
              <div className="space-y-2">
                {[
                  "Актив в контуре системы КриптоМетры",
                  "Партнёрские механики снижают давление",
                  "Гибкие сценарии реализации",
                  "Движение к модели Fee Development",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Icon name="Check" size={12} className="text-purple-400/60 flex-shrink-0" />
                    <span className="font-ibm text-white/55 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
