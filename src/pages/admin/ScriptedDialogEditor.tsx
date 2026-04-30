import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { api } from "@/lib/api";
import { Attachment, DialogMessage, emptyMessage } from "./scriptedDialogs.types";

interface Props {
  editingId: string | "new";
  title: string;
  messages: DialogMessage[];
  sortOrder: number;
  saving: boolean;
  uploadingFor: { msgIdx: number; target: "question" | "answer" } | null;
  setTitle: (v: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<DialogMessage[]>>;
  setSortOrder: (v: number) => void;
  setSaving: (v: boolean) => void;
  setUploadingFor: (v: { msgIdx: number; target: "question" | "answer" } | null) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ScriptedDialogEditor({
  editingId,
  title,
  messages,
  sortOrder,
  saving,
  uploadingFor,
  setTitle,
  setMessages,
  setSortOrder,
  onSave,
  onCancel,
  setUploadingFor,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputTarget = useRef<{ msgIdx: number; target: "question" | "answer" } | null>(null);

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
    <div className="rounded-lg border border-cyan-500/20 bg-[#0d1520] p-5 space-y-5">
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

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
          <Button variant="ghost" onClick={onCancel} className="text-white/40 hover:text-white/70">
            Отмена
          </Button>
          <Button onClick={onSave} disabled={saving} className="btn-primary-ksi gap-2">
            {saving && <Icon name="Loader2" size={14} className="animate-spin" />}
            Сохранить
          </Button>
        </div>
      </div>
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
