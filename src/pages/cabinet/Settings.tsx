import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/lib/formatters";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface CompanyDetail {
  company: {
    id: string;
    name: string;
    inn: string | null;
    ogrn: string | null;
    company_type: string;
    status: string;
    contact_person: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    created_at: string;
  };
}

function InfoField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="py-2.5">
      <p className="mb-0.5 text-[11px] text-white/25">{label}</p>
      <p className="text-sm text-white/70">{value || "\u2014"}</p>
    </div>
  );
}

export default function Settings() {
  const { company } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
          Настройки
        </h1>
        <p className="mt-0.5 text-sm text-white/40">Управление аккаунтом и компанией</p>
      </div>

      <Tabs defaultValue="company">
        <TabsList className="border border-[#1a1a2e] bg-[#0f0f18]">
          <TabsTrigger value="company" className="text-xs data-[state=active]:bg-[#1a1a2e]">Компания</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs data-[state=active]:bg-[#1a1a2e]">Уведомления</TabsTrigger>
          <TabsTrigger value="security" className="text-xs data-[state=active]:bg-[#1a1a2e]">Безопасность</TabsTrigger>
          <TabsTrigger value="about" className="text-xs data-[state=active]:bg-[#1a1a2e]">О системе</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <CompanyTab companyId={company?.id} />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
        <TabsContent value="about">
          <AboutTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CompanyTab({ companyId }: { companyId?: string }) {
  const { data, isLoading } = useQuery<CompanyDetail>({
    queryKey: ["company-detail", companyId],
    queryFn: () => api.get<CompanyDetail>("api-company-detail", { id: companyId! }),
    enabled: !!companyId,
  });

  if (!companyId) {
    return <p className="py-8 text-center text-sm text-white/30">Компания не привязана</p>;
  }

  if (isLoading) {
    return (
      <div className="space-y-3 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-[#12121c]" />
        ))}
      </div>
    );
  }

  const c = data?.company;

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/35">Реквизиты</h3>
        <div className="divide-y divide-[#1a1a2e]">
          <InfoField label="Наименование" value={c?.name} />
          <InfoField label="ИНН" value={c?.inn} />
          <InfoField label="ОГРН" value={c?.ogrn} />
          <InfoField label="Тип" value={c?.company_type} />
          <InfoField label="Статус" value={c?.status} />
          <InfoField label="Дата регистрации" value={c?.created_at ? formatDate(c.created_at) : null} />
        </div>
      </div>
      <div className="rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/35">Контакты</h3>
        <div className="divide-y divide-[#1a1a2e]">
          <InfoField label="Контактное лицо" value={c?.contact_person} />
          <InfoField label="Email" value={c?.contact_email} />
          <InfoField label="Телефон" value={c?.contact_phone} />
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const settings = [
    { key: "task_status", label: "Изменение статуса задачи", enabled: true },
    { key: "task_comment", label: "Новый комментарий к задаче", enabled: true },
    { key: "task_result", label: "Результат готов", enabled: true },
    { key: "km_operation", label: "Операции по счёту КМ", enabled: false },
    { key: "system", label: "Системные уведомления", enabled: true },
    { key: "email_digest", label: "Email-дайджест (ежедневно)", enabled: false },
  ];

  return (
    <div className="mt-4 rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">
        Настройки уведомлений
      </h3>
      <div className="space-y-4">
        {settings.map((s) => (
          <div key={s.key} className="flex items-center justify-between">
            <span className="text-sm text-white/60">{s.label}</span>
            <Switch defaultChecked={s.enabled} />
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-white/20">
        Настройки уведомлений сохраняются автоматически
      </p>
    </div>
  );
}

function SecurityTab() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      api.post("auth-change-password", {
        current_password: currentPw,
        new_password: newPw,
      }),
    onSuccess: () => {
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
      setError("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err) => {
      if (err instanceof ApiError) {
        setError((err.data?.error as string) || "Ошибка смены пароля");
      } else {
        setError("Не удалось сменить пароль");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!currentPw || !newPw) {
      setError("Заполните все поля");
      return;
    }
    if (newPw.length < 8) {
      setError("Новый пароль должен быть не менее 8 символов");
      return;
    }
    if (newPw !== confirmPw) {
      setError("Пароли не совпадают");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="mt-4 max-w-md rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">Смена пароля</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs text-white/40">Текущий пароль</label>
          <Input
            type="password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-white/40">Новый пароль</label>
          <Input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-white/40">Подтверждение пароля</label>
          <Input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2">
            <Icon name="AlertCircle" size={13} className="text-red-400" />
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-md border border-green-500/20 bg-green-500/10 px-3 py-2">
            <Icon name="CheckCircle" size={13} className="text-green-400" />
            <p className="text-xs text-green-400">Пароль успешно изменён</p>
          </div>
        )}

        <Button type="submit" disabled={mutation.isPending} className="btn-primary-ksi h-9 px-5 text-xs">
          {mutation.isPending && <Icon name="Loader2" size={13} className="mr-1.5 animate-spin" />}
          Сменить пароль
        </Button>
      </form>
    </div>
  );
}

function AboutTab() {
  return (
    <div className="mt-4 max-w-md rounded-lg border border-[#1a1a2e] bg-[#12121c] p-5">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/35">О системе</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Платформа</span>
          <span className="text-white/70">КСИ Digital Platform</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Версия</span>
          <span className="font-mono text-white/50">1.0.0</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Окружение</span>
          <span className="font-mono text-white/50">Production</span>
        </div>
      </div>
      <div className="mt-5 border-t border-[#1a1a2e] pt-4">
        <p className="text-xs text-white/25">
          По вопросам работы платформы обращайтесь к вашему куратору через раздел "Диалог"
          или на support@ksi.digital
        </p>
      </div>
    </div>
  );
}
