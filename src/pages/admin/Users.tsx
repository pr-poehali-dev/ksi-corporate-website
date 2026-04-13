import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { USER_ROLES_INTERNAL } from "@/lib/constants";
import { formatDate } from "@/lib/formatters";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface User { id: string; email: string; full_name: string; phone: string | null; user_type: string; internal_role: string | null; status: string; created_at: string; last_login_at: string | null }

export default function Users() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const { data, isLoading } = useQuery<{ items: User[]; total: number }>({
    queryKey: ["admin-users", page, search, roleFilter],
    queryFn: () => api.get("api-users", { page, per_page: 25, search: search || undefined, user_type: "internal" }),
  });

  const users = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 25);

  const toggleStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => api.put("api-users", { id, status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Пользователи</h1><p className="mt-0.5 text-sm text-white/40">{total} внутренних пользователей</p></div>
        <Button onClick={() => setShowCreate(true)} className="btn-primary-ksi h-9 gap-2 px-4 text-xs"><Icon name="Plus" size={14} /> Создать пользователя</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Icon name="Search" size={14} className="text-white/20" /></div>
          <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Поиск..." className="border-[#1a1a2e] bg-[#0f0f18] pl-9 text-xs" />
        </div>
        <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-9 w-[160px] border-[#1a1a2e] bg-[#0f0f18] text-xs"><SelectValue placeholder="Роль" /></SelectTrigger>
          <SelectContent><SelectItem value="__all__">Все роли</SelectItem>{USER_ROLES_INTERNAL.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {isLoading ? <div className="space-y-1">{[1,2,3,4].map(i => <div key={i} className="h-12 animate-pulse rounded bg-[#12121c]" />)}</div> : users.length === 0 ? (
        <div className="flex flex-col items-center py-16"><Icon name="Users" size={28} className="mb-2 text-white/15" /><p className="text-sm text-white/30">Пользователей не найдено</p></div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
              <th className="px-4 py-3 text-xs font-medium text-white/30">ФИО</th>
              <th className="px-4 py-3 text-xs font-medium text-white/30">Email</th>
              <th className="px-4 py-3 text-xs font-medium text-white/30">Роль</th>
              <th className="px-4 py-3 text-xs font-medium text-white/30">Статус</th>
              <th className="px-4 py-3 text-xs font-medium text-white/30">Посл. вход</th>
              <th className="px-4 py-3 text-xs font-medium text-white/30"></th>
            </tr></thead>
            <tbody>{users.map((u, idx) => {
              const roleLabel = USER_ROLES_INTERNAL.find(r => r.value === u.internal_role)?.label ?? u.internal_role ?? "---";
              return (
                <tr key={u.id} className={cn("border-b border-[#1a1a2e]", idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]")}>
                  <td className="px-4 py-3 text-white/70">{u.full_name}</td>
                  <td className="px-4 py-3 text-white/40">{u.email}</td>
                  <td className="px-4 py-3 text-xs text-white/50">{roleLabel}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} type="company" /></td>
                  <td className="px-4 py-3 font-mono text-xs text-white/25">{u.last_login_at ? formatDate(u.last_login_at) : "\u2014"}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] text-white/30 hover:text-white/60"
                      onClick={() => toggleStatus.mutate({ id: u.id, status: u.status === "active" ? "blocked" : "active" })}>
                      {u.status === "active" ? "Заблокировать" : "Активировать"}
                    </Button>
                  </td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && <div className="flex items-center justify-center gap-2"><Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronLeft" size={14} /></Button><span className="text-xs text-white/30">{page}/{totalPages}</span><Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronRight" size={14} /></Button></div>}

      <CreateUserDialog open={showCreate} onClose={() => setShowCreate(false)} onSuccess={() => { setShowCreate(false); queryClient.invalidateQueries({ queryKey: ["admin-users"] }); }} />
    </div>
  );
}

function CreateUserDialog({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [fullName, setFullName] = useState(""); const [phone, setPhone] = useState(""); const [role, setRole] = useState("curator"); const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: () => api.post("api-users", { email: email.trim(), password, full_name: fullName.trim(), phone: phone.trim() || undefined, user_type: "internal", internal_role: role }),
    onSuccess: () => { setEmail(""); setPassword(""); setFullName(""); setPhone(""); setError(""); onSuccess(); },
    onError: (err) => setError(err instanceof ApiError ? (err.data?.error as string) || "Ошибка" : "Не удалось создать"),
  });
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="border-[#1a1a2e] bg-[#12121c] sm:max-w-md">
        <DialogHeader><DialogTitle className="font-oswald text-base uppercase tracking-wider text-white/80">Создать пользователя</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); setError(""); if (!email.trim() || !fullName.trim() || !password) { setError("Заполните обязательные поля"); return; } if (password.length < 8) { setError("Пароль минимум 8 символов"); return; } mutation.mutate(); }} className="space-y-4 pt-2">
          <div className="space-y-1.5"><label className="text-xs text-white/40">ФИО *</label><Input value={fullName} onChange={e => setFullName(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Email *</label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Пароль *</label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Телефон</label><Input value={phone} onChange={e => setPhone(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Роль</label><Select value={role} onValueChange={setRole}><SelectTrigger className="border-[#1a1a2e] bg-[#0f0f18] text-sm"><SelectValue /></SelectTrigger><SelectContent>{USER_ROLES_INTERNAL.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent></Select></div>
          {error && <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2"><Icon name="AlertCircle" size={13} className="text-red-400" /><p className="text-xs text-red-400">{error}</p></div>}
          <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={onClose} className="h-9 border-[#1a1a2e] bg-transparent text-xs text-white/50">Отмена</Button><Button type="submit" disabled={mutation.isPending} className="btn-primary-ksi h-9 px-5 text-xs">{mutation.isPending && <Icon name="Loader2" size={13} className="mr-1.5 animate-spin" />}Создать</Button></div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
