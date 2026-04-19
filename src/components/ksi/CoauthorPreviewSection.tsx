import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export function CoauthorPreviewSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Левая — визуал */}
          <div className="relative h-80 border border-white/8 bg-white/[0.02] rounded-sm overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(0,212,255,0.06) 0%, transparent 60%)" }} />
            <div className="text-center relative z-10">
              <div className="font-oswald text-7xl font-bold text-ksi-cyan/20 mb-2">КМ</div>
              <div className="font-ibm text-white/25 text-sm tracking-[0.2em] uppercase">КриптоМетры</div>
              <div className="font-ibm text-white/15 text-xs mt-1">единицы зафиксированного участия</div>
            </div>
            {/* Декоративные элементы */}
            <div className="absolute top-4 right-4 font-ibm text-xs text-white/10">
              <div>Статус: Соавтор</div>
              <div>КМ: 0000</div>
              <div>Этап: Ранний</div>
            </div>
          </div>

          {/* Правая — текст */}
          <div>
            <div className="section-label mb-4">◆ Ранний участник</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
              Ранний участник<br />
              <span className="text-gradient-main">становится соавтором</span>
            </h2>
            <p className="font-ibm text-white/50 text-base leading-relaxed mb-8">
              Те, кто подключается к системе сейчас, не просто получают доступ к интеллекту девелопера. 
              Они становятся соавторами виртуального девелопера — системы, которая будет менять рынок.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: "Coins", text: "КриптоМетры фиксируют ваш вклад в обучение системы" },
                { icon: "Trophy", text: "Проектные привилегии по мере развития механики" },
                { icon: "Users", text: "Особый статус для землевладельцев" },
                { icon: "ArrowUpRight", text: "Влияние на направление развития виртуального девелопера" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <Icon name={item.icon as "Coins"} size={16} className="text-ksi-cyan/60 mt-0.5 flex-shrink-0" />
                  <span className="font-ibm text-white/55 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Link to="/coauthor" className="btn-primary-ksi px-6 py-3 text-sm rounded-sm">
                Подробнее о соавторстве
              </Link>
              <Link to="/early-access" className="border border-white/15 hover:border-white/30 text-white/60 hover:text-white/80 transition-all px-6 py-3 text-sm font-ibm rounded-sm">
                Запросить доступ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
