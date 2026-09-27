import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { rawFetch, setAccessToken } from "@/lib/api/client";
import { AuthContext } from "./auth-context";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  return rawFetch<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Silent session restore on boot: the refresh cookie (if present and
  // valid) yields an access token without prompting for credentials.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { accessToken } = await rawFetch<{ accessToken: string }>(
          "/api/auth/refresh",
          { method: "POST" },
        );
        setAccessToken(accessToken);
        const { user: me } = await rawFetch<{ user: AuthUser }>("/api/auth/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) setAccessToken(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await postJson<AuthResponse>("/api/auth/login", {
      email,
      password,
    });
    setAccessToken(data.accessToken);
    setUser(data.user);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const data = await postJson<AuthResponse>("/api/auth/register", {
        name,
        email,
        password,
      });
      setAccessToken(data.accessToken);
      setUser(data.user);
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await rawFetch("/api/auth/logout", { method: "POST" });
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
