import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Reveal } from "./Reveal";

export function LandownersSection() {
  return (
    <section className="py-24 border-t border-white/6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-[500px] h-full opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse at right top, #00d4ff 0%, transparent 65%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Текст */}
          <Reveal delay={0}>
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-ksi-cyan/20 bg-ksi-cyan/[0.04] rounded-sm">
                <Icon name="Map" size={13} className="text-ksi-cyan/70" />
                <span className="font-ibm text-ksi-cyan/70 text-xs tracking-[0.15em] uppercase">Особый статус</span>
              </div>

              <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
                Девелопмент начинается<br />
                <span className="text-gradient-main">с земли</span>
              </h2>

              <p className="font-ibm text-white/55 text-lg leading-relaxed mb-6">
                Землевладелец — не просто владелец участка. В системе АО КСИ это опорный участник,
                с которого начинается любой девелоперский сценарий.
              </p>
              <p className="font-ibm text-white/35 text-base leading-relaxed mb-8">
                Передавая участок в контур управления виртуального девелопера, землевладелец получает
                особый статус, повышенный коэффициент КриптоМетров и доступ к партнёрским схемам
                без необходимости самостоятельно инвестировать в стройку.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Анализ участка системой — без вложений с вашей стороны",
                  "Концепция использования от виртуального девелопера",
                  "Партнёрские схемы без прямого кредитования",
                  "Максимальный коэффициент начисления КриптоМетров",
                  "Статус опорного соавтора системы",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="text-ksi-cyan flex-shrink-0 mt-0.5">◆</span>
                    <span className="font-ibm text-white/55 text-sm leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>

              <Link to="/early-access" className="btn-primary-ksi inline-flex px-8 py-3.5 text-sm rounded-sm">
                Подключить участок к системе
              </Link>
            </div>
          </Reveal>

          {/* Визуальный блок */}
          <Reveal delay={200}>
            <div className="relative">
              <div className="aspect-square max-w-md border border-ksi-cyan/15 bg-ksi-cyan/[0.03] rounded-sm overflow-hidden flex flex-col items-center justify-center relative">
                {/* Сетка участка */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
                  <rect x="40" y="40" width="320" height="200" fill="none" stroke="#00d4ff" strokeWidth="0.8" />
                  <rect x="40" y="260" width="150" height="100" fill="none" stroke="#00d4ff" strokeWidth="0.6" />
                  <rect x="210" y="260" width="150" height="100" fill="none" stroke="#00d4ff" strokeWidth="0.6" />
                  <line x1="40" y1="140" x2="360" y2="140" stroke="#00d4ff" strokeWidth="0.4" strokeDasharray="8,6" />
                  <line x1="200" y1="40" x2="200" y2="240" stroke="#00d4ff" strokeWidth="0.4" strokeDasharray="8,6" />
                  <circle cx="120" cy="90" r="5" fill="none" stroke="#00d4ff" strokeWidth="0.8" />
                  <circle cx="280" cy="90" r="5" fill="none" stroke="#00d4ff" strokeWidth="0.8" />
                  <circle cx="115" cy="310" r="4" fill="none" stroke="#00d4ff" strokeWidth="0.6" />
                  <circle cx="285" cy="310" r="4" fill="none" stroke="#00d4ff" strokeWidth="0.6" />
                </svg>

                <div className="relative z-10 text-center px-8">
                  <Icon name="Map" size={36} className="text-ksi-cyan/25 mx-auto mb-4" />
                  <div className="font-ibm text-white/20 text-xs tracking-[0.2em] uppercase mb-2">Особый статус</div>
                  <div className="font-oswald text-white/45 text-2xl">Землевладелец</div>
                </div>

                {/* Метка в углу */}
                <div className="absolute top-4 right-4 font-ibm text-[10px] text-ksi-cyan/30 text-right">
                  <div>КМ ×2.5</div>
                  <div>коэффициент</div>
                </div>
                <div className="absolute bottom-4 left-4 font-ibm text-[10px] text-white/15">
                  Опорный участник системы
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}