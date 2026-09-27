import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignOut } from "@phosphor-icons/react";
import { useAuth } from "@/lib/auth/useAuth";
import { Button } from "@/components/ui/button";

/**
 * Compact session control for the dashboard header: initial-avatar,
 * name/email on wide screens, sign-out action.
 */
export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  if (!user) return null;
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  async function handleLogout() {
    setBusy(true);
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
        title={user.email}
        aria-label={`Signed in as ${user.email}`}
      >
        {initial}
      </div>
      <div className="hidden leading-tight xl:block">
        <p className="max-w-32 truncate text-xs font-medium">{user.name}</p>
        <p className="max-w-32 truncate text-[11px] text-muted-foreground">
          {user.email}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => void handleLogout()}
        disabled={busy}
        title="Sign out"
        aria-label="Sign out"
      >
        <SignOut size={18} />
      </Button>
    </div>
  );
}
