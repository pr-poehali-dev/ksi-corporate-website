import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/aa865952-a04a-4fb8-b8c0-6cf619baf76c.png";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const half = Math.ceil(NAV_ITEMS.length / 2);
  const leftNav = NAV_ITEMS.slice(0, half);
  const rightNav = NAV_ITEMS.slice(half);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-ksi-dark/95 backdrop-blur-md border-b border-ksi-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Левая группа навигации */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          {leftNav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
        </div>

        {/* Центр — логотип, всегда виден */}
        <div className="flex items-center justify-center mx-6 lg:mx-10">
          <a href="#" className="block navbar-logo-link" style={{ width: 36, height: 36 }}>
            <img
              src={LOGO_URL}
              alt="КСИ"
              className="w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.25))" }}
            />
          </a>
        </div>

        {/* Правая группа навигации */}
        <div className="hidden lg:flex items-center gap-6 flex-1">
          {rightNav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
          <a href="/contacts" className="btn-primary-ksi px-5 py-2 text-sm rounded-sm cursor-pointer ml-auto">
            Связаться
          </a>
        </div>

        {/* Мобильная кнопка */}
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
            Связаться
          </a>
        </div>
      )}
    </nav>
  );
}