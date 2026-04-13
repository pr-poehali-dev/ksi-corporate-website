import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { formatKM, formatDate, formatDateTime } from "@/lib/formatters";
import { KM_OPERATION_TYPES, STATUS_COLOR_MAP, USER_ROLES_CLIENT } from "@/lib/constants";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CompanyData {
  company: { id: string; name: string; inn: string | null; ogrn: string | null; company_type: string; status: string; contact_person: string | null; contact_email: string | null; contact_phone: string | null; balance: { available: number; reserved: number; bonus: number; bonus_expires_at: string | null }; created_at: string; updated_at: string | null };
  employees: Array<{ id: string; email: string; full_name: string; phone: string | null; status: string; role: string; joined_at: string | null }>;
  modules: Array<{ id: string; name: string; slug: string; status: string; connected_at: string | null }>;
  task_stats: Record<string, number>;
  km_stats: { total_operations: number; total_charged: number };
}

function InfoField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="py-2">
      <p className="mb-0.5 text-[11px] text-white/25">{label}</p>
      <p className="text-sm text-white/70">{value || "\u2014"}</p>
    </div>
  );
}

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showTopup, setShowTopup] = useState(false);

  const { data, isLoading, error } = useQuery<CompanyData>({
    queryKey: ["admin-company-detail", id],
    queryFn: () => api.get<CompanyData>("api-company-detail", { id: id! }),
    enabled: !!id,
  });

  if (isLoading) return <div className="space-y-4"><div className="h-8 w-48 animate-pulse rounded bg-white/5" /><div className="h-64 animate-pulse rounded-lg bg-[#12121c]" /></div>;
  if (error || !data) return <div className="flex flex-col items-center py-20"><Icon name="AlertCircle" size={32} className="mb-3 text-red-400/60" /><p className="text-sm text-white/50">Компания не найдена</p><Button variant="ghost" className="mt-3 text-xs text-white/40" onClick={() => navigate("/admin/companies")}>Назад</Button></div>;

  const { company: c, employees, modules, task_stats, km_stats } = data;
  const totalTasks = Object.values(task_stats).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/admin/companies")} className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60"><Icon name="ArrowLeft" size={14} /> Компании</button>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">{c.name}</h1>
          <div className="mt-1.5 flex items-center gap-2"><StatusBadge status={c.status} type="company" /><span className="text-xs text-white/30">{c.company_type}</span></div>
        </div>
        <Button onClick={() => setShowTopup(true)} className="btn-primary-ksi h-9 gap-2 px-4 text-xs"><Icon name="Plus" size={14} /> Начислить КМ</Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="border border-[#1a1a2e] bg-[#0f0f18]">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-[#1a1a2e]">Обзор</TabsTrigger>
          <TabsTrigger value="employees" className="text-xs data-[state=active]:bg-[#1a1a2e]">Сотрудники ({employees.length})</TabsTrigger>
          <TabsTrigger value="modules" className="text-xs data-[state=active]:bg-[#1a1a2e]">Модули ({modules.length})</TabsTrigger>
          <TabsTrigger value="finance" className="text-xs data-[state=active]:bg-[#1a1a2e]">Финансы</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/35">Реквизиты</h3>
              <div className="divide-y divide-[#1a1a2e]">
                <InfoField label="ИНН" value={c.inn} />
                <InfoField label="ОГРН" value={c.ogrn} />
                <InfoField label="Дата регистрации" value={formatDate(c.created_at)} />
              </div>
            </div>
            <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/35">Контакты</h3>
              <div className="divide-y divide-[#1a1a2e]">
                <InfoField label="Контактное лицо" value={c.contact_person} />
                <InfoField label="Email" value={c.contact_email} />
                <InfoField label="Телефон" value={c.contact_phone} />
              </div>
            </div>
            <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/35">Баланс</h3>
              <div className="grid grid-cols-3 gap-4">
                <div><p className="text-[11px] text-white/25">Доступно</p><p className="font-mono text-lg font-semibold text-cyan-400">{formatKM(c.balance.available)}</p></div>
                <div><p className="text-[11px] text-white/25">Резерв</p><p className="font-mono text-lg font-semibold text-yellow-400">{formatKM(c.balance.reserved)}</p></div>
                <div><p className="text-[11px] text-white/25">Бонус</p><p className="font-mono text-lg font-semibold text-emerald-400">{formatKM(c.balance.bonus)}</p></div>
              </div>
            </div>
            <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/35">Задачи</h3>
              <p className="mb-2 font-mono text-lg font-semibold text-white/70">{totalTasks} всего</p>
              <div className="flex flex-wrap gap-2">{Object.entries(task_stats).map(([s, count]) => <span key={s} className="flex items-center gap-1"><StatusBadge status={s} type="task" /><span className="font-mono text-xs text-white/30">{count}</span></span>)}</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="mt-4">
          {employees.length === 0 ? <p className="py-8 text-center text-xs text-white/25">Нет сотрудников</p> : (
            <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b border-[#1a1a2e] bg-[#0f0f18]"><th className="px-4 py-3 text-xs font-medium text-white/30">ФИО</th><th className="px-4 py-3 text-xs font-medium text-white/30">Email</th><th className="px-4 py-3 text-xs font-medium text-white/30">Роль</th><th className="px-4 py-3 text-xs font-medium text-white/30">Статус</th></tr></thead>
                <tbody>
                  {employees.map((e, idx) => (
                    <tr key={e.id} className={cn("border-b border-[#1a1a2e]", idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]")}>
                      <td className="px-4 py-3 text-white/70">{e.full_name}</td>
                      <td className="px-4 py-3 text-white/40">{e.email}</td>
                      <td className="px-4 py-3 text-xs text-white/40">{USER_ROLES_CLIENT.find(r => r.value === e.role)?.label ?? e.role}</td>
                      <td className="px-4 py-3"><StatusBadge status={e.status} type="company" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="modules" className="mt-4">
          {modules.length === 0 ? <p className="py-8 text-center text-xs text-white/25">Нет подключённых модулей</p> : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map(m => (
                <div key={m.id} className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-4">
                  <div className="flex items-center justify-between"><p className="text-sm font-medium text-white/70">{m.name}</p><StatusBadge status={m.status} type="module" /></div>
                  <p className="mt-1 text-[11px] text-white/25">{m.connected_at ? `Подключён ${formatDate(m.connected_at)}` : ""}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="finance" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-4"><p className="text-[11px] text-white/25">Доступно</p><p className="font-mono text-xl font-semibold text-cyan-400">{formatKM(c.balance.available)}</p></div>
            <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-4"><p className="text-[11px] text-white/25">Списано всего</p><p className="font-mono text-xl font-semibold text-red-400">{formatKM(km_stats.total_charged)}</p></div>
            <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-4"><p className="text-[11px] text-white/25">Операций</p><p className="font-mono text-xl font-semibold text-white/70">{km_stats.total_operations}</p></div>
          </div>
        </TabsContent>
      </Tabs>

      <TopupDialog open={showTopup} companyId={id!} onClose={() => setShowTopup(false)} onSuccess={() => { setShowTopup(false); queryClient.invalidateQueries({ queryKey: ["admin-company-detail", id] }); }} />
    </div>
  );
}

function TopupDialog({ open, companyId, onClose, onSuccess }: { open: boolean; companyId: string; onClose: () => void; onSuccess: () => void }) {
  const [amount, setAmount] = useState(""); const [reason, setReason] = useState(""); const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: () => api.post("api-km-operations", { company_id: companyId, operation_type: "topup", amount: parseFloat(amount), reason: reason.trim() }),
    onSuccess: () => { setAmount(""); setReason(""); setError(""); onSuccess(); },
    onError: (err) => { setError(err instanceof ApiError ? (err.data?.error as string) || "Ошибка" : "Не удалось начислить"); },
  });
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="border-[#1a1a2e] bg-[#12121c] sm:max-w-md">
        <DialogHeader><DialogTitle className="font-oswald text-base uppercase tracking-wider text-white/80">Начислить КМ</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); setError(""); if (!amount || parseFloat(amount) <= 0) { setError("Укажите сумму"); return; } mutation.mutate(); }} className="space-y-4 pt-2">
          <div className="space-y-1.5"><label className="text-xs text-white/40">Сумма КМ *</label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Основание</label><Textarea value={reason} onChange={e => setReason(e.target.value)} className="min-h-[80px] resize-none border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          {error && <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2"><Icon name="AlertCircle" size={13} className="text-red-400" /><p className="text-xs text-red-400">{error}</p></div>}
          <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={onClose} className="h-9 border-[#1a1a2e] bg-transparent text-xs text-white/50">Отмена</Button><Button type="submit" disabled={mutation.isPending} className="btn-primary-ksi h-9 px-5 text-xs">{mutation.isPending && <Icon name="Loader2" size={13} className="mr-1.5 animate-spin" />}Начислить</Button></div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
