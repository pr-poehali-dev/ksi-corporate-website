import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api, ApiError } from "@/lib/api";
import { COMPANY_TYPES } from "@/lib/constants";
import { formatKM, formatDate } from "@/lib/formatters";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Company {
  id: string; name: string; inn: string | null; ogrn: string | null;
  company_type: string; status: string; contact_person: string | null;
  contact_email: string | null; contact_phone: string | null;
  balance: { available: number; reserved: number; bonus: number };
  created_at: string;
}

export default function Companies() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const { data, isLoading } = useQuery<{ items: Company[]; total: number; page: number; per_page: number }>({
    queryKey: ["admin-companies", page, search, statusFilter, typeFilter],
    queryFn: () => api.get("api-companies", { page, per_page: 20, search: search || undefined, status: statusFilter || undefined, type: typeFilter || undefined }),
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Компании</h1>
          <p className="mt-0.5 text-sm text-white/40">{total} всего</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="btn-primary-ksi h-9 gap-2 px-4 text-xs">
          <Icon name="Plus" size={14} /> Создать компанию
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon name="Search" size={14} className="text-white/20" />
          </div>
          <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Поиск по названию..." className="border-[#1a1a2e] bg-[#0f0f18] pl-9 text-xs" />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-9 w-[140px] border-[#1a1a2e] bg-[#0f0f18] text-xs"><SelectValue placeholder="Статус" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Все статусы</SelectItem>
            <SelectItem value="active">Активна</SelectItem>
            <SelectItem value="suspended">Приостановлена</SelectItem>
            <SelectItem value="blocked">Заблокирована</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-9 w-[140px] border-[#1a1a2e] bg-[#0f0f18] text-xs"><SelectValue placeholder="Тип" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Все типы</SelectItem>
            {COMPANY_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-1">{[1,2,3,4,5].map(i => <div key={i} className="h-12 animate-pulse rounded bg-[#12121c]" />)}</div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center py-16">
          <Icon name="Building2" size={28} className="mb-2 text-white/15" />
          <p className="text-sm text-white/30">Компаний не найдено</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
                <th className="px-4 py-3 text-xs font-medium text-white/30">Название</th>
                <th className="px-4 py-3 text-xs font-medium text-white/30">Тип</th>
                <th className="px-4 py-3 text-xs font-medium text-white/30">Баланс КМ</th>
                <th className="px-4 py-3 text-xs font-medium text-white/30">Статус</th>
                <th className="px-4 py-3 text-xs font-medium text-white/30">Дата</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c, idx) => (
                <tr key={c.id} onClick={() => navigate(`/admin/companies/${c.id}`)} className={cn("cursor-pointer border-b border-[#1a1a2e] transition-colors hover:bg-white/[0.02]", idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]")}>
                  <td className="px-4 py-3 font-medium text-white/70">{c.name}</td>
                  <td className="px-4 py-3 text-xs text-white/40">{COMPANY_TYPES.find(t => t.value === c.company_type)?.label ?? c.company_type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-white/50">{formatKM(c.balance.available)}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} type="company" /></td>
                  <td className="px-4 py-3 font-mono text-xs text-white/25">{formatDate(c.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronLeft" size={14} /></Button>
          <span className="text-xs text-white/30">{page} / {totalPages}</span>
          <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronRight" size={14} /></Button>
        </div>
      )}

      <CreateCompanyDialog open={showCreate} onClose={() => setShowCreate(false)} onSuccess={() => { setShowCreate(false); queryClient.invalidateQueries({ queryKey: ["admin-companies"] }); }} />
    </div>
  );
}

function CreateCompanyDialog({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [inn, setInn] = useState("");
  const [ogrn, setOgrn] = useState("");
  const [companyType, setCompanyType] = useState("standard");
  const [contactPerson, setContactPerson] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => api.post("api-companies", { name: name.trim(), inn: inn.trim() || undefined, ogrn: ogrn.trim() || undefined, company_type: companyType, contact_person: contactPerson.trim() || undefined, contact_email: contactEmail.trim() || undefined, contact_phone: contactPhone.trim() || undefined }),
    onSuccess: () => { setName(""); setInn(""); setOgrn(""); setContactPerson(""); setContactEmail(""); setContactPhone(""); setError(""); onSuccess(); },
    onError: (err) => { setError(err instanceof ApiError ? (err.data?.error as string) || "Ошибка" : "Не удалось создать"); },
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="border-[#1a1a2e] bg-[#12121c] sm:max-w-lg">
        <DialogHeader><DialogTitle className="font-oswald text-base uppercase tracking-wider text-white/80">Создать компанию</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); setError(""); if (!name.trim()) { setError("Укажите название"); return; } mutation.mutate(); }} className="space-y-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs text-white/40">Название *</label>
              <Input value={name} onChange={e => setName(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" />
            </div>
            <div className="space-y-1.5"><label className="text-xs text-white/40">ИНН</label><Input value={inn} onChange={e => setInn(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
            <div className="space-y-1.5"><label className="text-xs text-white/40">ОГРН</label><Input value={ogrn} onChange={e => setOgrn(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
            <div className="space-y-1.5"><label className="text-xs text-white/40">Тип</label>
              <Select value={companyType} onValueChange={setCompanyType}><SelectTrigger className="border-[#1a1a2e] bg-[#0f0f18] text-sm"><SelectValue /></SelectTrigger><SelectContent>{COMPANY_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-1.5"><label className="text-xs text-white/40">Контактное лицо</label><Input value={contactPerson} onChange={e => setContactPerson(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
            <div className="space-y-1.5"><label className="text-xs text-white/40">Email</label><Input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
            <div className="space-y-1.5"><label className="text-xs text-white/40">Телефон</label><Input value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          </div>
          {error && <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2"><Icon name="AlertCircle" size={13} className="text-red-400" /><p className="text-xs text-red-400">{error}</p></div>}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="h-9 border-[#1a1a2e] bg-transparent text-xs text-white/50">Отмена</Button>
            <Button type="submit" disabled={mutation.isPending} className="btn-primary-ksi h-9 px-5 text-xs">{mutation.isPending && <Icon name="Loader2" size={13} className="mr-1.5 animate-spin" />}Создать</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
