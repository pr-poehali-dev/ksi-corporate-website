import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";
import { useAuth } from "@/contexts/AuthContext";

const LOGO_URL = "https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/28655df5-bb72-4ef7-ba50-ca96e9a5ae13.png";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const cabinetLink = user ? (user.user_type === "internal" ? "/admin" : "/cabinet") : "/auth/login";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = typeof window !== "undefined" ? window.location.pathname : "";
  const half = Math.ceil(NAV_ITEMS.length / 2);
  const leftNav = NAV_ITEMS.slice(0, half);
  const rightNav = NAV_ITEMS.slice(half);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-ksi-dark/95 backdrop-blur-md border-b border-ksi-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          {leftNav.map((item) => (
            <Link key={item.href} to={item.href} className="nav-link"
              style={current === item.href ? { color: "var(--ksi-cyan)" } : {}}>
              {item.label}
            </Link>
          ))}
        </div>

        <div
          className="flex items-center justify-center overflow-hidden"
          style={{
            width: scrolled ? 36 : 0,
            height: 36,
            marginLeft: scrolled ? 24 : 0,
            marginRight: scrolled ? 24 : 0,
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? "scale(1)" : "scale(0.5)",
            transition: "width 400ms cubic-bezier(0.22, 1, 0.36, 1), margin 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease, transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            pointerEvents: scrolled ? "auto" : "none",
          }}
        >
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
              Связаться
            </Link>
            <Link to={cabinetLink} className="flex items-center gap-1.5 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-400/80 hover:text-cyan-300 transition-all text-sm px-4 py-2 rounded-sm">
              <Icon name={user ? "LayoutDashboard" : "LogIn"} size={16} />
              {user ? "Кабинет" : "Войти"}
            </Link>
          </div>
        </div>

        <button className="lg:hidden text-white/60 hover:text-white ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
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
            Связаться
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
