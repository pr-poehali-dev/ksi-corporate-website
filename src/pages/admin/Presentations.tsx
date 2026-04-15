import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionContent {
  [key: string]: string | string[] | { name: string; role: string; desc: string }[] | { level: number; name: string; desc: string }[] | { period: string; name: string; items: string[] }[];
}

const DEFAULT_CONTENT: Record<string, SectionContent> = {
  hero: {
    title: 'АО "КриптоСтройИнвест" (АО КСИ)',
    subtitle: "Акционерное общество",
    tagline: "Оператор интеллектуальной инфраструктуры для девелопмента",
    description: "АО КСИ развивает внутренние службы и прикладные контуры, обеспечивающие создание виртуального девелопера. Ключевой проект компании — КриптоМетры, интеллектуальная система распределённого девелопмента.",
  },
  about: {
    title: "О компании",
    facts: ["Год основания: 2023", "Правовая форма: АО", "Местонахождение: Москва", "4 внутренние службы", "Ключевой проект: КриптоМетры"],
    positioning: ["Оператор интеллектуальной инфраструктуры", "Проект виртуального девелопера", "Ключевой проект — КриптоМетры"],
    principles: ["Системность — каждое решение часть архитектуры", "Долгий горизонт — ценность в инфраструктуре и компетенциях", "Профессиональный стандарт — работа с участниками рынка", "Прозрачность стадии — без преувеличения готовности"],
  },
  cryptometry: {
    title: "КриптоМетры",
    subtitle: "Интеллектуальная система распределённого девелопмента",
    description: "Ключевой проект АО КСИ. Единая среда, в которой задачи, компетенции, внутренние службы и прикладные контуры собираются в управляемую модель.",
    features: ["Единая интеллектуальная система, а не набор разрозненных функций", "Распределённая логика девелопмента — задачи, активы, компетенции в одной среде", "Система решения задач, а не каталог услуг", "Развитие от стартовых контуров к целостной модели виртуального девелопера", "Прямая связь с управляющим и операторским контуром АО КСИ"],
  },
  services: {
    title: "Внутренние службы АО КСИ",
    items: [
      { name: "Лаборатория ИИ", role: "Технологическое ядро", desc: "Интеллектуальная инфраструктура, настройка, обучение и развитие системы КриптоМетры." },
      { name: "Центр реализации активов", role: "Операторский контур", desc: "Сопровождение и реализация активов в логике проекта. Упаковка, структурирование." },
      { name: "Служба земельного поиска", role: "Земельный контур", desc: "Поиск участков, анализ площадок и работа с земельно-имущественными задачами." },
      { name: "Студия проектного креатива", role: "Креативный контур", desc: "Визуальная, концептуальная и презентационная упаковка решений и материалов." },
    ],
  },
  architecture: {
    title: "Архитектура проекта",
    layers: [
      { level: 1, name: "АО КСИ", desc: "Оператор интеллектуальной инфраструктуры для девелопмента" },
      { level: 2, name: "КриптоМетры", desc: "Интеллектуальная система распределённого девелопмента" },
      { level: 3, name: "Лаборатория ИИ", desc: "Интеллектуальная инфраструктура, обучение и развитие системы" },
      { level: 4, name: "Центр реализации активов", desc: "Сопровождение и реализация активов в логике проекта" },
      { level: 5, name: "Служба земельного поиска", desc: "Поиск, анализ площадок, земельно-имущественные задачи" },
      { level: 6, name: "Студия проектного креатива", desc: "Визуальная, концептуальная и презентационная упаковка" },
    ],
    principles: ["Единая система — каждая служба рабочий контур единой среды", "Обратная связь — данные и точность растут с каждым запросом", "Распределённая логика — задачи через подключение нужных контуров", "Гибридная модель — ИИ + методология + операторская верификация"],
  },
  roadmap: {
    title: "Дорожная карта",
    phases: [
      { period: "2023 — 2024", name: "Основание проекта", items: ["Регистрация АО КСИ, формирование структуры", "Определение замысла: виртуальный девелопер", "Запуск КриптоМетров как ключевого проекта", "Формирование первых внутренних служб", "Начало работы Лаборатории ИИ"] },
      { period: "2024 — 2025", name: "Формирование контуров", items: ["Служба земельного поиска — стадия Beta", "Лаборатория ИИ: R&D по интеллектуальной инфраструктуре", "Центр реализации: первые пилотные задачи", "КриптоМетры: отработка гибридной модели", "Студия креатива: методология упаковки"] },
      { period: "2025 — 2026", name: "Интеграция в систему", items: ["Интеграция служб в единый интерфейс КриптоМетров", "LSS: переход из Beta в рабочий контур", "Обучение контуров на реальных задачах", "Запуск интеллектуального чата как интерфейса", "Приглашение девелоперов к бета-тестированию"] },
      { period: "2026+", name: "К виртуальному девелоперу", items: ["КриптоМетры как целостная система", "Все контуры в единой среде с единым интерфейсом", "Система накапливает компетенции с каждым запросом", "АО КСИ — оператор инфраструктуры виртуального девелопера"] },
    ],
  },
  contacts: {
    title: "Контакты",
    lines: ['АО "КриптоСтройИнвест"', "", "Email: info@aoksi.ru", "", "Москва, Россия", "", "aoksi.ru"],
  },
};

const SECTION_META = [
  { id: "hero", label: "Титульный слайд", desc: "Название и позиционирование" },
  { id: "about", label: "О компании", desc: "Факты, принципы, позиционирование" },
  { id: "cryptometry", label: "КриптоМетры", desc: "Ключевой проект, характеристики" },
  { id: "services", label: "Внутренние службы", desc: "4 службы АО КСИ" },
  { id: "architecture", label: "Архитектура", desc: "Слои проекта, принципы" },
  { id: "roadmap", label: "Дорожная карта", desc: "Фазы развития 2023–2026+" },
  { id: "contacts", label: "Контакты", desc: "Email, адрес, сайт" },
];

const PRESETS = [
  { name: "Полная", sections: ["hero", "about", "cryptometry", "services", "architecture", "roadmap", "contacts"] },
  { name: "Краткая", sections: ["hero", "about", "services", "contacts"] },
  { name: "О КриптоМетрах", sections: ["hero", "cryptometry", "services", "roadmap"] },
  { name: "Структура", sections: ["hero", "architecture", "services", "contacts"] },
];

function TextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#0a0a0f] border border-[#1a1a2e] rounded px-3 py-1.5 text-sm text-white/80 focus:outline-none focus:border-cyan-500/40" />;
}

function ListEditor({ items, onChange }: { items: string[]; onChange: (items: string[]) => void }) {
  const update = (idx: number, val: string) => { const n = [...items]; n[idx] = val; onChange(n); };
  const add = () => onChange([...items, ""]);
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex gap-1.5">
          <span className="text-white/15 text-xs pt-2 w-4 text-right flex-shrink-0">{i + 1}.</span>
          <input type="text" value={item} onChange={e => update(i, e.target.value)} className="flex-1 bg-[#0a0a0f] border border-[#1a1a2e] rounded px-3 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/40" />
          <button onClick={() => remove(i)} className="p-1.5 text-white/20 hover:text-red-400"><Icon name="X" size={12} /></button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1 text-xs text-cyan-500/50 hover:text-cyan-400 pt-1"><Icon name="Plus" size={12} /> Добавить</button>
    </div>
  );
}

function SectionEditor({ sectionId, content, onChange }: { sectionId: string; content: SectionContent; onChange: (c: SectionContent) => void }) {
  const set = (key: string, val: SectionContent[string]) => onChange({ ...content, [key]: val });

  if (sectionId === "hero") {
    return (
      <div className="space-y-3">
        <Field label="Заголовок"><TextEditor value={content.title as string} onChange={v => set("title", v)} /></Field>
        <Field label="Подзаголовок"><TextEditor value={content.subtitle as string} onChange={v => set("subtitle", v)} /></Field>
        <Field label="Слоган"><TextEditor value={content.tagline as string} onChange={v => set("tagline", v)} /></Field>
        <Field label="Описание"><textarea value={content.description as string} onChange={e => set("description", e.target.value)} rows={3} className="w-full bg-[#0a0a0f] border border-[#1a1a2e] rounded px-3 py-1.5 text-sm text-white/80 resize-none focus:outline-none focus:border-cyan-500/40" /></Field>
      </div>
    );
  }
  if (sectionId === "about") {
    return (
      <div className="space-y-3">
        <Field label="Заголовок"><TextEditor value={content.title as string} onChange={v => set("title", v)} /></Field>
        <Field label="Факты"><ListEditor items={content.facts as string[]} onChange={v => set("facts", v)} /></Field>
        <Field label="Позиционирование"><ListEditor items={content.positioning as string[]} onChange={v => set("positioning", v)} /></Field>
        <Field label="Принципы"><ListEditor items={content.principles as string[]} onChange={v => set("principles", v)} /></Field>
      </div>
    );
  }
  if (sectionId === "cryptometry") {
    return (
      <div className="space-y-3">
        <Field label="Заголовок"><TextEditor value={content.title as string} onChange={v => set("title", v)} /></Field>
        <Field label="Подзаголовок"><TextEditor value={content.subtitle as string} onChange={v => set("subtitle", v)} /></Field>
        <Field label="Описание"><textarea value={content.description as string} onChange={e => set("description", e.target.value)} rows={2} className="w-full bg-[#0a0a0f] border border-[#1a1a2e] rounded px-3 py-1.5 text-sm text-white/80 resize-none focus:outline-none focus:border-cyan-500/40" /></Field>
        <Field label="Характеристики"><ListEditor items={content.features as string[]} onChange={v => set("features", v)} /></Field>
      </div>
    );
  }
  if (sectionId === "contacts") {
    return (
      <div className="space-y-3">
        <Field label="Заголовок"><TextEditor value={content.title as string} onChange={v => set("title", v)} /></Field>
        <Field label="Строки контактов"><ListEditor items={content.lines as string[]} onChange={v => set("lines", v)} /></Field>
      </div>
    );
  }
  if (sectionId === "services") {
    const items = (content.items || []) as { name: string; role: string; desc: string }[];
    const updateItem = (idx: number, key: string, val: string) => {
      const n = [...items];
      n[idx] = { ...n[idx], [key]: val };
      set("items", n);
    };
    return (
      <div className="space-y-3">
        <Field label="Заголовок"><TextEditor value={content.title as string} onChange={v => set("title", v)} /></Field>
        {items.map((it, i) => (
          <div key={i} className="rounded border border-[#1a1a2e] p-3 space-y-2">
            <input value={it.name} onChange={e => updateItem(i, "name", e.target.value)} placeholder="Название" className="w-full bg-[#0a0a0f] border border-[#1a1a2e] rounded px-3 py-1.5 text-sm text-white/80 font-medium focus:outline-none focus:border-cyan-500/40" />
            <input value={it.role} onChange={e => updateItem(i, "role", e.target.value)} placeholder="Роль" className="w-full bg-[#0a0a0f] border border-[#1a1a2e] rounded px-3 py-1 text-xs text-white/50 focus:outline-none focus:border-cyan-500/40" />
            <textarea value={it.desc} onChange={e => updateItem(i, "desc", e.target.value)} rows={2} placeholder="Описание" className="w-full bg-[#0a0a0f] border border-[#1a1a2e] rounded px-3 py-1.5 text-xs text-white/60 resize-none focus:outline-none focus:border-cyan-500/40" />
          </div>
        ))}
      </div>
    );
  }
  if (sectionId === "architecture") {
    const layers = (content.layers || []) as { level: number; name: string; desc: string }[];
    const updateLayer = (idx: number, key: string, val: string) => {
      const n = [...layers];
      n[idx] = { ...n[idx], [key]: val };
      set("layers", n);
    };
    return (
      <div className="space-y-3">
        <Field label="Заголовок"><TextEditor value={content.title as string} onChange={v => set("title", v)} /></Field>
        <Field label="Слои">
          <div className="space-y-1.5">
            {layers.map((l, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-white/15 text-xs pt-2 w-4 flex-shrink-0">{l.level}.</span>
                <input value={l.name} onChange={e => updateLayer(i, "name", e.target.value)} className="w-1/3 bg-[#0a0a0f] border border-[#1a1a2e] rounded px-2 py-1 text-xs text-white/70 focus:outline-none focus:border-cyan-500/40" />
                <input value={l.desc} onChange={e => updateLayer(i, "desc", e.target.value)} className="flex-1 bg-[#0a0a0f] border border-[#1a1a2e] rounded px-2 py-1 text-xs text-white/50 focus:outline-none focus:border-cyan-500/40" />
              </div>
            ))}
          </div>
        </Field>
        <Field label="Принципы"><ListEditor items={content.principles as string[]} onChange={v => set("principles", v)} /></Field>
      </div>
    );
  }
  if (sectionId === "roadmap") {
    const phases = (content.phases || []) as { period: string; name: string; items: string[] }[];
    const updatePhase = (idx: number, key: string, val: string | string[]) => {
      const n = [...phases];
      n[idx] = { ...n[idx], [key]: val };
      set("phases", n);
    };
    return (
      <div className="space-y-3">
        <Field label="Заголовок"><TextEditor value={content.title as string} onChange={v => set("title", v)} /></Field>
        {phases.map((ph, i) => (
          <div key={i} className="rounded border border-[#1a1a2e] p-3 space-y-2">
            <div className="flex gap-2">
              <input value={ph.period} onChange={e => updatePhase(i, "period", e.target.value)} className="w-1/3 bg-[#0a0a0f] border border-[#1a1a2e] rounded px-2 py-1 text-xs text-cyan-400/60 focus:outline-none focus:border-cyan-500/40" />
              <input value={ph.name} onChange={e => updatePhase(i, "name", e.target.value)} className="flex-1 bg-[#0a0a0f] border border-[#1a1a2e] rounded px-2 py-1 text-xs text-white/70 font-medium focus:outline-none focus:border-cyan-500/40" />
            </div>
            <ListEditor items={ph.items} onChange={v => updatePhase(i, "items", v)} />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">{label}</label>
      {children}
    </div>
  );
}

export default function Presentations() {
  const [selectedSections, setSelectedSections] = useState<string[]>(["hero", "about", "cryptometry", "services", "architecture", "roadmap", "contacts"]);
  const [format, setFormat] = useState<"landscape" | "portrait">("landscape");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [compression, setCompression] = useState<"short" | "medium" | "full">("medium");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [contentOverrides, setContentOverrides] = useState<Record<string, SectionContent>>({});

  useEffect(() => {
    const saved = localStorage.getItem("ksi_pres_overrides");
    if (saved) try { setContentOverrides(JSON.parse(saved)); } catch { /* ignore */ }
  }, []);

  const saveOverrides = (o: Record<string, SectionContent>) => {
    setContentOverrides(o);
    localStorage.setItem("ksi_pres_overrides", JSON.stringify(o));
  };

  const getContent = (id: string) => contentOverrides[id] || DEFAULT_CONTENT[id];
  const isEdited = (id: string) => !!contentOverrides[id];

  const resetSection = (id: string) => {
    const n = { ...contentOverrides };
    delete n[id];
    saveOverrides(n);
  };

  const toggleSection = (id: string) => {
    setSelectedSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= selectedSections.length) return;
    const arr = [...selectedSections];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setSelectedSections(arr);
  };

  const handleGenerate = async () => {
    if (selectedSections.length === 0) { setError("Выберите хотя бы один раздел"); return; }
    setError("");
    setGenerating(true);
    try {
      const contentToSend: Record<string, SectionContent> = {};
      for (const id of selectedSections) {
        contentToSend[id] = getContent(id);
      }
      const resp = await fetch("https://functions.poehali.dev/dd922e75-af6a-46aa-aa5c-2f19428efb73", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, theme, sections: selectedSections, compression, content_override: contentToSend }),
      });
      if (!resp.ok) { const d = await resp.json().catch(() => ({})); throw new Error(d.error || `Ошибка ${resp.status}`); }
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
    } finally { setGenerating(false); }
  };

  const orderedSections = SECTION_META.filter(s => selectedSections.includes(s.id))
    .sort((a, b) => selectedSections.indexOf(a.id) - selectedSections.indexOf(b.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Генератор презентаций</h1>
        <p className="mt-0.5 text-sm text-white/40">PDF на основе текстов сайта — с возможностью редактирования</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-lg border border-[#1a1a2e] bg-[#0f0f18] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-oswald text-sm uppercase tracking-wider text-white/70">Разделы</h2>
              <div className="flex items-center gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map(p => (
                    <button key={p.name} onClick={() => setSelectedSections([...p.sections])}
                      className="px-2.5 py-1 rounded text-[10px] border border-[#1a1a2e] text-white/35 hover:text-white/60 hover:border-cyan-500/30 transition-colors">{p.name}</button>
                  ))}
                </div>
                <span className="text-xs text-white/25">{selectedSections.length}/{SECTION_META.length}</span>
              </div>
            </div>

            <div className="space-y-2">
              {SECTION_META.map(s => {
                const active = selectedSections.includes(s.id);
                const idx = selectedSections.indexOf(s.id);
                const edited = isEdited(s.id);
                return (
                  <div key={s.id}>
                    <div className={cn(
                      "flex items-center gap-3 rounded-md px-4 py-3 transition-all border",
                      active ? "bg-cyan-500/5 border-cyan-500/20 text-white/80" : "bg-[#12121c] border-[#1a1a2e] text-white/40"
                    )}>
                      <div className={cn("w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs border cursor-pointer transition-colors",
                        active ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400" : "border-[#1a1a2e]"
                      )} onClick={() => toggleSection(s.id)}>
                        {active && <Icon name="Check" size={12} />}
                      </div>
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleSection(s.id)}>
                        <div className="font-medium text-sm flex items-center gap-2">
                          {s.label}
                          {edited && <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400/60 border border-purple-500/20">изменён</span>}
                        </div>
                        <div className="text-xs text-white/25 mt-0.5">{s.desc}</div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {active && (
                          <button onClick={() => setEditingSection(editingSection === s.id ? null : s.id)}
                            className={cn("p-1.5 rounded transition-colors", editingSection === s.id ? "bg-cyan-500/15 text-cyan-400" : "text-white/25 hover:text-white/50 hover:bg-white/5")}>
                            <Icon name="Pencil" size={13} />
                          </button>
                        )}
                        {active && (
                          <>
                            <button onClick={() => moveSection(idx, -1)} className="p-1 rounded hover:bg-white/5 text-white/20 hover:text-white/50 disabled:opacity-20" disabled={idx === 0}><Icon name="ChevronUp" size={14} /></button>
                            <button onClick={() => moveSection(idx, 1)} className="p-1 rounded hover:bg-white/5 text-white/20 hover:text-white/50 disabled:opacity-20" disabled={idx === selectedSections.length - 1}><Icon name="ChevronDown" size={14} /></button>
                          </>
                        )}
                      </div>
                    </div>

                    {editingSection === s.id && active && (
                      <div className="mt-1 rounded-md border border-cyan-500/10 bg-[#0c0c16] p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-white/40">Редактирование: {s.label}</span>
                          {edited && (
                            <button onClick={() => resetSection(s.id)} className="text-[10px] text-white/25 hover:text-white/50 flex items-center gap-1">
                              <Icon name="RotateCcw" size={10} /> Сбросить
                            </button>
                          )}
                        </div>
                        <SectionEditor
                          sectionId={s.id}
                          content={getContent(s.id)}
                          onChange={c => saveOverrides({ ...contentOverrides, [s.id]: c })}
                        />
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
                  <button key={val} onClick={() => setFormat(val)} className={cn("flex flex-col items-center gap-1.5 rounded-md p-3 border transition-all text-xs",
                    format === val ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" : "border-[#1a1a2e] text-white/40 hover:text-white/60")}><Icon name={icon} size={20} />{label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-2">Тема</label>
              <div className="grid grid-cols-2 gap-2">
                {([["dark", "Moon", "Тёмная"], ["light", "Sun", "Светлая"]] as const).map(([val, icon, label]) => (
                  <button key={val} onClick={() => setTheme(val)} className={cn("flex flex-col items-center gap-1.5 rounded-md p-3 border transition-all text-xs",
                    theme === val ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" : "border-[#1a1a2e] text-white/40 hover:text-white/60")}><Icon name={icon} size={20} />{label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-2">Объём текста</label>
              <div className="space-y-1.5">
                {([["short", "Кратко"], ["medium", "Средне"], ["full", "Подробно"]] as const).map(([val, label]) => (
                  <button key={val} onClick={() => setCompression(val)} className={cn("w-full text-left rounded-md px-3 py-2.5 border transition-all text-xs",
                    compression === val ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" : "border-[#1a1a2e] text-white/40 hover:text-white/60")}>{label}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#1a1a2e] bg-[#0f0f18] p-5 space-y-3">
            <h2 className="font-oswald text-sm uppercase tracking-wider text-white/70">Порядок слайдов</h2>
            <div className="space-y-1">
              {orderedSections.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2 text-xs text-white/35">
                  <span className="text-white/15 w-4 text-right">{i + 1}.</span>
                  <span>{s.label}</span>
                  {isEdited(s.id) && <span className="text-purple-400/40 text-[9px]">✎</span>}
                </div>
              ))}
              {orderedSections.length === 0 && <p className="text-xs text-white/20">Разделы не выбраны</p>}
            </div>
            <div className="text-[10px] text-white/15 pt-2 border-t border-[#1a1a2e]">
              {format === "landscape" ? "16:9" : "A4"} · {theme === "dark" ? "тёмная" : "светлая"} · {compression === "short" ? "кратко" : compression === "medium" ? "средне" : "подробно"}
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
            {generating ? <><Icon name="Loader2" size={16} className="animate-spin" /> Генерация...</> : <><Icon name="Download" size={16} /> Скачать PDF</>}
          </Button>
        </div>
      </div>
    </div>
  );
}