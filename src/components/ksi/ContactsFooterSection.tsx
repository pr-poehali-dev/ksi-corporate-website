import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

export function ContactsSection() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "", role: "" });

  return (
    <section id="contacts" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      {/* Site-plan мотив на фоне */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute right-0 bottom-0 opacity-[0.035]" width="480" height="380" viewBox="0 0 480 380">
          {/* Абстрактный план участка — кварталы */}
          <rect x="10" y="10" width="200" height="150" fill="none" stroke="white" strokeWidth="1" />
          <rect x="220" y="10" width="250" height="70" fill="none" stroke="white" strokeWidth="0.7" />
          <rect x="220" y="90" width="120" height="70" fill="none" stroke="white" strokeWidth="0.7" />
          <rect x="350" y="90" width="120" height="70" fill="none" stroke="white" strokeWidth="0.7" />
          <rect x="10" y="170" width="460" height="200" fill="none" stroke="white" strokeWidth="0.8" />
          <line x1="10" y1="270" x2="470" y2="270" stroke="white" strokeWidth="0.5" strokeDasharray="8,6" />
          <line x1="240" y1="170" x2="240" y2="370" stroke="white" strokeWidth="0.5" strokeDasharray="8,6" />
          <circle cx="110" cy="85" r="6" fill="none" stroke="white" strokeWidth="0.8" />
          <circle cx="335" cy="125" r="4" fill="none" stroke="white" strokeWidth="0.6" />
          <circle cx="125" cy="320" r="5" fill="none" stroke="white" strokeWidth="0.7" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Шапка блока */}
        <div className="mb-12">
          <div className="section-label mb-4">◆ Контакты</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight">
              Начнём<br /><span className="text-gradient-main">предметный разговор</span>
            </h2>
            {/* Логика обращения */}
            <div className="max-w-xs">
              <div className="font-ibm text-white/20 text-xs tracking-[0.15em] uppercase mb-3">Как мы работаем с запросами</div>
              <div className="space-y-2">
                {[
                  { step: "01", text: "Укажите вашу роль и задачу" },
                  { step: "02", text: "Мы изучим запрос и ответим по существу" },
                  { step: "03", text: "Назначим формат: звонок, встреча или документ" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <span className="font-ibm text-[9px] text-ksi-cyan/40 w-5 flex-shrink-0">{s.step}</span>
                    <span className="font-ibm text-white/35 text-xs">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* ── Контактные данные ── */}
          <div className="lg:col-span-2">
            <div className="space-y-4 mb-8">
              {[
                { icon: "Mail", label: "Email", value: "info@ksi.ru" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "MapPin", label: "Адрес", value: "Москва, Россия" },
                { icon: "Clock", label: "Ответ", value: "Рабочие дни, до 24 часов" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{ borderLeft: "2px solid rgba(0,212,255,0.3)" }}>
                    <Icon name={item.icon} size={14} className="text-ksi-cyan opacity-65" />
                  </div>
                  <div>
                    <div className="font-ibm text-white/22 text-[10px] tracking-widest uppercase mb-0.5">{item.label}</div>
                    <div className="font-ibm text-white/65 text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="font-ibm text-white/18 text-[10px] tracking-widest uppercase mb-3">Правовая оговорка</div>
              <p className="font-ibm text-white/25 text-xs leading-relaxed">
                Компания не осуществляет публичного привлечения денежных средств.
                Отдельные модели участия реализуются в рамках специальных юридических
                конструкций и партнёрских механизмов, формируемых индивидуально.
              </p>
            </div>
          </div>

          {/* ── Форма ── */}
          <div className="lg:col-span-3 p-8 rounded-sm"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="font-ibm text-white/25 text-xs tracking-[0.18em] uppercase mb-6">Форма обращения</div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ИМЯ *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
                </div>
                <div>
                  <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ОРГАНИЗАЦИЯ</label>
                  <input type="text" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} placeholder="Компания" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">EMAIL *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ВЫ ПРЕДСТАВЛЯЕТЕ *</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/60 text-sm focus:outline-none focus:border-ksi-cyan/40 transition-colors">
                  <option value="" className="bg-ksi-dark">Выберите роль</option>
                  <option value="land" className="bg-ksi-dark">Землевладелец</option>
                  <option value="developer" className="bg-ksi-dark">Девелопер / застройщик</option>
                  <option value="investor" className="bg-ksi-dark">Инвестор / финансовый партнёр</option>
                  <option value="strategic" className="bg-ksi-dark">Стратегический партнёр</option>
                  <option value="tech" className="bg-ksi-dark">Технологический партнёр</option>
                  <option value="ai-client" className="bg-ksi-dark">Заказчик ИИ-решений</option>
                  <option value="media" className="bg-ksi-dark">Медиа / аналитик</option>
                  <option value="other" className="bg-ksi-dark">Другое</option>
                </select>
              </div>
              <div>
                <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">СУТЬ ЗАПРОСА</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Кратко опишите задачу или вопрос..." rows={4} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors resize-none" />
              </div>

              <button className="btn-primary-ksi w-full py-4 rounded-sm text-sm mt-2 cursor-pointer">
                Отправить обращение
              </button>

              <p className="font-ibm text-white/20 text-xs text-center leading-relaxed">
                Данные не передаются третьим лицам и используются исключительно
                для обработки вашего обращения
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
              <img
                src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/aa865952-a04a-4fb8-b8c0-6cf619baf76c.png"
                alt="КСИ"
                className="h-10 w-auto flex-shrink-0"
              />
              <span className="font-oswald font-semibold text-white tracking-widest uppercase text-sm">АО КриптоСтройИнвест</span>
            </div>
            <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-xs">
              Управляющая компания проекта «КриптоМетры» — интеллектуальной системы распределённого девелопмента.
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
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">ПРОЕКТ</div>
            <div className="space-y-2">
              <a href="/cryptometry" className="block font-ibm text-white/50 text-sm hover:text-white/70 transition-colors">КриптоМетры</a>
            </div>
            <div className="mt-6">
              <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-2">ВНУТРЕННИЕ СЛУЖБЫ</div>
              <div className="space-y-1">
                {[
                  { label: "Лаборатория ИИ", href: "/directions/ai-lab" },
                  { label: "Центр реализации активов", href: "/directions/fee-dev" },
                  { label: "Служба земельного поиска", href: "/directions/lss" },
                  { label: "Студия проектного креатива", href: "/directions/ai-production" },
                ].map((l) => (
                  <a key={l.href} href={l.href} className="block font-ibm text-white/25 text-xs hover:text-white/45 transition-colors">{l.label}</a>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">СПРАВКА</div>
              <div className="space-y-1">
                <a href="/roadmap" className="block font-ibm text-white/20 text-xs hover:text-white/40 transition-colors">Дорожная карта</a>
                <a href="/glossary" className="block font-ibm text-white/20 text-xs hover:text-white/40 transition-colors">Глоссарий</a>
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