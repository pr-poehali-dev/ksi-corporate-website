import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Module { id: string; name: string; slug: string; description: string; status: string; created_at: string }

export default function Modules() {
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);

  const { data, isLoading } = useQuery<{ items: Module[] }>({
    queryKey: ["admin-modules"],
    queryFn: () => api.get("api-modules"),
  });

  const modules = data?.items ?? [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Модули</h1><p className="mt-0.5 text-sm text-white/40">{modules.length} модулей в системе</p></div>
        <Button onClick={() => setShowCreate(true)} className="btn-primary-ksi h-9 gap-2 px-4 text-xs"><Icon name="Plus" size={14} /> Создать модуль</Button>
      </div>

      {isLoading ? <div className="space-y-1">{[1,2,3].map(i => <div key={i} className="h-12 animate-pulse rounded bg-[#12121c]" />)}</div> : modules.length === 0 ? (
        <div className="flex flex-col items-center py-16"><Icon name="Blocks" size={28} className="mb-2 text-white/15" /><p className="text-sm text-white/30">Модулей нет</p></div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
              <th className="px-4 py-3 text-xs font-medium text-white/30">Название</th>
              <th className="px-4 py-3 text-xs font-medium text-white/30">Slug</th>
              <th className="px-4 py-3 text-xs font-medium text-white/30">Описание</th>
              <th className="px-4 py-3 text-xs font-medium text-white/30">Статус</th>
            </tr></thead>
            <tbody>{modules.map((m, idx) => (
              <tr key={m.id} className={cn("border-b border-[#1a1a2e]", idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]")}>
                <td className="px-4 py-3 font-medium text-white/70">{m.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-white/35">{m.slug}</td>
                <td className="max-w-[300px] truncate px-4 py-3 text-xs text-white/40">{m.description || "\u2014"}</td>
                <td className="px-4 py-3"><StatusBadge status={m.status} type="module" /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      <CreateModuleDialog open={showCreate} onClose={() => setShowCreate(false)} onSuccess={() => { setShowCreate(false); queryClient.invalidateQueries({ queryKey: ["admin-modules"] }); }} />
    </div>
  );
}

function CreateModuleDialog({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState(""); const [slug, setSlug] = useState(""); const [description, setDescription] = useState(""); const [status, setStatus] = useState("active"); const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: () => api.post("api-modules", { name: name.trim(), slug: slug.trim(), description: description.trim(), status }),
    onSuccess: () => { setName(""); setSlug(""); setDescription(""); setError(""); onSuccess(); },
    onError: (err) => setError(err instanceof ApiError ? (err.data?.error as string) || "Ошибка" : "Не удалось создать"),
  });
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="border-[#1a1a2e] bg-[#12121c] sm:max-w-md">
        <DialogHeader><DialogTitle className="font-oswald text-base uppercase tracking-wider text-white/80">Создать модуль</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); setError(""); if (!name.trim()) { setError("Укажите название"); return; } mutation.mutate(); }} className="space-y-4 pt-2">
          <div className="space-y-1.5"><label className="text-xs text-white/40">Название *</label><Input value={name} onChange={e => setName(e.target.value)} className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Slug</label><Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="module-slug" className="border-[#1a1a2e] bg-[#0f0f18] font-mono text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Описание</label><Textarea value={description} onChange={e => setDescription(e.target.value)} className="min-h-[80px] resize-none border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80" /></div>
          <div className="space-y-1.5"><label className="text-xs text-white/40">Статус</label><Select value={status} onValueChange={setStatus}><SelectTrigger className="border-[#1a1a2e] bg-[#0f0f18] text-sm"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Активен</SelectItem><SelectItem value="beta">Бета</SelectItem><SelectItem value="inactive">Неактивен</SelectItem></SelectContent></Select></div>
          {error && <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2"><Icon name="AlertCircle" size={13} className="text-red-400" /><p className="text-xs text-red-400">{error}</p></div>}
          <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={onClose} className="h-9 border-[#1a1a2e] bg-transparent text-xs text-white/50">Отмена</Button><Button type="submit" disabled={mutation.isPending} className="btn-primary-ksi h-9 px-5 text-xs">{mutation.isPending && <Icon name="Loader2" size={13} className="mr-1.5 animate-spin" />}Создать</Button></div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
