import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";

type TaskType = {
  id: string;
  label: string;
  baseHoursPerUnit: number;
  speedupFactor: number;
  unitLabel: string;
  description: string;
};

const TASK_TYPES: TaskType[] = [
  {
    id: "land-search",
    label: "Поиск и первичный анализ площадок",
    baseHoursPerUnit: 10,
    speedupFactor: 0.18,
    unitLabel: "площадок",
    description: "Поиск, сбор данных, первичная проверка ограничений",
  },
  {
    id: "concept",
    label: "Первичные концепции и визуализации",
    baseHoursPerUnit: 16,
    speedupFactor: 0.22,
    unitLabel: "гипотез",
    description: "Формирование идеи, визуализация, сбор ТЗ",
  },
  {
    id: "asset-pack",
    label: "Упаковка активов для вывода на рынок",
    baseHoursPerUnit: 24,
    speedupFactor: 0.3,
    unitLabel: "активов",
    description: "Сбор материалов, оформление, презентация",
  },
  {
    id: "analytics",
    label: "Аналитика и проверка гипотез",
    baseHoursPerUnit: 8,
    speedupFactor: 0.25,
    unitLabel: "гипотез",
    description: "Обработка данных, сравнение вариантов, выводы",
  },
];

export function BenefitCalculator() {
  const [taskId, setTaskId] = useState<string>(TASK_TYPES[0].id);
  const [units, setUnits] = useState<number>(10);
  const [team, setTeam] = useState<number>(3);

  const task = useMemo(
    () => TASK_TYPES.find((t) => t.id === taskId) ?? TASK_TYPES[0],
    [taskId]
  );

  const result = useMemo(() => {
    const baseHours = task.baseHoursPerUnit * units;
    const ksiHours = Math.round(baseHours * task.speedupFactor);
    const savedHours = baseHours - ksiHours;
    const hoursPerDay = 8;
    const baseDaysTeam = Math.max(1, Math.ceil(baseHours / hoursPerDay / Math.max(1, team)));
    const ksiDaysTeam = Math.max(1, Math.ceil(ksiHours / hoursPerDay / Math.max(1, team)));
    const savedDaysTeam = baseDaysTeam - ksiDaysTeam;
    const loadReductionPct = Math.round((1 - task.speedupFactor) * 100);

    return {
      baseHours,
      ksiHours,
      savedHours,
      baseDaysTeam,
      ksiDaysTeam,
      savedDaysTeam,
      loadReductionPct,
    };
  }, [task, units, team]);

  return (
    <section
      id="calculator"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,10,24,1), rgba(10,10,15,1))" }}
    >
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="section-label mb-4">◆ Калькулятор выгоды</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Сколько времени<br />
            <span className="text-gradient-main">экономят модули АО КСИ</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed">
            Оцените экономию времени и нагрузки на команду на предпроектной стадии.
            Калькулятор показывает ориентировочный порядок выгоды — точный расчёт делаем под задачу.
          </p>
        </div>

        <div
          className="rounded-sm overflow-hidden"
          style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="font-mono-ibm text-[10px] tracking-widest uppercase text-ksi-cyan/70 mb-6">
                Параметры задачи
              </div>

              <div className="mb-6">
                <label className="font-ibm text-white/70 text-sm block mb-3">Тип задачи</label>
                <div className="grid gap-2">
                  {TASK_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTaskId(t.id)}
                      className="text-left p-3 rounded-sm transition-all cursor-pointer"
                      style={{
                        background: taskId === t.id ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.015)",
                        border: `1px solid ${taskId === t.id ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <div className="font-oswald text-white text-sm mb-1">{t.label}</div>
                      <div className="font-ibm text-white/40 text-xs">{t.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-3">
                  <label className="font-ibm text-white/70 text-sm">
                    Количество {task.unitLabel}
                  </label>
                  <span className="font-oswald text-ksi-cyan text-xl">{units}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-full accent-ksi-cyan"
                />
                <div className="flex justify-between font-mono-ibm text-[10px] text-white/30 mt-1">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline justify-between mb-3">
                  <label className="font-ibm text-white/70 text-sm">Размер команды</label>
                  <span className="font-oswald text-ksi-cyan text-xl">{team} чел.</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={team}
                  onChange={(e) => setTeam(Number(e.target.value))}
                  className="w-full accent-ksi-cyan"
                />
                <div className="flex justify-between font-mono-ibm text-[10px] text-white/30 mt-1">
                  <span>1</span>
                  <span>15</span>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-10" style={{ background: "rgba(0,212,255,0.02)" }}>
              <div className="font-mono-ibm text-[10px] tracking-widest uppercase text-ksi-cyan/70 mb-6">
                Ориентировочный результат
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div
                  className="p-5 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="font-mono-ibm text-[10px] uppercase tracking-widest text-white/40 mb-2">Без КСИ</div>
                  <div className="font-oswald text-white/85 text-3xl mb-1">{result.baseDaysTeam}</div>
                  <div className="font-ibm text-white/45 text-xs">раб. дней команды</div>
                </div>
                <div
                  className="p-5 rounded-sm"
                  style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.3)" }}
                >
                  <div className="font-mono-ibm text-[10px] uppercase tracking-widest text-ksi-cyan/80 mb-2">С модулями КСИ</div>
                  <div className="font-oswald text-ksi-cyan text-3xl mb-1">{result.ksiDaysTeam}</div>
                  <div className="font-ibm text-white/60 text-xs">раб. дней команды</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={16} className="text-ksi-cyan/70" />
                    <span className="font-ibm text-white/60 text-sm">Сокращение сроков</span>
                  </div>
                  <span className="font-oswald text-white text-lg">−{result.savedDaysTeam} дн.</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-3">
                    <Icon name="Users" size={16} className="text-ksi-cyan/70" />
                    <span className="font-ibm text-white/60 text-sm">Снижение нагрузки на команду</span>
                  </div>
                  <span className="font-oswald text-white text-lg">−{result.loadReductionPct}%</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Zap" size={16} className="text-ksi-cyan/70" />
                    <span className="font-ibm text-white/60 text-sm">Высвобожденных часов</span>
                  </div>
                  <span className="font-oswald text-white text-lg">{result.savedHours} ч</span>
                </div>
              </div>

              <div
                className="p-4 rounded-sm mb-6"
                style={{ background: "rgba(123,47,255,0.06)", border: "1px solid rgba(123,47,255,0.2)" }}
              >
                <p className="font-ibm text-white/70 text-sm leading-relaxed">
                  С помощью модулей АО КСИ эта стадия может быть сокращена с{" "}
                  <span className="font-oswald text-white">{result.baseDaysTeam} дн.</span> до{" "}
                  <span className="font-oswald text-gradient-main">{result.ksiDaysTeam} дн.</span>
                </p>
              </div>

              <a
                href="/contacts?topic=calculator"
                className="btn-primary-ksi w-full px-6 py-3 rounded-sm text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                Получить разбор вашей задачи
                <Icon name="ArrowRight" size={16} />
              </a>

              <p className="font-ibm text-white/30 text-xs leading-relaxed mt-4 text-center">
                Расчёт ориентировочный. Точные параметры и сроки фиксируются после разбора кейса.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
