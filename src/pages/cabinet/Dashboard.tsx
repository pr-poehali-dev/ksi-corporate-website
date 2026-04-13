import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { formatKM, formatRelative } from "@/lib/formatters";
import { KM_OPERATION_TYPES, STATUS_COLOR_MAP } from "@/lib/constants";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardData {
  role: string;
  balance: { available: number; reserved: number; bonus: number; bonus_expires_at: string | null };
  active_tasks: number;
  pending_approvals: number;
  recent_operations: Array<{
    id: string;
    operation_type: string;
    amount: number;
    reason: string;
    created_at: string;
  }>;
  active_modules: number;
}

function StatCard({
  label,
  value,
  icon,
  iconColor,
  sub,
}: {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  sub?: string;
}) {
  return (
    <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-4">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-md", iconColor)}>
          <Icon name={icon} size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-white/40">{label}</p>
          <p className="font-mono text-lg font-semibold text-white/90">{value}</p>
          {sub && <p className="text-[11px] text-white/30">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { company } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: () => api.get<DashboardData>("api-dashboard"),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 animate-pulse rounded bg-white/5" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-[#12121c]" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-lg bg-[#12121c]" />
          <div className="h-64 animate-pulse rounded-lg bg-[#12121c]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon name="AlertCircle" size={32} className="mb-3 text-red-400/60" />
        <p className="text-sm text-white/50">Не удалось загрузить данные</p>
      </div>
    );
  }

  const balance = data?.balance ?? { available: 0, reserved: 0, bonus: 0, bonus_expires_at: null };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
            {company?.name ?? "Обзор"}
          </h1>
          <p className="mt-0.5 text-sm text-white/40">Сводка по платформе</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate("/cabinet/tasks/new")}
            className="btn-primary-ksi h-9 gap-2 px-4 text-xs"
          >
            <Icon name="Plus" size={14} />
            Новая задача
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/cabinet/chat")}
            className="h-9 gap-2 border-[#1a1a2e] bg-transparent px-4 text-xs text-white/60 hover:bg-white/5 hover:text-white/80"
          >
            <Icon name="MessageSquare" size={14} />
            Открыть диалог
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Баланс КМ"
          value={formatKM(balance.available)}
          icon="Wallet"
          iconColor="bg-cyan-500/10 text-cyan-400"
        />
        <StatCard
          label="В резерве"
          value={formatKM(balance.reserved)}
          icon="Lock"
          iconColor="bg-yellow-500/10 text-yellow-400"
        />
        <StatCard
          label="Активных задач"
          value={String(data?.active_tasks ?? 0)}
          icon="ClipboardList"
          iconColor="bg-blue-500/10 text-blue-400"
        />
        <StatCard
          label="Ожидают подтверждения"
          value={String(data?.pending_approvals ?? 0)}
          icon="Clock"
          iconColor="bg-purple-500/10 text-purple-400"
        />
      </div>

      {/* Columns */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Modules */}
        <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/70">Активные модули</h2>
            <span className="font-mono text-xs text-white/30">{data?.active_modules ?? 0} шт.</span>
          </div>
          {(data?.active_modules ?? 0) === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <Icon name="Blocks" size={24} className="mb-2 text-white/15" />
              <p className="text-xs text-white/30">Нет подключённых модулей</p>
              <Button
                variant="ghost"
                onClick={() => navigate("/cabinet/modules")}
                className="mt-2 h-8 text-xs text-cyan-400 hover:text-cyan-300"
              >
                Просмотреть каталог
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: Math.min(data?.active_modules ?? 0, 6) }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-3 py-2.5"
                >
                  <Icon name="Blocks" size={14} className="text-cyan-400/60" />
                  <span className="text-xs text-white/60">Модуль {i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent KM Operations */}
        <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/70">Последние операции КМ</h2>
            <Button
              variant="ghost"
              onClick={() => navigate("/cabinet/balance")}
              className="h-7 px-2 text-xs text-white/40 hover:text-white/70"
            >
              Все операции
            </Button>
          </div>
          {!data?.recent_operations?.length ? (
            <div className="flex flex-col items-center py-8 text-center">
              <Icon name="Receipt" size={24} className="mb-2 text-white/15" />
              <p className="text-xs text-white/30">Операций пока нет</p>
            </div>
          ) : (
            <div className="space-y-1">
              {data.recent_operations.map((op) => {
                const config = KM_OPERATION_TYPES[op.operation_type];
                const colors = config
                  ? STATUS_COLOR_MAP[config.color] ?? STATUS_COLOR_MAP.gray
                  : STATUS_COLOR_MAP.gray;
                const isPositive = config?.sign === "+";
                const isNegative = config?.sign === "\u2212";
                return (
                  <div
                    key={op.id}
                    className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/[0.02]"
                  >
                    <div className={cn("flex h-7 w-7 items-center justify-center rounded", colors.bg)}>
                      <Icon
                        name={isPositive ? "ArrowUpRight" : isNegative ? "ArrowDownRight" : "ArrowRightLeft"}
                        size={13}
                        className={colors.text}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs text-white/60">
                        {config?.label ?? op.operation_type}
                      </p>
                      <p className="text-[11px] text-white/25">{formatRelative(op.created_at)}</p>
                    </div>
                    <span
                      className={cn(
                        "font-mono text-xs font-medium",
                        isPositive && "text-green-400",
                        isNegative && "text-red-400",
                        !isPositive && !isNegative && "text-yellow-400"
                      )}
                    >
                      {config?.sign ?? ""}{formatKM(op.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Tasks requiring attention */}
      {(data?.pending_approvals ?? 0) > 0 && (
        <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
          <h2 className="mb-3 text-sm font-medium text-white/70">Требуют внимания</h2>
          <div className="flex flex-wrap gap-2">
            <div
              onClick={() => navigate("/cabinet/tasks?status=result_ready")}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-purple-500/20 bg-purple-500/5 px-3 py-2 transition-colors hover:border-purple-500/30"
            >
              <StatusBadge status="result_ready" type="task" />
              <span className="text-xs text-white/50">-- ожидают вашего подтверждения</span>
            </div>
            <div
              onClick={() => navigate("/cabinet/tasks?status=clarification")}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-yellow-500/20 bg-yellow-500/5 px-3 py-2 transition-colors hover:border-yellow-500/30"
            >
              <StatusBadge status="clarification" type="task" />
              <span className="text-xs text-white/50">-- требуют уточнения</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
