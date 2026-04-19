import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const plans = [
  {
    id: "start",
    label: "Старт",
    tag: "Для первого шага",
    price: "По запросу",
    priceNote: "Фиксированный первый этап",
    color: "cyan",
    features: [
      "1 задача на аналитику или концепцию",
      "Результат: документ / презентация",
      "Срок: до 5 рабочих дней",
      "КриптоМетры: базовый коэффициент",
      "Закрывающие документы с НДС",
    ],
    cta: "Начать",
    ctaHref: "/early-access",
    highlight: false,
  },
  {
    id: "access",
    label: "Доступ",
    tag: "Основной формат",
    price: "По запросу",
    priceNote: "Абонентский или проектный",
    color: "cyan",
    features: [
      "Пакет задач на согласованный период",
      "Приоритетное рассмотрение запросов",
      "Все типы задач: аналитика, концепция, упаковка, партнёрство",
      "КриптоМетры: повышенный коэффициент",
      "Персональный куратор",
      "Закрывающие документы с НДС",
    ],
    cta: "Обсудить условия",
    ctaHref: "/contacts",
    highlight: true,
  },
  {
    id: "project",
    label: "Проектный",
    tag: "Для девелоперов",
    price: "Индивидуально",
    priceNote: "Контур Fee Development",
    color: "purple",
    features: [
      "Полное сопровождение проекта",
      "Структурирование и переупаковка активов",
      "Движение к модели Fee Development",
      "КриптоМетры: максимальный коэффициент",
      "Партнёрские механики",
      "Индивидуальная договорная конструкция",
    ],
    cta: "Обсудить проект",
    ctaHref: "/contacts",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse, #00d4ff 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="section-label mb-4">◆ Стоимость доступа</div>
          <h1 className="font-oswald text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
            Вы платите<br /><span className="text-gradient-main">за интеллект,<br />не за часы</span>
          </h1>
          <p className="font-ibm text-white/45 text-lg max-w-xl mx-auto">
            Доступ к системе АО КСИ — это не консалтинг по часовым ставкам. 
            Это подписка на интеллект виртуального девелопера.
          </p>
        </div>
      </section>

      {/* Принцип ценообразования */}
      <section className="py-12 border-y border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "Brain", title: "Интеллект, не часы", desc: "Вы платите за результат и доступ к системе, а не за человеко-часы." },
              { icon: "Coins", title: "КриптоМетры в цену включены", desc: "При любом формате участия начисляются КриптоМетры — часть ценности." },
              { icon: "FileCheck", title: "Полный документооборот", desc: "НДС, акты, счета-фактуры. Всё для корпоративной бухгалтерии." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <Icon name={item.icon as "Brain"} size={20} className="text-ksi-cyan/60 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-oswald text-white font-medium mb-1">{item.title}</div>
                  <div className="font-ibm text-white/40 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div key={plan.id} className={`relative flex flex-col border rounded-sm p-8 ${
                plan.highlight
                  ? "border-ksi-cyan/40 bg-ksi-cyan/[0.04]"
                  : "border-white/10 bg-white/[0.02]"
              }`}>
                {plan.highlight && (
                  <div className="absolute -top-px left-6 right-6 h-px bg-ksi-cyan/50" />
                )}
                <div className="mb-6">
                  <div className="font-ibm text-white/30 text-xs tracking-[0.15em] uppercase mb-2">{plan.tag}</div>
                  <div className="font-oswald text-white text-3xl font-semibold mb-1">{plan.label}</div>
                  <div className="font-oswald text-ksi-cyan text-xl mb-0.5">{plan.price}</div>
                  <div className="font-ibm text-white/25 text-xs">{plan.priceNote}</div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Icon name="Check" size={14} className={`flex-shrink-0 mt-0.5 ${plan.color === "cyan" ? "text-ksi-cyan/60" : "text-purple-400/60"}`} />
                      <span className="font-ibm text-white/50 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.ctaHref} className={`text-center py-3 text-sm font-ibm rounded-sm transition-all ${
                  plan.highlight
                    ? "btn-primary-ksi"
                    : "border border-white/15 hover:border-white/30 text-white/60 hover:text-white/80"
                }`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Уточнение по стоимости */}
          <div className="border border-white/8 bg-white/[0.02] p-6 rounded-sm text-center">
            <Icon name="Info" size={18} className="text-white/30 mx-auto mb-3" />
            <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-2xl mx-auto">
              Конкретная стоимость определяется по результатам первого разговора — исходя из задачи, 
              объёма и формата участия. Мы не публикуем прайс-лист, потому что каждый запрос индивидуален.
            </p>
          </div>
        </div>
      </section>

      {/* Что входит в любой формат */}
      <section className="py-16 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-oswald text-3xl font-semibold text-white mb-8">
            Что входит в любой формат
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "Shield", text: "Договор и НДС" },
              { icon: "Coins", text: "КриптоМетры" },
              { icon: "FileText", text: "Документы" },
              { icon: "MessageCircle", text: "Связь с командой" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center text-center p-6 border border-white/8 bg-white/[0.02] rounded-sm gap-3">
                <Icon name={item.icon as "Shield"} size={24} className="text-ksi-cyan/50" />
                <span className="font-ibm text-white/50 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-oswald text-3xl font-semibold text-white mb-4">
            Обсудить условия напрямую
          </h2>
          <p className="font-ibm text-white/40 text-sm mb-8">
            Расскажите о задаче — мы предложим подходящий формат и стоимость.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacts" className="btn-primary-ksi px-8 py-3.5 text-sm rounded-sm">
              Персональное приглашение
            </Link>
            <Link to="/early-access" className="border border-white/15 hover:border-white/30 text-white/60 hover:text-white/80 transition-all px-8 py-3.5 text-sm font-ibm rounded-sm">
              Запросить доступ
            </Link>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
