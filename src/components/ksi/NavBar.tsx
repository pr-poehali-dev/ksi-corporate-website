import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";
import { useAuth } from "@/contexts/AuthContext";

const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/93eb9bc4-b664-470c-ae35-71d7454ce9b4.png";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const cabinetLink = user ? (user.user_type === "internal" ? "/admin" : "/cabinet") : "/auth/login";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leftNav = NAV_ITEMS.slice(0, 4);
  const rightNav = NAV_ITEMS.slice(4);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-ksi-dark/95 backdrop-blur-md border-b border-ksi-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Десктоп: левая часть меню */}
        <div className="hidden md:flex items-center gap-5 flex-shrink-0">
          {leftNav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
        </div>

        {/* Логотип по центру — раздвигается при скролле */}
        <div
          className="hidden md:flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-700 ease-in-out"
          style={{
            width: scrolled ? 44 : 0,
            opacity: scrolled ? 1 : 0,
            marginLeft: scrolled ? 16 : 0,
            marginRight: scrolled ? 16 : 0,
          }}
        >
          <a href="/" className="navbar-logo-link block flex-shrink-0" style={{ width: 30, height: 30 }}>
            <img
              src={LOGO_URL}
              alt="КСИ"
              className="w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.3))" }}
            />
          </a>
        </div>

        {/* Десктоп: правая часть меню + кнопка */}
        <div className="hidden md:flex items-center gap-5 flex-shrink-0">
          {rightNav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
          <a href="/contacts" className="btn-primary-ksi px-5 py-2 text-sm rounded-sm cursor-pointer ml-3">
            Связаться
          </a>
          <a href={cabinetLink} className="flex items-center gap-1.5 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-400/80 hover:text-cyan-300 transition-all text-sm ml-3 px-4 py-2 rounded-sm">
            <Icon name={user ? "LayoutDashboard" : "LogIn"} size={16} />
            {user ? "Кабинет" : "Войти"}
          </a>
        </div>

        {/* Мобильная кнопка */}
        <button className="md:hidden text-white/60 hover:text-white ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-ksi-dark/98 border-t border-ksi-border px-6 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="block nav-link py-2" onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="/contacts" className="block btn-primary-ksi px-5 py-2 text-sm rounded-sm text-center mt-4" onClick={() => setMobileOpen(false)}>
            Связаться
          </a>
          <a href={cabinetLink} className="flex items-center justify-center gap-1.5 border border-cyan-500/30 text-cyan-400/80 hover:text-cyan-300 transition-all text-sm py-2 mt-2 rounded-sm" onClick={() => setMobileOpen(false)}>
            <Icon name={user ? "LayoutDashboard" : "LogIn"} size={16} />
            {user ? "Кабинет" : "Войти"}
          </a>
        </div>
      )}
    </nav>
  );
}