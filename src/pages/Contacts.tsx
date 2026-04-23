import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";
import Icon from "@/components/ui/icon";
import { api, ApiError } from "@/lib/api";
import PhoneMessengersField, { MessengerValue, isValidPhoneRU } from "@/components/ksi/PhoneMessengersField";

const ROLE_OPTIONS = [
  { id: "land", label: "Землевладелец" },
  { id: "developer", label: "Действующий девелопер" },
  { id: "investor", label: "Инвестор / партнёр" },
  { id: "other", label: "Другое" },
];

function buildPrefillMessage(params: URLSearchParams): string {
  const topic = params.get("topic") || "";
  const plan = params.get("plan") || "";
  const lines: string[] = [];
  if (topic) lines.push(`Тема: ${topic}`);
  if (plan) lines.push(`Формат: ${plan}`);
  return lines.join("\n");
}

export default function Contacts() {
  const [searchParams] = useSearchParams();
  const prefillMessage = buildPrefillMessage(searchParams);

  const [form, setForm] = useState({
    name: "", org: "", email: "", phone: "",
    role: "",
    message: prefillMessage,
  });
  const [messengers, setMessengers] = useState<MessengerValue[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("https://functions.poehali.dev/de77851c-6234-460f-903b-ca3df97ddc07")
      .then(r => r.json())
      .then(d => { if (d.settings) setSettings(d.settings); })
      .catch(() => {});
  }, []);

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
      setForm({ name: "", org: "", email: "", phone: "", role: "", message: "" });
      setMessengers([]);
    } catch (err) {
      setError(err instanceof ApiError ? (err.data?.error as string) || "Ошибка отправки" : "Не удалось отправить");
    } finally {
      setSending(false);
    }
  };

  const contactEmail = settings.email || "info@aoksi.ru";
  const contactPhone = settings.phone || "+7 (495) 000-00-00";

  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse, #00d4ff 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="section-label mb-4">◆ Персональное приглашение</div>
          <h1 className="font-oswald text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
            Это не форма обратной<br />
            связи.<br />
            <span className="text-gradient-main">Это приглашение.</span>
          </h1>
          <p className="font-ibm text-white/45 text-lg max-w-xl">
            АО КСИ ведёт предметный диалог с профессиональными участниками рынка. 
            Расскажите о задаче — мы ответим по существу.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Форма */}
            <div className="lg:col-span-3">
              {!sent ? (
                <div className="border border-white/10 bg-white/[0.02] p-8 rounded-sm">
                  <div className="font-ibm text-white/20 text-xs tracking-[0.2em] uppercase mb-6">
                    Форма персонального обращения
                  </div>

                  {/* Роль */}
                  <div className="mb-5">
                    <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-2">Ваша роль</div>
                    <div className="grid grid-cols-2 gap-2">
                      {ROLE_OPTIONS.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setForm({ ...form, role: r.id })}
                          className={`px-4 py-2.5 text-sm font-ibm border rounded-sm transition-all text-left ${
                            form.role === r.id
                              ? "border-ksi-cyan text-ksi-cyan bg-ksi-cyan/5"
                              : "border-white/12 text-white/40 hover:border-white/25"
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Имя *</div>
                      <input
                        type="text" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors"
                      />
                    </div>
                    <div>
                      <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Организация</div>
                      <input
                        type="text" value={form.org}
                        onChange={e => setForm({ ...form, org: e.target.value })}
                        placeholder="ООО «Название»"
                        className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Email *</div>
                    <input
                      type="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="email@company.ru"
                      className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors"
                    />
                  </div>

                  <div className="mb-4">
                    <PhoneMessengersField
                      phone={form.phone}
                      messengers={messengers}
                      onPhoneChange={v => setForm({ ...form, phone: v })}
                      onMessengersChange={setMessengers}
                    />
                  </div>

                  <div className="mb-6">
                    <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Суть запроса</div>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      placeholder="Опишите задачу, актив или вопрос. Чем конкретнее — тем предметнее наш ответ."
                      className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors resize-none"
                    />
                  </div>

                  {/* Согласие на обработку ПД */}
                  <label className="flex items-start gap-3 cursor-pointer mb-5 group">
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

                  {error && (
                    <div className="font-ibm text-red-400 text-sm mb-4">{error}</div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={sending || !agreed}
                    className="btn-primary-ksi w-full py-3.5 text-sm font-medium rounded-sm disabled:opacity-50"
                  >
                    {sending ? "Отправляем..." : "Отправить приглашение"}
                  </button>

                  <p className="font-ibm text-white/20 text-xs mt-4 text-center">
                    Только для юридических лиц · B2B · НДС
                  </p>
                </div>
              ) : (
                <div className="border border-ksi-cyan/20 bg-ksi-cyan/[0.04] p-10 rounded-sm text-center">
                  <div className="w-14 h-14 rounded-full border border-ksi-cyan/30 flex items-center justify-center mx-auto mb-5">
                    <Icon name="Check" size={26} className="text-ksi-cyan" />
                  </div>
                  <h3 className="font-oswald text-2xl font-semibold text-white mb-2">
                    Приглашение принято
                  </h3>
                  <p className="font-ibm text-white/40 text-sm max-w-sm mx-auto mb-6">
                    Мы получили ваше обращение и ответим в течение рабочего дня. 
                    Если задача срочная — напишите напрямую на email.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="font-ibm text-ksi-cyan/50 text-sm hover:text-ksi-cyan transition-colors"
                  >
                    Отправить ещё одно обращение
                  </button>
                </div>
              )}
            </div>

            {/* Боковая панель */}
            <div className="lg:col-span-2 space-y-6">
              {/* Как мы работаем */}
              <div className="border border-white/8 bg-white/[0.02] p-6 rounded-sm">
                <div className="font-ibm text-white/20 text-xs tracking-[0.15em] uppercase mb-4">
                  Как мы работаем с запросами
                </div>
                <div className="space-y-4">
                  {[
                    { step: "01", text: "Получаем обращение и изучаем задачу" },
                    { step: "02", text: "Отвечаем по существу — не шаблоном" },
                    { step: "03", text: "Предлагаем формат: звонок, встреча или документ" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <span className="font-ibm text-ksi-cyan/40 text-xs font-bold w-6 flex-shrink-0 mt-0.5">
                        {s.step}
                      </span>
                      <span className="font-ibm text-white/45 text-sm">{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Прямые контакты */}
              <div className="border border-white/8 bg-white/[0.02] p-6 rounded-sm">
                <div className="font-ibm text-white/20 text-xs tracking-[0.15em] uppercase mb-4">
                  Прямые контакты
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={16} className="text-ksi-cyan/40 flex-shrink-0" />
                    <a href={`mailto:${contactEmail}`}
                      className="font-ibm text-white/55 text-sm hover:text-ksi-cyan transition-colors">
                      {contactEmail}
                    </a>
                  </div>
                  {contactPhone && contactPhone !== "+7 (495) 000-00-00" && (
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={16} className="text-ksi-cyan/40 flex-shrink-0" />
                      <a href={`tel:${contactPhone.replace(/\D/g, "")}`}
                        className="font-ibm text-white/55 text-sm hover:text-ksi-cyan transition-colors">
                        {contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Сроки ответа */}
              <div className="border border-white/8 bg-white/[0.02] p-6 rounded-sm">
                <div className="font-ibm text-white/20 text-xs tracking-[0.15em] uppercase mb-4">
                  Сроки ответа
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-ibm text-white/40 text-sm">Стандарт</span>
                    <span className="font-ibm text-white/60 text-sm">до 24 часов</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-ibm text-white/40 text-sm">Срочно</span>
                    <span className="font-ibm text-ksi-cyan/70 text-sm">до 12 часов</span>
                  </div>
                </div>
              </div>

              {/* Ссылки */}
              <div className="space-y-2">
                <Link to="/early-access"
                  className="flex items-center justify-between p-4 border border-white/8 hover:border-ksi-cyan/25 bg-white/[0.02] rounded-sm group transition-all">
                  <span className="font-ibm text-white/50 text-sm group-hover:text-white/80 transition-colors">
                    Запросить ранний доступ
                  </span>
                  <Icon name="ArrowRight" size={14} className="text-white/25 group-hover:text-ksi-cyan transition-colors" />
                </Link>
                <Link to="/requisites"
                  className="flex items-center justify-between p-4 border border-white/8 hover:border-white/15 bg-white/[0.02] rounded-sm group transition-all">
                  <span className="font-ibm text-white/35 text-sm group-hover:text-white/60 transition-colors">
                    Реквизиты АО КСИ
                  </span>
                  <Icon name="ArrowRight" size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}