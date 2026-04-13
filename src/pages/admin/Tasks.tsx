import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import { TASK_STATUSES, TASK_PRIORITIES } from "@/lib/constants";
import { formatKM, formatDate } from "@/lib/formatters";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Task { id: string; title: string; status: string; priority: string; deadline: string | null; created_at: string; company_name: string; module_name: string | null; curator_name: string | null; estimate_hours: number | null }
interface Resp { items: Task[]; total: number; page: number; per_page: number }

export default function Tasks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") ?? "");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [companySearch, setCompanySearch] = useState("");

  const { data, isLoading } = useQuery<Resp>({
    queryKey: ["admin-tasks", page, statusFilter, priorityFilter],
    queryFn: () => api.get("api-tasks", { page, per_page: 30, status: statusFilter || undefined, priority: priorityFilter || undefined }),
  });

  const tasks = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 30);

  // Status summary
  const statusCounts: Record<string, number> = {};
  tasks.forEach(t => { statusCounts[t.status] = (statusCounts[t.status] ?? 0) + 1; });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Задачи</h1><p className="mt-0.5 text-sm text-white/40">{total} всего</p></div>
        <Button variant="outline" className="h-9 gap-2 border-[#1a1a2e] bg-transparent px-4 text-xs text-white/40 hover:bg-white/5"><Icon name="Download" size={14} /> Экспорт</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-8 w-[160px] border-[#1a1a2e] bg-[#0f0f18] text-xs"><SelectValue placeholder="Статус" /></SelectTrigger>
          <SelectContent><SelectItem value="__all__">Все статусы</SelectItem>{Object.entries(TASK_STATUSES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={(v) => { setPriorityFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-8 w-[150px] border-[#1a1a2e] bg-[#0f0f18] text-xs"><SelectValue placeholder="Приоритет" /></SelectTrigger>
          <SelectContent><SelectItem value="__all__">Все</SelectItem>{Object.entries(TASK_PRIORITIES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {isLoading ? <div className="space-y-1">{[1,2,3,4,5,6].map(i => <div key={i} className="h-10 animate-pulse rounded bg-[#12121c]" />)}</div> : tasks.length === 0 ? (
        <div className="flex flex-col items-center py-16"><Icon name="ClipboardList" size={28} className="mb-2 text-white/15" /><p className="text-sm text-white/30">Задач не найдено</p></div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
                <th className="px-3 py-2.5 font-medium text-white/30">Название</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Компания</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Модуль</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Статус</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Приоритет</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Куратор</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Срок</th>
              </tr></thead>
              <tbody>{tasks.map((t, idx) => {
                const isOverdue = t.deadline && new Date(t.deadline) < new Date() && !["closed", "cancelled", "confirmed"].includes(t.status);
                return (
                  <tr key={t.id} onClick={() => navigate(`/admin/tasks/${t.id}`)} className={cn("cursor-pointer border-b border-[#1a1a2e] transition-colors hover:bg-white/[0.02]", idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]", isOverdue && "border-l-2 border-l-red-500/40")}>
                    <td className="max-w-[220px] truncate px-3 py-2.5 text-white/70">{t.title}</td>
                    <td className="px-3 py-2.5 text-white/40">{t.company_name}</td>
                    <td className="px-3 py-2.5 text-white/35">{t.module_name ?? "\u2014"}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={t.status} type="task" /></td>
                    <td className="px-3 py-2.5"><StatusBadge status={t.priority} type="priority" /></td>
                    <td className="px-3 py-2.5 text-white/40">{t.curator_name ?? <span className="text-orange-400/60">Не назначен</span>}</td>
                    <td className={cn("px-3 py-2.5 font-mono", isOverdue ? "text-red-400" : "text-white/30")}>{formatDate(t.deadline)}</td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>

          {/* Summary bar */}
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[#1a1a2e] bg-[#12121c] px-4 py-2.5">
            <span className="text-[11px] text-white/30">На странице: {tasks.length}</span>
            <span className="text-white/10">|</span>
            {Object.entries(statusCounts).map(([s, c]) => <span key={s} className="flex items-center gap-1"><StatusBadge status={s} type="task" className="text-[9px]" /><span className="font-mono text-[10px] text-white/25">{c}</span></span>)}
          </div>

          {totalPages > 1 && <div className="flex items-center justify-center gap-2"><Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronLeft" size={14} /></Button><span className="text-xs text-white/30">{page}/{totalPages}</span><Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronRight" size={14} /></Button></div>}
        </>
      )}
    </div>
  );
}
