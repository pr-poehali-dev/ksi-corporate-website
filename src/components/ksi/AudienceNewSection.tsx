import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const audiences = [
  {
    id: "landowners",
    label: "Землевладельцы",
    icon: "Map",
    headline: "Ваша земля — точка старта девелопмента",
    desc: "Землевладельцы имеют особый статус в системе АО КСИ. С земли начинается девелопмент — и именно земельный актив является базовым обучающим кейсом для виртуального девелопера.",
    points: [
      "Оценка и анализ вашего участка системой",
      "Концепция использования без инвестиций с вашей стороны",
      "Партнёрские схемы без прямого кредитования",
      "Приоритетный статус соавтора",
    ],
    cta: "Подключить участок",
    ctaHref: "/early-access",
  },
  {
    id: "developers",
    label: "Девелоперы",
    icon: "Building2",
    headline: "Переупакуйте активы. Снизьте кредитную нагрузку.",
    desc: "Отдельный контур АО КСИ для действующих девелоперов: помощь в переупаковке активов, структурировании проектов и движению к модели Fee Development.",
    points: [
      "Структурирование проблемных и зависших активов",
      "Снижение кредитной нагрузки через партнёрские механики",
      "Переход к модели Fee Development",
      "Интеллект системы — без найма и без кредита",
    ],
    cta: "Обсудить контур",
    ctaHref: "/contacts",
  },
  {
    id: "investors",
    label: "Инвесторы и партнёры",
    icon: "TrendingUp",
    headline: "Войдите в систему на правах соавтора",
    desc: "Инвесторы и партнёры, подключающиеся на раннем этапе, получают статус соавтора виртуального девелопера — и проектные привилегии по мере роста системы.",
    points: [
      "Соавторство на этапе построения системы",
      "КриптоМетры как фиксация раннего участия",
      "Проектные привилегии в будущих механиках",
      "Участие в кейсах обучения системы",
    ],
    cta: "Стать соавтором",
    ctaHref: "/coauthor",
  },
];

export function AudienceNewSection() {
  const [active, setActive] = useState("landowners");
  const current = audiences.find((a) => a.id === active)!;

  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-label mb-4">◆ Кому открыт доступ</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
          Только для юридических лиц
        </h2>
        <p className="font-ibm text-white/40 text-lg mb-12 max-w-xl">
          Ранний доступ открыт по НДС, только B2B. Три аудитории с разными задачами — единая точка входа.
        </p>

        {/* Табы */}
        <div className="flex gap-2 mb-10 border-b border-white/8">
          {audiences.map((a) => (
            <button
              key={a.id}
              onClick={() => setActive(a.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium font-ibm transition-all border-b-2 -mb-px ${
                active === a.id
                  ? "border-ksi-cyan text-ksi-cyan"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              <Icon name={a.icon as "Map"} size={15} />
              {a.label}
            </button>
          ))}
        </div>

        {/* Контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-oswald text-3xl font-semibold text-white mb-4 leading-tight">
              {current.headline}
            </h3>
            <p className="font-ibm text-white/50 text-base leading-relaxed mb-8">
              {current.desc}
            </p>
            <ul className="space-y-3 mb-8">
              {current.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="text-ksi-cyan mt-1 flex-shrink-0">◆</span>
                  <span className="font-ibm text-white/60 text-sm">{p}</span>
                </li>
              ))}
            </ul>
            <Link to={current.ctaHref} className="btn-primary-ksi inline-flex px-6 py-3 text-sm rounded-sm">
              {current.cta}
            </Link>
          </div>

          {/* Визуальный элемент */}
          <div className="relative h-64 lg:h-auto border border-white/8 bg-white/[0.02] rounded-sm flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ background: "radial-gradient(circle at center, #00d4ff 0%, transparent 70%)" }} />
            <Icon name={current.icon as "Map"} size={80} className="text-ksi-cyan/15" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-ibm text-xs text-white/20 tracking-[0.15em] uppercase mb-2">Статус участника</div>
              <div className="font-oswald text-white/60 text-xl">
                {current.label} · Соавтор системы
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
