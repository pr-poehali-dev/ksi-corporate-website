import { useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";
import Icon from "@/components/ui/icon";
import { api, ApiError } from "@/lib/api";
import PhoneMessengersField, { MessengerValue, isValidPhoneRU } from "@/components/ksi/PhoneMessengersField";

export default function EarlyAccess() {
  const [form, setForm] = useState({ name: "", org: "", inn: "", email: "", phone: "", task: "", role: "" });
  const [messengers, setMessengers] = useState<MessengerValue[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const roles = [
    "Землевладелец",
    "Действующий девелопер",
    "Инвестор / партнёр",
    "Другое",
  ];

  const handleSubmit = async () => {
    if (!agreed) {
      setError("Необходимо дать согласие на обработку персональных данных");
      return;
    }
    if (!form.name.trim() || !form.org.trim() || !form.email.trim() || !form.role) {
      setError("Заполните обязательные поля: имя, организация, email и роль");
      return;
    }
    if (form.phone.trim() && !isValidPhoneRU(form.phone)) {
      setError("Введите корректный номер телефона");
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
        message: `[РАННИЙ ДОСТУП] ИНН: ${form.inn}. Задача: ${form.task}`,
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? (err.data?.error as string) || "Ошибка отправки" : "Не удалось отправить");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse, #00d4ff 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-ibm text-green-400/80 text-xs tracking-[0.2em] uppercase">Ранний доступ открыт</span>
          </div>
          <h1 className="font-oswald text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
            Запросить<br /><span className="text-gradient-main">ранний доступ</span>
          </h1>
          <p className="font-ibm text-white/50 text-lg max-w-2xl mx-auto">
            Подключитесь к интеллекту виртуального девелопера. Поставьте реальную задачу. 
            Станьте соавтором системы.
          </p>
        </div>
      </section>

      {/* Что вы получаете */}
      <section className="py-16 border-y border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "Brain",
                title: "Интеллект девелопера",
                desc: "Доступ к системе АО КСИ: сотрудники + ИИ-инструменты решают вашу реальную задачу.",
              },
              {
                icon: "Coins",
                title: "КриптоМетры",
                desc: "За каждую поставленную задачу начисляются КриптоМетры — единицы вашего участия в системе.",
              },
              {
                icon: "Star",
                title: "Статус соавтора",
                desc: "Ранние участники получают проектные привилегии и статус соавтора виртуального девелопера.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <Icon name={item.icon as "Brain"} size={22} className="text-ksi-cyan/60 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-oswald text-white text-lg font-medium mb-1">{item.title}</div>
                  <div className="font-ibm text-white/40 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Условия */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-oswald text-3xl font-semibold text-white mb-8">Условия участия</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { icon: "Building", text: "Только юридические лица (ООО, АО, ИП)" },
              { icon: "FileCheck", text: "Работа по НДС" },
              { icon: "Handshake", text: "Договорная основа" },
              { icon: "ShieldCheck", text: "Полный документооборот" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 p-4 border border-white/8 bg-white/[0.02] rounded-sm">
                <Icon name={item.icon as "Building"} size={16} className="text-ksi-cyan/50 flex-shrink-0" />
                <span className="font-ibm text-white/55 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Шаги */}
          <div className="mb-12">
            <h3 className="font-oswald text-xl font-medium text-white mb-6">Как начать: 3 шага</h3>
            <div className="space-y-4">
              {[
                { step: "01", title: "Заполните заявку", desc: "Укажите вашу роль, организацию и задачу, с которой хотите начать." },
                { step: "02", title: "Мы рассматриваем запрос", desc: "В течение 24 часов. Уточним задачу, расскажем о формате работы." },
                { step: "03", title: "Подписываем договор и начинаем", desc: "Договор, НДС, документооборот. Первая задача запускает обучение системы." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <span className="font-ibm text-ksi-cyan/40 text-sm font-bold w-8 flex-shrink-0">{item.step}</span>
                  <div>
                    <div className="font-oswald text-white font-medium mb-0.5">{item.title}</div>
                    <div className="font-ibm text-white/40 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Форма */}
          {!sent ? (
            <div className="border border-white/10 bg-white/[0.02] p-8 rounded-sm">
              <h3 className="font-oswald text-2xl font-semibold text-white mb-6">Заявка на ранний доступ</h3>

              {/* Роль */}
              <div className="mb-5">
                <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-2">Ваша роль *</div>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => setForm({ ...form, role: r })}
                      className={`px-4 py-2.5 text-sm font-ibm border rounded-sm transition-all text-left ${
                        form.role === r ? "border-ksi-cyan text-ksi-cyan bg-ksi-cyan/5" : "border-white/15 text-white/45 hover:border-white/30"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Имя *</div>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50"
                    placeholder="Иван Иванов" />
                </div>
                <div>
                  <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Организация *</div>
                  <input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })}
                    className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50"
                    placeholder="ООО «Название»" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">ИНН организации</div>
                  <input value={form.inn} onChange={(e) => setForm({ ...form, inn: e.target.value })}
                    className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50"
                    placeholder="0000000000" />
                </div>
                <div>
                  <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Email *</div>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    type="email"
                    className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50"
                    placeholder="email@company.ru" />
                </div>
              </div>

              <div className="mb-4">
                <PhoneMessengersField phone={form.phone} messengers={messengers}
                  onPhoneChange={(v) => setForm({ ...form, phone: v })}
                  onMessengersChange={setMessengers} />
              </div>

              <div className="mb-6">
                <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Задача, с которой хотите начать</div>
                <textarea value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50 resize-none"
                  placeholder="Опишите задачу: участок, проект, идея, проблема..." />
              </div>

              {/* Согласие на обработку ПД */}
              <label className="flex items-start gap-3 cursor-pointer mb-5">
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

              {error && <div className="text-red-400 font-ibm text-sm mb-4">{error}</div>}

              <button onClick={handleSubmit} disabled={sending || !agreed}
                className="btn-primary-ksi w-full py-3.5 text-sm font-medium rounded-sm disabled:opacity-50">
                {sending ? "Отправляем..." : "Отправить заявку"}
              </button>
            </div>
          ) : (
            <div className="border border-ksi-cyan/20 bg-ksi-cyan/5 p-8 rounded-sm text-center">
              <Icon name="CheckCircle" size={40} className="text-ksi-cyan mx-auto mb-4" />
              <h3 className="font-oswald text-2xl font-semibold text-white mb-2">Заявка получена</h3>
              <p className="font-ibm text-white/50 text-sm">
                Мы рассмотрим ваш запрос в течение 24 часов и свяжемся с вами.
              </p>
            </div>
          )}
        </div>
      </section>

      <NewFooter />
    </div>
  );
}