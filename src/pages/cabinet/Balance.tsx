import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { KM_OPERATION_TYPES, STATUS_COLOR_MAP } from "@/lib/constants";
import { formatKM, formatDate, formatDateTime } from "@/lib/formatters";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BalanceData {
  company_id: string;
  available: number;
  reserved: number;
  bonus: number;
  bonus_expires_at: string | null;
  total_charged: number;
  total_topped_up: number;
}

interface KmOperation {
  id: string;
  operation_type: string;
  amount: number;
  reason: string;
  task_id: string | null;
  module_name: string | null;
  created_at: string;
  created_by_name: string | null;
  balance_before: number | null;
  balance_after: number | null;
}

interface OpsResponse {
  items: KmOperation[];
  total: number;
  page: number;
  per_page: number;
}

function StatCard({ label, value, icon, color, sub }: {
  label: string;
  value: string;
  icon: string;
  color: string;
  sub?: string;
}) {
  return (
    <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", color)}>
          <Icon name={icon} size={16} />
        </div>
        <span className="text-xs text-white/35">{label}</span>
      </div>
      <p className="font-mono text-xl font-semibold text-white/90">{value}</p>
      {sub && <p className="mt-1 text-[11px] text-white/25">{sub}</p>}
    </div>
  );
}

export default function Balance() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const { data: balance, isLoading: balLoading } = useQuery<BalanceData>({
    queryKey: ["km-balance"],
    queryFn: () => api.get<BalanceData>("api-km-balance"),
  });

  const { data: opsData, isLoading: opsLoading } = useQuery<OpsResponse>({
    queryKey: ["km-operations", page, typeFilter, dateFrom, dateTo],
    queryFn: () =>
      api.get<OpsResponse>("api-km-operations", {
        page,
        per_page: 20,
        type: typeFilter || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
      }),
  });

  const operations = opsData?.items ?? [];
  const totalOps = opsData?.total ?? 0;
  const totalPages = Math.ceil(totalOps / 20);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
          Счёт КМ
        </h1>
        <p className="mt-0.5 text-sm text-white/40">Баланс и история операций</p>
      </div>

      {/* Balance cards */}
      {balLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-[#12121c]" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Доступно"
              value={formatKM(balance?.available ?? 0)}
              icon="Wallet"
              color="bg-cyan-500/10 text-cyan-400"
            />
            <StatCard
              label="В резерве"
              value={formatKM(balance?.reserved ?? 0)}
              icon="Lock"
              color="bg-yellow-500/10 text-yellow-400"
            />
            <StatCard
              label="Бонус"
              value={formatKM(balance?.bonus ?? 0)}
              icon="Gift"
              color="bg-emerald-500/10 text-emerald-400"
              sub={balance?.bonus_expires_at ? `до ${formatDate(balance.bonus_expires_at)}` : undefined}
            />
            <StatCard
              label="Списано всего"
              value={formatKM(balance?.total_charged ?? 0)}
              icon="ArrowDownRight"
              color="bg-red-500/10 text-red-400"
            />
          </div>

          {/* Bonus warning */}
          {(balance?.bonus ?? 0) > 0 && balance?.bonus_expires_at && (
            <div className="flex items-center gap-2 rounded-md border border-emerald-500/15 bg-emerald-500/5 px-4 py-3">
              <Icon name="Clock" size={14} className="shrink-0 text-emerald-400/60" />
              <p className="text-xs text-white/50">
                Бонусные {formatKM(balance.bonus)} действуют до {formatDate(balance.bonus_expires_at)}
              </p>
            </div>
          )}
        </>
      )}

      {/* Operations table */}
      <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c]">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#1a1a2e] p-4">
          <h2 className="text-sm font-medium text-white/60">Операции</h2>
          <div className="flex-1" />
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v === "__all__" ? "" : v); setPage(1); }}>
            <SelectTrigger className="h-8 w-[160px] border-[#1a1a2e] bg-[#0f0f18] text-xs">
              <SelectValue placeholder="Тип операции" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Все типы</SelectItem>
              {Object.entries(KM_OPERATION_TYPES).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
            className="h-8 w-[140px] border-[#1a1a2e] bg-[#0f0f18] text-xs"
            placeholder="От"
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
            className="h-8 w-[140px] border-[#1a1a2e] bg-[#0f0f18] text-xs"
            placeholder="До"
          />
        </div>

        {opsLoading ? (
          <div className="space-y-1 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 animate-pulse rounded bg-[#0f0f18]" />
            ))}
          </div>
        ) : operations.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Icon name="Receipt" size={28} className="mb-2 text-white/15" />
            <p className="text-sm text-white/30">Операций не найдено</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
                    <th className="px-4 py-3 text-xs font-medium text-white/30">Дата</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/30">Сумма</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/30">Тип</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/30">Основание</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/30">Модуль</th>
                  </tr>
                </thead>
                <tbody>
                  {operations.map((op, idx) => {
                    const config = KM_OPERATION_TYPES[op.operation_type];
                    const isPositive = config?.sign === "+";
                    const isNegative = config?.sign === "\u2212";
                    return (
                      <tr
                        key={op.id}
                        className={cn(
                          "border-b border-[#1a1a2e] transition-colors",
                          idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]",
                          op.task_id && "cursor-pointer hover:bg-white/[0.02]"
                        )}
                        onClick={() => op.task_id && navigate(`/cabinet/tasks/${op.task_id}`)}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-white/40">
                          {formatDateTime(op.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "font-mono text-sm font-medium",
                              isPositive && "text-green-400",
                              isNegative && "text-red-400",
                              !isPositive && !isNegative && "text-yellow-400"
                            )}
                          >
                            {config?.sign ?? ""}{formatKM(op.amount)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={op.operation_type} type="km" />
                        </td>
                        <td className="max-w-[200px] truncate px-4 py-3 text-xs text-white/40">
                          {op.reason || "\u2014"}
                        </td>
                        <td className="px-4 py-3 text-xs text-white/35">{op.module_name ?? "\u2014"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 border-t border-[#1a1a2e] py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="h-7 text-xs text-white/40"
                >
                  <Icon name="ChevronLeft" size={14} />
                </Button>
                <span className="px-2 text-xs text-white/30">{page} / {totalPages}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="h-7 text-xs text-white/40"
                >
                  <Icon name="ChevronRight" size={14} />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
