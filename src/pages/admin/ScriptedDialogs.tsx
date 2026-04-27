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

interface DialogMessage {
  questionText: string;
  questionAttachments: Attachment[];
  answerText: string;
  answerAttachments: Attachment[];
}

interface ScriptedDialog {
  id: string;
  title: string;
  messages: DialogMessage[];
  sortOrder: number;
  createdAt: string;
}

const emptyMessage = (): DialogMessage => ({
  questionText: "",
  questionAttachments: [],
  answerText: "",
  answerAttachments: [],
});

export default function ScriptedDialogs() {
  const [dialogs, setDialogs] = useState<ScriptedDialog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [title, setTitle] = useState("");
  const [messages, setMessages] = useState<DialogMessage[]>([emptyMessage()]);
  const [sortOrder, setSortOrder] = useState(0);
  const [uploadingFor, setUploadingFor] = useState<{ msgIdx: number; target: "question" | "answer" } | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputTarget = useRef<{ msgIdx: number; target: "question" | "answer" } | null>(null);

  useEffect(() => { loadDialogs(); }, []);

  const loadDialogs = async () => {
    setLoading(true);
    try {
      const data = await api.get("api-scripted-dialogs") as { dialogs: ScriptedDialog[] };
      setDialogs(data.dialogs || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const openNew = () => {
    setTitle("");
    setMessages([emptyMessage()]);
    setSortOrder(0);
    setEditingId("new");
  };

  const openEdit = (d: ScriptedDialog) => {
    setTitle(d.title);
    setMessages(d.messages.length ? d.messages : [emptyMessage()]);
    setSortOrder(d.sortOrder);
    setEditingId(d.id);
  };

  const closeEdit = () => setEditingId(null);

  const updateMessage = (idx: number, patch: Partial<DialogMessage>) => {
    setMessages((prev) => prev.map((m, i) => i === idx ? { ...m, ...patch } : m));
  };

  const addMessage = () => setMessages((prev) => [...prev, emptyMessage()]);

  const removeMessage = (idx: number) => {
    setMessages((prev) => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  };

  const moveMessage = (idx: number, dir: -1 | 1) => {
    setMessages((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const handleSave = async () => {
    const validMessages = messages.filter((m) => m.questionText.trim() || m.answerText.trim());
    if (!validMessages.length) return;
    setSaving(true);
    try {
      if (editingId === "new") {
        await api.post("api-scripted-dialogs", { title, messages: validMessages, sortOrder });
      } else {
        await api.put("api-scripted-dialogs", { id: editingId, title, messages: validMessages, sortOrder });
      }
      await loadDialogs();
      closeEdit();
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этот сценарий?")) return;
    try {
      await api.delete("api-scripted-dialogs", { id });
      setDialogs((prev) => prev.filter((d) => d.id !== id));
    } catch { /* ignore */ }
  };

  const triggerFileUpload = (msgIdx: number, target: "question" | "answer") => {
    fileInputTarget.current = { msgIdx, target };
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const tgt = fileInputTarget.current;
    if (!file || !tgt) return;
    setUploadingFor(tgt);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1];
      try {
        const data = await api.post("api-scripted-dialogs", {
          action: "upload_file",
          fileData: base64,
          filename: file.name,
          contentType: file.type || "application/octet-stream",
        }) as Attachment;
        updateMessage(tgt.msgIdx, {
          [tgt.target === "question" ? "questionAttachments" : "answerAttachments"]: [
            ...(tgt.target === "question"
              ? messages[tgt.msgIdx].questionAttachments
              : messages[tgt.msgIdx].answerAttachments),
            { url: data.url, filename: data.filename, contentType: data.contentType },
          ],
        });
      } catch { /* ignore */ }
      finally { setUploadingFor(null); }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeAttachment = (msgIdx: number, target: "question" | "answer", attIdx: number) => {
    const key = target === "question" ? "questionAttachments" : "answerAttachments";
    updateMessage(msgIdx, {
      [key]: (target === "question"
        ? messages[msgIdx].questionAttachments
        : messages[msgIdx].answerAttachments
      ).filter((_, i) => i !== attIdx),
    });
  };

  const isImage = (ct: string) => ct.startsWith("image/");

  return (
    <div className="space-y-5">
      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white/85">Сценарии чата</h1>
          <p className="text-xs text-white/35 mt-0.5">Запрограммированные диалоги для демонстрации чата</p>
        </div>
        <Button onClick={openNew} className="btn-primary-ksi gap-2">
          <Icon name="Plus" size={15} />
          Добавить сценарий
        </Button>
      </div>

      {/* Форма редактирования */}
      {editingId !== null && (
        <div className="rounded-lg border border-cyan-500/20 bg-[#0d1520] p-5 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white/70">
              {editingId === "new" ? "Новый сценарий" : "Редактирование сценария"}
            </p>
            <span className="text-[11px] text-white/25">{messages.length} пар(а) вопрос-ответ</span>
          </div>

          {/* Название */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название сценария (например: Демо для инвестора)"
            className="w-full rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-cyan-500/30"
          />

          {/* Список пар */}
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="rounded-lg border border-white/8 bg-[#0a0a12] p-4 space-y-3">
                {/* Заголовок пары */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-cyan-500/15 text-[10px] font-bold text-cyan-400">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] text-white/35">Пара вопрос-ответ</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveMessage(idx, -1)}
                      disabled={idx === 0}
                      className="p-1 text-white/20 hover:text-white/60 disabled:opacity-20 transition-colors"
                      title="Переместить вверх"
                    >
                      <Icon name="ChevronUp" size={13} />
                    </button>
                    <button
                      onClick={() => moveMessage(idx, 1)}
                      disabled={idx === messages.length - 1}
                      className="p-1 text-white/20 hover:text-white/60 disabled:opacity-20 transition-colors"
                      title="Переместить вниз"
                    >
                      <Icon name="ChevronDown" size={13} />
                    </button>
                    <button
                      onClick={() => removeMessage(idx)}
                      disabled={messages.length === 1}
                      className="p-1 text-red-400/30 hover:text-red-400 disabled:opacity-20 transition-colors"
                      title="Удалить пару"
                    >
                      <Icon name="Trash2" size={13} />
                    </button>
                  </div>
                </div>

                {/* Два столбца */}
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  {/* Вопрос */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan-400/50">Вопрос (клиент)</p>
                    <textarea
                      value={msg.questionText}
                      onChange={(e) => updateMessage(idx, { questionText: e.target.value })}
                      placeholder="Текст вопроса..."
                      rows={3}
                      className="w-full resize-none rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-cyan-500/30"
                    />
                    {/* Вложения вопроса */}
                    <AttachmentList
                      attachments={msg.questionAttachments}
                      onRemove={(i) => removeAttachment(idx, "question", i)}
                      isImage={isImage}
                    />
                    <AttachButton
                      loading={uploadingFor?.msgIdx === idx && uploadingFor.target === "question"}
                      onClick={() => triggerFileUpload(idx, "question")}
                      label="Прикрепить к вопросу"
                    />
                  </div>

                  {/* Ответ */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-purple-400/50">Ответ (ИИ)</p>
                    <textarea
                      value={msg.answerText}
                      onChange={(e) => updateMessage(idx, { answerText: e.target.value })}
                      placeholder="Текст ответа ИИ..."
                      rows={3}
                      className="w-full resize-none rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-purple-500/20"
                    />
                    {/* Вложения ответа */}
                    <AttachmentList
                      attachments={msg.answerAttachments}
                      onRemove={(i) => removeAttachment(idx, "answer", i)}
                      isImage={isImage}
                    />
                    <AttachButton
                      loading={uploadingFor?.msgIdx === idx && uploadingFor.target === "answer"}
                      onClick={() => triggerFileUpload(idx, "answer")}
                      label="Прикрепить к ответу"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Добавить пару */}
          <button
            onClick={addMessage}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 py-3 text-sm text-white/30 hover:border-cyan-500/30 hover:text-cyan-400/60 transition-colors"
          >
            <Icon name="Plus" size={14} />
            Добавить ещё пару вопрос-ответ
          </button>

          {/* Порядок + кнопки */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/35">Порядок:</span>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-16 rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-2 py-1 text-sm text-white/70 focus:outline-none focus:border-cyan-500/30"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={closeEdit} className="text-white/40 hover:text-white/70">
                Отмена
              </Button>
              <Button onClick={handleSave} disabled={saving} className="btn-primary-ksi gap-2">
                {saving && <Icon name="Loader2" size={14} className="animate-spin" />}
                Сохранить
              </Button>
            </div>
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
            <div key={d.id} className="rounded-lg border border-[#1a1a2e] bg-[#12121c]">
              {/* Шапка карточки */}
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/5 text-[11px] text-white/30">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/75 truncate">
                    {d.title || `Сценарий ${idx + 1}`}
                  </p>
                  <p className="text-[11px] text-white/25">{d.messages.length} пар(а) вопрос-ответ</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => setPreviewId(previewId === d.id ? null : d.id)}
                    className={cn(
                      "rounded p-1.5 text-[11px] transition-colors",
                      previewId === d.id ? "text-cyan-400" : "text-white/25 hover:text-cyan-400"
                    )}
                    title="Превью"
                  >
                    <Icon name="Eye" size={14} />
                  </button>
                  <button
                    onClick={() => openEdit(d)}
                    className="rounded p-1.5 text-white/25 hover:text-white/70 transition-colors"
                    title="Редактировать"
                  >
                    <Icon name="Pencil" size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="rounded p-1.5 text-red-400/30 hover:text-red-400 transition-colors"
                    title="Удалить"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>

              {/* Краткий список пар (без превью) */}
              {previewId !== d.id && (
                <div className="border-t border-[#1a1a2e] px-4 pb-3 pt-2 space-y-1.5">
                  {d.messages.map((m, mi) => (
                    <div key={mi} className="flex gap-2 text-[11px]">
                      <span className="shrink-0 text-cyan-400/40 w-4">{mi + 1}.</span>
                      <span className="text-white/30 truncate">
                        <span className="text-white/20">В: </span>{m.questionText || "—"}
                      </span>
                      <span className="shrink-0 text-white/15 mx-1">→</span>
                      <span className="text-white/30 truncate">
                        <span className="text-white/20">О: </span>{m.answerText || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Полное превью диалога */}
              {previewId === d.id && (
                <div className="border-t border-[#1a1a2e] px-4 pb-4 pt-3 space-y-4">
                  {d.messages.map((m, mi) => (
                    <div key={mi} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-white/5" />
                        <span className="text-[9px] text-white/15 uppercase tracking-widest">пара {mi + 1}</span>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      {/* Вопрос */}
                      {(m.questionText || m.questionAttachments.length > 0) && (
                        <div className="flex justify-end">
                          <div className="max-w-[80%] rounded-lg bg-cyan-500/10 px-4 py-3">
                            {m.questionText && (
                              <p className="whitespace-pre-wrap text-sm text-white/80">{m.questionText}</p>
                            )}
                            <PreviewAttachments attachments={m.questionAttachments} isImage={isImage} />
                          </div>
                        </div>
                      )}
                      {/* Ответ */}
                      {(m.answerText || m.answerAttachments.length > 0) && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg border border-cyan-500/15 bg-[#0f1a2e] px-4 py-3">
                            <p className="mb-1 text-[10px] font-semibold text-cyan-400/70">ИИ КСИ</p>
                            {m.answerText && (
                              <p className="whitespace-pre-wrap text-sm text-white/75">{m.answerText}</p>
                            )}
                            <PreviewAttachments attachments={m.answerAttachments} isImage={isImage} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AttachmentList({
  attachments,
  onRemove,
  isImage,
}: {
  attachments: Attachment[];
  onRemove: (i: number) => void;
  isImage: (ct: string) => boolean;
}) {
  if (!attachments.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {attachments.map((att, i) => (
        <div key={i} className="flex items-center gap-1 rounded bg-white/5 px-2 py-1">
          {isImage(att.contentType) ? (
            <img src={att.url} alt={att.filename} className="h-5 w-5 rounded object-cover" />
          ) : (
            <Icon name="File" size={11} className="text-white/35" />
          )}
          <span className="max-w-[90px] truncate text-[10px] text-white/45">{att.filename}</span>
          <button onClick={() => onRemove(i)} className="text-red-400/40 hover:text-red-400 ml-0.5">
            <Icon name="X" size={9} />
          </button>
        </div>
      ))}
    </div>
  );
}

function AttachButton({ loading, onClick, label }: { loading: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/55 transition-colors disabled:opacity-40"
    >
      {loading ? <Icon name="Loader2" size={11} className="animate-spin" /> : <Icon name="Paperclip" size={11} />}
      {label}
    </button>
  );
}

function PreviewAttachments({ attachments, isImage }: { attachments: Attachment[]; isImage: (ct: string) => boolean }) {
  if (!attachments.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {attachments.map((att, i) =>
        isImage(att.contentType) ? (
          <img key={i} src={att.url} alt={att.filename} className="max-h-28 rounded object-cover" />
        ) : (
          <a key={i} href={att.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[11px] text-cyan-400/70 hover:text-cyan-400">
            <Icon name="Paperclip" size={9} />{att.filename}
          </a>
        )
      )}
    </div>
  );
}
