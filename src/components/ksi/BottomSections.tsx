import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";
import { EcosystemCanvas } from "./TopSections";

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(123,47,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="section-label mb-6">◆ Карта экосистемы</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Единая цифровая <br />
              <span className="text-gradient-purple">инфраструктура</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-8">
              АО КСИ — ядро экосистемы. Вокруг него выстроены взаимосвязанные платформы,
              сервисы и технологические компоненты, создающие синергетический эффект.
            </p>

            <div className="space-y-0 mb-10">
              {[
                { node: "КриптоМетры", role: "Флагманская система распределённого девелопмента", color: "cyan" },
                { node: "Лаборатория ИИ", role: "ИИ-решения для недвижимости и девелопмента", color: "purple" },
                { node: "ИИ-продакшн", role: "Цифровые аватары, медиа и визуальные коммуникации", color: "cyan" },
                { node: "LSS", role: "Служба аналитического поиска земельных активов", color: "purple" },
                { node: "Земельная аналитика", role: "Data-продукты и картографические решения", color: "cyan" },
                { node: "Fee-Dev Оператор", role: "Среда для профессиональных девелоперов", color: "purple" },
                { node: "Медиа & Аналитика", role: "Исследования и интеллектуальное сопровождение", color: "cyan" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-ksi-border/30">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                  <span className="font-oswald text-white/75 text-sm font-medium w-40 flex-shrink-0">{item.node}</span>
                  <span className="font-ibm text-white/35 text-xs">{item.role}</span>
                </div>
              ))}
            </div>

            <a href="#contacts" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm inline-block cursor-pointer">
              Стать частью экосистемы
            </a>
          </div>

          <div className="relative h-[500px] rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-purple/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-ksi-dark/30 pointer-events-none" />
            <EcosystemCanvas />
            <div className="absolute top-4 left-4 font-mono-ibm text-ksi-cyan/40 text-xs tracking-widest pointer-events-none">LIVE MAP</div>
            <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-ksi-cyan pulse-dot" />
              <span className="font-mono-ibm text-ksi-cyan/40 text-xs">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InvestorsSection() {
  return (
    <section id="investors" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.02) 0%, rgba(123,47,255,0.02) 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="section-label mb-6">◆ Инвесторам</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Инвестиции <br />в <span className="text-gradient-cyan">будущее</span> девелопмента
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-10">
              АО КСИ открывает новые возможности для институциональных и частных инвесторов.
              Прозрачная структура, цифровые инструменты контроля и диверсифицированный
              портфель направлений снижают риски и обеспечивают устойчивый рост.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: "Shield", title: "Прозрачность", desc: "Блокчейн-аудит всех транзакций и решений" },
                { icon: "PieChart", title: "Диверсификация", desc: "6+ направлений в едином портфеле" },
                { icon: "Cpu", title: "Технологии", desc: "ИИ-аналитика для принятия решений" },
                { icon: "Users", title: "Команда", desc: "Опыт в девелопменте и IT от 10 лет" },
              ].map((item, i) => (
                <div key={i} className="card-ksi p-5 rounded-sm">
                  <Icon name={item.icon} size={20} className="text-ksi-cyan mb-3" />
                  <div className="font-oswald text-white text-base font-medium mb-1">{item.title}</div>
                  <div className="font-ibm text-white/40 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            <a href="#contacts" className="btn-primary-ksi px-8 py-3.5 rounded-sm text-sm inline-block cursor-pointer">
              Запросить инвестиционный меморандум
            </a>
          </div>

          <div className="space-y-4">
            {[
              { title: "Стратегическое участие", desc: "Вхождение в капитал головной структуры АО КСИ. Доступ к управлению и стратегическим решениям экосистемы.", badge: "M&A" },
              { title: "Портфельные инвестиции", desc: "Участие в финансировании отдельных проектов экосистемы с фиксированной доходностью и временным горизонтом.", badge: "PE" },
              { title: "Токенизированные активы", desc: "Покупка цифровых прав на объекты недвижимости через платформу КриптоМетры. Порог входа — от 50 000 ₽.", badge: "RWA" },
              { title: "Технологическое партнёрство", desc: "Совместное развитие продуктов с разделением доходов и интеллектуальной собственности.", badge: "Tech" },
            ].map((item, i) => (
              <div key={i} className="card-ksi p-6 rounded-sm group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-oswald text-white font-medium text-lg group-hover:text-ksi-cyan transition-colors">{item.title}</h3>
                  <span className="font-mono-ibm text-xs px-2 py-1 rounded-sm bg-ksi-border text-white/40 flex-shrink-0 ml-3">{item.badge}</span>
                </div>
                <p className="font-ibm text-white/50 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-transparent group-hover:text-ksi-cyan/60 transition-all">
                  <span className="font-mono-ibm text-xs tracking-widest">ПОДРОБНЕЕ</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section id="partners" className="py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-label mb-4">◆ Партнёрам</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white">
            Войдите в <span className="text-gradient-purple">экосистему</span>
          </h2>
          <p className="font-ibm text-white/50 text-lg mt-4 max-w-2xl mx-auto">
            Мы ищем компетентных партнёров для совместного развития рынка цифрового девелопмента
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            { icon: "MapPin", title: "Землевладельцы", desc: "Монетизируйте земельные активы через цифровую девелоперскую платформу без капитальных вложений", color: "cyan" },
            { icon: "Building", title: "Девелоперы", desc: "Получите доступ к цифровым инструментам, аналитике и инвестиционному капиталу через экосистему КСИ", color: "purple" },
            { icon: "Code2", title: "Технологические партнёры", desc: "Интегрируйте свои продукты в экосистему и получите доступ к растущей базе клиентов в сфере недвижимости", color: "cyan" },
            { icon: "Briefcase", title: "Финансовые институты", desc: "Создавайте совместные инвестиционные продукты на базе токенизированных активов недвижимости", color: "purple" },
          ].map((item, i) => (
            <div key={i} className="card-ksi p-6 rounded-sm text-center group cursor-pointer">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: item.color === "cyan" ? "rgba(0,212,255,0.08)" : "rgba(123,47,255,0.08)", border: `1px solid ${item.color === "cyan" ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)"}` }}>
                <Icon name={item.icon} size={24} className={item.color === "cyan" ? "text-ksi-cyan" : "text-ksi-purple"} />
              </div>
              <h3 className="font-oswald text-white font-medium text-lg mb-3 group-hover:text-ksi-cyan transition-colors">{item.title}</h3>
              <p className="font-ibm text-white/45 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center p-10 rounded-sm relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(123,47,255,0.04) 100%)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/30 to-transparent pointer-events-none" />
          <h3 className="font-oswald text-white text-2xl font-semibold mb-3">Готовы к диалогу?</h3>
          <p className="font-ibm text-white/50 text-base mb-8 max-w-xl mx-auto">
            Оставьте заявку — мы свяжемся в течение 24 часов и обсудим формат партнёрства
          </p>
          <a href="#contacts" className="btn-primary-ksi px-10 py-3.5 rounded-sm text-sm inline-block cursor-pointer">
            Предложить партнёрство
          </a>
        </div>
      </div>
    </section>
  );
}

export function ContactsSection() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "", type: "" });

  return (
    <section id="contacts" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-border to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="section-label mb-6">◆ Контакты</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Начнём <br /><span className="text-gradient-main">разговор</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-10">
              АО КСИ открыто к диалогу с девелоперами, инвесторами, технологическими
              партнёрами и землевладельцами. Напишите нам — мы ответим быстро.
            </p>

            <div className="space-y-6">
              {[
                { icon: "Mail", label: "Email", value: "info@ksi.ru" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "MapPin", label: "Адрес", value: "Москва, Россия" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 9:00–18:00 МСК" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    <Icon name={item.icon} size={16} className="text-ksi-cyan" />
                  </div>
                  <div>
                    <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-0.5">{item.label}</div>
                    <div className="font-ibm text-white/70 text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-ksi p-8 rounded-sm" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
            <div className="font-mono-ibm text-ksi-cyan/50 text-xs tracking-widest mb-6">ФОРМА ОБРАТНОЙ СВЯЗИ</div>

            <div className="space-y-4">
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ИМЯ *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ОРГАНИЗАЦИЯ</label>
                <input type="text" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} placeholder="Название компании" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">EMAIL *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ТИП ЗАПРОСА</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/60 text-sm focus:outline-none focus:border-ksi-cyan/40 transition-colors">
                  <option value="" className="bg-ksi-dark">Выберите тип</option>
                  <option value="invest" className="bg-ksi-dark">Инвестиции</option>
                  <option value="partner" className="bg-ksi-dark">Партнёрство</option>
                  <option value="developer" className="bg-ksi-dark">Для девелоперов</option>
                  <option value="land" className="bg-ksi-dark">Земельный участок</option>
                  <option value="other" className="bg-ksi-dark">Другое</option>
                </select>
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">СООБЩЕНИЕ</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Опишите ваш запрос..." rows={4} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors resize-none" />
              </div>

              <button className="btn-primary-ksi w-full py-4 rounded-sm text-sm mt-2 cursor-pointer">
                Отправить запрос
              </button>

              <p className="font-ibm text-white/25 text-xs text-center">
                Мы не передаём ваши данные третьим лицам
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ksi-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-7 h-7 flex-shrink-0">
                <div className="absolute inset-0 border border-ksi-cyan/60 rotate-45" />
                <div className="absolute inset-1 border border-ksi-purple/60 rotate-12" />
                <div className="absolute inset-2 bg-ksi-cyan/20 rotate-45" />
              </div>
              <span className="font-oswald font-semibold text-white tracking-widest uppercase text-sm">АО КриптоСтройИнвест</span>
            </div>
            <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-xs">
              Виртуальный девелопер. Цифровая экосистема для рынка недвижимости нового поколения.
            </p>
          </div>

          <div>
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">НАВИГАЦИЯ</div>
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="block font-ibm text-white/40 text-sm hover:text-white/70 transition-colors">{item.label}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">ПРОДУКТЫ</div>
            <div className="space-y-2">
              {["КриптоМетры", "KSI Analytics", "DevHub"].map((p) => (
                <div key={p} className="font-ibm text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">{p}</div>
              ))}
            </div>
            <div className="mt-6">
              <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-2">РЕКВИЗИТЫ</div>
              <div className="font-ibm text-white/25 text-xs leading-relaxed">
                ОГРН: 0000000000000<br />
                ИНН: 0000000000
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ksi-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-ibm text-white/25 text-xs">© 2024 АО «КриптоСтройИнвест». Все права защищены.</div>
          <div className="flex items-center gap-6">
            {["Политика конфиденциальности", "Пользовательское соглашение", "Реквизиты"].map((link) => (
              <span key={link} className="font-ibm text-white/25 text-xs hover:text-white/50 cursor-pointer transition-colors">{link}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
