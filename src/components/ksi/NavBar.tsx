import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-ksi-dark/95 backdrop-blur-md border-b border-ksi-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-4 ml-auto lg:ml-0">
          <a href="/contacts" className="btn-primary-ksi px-5 py-2 text-sm rounded-sm cursor-pointer">
            Связаться
          </a>
          <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
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