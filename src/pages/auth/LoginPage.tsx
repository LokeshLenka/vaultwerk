import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthCard, AuthFooterLink } from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth/useAuth";

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: string } | null)?.from ?? "/dashboard";

  if (!loading && user) return <Navigate to={from} replace />;

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your VaultWerk library."
      fields={[
        { id: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@example.com" },
        { id: "password", label: "Password", type: "password", autoComplete: "current-password", placeholder: "••••••••" },
      ]}
      submitLabel="Sign in"
      busyLabel="Signing in…"
      footer={
        <>
          New to VaultWerk? <AuthFooterLink to="/register" label="Create an account" />
        </>
      }
      onSubmit={async (values) => {
        await login(values.email, values.password);
        navigate(from, { replace: true });
      }}
    />
  );
}
