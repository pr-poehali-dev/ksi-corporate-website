import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { formatDate, formatRelative } from "@/lib/formatters";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface Task { id: string; title: string; status: string; priority: string; deadline: string | null; created_at: string; company_name: string; module_name: string | null; curator_name: string | null; estimate_hours: number | null }
interface Resp { items: Task[]; total: number }

export default function Approvals() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Resp>({
    queryKey: ["admin-approvals"],
    queryFn: () => api.get("api-tasks", { status: "result_ready", per_page: 50 }),
  });

  const { data: disputes } = useQuery<Resp>({
    queryKey: ["admin-disputes"],
    queryFn: () => api.get("api-tasks", { status: "dispute", per_page: 50 }),
  });

  const updateTask = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => api.put("api-tasks", { id, status }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-approvals"] }); queryClient.invalidateQueries({ queryKey: ["admin-disputes"] }); },
  });

  const readyTasks = data?.items ?? [];
  const disputeTasks = disputes?.items ?? [];

  if (isLoading) return <div className="space-y-4"><div className="h-8 w-48 animate-pulse rounded bg-white/5" />{[1,2,3].map(i => <div key={i} className="h-28 animate-pulse rounded-lg bg-[#12121c]" />)}</div>;
  if (error) return <div className="flex flex-col items-center py-20"><Icon name="AlertCircle" size={32} className="mb-3 text-red-400/60" /><p className="text-sm text-white/50">Ошибка загрузки</p></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Подтверждения</h1><p className="mt-0.5 text-sm text-white/40">{readyTasks.length} результатов готово, {disputeTasks.length} споров</p></div>

      {/* Result ready */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-white/60"><Icon name="CheckCircle" size={15} className="text-purple-400/60" /> Результат готов ({readyTasks.length})</h2>
        {readyTasks.length === 0 ? <p className="py-6 text-center text-xs text-white/20">Нет задач для подтверждения</p> : (
          <div className="space-y-3">{readyTasks.map(t => (
            <div key={t.id} className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="cursor-pointer text-sm font-medium text-white/70 hover:text-cyan-400" onClick={() => navigate(`/admin/tasks/${t.id}`)}>{t.title}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-white/30">{t.company_name}</span>
                    {t.module_name && <span className="text-[11px] text-white/20">{t.module_name}</span>}
                    <span className="text-[11px] text-white/15">Куратор: {t.curator_name ?? "\u2014"}</span>
                    <span className="font-mono text-[11px] text-white/15">Срок: {formatDate(t.deadline)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => updateTask.mutate({ id: t.id, status: "confirmed" })} disabled={updateTask.isPending} className="h-8 gap-1.5 bg-green-600 px-3 text-xs text-white hover:bg-green-700"><Icon name="CheckCheck" size={13} /> Подтвердить</Button>
                  <Button variant="outline" onClick={() => updateTask.mutate({ id: t.id, status: "rework" })} disabled={updateTask.isPending} className="h-8 gap-1.5 border-orange-500/20 px-3 text-xs text-orange-400/70 hover:bg-orange-500/5"><Icon name="RotateCcw" size={13} /> Доработка</Button>
                </div>
              </div>
            </div>
          ))}</div>
        )}
      </div>

      {/* Disputes */}
      {disputeTasks.length > 0 && (
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-white/60"><Icon name="AlertTriangle" size={15} className="text-red-400/60" /> Споры ({disputeTasks.length})</h2>
          <div className="space-y-3">{disputeTasks.map(t => (
            <div key={t.id} className="rounded-lg border border-red-500/10 bg-[#12121c] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="cursor-pointer text-sm font-medium text-white/70 hover:text-cyan-400" onClick={() => navigate(`/admin/tasks/${t.id}`)}>{t.title}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <StatusBadge status="dispute" type="task" />
                    <span className="text-[11px] text-white/30">{t.company_name}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => updateTask.mutate({ id: t.id, status: "rework" })} disabled={updateTask.isPending} className="h-8 gap-1.5 bg-orange-600 px-3 text-xs text-white hover:bg-orange-700"><Icon name="RotateCcw" size={13} /> На доработку</Button>
                  <Button variant="outline" onClick={() => updateTask.mutate({ id: t.id, status: "confirmed" })} disabled={updateTask.isPending} className="h-8 gap-1.5 border-green-500/20 px-3 text-xs text-green-400/70 hover:bg-green-500/5"><Icon name="CheckCheck" size={13} /> Закрыть спор</Button>
                </div>
              </div>
            </div>
          ))}</div>
        </div>
      )}
    </div>
  );
}
