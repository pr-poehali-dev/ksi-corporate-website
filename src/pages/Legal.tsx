import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const faqs = [
  {
    q: "Являются ли КриптоМетры ценными бумагами?",
    a: "Нет. КриптоМетры — это расчётные единицы внутри системы АО КСИ, фиксирующие участие в обучении виртуального девелопера. Они не являются ценными бумагами, финансовыми инструментами, криптовалютой или средством платежа в понимании действующего законодательства РФ.",
  },
  {
    q: "Как оформляется доступ к системе?",
    a: "Доступ оформляется через договор между АО КСИ и организацией-участником. Договор содержит предмет, порядок расчётов, условия начисления КриптоМетров и SLA по задачам.",
  },
  {
    q: "Предусмотрена ли работа по НДС?",
    a: "Да. АО КСИ работает на общей системе налогообложения. Все расчёты — по НДС. Закрывающие документы (акты, счета-фактуры) предоставляются в полном объёме.",
  },
  {
    q: "Каков правовой статус АО КСИ?",
    a: "АО «КриптоСтройИнвест» — акционерное общество, зарегистрированное в соответствии с законодательством РФ. Реквизиты и регистрационные данные доступны в разделе «Реквизиты».",
  },
  {
    q: "Что происходит с моими данными?",
    a: "АО КСИ обрабатывает персональные данные в соответствии с ФЗ-152. Политика конфиденциальности описывает состав данных, цели и сроки обработки.",
  },
  {
    q: "Могут ли физические лица получить доступ?",
    a: "Ранний доступ открыт только для юридических лиц (ООО, АО) и индивидуальных предпринимателей. Работа с физическими лицами на данном этапе не предусмотрена.",
  },
  {
    q: "Как использоваться КриптоМетры в будущем?",
    a: "Механика применения КриптоМетров в проектных привилегиях находится в стадии разработки и будет раскрыта участникам отдельно. Уже начисленные КриптоМетры фиксируются и не аннулируются.",
  },
];

export default function Legal() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse, #00d4ff 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="section-label mb-4">◆ Правовая основа</div>
          <h1 className="font-oswald text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
            Правовая основа<br /><span className="text-gradient-main">АО КСИ</span>
          </h1>
          <p className="font-ibm text-white/45 text-lg max-w-2xl">
            Всё, что нужно знать юридическому лицу перед подключением к системе.
          </p>
        </div>
      </section>

      <section className="py-8 border-y border-white/6">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "Building2", label: "Статус АО", value: "Акционерное общество" },
              { icon: "FileText", label: "Документооборот", value: "Полный пакет" },
              { icon: "Receipt", label: "Налогообложение", value: "НДС / ОСН" },
              { icon: "Shield", label: "ФЗ-152", value: "Соответствие" },
            ].map((item) => (
              <div key={item.label} className="text-center p-4 border border-white/8 bg-white/[0.02] rounded-sm">
                <Icon name={item.icon as "Building2"} size={20} className="text-ksi-cyan/50 mx-auto mb-2" />
                <div className="font-ibm text-white/25 text-xs mb-1">{item.label}</div>
                <div className="font-oswald text-white text-sm font-medium">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Статус АО КСИ */}
          <div className="mb-16">
            <h2 className="font-oswald text-3xl font-semibold text-white mb-6">Статус АО КСИ</h2>
            <p className="font-ibm text-white/50 text-base leading-relaxed mb-4">
              АО «КриптоСтройИнвест» — акционерное общество, созданное и действующее в соответствии 
              с законодательством Российской Федерации. Компания осуществляет деятельность в сфере 
              технологий для девелопмента и управления проектами.
            </p>
            <p className="font-ibm text-white/40 text-base leading-relaxed">
              Полные регистрационные данные, ИНН, ОГРН и юридический адрес компании доступны в разделе{" "}
              <Link to="/requisites" className="text-ksi-cyan/70 hover:text-ksi-cyan transition-colors">Реквизиты</Link>.
            </p>
          </div>

          {/* КриптоМетры — правовой статус */}
          <div className="mb-16">
            <h2 className="font-oswald text-3xl font-semibold text-white mb-6">КриптоМетры: правовой статус</h2>
            <div className="border border-amber-500/20 bg-amber-500/5 p-6 rounded-sm mb-6">
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={18} className="text-amber-400/70 flex-shrink-0 mt-0.5" />
                <p className="font-ibm text-white/55 text-sm leading-relaxed">
                  КриптоМетры не являются ценными бумагами, финансовыми инструментами, 
                  криптовалютой или иными активами, регулируемыми законодательством о финансовых рынках.
                </p>
              </div>
            </div>
            <p className="font-ibm text-white/45 text-base leading-relaxed mb-4">
              КриптоМетры — это внутренние расчётные единицы системы АО КСИ, отражающие объём 
              участия юридического лица в обучении виртуального девелопера. Начисление происходит 
              автоматически при выполнении условий участия, зафиксированных в договоре.
            </p>
            <p className="font-ibm text-white/35 text-base leading-relaxed">
              Механика применения КриптоМетров в проектных привилегиях находится в разработке. 
              Начисленные единицы фиксируются и не аннулируются.
            </p>
          </div>

          {/* Договорная модель */}
          <div className="mb-16">
            <h2 className="font-oswald text-3xl font-semibold text-white mb-6">Договорная модель</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "FileSignature", title: "Основной договор", desc: "Регулирует доступ к системе, SLA по задачам, порядок расчётов." },
                { icon: "Receipt", title: "Закрывающие документы", desc: "Акты, счета-фактуры — в полном объёме по каждому этапу." },
                { icon: "Coins", title: "Условия КриптоМетров", desc: "Порядок начисления, учёта и применения зафиксирован в договоре." },
                { icon: "Lock", title: "НДА / Конфиденциальность", desc: "При работе с чувствительными данными подписывается NDA." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-5 border border-white/8 bg-white/[0.02] rounded-sm">
                  <Icon name={item.icon as "FileSignature"} size={18} className="text-ksi-cyan/50 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-oswald text-white font-medium mb-1">{item.title}</div>
                    <div className="font-ibm text-white/40 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-oswald text-3xl font-semibold text-white mb-8">Частые вопросы</h2>
            <div className="space-y-4">
              {faqs.map((item, idx) => (
                <details key={idx} className="border border-white/8 bg-white/[0.02] rounded-sm group">
                  <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none">
                    <span className="font-ibm text-white/70 text-sm">{item.q}</span>
                    <Icon name="ChevronDown" size={16} className="text-white/30 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="font-ibm text-white/40 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center border border-white/8 bg-white/[0.02] p-8 rounded-sm">
            <p className="font-ibm text-white/40 text-sm mb-4">Остались вопросы по правовой модели?</p>
            <Link to="/contacts" className="btn-primary-ksi inline-flex px-8 py-3 text-sm rounded-sm">
              Задать вопрос напрямую
            </Link>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
