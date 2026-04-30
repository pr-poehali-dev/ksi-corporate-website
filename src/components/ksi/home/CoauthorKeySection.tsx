import Icon from "@/components/ui/icon";
import { Reveal } from "./Reveal";
import { useEarlyAccessModal } from "@/contexts/EarlyAccessModalContext";

export function CoauthorKeySection() {
  const { openModal } = useEarlyAccessModal();
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Фоновое свечение */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 65%)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <Reveal delay={0}>
          <div className="section-label mb-6">◆ Ключевой смысл</div>

          <h2 className="font-oswald text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[0.95] mb-8">
            Тот, кто подключается<br />
            <span className="text-gradient-main">сегодня</span> —<br />
            не просто пользуется системой.
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="font-ibm text-white/55 text-xl md:text-2xl max-w-3xl mx-auto mb-6 leading-relaxed">
            Он становится соавтором её обучения.
          </p>
          <p className="font-ibm text-white/35 text-base max-w-2xl mx-auto mb-14 leading-relaxed">
            И получает за это КриптоМетры и проектные привилегии, которые недоступны
            для тех, кто войдёт позже.
          </p>
        </Reveal>

        {/* Три опоры */}
        <Reveal delay={250}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {[
              {
                icon: "BookOpen",
                title: "Соавтор обучения",
                desc: "Ваши задачи формируют интеллект виртуального девелопера. Это вклад, который остаётся в системе.",
              },
              {
                icon: "Coins",
                title: "КриптоМетры",
                desc: "Единицы зафиксированного участия. Начисляются за каждый кейс. Не аннулируются.",
              },
              {
                icon: "Trophy",
                title: "Проектные привилегии",
                desc: "Приоритет, особые условия и влияние на направление системы — только для ранних соавторов.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 border border-ksi-cyan/15 bg-ksi-cyan/[0.03] rounded-sm text-left">
                <Icon name={item.icon as "BookOpen"} size={22} className="text-ksi-cyan/60 mb-4" />
                <div className="font-oswald text-white text-lg font-medium mb-2">{item.title}</div>
                <div className="font-ibm text-white/45 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={350}>
          <button onClick={openModal} className="btn-primary-ksi inline-flex px-10 py-4 text-base rounded-sm">
            Стать соавтором
          </button>
        </Reveal>
      </div>
    </section>
  );
}