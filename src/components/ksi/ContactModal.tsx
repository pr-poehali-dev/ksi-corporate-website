import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { api, ApiError } from "@/lib/api";
import PhoneMessengersField, { MessengerValue, isValidPhoneRU } from "./PhoneMessengersField";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  defaultMessage?: string;
}

export function ContactModal({ open, onClose, defaultMessage = "" }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "", message: defaultMessage, role: "" });
  const [messengers, setMessengers] = useState<MessengerValue[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const reset = () => {
    setForm({ name: "", org: "", email: "", phone: "", message: defaultMessage, role: "" });
    setMessengers([]);
    setSent(false);
    setError("");
    setAgreed(false);
  };

  const handleClose = () => { reset(); onClose(); };

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-xl rounded-sm overflow-hidden"
        style={{
          background: "#0d0d12",
          border: "1px solid rgba(0,212,255,0.15)",
          boxShadow: "0 0 60px rgba(0,212,255,0.08), 0 30px 80px rgba(0,0,0,0.6)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between px-8 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <div className="font-ibm text-[10px] tracking-[0.22em] uppercase mb-1"
              style={{ color: "rgba(0,212,255,0.55)" }}>◆ Запрос предложения</div>
            <div className="font-oswald text-white text-xl font-semibold">Обратная связь</div>
          </div>
          <button onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <Icon name="X" size={15} />
          </button>
        </div>

        {/* Тело */}
        <div className="px-8 py-7">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <Icon name="Check" size={28} className="text-ksi-cyan" />
              </div>
              <h3 className="font-oswald text-xl text-white mb-2">Обращение отправлено</h3>
              <p className="font-ibm text-white/40 text-sm max-w-xs leading-relaxed">
                Мы получили ваш запрос и ответим в течение рабочего дня.
              </p>
              <button onClick={handleClose}
                className="mt-7 font-ibm text-sm px-8 py-3 rounded-sm transition-all"
                style={{ background: "#00d4ff", color: "#0a0a0f" }}>
                Закрыть
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-ibm text-white/30 text-[10px] tracking-widest block mb-1.5 uppercase">Имя *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
                </div>
                <div>
                  <label className="font-ibm text-white/30 text-[10px] tracking-widest block mb-1.5 uppercase">Организация</label>
                  <input type="text" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })}
                    placeholder="Компания"
                    className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-ibm text-white/30 text-[10px] tracking-widest block mb-1.5 uppercase">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors" />
              </div>
              <PhoneMessengersField
                phone={form.phone}
                messengers={messengers}
                onPhoneChange={v => setForm({ ...form, phone: v })}
                onMessengersChange={setMessengers}
              />
              <div>
                <label className="font-ibm text-white/30 text-[10px] tracking-widest block mb-1.5 uppercase">Вы представляете</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/60 text-sm focus:outline-none focus:border-ksi-cyan/40 transition-colors">
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
                <label className="font-ibm text-white/30 text-[10px] tracking-widest block mb-1.5 uppercase">Суть запроса</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Кратко опишите задачу или вопрос..."
                  rows={4}
                  className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors resize-none" />
              </div>

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
                    onClick={e => { e.stopPropagation(); handleClose(); }}>
                    Политикой конфиденциальности
                  </Link>
                </span>
              </label>

              {error && (
                <div className="flex items-center gap-2 text-red-400/80 text-sm font-ibm">
                  <Icon name="AlertCircle" size={14} />
                  {error}
                </div>
              )}

              <button onClick={handleSubmit} disabled={sending || !agreed}
                className="w-full py-4 rounded-sm text-sm font-ibm font-semibold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                style={{ background: "#00d4ff", color: "#0a0a0f", boxShadow: "0 0 24px rgba(0,212,255,0.2)" }}
                onMouseEnter={e => !sending && agreed && (e.currentTarget.style.boxShadow = "0 0 40px rgba(0,212,255,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,255,0.2)")}
              >
                {sending && <Icon name="Loader2" size={16} className="animate-spin" />}
                {sending ? "Отправка..." : "Отправить обращение"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}