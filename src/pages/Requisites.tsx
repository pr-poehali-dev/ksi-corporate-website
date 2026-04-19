import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";
import Icon from "@/components/ui/icon";

const GROUPS = [
  {
    label: "Регистрационные данные",
    icon: "Building2",
    keys: [
      { label: "Полное наименование", key: "company_full_name", fallback: "АО «КриптоСтройИнвест»" },
      { label: "Сокращённое наименование", key: "company_short_name", fallback: "АО КСИ" },
      { label: "ОГРН", key: "ogrn" },
      { label: "ИНН", key: "inn" },
      { label: "КПП", key: "kpp" },
      { label: "Генеральный директор", key: "ceo_name" },
    ],
  },
  {
    label: "Адреса",
    icon: "MapPin",
    keys: [
      { label: "Юридический адрес", key: "legal_address" },
      { label: "Фактический адрес", key: "actual_address" },
    ],
  },
  {
    label: "Банковские реквизиты",
    icon: "Landmark",
    keys: [
      { label: "Расчётный счёт", key: "bank_account" },
      { label: "Банк", key: "bank_name" },
      { label: "БИК", key: "bank_bik" },
      { label: "Корр. счёт", key: "bank_corr_account" },
    ],
  },
  {
    label: "Контакты",
    icon: "Mail",
    keys: [
      { label: "Email", key: "email" },
      { label: "Телефон", key: "phone" },
    ],
  },
];

export default function Requisites() {
  const [s, setS] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://functions.poehali.dev/de77851c-6234-460f-903b-ca3df97ddc07")
      .then(r => r.json())
      .then(d => { if (d.settings) setS(d.settings); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse, #00d4ff 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="section-label mb-4">◆ Документы</div>
          <h1 className="font-oswald text-5xl font-semibold text-white mb-4 leading-tight">
            Реквизиты<br /><span className="text-gradient-main">АО КСИ</span>
          </h1>
          <p className="font-ibm text-white/40 text-base max-w-lg">
            Официальные реквизиты АО «КриптоСтройИнвест» для договорной работы и документооборота.
          </p>
        </div>
      </section>

      {/* Реквизиты */}
      <section className="py-12 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-14 bg-white/[0.04] rounded-sm animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {GROUPS.map((group) => {
                const rows = group.keys
                  .map(k => ({ label: k.label, value: s[k.key] || k.fallback || "" }))
                  .filter(r => r.value);
                if (rows.length === 0) return null;
                return (
                  <div key={group.label} className="border border-white/8 rounded-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.03] border-b border-white/6">
                      <Icon name={group.icon as "Building2"} size={14} className="text-ksi-cyan/50" />
                      <span className="font-ibm text-white/25 text-xs tracking-[0.15em] uppercase">{group.label}</span>
                    </div>
                    {rows.map((row, i) => (
                      <div
                        key={row.label}
                        className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4 ${i < rows.length - 1 ? "border-b border-white/[0.05]" : ""}`}
                      >
                        <div className="font-ibm text-white/30 text-xs w-52 flex-shrink-0">{row.label}</div>
                        <div className="font-ibm text-white/70 text-sm break-all">{row.value}</div>
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Дисклеймер */}
              <div className="border border-white/6 bg-white/[0.015] p-6 rounded-sm">
                <p className="font-ibm text-white/25 text-xs leading-relaxed">
                  Компания не осуществляет публичного привлечения денежных средств. 
                  Отдельные модели участия реализуются в рамках специальных юридических конструкций 
                  и партнёрских механизмов, формируемых индивидуально.
                </p>
              </div>

              {/* Ссылки */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/documents"
                  className="flex items-center justify-between gap-3 flex-1 p-4 border border-white/8 hover:border-white/15 bg-white/[0.02] rounded-sm group transition-all">
                  <div className="flex items-center gap-3">
                    <Icon name="FileText" size={16} className="text-ksi-cyan/40" />
                    <span className="font-ibm text-white/45 text-sm group-hover:text-white/70 transition-colors">Документы</span>
                  </div>
                  <Icon name="ArrowRight" size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </Link>
                <Link to="/legal"
                  className="flex items-center justify-between gap-3 flex-1 p-4 border border-white/8 hover:border-white/15 bg-white/[0.02] rounded-sm group transition-all">
                  <div className="flex items-center gap-3">
                    <Icon name="Scale" size={16} className="text-ksi-cyan/40" />
                    <span className="font-ibm text-white/45 text-sm group-hover:text-white/70 transition-colors">Правовая основа</span>
                  </div>
                  <Icon name="ArrowRight" size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
