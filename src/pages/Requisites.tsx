import { useEffect, useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

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

  const rows = [
    { label: "Полное наименование", value: s.company_full_name || "АО «КриптоСтройИнвест»", icon: "Building2" },
    { label: "Сокращённое наименование", value: s.company_short_name || "АО КСИ", icon: "Tag" },
    { label: "ОГРН", value: s.ogrn, icon: "Hash" },
    { label: "ИНН", value: s.inn, icon: "Hash" },
    { label: "КПП", value: s.kpp, icon: "Hash" },
    { label: "Юридический адрес", value: s.legal_address, icon: "MapPin" },
    { label: "Фактический адрес", value: s.actual_address, icon: "MapPin" },
    { label: "Генеральный директор", value: s.ceo_name, icon: "User" },
    { label: "Расчётный счёт", value: s.bank_account, icon: "Landmark" },
    { label: "Банк", value: s.bank_name, icon: "Landmark" },
    { label: "БИК", value: s.bank_bik, icon: "Hash" },
    { label: "Корр. счёт", value: s.bank_corr_account, icon: "Hash" },
    { label: "Email", value: s.email, icon: "Mail" },
    { label: "Телефон", value: s.phone, icon: "Phone" },
  ].filter(r => r.value);

  return (
    <PageLayout breadcrumb={[{ label: "Реквизиты" }]}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-oswald text-2xl md:text-3xl font-semibold text-white mb-2 uppercase tracking-wider">
          Реквизиты
        </h1>
        <p className="font-ibm text-white/40 text-sm mb-10">
          Оператор интеллектуальной инфраструктуры для девелопмента. Управляющая компания проекта «КриптоМетры».
        </p>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-12 bg-white/5 rounded-sm animate-pulse" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="FileQuestion" size={40} className="text-white/15 mx-auto mb-4" />
            <p className="font-ibm text-white/35 text-sm">Реквизиты пока не заполнены</p>
            <p className="font-ibm text-white/20 text-xs mt-1">Данные появятся после настройки в панели управления</p>
          </div>
        ) : (
          <div className="rounded-sm overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {rows.map((row, i) => (
              <div
                key={row.label}
                className="flex items-center gap-4 px-6 py-4"
                style={{
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                  style={{ borderLeft: "2px solid rgba(0,212,255,0.25)" }}>
                  <Icon name={row.icon} size={14} className="text-ksi-cyan/50" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-ibm text-white/25 text-[10px] tracking-widest uppercase mb-0.5">{row.label}</div>
                  <div className="font-ibm text-white/70 text-sm break-all">{row.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="font-ibm text-white/20 text-xs leading-relaxed">
            Компания не осуществляет публичного привлечения денежных средств.
            Отдельные модели участия реализуются в рамках специальных юридических
            конструкций и партнёрских механизмов, формируемых индивидуально.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
