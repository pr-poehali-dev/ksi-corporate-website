import { useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", org: "", email: "", role: "", message: "" });

  return (
    <PageLayout breadcrumb={[{ label: "Контакты" }]}>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="section-label mb-5">◆ Контакты</div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
              Предметный<br />
              <span className="text-gradient-main">разговор</span>
            </h1>
            <p className="font-ibm text-white/55 text-xl leading-relaxed">
              АО КСИ ведёт диалог с профессиональными участниками рынка.
              Укажите вашу роль и задачу — это поможет нам ответить точно и по существу.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Форма */}
            <div className="lg:col-span-3">
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
                      <option value="" className="bg-ksi-dark">Выберите вашу роль</option>
                      <option value="land" className="bg-ksi-dark">Землевладелец</option>
                      <option value="developer" className="bg-ksi-dark">Девелопер / застройщик</option>
                      <option value="investor" className="bg-ksi-dark">Инвестор / финансовый партнёр</option>
                      <option value="strategic" className="bg-ksi-dark">Стратегический партнёр</option>
                      <option value="tech" className="bg-ksi-dark">Технологический партнёр</option>
                      <option value="ai-client" className="bg-ksi-dark">Заказчик ИИ-решений</option>
                      <option value="media" className="bg-ksi-dark">Медиа / аналитик / исследователь</option>
                      <option value="other" className="bg-ksi-dark">Другое</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">СУТЬ ЗАПРОСА</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Кратко опишите вашу задачу или вопрос..." rows={5} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors resize-none" />
                  </div>
                  <button className="btn-primary-ksi w-full py-4 rounded-sm text-sm cursor-pointer">
                    Отправить обращение
                  </button>
                  <p className="font-ibm text-white/20 text-xs text-center leading-relaxed">
                    Данные используются исключительно для обработки вашего обращения.
                    Срок ответа — в течение рабочего дня.
                  </p>
                </div>
              </div>
            </div>

            {/* Контактная информация */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <div className="section-label mb-4">◆ Прямые контакты</div>
                <div className="space-y-4">
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
              </div>

              <div className="pt-4 border-t border-ksi-border/30">
                <div className="section-label mb-4">◆ По направлениям</div>
                <div className="space-y-3">
                  {[
                    { title: "КриптоМетры и девелопмент", href: "/directions/cryptometry" },
                    { title: "LSS и земельный поиск", href: "/directions/lss" },
                    { title: "Лаборатория ИИ и лицензирование", href: "/directions/ai-lab" },
                    { title: "ИИ-продакшн", href: "/directions/ai-production" },
                    { title: "Инвесторам", href: "/partners" },
                    { title: "Медиацентр", href: "/media" },
                  ].map((link, i) => (
                    <a key={i} href={link.href} className="flex items-center gap-3 group py-1">
                      <div className="w-1 h-1 rounded-full bg-ksi-cyan/30 flex-shrink-0" />
                      <span className="font-ibm text-white/40 text-sm group-hover:text-white/65 transition-colors">{link.title}</span>
                      <Icon name="ArrowRight" size={12} className="ml-auto text-white/15 group-hover:text-white/35 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-ksi-border/30">
                <div className="p-5 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">ПРАВОВАЯ ОГОВОРКА</div>
                  <p className="font-ibm text-white/30 text-xs leading-relaxed">
                    Компания не осуществляет публичного привлечения денежных средств.
                    Отдельные модели участия реализуются в рамках специальных юридических
                    конструкций и партнёрских механизмов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
