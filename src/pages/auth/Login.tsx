import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { ApiError } from "@/lib/api";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Введите email и пароль");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email.trim(), password);

      if (result.user.user_type === "internal") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/cabinet", { replace: true });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError("Неверный email или пароль");
        } else if (err.status === 403) {
          setError("Аккаунт деактивирован");
        } else {
          setError((err.data?.error as string) || "Ошибка сервера");
        }
      } else {
        setError("Не удалось подключиться к серверу");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      {/* Subtle grid background */}
      <div className="fixed inset-0 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src="https://cdn.poehali.dev/projects/03ddefe8-b860-4510-9458-b49f9b2a8b44/bucket/93eb9bc4-b664-470c-ae35-71d7454ce9b4.png"
            alt="КСИ"
            className="mb-4 h-14 w-14 object-contain"
          />
          <h1 className="font-oswald text-xl font-medium uppercase tracking-[0.15em] text-white/90">
            Цифровая платформа КСИ
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Вход в личный кабинет
          </p>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-[#1a1a2e] bg-[#0f0f18] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Icon name="Mail" size={16} className="text-white/25" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.ru"
                  autoComplete="email"
                  className="border-[#1a1a2e] bg-[#0a0a0f] pl-10 text-white placeholder:text-white/20 focus:border-cyan-500/40 focus:ring-cyan-500/20"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Пароль
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Icon name="Lock" size={16} className="text-white/25" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                  className="border-[#1a1a2e] bg-[#0a0a0f] pl-10 pr-10 text-white placeholder:text-white/20 focus:border-cyan-500/40 focus:ring-cyan-500/20"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/25 hover:text-white/50"
                  tabIndex={-1}
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2.5">
                <Icon name="AlertCircle" size={14} className="shrink-0 text-red-400" />
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="btn-primary-ksi w-full rounded-md py-2.5 text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Вход...
                </span>
              ) : (
                "Войти"
              )}
            </Button>
          </form>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/60"
          >
            <Icon name="ArrowLeft" size={12} />
            Вернуться на сайт
          </a>
        </div>
      </div>
    </div>
  );
}
