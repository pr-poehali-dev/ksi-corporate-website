import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api, ApiError } from "@/lib/api";
import { KM_OPERATION_TYPES, STATUS_COLOR_MAP } from "@/lib/constants";
import { formatKM, formatDateTime } from "@/lib/formatters";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface KmOp { id: string; company_id: string | null; company_name: string; operation_type: string; amount: number; reason: string; task_id: string | null; module_name: string | null; created_at: string; created_by_name: string | null; balance_before: number | null; balance_after: number | null }
interface OpsResp { items: KmOp[]; total: number; page: number; per_page: number }

export default function Finance() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dialogType, setDialogType] = useState<"topup" | "correction" | "bonus" | null>(null);

  const { data, isLoading } = useQuery<OpsResp>({
    queryKey: ["admin-km-ops", page, typeFilter, dateFrom, dateTo],
    queryFn: () => api.get("api-km-operations", { page, per_page: 25, type: typeFilter || undefined, date_from: dateFrom || undefined, date_to: dateTo || undefined }),
  });

  const ops = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 25);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Финансы КМ</h1><p className="mt-0.5 text-sm text-white/40">{total} операций</p></div>
        <div className="flex gap-2">
          <Button onClick={() => setDialogType("topup")} className="btn-primary-ksi h-9 gap-2 px-4 text-xs"><Icon name="Plus" size={14} /> Начислить КМ</Button>
          <Button variant="outline" onClick={() => setDialogType("correction")} className="h-9 gap-2 border-[#1a1a2e] bg-transparent px-4 text-xs text-white/50 hover:bg-white/5"><Icon name="ArrowRightLeft" size={14} /> Корректировка</Button>
          <Button variant="outline" onClick={() => setDialogType("bonus")} className="h-9 gap-2 border-[#1a1a2e] bg-transparent px-4 text-xs text-white/50 hover:bg-white/5"><Icon name="Gift" size={14} /> Бонус</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-8 w-[160px] border-[#1a1a2e] bg-[#0f0f18] text-xs"><SelectValue placeholder="Тип" /></SelectTrigger>
          <SelectContent><SelectItem value="__all__">Все типы</SelectItem>{Object.entries(KM_OPERATION_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
        </Select>
        <Input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }} className="h-8 w-[140px] border-[#1a1a2e] bg-[#0f0f18] text-xs" />
        <Input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }} className="h-8 w-[140px] border-[#1a1a2e] bg-[#0f0f18] text-xs" />
      </div>

      {isLoading ? <div className="space-y-1">{[1,2,3,4,5].map(i => <div key={i} className="h-10 animate-pulse rounded bg-[#12121c]" />)}</div> : ops.length === 0 ? (
        <div className="flex flex-col items-center py-16"><Icon name="Receipt" size={28} className="mb-2 text-white/15" /><p className="text-sm text-white/30">Операций не найдено</p></div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
          <table className="w-full text-left text-xs">
            <thead><tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
              <th className="px-3 py-2.5 font-medium text-white/30">Дата</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Сумма</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Тип</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Компания</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Модуль</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Основание</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Оператор</th>
            </tr></thead>
            <tbody>{ops.map((op, idx) => {
              const config = KM_OPERATION_TYPES[op.operation_type];
              const isPositive = config?.sign === "+";
              const isNegative = config?.sign === "\u2212";
              return (
                <tr key={op.id} className={cn("border-b border-[#1a1a2e]", idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]", op.task_id && "cursor-pointer hover:bg-white/[0.02]")} onClick={() => op.task_id && navigate(`/admin/tasks/${op.task_id}`)}>
                  <td className="px-3 py-2.5 font-mono text-white/35">{formatDateTime(op.created_at)}</td>
                  <td className="px-3 py-2.5"><span className={cn("font-mono font-medium", isPositive && "text-green-400", isNegative && "text-red-400", !isPositive && !isNegative && "text-yellow-400")}>{config?.sign ?? ""}{formatKM(op.amount)}</span></td>
                  <td className="px-3 py-2.5"><StatusBadge status={op.operation_type} type="km" /></td>
                  <td className="px-3 py-2.5 text-white/40">{op.company_name ?? "\u2014"}</td>
                  <td className="px-3 py-2.5 text-white/30">{op.module_name ?? "\u2014"}</td>
                  <td className="max-w-[180px] truncate px-3 py-2.5 text-white/30">{op.reason || "\u2014"}</td>
                  <td className="px-3 py-2.5 text-white/25">{op.created_by_name ?? "\u2014"}</td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && <div className="flex items-center justify-center gap-2"><Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronLeft" size={14} /></Button><span className="text-xs text-white/30">{page}/{totalPages}</span><Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronRight" size={14} /></Button></div>}

      {dialogType && <KmOperationDialog type={dialogType} onClose={() => setDialogType(null)} onSuccess={() => { setDialogType(null); queryClient.invalidateQueries({ queryKey: ["admin-km-ops"] }); }} />}
    </div>
  );
}

function KmOperationDialog({ type, onClose, onSuccess }: { type: "topup" | "correction" | "bonus"; onClose: () => void; onSuccess: () => void }) {
  const [companyId, setCompanyId] = useState(""); const [amount, setAmount] = useState(""); const [reason, setReason] = useState(""); const [error, setError] = useState("");
  const titles: Record<string, string> = { topup: "Начислить КМ", correction: "Корректировка", bonus: "Бонусное начисление" };
  const mutation = useMutation({
    mutationFn: () => api.post("api-km-operations", { company_id: companyId, operation_type: type, amount: parseFloat(amount), reason: reason.trim() }),
    onSuccess: () => { setCompanyId(""); setAmount(""); setReason(""); setError(""); onSuccess(); },
    onError: (err) => setError(err instanceof ApiError ? (err.data?.error as string) || "Ошибка" : "Не удалось выполнить"),
  });
  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="border-[#1a1a2e] bg-[#12121c] sm:max-w-md">
        <DialogHeader><DialogTitle className="font-oswald text-base uppercase tracking-wider text-white/80">{titles[type]}</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); setError(""); if (!companyId) { setError("Укажите ID компании"); return; } if (!amount || parseFloat(amount) <= 0) { setError("Укажите сумму"); return; } mutation.mutate(); }} className="space-y-4 pt-2">
          <div className="space-y-1.5"><label className="text-xs text-white/40">ID компании *</label><Input value={companyId} onChange={e => setCompanyId(e.target.value)} placeholder="UUID" className="border-[#1a1a2e] bg-[#0f0f18] font-mono text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Сумма КМ *</label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Основание</label><Textarea value={reason} onChange={e => setReason(e.target.value)} className="min-h-[80px] resize-none border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          {error && <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2"><Icon name="AlertCircle" size={13} className="text-red-400" /><p className="text-xs text-red-400">{error}</p></div>}
          <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={onClose} className="h-9 border-[#1a1a2e] bg-transparent text-xs text-white/50">Отмена</Button><Button type="submit" disabled={mutation.isPending} className="btn-primary-ksi h-9 px-5 text-xs">{mutation.isPending && <Icon name="Loader2" size={13} className="mr-1.5 animate-spin" />}Выполнить</Button></div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
