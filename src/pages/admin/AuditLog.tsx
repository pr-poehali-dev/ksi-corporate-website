import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { formatDateTime } from "@/lib/formatters";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AuditEntry {
  id: string; user_id: string | null; user_name: string | null; user_email: string | null;
  action: string; entity_type: string | null; entity_id: string | null;
  details: Record<string, unknown> | string | null; created_at: string;
}
interface AuditResp { items: AuditEntry[]; total: number; page: number; per_page: number }

const ACTION_COLORS: Record<string, string> = {
  login: "text-blue-400", logout: "text-blue-400",
  company_created: "text-green-400", company_updated: "text-blue-400",
  user_created: "text-green-400", user_updated: "text-blue-400",
  task_created: "text-green-400", task_updated: "text-blue-400",
  comment_added: "text-cyan-400", change_password: "text-yellow-400",
  module_connected: "text-green-400",
};

export default function AuditLog() {
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data, isLoading } = useQuery<AuditResp>({
    queryKey: ["admin-audit", page, actionFilter, entityFilter, dateFrom, dateTo],
    queryFn: () => api.get("api-audit", { page, per_page: 30, action: actionFilter || undefined, entity_type: entityFilter || undefined, date_from: dateFrom || undefined, date_to: dateTo || undefined }),
  });

  const entries = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 30);

  return (
    <div className="space-y-5">
      <div><h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Журнал аудита</h1><p className="mt-0.5 text-sm text-white/40">{total} записей</p></div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={actionFilter} onValueChange={(v) => { setActionFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-8 w-[160px] border-[#1a1a2e] bg-[#0f0f18] text-xs"><SelectValue placeholder="Действие" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Все действия</SelectItem>
            <SelectItem value="login">Вход</SelectItem><SelectItem value="task_created">Создание задачи</SelectItem>
            <SelectItem value="task_updated">Обновление задачи</SelectItem><SelectItem value="company_created">Создание компании</SelectItem>
            <SelectItem value="user_created">Создание пользователя</SelectItem><SelectItem value="comment_added">Комментарий</SelectItem>
            <SelectItem value="change_password">Смена пароля</SelectItem>
          </SelectContent>
        </Select>
        <Select value={entityFilter} onValueChange={(v) => { setEntityFilter(v === "__all__" ? "" : v); setPage(1); }}>
          <SelectTrigger className="h-8 w-[140px] border-[#1a1a2e] bg-[#0f0f18] text-xs"><SelectValue placeholder="Объект" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Все объекты</SelectItem>
            <SelectItem value="task">Задача</SelectItem><SelectItem value="company">Компания</SelectItem>
            <SelectItem value="user">Пользователь</SelectItem><SelectItem value="km_operation">КМ</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }} className="h-8 w-[140px] border-[#1a1a2e] bg-[#0f0f18] text-xs" />
        <Input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }} className="h-8 w-[140px] border-[#1a1a2e] bg-[#0f0f18] text-xs" />
      </div>

      {isLoading ? <div className="space-y-1">{[1,2,3,4,5].map(i => <div key={i} className="h-10 animate-pulse rounded bg-[#12121c]" />)}</div> : entries.length === 0 ? (
        <div className="flex flex-col items-center py-16"><Icon name="ScrollText" size={28} className="mb-2 text-white/15" /><p className="text-sm text-white/30">Записей не найдено</p></div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
          <table className="w-full text-left text-xs">
            <thead><tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
              <th className="px-3 py-2.5 font-medium text-white/30">Дата/Время</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Пользователь</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Действие</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Объект</th>
              <th className="px-3 py-2.5 font-medium text-white/30">Детали</th>
            </tr></thead>
            <tbody>{entries.map((e, idx) => {
              const actionColor = ACTION_COLORS[e.action] ?? "text-white/40";
              const isExpanded = expanded === e.id;
              const detailsObj = typeof e.details === "string" ? (() => { try { return JSON.parse(e.details); } catch { return null; } })() : e.details;
              return (
                <tr key={e.id} className={cn("border-b border-[#1a1a2e]", idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]")} onClick={() => setExpanded(isExpanded ? null : e.id)}>
                  <td className="px-3 py-2.5 font-mono text-white/35">{formatDateTime(e.created_at)}</td>
                  <td className="px-3 py-2.5 text-white/50">{e.user_name ?? "\u2014"}</td>
                  <td className={cn("px-3 py-2.5 font-medium", actionColor)}>{e.action}</td>
                  <td className="px-3 py-2.5 text-white/30">{e.entity_type ?? "\u2014"}{e.entity_id ? ` #${e.entity_id.slice(0, 8)}` : ""}</td>
                  <td className="px-3 py-2.5">
                    {detailsObj ? (
                      <div>
                        <button className="flex items-center gap-1 text-[10px] text-white/25 hover:text-white/50">
                          <Icon name={isExpanded ? "ChevronDown" : "ChevronRight"} size={10} /> {isExpanded ? "Скрыть" : "Показать"}
                        </button>
                        {isExpanded && (
                          <div className="mt-1.5 space-y-0.5 rounded bg-[#0a0a12] p-2">
                            {Object.entries(detailsObj).map(([k, v]) => (
                              <div key={k} className="flex gap-2"><span className="font-mono text-[10px] text-white/20">{k}:</span><span className="font-mono text-[10px] text-white/40">{String(v)}</span></div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : <span className="text-white/15">\u2014</span>}
                  </td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && <div className="flex items-center justify-center gap-2"><Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronLeft" size={14} /></Button><span className="text-xs text-white/30">{page}/{totalPages}</span><Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="h-7 text-xs text-white/40"><Icon name="ChevronRight" size={14} /></Button></div>}
    </div>
  );
}
