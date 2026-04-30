import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { api, ApiError } from "@/lib/api";
import PhoneMessengersField, { MessengerValue, isValidPhoneRU } from "./PhoneMessengersField";

interface EarlyAccessModalProps {
  open: boolean;
  onClose: () => void;
}

const ROLES = ["Землевладелец", "Действующий девелопер", "Инвестор / партнёр", "Другое"];

export function EarlyAccessModal({ open, onClose }: EarlyAccessModalProps) {
  const [form, setForm] = useState({ name: "", org: "", inn: "", email: "", phone: "", task: "", role: "" });
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const reset = () => {
    setForm({ name: "", org: "", inn: "", email: "", phone: "", task: "", role: "" });
    setMessengers([]);
    setSent(false);
    setError("");
    setAgreed(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async () => {
    if (!agreed) { setError("Необходимо дать согласие на обработку персональных данных"); return; }
    if (!form.name.trim() || !form.org.trim() || !form.email.trim() || !form.role) {
      setError("Заполните обязательные поля: имя, организация, email и роль"); return;
    }
    if (form.phone.trim() && !isValidPhoneRU(form.phone)) {
      setError("Введите корректный номер телефона"); return;
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[998] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.80)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-2xl rounded-sm overflow-hidden flex flex-col"
        style={{
          background: "#0d0d12",
          border: "1px solid rgba(0,212,255,0.15)",
          boxShadow: "0 0 80px rgba(0,212,255,0.08), 0 40px 100px rgba(0,0,0,0.7)",
          maxHeight: "92vh",
        }}
      >
        {/* Шапка */}
        <div
          className="flex items-center justify-between px-8 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <div className="font-ibm text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(0,212,255,0.55)" }}>
              ◆ Ранний доступ открыт
            </div>
            <div className="font-oswald text-white text-xl font-semibold">Передать актив в работу</div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors flex-shrink-0"
            style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <Icon name="X" size={15} />
          </button>
        </div>

        {/* Тело — скроллируется */}
        <div className="overflow-y-auto flex-1 px-8 py-7">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
              >
                <Icon name="CheckCircle" size={32} className="text-ksi-cyan" />
              </div>
              <h3 className="font-oswald text-2xl text-white mb-2">Заявка получена</h3>
              <p className="font-ibm text-white/40 text-sm max-w-xs leading-relaxed">
                Мы рассмотрим ваш запрос в течение 24 часов и свяжемся с вами.
              </p>
              <button
                onClick={handleClose}
                className="mt-7 font-ibm text-sm px-8 py-3 rounded-sm transition-all"
                style={{ background: "#00d4ff", color: "#0a0a0f" }}
              >
                Закрыть
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Роль */}
              <div>
                <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-2">Ваша роль *</div>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      onClick={() => setForm({ ...form, role: r })}
                      className={`px-4 py-2.5 text-sm font-ibm border rounded-sm transition-all text-left ${
                        form.role === r
                          ? "border-ksi-cyan text-ksi-cyan bg-ksi-cyan/5"
                          : "border-white/15 text-white/45 hover:border-white/30"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Имя + Организация */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Имя *</div>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Организация *</div>
                  <input
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50"
                    placeholder="ООО «Название»"
                  />
                </div>
              </div>

              {/* ИНН + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">ИНН организации</div>
                  <input
                    value={form.inn}
                    onChange={(e) => setForm({ ...form, inn: e.target.value })}
                    className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50"
                    placeholder="0000000000"
                  />
                </div>
                <div>
                  <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Email *</div>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    type="email"
                    className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50"
                    placeholder="email@company.ru"
                  />
                </div>
              </div>

              {/* Телефон */}
              <PhoneMessengersField
                phone={form.phone}
                messengers={messengers}
                onPhoneChange={(v) => setForm({ ...form, phone: v })}
                onMessengersChange={setMessengers}
              />

              {/* Задача */}
              <div>
                <div className="font-ibm text-white/30 text-xs tracking-[0.1em] uppercase mb-1">Задача, с которой хотите начать</div>
                <textarea
                  value={form.task}
                  onChange={(e) => setForm({ ...form, task: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/12 text-white placeholder-white/20 px-4 py-2.5 text-sm font-ibm rounded-sm focus:outline-none focus:border-ksi-cyan/50 resize-none"
                  placeholder="Опишите задачу: участок, проект, идея, проблема..."
                />
              </div>

              {/* Согласие */}
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
                      <path d="M1 4L3.5 6.5L9 1" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="font-ibm text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Я даю согласие на обработку персональных данных в соответствии с{" "}
                  <Link
                    to="/privacy"
                    className="transition-colors"
                    style={{ color: "rgba(0,212,255,0.6)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,212,255,0.9)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,212,255,0.6)")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Политикой конфиденциальности
                  </Link>
                </span>
              </label>

              {error && <div className="text-red-400 font-ibm text-sm">{error}</div>}

              <button
                onClick={handleSubmit}
                disabled={sending || !agreed}
                className="btn-primary-ksi w-full py-3.5 text-sm font-medium rounded-sm disabled:opacity-50"
              >
                {sending ? "Отправляем..." : "Отправить заявку"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
