import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface Module {
  id: string;
  name: string;
  slug: string;
  connection_status: string | null;
}

export default function TaskCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const { data: modulesData } = useQuery<{ items: Module[] }>({
    queryKey: ["modules"],
    queryFn: () => api.get<{ items: Module[] }>("api-modules"),
  });

  const connectedModules = (modulesData?.items ?? []).filter(
    (m) => m.connection_status === "active"
  );

  const mutation = useMutation({
    mutationFn: () =>
      api.post<{ id: string }>("api-tasks", {
        title: title.trim(),
        module_id: moduleId || undefined,
        description: description.trim(),
        priority,
        deadline: deadline || undefined,
      }),
    onSuccess: (data) => {
      navigate(`/cabinet/tasks/${data.id}`);
    },
    onError: (err) => {
      if (err instanceof ApiError) {
        setError((err.data?.error as string) || "Ошибка при создании задачи");
      } else {
        setError("Не удалось создать задачу");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Укажите название задачи");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/cabinet/tasks")}
        className="flex items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-white/60"
      >
        <Icon name="ArrowLeft" size={14} /> Назад к задачам
      </button>

      <div>
        <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
          Новая задача
        </h1>
        <p className="mt-0.5 text-sm text-white/40">Опишите задачу для передачи команде КСИ</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-6">
        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40">Название задачи *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Оценка земельного участка в Московской области"
              className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80 placeholder:text-white/20"
            />
          </div>

          {/* Module */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40">Модуль</label>
            <Select value={moduleId} onValueChange={setModuleId}>
              <SelectTrigger className="border-[#1a1a2e] bg-[#0f0f18] text-sm">
                <SelectValue placeholder="Выберите модуль" />
              </SelectTrigger>
              <SelectContent>
                {connectedModules.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40">Описание</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Подробное описание задачи, требования, ссылки на документы..."
              className="min-h-[140px] resize-none border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80 placeholder:text-white/20"
            />
          </div>

          {/* Priority + Deadline */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/40">Приоритет</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="border-[#1a1a2e] bg-[#0f0f18] text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                  <SelectItem value="critical">Критичный</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/40">Срок выполнения</label>
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80"
              />
            </div>
          </div>

          {/* File upload placeholder */}
          <div className="rounded-md border border-dashed border-[#1a1a2e] bg-[#0f0f18] px-4 py-6 text-center">
            <Icon name="Upload" size={20} className="mx-auto mb-2 text-white/15" />
            <p className="text-xs text-white/30">
              Файлы можно загрузить через раздел "Диалог" после создания задачи
            </p>
          </div>

          {/* KM estimate hint */}
          <div className="flex items-center gap-2 rounded-md border border-cyan-500/10 bg-cyan-500/5 px-3 py-2.5">
            <Icon name="Info" size={14} className="shrink-0 text-cyan-400/60" />
            <p className="text-xs text-white/40">
              Оценка стоимости в КМ будет рассчитана куратором после анализа задачи
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2.5">
              <Icon name="AlertCircle" size={14} className="shrink-0 text-red-400" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-3 border-t border-[#1a1a2e] pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/cabinet/tasks")}
              className="h-9 border-[#1a1a2e] bg-transparent px-4 text-xs text-white/50 hover:bg-white/5"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="btn-primary-ksi h-9 gap-2 px-5 text-xs"
            >
              {mutation.isPending ? (
                <Icon name="Loader2" size={14} className="animate-spin" />
              ) : (
                <Icon name="Plus" size={14} />
              )}
              Создать задачу
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
