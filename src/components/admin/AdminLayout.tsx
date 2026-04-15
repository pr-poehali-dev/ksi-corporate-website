import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Icon from "@/components/ui/icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Обзор", icon: "LayoutDashboard", to: "/admin" },
  { label: "Компании", icon: "Building2", to: "/admin/companies" },
  { label: "Пользователи", icon: "Users", to: "/admin/users" },
  { label: "Модули", icon: "Blocks", to: "/admin/modules" },
  { label: "Задачи", icon: "ClipboardList", to: "/admin/tasks" },
  { label: "Финансы КМ", icon: "Banknote", to: "/admin/finance" },
  { label: "Подтверждения", icon: "CheckCircle", to: "/admin/approvals" },
  { label: "Аудит", icon: "ScrollText", to: "/admin/audit" },
  { label: "Настройки", icon: "Settings", to: "/admin/settings" },
  { label: "Сайт", icon: "Globe", to: "/admin/site-settings" },
];

const INTERNAL_ROLE_LABELS: Record<string, string> = {
  superadmin: "Суперадмин",
  admin: "Администратор",
  manager: "Менеджер",
  curator: "Куратор",
  executor: "Исполнитель",
  analyst: "Аналитик",
  finance: "Финансист",
  support: "Поддержка",
};

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  const roleLabel = user?.internal_role
    ? INTERNAL_ROLE_LABELS[user.internal_role] ?? user.internal_role
    : "Оператор";

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-[#1a1a2e] bg-[#0a0a12] transition-transform duration-200 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center gap-3 border-b border-[#1a1a2e] px-5">
          <img
            src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/93eb9bc4-b664-470c-ae35-71d7454ce9b4.png"
            alt="KSI"
            className="h-8 w-8 object-contain"
          />
          <div className="min-w-0">
            <p className="font-oswald text-sm font-medium uppercase tracking-wider text-white/90">
              КСИ Админ
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded p-1 text-white/40 hover:text-white/70 lg:hidden"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Nav items */}
        <ScrollArea className="flex-1 py-3">
          <nav className="space-y-0.5 px-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  )
                }
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </ScrollArea>

        {/* Sidebar footer */}
        <div className="border-t border-[#1a1a2e] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10 text-xs font-semibold text-cyan-400">
              {user?.full_name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() ?? "?"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white/80">
                {user?.full_name ?? ""}
              </p>
              <p className="truncate text-xs text-white/40">{roleLabel}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-[#1a1a2e] bg-[#0a0a12]/80 px-4 backdrop-blur-sm lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded p-1.5 text-white/50 hover:text-white/80 lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </button>

          <div className="flex-1" />

          {/* Notifications */}
          <button className="relative rounded-md p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white/80">
            <Icon name="Bell" size={18} />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="rounded-md p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-red-400"
            title="Выйти"
          >
            <Icon name="LogOut" size={18} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}