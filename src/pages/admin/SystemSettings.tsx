import { USER_ROLES_INTERNAL, TASK_STATUSES, STATUS_COLOR_MAP } from "@/lib/constants";
import Icon from "@/components/ui/icon";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function SystemSettings() {
  return (
    <div className="space-y-6">
      <div><h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Настройки системы</h1><p className="mt-0.5 text-sm text-white/40">Конфигурация платформы КСИ</p></div>

      <Tabs defaultValue="roles">
        <TabsList className="border border-[#1a1a2e] bg-[#0f0f18]">
          <TabsTrigger value="roles" className="text-xs data-[state=active]:bg-[#1a1a2e]">Роли</TabsTrigger>
          <TabsTrigger value="statuses" className="text-xs data-[state=active]:bg-[#1a1a2e]">Статусы</TabsTrigger>
          <TabsTrigger value="km" className="text-xs data-[state=active]:bg-[#1a1a2e]">КМ правила</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs data-[state=active]:bg-[#1a1a2e]">Уведомления</TabsTrigger>
          <TabsTrigger value="system" className="text-xs data-[state=active]:bg-[#1a1a2e]">Система</TabsTrigger>
        </TabsList>

        {/* Roles */}
        <TabsContent value="roles" className="mt-4">
          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">Внутренние роли</h3>
            <div className="space-y-3">
              {USER_ROLES_INTERNAL.map(r => (
                <div key={r.value} className="flex items-center justify-between rounded-md border border-[#1a1a2e] bg-[#0f0f18] px-4 py-3">
                  <div><p className="text-sm font-medium text-white/70">{r.label}</p><p className="font-mono text-[11px] text-white/20">{r.value}</p></div>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/20">Системная</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Task statuses flow */}
        <TabsContent value="statuses" className="mt-4">
          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">Жизненный цикл задачи</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(TASK_STATUSES).map(([key, cfg], idx) => {
                const colors = STATUS_COLOR_MAP[cfg.color] ?? STATUS_COLOR_MAP.gray;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <div className={cn("flex items-center gap-1.5 rounded-md border border-[#1a1a2e] px-3 py-2", colors.bg)}>
                      <Icon name={cfg.icon ?? "Circle"} size={12} className={colors.text} />
                      <span className={cn("text-xs font-medium", colors.text)}>{cfg.label}</span>
                    </div>
                    {idx < Object.entries(TASK_STATUSES).length - 1 && <Icon name="ArrowRight" size={12} className="text-white/10" />}
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[11px] text-white/20">Переходы между статусами регулируются бизнес-логикой. Некоторые переходы ограничены ролями пользователей.</p>
          </div>
        </TabsContent>

        {/* KM rules */}
        <TabsContent value="km" className="mt-4">
          <div className="max-w-lg rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">Правила КМ</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between"><span className="text-sm text-white/60">Авто-подтверждение результата (дни)</span><span className="font-mono text-sm text-white/70">5</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-white/60">Макс. срок спора (дни)</span><span className="font-mono text-sm text-white/70">14</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-white/60">Макс. резерв от доступного (%)</span><span className="font-mono text-sm text-white/70">100%</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-white/60">Бонусы применяются в первую очередь</span><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><span className="text-sm text-white/60">Уведомление при низком балансе</span><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><span className="text-sm text-white/60">Порог низкого баланса (КМ)</span><span className="font-mono text-sm text-white/70">1 000</span></div>
            </div>
            <p className="mt-4 text-[11px] text-white/20">Изменение правил доступно в расширенной версии</p>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-4">
          <div className="max-w-lg rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">Шаблоны уведомлений</h3>
            <div className="space-y-3">
              {[
                { name: "Задача создана", trigger: "task_created", enabled: true },
                { name: "Статус изменён", trigger: "task_status_changed", enabled: true },
                { name: "Комментарий добавлен", trigger: "comment_added", enabled: true },
                { name: "Результат готов", trigger: "result_ready", enabled: true },
                { name: "Операция КМ", trigger: "km_operation", enabled: false },
                { name: "Низкий баланс", trigger: "low_balance", enabled: true },
                { name: "Еженедельный дайджест", trigger: "weekly_digest", enabled: false },
              ].map(t => (
                <div key={t.trigger} className="flex items-center justify-between rounded-md bg-[#0f0f18] px-4 py-3">
                  <div><p className="text-sm text-white/60">{t.name}</p><p className="font-mono text-[10px] text-white/15">{t.trigger}</p></div>
                  <Switch defaultChecked={t.enabled} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* System */}
        <TabsContent value="system" className="mt-4">
          <div className="max-w-lg rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">Информация о системе</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-white/40">Платформа</span><span className="text-white/70">КСИ Digital Platform</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Версия</span><span className="font-mono text-white/50">1.0.0</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Окружение</span><span className="font-mono text-white/50">Production</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Backend</span><span className="font-mono text-white/50">Python 3.11 / Cloud Functions</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">База данных</span><span className="font-mono text-white/50">PostgreSQL</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Frontend</span><span className="font-mono text-white/50">React + Vite + Tailwind</span></div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
