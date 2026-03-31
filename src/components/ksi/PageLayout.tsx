import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

function SiteNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-ksi-dark/95 backdrop-blur-md border-b border-ksi-border" : "bg-ksi-dark/80 backdrop-blur-sm border-b border-ksi-border/50"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/6cc3c0d3-b169-4aea-b654-cf24515a3fb0.png"
            alt="КСИ"
            className="h-9 w-auto flex-shrink-0"
          />
          <div className="font-mono-ibm text-white/50 text-[9px] tracking-widest hidden sm:block">КриптоСтройИнвест</div>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              style={current === item.href ? { color: "var(--ksi-cyan)" } : {}}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href="/contacts" className="hidden lg:block btn-primary-ksi px-5 py-2 text-sm rounded-sm cursor-pointer">
          Написать нам
        </a>

        <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-ksi-dark/98 border-t border-ksi-border px-6 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="block nav-link py-2" onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="/contacts" className="block btn-primary-ksi px-5 py-2 text-sm rounded-sm text-center mt-4" onClick={() => setMobileOpen(false)}>
            Написать нам
          </a>
        </div>
      )}
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-ksi-border py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/6cc3c0d3-b169-4aea-b654-cf24515a3fb0.png"
                alt="КСИ"
                className="h-10 w-auto flex-shrink-0"
              />
              <span className="font-oswald font-semibold text-white tracking-widest uppercase text-sm">АО КриптоСтройИнвест</span>
            </div>
            <p className="font-ibm text-white/35 text-sm leading-relaxed max-w-xs mb-4">
              Цифровая девелоперская группа. Недвижимость. Технологии. Инфраструктура.
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
                <a key={item.href} href={item.href} className="block font-ibm text-white/40 text-sm hover:text-white/70 transition-colors">{item.label}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono-ibm text-white/30 text-xs tracking-widest mb-4">ПРОДУКТЫ</div>
            <div className="space-y-2">
              {[
                { label: "КриптоМетры", href: "/directions/cryptometry" },
                { label: "Лаборатория ИИ", href: "/directions/ai-lab" },
                { label: "LSS", href: "/directions/lss" },
                { label: "ИИ-продакшн", href: "/directions/ai-production" },
                { label: "Fee-Dev Platform", href: "/directions/fee-dev" },
              ].map((p) => (
                <a key={p.href} href={p.href} className="block font-ibm text-white/40 text-sm hover:text-white/70 transition-colors">{p.label}</a>
              ))}
            </div>
            <div className="mt-6">
              <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-2">ПРАВОВОЕ</div>
              <div className="space-y-1">
                {[
                  { label: "Документы", href: "/documents" },
                  { label: "Политика конфиденциальности", href: "/documents" },
                ].map((l) => (
                  <a key={l.href} href={l.href} className="block font-ibm text-white/25 text-xs hover:text-white/45 transition-colors">{l.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ksi-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-ibm text-white/25 text-xs">© 2024 АО «КриптоСтройИнвест». Все права защищены.</div>
          <div className="font-ibm text-white/20 text-xs text-center md:text-right max-w-md">
            ОГРН: 0000000000000 · ИНН: 0000000000 · Москва, Россия
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
            <a href="/" className="font-mono-ibm text-white/30 text-xs hover:text-white/50 transition-colors">Главная</a>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-white/15 text-xs">/</span>
                {crumb.href ? (
                  <a href={crumb.href} className="font-mono-ibm text-white/30 text-xs hover:text-white/50 transition-colors">{crumb.label}</a>
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