import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ALL_SECTIONS = [
  { id: "hero", label: "Титульный слайд", desc: "Название компании и позиционирование" },
  { id: "about", label: "О компании", desc: "Факты, принципы, позиционирование" },
  { id: "cryptometry", label: "КриптоМетры", desc: "Ключевой проект, характеристики, задачи" },
  { id: "services", label: "Внутренние службы", desc: "4 службы АО КСИ с описанием" },
  { id: "architecture", label: "Архитектура", desc: "6 слоёв проекта, принципы" },
  { id: "roadmap", label: "Дорожная карта", desc: "4 фазы развития 2023–2026+" },
  { id: "contacts", label: "Контакты", desc: "Email, адрес, сайт" },
];

const PRESETS = [
  { name: "Полная презентация", sections: ["hero", "about", "cryptometry", "services", "architecture", "roadmap", "contacts"] },
  { name: "Краткая (для встречи)", sections: ["hero", "about", "services", "contacts"] },
  { name: "О проекте КМ", sections: ["hero", "cryptometry", "services", "roadmap"] },
  { name: "Только структура", sections: ["hero", "architecture", "services", "contacts"] },
];

export default function Presentations() {
  const [selectedSections, setSelectedSections] = useState<string[]>(["hero", "about", "cryptometry", "services", "architecture", "roadmap", "contacts"]);
  const [format, setFormat] = useState<"landscape" | "portrait">("landscape");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [compression, setCompression] = useState<"short" | "medium" | "full">("medium");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const toggleSection = (id: string) => {
    setSelectedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const applyPreset = (sections: string[]) => {
    setSelectedSections([...sections]);
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= selectedSections.length) return;
    const arr = [...selectedSections];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setSelectedSections(arr);
  };

  const handleGenerate = async () => {
    if (selectedSections.length === 0) {
      setError("Выберите хотя бы один раздел");
      return;
    }
    setError("");
    setGenerating(true);

    try {
      const resp = await fetch("https://functions.poehali.dev/dd922e75-af6a-46aa-aa5c-2f19428efb73", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, theme, sections: selectedSections, compression }),
      });

      if (!resp.ok) {
        const d = await resp.json().catch(() => ({}));
        throw new Error(d.error || `Ошибка ${resp.status}`);
      }

      const data = await resp.json();
      const byteChars = atob(data.pdf_base64);
      const bytes = new Uint8Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) bytes[i] = byteChars.charCodeAt(i);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename || "КСИ_Презентация.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось сгенерировать");
    } finally {
      setGenerating(false);
    }
  };

  const orderedSections = ALL_SECTIONS.filter(s => selectedSections.includes(s.id))
    .sort((a, b) => selectedSections.indexOf(a.id) - selectedSections.indexOf(b.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
          Генератор презентаций
        </h1>
        <p className="mt-0.5 text-sm text-white/40">
          PDF на основе текстов сайта
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-lg border border-[#1a1a2e] bg-[#0f0f18] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-oswald text-sm uppercase tracking-wider text-white/70">Разделы</h2>
              <span className="text-xs text-white/30">{selectedSections.length} из {ALL_SECTIONS.length}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {PRESETS.map(p => (
                <button key={p.name} onClick={() => applyPreset(p.sections)}
                  className="px-3 py-1.5 rounded text-xs transition-colors border border-[#1a1a2e] text-white/40 hover:text-white/70 hover:border-cyan-500/30">
                  {p.name}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {ALL_SECTIONS.map(s => {
                const active = selectedSections.includes(s.id);
                const idx = selectedSections.indexOf(s.id);
                return (
                  <div key={s.id}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-4 py-3 transition-all cursor-pointer border",
                      active
                        ? "bg-cyan-500/5 border-cyan-500/20 text-white/80"
                        : "bg-[#12121c] border-[#1a1a2e] text-white/40"
                    )}
                    onClick={() => toggleSection(s.id)}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs border transition-colors",
                      active ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400" : "border-[#1a1a2e]"
                    )}>
                      {active && <Icon name="Check" size={12} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{s.label}</div>
                      <div className="text-xs text-white/25 mt-0.5">{s.desc}</div>
                    </div>
                    {active && (
                      <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
                        <span className="text-xs text-white/20 mr-2">#{idx + 1}</span>
                        <button onClick={() => moveSection(idx, -1)}
                          className="p-1 rounded hover:bg-white/5 text-white/25 hover:text-white/60 disabled:opacity-20"
                          disabled={idx === 0}>
                          <Icon name="ChevronUp" size={14} />
                        </button>
                        <button onClick={() => moveSection(idx, 1)}
                          className="p-1 rounded hover:bg-white/5 text-white/25 hover:text-white/60 disabled:opacity-20"
                          disabled={idx === selectedSections.length - 1}>
                          <Icon name="ChevronDown" size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-lg border border-[#1a1a2e] bg-[#0f0f18] p-5 space-y-5">
            <h2 className="font-oswald text-sm uppercase tracking-wider text-white/70">Настройки</h2>

            <div>
              <label className="text-xs text-white/40 block mb-2">Формат</label>
              <div className="grid grid-cols-2 gap-2">
                {([["landscape", "Monitor", "16:9"], ["portrait", "FileText", "A4"]] as const).map(([val, icon, label]) => (
                  <button key={val} onClick={() => setFormat(val)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-md p-3 border transition-all text-xs",
                      format === val
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : "border-[#1a1a2e] text-white/40 hover:text-white/60"
                    )}>
                    <Icon name={icon} size={20} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-white/40 block mb-2">Тема</label>
              <div className="grid grid-cols-2 gap-2">
                {([["dark", "Moon", "Тёмная"], ["light", "Sun", "Светлая"]] as const).map(([val, icon, label]) => (
                  <button key={val} onClick={() => setTheme(val)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-md p-3 border transition-all text-xs",
                      theme === val
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : "border-[#1a1a2e] text-white/40 hover:text-white/60"
                    )}>
                    <Icon name={icon} size={20} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-white/40 block mb-2">Объём текста</label>
              <div className="space-y-1.5">
                {([["short", "Кратко — только заголовки и тезисы"], ["medium", "Средне — заголовки + короткие описания"], ["full", "Полный — весь доступный текст"]] as const).map(([val, label]) => (
                  <button key={val} onClick={() => setCompression(val)}
                    className={cn(
                      "w-full text-left rounded-md px-3 py-2.5 border transition-all text-xs",
                      compression === val
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : "border-[#1a1a2e] text-white/40 hover:text-white/60"
                    )}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#1a1a2e] bg-[#0f0f18] p-5 space-y-3">
            <h2 className="font-oswald text-sm uppercase tracking-wider text-white/70">Предпросмотр</h2>
            <div className="space-y-1">
              {orderedSections.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2 text-xs text-white/35">
                  <span className="text-white/15 w-4 text-right">{i + 1}.</span>
                  <span>{s.label}</span>
                </div>
              ))}
              {orderedSections.length === 0 && (
                <p className="text-xs text-white/20">Разделы не выбраны</p>
              )}
            </div>
            <div className="text-xs text-white/20 pt-2 border-t border-[#1a1a2e]">
              {format === "landscape" ? "16:9 широкоэкранный" : "A4 вертикальный"} · {theme === "dark" ? "тёмная тема" : "светлая тема"} · {compression === "short" ? "кратко" : compression === "medium" ? "средне" : "подробно"}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2.5">
              <Icon name="AlertCircle" size={13} className="text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <Button onClick={handleGenerate} disabled={generating || selectedSections.length === 0}
            className="w-full btn-primary-ksi h-11 gap-2 text-sm disabled:opacity-40">
            {generating ? (
              <><Icon name="Loader2" size={16} className="animate-spin" /> Генерация...</>
            ) : (
              <><Icon name="Download" size={16} /> Скачать PDF</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}