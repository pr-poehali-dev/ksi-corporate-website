import { useState, useEffect } from "react";
import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";
import { api, ApiError } from "@/lib/api";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", org: "", email: "", role: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("https://functions.poehali.dev/de77851c-6234-460f-903b-ca3df97ddc07")
      .then(r => r.json())
      .then(d => { if (d.settings) setSettings(d.settings); })
      .catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Заполните обязательные поля: имя и email");
      return;
    }
    setError("");
    setSending(true);
    try {
      await api.post("contact-form", {
        name: form.name.trim(),
        org: form.org.trim(),
        email: form.email.trim(),
        role: form.role,
        message: form.message.trim(),
      });
      setSent(true);
      setForm({ name: "", org: "", email: "", role: "", message: "" });
    } catch (err) {
      setError(err instanceof ApiError ? (err.data?.error as string) || "Ошибка отправки" : "Не удалось отправить");
    } finally {
      setSending(false);
    }
  };

  const contactEmail = settings.email || "info@aoksi.ru";
  const contactPhone = settings.phone || "+7 (495) 000-00-00";
  const contactAddress = settings.actual_address || "Москва, Россия";

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
            <div className="lg:col-span-3">
              <div className="card-ksi p-8 rounded-sm" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
                <div className="font-mono-ibm text-ksi-cyan/50 text-xs tracking-widest mb-6">ФОРМА ОБРАЩЕНИЯ</div>

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
                    <div>
                      <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ВЫ ПРЕДСТАВЛЯЕТЕ *</label>
                      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/60 text-sm focus:outline-none focus:border-ksi-cyan/40 transition-colors">
                        <option value="" className="bg-ksi-dark">Выберите вашу роль</option>
                        <option value="developer" className="bg-ksi-dark">Девелопер / застройщик</option>
                        <option value="land" className="bg-ksi-dark">Землевладелец</option>
                        <option value="asset-owner" className="bg-ksi-dark">Владелец актива</option>
                        <option value="project-team" className="bg-ksi-dark">Проектная / инвестиционная команда</option>
                        <option value="beta" className="bg-ksi-dark">Хочу участвовать в бета-тестировании</option>
                        <option value="other" className="bg-ksi-dark">Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">СУТЬ ЗАПРОСА</label>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Кратко опишите вашу задачу или вопрос..." rows={5} className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors resize-none" />
                    </div>
                    {error && (
                      <div className="flex items-center gap-2 text-red-400/80 text-sm font-ibm">
                        <Icon name="AlertCircle" size={14} />
                        {error}
                      </div>
                    )}
                    <button onClick={handleSubmit} disabled={sending} className="btn-primary-ksi w-full py-4 rounded-sm text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50">
                      {sending && <Icon name="Loader2" size={16} className="animate-spin" />}
                      {sending ? "Отправка..." : "Отправить обращение"}
                    </button>
                    <p className="font-ibm text-white/20 text-xs text-center leading-relaxed">
                      Данные используются исключительно для обработки вашего обращения.
                      Нажимая кнопку, вы соглашаетесь с <a href="/privacy" className="text-white/30 underline hover:text-white/50 transition-colors">политикой обработки ПДн</a>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div>
                <div className="section-label mb-4">◆ Прямые контакты</div>
                <div className="space-y-4">
                  {[
                    { icon: "Mail", label: "Email", value: contactEmail },
                    { icon: "Phone", label: "Телефон", value: contactPhone },
                    { icon: "MapPin", label: "Адрес", value: contactAddress },
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
                    { title: "Проект КриптоМетры", href: "/cryptometry" },
                    { title: "Служба земельного поиска", href: "/directions/lss" },
                    { title: "Лаборатория ИИ", href: "/directions/ai-lab" },
                    { title: "Студия проектного креатива", href: "/directions/ai-production" },
                    { title: "Центр реализации активов", href: "/directions/fee-dev" },
                    { title: "Сотрудничество", href: "/partners" },
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