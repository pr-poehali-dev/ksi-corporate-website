import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Reveal } from "./Reveal";

export function LegalPreviewSection() {
  return (
    <section className="py-20 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal delay={0}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: "Building2",
                title: "АО «КриптоСтройИнвест»",
                desc: "Акционерное общество, зарегистрированное в соответствии с законодательством РФ.",
              },
              {
                icon: "Receipt",
                title: "НДС / ОСН",
                desc: "Работаем по общей системе налогообложения. Полный пакет закрывающих документов.",
              },
              {
                icon: "Shield",
                title: "ФЗ-152",
                desc: "Обработка персональных данных в строгом соответствии с требованиями закона.",
              },
              {
                icon: "Scale",
                title: "КриптоМетры ≠ ценные бумаги",
                desc: "Расчётные единицы системы. Не финансовый инструмент. Правовая позиция задокументирована.",
              },
            ].map((item) => (
              <div key={item.title} className="p-5 border border-white/8 bg-white/[0.02] rounded-sm">
                <Icon name={item.icon as "Building2"} size={18} className="text-ksi-cyan/45 mb-3" />
                <div className="font-oswald text-white text-base font-medium mb-1.5">{item.title}</div>
                <div className="font-ibm text-white/35 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/6 bg-white/[0.015] px-6 py-4 rounded-sm">
            <div className="flex items-center gap-3">
              <Icon name="FileText" size={16} className="text-white/25" />
              <span className="font-ibm text-white/35 text-sm">
                Правовая основа АО КСИ — в открытом доступе
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/legal" className="font-ibm text-ksi-cyan/55 hover:text-ksi-cyan text-sm transition-colors flex items-center gap-1">
                Правовая основа <Icon name="ArrowRight" size={12} />
              </Link>
              <Link to="/requisites" className="font-ibm text-white/30 hover:text-white/55 text-sm transition-colors flex items-center gap-1">
                Реквизиты <Icon name="ArrowRight" size={12} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}