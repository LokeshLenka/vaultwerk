import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { rawFetch, setTokenProvider } from "@/lib/api/client";
import { AuthContext } from "./auth-context";
import type { AuthContextValue, AuthUser } from "./AuthContext";

/**
 * Cloud-auth session provider. Clerk owns identity (passwords, OAuth,
 * MFA); this bridge maps the Clerk session onto VaultWerk's existing
 * `AuthContextValue` contract so every consumer (RequireAuth, UserMenu,
 * pages) works unchanged, and feeds Clerk session tokens into the API
 * client for the `Authorization` header.
 */
export function ClerkAuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, getToken, signOut } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const navigate = useNavigate();
  // Local profile keyed by Clerk user id, so an account switch never
  // flashes the previous account's profile while the new one loads.
  const [profile, setProfile] = useState<{
    forId: string;
    user: AuthUser;
  } | null>(null);

  // Every API request carries a fresh Clerk session token.
  useEffect(() => {
    if (isSignedIn) {
      setTokenProvider(() => getToken());
    } else {
      setTokenProvider(null);
    }
  }, [isSignedIn, getToken]);

  // Local profile (id + role) comes from our own /api/auth/me — the
  // server provisions/links the user row on first sight. State updates
  // happen only in async continuations below, never synchronously.
  const clerkId = clerkUser?.id;
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !clerkId) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await getToken();
        const { user } = await rawFetch<{ user: AuthUser }>("/api/auth/me", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!cancelled) setProfile({ forId: clerkId, user });
      } catch {
        // API unreachable — fall back to Clerk directory data so the UI
        // still renders identity instead of spinning forever.
        if (!cancelled) {
          const email =
            clerkUser?.primaryEmailAddress?.emailAddress ?? "unknown";
          setProfile({
            forId: clerkId,
            user: {
              id: clerkId,
              name: clerkUser?.fullName ?? email,
              email,
              role: "user",
            },
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, clerkId, getToken, clerkUser]);

  const login = useCallback(async () => {
    // Identity lives in Clerk's hosted flow; the /login route renders it.
    navigate("/login");
  }, [navigate]);

  const register = useCallback(async () => {
    navigate("/register");
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await signOut();
    } finally {
      setTokenProvider(null);
      setProfile(null);
    }
  }, [signOut]);

  const current =
    isSignedIn && clerkId && profile?.forId === clerkId ? profile.user : null;

  const value = useMemo<AuthContextValue>(
    () => ({
      user: current,
      loading: !isLoaded || (isSignedIn && current === null),
      login: login as AuthContextValue["login"],
      register: register as AuthContextValue["register"],
      logout,
    }),
    [current, isLoaded, isSignedIn, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
