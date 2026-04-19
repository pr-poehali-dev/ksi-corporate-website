import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

export function MiningSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #7b2fff 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Центральный тезис */}
        <div className="text-center mb-20">
          <div className="section-label mb-4">◆ КриптоМетры</div>
          <h2 className="font-oswald text-4xl md:text-6xl font-semibold text-white leading-tight mb-6">
            Майнинг недвижимости —<br />
            <span className="text-gradient-main">это обучение девелопера</span>
          </h2>
          <p className="font-ibm text-white/45 text-lg max-w-2xl mx-auto">
            КриптоМетры — это не криптовалюта и не токен. Это единицы зафиксированного участия 
            в системе и в будущих проектных механиках.
          </p>
        </div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "Zap",
              title: "Каждый запрос",
              value: "= обучение",
              desc: "Любая задача, поставленная в систему, становится обучающим кейсом виртуального девелопера.",
            },
            {
              icon: "Coins",
              title: "Каждый кейс",
              value: "= КриптоМетры",
              desc: "За участие в обучении системы начисляются КриптоМетры — единицы зафиксированного вклада.",
            },
            {
              icon: "Star",
              title: "Ранний участник",
              value: "= соавтор",
              desc: "Те, кто подключается сейчас, получают статус соавтора и проектные привилегии в будущем.",
            },
          ].map((item) => (
            <div key={item.title} className="relative p-8 border border-white/10 bg-white/[0.02] rounded-sm overflow-hidden group hover:border-ksi-cyan/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500"
                style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }} />
              <Icon name={item.icon as "Zap"} size={28} className="text-ksi-cyan/70 mb-4" />
              <div className="font-ibm text-white/30 text-sm mb-1">{item.title}</div>
              <div className="font-oswald text-ksi-cyan text-2xl font-semibold mb-3">{item.value}</div>
              <div className="font-ibm text-white/45 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Правовое уточнение */}
        <div className="border border-white/8 bg-white/[0.015] p-6 rounded-sm flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <Icon name="Shield" size={18} className="text-white/30 mt-0.5 flex-shrink-0" />
            <p className="font-ibm text-white/35 text-sm leading-relaxed">
              КриптоМетры — расчётные единицы внутри системы АО КСИ. Не являются ценными бумагами, 
              финансовыми инструментами или средством платежа. Подробнее — в правовой документации.
            </p>
          </div>
          <Link to="/legal" className="flex-shrink-0 font-ibm text-ksi-cyan/70 hover:text-ksi-cyan text-sm transition-colors flex items-center gap-1">
            Правовая основа <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
