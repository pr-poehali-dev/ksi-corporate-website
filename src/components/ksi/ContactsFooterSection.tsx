import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

export function ContactsSection() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "", role: "" });

  return (
    <section id="contacts" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-border to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="section-label mb-6">◆ Контакты</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Начнём<br /><span className="text-gradient-main">предметный разговор</span>
            </h2>
            <p className="font-ibm text-white/60 text-lg leading-relaxed mb-10">
              АО КСИ ведёт диалог с профессиональными участниками рынка.
              Укажите вашу роль и задачу — это поможет нам ответить по существу.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: "Mail", label: "Email", value: "info@ksi.ru" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "MapPin", label: "Адрес", value: "Москва, Россия" },
                { icon: "Clock", label: "Режим ответа", value: "Рабочие дни, в течение 24 часов" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    <Icon name={item.icon} size={16} className="text-ksi-cyan" />
                  </div>
                  <div>
                    <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-0.5">{item.label}</div>
                    <div className="font-ibm text-white/65 text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Дисклеймер */}
            <div className="p-5 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">ПРАВОВАЯ ОГОВОРКА</div>
              <p className="font-ibm text-white/30 text-xs leading-relaxed">
                Компания не осуществляет публичного привлечения денежных средств.
                Отдельные модели участия реализуются в рамках специальных юридических
                конструкций и партнёрских механизмов, формируемых индивидуально.
              </p>
            </div>
          </div>

          <div className="card-ksi p-8 rounded-sm" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
            <div className="font-mono-ibm text-ksi-cyan/50 text-xs tracking-widest mb-6">ФОРМА ОБРАЩЕНИЯ</div>

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
                src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/6cc3c0d3-b169-4aea-b654-cf24515a3fb0.png"
                alt="КСИ"
                className="h-10 w-auto flex-shrink-0"
              />
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
              {[
                { label: "КриптоМетры", href: "/directions/cryptometry" },
                { label: "LSS — Земельный поиск", href: "/directions/lss" },
                { label: "Лаборатория ИИ", href: "/directions/ai-lab" },
                { label: "Fee-Dev платформа", href: "/directions/fee-dev" },
              ].map((p) => (
                <a key={p.href} href={p.href} className="block font-ibm text-white/40 text-sm hover:text-white/70 transition-colors">{p.label}</a>
              ))}
            </div>
            <div className="mt-6">
              <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-3">СПРАВОЧНЫЕ РАЗДЕЛЫ</div>
              <div className="space-y-2">
                <a href="/roadmap" className="block font-ibm text-white/35 text-xs hover:text-white/60 transition-colors">Дорожная карта →</a>
                <a href="/glossary" className="block font-ibm text-white/35 text-xs hover:text-white/60 transition-colors">Глоссарий →</a>
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
