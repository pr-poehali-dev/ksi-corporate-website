import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export function MiningCryptoSection() {
  return (
    <section className="py-28 border-t border-white/6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #7b2fff 0%, transparent 65%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Майнинг */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="section-label mb-4">◆ Майнинг недвижимости</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Майнинг недвижимости —<br />
              <span className="text-gradient-main">это обучение девелопера</span>
            </h2>
            <p className="font-ibm text-white/55 text-lg leading-relaxed mb-6">
              В классическом майнинге вычислительные мощности создают ценность.
              В нашей модели ценность создаёт интеллект: каждая задача, поставленная в систему,
              обогащает виртуального девелопера реальным знанием рынка.
            </p>
            <p className="font-ibm text-white/35 text-base leading-relaxed mb-8">
              Участник «майнит» не криптовалюту — он майнит интеллект. И за это получает КриптоМетры.
            </p>
            <div className="flex items-start gap-3 p-4 border border-white/8 bg-white/[0.02] rounded-sm">
              <Icon name="Info" size={15} className="text-white/25 flex-shrink-0 mt-0.5" />
              <p className="font-ibm text-white/30 text-xs leading-relaxed">
                КриптоМетры не являются криптовалютой, ценными бумагами или финансовыми инструментами.
                Это расчётные единицы системы АО КСИ.{" "}
                <Link to="/legal" className="text-ksi-cyan/50 hover:text-ksi-cyan transition-colors">
                  Правовая основа →
                </Link>
              </p>
            </div>
          </div>

          {/* Визуальная схема */}
          <div className="space-y-3">
            {[
              { from: "Запрос в систему", arrow: true, to: "Обучающий кейс", icon: "MessageSquare" },
              { from: "Обучающий кейс", arrow: true, to: "Умнее система", icon: "BrainCircuit" },
              { from: "Участие в обучении", arrow: true, to: "КриптоМетры", icon: "Coins" },
              { from: "Ранний соавтор", arrow: true, to: "Проектные привилегии", icon: "Trophy" },
            ].map((row) => (
              <div key={row.from} className="flex items-center gap-3 p-4 border border-white/8 bg-white/[0.02] rounded-sm">
                <Icon name={row.icon as "MessageSquare"} size={16} className="text-ksi-cyan/40 flex-shrink-0" />
                <span className="font-ibm text-white/50 text-sm flex-1">{row.from}</span>
                <Icon name="ArrowRight" size={14} className="text-white/20 flex-shrink-0" />
                <span className="font-oswald text-ksi-cyan text-sm font-medium flex-1 text-right">{row.to}</span>
              </div>
            ))}
          </div>
        </div>

        {/* КриптоМетры */}
        <div className="border border-white/8 bg-white/[0.02] rounded-sm overflow-hidden">
          <div className="border-b border-white/6 px-8 py-5 flex items-center justify-between">
            <div>
              <div className="section-label mb-1">◆ КриптоМетры</div>
              <h3 className="font-oswald text-2xl font-semibold text-white">Что такое КриптоМетры</h3>
            </div>
            <div className="font-oswald text-5xl font-bold text-ksi-cyan/10">КМ</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/6">
            {[
              {
                icon: "Hash",
                title: "Единица участия",
                desc: "КриптоМетр — это зафиксированная единица вашего вклада в обучение виртуального девелопера. Начисляется за каждую задачу.",
              },
              {
                icon: "Lock",
                title: "Не аннулируются",
                desc: "Начисленные КриптоМетры фиксируются и не сгорают. Ваш вклад сохраняется вне зависимости от этапа системы.",
              },
              {
                icon: "Zap",
                title: "Будущие механики",
                desc: "По мере развития системы КриптоМетры открывают доступ к проектным привилегиям, доступным только соавторам.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6">
                <Icon name={item.icon as "Hash"} size={20} className="text-ksi-cyan/50 mb-4" />
                <div className="font-oswald text-white text-lg font-medium mb-2">{item.title}</div>
                <div className="font-ibm text-white/38 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
