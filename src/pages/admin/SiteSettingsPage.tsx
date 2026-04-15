import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Settings = Record<string, string>;

const REQUISITES_FIELDS = [
  { key: "company_full_name", label: "Полное наименование", type: "text" },
  { key: "company_short_name", label: "Краткое наименование", type: "text" },
  { key: "ogrn", label: "ОГРН", type: "text" },
  { key: "inn", label: "ИНН", type: "text" },
  { key: "kpp", label: "КПП", type: "text" },
  { key: "legal_address", label: "Юридический адрес", type: "text" },
  { key: "actual_address", label: "Фактический адрес", type: "text" },
  { key: "ceo_name", label: "ФИО руководителя", type: "text" },
  { key: "ceo_position", label: "Должность руководителя", type: "text" },
  { key: "email", label: "Email", type: "text" },
  { key: "phone", label: "Телефон", type: "text" },
  { key: "website", label: "Веб-сайт", type: "text" },
] as const;

const PRIVACY_FIELDS = [
  { key: "privacy_company_name", label: "Наименование оператора ПДн", type: "text" },
  { key: "privacy_company_address", label: "Адрес оператора", type: "text" },
  { key: "privacy_dpo_email", label: "Email ответственного за ПДн", type: "text" },
  { key: "privacy_dpo_name", label: "ФИО ответственного", type: "text" },
  { key: "privacy_effective_date", label: "Дата вступления в силу", type: "text" },
  { key: "privacy_data_types", label: "Типы персональных данных", type: "textarea" },
  { key: "privacy_processing_purposes", label: "Цели обработки", type: "textarea" },
  { key: "privacy_third_parties", label: "Третьи лица", type: "textarea" },
  { key: "privacy_storage_period", label: "Срок хранения", type: "text" },
  { key: "privacy_extra_clauses", label: "Дополнительные положения", type: "textarea" },
] as const;

const INPUT_CLASS =
  "w-full bg-[#0f0f18] border border-[#1a1a2e] text-white/80 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-white/15";

function buildPrivacyPreview(v: Settings): string {
  const name = v.privacy_company_name || "[Наименование оператора]";
  const address = v.privacy_company_address || "[Адрес оператора]";
  const dpoName = v.privacy_dpo_name || "[ФИО ответственного]";
  const dpoEmail = v.privacy_dpo_email || "[Email ответственного]";
  const effectiveDate = v.privacy_effective_date || "[Дата]";
  const dataTypes = v.privacy_data_types || "[Типы персональных данных]";
  const purposes = v.privacy_processing_purposes || "[Цели обработки]";
  const thirdParties = v.privacy_third_parties || "[Третьи лица]";
  const storagePeriod = v.privacy_storage_period || "[Срок хранения]";
  const extraClauses = v.privacy_extra_clauses || "";

  const sections = [
    `ПОЛИТИКА ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ\n${name}\n\nДата вступления в силу: ${effectiveDate}`,
    `1. ОБЩИЕ ПОЛОЖЕНИЯ\n\n1.1. Настоящая Политика обработки персональных данных (далее — Политика) определяет порядок обработки и защиты персональных данных ${name} (далее — Оператор), расположенного по адресу: ${address}.\n\n1.2. Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».`,
    `2. ОПЕРАТОР ПЕРСОНАЛЬНЫХ ДАННЫХ\n\nНаименование: ${name}\nАдрес: ${address}\nОтветственный за обработку ПДн: ${dpoName}\nКонтактный email: ${dpoEmail}`,
    `3. КАТЕГОРИИ ОБРАБАТЫВАЕМЫХ ПЕРСОНАЛЬНЫХ ДАННЫХ\n\n${dataTypes}`,
    `4. ЦЕЛИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ\n\n${purposes}`,
    `5. ПЕРЕДАЧА ПЕРСОНАЛЬНЫХ ДАННЫХ ТРЕТЬИМ ЛИЦАМ\n\n${thirdParties}`,
    `6. СРОКИ ОБРАБОТКИ И ХРАНЕНИЯ\n\nПерсональные данные обрабатываются и хранятся в течение: ${storagePeriod}.\n\nПо истечении срока хранения персональные данные подлежат уничтожению.`,
    `7. ПРАВА СУБЪЕКТА ПЕРСОНАЛЬНЫХ ДАННЫХ\n\nСубъект персональных данных имеет право:\n— получить информацию об обработке своих персональных данных;\n— требовать уточнения, блокирования или уничтожения персональных данных;\n— отозвать согласие на обработку персональных данных;\n— обжаловать действия или бездействие Оператора в Роскомнадзор.\n\nДля реализации указанных прав необходимо обратиться по адресу: ${dpoEmail}.`,
    `8. МЕРЫ ПО ЗАЩИТЕ ПЕРСОНАЛЬНЫХ ДАННЫХ\n\nОператор принимает необходимые и достаточные организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий с ними.`,
  ];

  if (extraClauses.trim()) {
    sections.push(`9. ДОПОЛНИТЕЛЬНЫЕ ПОЛОЖЕНИЯ\n\n${extraClauses}`);
  }

  return sections.join("\n\n");
}

const TELEGRAM_FIELDS = [
  { key: "telegram_bot_token", label: "Токен бота (@BotFather)", type: "password" },
  { key: "telegram_chat_id", label: "Chat ID (группа или личный)", type: "text" },
] as const;

export default function SiteSettingsPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery<{ settings: Settings }>({
    queryKey: ["site-settings"],
    queryFn: () => api.get<{ settings: Settings }>("site-settings"),
  });

  const [reqValues, setReqValues] = useState<Settings>({});
  const [privValues, setPrivValues] = useState<Settings>({});
  const [tgValues, setTgValues] = useState<Settings>({});
  const [reqSaving, setReqSaving] = useState(false);
  const [privSaving, setPrivSaving] = useState(false);
  const [tgSaving, setTgSaving] = useState(false);
  const [tgTesting, setTgTesting] = useState(false);

  useEffect(() => {
    if (data?.settings) {
      const s = data.settings;
      const rq: Settings = {};
      for (const f of REQUISITES_FIELDS) {
        rq[f.key] = s[f.key] || "";
      }
      setReqValues(rq);

      const pv: Settings = {};
      for (const f of PRIVACY_FIELDS) {
        pv[f.key] = s[f.key] || "";
      }
      setPrivValues(pv);

      const tg: Settings = {};
      for (const f of TELEGRAM_FIELDS) {
        tg[f.key] = s[f.key] || "";
      }
      tg.telegram_notifications_enabled = s.telegram_notifications_enabled || "false";
      setTgValues(tg);
    }
  }, [data]);

  const saveRequisites = useMutation({
    mutationFn: () => api.put("site-settings", { settings: reqValues }),
    onMutate: () => setReqSaving(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Сохранено", description: "Настройки обновлены" });
    },
    onError: (err) => {
      const msg = err instanceof ApiError ? (err.data?.error as string) || "Ошибка сохранения" : "Не удалось сохранить";
      toast({ title: "Ошибка", description: msg, variant: "destructive" });
    },
    onSettled: () => setReqSaving(false),
  });

  const savePrivacy = useMutation({
    mutationFn: () => api.put("site-settings", { settings: privValues }),
    onMutate: () => setPrivSaving(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Сохранено", description: "Настройки обновлены" });
    },
    onError: (err) => {
      const msg = err instanceof ApiError ? (err.data?.error as string) || "Ошибка сохранения" : "Не удалось сохранить";
      toast({ title: "Ошибка", description: msg, variant: "destructive" });
    },
    onSettled: () => setPrivSaving(false),
  });

  const saveTelegram = useMutation({
    mutationFn: () => api.put("site-settings", { settings: tgValues }),
    onMutate: () => setTgSaving(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Сохранено", description: "Настройки Telegram обновлены" });
    },
    onError: (err) => {
      const msg = err instanceof ApiError ? (err.data?.error as string) || "Ошибка сохранения" : "Не удалось сохранить";
      toast({ title: "Ошибка", description: msg, variant: "destructive" });
    },
    onSettled: () => setTgSaving(false),
  });

  const handleTestTelegram = async () => {
    setTgTesting(true);
    try {
      await api.post("contact-form", { action: "test" });
      toast({ title: "Отправлено", description: "Тестовое сообщение отправлено в Telegram" });
    } catch (err) {
      const msg = err instanceof ApiError ? (err.data?.error as string) || "Ошибка отправки" : "Не удалось отправить";
      toast({ title: "Ошибка", description: msg, variant: "destructive" });
    } finally {
      setTgTesting(false);
    }
  };

  const privacyPreview = useMemo(() => buildPrivacyPreview(privValues), [privValues]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Настройки сайта</h1>
          <p className="mt-0.5 text-sm text-white/40">Реквизиты компании и политика обработки ПДн</p>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-[#12121c]" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Настройки сайта</h1>
          <p className="mt-0.5 text-sm text-white/40">Реквизиты компании и политика обработки ПДн</p>
        </div>
        <div className="flex flex-col items-center py-16">
          <Icon name="AlertTriangle" size={28} className="mb-2 text-red-400/50" />
          <p className="text-sm text-white/30">Не удалось загрузить настройки</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">Настройки сайта</h1>
        <p className="mt-0.5 text-sm text-white/40">Реквизиты компании и политика обработки ПДн</p>
      </div>

      <Tabs defaultValue="requisites">
        <TabsList className="border border-[#1a1a2e] bg-[#0f0f18]">
          <TabsTrigger value="requisites" className="text-xs data-[state=active]:bg-[#1a1a2e]">Реквизиты</TabsTrigger>
          <TabsTrigger value="privacy" className="text-xs data-[state=active]:bg-[#1a1a2e]">Политика ПДн</TabsTrigger>
          <TabsTrigger value="telegram" className="text-xs data-[state=active]:bg-[#1a1a2e]">Уведомления</TabsTrigger>
        </TabsList>

        <TabsContent value="requisites" className="mt-4">
          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-5 text-xs font-medium uppercase tracking-wider text-white/35">Реквизиты компании</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {REQUISITES_FIELDS.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <label className="text-xs text-white/40">{f.label}</label>
                  <input
                    type="text"
                    value={reqValues[f.key] || ""}
                    onChange={(e) => setReqValues((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    className={INPUT_CLASS}
                    placeholder={f.label}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => saveRequisites.mutate()}
                disabled={reqSaving}
                className="flex items-center gap-2 rounded-md bg-cyan-500/10 px-5 py-2.5 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20 disabled:opacity-50"
              >
                {reqSaving && <Icon name="Loader2" size={14} className="animate-spin" />}
                <Icon name="Save" size={14} />
                Сохранить
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4 space-y-4">
          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-5 text-xs font-medium uppercase tracking-wider text-white/35">Конструктор политики ПДн</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {PRIVACY_FIELDS.map((f) => (
                <div key={f.key} className={`space-y-1.5 ${f.type === "textarea" ? "md:col-span-2" : ""}`}>
                  <label className="text-xs text-white/40">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={privValues[f.key] || ""}
                      onChange={(e) => setPrivValues((prev) => ({ ...prev, [f.key]: e.target.value }))}
                      rows={4}
                      className={INPUT_CLASS + " resize-y"}
                      placeholder={f.label}
                    />
                  ) : (
                    <input
                      type="text"
                      value={privValues[f.key] || ""}
                      onChange={(e) => setPrivValues((prev) => ({ ...prev, [f.key]: e.target.value }))}
                      className={INPUT_CLASS}
                      placeholder={f.label}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => savePrivacy.mutate()}
                disabled={privSaving}
                className="flex items-center gap-2 rounded-md bg-cyan-500/10 px-5 py-2.5 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20 disabled:opacity-50"
              >
                {privSaving && <Icon name="Loader2" size={14} className="animate-spin" />}
                <Icon name="Save" size={14} />
                Сохранить
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">Предпросмотр документа</h3>
            <div className="rounded-md border border-[#1a1a2e] bg-[#0f0f18] p-5">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/60">{privacyPreview}</pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="telegram" className="mt-4 space-y-4">
          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/35">Telegram-уведомления</h3>
            <p className="mb-5 text-xs text-white/25">Заявки с формы «Связаться» будут приходить в Telegram-чат</p>

            <div className="mb-5 flex items-center gap-3">
              <button
                onClick={() => setTgValues(prev => ({ ...prev, telegram_notifications_enabled: prev.telegram_notifications_enabled === "true" ? "false" : "true" }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${tgValues.telegram_notifications_enabled === "true" ? "bg-cyan-500/30" : "bg-white/10"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${tgValues.telegram_notifications_enabled === "true" ? "translate-x-6 bg-cyan-400" : "translate-x-1 bg-white/30"}`} />
              </button>
              <span className="text-sm text-white/60">{tgValues.telegram_notifications_enabled === "true" ? "Уведомления включены" : "Уведомления выключены"}</span>
            </div>

            <div className="space-y-4">
              {TELEGRAM_FIELDS.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <label className="text-xs text-white/40">{f.label}</label>
                  <input
                    type={f.type}
                    value={tgValues[f.key] || ""}
                    onChange={(e) => setTgValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className={INPUT_CLASS}
                    placeholder={f.label}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => saveTelegram.mutate()}
                disabled={tgSaving}
                className="flex items-center gap-2 rounded-md bg-cyan-500/10 px-5 py-2.5 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20 disabled:opacity-50"
              >
                {tgSaving && <Icon name="Loader2" size={14} className="animate-spin" />}
                <Icon name="Save" size={14} />
                Сохранить
              </button>
              <button
                onClick={handleTestTelegram}
                disabled={tgTesting || !tgValues.telegram_bot_token || !tgValues.telegram_chat_id}
                className="flex items-center gap-2 rounded-md border border-[#1a1a2e] px-5 py-2.5 text-xs font-medium text-white/50 transition-colors hover:border-[#2a2a3e] hover:text-white/70 disabled:opacity-30"
              >
                {tgTesting && <Icon name="Loader2" size={14} className="animate-spin" />}
                <Icon name="Send" size={14} />
                Тест
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">Инструкция</h3>
            <div className="space-y-3 text-sm text-white/45">
              <div className="flex gap-3">
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-[10px] font-bold text-cyan-400">1</span>
                <p>Откройте <a href="https://t.me/BotFather" target="_blank" rel="noopener" className="text-cyan-400/70 hover:text-cyan-400 transition-colors">@BotFather</a> в Telegram и создайте нового бота командой /newbot</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-[10px] font-bold text-cyan-400">2</span>
                <p>Скопируйте токен бота и вставьте в поле выше</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-[10px] font-bold text-cyan-400">3</span>
                <p>Добавьте бота в группу или напишите ему лично, затем узнайте Chat ID через <a href="https://t.me/getmyid_bot" target="_blank" rel="noopener" className="text-cyan-400/70 hover:text-cyan-400 transition-colors">@getmyid_bot</a></p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-[10px] font-bold text-cyan-400">4</span>
                <p>Вставьте Chat ID, сохраните и нажмите «Тест» для проверки</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}