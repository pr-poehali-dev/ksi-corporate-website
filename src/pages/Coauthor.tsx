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
          <div className="section-label mb-4">◆ Участие в системе</div>
          <h1 className="font-oswald text-5xl md:text-7xl font-semibold text-white mb-6 leading-[0.95]">
            Стать<br /><span className="text-gradient-main">соавтором</span><br />системы
          </h1>
          <p className="font-ibm text-white/50 text-lg max-w-2xl mx-auto mb-8">
            Соавторство — это не отдельная программа лояльности, а форма участия в сборке
            интеллектуальной системы распределённого девелопмента. Те, кто входит в контур сейчас,
            становятся участниками её практической архитектуры.
          </p>
          <Link to="/early-access" className="btn-primary-ksi inline-flex px-8 py-4 text-base rounded-sm">
            Запросить вход в контур
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
                АО КСИ строит интеллектуальную систему распределённого девелопмента. Её прикладные
                контуры и интеллектуальный слой собираются из реальных задач реальных участников.
                Соавтор — это тот, кто входит в эту сборку сейчас.
              </p>
              <p className="font-ibm text-white/40 text-base leading-relaxed mb-6">
                Каждая задача, каждый актив и каждое взаимодействие усиливают прикладные модули
                и интеллектуальный контур КриптоМетров. Этот вклад фиксируется и закрепляет
                за участником статус соавтора системы.
              </p>
              <p className="font-ibm text-white/35 text-base leading-relaxed">
                По мере роста кооперативной модели соавторы получают приоритет и право голоса
                в архитектурных решениях системы.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { num: "01", title: "Вы передаёте задачу или актив", desc: "Реальная задача или актив входит в прикладной контур системы." },
                { num: "02", title: "Система решает её", desc: "Оператор АО КСИ, прикладные модули и интеллектуальный ИИ-backend работают совместно. Вы получаете результат." },
                { num: "03", title: "Фиксируется вклад", desc: "Ваше участие в системе закрепляется как вклад в её практическую сборку." },
                { num: "04", title: "Контур усиливается", desc: "Ваш кейс становится частью интеллектуального и цифрового контура КриптоМетров." },
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
          <div className="section-label mb-4">◆ Фиксация участия</div>
          <h2 className="font-oswald text-4xl font-semibold text-white mb-10 leading-tight">
            Как фиксируется<br /><span className="text-gradient-main">вклад в систему</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "MessageSquare", title: "За задачу в контуре", desc: "Каждая задача, прошедшая через прикладной контур системы, фиксируется как вклад." },
              { icon: "MapPin", title: "За земельный актив", desc: "Передача участка в систему даёт повышенный коэффициент участия." },
              { icon: "Users", title: "За расширение сети участников", desc: "Подключение новых участников системы также отражается в фиксации вклада." },
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
              Внутренние единицы участия в кооперативной системе не являются ценными бумагами
              или финансовыми инструментами. Это зафиксированный вклад в практическую сборку системы.{" "}
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
            Что даёт участие в системе
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { icon: "Zap", title: "Приоритетный доступ к контурам", desc: "Ранние участники первыми подключаются к новым прикладным модулям системы." },
              { icon: "Star", title: "Право голоса в архитектуре", desc: "Соавторы участвуют в формировании логики и приоритетов кооперативной модели." },
              { icon: "Eye", title: "Прозрачность сборки", desc: "Соавторы видят, как поэтапно собирается интеллектуальная система распределённого девелопмента." },
              { icon: "HandCoins", title: "Условия раннего входа", desc: "Улучшенные условия подключения для тех, кто входит в контур на ранней стадии." },
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
                С земли начинается девелопмент. Землевладелец, передающий свой актив в земельный
                контур системы АО КСИ, получает особый статус и повышенный коэффициент
                фиксации вклада.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Анализ участка через земельный контур системы без инвестиций с вашей стороны",
                  "Сценарий освоения от прикладных модулей и управляющего ИИ-контура",
                  "Партнёрские схемы внутри кооперативной модели без прямого кредитования",
                  "Максимальный коэффициент фиксации участия в системе",
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
                Для действующих девелоперов АО КСИ открывает отдельный контур внутри распределённой
                архитектуры: структурирование сложных активов, снижение кредитной нагрузки и переход
                к модели Fee Development через прикладные модули системы.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Структурирование зависших и проблемных активов через контур реализации",
                  "Снижение кредитной нагрузки через партнёрские конструкции системы",
                  "Переход к модели Fee Development внутри распределённой архитектуры",
                  "Интеллектуальный ИИ-контур системы без найма в штат",
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
            Войдите пока система собирается
          </h2>
          <p className="font-ibm text-white/40 text-base mb-8">
            Ранний вход в контур открыт. Чем раньше вы подключаетесь — тем больше ваш вклад
            в практическую сборку системы.
          </p>
          <Link to="/early-access" className="btn-primary-ksi inline-flex px-10 py-4 text-base rounded-sm">
            Запросить вход в контур
          </Link>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}