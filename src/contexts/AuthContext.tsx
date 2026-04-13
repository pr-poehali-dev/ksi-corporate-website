import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { api, setToken, clearToken, ApiError } from "@/lib/api";

interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: "client" | "internal";
  internal_role: string | null;
}

interface Company {
  id: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  company: Company | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<{ user: User; company: Company | null }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    company: null,
    token: localStorage.getItem("ksi_token"),
    loading: true,
  });

  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem("ksi_token");
    if (!storedToken) {
      setState({ user: null, company: null, token: null, loading: false });
      return;
    }

    try {
      const data = await api.get<{
        user: User;
        company: Company | null;
      }>("auth-me");

      setState({
        user: data.user,
        company: data.company,
        token: storedToken,
        loading: false,
      });
    } catch (err) {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearToken();
      }
      setState({ user: null, company: null, token: null, loading: false });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await api.post<{
        user: User;
        company: Company | null;
        token: string;
      }>("auth-login", { email, password });

      setToken(data.token);

      setState({
        user: data.user,
        company: data.company,
        token: data.token,
        loading: false,
      });

      return { user: data.user, company: data.company };
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await api.post("auth-logout");
    } catch {
      // Ignore logout errors
    }
    clearToken();
    setState({ user: null, company: null, token: null, loading: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
