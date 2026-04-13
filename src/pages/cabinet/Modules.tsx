import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/lib/api";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  connection_status: string | null;
  created_at: string;
}

const MODULE_ICONS: Record<string, string> = {
  cryptometry: "Shield",
  "ai-lab": "Brain",
  "ai-production": "Factory",
  "invest-models": "TrendingUp",
  "property-mgmt": "Building",
  lss: "Scale",
  "land-data": "Map",
  "fee-dev": "Calculator",
  licensing: "Award",
  media: "Camera",
};

export default function Modules() {
  const [tab, setTab] = useState("all");

  const { data, isLoading, error } = useQuery<{ items: Module[] }>({
    queryKey: ["modules"],
    queryFn: () => api.get<{ items: Module[] }>("api-modules"),
  });

  const modules = data?.items ?? [];

  const connected = modules.filter((m) => m.connection_status === "active");
  const pilot = modules.filter((m) => m.connection_status === "beta" || m.status === "beta");
  const available = modules.filter((m) => !m.connection_status);

  const filtered =
    tab === "active" ? connected : tab === "pilot" ? pilot : tab === "available" ? available : modules;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-lg bg-[#12121c]" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon name="AlertCircle" size={32} className="mb-3 text-red-400/60" />
        <p className="text-sm text-white/50">Не удалось загрузить модули</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
          Модули
        </h1>
        <p className="mt-0.5 text-sm text-white/40">Подключённые и доступные модули платформы</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="border border-[#1a1a2e] bg-[#0f0f18]">
          <TabsTrigger value="all" className="text-xs data-[state=active]:bg-[#1a1a2e]">
            Все ({modules.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs data-[state=active]:bg-[#1a1a2e]">
            Активные ({connected.length})
          </TabsTrigger>
          <TabsTrigger value="pilot" className="text-xs data-[state=active]:bg-[#1a1a2e]">
            Пилот ({pilot.length})
          </TabsTrigger>
          <TabsTrigger value="available" className="text-xs data-[state=active]:bg-[#1a1a2e]">
            Доступные ({available.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Icon name="Blocks" size={32} className="mb-3 text-white/15" />
              <p className="text-sm text-white/40">
                {tab === "available" ? "Все модули подключены" : "Нет модулей в этой категории"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((mod) => (
                <ModuleCard key={mod.id} module={mod} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ModuleCard({ module }: { module: Module }) {
  const iconName = MODULE_ICONS[module.slug] ?? "Blocks";
  const isConnected = !!module.connection_status;

  return (
    <div
      className={cn(
        "group rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5 transition-colors",
        isConnected && "hover:border-[#252540]"
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-500/8 text-cyan-400/70">
          <Icon name={iconName} size={20} />
        </div>
        {module.connection_status ? (
          <StatusBadge status={module.connection_status} type="module" />
        ) : (
          <span className="rounded-full bg-zinc-500/10 px-2 py-0.5 text-[10px] text-zinc-500">
            Не подключён
          </span>
        )}
      </div>

      <h3 className="mb-1 text-sm font-medium text-white/80">{module.name}</h3>
      <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-white/35">
        {module.description || "Модуль платформы КСИ"}
      </p>

      {!isConnected && (
        <Button
          variant="outline"
          className="h-8 w-full border-[#1a1a2e] text-xs text-white/50 hover:border-cyan-500/30 hover:text-cyan-400"
        >
          Запросить подключение
        </Button>
      )}
    </div>
  );
}
