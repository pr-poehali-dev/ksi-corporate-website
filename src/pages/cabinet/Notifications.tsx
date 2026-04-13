import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { formatRelative } from "@/lib/formatters";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  entity_type: string | null;
  entity_id: string | null;
  created_at: string;
}

interface NotifResponse {
  items: Notification[];
  total: number;
  unread_count: number;
  page: number;
  per_page: number;
}

const TYPE_ICONS: Record<string, string> = {
  task_status: "ClipboardList",
  task_comment: "MessageSquare",
  task_result: "CheckCircle",
  km_operation: "Wallet",
  system: "Bell",
};

export default function Notifications() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<NotifResponse>({
    queryKey: ["notifications"],
    queryFn: () => api.get<NotifResponse>("api-notifications"),
  });

  const markRead = useMutation({
    mutationFn: (id: string) => api.post("api-notifications", { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllRead = useMutation({
    mutationFn: () => api.post("api-notifications", { all: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const notifications = data?.items ?? [];
  const unreadCount = data?.unread_count ?? 0;

  const handleClick = (notif: Notification) => {
    if (!notif.is_read) {
      markRead.mutate(notif.id);
    }
    if (notif.entity_type === "task" && notif.entity_id) {
      navigate(`/cabinet/tasks/${notif.entity_id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
            Уведомления
          </h1>
          <p className="mt-0.5 text-sm text-white/40">
            {unreadCount > 0 ? `${unreadCount} непрочитанных` : "Все прочитаны"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="h-8 gap-1.5 border-[#1a1a2e] bg-transparent px-3 text-xs text-white/50 hover:bg-white/5"
          >
            <Icon name="CheckCheck" size={13} />
            Отметить все прочитанными
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-[#12121c]" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center py-16">
          <Icon name="AlertCircle" size={28} className="mb-2 text-red-400/60" />
          <p className="text-sm text-white/40">Не удалось загрузить уведомления</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <Icon name="BellOff" size={36} className="mb-3 text-white/10" />
          <p className="text-sm text-white/40">Уведомлений пока нет</p>
          <p className="mt-1 text-xs text-white/20">
            Здесь будут появляться уведомления о задачах и операциях
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleClick(notif)}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border border-[#1a1a2e] p-4 transition-colors hover:border-[#252540]",
                notif.is_read ? "bg-[#12121c]" : "bg-[#14142a]"
              )}
            >
              {/* Icon */}
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                notif.is_read ? "bg-white/5 text-white/20" : "bg-cyan-500/10 text-cyan-400"
              )}>
                <Icon name={TYPE_ICONS[notif.notification_type] ?? "Bell"} size={15} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={cn("text-sm font-medium", notif.is_read ? "text-white/50" : "text-white/80")}>
                    {notif.title}
                  </p>
                  {!notif.is_read && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  )}
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-white/30">{notif.message}</p>
              </div>

              {/* Time */}
              <span className="shrink-0 text-[10px] text-white/20">
                {formatRelative(notif.created_at)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
