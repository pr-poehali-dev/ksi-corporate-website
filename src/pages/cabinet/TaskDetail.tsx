import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { formatDate, formatDateTime, formatRelative, formatKM } from "@/lib/formatters";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TaskData {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    deadline: string | null;
    estimate_hours: number | null;
    created_at: string;
    updated_at: string | null;
    company: { id: string; name: string };
    module: { id: string | null; name: string | null };
    creator: { id: string; name: string; email: string };
    curator: { id: string; name: string; email: string } | null;
    executor: { id: string; name: string; email: string } | null;
  };
  comments: Array<{
    id: string;
    message: string;
    is_internal: boolean;
    created_at: string;
    user: { id: string; name: string; email: string };
  }>;
  attachments: Array<{
    id: string;
    file_name: string;
    file_url: string;
    file_size: number;
    created_at: string;
  }>;
  status_history: Array<{
    id: string;
    old_status: string | null;
    new_status: string;
    created_at: string;
    changed_by_name: string | null;
  }>;
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="w-28 shrink-0 text-xs text-white/30">{label}</span>
      <span className="text-sm text-white/70">{children}</span>
    </div>
  );
}

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { data, isLoading, error } = useQuery<TaskData>({
    queryKey: ["task-detail", id],
    queryFn: () => api.get<TaskData>("api-task-detail", { id: id! }),
    enabled: !!id,
  });

  const commentMutation = useMutation({
    mutationFn: (msg: string) =>
      api.post("api-task-comments", { task_id: id, message: msg, is_internal: false }),
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["task-detail", id] });
    },
  });

  const statusMutation = useMutation({
    mutationFn: (newStatus: string) =>
      api.put("api-tasks", { id, status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-detail", id] });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
        <div className="h-64 animate-pulse rounded-lg bg-[#12121c]" />
        <div className="h-48 animate-pulse rounded-lg bg-[#12121c]" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center py-20">
        <Icon name="AlertCircle" size={32} className="mb-3 text-red-400/60" />
        <p className="text-sm text-white/50">Задача не найдена</p>
        <Button variant="ghost" className="mt-3 text-xs text-white/40" onClick={() => navigate("/cabinet/tasks")}>
          Вернуться к списку
        </Button>
      </div>
    );
  }

  const { task, comments, attachments, status_history } = data;

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div>
        <button
          onClick={() => navigate("/cabinet/tasks")}
          className="mb-3 flex items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-white/60"
        >
          <Icon name="ArrowLeft" size={14} /> Назад к задачам
        </button>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-oswald text-lg font-medium uppercase tracking-wider text-white/90">
              {task.title}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <StatusBadge status={task.status} type="task" />
              <StatusBadge status={task.priority} type="priority" />
              {task.module.name && (
                <span className="rounded bg-[#1a1a2e] px-2 py-0.5 text-[10px] text-white/40">
                  {task.module.name}
                </span>
              )}
            </div>
          </div>
          {/* Actions by status */}
          <div className="flex gap-2">
            {task.status === "result_ready" && (
              <>
                <Button
                  onClick={() => statusMutation.mutate("confirmed")}
                  className="h-8 gap-1.5 bg-green-600 px-3 text-xs text-white hover:bg-green-700"
                  disabled={statusMutation.isPending}
                >
                  <Icon name="CheckCheck" size={13} /> Подтвердить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => statusMutation.mutate("rework")}
                  className="h-8 gap-1.5 border-orange-500/30 px-3 text-xs text-orange-400 hover:bg-orange-500/10"
                  disabled={statusMutation.isPending}
                >
                  <Icon name="RotateCcw" size={13} /> Доработка
                </Button>
                <Button
                  variant="outline"
                  onClick={() => statusMutation.mutate("dispute")}
                  className="h-8 gap-1.5 border-red-500/30 px-3 text-xs text-red-400 hover:bg-red-500/10"
                  disabled={statusMutation.isPending}
                >
                  <Icon name="AlertTriangle" size={13} /> Спор
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: main info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Description */}
          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Описание</h2>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/60">
              {task.description || "Описание не указано"}
            </div>
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Вложения</h2>
              <div className="space-y-1.5">
                {attachments.map((a) => (
                  <a
                    key={a.id}
                    href={a.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/[0.03]"
                  >
                    <Icon name="FileDown" size={15} className="text-cyan-400/60" />
                    <span className="flex-1 truncate text-xs text-white/60">{a.file_name}</span>
                    <span className="font-mono text-[10px] text-white/20">
                      {a.file_size ? `${Math.round(a.file_size / 1024)} KB` : ""}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/40">
              Комментарии ({comments.length})
            </h2>
            {comments.length === 0 && (
              <p className="py-4 text-center text-xs text-white/20">Комментариев пока нет</p>
            )}
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="rounded-md bg-[#0f0f18] px-4 py-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/60">{c.user.name}</span>
                    <span className="text-[10px] text-white/20">{formatRelative(c.created_at)}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-xs leading-relaxed text-white/50">{c.message}</p>
                </div>
              ))}
            </div>

            {/* Add comment */}
            <div className="mt-4 border-t border-[#1a1a2e] pt-4">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Написать комментарий..."
                className="mb-2 min-h-[80px] resize-none border-[#1a1a2e] bg-[#0f0f18] text-xs text-white/70 placeholder:text-white/20"
              />
              <Button
                onClick={() => comment.trim() && commentMutation.mutate(comment.trim())}
                disabled={!comment.trim() || commentMutation.isPending}
                className="btn-primary-ksi h-8 gap-1.5 px-4 text-xs"
              >
                {commentMutation.isPending ? (
                  <Icon name="Loader2" size={13} className="animate-spin" />
                ) : (
                  <Icon name="Send" size={13} />
                )}
                Отправить
              </Button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Details card */}
          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Детали</h2>
            <div className="divide-y divide-[#1a1a2e]">
              <InfoRow label="Модуль">{task.module.name ?? "\u2014"}</InfoRow>
              <InfoRow label="Создатель">{task.creator.name}</InfoRow>
              <InfoRow label="Куратор">{task.curator?.name ?? "\u2014"}</InfoRow>
              <InfoRow label="Исполнитель">{task.executor?.name ?? "\u2014"}</InfoRow>
              <InfoRow label="Создана">{formatDateTime(task.created_at)}</InfoRow>
              <InfoRow label="Срок">{formatDate(task.deadline)}</InfoRow>
              {task.estimate_hours && (
                <InfoRow label="Оценка">
                  <span className="font-mono">{task.estimate_hours} ч.</span>
                </InfoRow>
              )}
            </div>
          </div>

          {/* Status history */}
          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">
              История статусов
            </h2>
            <div className="relative space-y-0">
              {status_history.map((h, idx) => (
                <div key={h.id} className="relative flex gap-3 pb-4">
                  {idx < status_history.length - 1 && (
                    <div className="absolute left-[7px] top-4 h-full w-px bg-[#1a1a2e]" />
                  )}
                  <div className="relative z-10 mt-0.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-[#1a1a2e] bg-[#0f0f18]" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {h.old_status && <StatusBadge status={h.old_status} type="task" className="text-[10px]" />}
                      {h.old_status && <Icon name="ArrowRight" size={10} className="text-white/20" />}
                      <StatusBadge status={h.new_status} type="task" className="text-[10px]" />
                    </div>
                    <p className="mt-1 text-[10px] text-white/25">
                      {h.changed_by_name ?? "Система"} -- {formatRelative(h.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
