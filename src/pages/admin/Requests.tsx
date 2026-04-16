import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { formatDateTime } from "@/lib/formatters";
import Icon from "@/components/ui/icon";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface RequestItem {
  id: number;
  name: string;
  org: string;
  email: string;
  phone: string;
  messengers: string[];
  role: string;
  message: string;
  source_ip: string;
  status: string;
  created_at: string;
}

const MESSENGER_LABELS: Record<string, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  viber: "Viber",
  call: "Звонок",
};

interface RequestsResp {
  items: RequestItem[];
  total: number;
  page: number;
  per_page: number;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "Новая", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  reviewed: { label: "Просмотрена", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  replied: { label: "Отвечено", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  archived: { label: "Архив", color: "text-white/30", bg: "bg-white/5 border-white/10" },
};

const ROLE_LABELS: Record<string, string> = {
  developer: "Девелопер",
  land: "Землевладелец",
  "asset-owner": "Владелец актива",
  "project-team": "Проектная команда",
  beta: "Бета-тестирование",
  investor: "Инвестор",
  strategic: "Стратег. партнёр",
  tech: "Технол. партнёр",
  "ai-client": "Заказчик ИИ",
  media: "Медиа",
  other: "Другое",
};

const TABS = [
  { key: "", label: "Все" },
  { key: "new", label: "Новые" },
  { key: "reviewed", label: "Просмотрены" },
  { key: "replied", label: "Отвечено" },
  { key: "archived", label: "Архив" },
];

const PER_PAGE = 20;

export default function AdminRequests() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data, isLoading } = useQuery<RequestsResp>({
    queryKey: ["admin-requests", page, statusFilter],
    queryFn: () =>
      api.get("contact-form", {
        page,
        per_page: PER_PAGE,
        status: statusFilter || undefined,
      }),
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PER_PAGE);

  const allQuery = useQuery<RequestsResp>({
    queryKey: ["admin-requests-stats"],
    queryFn: () => api.get("contact-form", { page: 1, per_page: 1 }),
  });

  const newQuery = useQuery<{ count: number }>({
    queryKey: ["admin-new-requests-count"],
    queryFn: () => api.get("contact-form", { count: "new" }),
  });

  const todayCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return items.filter((r) => r.created_at?.slice(0, 10) === today).length;
  }, [items]);

  const statusMutation = useMutation({
    mutationFn: (vars: { id: number; status: string }) =>
      api.put("contact-form", { id: vars.id, status: vars.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-requests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-requests-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-new-requests-count"] });
      toast({ title: "Статус обновлен" });
    },
    onError: (err) => {
      toast({
        title: "Ошибка",
        description: err instanceof ApiError ? (err.data?.error as string) || "Не удалось обновить" : "Не удалось обновить",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    statusMutation.mutate({ id, status: newStatus });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
          Обращения
        </h1>
        <p className="mt-0.5 text-sm text-white/40">Заявки с формы связи</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-3 rounded-lg border border-[#1a1a2e] bg-[#12121c] px-4 py-2.5">
          <Icon name="MessageSquare" size={16} className="text-white/20" />
          <div>
            <p className="text-lg font-semibold text-white/80">{allQuery.data?.total ?? "..."}</p>
            <p className="text-[10px] text-white/30">Всего</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-[#1a1a2e] bg-[#12121c] px-4 py-2.5">
          <Icon name="Sparkles" size={16} className="text-cyan-400/50" />
          <div>
            <p className="text-lg font-semibold text-cyan-400">{newQuery.data?.count ?? "..."}</p>
            <p className="text-[10px] text-white/30">Новых</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-[#1a1a2e] bg-[#12121c] px-4 py-2.5">
          <Icon name="CalendarDays" size={16} className="text-white/20" />
          <div>
            <p className="text-lg font-semibold text-white/80">{todayCount}</p>
            <p className="text-[10px] text-white/30">Сегодня</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-[#1a1a2e] bg-[#0f0f18] p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setStatusFilter(tab.key);
              setPage(1);
            }}
            className={cn(
              "rounded-md px-4 py-1.5 text-xs font-medium transition-colors",
              statusFilter === tab.key
                ? "bg-cyan-500/10 text-cyan-400"
                : "text-white/40 hover:text-white/60"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-[#12121c]" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center py-16">
          <Icon name="MessageSquare" size={28} className="mb-2 text-white/15" />
          <p className="text-sm text-white/30">Обращений не найдено</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
                <th className="px-3 py-2.5 font-medium text-white/30">Дата</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Имя</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Email</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Телефон</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Организация</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Роль</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Статус</th>
                <th className="px-3 py-2.5 font-medium text-white/30">Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r, idx) => {
                const isExpanded = expandedId === r.id;
                const sc = STATUS_CONFIG[r.status] ?? STATUS_CONFIG.new;
                return (
                  <tr
                    key={r.id}
                    className={cn(
                      "border-b border-[#1a1a2e] transition-colors",
                      idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]"
                    )}
                  >
                    <td className="px-3 py-2.5 align-top font-mono text-white/35">
                      {formatDateTime(r.created_at)}
                    </td>
                    <td className="px-3 py-2.5 align-top">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : r.id)}
                        className="flex items-center gap-1.5 text-left font-medium text-white/70 hover:text-white/90"
                      >
                        <Icon
                          name={isExpanded ? "ChevronDown" : "ChevronRight"}
                          size={12}
                          className="shrink-0 text-white/20"
                        />
                        <span>{r.name}</span>
                      </button>
                      {isExpanded && (
                        <div className="mt-2 ml-5 max-w-md space-y-2 rounded bg-[#0a0a12] p-3">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-white/20">
                            Сообщение
                          </p>
                          <p className="whitespace-pre-wrap text-xs leading-relaxed text-white/50">
                            {r.message || "\u2014"}
                          </p>
                          {r.source_ip && (
                            <p className="text-[10px] text-white/15">IP: {r.source_ip}</p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2.5 align-top">
                      <a
                        href={`mailto:${r.email}`}
                        className="text-cyan-400/70 hover:text-cyan-400"
                      >
                        {r.email}
                      </a>
                    </td>
                    <td className="px-3 py-2.5 align-top">
                      {r.phone ? (
                        <div className="space-y-1">
                          <a
                            href={`tel:${r.phone.replace(/[^+\d]/g, "")}`}
                            className="block text-white/60 hover:text-white/90"
                          >
                            {r.phone}
                          </a>
                          {r.messengers && r.messengers.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {r.messengers.map((m) => (
                                <span
                                  key={m}
                                  className="rounded border border-cyan-500/20 bg-cyan-500/5 px-1.5 py-0.5 text-[10px] text-cyan-400/80"
                                >
                                  {MESSENGER_LABELS[m] ?? m}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-white/25">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 align-top text-white/40">{r.org || "\u2014"}</td>
                    <td className="px-3 py-2.5 align-top text-white/40">
                      {ROLE_LABELS[r.role] ?? r.role || "\u2014"}
                    </td>
                    <td className="px-3 py-2.5 align-top">
                      <span
                        className={cn(
                          "inline-block rounded border px-2 py-0.5 text-[10px] font-medium",
                          sc.bg,
                          sc.color
                        )}
                      >
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 align-top">
                      <div className="flex items-center gap-1">
                        {r.status !== "reviewed" && (
                          <button
                            onClick={() => handleStatusChange(r.id, "reviewed")}
                            title="Просмотрена"
                            className="rounded p-1 text-white/20 transition-colors hover:bg-yellow-500/10 hover:text-yellow-400"
                          >
                            <Icon name="Eye" size={14} />
                          </button>
                        )}
                        {r.status !== "replied" && (
                          <button
                            onClick={() => handleStatusChange(r.id, "replied")}
                            title="Отвечено"
                            className="rounded p-1 text-white/20 transition-colors hover:bg-green-500/10 hover:text-green-400"
                          >
                            <Icon name="CheckCircle" size={14} />
                          </button>
                        )}
                        {r.status !== "archived" && (
                          <button
                            onClick={() => handleStatusChange(r.id, "archived")}
                            title="В архив"
                            className="rounded p-1 text-white/20 transition-colors hover:bg-white/5 hover:text-white/50"
                          >
                            <Icon name="Archive" size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="rounded p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white/70 disabled:opacity-30"
          >
            <Icon name="ChevronLeft" size={14} />
          </button>
          <span className="text-xs text-white/30">
            {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white/70 disabled:opacity-30"
          >
            <Icon name="ChevronRight" size={14} />
          </button>
        </div>
      )}
    </div>
  );
}