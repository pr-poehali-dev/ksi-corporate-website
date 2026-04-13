import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { USER_ROLES_CLIENT } from "@/lib/constants";
import { formatDate } from "@/lib/formatters";
import StatusBadge from "@/components/cabinet/StatusBadge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface TeamUser {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  user_type: string;
  internal_role: string | null;
  status: string;
  created_at: string;
  last_login_at: string | null;
}

export default function Team() {
  const { company } = useAuth();
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);

  const { data, isLoading, error } = useQuery<{ items: TeamUser[]; total: number }>({
    queryKey: ["team-users"],
    queryFn: () => api.get<{ items: TeamUser[]; total: number }>("api-users"),
  });

  const users = data?.items ?? [];

  const canManage = true; // Simplified -- backend checks permissions

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-oswald text-xl font-medium uppercase tracking-wider text-white/90">
            Команда
          </h1>
          <p className="mt-0.5 text-sm text-white/40">
            {company?.name ?? "Компания"} -- {users.length} сотрудников
          </p>
        </div>
        {canManage && (
          <Button
            onClick={() => setShowAdd(true)}
            className="btn-primary-ksi h-9 gap-2 px-4 text-xs"
          >
            <Icon name="UserPlus" size={14} />
            Добавить сотрудника
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded bg-[#12121c]" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center py-16">
          <Icon name="AlertCircle" size={28} className="mb-2 text-red-400/60" />
          <p className="text-sm text-white/40">Не удалось загрузить команду</p>
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <Icon name="Users" size={36} className="mb-3 text-white/10" />
          <p className="text-sm text-white/40">Пока только вы</p>
          <p className="mt-1 text-xs text-white/20">Добавьте сотрудников для совместной работы</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1a1a2e]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#1a1a2e] bg-[#0f0f18]">
                <th className="px-4 py-3 text-xs font-medium text-white/30">Сотрудник</th>
                <th className="px-4 py-3 text-xs font-medium text-white/30">Email</th>
                <th className="px-4 py-3 text-xs font-medium text-white/30">Роль</th>
                <th className="px-4 py-3 text-xs font-medium text-white/30">Статус</th>
                <th className="px-4 py-3 text-xs font-medium text-white/30">Посл. вход</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => {
                const roleLabel = USER_ROLES_CLIENT.find((r) => r.value === u.internal_role)?.label
                  ?? USER_ROLES_CLIENT.find((r) => r.value === "employee")?.label
                  ?? "Сотрудник";
                return (
                  <tr
                    key={u.id}
                    className={cn(
                      "border-b border-[#1a1a2e]",
                      idx % 2 === 0 ? "bg-[#0f0f18]" : "bg-[#12121c]"
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10 text-xs font-semibold text-cyan-400">
                          {u.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() ?? "?"}
                        </div>
                        <span className="text-white/70">{u.full_name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/40">{u.email}</td>
                    <td className="px-4 py-3 text-xs text-white/50">{roleLabel}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={u.status} type="company" />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-white/25">
                      {u.last_login_at ? formatDate(u.last_login_at) : "Не входил"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add user dialog */}
      <AddUserDialog open={showAdd} onClose={() => setShowAdd(false)} onSuccess={() => {
        setShowAdd(false);
        queryClient.invalidateQueries({ queryKey: ["team-users"] });
      }} />
    </div>
  );
}

function AddUserDialog({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      api.post("api-users", {
        email: email.trim(),
        full_name: fullName.trim(),
        phone: phone.trim() || undefined,
        password,
        company_role: role,
      }),
    onSuccess: () => {
      setEmail("");
      setFullName("");
      setPhone("");
      setPassword("");
      setRole("employee");
      setError("");
      onSuccess();
    },
    onError: (err) => {
      if (err instanceof ApiError) {
        setError((err.data?.error as string) || "Ошибка создания");
      } else {
        setError("Не удалось добавить сотрудника");
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="border-[#1a1a2e] bg-[#12121c] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-oswald text-base uppercase tracking-wider text-white/80">
            Добавить сотрудника
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            if (!email.trim() || !fullName.trim() || !password) {
              setError("Заполните обязательные поля");
              return;
            }
            mutation.mutate();
          }}
          className="space-y-4 pt-2"
        >
          <div className="space-y-1.5">
            <label className="text-xs text-white/40">ФИО *</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-white/40">Email *</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-white/40">Телефон</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-white/40">Пароль *</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#1a1a2e] bg-[#0f0f18] text-sm text-white/80"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-white/40">Роль</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="border-[#1a1a2e] bg-[#0f0f18] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {USER_ROLES_CLIENT.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2">
              <Icon name="AlertCircle" size={13} className="text-red-400" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 border-[#1a1a2e] bg-transparent text-xs text-white/50"
            >
              Отмена
            </Button>
            <Button type="submit" disabled={mutation.isPending} className="btn-primary-ksi h-9 px-5 text-xs">
              {mutation.isPending && <Icon name="Loader2" size={13} className="mr-1.5 animate-spin" />}
              Добавить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
