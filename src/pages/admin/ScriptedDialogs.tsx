import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { api } from "@/lib/api";
import { ScriptedDialog, DialogMessage, TestResult, emptyMessage } from "./scriptedDialogs.types";
import { Attachment } from "./scriptedDialogs.types";
import ScriptedDialogEditor from "./ScriptedDialogEditor";
import ScriptedDialogCard from "./ScriptedDialogCard";

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
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, TestResult[]>>({});

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

  const handleTogglePreview = (id: string) => {
    setPreviewId((prev) => (prev === id ? null : id));
  };

  const handleTest = async (d: ScriptedDialog) => {
    if (testingId === d.id) {
      setTestingId(null);
      return;
    }
    setTestingId(d.id);
    const initial = d.messages.map(() => ({ status: "testing" as const }));
    setTestResults((prev) => ({ ...prev, [d.id]: initial }));

    const results: TestResult[] = [];
    for (let i = 0; i < d.messages.length; i++) {
      const msg = d.messages[i];
      const q = msg.questionText.trim();
      if (!q) {
        results.push({ status: "ok", got: "(пустой вопрос — пропущен)" });
        setTestResults((prev) => ({ ...prev, [d.id]: [...results, ...Array(d.messages.length - results.length).fill({ status: "testing" })] }));
        continue;
      }
      try {
        const data = await api.post("api-chat", { message: q, _test_mode: true }) as {
          aiMessage?: { text: string; attachments?: Attachment[] };
        };
        const gotText = data.aiMessage?.text || "";
        const gotAtts = data.aiMessage?.attachments || [];
        const expectedText = msg.answerText.trim();
        const ok = gotText.trim() === expectedText || gotText.includes(expectedText.slice(0, 30));
        results.push({ status: ok ? "ok" : "fail", got: gotText, gotAttachments: gotAtts });
      } catch {
        results.push({ status: "fail", got: "Ошибка запроса" });
      }
      setTestResults((prev) => ({
        ...prev,
        [d.id]: [...results, ...Array(d.messages.length - results.length).fill({ status: "testing" })],
      }));
    }
    setTestResults((prev) => ({ ...prev, [d.id]: results }));
  };

  return (
    <div className="space-y-5">
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
        <ScriptedDialogEditor
          editingId={editingId}
          title={title}
          messages={messages}
          sortOrder={sortOrder}
          saving={saving}
          uploadingFor={uploadingFor}
          setTitle={setTitle}
          setMessages={setMessages}
          setSortOrder={setSortOrder}
          setSaving={setSaving}
          setUploadingFor={setUploadingFor}
          onSave={handleSave}
          onCancel={closeEdit}
        />
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
            <ScriptedDialogCard
              key={d.id}
              dialog={d}
              index={idx}
              previewId={previewId}
              testingId={testingId}
              testResults={testResults}
              onEdit={openEdit}
              onDelete={handleDelete}
              onTogglePreview={handleTogglePreview}
              onTest={handleTest}
            />
          ))}
        </div>
      )}
    </div>
  );
}
