import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const plans = [
  {
    id: "entry",
    label: "Точечный вход",
    tag: "Первое подключение",
    price: "По запросу",
    priceNote: "Один прикладной контур",
    color: "cyan",
    features: [
      "1 задача через прикладной контур системы",
      "Подключение земельного, операторского или креативного контура",
      "Управляющий ИИ-слой подключается под задачу",
      "Срок: до 5 рабочих дней",
      "Закрывающие документы с НДС",
    ],
    cta: "Точечно войти в контур",
    ctaHref: "/early-access",
    highlight: false,
  },
  {
    id: "access",
    label: "Доступ к контурам",
    tag: "Основная конфигурация",
    price: "По запросу",
    priceNote: "Абонентский или проектный формат",
    color: "cyan",
    features: [
      "Пакет задач через несколько контуров системы",
      "Приоритетное рассмотрение запросов",
      "Земельный, операторский, креативный и управляющий ИИ-контур",
      "Сопровождение оператором кооперативной системы",
      "Персональный куратор внутри АО КСИ",
      "Закрывающие документы с НДС",
    ],
    cta: "Обсудить конфигурацию",
    ctaHref: "/contacts",
    highlight: true,
  },
  {
    id: "partner",
    label: "Партнёрское участие",
    tag: "Для девелоперов и партнёров",
    price: "Индивидуально",
    priceNote: "Сборка кооперативной модели",
    color: "purple",
    features: [
      "Полное сопровождение проекта внутри системы",
      "Капитализация и сценарии реализации актива",
      "Участие в развитии прикладных модулей",
      "Совместная отработка кооперативных сценариев",
      "Индивидуальная договорная конструкция",
      "Доступ к управляющему ИИ-контуру",
    ],
    cta: "Обсудить участие",
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
          <div className="section-label mb-4">◆ Форматы входа в контур</div>
          <h1 className="font-oswald text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
            Не прайс.<br /><span className="text-gradient-main">Конфигурации<br />входа в систему</span>
          </h1>
          <p className="font-ibm text-white/45 text-lg max-w-xl mx-auto">
            Это не тарифы на услуги — а форматы подключения к прикладным контурам
            кооперативной системы АО КСИ. Конфигурация определяется задачей, активом
            или сценарием участия.
          </p>
        </div>
      </section>

      {/* Принцип ценообразования */}
      <section className="py-12 border-y border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "Network", title: "Вход в систему, не услуга", desc: "Это не подряд по часовым ставкам, а подключение к контуру кооперативной системы." },
              { icon: "BrainCircuit", title: "ИИ-контур включён в любую конфигурацию", desc: "Управляющий ИИ-слой Лаборатории работает с каждой задачей внутри системы." },
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
              Конкретная конфигурация и стоимость определяются по результатам первого разговора —
              исходя из задачи, актива или сценария участия в системе. Мы не публикуем прайс-лист,
              потому что каждый формат входа индивидуален.
            </p>
          </div>
        </div>
      </section>

      {/* Что входит в любой формат */}
      <section className="py-16 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-oswald text-3xl font-semibold text-white mb-8">
            Что входит в любую конфигурацию
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "Shield", text: "Договор и НДС" },
              { icon: "BrainCircuit", text: "Управляющий ИИ-контур" },
              { icon: "FileText", text: "Документы" },
              { icon: "MessageCircle", text: "Оператор системы на связи" },
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
            Обсудить вход в контур напрямую
          </h2>
          <p className="font-ibm text-white/40 text-sm mb-8">
            Расскажите о задаче, активе или формате участия — мы предложим
            подходящую конфигурацию входа в кооперативную систему.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacts" className="btn-primary-ksi px-8 py-3.5 text-sm rounded-sm">
              Войти в контур
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