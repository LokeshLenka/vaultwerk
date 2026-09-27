import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth/useAuth";
import { SpinnerGap } from "@phosphor-icons/react";
import type { ReactNode } from "react";

/** Guards private routes: loading → spinner, anonymous → /login (with return-to). */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        className="flex min-h-dvh items-center justify-center"
        role="status"
        aria-label="Checking session"
      >
        <SpinnerGap size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
