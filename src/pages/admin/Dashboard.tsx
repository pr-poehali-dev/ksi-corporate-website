import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { formatKM, formatRelative } from "@/lib/formatters";
import { KM_OPERATION_TYPES, STATUS_COLOR_MAP } from "@/lib/constants";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface AdminDashboard {
  role: string;
  total_companies: number;
  active_tasks: number;
  total_km: number;
  pending_approvals: number;
  recent_operations: Array<{
    id: string;
    operation_type: string;
    amount: number;
    reason: string;
    created_at: string;
    company_id: string | null;
  }>;
}

function StatCard({ label, value, icon, color, onClick }: {
  label: string; value: string; icon: string; color: string; onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5",
        onClick && "cursor-pointer transition-colors hover:border-[#252540]"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", color)}>
          <Icon name={icon} size={20} />
        </div>
        <div>
          <p className="text-xs text-white/35">{label}</p>
          <p className="font-mono text-2xl font-semibold text-white/90">{value}</p>
        </div>
      </div>
    </div>
  );
}

function AttentionCard({ label, count, icon, color, onClick }: {
  label: string; count: number; icon: string; color: string; onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#1a1a2e] bg-[#12121c] p-4 transition-colors hover:border-[#252540]"
    >
      <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", color)}>
        <Icon name={icon} size={15} />
      </div>
      <div className="flex-1">
        <p className="text-xs text-white/50">{label}</p>
      </div>
      <span className="font-mono text-lg font-semibold text-white/70">{count}</span>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<AdminDashboard>({
    queryKey: ["admin-dashboard"],
    queryFn: () => api.get<AdminDashboard>("api-dashboard"),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 animate-pulse rounded-lg bg-[#12121c]" />)}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-lg bg-[#12121c]" />
          <div className="h-72 animate-pulse rounded-lg bg-[#12121c]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-20">
        <Icon name="AlertCircle" size={32} className="mb-3 text-red-400/60" />
        <p className="text-sm text-white/50">Не удалось загрузить данные</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
        Панель управления
      </h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Компаний" value={String(data?.total_companies ?? 0)} icon="Building2" color="bg-blue-500/10 text-blue-400" onClick={() => navigate("/admin/companies")} />
        <StatCard label="Активных задач" value={String(data?.active_tasks ?? 0)} icon="ClipboardList" color="bg-cyan-500/10 text-cyan-400" onClick={() => navigate("/admin/tasks")} />
        <StatCard label="КМ в обороте" value={formatKM(data?.total_km ?? 0)} icon="Banknote" color="bg-green-500/10 text-green-400" onClick={() => navigate("/admin/finance")} />
        <StatCard label="Ожидают подтверждения" value={String(data?.pending_approvals ?? 0)} icon="Clock" color="bg-purple-500/10 text-purple-400" onClick={() => navigate("/admin/approvals")} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attention items */}
        <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
          <h2 className="mb-4 text-sm font-medium text-white/60">Требуют внимания</h2>
          <div className="space-y-2">
            <AttentionCard label="Задачи без куратора" count={0} icon="UserX" color="bg-orange-500/10 text-orange-400" onClick={() => navigate("/admin/tasks?filter=no_curator")} />
            <AttentionCard label="Просрочен SLA" count={0} icon="AlertTriangle" color="bg-red-500/10 text-red-400" onClick={() => navigate("/admin/tasks?filter=overdue")} />
            <AttentionCard label="Споры" count={0} icon="Shield" color="bg-red-500/10 text-red-400" onClick={() => navigate("/admin/tasks?status=dispute")} />
            <AttentionCard label="Результат готов" count={data?.pending_approvals ?? 0} icon="CheckCircle" color="bg-purple-500/10 text-purple-400" onClick={() => navigate("/admin/approvals")} />
          </div>
        </div>

        {/* Recent operations */}
        <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/60">Последние операции КМ</h2>
            <button onClick={() => navigate("/admin/finance")} className="text-xs text-white/30 hover:text-white/60">
              Все операции
            </button>
          </div>
          {!data?.recent_operations?.length ? (
            <p className="py-8 text-center text-xs text-white/20">Нет операций</p>
          ) : (
            <div className="space-y-1">
              {data.recent_operations.slice(0, 10).map((op) => {
                const config = KM_OPERATION_TYPES[op.operation_type];
                const colors = config ? STATUS_COLOR_MAP[config.color] ?? STATUS_COLOR_MAP.gray : STATUS_COLOR_MAP.gray;
                const isPositive = config?.sign === "+";
                const isNegative = config?.sign === "\u2212";
                return (
                  <div key={op.id} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/[0.02]">
                    <div className={cn("flex h-6 w-6 items-center justify-center rounded", colors.bg)}>
                      <Icon name={isPositive ? "ArrowUpRight" : isNegative ? "ArrowDownRight" : "ArrowRightLeft"} size={12} className={colors.text} />
                    </div>
                    <span className="flex-1 truncate text-xs text-white/50">{config?.label ?? op.operation_type}</span>
                    <span className={cn("font-mono text-xs font-medium", isPositive && "text-green-400", isNegative && "text-red-400", !isPositive && !isNegative && "text-yellow-400")}>
                      {config?.sign ?? ""}{formatKM(op.amount)}
                    </span>
                    <span className="text-[10px] text-white/20">{formatRelative(op.created_at)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
