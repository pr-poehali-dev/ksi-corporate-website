import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Coauthor() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse, #7b2fff 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="section-label mb-4">◆ Соавторство</div>
          <h1 className="font-oswald text-5xl md:text-7xl font-semibold text-white mb-6 leading-[0.95]">
            Стать<br /><span className="text-gradient-main">соавтором</span><br />проекта
          </h1>
          <p className="font-ibm text-white/50 text-lg max-w-2xl mx-auto mb-8">
            Те, кто входит в систему сейчас, — не просто клиенты. Это соавторы виртуального девелопера, 
            которого строит АО КСИ.
          </p>
          <Link to="/early-access" className="btn-primary-ksi inline-flex px-8 py-4 text-base rounded-sm">
            Запросить ранний доступ
          </Link>
        </div>
      </section>

      {/* Кто такой соавтор */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-oswald text-4xl font-semibold text-white mb-6 leading-tight">
                Кто такой<br /><span className="text-gradient-main">соавтор системы?</span>
              </h2>
              <p className="font-ibm text-white/50 text-base leading-relaxed mb-6">
                Виртуальный девелопер — это система, которую строит АО КСИ. Она обучается на реальных задачах 
                реальных участников рынка. Соавтор — это тот, кто участвует в этом обучении прямо сейчас.
              </p>
              <p className="font-ibm text-white/40 text-base leading-relaxed mb-6">
                Каждая поставленная задача, каждый кейс, каждое взаимодействие — это вклад в систему. 
                Этот вклад фиксируется в КриптоМетрах и закрепляет за участником статус соавтора.
              </p>
              <p className="font-ibm text-white/35 text-base leading-relaxed">
                По мере роста системы соавторы получают проектные привилегии, которые недоступны 
                для поздних участников.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { num: "01", title: "Вы ставите задачу", desc: "Реальная девелоперская задача становится обучающим кейсом." },
                { num: "02", title: "Система решает её", desc: "Сотрудники АО КСИ + ИИ работают над задачей. Вы получаете результат." },
                { num: "03", title: "Фиксируется вклад", desc: "На ваш счёт начисляются КриптоМетры — единицы участия." },
                { num: "04", title: "Система умнеет", desc: "Ваш кейс становится частью интеллекта виртуального девелопера." },
              ].map((item) => (
                <div key={item.num} className="flex gap-4 p-5 border border-white/8 bg-white/[0.02] rounded-sm">
                  <span className="font-ibm text-purple-400/50 text-xs font-bold w-7 flex-shrink-0 mt-0.5">{item.num}</span>
                  <div>
                    <div className="font-oswald text-white font-medium mb-1">{item.title}</div>
                    <div className="font-ibm text-white/40 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* КриптоМетры */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-4">◆ КриптоМетры</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-10 leading-tight">
            Как начисляются<br /><span className="text-gradient-main">КриптоМетры</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "MessageSquare", title: "За поставленную задачу", desc: "Каждый запрос в систему — начисление КриптоМетров." },
              { icon: "MapPin", title: "За земельный актив", desc: "Землевладельцы получают повышенный коэффициент — земля важнее всего." },
              { icon: "Users", title: "За приглашённых участников", desc: "Расширение сети соавторов также отражается в начислении." },
            ].map((item) => (
              <div key={item.title} className="p-6 border border-white/8 bg-white/[0.02] rounded-sm">
                <Icon name={item.icon as "MessageSquare"} size={24} className="text-ksi-cyan/60 mb-4" />
                <div className="font-oswald text-white text-lg font-medium mb-2">{item.title}</div>
                <div className="font-ibm text-white/40 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="border border-white/8 bg-white/[0.015] p-6 rounded-sm">
            <p className="font-ibm text-white/35 text-sm leading-relaxed">
              КриптоМетры не являются ценными бумагами или финансовыми инструментами. 
              Это единицы зафиксированного участия в системе.{" "}
              <Link to="/legal" className="text-ksi-cyan/60 hover:text-ksi-cyan transition-colors">
                Правовая основа →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Привилегии */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-oswald text-4xl font-semibold text-white mb-10 leading-tight">
            Привилегии соавтора
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { icon: "Zap", title: "Приоритетный доступ", desc: "Ранние участники первыми получают доступ к новым возможностям системы." },
              { icon: "Star", title: "Проектные механики", desc: "Участие в будущих проектных инструментах, доступных только соавторам." },
              { icon: "Eye", title: "Прозрачность системы", desc: "Соавторы видят, как система развивается, и влияют на её приоритеты." },
              { icon: "HandCoins", title: "Экономические условия", desc: "Улучшенные условия доступа для тех, кто входит на раннем этапе." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 border border-white/8 bg-white/[0.02] rounded-sm">
                <Icon name={item.icon as "Zap"} size={20} className="text-ksi-cyan/60 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-oswald text-white font-medium mb-1">{item.title}</div>
                  <div className="font-ibm text-white/40 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Особый статус землевладельцев */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 border border-ksi-cyan/15 bg-ksi-cyan/[0.03] rounded-sm overflow-hidden flex items-center justify-center">
              <Icon name="Map" size={80} className="text-ksi-cyan/10" />
              <div className="absolute bottom-6 left-6">
                <div className="font-ibm text-xs text-white/20 tracking-[0.15em] uppercase mb-1">Особый статус</div>
                <div className="font-oswald text-white/50 text-xl">Землевладелец</div>
              </div>
            </div>
            <div>
              <div className="section-label mb-4">◆ Землевладельцы</div>
              <h2 className="font-oswald text-3xl font-semibold text-white mb-4 leading-tight">
                Особый статус для тех,<br />у кого есть земля
              </h2>
              <p className="font-ibm text-white/50 text-base leading-relaxed mb-6">
                С земли начинается девелопмент. Землевладелец, подключающий свой актив к системе 
                АО КСИ, получает особый статус и повышенный коэффициент начисления КриптоМетров.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Анализ участка системой без инвестиций с вашей стороны",
                  "Концепция использования от виртуального девелопера",
                  "Партнёрские схемы без прямого кредитования",
                  "Максимальный коэффициент КриптоМетров",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="text-ksi-cyan mt-1 flex-shrink-0 text-sm">◆</span>
                    <span className="font-ibm text-white/55 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
              <Link to="/early-access" className="btn-primary-ksi inline-flex px-6 py-3 text-sm rounded-sm">
                Подключить участок
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Контур для девелоперов */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-4">◆ Для действующих девелоперов</div>
              <h2 className="font-oswald text-3xl font-semibold text-white mb-4 leading-tight">
                Переупаковка активов.<br />Движение к Fee Development.
              </h2>
              <p className="font-ibm text-white/50 text-base leading-relaxed mb-6">
                Для действующих девелоперов АО КСИ предлагает отдельный контур: 
                помощь в структурировании сложных активов, снижении кредитной нагрузки 
                и переходу к модели Fee Development.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Структурирование зависших и проблемных активов",
                  "Снижение кредитной нагрузки через партнёрские механики",
                  "Переход к модели Fee Development",
                  "Интеллект системы без найма в штат",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 flex-shrink-0 text-sm">◆</span>
                    <span className="font-ibm text-white/55 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contacts" className="border border-white/20 hover:border-white/40 text-white/60 hover:text-white/90 transition-all inline-flex px-6 py-3 text-sm font-ibm rounded-sm">
                Обсудить контур
              </Link>
            </div>
            <div className="relative h-64 border border-purple-500/15 bg-purple-500/[0.03] rounded-sm overflow-hidden flex items-center justify-center">
              <Icon name="TrendingUp" size={80} className="text-purple-400/10" />
              <div className="absolute bottom-6 left-6">
                <div className="font-ibm text-xs text-white/20 tracking-[0.15em] uppercase mb-1">Контур</div>
                <div className="font-oswald text-white/50 text-xl">Fee Development</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-oswald text-4xl font-semibold text-white mb-4">
            Войдите пока ещё рано
          </h2>
          <p className="font-ibm text-white/40 text-base mb-8">
            Ранний доступ открыт. Чем раньше вы входите — тем больше ваш вклад зафиксирован.
          </p>
          <Link to="/early-access" className="btn-primary-ksi inline-flex px-10 py-4 text-base rounded-sm">
            Запросить ранний доступ
          </Link>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
