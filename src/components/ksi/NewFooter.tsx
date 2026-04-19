import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/28655df5-bb72-4ef7-ba50-ca96e9a5ae13.png";

export function NewFooter() {
  return (
    <footer className="border-t border-white/8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Верхняя часть */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Логотип и описание */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="КСИ" className="w-8 h-8 object-contain" />
              <span className="font-oswald text-white font-semibold tracking-wide">АО КСИ</span>
            </Link>
            <p className="font-ibm text-white/30 text-sm leading-relaxed">
              Виртуальный девелопер. Доступ к интеллекту — для юридических лиц.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <div className="font-ibm text-white/20 text-xs tracking-[0.15em] uppercase mb-4">Доступ</div>
            <ul className="space-y-2">
              {[
                { label: "Ранний доступ", href: "/early-access" },
                { label: "Стоимость", href: "/pricing" },
                { label: "Стать соавтором", href: "/coauthor" },
                { label: "Персональное приглашение", href: "/contacts" },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-ibm text-white/40 hover:text-white/70 text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-ibm text-white/20 text-xs tracking-[0.15em] uppercase mb-4">Система</div>
            <ul className="space-y-2">
              {[
                { label: "Правовая основа", href: "/legal" },
                { label: "Проекты", href: "/projects" },
                { label: "Реквизиты", href: "/requisites" },
                { label: "Документы", href: "/documents" },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-ibm text-white/40 hover:text-white/70 text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA в футере */}
          <div>
            <div className="font-ibm text-white/20 text-xs tracking-[0.15em] uppercase mb-4">Начать</div>
            <p className="font-ibm text-white/35 text-sm mb-4 leading-relaxed">
              Ранний доступ открыт. Только для юридических лиц.
            </p>
            <Link to="/early-access" className="btn-primary-ksi inline-flex px-5 py-2.5 text-sm rounded-sm">
              Запросить доступ
            </Link>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-ibm text-white/20 text-xs">
            © 2023–2025 АО «КриптоСтройИнвест». Все права защищены.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="font-ibm text-white/20 hover:text-white/40 text-xs transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="font-ibm text-white/20 hover:text-white/40 text-xs transition-colors">
              Условия использования
            </Link>
          </div>
          <div className="font-ibm text-white/15 text-xs flex items-center gap-1">
            <Icon name="Lock" size={10} />
            B2B · НДС · Только юридические лица
          </div>
        </div>
      </div>
    </footer>
  );
}
