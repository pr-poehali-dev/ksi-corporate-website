import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/aa865952-a04a-4fb8-b8c0-6cf619baf76c.png";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leftNav = NAV_ITEMS.slice(0, 4);
  const rightNav = NAV_ITEMS.slice(4);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-ksi-dark/95 backdrop-blur-md border-b border-ksi-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center relative">

        {/* На старте: все ссылки в одну строку по центру */}
        {/* При скролле: разбиваются влево/вправо, по центру — логотип */}

        {/* Левая группа */}
        <div className={`hidden lg:flex items-center gap-6 transition-all duration-500 ${scrolled ? "flex-1 justify-end" : "flex-1 justify-center"}`}>
          {scrolled
            ? leftNav.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
              ))
            : NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
              ))
          }
        </div>

        {/* Центр — логотип, появляется при скролле */}
        <div className={`hidden lg:flex items-center justify-center transition-all duration-500 ${scrolled ? "w-14 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
          <a href="/" className="navbar-logo-link block" style={{ width: 34, height: 34, flexShrink: 0 }}>
            <img
              src={LOGO_URL}
              alt="КСИ"
              className="w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.3))" }}
            />
          </a>
        </div>

        {/* Правая группа — только при скролле */}
        <div className={`hidden lg:flex items-center gap-6 transition-all duration-500 ${scrolled ? "flex-1 opacity-100" : "flex-1 opacity-0 pointer-events-none w-0 overflow-hidden"}`}>
          {rightNav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
          <a href="/contacts" className="btn-primary-ksi px-5 py-2 text-sm rounded-sm cursor-pointer ml-auto">
            Связаться
          </a>
        </div>

        {/* Кнопка "Связаться" на старте (без скролла) */}
        <div className={`hidden lg:block transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none absolute" : "opacity-100"}`}>
          <a href="/contacts" className="btn-primary-ksi px-5 py-2 text-sm rounded-sm cursor-pointer">
            Связаться
          </a>
        </div>

        {/* Мобильная кнопка */}
        <button className="lg:hidden text-white/60 hover:text-white ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
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
