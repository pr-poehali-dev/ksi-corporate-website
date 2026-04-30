import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";
import { Attachment, DialogMessage, ScriptedDialog, TestResult } from "./scriptedDialogs.types";

interface Props {
  dialog: ScriptedDialog;
  index: number;
  previewId: string | null;
  testingId: string | null;
  testResults: Record<string, TestResult[]>;
  onEdit: (d: ScriptedDialog) => void;
  onDelete: (id: string) => void;
  onTogglePreview: (id: string) => void;
  onTest: (d: ScriptedDialog) => void;
}

export default function ScriptedDialogCard({
  dialog: d,
  index: idx,
  previewId,
  testingId,
  testResults,
  onEdit,
  onDelete,
  onTogglePreview,
  onTest,
}: Props) {
  const isImage = (ct: string) => ct.startsWith("image/");

  return (
    <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c]">
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
            onClick={() => onTest(d)}
            className={cn(
              "flex items-center gap-1 rounded px-2 py-1 text-[11px] transition-colors",
              testingId === d.id
                ? "bg-amber-500/15 text-amber-400"
                : "text-white/25 hover:bg-amber-500/10 hover:text-amber-400"
            )}
            title="Протестировать"
          >
            <Icon name={testingId === d.id ? "Loader2" : "FlaskConical"} size={13} className={testingId === d.id ? "animate-spin" : ""} />
            <span className="hidden sm:inline">{testingId === d.id ? "Тест..." : "Тест"}</span>
          </button>
          <button
            onClick={() => onTogglePreview(d.id)}
            className={cn(
              "rounded p-1.5 text-[11px] transition-colors",
              previewId === d.id ? "text-cyan-400" : "text-white/25 hover:text-cyan-400"
            )}
            title="Превью"
          >
            <Icon name="Eye" size={14} />
          </button>
          <button
            onClick={() => onEdit(d)}
            className="rounded p-1.5 text-white/25 hover:text-white/70 transition-colors"
            title="Редактировать"
          >
            <Icon name="Pencil" size={14} />
          </button>
          <button
            onClick={() => onDelete(d.id)}
            className="rounded p-1.5 text-red-400/30 hover:text-red-400 transition-colors"
            title="Удалить"
          >
            <Icon name="Trash2" size={14} />
          </button>
        </div>
      </div>

      {/* Краткий список пар + результаты теста */}
      {previewId !== d.id && (
        <div className="border-t border-[#1a1a2e] px-4 pb-3 pt-2 space-y-2">
          {d.messages.map((m, mi) => {
            const res = testResults[d.id]?.[mi];
            return (
              <div key={mi} className="space-y-1">
                <div className="flex gap-2 text-[11px]">
                  <span className="shrink-0 text-cyan-400/40 w-4">{mi + 1}.</span>
                  <span className="text-white/30 truncate">
                    <span className="text-white/20">В: </span>{m.questionText || "—"}
                  </span>
                  <span className="shrink-0 text-white/15 mx-1">→</span>
                  <span className="text-white/30 truncate">
                    <span className="text-white/20">О: </span>{m.answerText || "—"}
                  </span>
                  {res && (
                    <span className={cn(
                      "shrink-0 ml-auto flex items-center gap-1 text-[10px]",
                      res.status === "testing" && "text-white/30",
                      res.status === "ok" && "text-emerald-400",
                      res.status === "fail" && "text-red-400",
                    )}>
                      {res.status === "testing" && <Icon name="Loader2" size={10} className="animate-spin" />}
                      {res.status === "ok" && <Icon name="CheckCircle2" size={10} />}
                      {res.status === "fail" && <Icon name="XCircle" size={10} />}
                      {res.status === "testing" ? "Проверка..." : res.status === "ok" ? "Совпало" : "Не совпало"}
                    </span>
                  )}
                </div>
                {/* Подробности провала */}
                {res?.status === "fail" && res.got && (
                  <div className="ml-5 rounded bg-red-500/5 border border-red-500/15 px-3 py-2 text-[11px] space-y-1">
                    <p className="text-red-400/70 font-medium">Получен ответ:</p>
                    <p className="text-white/50 whitespace-pre-wrap line-clamp-3">{res.got}</p>
                    <p className="text-white/25">Ожидался: <span className="text-white/45">{m.answerText}</span></p>
                  </div>
                )}
                {res?.status === "ok" && res.got && (
                  <div className="ml-5 rounded bg-emerald-500/5 border border-emerald-500/15 px-3 py-1.5 text-[11px]">
                    <p className="text-emerald-400/60 whitespace-pre-wrap line-clamp-2">{res.got}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Полное превью диалога */}
      {previewId === d.id && (
        <div className="border-t border-[#1a1a2e] px-4 pb-4 pt-3 space-y-4">
          {d.messages.map((m, mi) => (
            <DialogPreviewPair key={mi} message={m} index={mi} isImage={isImage} />
          ))}
        </div>
      )}
    </div>
  );
}

function DialogPreviewPair({
  message: m,
  index: mi,
  isImage,
}: {
  message: DialogMessage;
  index: number;
  isImage: (ct: string) => boolean;
}) {
  return (
    <div className="space-y-2">
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
            <Icon name="File" size={10} />
            {att.filename}
          </a>
        )
      )}
    </div>
  );
}
