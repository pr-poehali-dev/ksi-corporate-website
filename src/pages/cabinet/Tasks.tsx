import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import { TASK_STATUSES, TASK_PRIORITIES } from "@/lib/constants";
import { formatKM, formatDate } from "@/lib/formatters";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  deadline: string | null;
  created_at: string;
  company_name: string;
  module_name: string | null;
  module_id: string | null;
  creator_name: string | null;
  curator_name: string | null;
  executor_name: string | null;
  estimate_hours: number | null;
}

interface TasksResponse {
  items: Task[];
  total: number;
  page: number;
  per_page: number;
}

const KANBAN_COLUMNS = [
  { key: "intake", label: "Новые", statuses: ["new", "analysis"] },
  { key: "work", label: "В работе", statuses: ["in_progress", "clarification", "rework"] },
  { key: "review", label: "Результат", statuses: ["result_ready", "partial_confirmed"] },
  { key: "done", label: "Завершено", statuses: ["confirmed", "closed", "cancelled", "dispute"] },
];

export default function Tasks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<"list" | "kanban">("list");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") ?? "");
  const [priorityFilter, setPriorityFilter] = useState("");

  const { data, isLoading, error } = useQuery<TasksResponse>({
    queryKey: ["tasks", page, statusFilter, priorityFilter],
    queryFn: () =>
      api.get<TasksResponse>("api-tasks", {
        page,
        per_page: 25,
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
      }),
  });

  const tasks = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 25);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
            Задачи
          </h1>
          <p className="mt-0.5 text-sm text-white/40">{total} всего</p>
        </div>
        <Button
          onClick={() => navigate("/cabinet/tasks/new")}
          className="btn-primary-ksi h-9 gap-2 px-4 text-xs"
        >
          <Icon name="Plus" size={14} />
          Новая задача
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* View toggle */}
        <div className="flex rounded-md border border-[#1a1a2e] bg-[#0f0f18]">
          <button
            onClick={() => setView("list")}
            className={cn(
              "flex items-center gap-1.5 rounded-l-md px-3 py-1.5 text-xs transition-colors",
              view === "list" ? "bg-[#1a1a2e] text-white/80" : "text-white/35 hover:text-white/60"
            )}
          >
            <Icon name="List" size={13} /> Список
          </button>
          <button
            onClick={() => setView("kanban")}
            className={cn(
              "flex items-center gap-1.5 rounded-r-md px-3 py-1.5 text-xs transition-colors",
              view === "kanban" ? "bg-[#1a1a2e] text-white/80" : "text-white/35 hover:text-white/60"
            )}
          >
            <Icon name="Columns3" size={13} /> Канбан
          </button>
        </div>

        {/* Filters */}
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-8 w-[160px] border-[#1a1a2e] bg-[#0f0f18] text-xs">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Все статусы</SelectItem>
            {Object.entries(TASK_STATUSES).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={(v) => { setPriorityFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-8 w-[150px] border-[#1a1a2e] bg-[#0f0f18] text-xs">
            <SelectValue placeholder="Приоритет" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Все приоритеты</SelectItem>
            {Object.entries(TASK_PRIORITIES).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-[#12121c]" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center py-16">
          <Icon name="AlertCircle" size={28} className="mb-2 text-red-400/60" />
          <p className="text-sm text-white/40">Не удалось загрузить задачи</p>
        </div>
      )}

      {/* List view */}
      {!isLoading && !error && view === "list" && (
        <>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Icon name="ClipboardList" size={32} className="mb-3 text-white/15" />
              <p className="text-sm text-white/40">Задач не найдено</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
                    <th className="px-4 py-3 text-xs font-medium text-white/35">Название</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/35">Модуль</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/35">Статус</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/35">Приоритет</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/35">Срок</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/35">Куратор</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, idx) => (
                    <tr
                      key={task.id}
                      onClick={() => navigate(`/cabinet/tasks/${task.id}`)}
                      className={cn(
                        "cursor-pointer border-b border-[#1a1a2e] transition-colors hover:bg-white/[0.02]",
                        idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]"
                      )}
                    >
                      <td className="max-w-[280px] truncate px-4 py-3 text-white/70">{task.title}</td>
                      <td className="px-4 py-3 text-white/40">{task.module_name ?? "\u2014"}</td>
                      <td className="px-4 py-3"><StatusBadge status={task.status} type="task" /></td>
                      <td className="px-4 py-3"><StatusBadge status={task.priority} type="priority" /></td>
                      <td className="px-4 py-3 font-mono text-xs text-white/40">{formatDate(task.deadline)}</td>
                      <td className="px-4 py-3 text-white/40">{task.curator_name ?? "\u2014"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="h-8 border-[#1a1a2e] bg-transparent text-xs text-white/50"
              >
                <Icon name="ChevronLeft" size={14} />
              </Button>
              <span className="px-3 text-xs text-white/40">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="h-8 border-[#1a1a2e] bg-transparent text-xs text-white/50"
              >
                <Icon name="ChevronRight" size={14} />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Kanban view */}
      {!isLoading && !error && view === "kanban" && (
        <div className="grid gap-4 lg:grid-cols-4">
          {KANBAN_COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => col.statuses.includes(t.status));
            return (
              <div key={col.key} className="rounded-lg border border-[#1a1a2e] bg-[#0f0f18] p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-medium text-white/50">{col.label}</h3>
                  <span className="font-mono text-[10px] text-white/25">{colTasks.length}</span>
                </div>
                <div className="space-y-2">
                  {colTasks.length === 0 && (
                    <p className="py-6 text-center text-[11px] text-white/20">Нет задач</p>
                  )}
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => navigate(`/cabinet/tasks/${task.id}`)}
                      className="cursor-pointer rounded-md border border-[#1a1a2e] bg-[#12121c] p-3 transition-colors hover:border-[#252540]"
                    >
                      <p className="mb-1.5 text-xs font-medium text-white/70 line-clamp-2">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={task.status} type="task" className="text-[10px]" />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-white/25">
                        <span>{task.module_name ?? ""}</span>
                        <span className="font-mono">{task.deadline ? formatDate(task.deadline) : ""}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
