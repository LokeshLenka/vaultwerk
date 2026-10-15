import { createContext, useContext, useEffect, useState } from "react";
import { getTheme, setTheme as persistTheme } from "@/lib/services/settings-service";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Cloud-first theme storage: a plain `vw-theme` cookie for instant
 * first-paint (works on the marketing pages with no account), mirrored to
 * the account's `theme` server setting when signed in so it follows the
 * user across devices. Nothing is kept in localStorage.
 */
const THEME_COOKIE = "vw-theme";

function readCookieTheme(): Theme | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${THEME_COOKIE}=`));
  const value = match?.slice(THEME_COOKIE.length + 1);
  if (value === "dark" || value === "light" || value === "system") {
    return value;
  }
  // One-time migration off the legacy localStorage key, then drop it.
  try {
    const legacy = window.localStorage.getItem("vaultwerk-ui-theme");
    if (legacy === "dark" || legacy === "light" || legacy === "system") {
      writeCookieTheme(legacy);
      window.localStorage.removeItem("vaultwerk-ui-theme");
      return legacy;
    }
  } catch {
    // Storage unavailable (private mode) — fall through to default.
  }
  return null;
}

function writeCookieTheme(theme: Theme) {
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => readCookieTheme() ?? defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Signed-in users inherit the server-side preference (cross-device).
  useEffect(() => {
    let cancelled = false;
    void getTheme()
      .then((serverTheme) => {
        if (!cancelled && serverTheme && serverTheme !== readCookieTheme()) {
          writeCookieTheme(serverTheme);
          setTheme(serverTheme);
        }
      })
      .catch(() => {
        // Anonymous or offline — the cookie value stands on its own.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = {
    theme,
    setTheme: (next: Theme) => {
      writeCookieTheme(next);
      setTheme(next);
      // Best-effort cross-device sync; anonymous users just keep the cookie.
      void persistTheme(next).catch(() => undefined);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
