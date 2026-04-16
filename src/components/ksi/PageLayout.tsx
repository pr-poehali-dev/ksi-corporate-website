import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";
import { useAuth } from "@/contexts/AuthContext";

const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/28655df5-bb72-4ef7-ba50-ca96e9a5ae13.png";

function SiteNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const cabinetLink = user ? (user.user_type === "internal" ? "/admin" : "/cabinet") : "/auth/login";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = typeof window !== "undefined" ? window.location.pathname : "";
  const half = Math.ceil(NAV_ITEMS.length / 2);
  const leftNav = NAV_ITEMS.slice(0, half);
  const rightNav = NAV_ITEMS.slice(half);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-ksi-dark/95 backdrop-blur-md border-b border-ksi-border" : "bg-ksi-dark/80 backdrop-blur-sm border-b border-ksi-border/50"}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          {leftNav.map((item) => (
            <Link key={item.href} to={item.href} className="nav-link"
              style={current === item.href ? { color: "var(--ksi-cyan)" } : {}}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center mx-6 lg:mx-10">
          <Link to="/" className="block" style={{ width: 36, height: 36 }}>
            <img
              src={LOGO_URL}
              alt="КСИ"
              className="w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.25))" }}
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6 flex-1">
          {rightNav.map((item) => (
            <Link key={item.href} to={item.href} className="nav-link"
              style={current === item.href ? { color: "var(--ksi-cyan)" } : {}}>
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/contacts" className="btn-primary-ksi px-5 py-2 text-sm rounded-sm cursor-pointer">
              Написать нам
            </Link>
            <Link to={cabinetLink} className="flex items-center gap-1.5 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-400/80 hover:text-cyan-300 transition-all text-sm px-4 py-2 rounded-sm">
              <Icon name={user ? "LayoutDashboard" : "LogIn"} size={16} />
              {user ? "Кабинет" : "Войти"}
            </Link>
          </div>
        </div>

        <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-ksi-dark/98 border-t border-ksi-border px-6 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} to={item.href} className="block nav-link py-2" onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/contacts" className="block btn-primary-ksi px-5 py-2 text-sm rounded-sm text-center mt-4" onClick={() => setMobileOpen(false)}>
            Написать нам
          </Link>
          <Link to={cabinetLink} className="flex items-center justify-center gap-1.5 border border-cyan-500/30 text-cyan-400/80 hover:text-cyan-300 transition-all text-sm py-2 mt-2 rounded-sm" onClick={() => setMobileOpen(false)}>
            <Icon name={user ? "LayoutDashboard" : "LogIn"} size={16} />
            {user ? "Кабинет" : "Войти"}
          </Link>
        </div>
      )}
    </nav>
  );
}

function SiteFooter() {
  const [s, setS] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("https://functions.poehali.dev/de77851c-6234-460f-903b-ca3df97ddc07")
      .then(r => r.json())
      .then(d => { if (d.settings) setS(d.settings); })
      .catch(() => {});
  }, []);

  const companyName = s.company_full_name || "АО «КриптоСтройИнвест»";
  const ogrn = s.ogrn || "";
  const inn = s.inn || "";
  const addr = s.actual_address || "Москва, Россия";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ksi-border py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/">
                <img
                  src={LOGO_URL}
                  alt="КСИ"
                  className="h-10 w-auto flex-shrink-0"
                  style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.25))" }}
                />
              </Link>
              <span className="font-oswald font-semibold text-white tracking-widest uppercase text-sm">{s.company_short_name || "АО КриптоСтройИнвест"}</span>
            </div>
            <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-xs mb-4">
              Оператор интеллектуальной инфраструктуры для девелопмента. Управляющая компания проекта «КриптоМетры».
            </p>
            <p className="font-ibm text-white/20 text-xs leading-relaxed max-w-sm">
              Компания не осуществляет публичного привлечения денежных средств.
              Отдельные модели участия реализуются в рамках специальных юридических конструкций.
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
                {[
                  { label: "Дорожная карта", href: "/roadmap" },
                  { label: "Глоссарий", href: "/glossary" },
                  { label: "Политика ПДн", href: "/privacy" },
                ].map((l) => (
                  <Link key={l.href} to={l.href} className="block font-ibm text-white/20 text-xs hover:text-white/40 transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ksi-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-ibm text-white/25 text-xs">© {year} {companyName}. Все права защищены.</div>
          <div className="font-ibm text-white/20 text-xs text-center md:text-right max-w-md">
            {ogrn && <>ОГРН: {ogrn} · </>}{inn && <>ИНН: {inn} · </>}{addr}
          </div>
        </div>
      </div>
    </footer>
  );
}

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

export default function PageLayout({ children, breadcrumb }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-ksi-dark text-white flex flex-col">
      <SiteNavBar />
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="pt-20 border-b border-ksi-border/30">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2">
            <Link to="/" className="font-mono-ibm text-white/30 text-xs hover:text-white/50 transition-colors">Главная</Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-white/15 text-xs">/</span>
                {crumb.href ? (
                  <Link to={crumb.href} className="font-mono-ibm text-white/30 text-xs hover:text-white/50 transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="font-mono-ibm text-ksi-cyan/60 text-xs">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
      <main className={breadcrumb ? "" : "pt-20"}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}