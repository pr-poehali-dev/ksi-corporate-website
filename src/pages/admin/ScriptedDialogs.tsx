import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

interface Attachment {
  url: string;
  filename: string;
  contentType: string;
}

interface ScriptedDialog {
  id: string;
  title: string;
  questionText: string;
  questionAttachments: Attachment[];
  answerText: string;
  answerAttachments: Attachment[];
  sortOrder: number;
  createdAt: string;
}

const EMPTY_DIALOG: Omit<ScriptedDialog, "id" | "createdAt"> = {
  title: "",
  questionText: "",
  questionAttachments: [],
  answerText: "",
  answerAttachments: [],
  sortOrder: 0,
};

export default function ScriptedDialogs() {
  const [dialogs, setDialogs] = useState<ScriptedDialog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState({ ...EMPTY_DIALOG });
  const [uploadingFor, setUploadingFor] = useState<"question" | "answer" | null>(null);
  const [previewDialog, setPreviewDialog] = useState<ScriptedDialog | null>(null);
  const questionFileRef = useRef<HTMLInputElement>(null);
  const answerFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDialogs();
  }, []);

  const loadDialogs = async () => {
    setLoading(true);
    try {
      const data = await api.get("api-scripted-dialogs");
      setDialogs((data as { dialogs: ScriptedDialog[] }).dialogs || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setForm({ ...EMPTY_DIALOG });
    setEditingId("new");
  };

  const openEdit = (d: ScriptedDialog) => {
    setForm({
      title: d.title,
      questionText: d.questionText,
      questionAttachments: d.questionAttachments,
      answerText: d.answerText,
      answerAttachments: d.answerAttachments,
      sortOrder: d.sortOrder,
    });
    setEditingId(d.id);
  };

  const closeEdit = () => {
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!form.questionText.trim() || !form.answerText.trim()) return;
    setSaving(true);
    try {
      if (editingId === "new") {
        await api.post("api-scripted-dialogs", { ...form });
      } else {
        await api.put("api-scripted-dialogs", { id: editingId, ...form });
      }
      await loadDialogs();
      closeEdit();
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этот сценарий?")) return;
    try {
      await api.delete("api-scripted-dialogs", { id });
      setDialogs((prev) => prev.filter((d) => d.id !== id));
    } catch {
      // ignore
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "question" | "answer"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFor(target);
    try {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = (ev.target?.result as string).split(",")[1];
        const data = await api.post("api-scripted-dialogs", {
          action: "upload_file",
          fileData: base64,
          filename: file.name,
          contentType: file.type || "application/octet-stream",
        }) as { url: string; filename: string; contentType: string };
        const att: Attachment = { url: data.url, filename: data.filename, contentType: data.contentType };
        setForm((prev) => ({
          ...prev,
          [target === "question" ? "questionAttachments" : "answerAttachments"]: [
            ...(target === "question" ? prev.questionAttachments : prev.answerAttachments),
            att,
          ],
        }));
        setUploadingFor(null);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingFor(null);
    }
    e.target.value = "";
  };

  const removeAttachment = (target: "question" | "answer", idx: number) => {
    setForm((prev) => ({
      ...prev,
      [target === "question" ? "questionAttachments" : "answerAttachments"]: (
        target === "question" ? prev.questionAttachments : prev.answerAttachments
      ).filter((_, i) => i !== idx),
    }));
  };

  const isImage = (ct: string) => ct.startsWith("image/");

  return (
    <div className="space-y-5">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white/85">Сценарии чата</h1>
          <p className="text-xs text-white/35 mt-0.5">
            Запрограммированные вопросы и ответы для демонстрации чата
          </p>
        </div>
        <Button onClick={openNew} className="btn-primary-ksi gap-2">
          <Icon name="Plus" size={15} />
          Добавить сценарий
        </Button>
      </div>

      {/* Форма создания / редактирования */}
      {editingId !== null && (
        <div className="rounded-lg border border-cyan-500/20 bg-[#0d1520] p-5 space-y-4">
          <p className="text-sm font-medium text-white/70">
            {editingId === "new" ? "Новый сценарий" : "Редактирование сценария"}
          </p>

          {/* Название */}
          <div>
            <label className="mb-1 block text-[11px] text-white/40">Название (для поиска в списке)</label>
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Например: Приветствие, Вопрос о стоимости..."
              className="w-full rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-cyan-500/30"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Вопрос */}
            <div className="space-y-2">
              <label className="block text-[11px] font-medium text-cyan-400/60 uppercase tracking-wide">
                Вопрос (от клиента)
              </label>
              <textarea
                value={form.questionText}
                onChange={(e) => setForm((p) => ({ ...p, questionText: e.target.value }))}
                placeholder="Текст вопроса клиента..."
                rows={4}
                className="w-full resize-none rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-cyan-500/30"
              />
              {/* Прикреплённые файлы к вопросу */}
              <div className="flex flex-wrap gap-1.5">
                {form.questionAttachments.map((att, i) => (
                  <div key={i} className="group relative flex items-center gap-1 rounded bg-white/5 px-2 py-1">
                    {isImage(att.contentType) ? (
                      <img src={att.url} alt={att.filename} className="h-6 w-6 rounded object-cover" />
                    ) : (
                      <Icon name="File" size={12} className="text-white/40" />
                    )}
                    <span className="max-w-[100px] truncate text-[11px] text-white/50">{att.filename}</span>
                    <button
                      onClick={() => removeAttachment("question", i)}
                      className="ml-1 text-red-400/50 hover:text-red-400"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <input
                  type="file"
                  ref={questionFileRef}
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "question")}
                />
                <button
                  onClick={() => questionFileRef.current?.click()}
                  disabled={uploadingFor === "question"}
                  className="inline-flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors disabled:opacity-50"
                >
                  {uploadingFor === "question"
                    ? <Icon name="Loader2" size={12} className="animate-spin" />
                    : <Icon name="Paperclip" size={12} />
                  }
                  Прикрепить файл к вопросу
                </button>
              </div>
            </div>

            {/* Ответ */}
            <div className="space-y-2">
              <label className="block text-[11px] font-medium text-purple-400/60 uppercase tracking-wide">
                Ответ (от ИИ)
              </label>
              <textarea
                value={form.answerText}
                onChange={(e) => setForm((p) => ({ ...p, answerText: e.target.value }))}
                placeholder="Текст ответа ИИ-ассистента..."
                rows={4}
                className="w-full resize-none rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-purple-500/20"
              />
              {/* Прикреплённые файлы к ответу */}
              <div className="flex flex-wrap gap-1.5">
                {form.answerAttachments.map((att, i) => (
                  <div key={i} className="group relative flex items-center gap-1 rounded bg-white/5 px-2 py-1">
                    {isImage(att.contentType) ? (
                      <img src={att.url} alt={att.filename} className="h-6 w-6 rounded object-cover" />
                    ) : (
                      <Icon name="File" size={12} className="text-white/40" />
                    )}
                    <span className="max-w-[100px] truncate text-[11px] text-white/50">{att.filename}</span>
                    <button
                      onClick={() => removeAttachment("answer", i)}
                      className="ml-1 text-red-400/50 hover:text-red-400"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <input
                  type="file"
                  ref={answerFileRef}
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "answer")}
                />
                <button
                  onClick={() => answerFileRef.current?.click()}
                  disabled={uploadingFor === "answer"}
                  className="inline-flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors disabled:opacity-50"
                >
                  {uploadingFor === "answer"
                    ? <Icon name="Loader2" size={12} className="animate-spin" />
                    : <Icon name="Paperclip" size={12} />
                  }
                  Прикрепить файл к ответу
                </button>
              </div>
            </div>
          </div>

          {/* Порядок */}
          <div className="flex items-center gap-3">
            <label className="text-[11px] text-white/40">Порядок отображения:</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))}
              className="w-20 rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-2 py-1 text-sm text-white/70 focus:outline-none focus:border-cyan-500/30"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={closeEdit} className="text-white/40 hover:text-white/70">
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !form.questionText.trim() || !form.answerText.trim()}
              className="btn-primary-ksi gap-2"
            >
              {saving && <Icon name="Loader2" size={14} className="animate-spin" />}
              Сохранить
            </Button>
          </div>
        </div>
      )}

      {/* Список сценариев */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Icon name="Loader2" size={24} className="animate-spin text-white/20" />
        </div>
      ) : dialogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/10 py-16 gap-3">
          <Icon name="Clapperboard" size={36} className="text-white/10" />
          <p className="text-sm text-white/30">Нет сценариев. Создайте первый!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {dialogs.map((d, idx) => (
            <div
              key={d.id}
              className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-white/5 text-[11px] text-white/30">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-medium text-white/75">
                    {d.title || `Сценарий ${idx + 1}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => setPreviewDialog(previewDialog?.id === d.id ? null : d)}
                    className="rounded px-2 py-1 text-[11px] text-cyan-400/50 hover:text-cyan-400 transition-colors"
                  >
                    <Icon name="Eye" size={13} />
                  </button>
                  <button
                    onClick={() => openEdit(d)}
                    className="rounded px-2 py-1 text-[11px] text-white/30 hover:text-white/70 transition-colors"
                  >
                    <Icon name="Pencil" size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="rounded px-2 py-1 text-[11px] text-red-400/40 hover:text-red-400 transition-colors"
                  >
                    <Icon name="Trash2" size={13} />
                  </button>
                </div>
              </div>

              {/* Превью */}
              {previewDialog?.id === d.id && (
                <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
                  {/* Вопрос */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan-400/50">Вопрос</p>
                    <div className="flex justify-end">
                      <div className="max-w-[90%] rounded-lg bg-cyan-500/10 px-4 py-3">
                        <p className="whitespace-pre-wrap text-sm text-white/80">{d.questionText}</p>
                        {d.questionAttachments.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {d.questionAttachments.map((att, i) => (
                              isImage(att.contentType) ? (
                                <img key={i} src={att.url} alt={att.filename} className="max-h-32 rounded object-cover" />
                              ) : (
                                <a key={i} href={att.url} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[11px] text-cyan-400/70 hover:text-cyan-400">
                                  <Icon name="Paperclip" size={9} />{att.filename}
                                </a>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Ответ */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-purple-400/50">Ответ ИИ</p>
                    <div className="flex justify-start">
                      <div className="max-w-[90%] rounded-lg border border-cyan-500/15 bg-[#0f1a2e] px-4 py-3">
                        <p className="mb-1 text-[10px] font-semibold text-cyan-400/70">ИИ КСИ</p>
                        <p className="whitespace-pre-wrap text-sm text-white/75">{d.answerText}</p>
                        {d.answerAttachments.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {d.answerAttachments.map((att, i) => (
                              isImage(att.contentType) ? (
                                <img key={i} src={att.url} alt={att.filename} className="max-h-32 rounded object-cover" />
                              ) : (
                                <a key={i} href={att.url} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[11px] text-cyan-400/70 hover:text-cyan-400">
                                  <Icon name="Paperclip" size={9} />{att.filename}
                                </a>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Краткий текст если не превью */}
              {previewDialog?.id !== d.id && (
                <div className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-[10px] uppercase tracking-wide text-cyan-400/40 shrink-0">В:</span>
                    <p className="line-clamp-2 text-[12px] text-white/40">{d.questionText}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-[10px] uppercase tracking-wide text-purple-400/40 shrink-0">О:</span>
                    <p className="line-clamp-2 text-[12px] text-white/40">{d.answerText}</p>
                  </div>
                </div>
              )}

              {/* Счётчик файлов */}
              {(d.questionAttachments.length > 0 || d.answerAttachments.length > 0) && (
                <div className={cn("mt-2 flex gap-3", previewDialog?.id === d.id && "hidden")}>
                  {d.questionAttachments.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-white/20">
                      <Icon name="Paperclip" size={9} />
                      {d.questionAttachments.length} к вопросу
                    </span>
                  )}
                  {d.answerAttachments.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-white/20">
                      <Icon name="Paperclip" size={9} />
                      {d.answerAttachments.length} к ответу
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
