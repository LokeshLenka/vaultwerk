import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import { AuthCard, AuthFooterLink } from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth/useAuth";
import SplitText from "@/components/SplitText";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as
  | string
  | undefined;

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: string } | null)?.from ?? "/dashboard";

  if (!loading && user) return <Navigate to={from} replace />;

  if (clerkKey) {
    return (
      <div className="flex min-h-dvh items-center justify-center p-6">
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/register"
          fallbackRedirectUrl={from}
        />
      </div>
    );
  }

  return (
    <AuthCard
      title={
        <SplitText
          tag="span"
          text="Welcome back"
          splitType="words"
          delay={70}
          duration={0.7}
        />
      }
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
