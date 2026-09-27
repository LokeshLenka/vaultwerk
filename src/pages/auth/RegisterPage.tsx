import { Navigate, useNavigate } from "react-router-dom";
import { AuthCard, AuthFooterLink } from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth/useAuth";
import { ApiError } from "@/lib/api/client";

export default function RegisterPage() {
  const { user, loading, register } = useAuth();
  const navigate = useNavigate();

  if (!loading && user) return <Navigate to="/dashboard" replace />;

  return (
    <AuthCard
      title="Create your account"
      subtitle="Your library is private to you by default."
      fields={[
        { id: "name", label: "Name", type: "text", autoComplete: "name", placeholder: "Ada Lovelace" },
        { id: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@example.com" },
        { id: "password", label: "Password", type: "password", autoComplete: "new-password", placeholder: "Minimum 8 characters" },
        { id: "confirm", label: "Confirm password", type: "password", autoComplete: "new-password", placeholder: "Repeat your password" },
      ]}
      submitLabel="Create account"
      busyLabel="Creating…"
      footer={
        <>
          Already have an account? <AuthFooterLink to="/login" label="Sign in" />
        </>
      }
      onSubmit={async (values) => {
        if ((values.password ?? "").length < 8) {
          throw new ApiError(400, "Password must be at least 8 characters");
        }
        if (values.password !== values.confirm) {
          throw new ApiError(400, "Passwords do not match");
        }
        await register(values.name, values.email, values.password);
        navigate("/dashboard", { replace: true });
      }}
    />
  );
}
