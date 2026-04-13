import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface DocItem {
  id: string;
  name: string;
  type: "result" | "report" | "analytics" | "presentation";
  module: string;
  taskTitle: string;
  taskId: string;
  date: string;
  size: string;
}

const DOC_ICONS: Record<string, string> = {
  result: "FileCheck",
  report: "FileText",
  analytics: "BarChart3",
  presentation: "Presentation",
};

const DOC_TYPE_LABELS: Record<string, string> = {
  result: "Результат",
  report: "Отчёт",
  analytics: "Аналитика",
  presentation: "Презентация",
};

/* Placeholder data - will be replaced with API calls */
const EMPTY_DOCS: DocItem[] = [];

export default function Documents() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const docs = EMPTY_DOCS;
  const filtered = docs.filter((d) => {
    if (tab !== "all" && d.type !== tab) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
          Документы
        </h1>
        <p className="mt-0.5 text-sm text-white/40">Результаты, отчёты и аналитика по задачам</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon name="Search" size={14} className="text-white/20" />
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по документам..."
          className="border-[#1a1a2e] bg-[#0f0f18] pl-9 text-xs text-white/70 placeholder:text-white/20"
        />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="border border-[#1a1a2e] bg-[#0f0f18]">
          <TabsTrigger value="all" className="text-xs data-[state=active]:bg-[#1a1a2e]">Все</TabsTrigger>
          <TabsTrigger value="result" className="text-xs data-[state=active]:bg-[#1a1a2e]">Результаты</TabsTrigger>
          <TabsTrigger value="report" className="text-xs data-[state=active]:bg-[#1a1a2e]">Отчёты</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs data-[state=active]:bg-[#1a1a2e]">Аналитика</TabsTrigger>
          <TabsTrigger value="presentation" className="text-xs data-[state=active]:bg-[#1a1a2e]">Презентации</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <Icon name="FileText" size={36} className="mb-3 text-white/10" />
              <p className="text-sm text-white/40">Документов пока нет</p>
              <p className="mt-1 text-xs text-white/20">
                Документы появятся после завершения задач в подключённых модулях
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((doc) => (
                <div
                  key={doc.id}
                  className="group rounded-lg border border-[#1a1a2e] bg-[#12121c] p-4 transition-colors hover:border-[#252540]"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan-500/8 text-cyan-400/60">
                      <Icon name={DOC_ICONS[doc.type] ?? "FileText"} size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white/70">{doc.name}</p>
                      <p className="text-[11px] text-white/30">
                        {DOC_TYPE_LABELS[doc.type]} -- {doc.module}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/20">{doc.size} -- {doc.date}</span>
                    <button className="rounded p-1 text-white/20 transition-colors hover:text-cyan-400">
                      <Icon name="Download" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
