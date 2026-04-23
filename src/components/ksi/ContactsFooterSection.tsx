import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";
import { api, ApiError } from "@/lib/api";
import PhoneMessengersField, { MessengerValue, isValidPhoneRU } from "./PhoneMessengersField";

export function ContactsSection() {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "", message: "", role: "" });
  const [messengers, setMessengers] = useState<MessengerValue[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    if (!agreed) {
      setError("Необходимо дать согласие на обработку персональных данных");
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      setError("Заполните обязательные поля: имя и email");
      return;
    }
    if (form.phone.trim() && !isValidPhoneRU(form.phone)) {
      setError("Введите полный номер телефона в формате +7 (___) ___-__-__");
      return;
    }
    if (form.phone.trim() && messengers.length === 0) {
      setError("Выберите удобный способ связи");
      return;
    }
    setError("");
    setSending(true);
    try {
      await api.post("contact-form", {
        name: form.name.trim(),
        org: form.org.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        messengers,
        role: form.role,
        message: form.message.trim(),
      });
      setSent(true);
      setForm({ name: "", org: "", email: "", phone: "", message: "", role: "" });
      setMessengers([]);
    } catch (err) {
      setError(err instanceof ApiError ? (err.data?.error as string) || "Ошибка отправки" : "Не удалось отправить");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetch("https://functions.poehali.dev/de77851c-6234-460f-903b-ca3df97ddc07")
      .then(r => r.json())
      .then(d => { if (d.settings) setSettings(d.settings); })
      .catch(() => {});
  }, []);

  const contactEmail = settings.email || "info@aoksi.ru";
  const contactPhone = settings.phone || "+7 (495) 000-00-00";
  const contactAddress = settings.actual_address || "Москва, Россия";

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
                { icon: "Mail", label: "Email", value: contactEmail },
                { icon: "Phone", label: "Телефон", value: contactPhone },
                { icon: "MapPin", label: "Адрес", value: contactAddress },
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

            {sent ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <Icon name="Check" size={28} className="text-ksi-cyan" />
                </div>
                <h3 className="font-oswald text-xl text-white mb-2">Обращение отправлено</h3>
                <p className="font-ibm text-white/40 text-sm max-w-sm">Мы получили ваше сообщение и ответим в течение рабочего дня.</p>
                <button onClick={() => setSent(false)} className="mt-6 font-ibm text-ksi-cyan/60 text-sm hover:text-ksi-cyan transition-colors">
                  Отправить ещё
                </button>
              </div>
            ) : (
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
              <PhoneMessengersField
                phone={form.phone}
                messengers={messengers}
                onPhoneChange={(v) => setForm({ ...form, phone: v })}
                onMessengersChange={setMessengers}
              />
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

              {error && (
                <div className="flex items-center gap-2 text-red-400/80 text-sm font-ibm">
                  <Icon name="AlertCircle" size={14} />
                  {error}
                </div>
              )}

              {/* Согласие на обработку ПД */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-sm border transition-all duration-200 flex items-center justify-center"
                  style={{
                    border: agreed ? "1px solid rgba(0,212,255,0.7)" : "1px solid rgba(255,255,255,0.2)",
                    background: agreed ? "rgba(0,212,255,0.15)" : "transparent",
                  }}
                >
                  {agreed && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="font-ibm text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Я даю согласие на обработку персональных данных в соответствии с{" "}
                  <Link to="/privacy" className="transition-colors" style={{ color: "rgba(0,212,255,0.6)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(0,212,255,0.9)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,212,255,0.6)")}
                    onClick={e => e.stopPropagation()}>
                    Политикой конфиденциальности
                  </Link>
                </span>
              </label>

              <button onClick={handleSubmit} disabled={sending || !agreed} className="btn-primary-ksi w-full py-4 rounded-sm text-sm mt-2 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50">
                {sending && <Icon name="Loader2" size={16} className="animate-spin" />}
                {sending ? "Отправка..." : "Отправить обращение"}
              </button>
            </div>
            )}
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
              Оператор интеллектуальной инфраструктуры для девелопмента. Управляющая компания проекта «КриптоМетры».
            </p>
          </div>

          <div>
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">НАВИГАЦИЯ</div>
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} to={item.href} className="block font-ibm text-white/40 text-sm hover:text-white/70 transition-colors">{item.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">ПРОЕКТ</div>
            <div className="space-y-2">
              <Link to="/cryptometry" className="block font-ibm text-white/50 text-sm hover:text-white/70 transition-colors">КриптоМетры</Link>
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
                  <Link key={l.href} to={l.href} className="block font-ibm text-white/25 text-xs hover:text-white/45 transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">СПРАВКА</div>
              <div className="space-y-1">
                <Link to="/roadmap" className="block font-ibm text-white/20 text-xs hover:text-white/40 transition-colors">Дорожная карта</Link>
                <Link to="/glossary" className="block font-ibm text-white/20 text-xs hover:text-white/40 transition-colors">Глоссарий</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ksi-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-ibm text-white/25 text-xs">© 2026 АО «КриптоСтройИнвест». Все права защищены.</div>
          <div className="flex items-center gap-6">
            {[
              { label: "Политика конфиденциальности", href: "/privacy" },
              { label: "Пользовательское соглашение", href: "/terms" },
              { label: "Реквизиты", href: "/requisites" },
            ].map((link) => (
              <Link key={link.href} to={link.href} className="font-ibm text-white/25 text-xs hover:text-white/50 transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}