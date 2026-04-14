import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StatusBadge from "@/components/cabinet/StatusBadge";
import { cn } from "@/lib/utils";

type AssetStatus = "active" | "preparation" | "realization" | "sold" | "archived";
type AssetType = "land" | "building" | "project" | "complex";

interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  address: string;
  area: string;
  cadastral?: string;
  addedAt: string;
  updatedAt: string;
  tasksCount: number;
  docsCount: number;
}

const STATUS_MAP: Record<AssetStatus, { label: string; color: string }> = {
  active: { label: "Активен", color: "green" },
  preparation: { label: "Подготовка", color: "blue" },
  realization: { label: "Реализация", color: "cyan" },
  sold: { label: "Реализован", color: "emerald" },
  archived: { label: "Архив", color: "gray" },
};

const TYPE_MAP: Record<AssetType, { label: string; icon: string }> = {
  land: { label: "Земельный участок", icon: "MapPin" },
  building: { label: "Объект", icon: "Building2" },
  project: { label: "Проект", icon: "Layers" },
  complex: { label: "Комплекс", icon: "LayoutGrid" },
};

const DEMO_ASSETS: Asset[] = [
  {
    id: "a1",
    name: "Участок ИЖС, Истринский р-н",
    type: "land",
    status: "active",
    address: "Московская обл., Истринский р-н, д. Покровское",
    area: "15 га",
    cadastral: "50:08:0000000:1234",
    addedAt: "2026-02-10",
    updatedAt: "2026-04-12",
    tasksCount: 3,
    docsCount: 7,
  },
  {
    id: "a2",
    name: "Площадка под МЖС, Красногорск",
    type: "land",
    status: "preparation",
    address: "Московская обл., г.о. Красногорск",
    area: "2.4 га",
    cadastral: "50:11:0000000:5678",
    addedAt: "2026-03-05",
    updatedAt: "2026-04-10",
    tasksCount: 5,
    docsCount: 12,
  },
  {
    id: "a3",
    name: "ЖК «Кварталы у реки» — концепция",
    type: "project",
    status: "realization",
    address: "Московская обл., г.о. Одинцово",
    area: "8.1 га",
    addedAt: "2025-11-20",
    updatedAt: "2026-04-08",
    tasksCount: 12,
    docsCount: 24,
  },
  {
    id: "a4",
    name: "Складской комплекс, Домодедово",
    type: "building",
    status: "sold",
    address: "Московская обл., г.о. Домодедово",
    area: "4 200 м²",
    addedAt: "2025-08-15",
    updatedAt: "2026-01-22",
    tasksCount: 8,
    docsCount: 15,
  },
];

function AssetCard({ asset }: { asset: Asset }) {
  const typeInfo = TYPE_MAP[asset.type];
  const statusInfo = STATUS_MAP[asset.status];

  return (
    <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5 transition-colors hover:border-[#252540]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-md",
            asset.status === "realization" ? "bg-cyan-500/10 text-cyan-400" :
            asset.status === "preparation" ? "bg-blue-500/10 text-blue-400" :
            asset.status === "sold" ? "bg-emerald-500/10 text-emerald-400" :
            "bg-white/5 text-white/50"
          )}>
            <Icon name={typeInfo.icon} size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-white/90 text-sm leading-tight">{asset.name}</h3>
            <p className="text-xs text-white/35 mt-0.5">{typeInfo.label}</p>
          </div>
        </div>
        <StatusBadge label={statusInfo.label} color={statusInfo.color} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Icon name="MapPin" size={12} className="flex-shrink-0" />
          <span className="truncate">{asset.address}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Icon name="Ruler" size={12} />
            <span>{asset.area}</span>
          </div>
          {asset.cadastral && (
            <div className="flex items-center gap-1.5 text-xs text-white/30">
              <Icon name="Hash" size={12} />
              <span className="font-mono-ibm text-[11px]">{asset.cadastral}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#1a1a2e] pt-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-white/30">
            <Icon name="ClipboardList" size={12} />
            <span>{asset.tasksCount} задач</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/30">
            <Icon name="FileText" size={12} />
            <span>{asset.docsCount} документов</span>
          </div>
        </div>
        <span className="text-[11px] text-white/20">
          {new Date(asset.updatedAt).toLocaleDateString("ru-RU")}
        </span>
      </div>
    </div>
  );
}

export default function Assets() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const assets = DEMO_ASSETS;

  const filtered = assets.filter((a) => {
    if (tab === "active" && a.status !== "active") return false;
    if (tab === "preparation" && a.status !== "preparation") return false;
    if (tab === "realization" && a.status !== "realization") return false;
    if (tab === "completed" && a.status !== "sold" && a.status !== "archived") return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.address.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = assets.filter(a => a.status === "active").length;
  const prepCount = assets.filter(a => a.status === "preparation").length;
  const realCount = assets.filter(a => a.status === "realization").length;
  const doneCount = assets.filter(a => a.status === "sold" || a.status === "archived").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white/90">Мои активы</h1>
          <p className="text-sm text-white/40 mt-0.5">Земельные участки, объекты и проекты в работе</p>
        </div>
        <Button
          size="sm"
          className="bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/25"
          onClick={() => {}}
        >
          <Icon name="Plus" size={14} className="mr-1.5" />
          Добавить актив
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Активных", value: activeCount, icon: "CircleDot", color: "bg-green-500/10 text-green-400" },
          { label: "Подготовка", value: prepCount, icon: "Clock", color: "bg-blue-500/10 text-blue-400" },
          { label: "Реализация", value: realCount, icon: "TrendingUp", color: "bg-cyan-500/10 text-cyan-400" },
          { label: "Завершено", value: doneCount, icon: "CheckCircle", color: "bg-emerald-500/10 text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-3">
            <div className="flex items-center gap-2.5">
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", s.color)}>
                <Icon name={s.icon} size={15} />
              </div>
              <div>
                <p className="font-mono text-lg font-semibold text-white/90">{s.value}</p>
                <p className="text-[11px] text-white/35">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="border border-[#1a1a2e] bg-[#0f0f18]">
            <TabsTrigger value="all" className="text-xs data-[state=active]:bg-[#1a1a2e]">
              Все ({assets.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs data-[state=active]:bg-[#1a1a2e]">
              Активные
            </TabsTrigger>
            <TabsTrigger value="preparation" className="text-xs data-[state=active]:bg-[#1a1a2e]">
              Подготовка
            </TabsTrigger>
            <TabsTrigger value="realization" className="text-xs data-[state=active]:bg-[#1a1a2e]">
              Реализация
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs data-[state=active]:bg-[#1a1a2e]">
              Завершено
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-64">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по активам..."
            className="h-9 border-[#1a1a2e] bg-[#0f0f18] pl-9 text-xs text-white/80 placeholder:text-white/25"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#1a1a2e] py-16">
          <Icon name="Package" size={32} className="mb-3 text-white/15" />
          <p className="text-sm text-white/30">
            {search ? "Активы не найдены" : "Нет активов в этой категории"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
}
