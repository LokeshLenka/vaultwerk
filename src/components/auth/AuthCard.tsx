import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XCircle } from "@phosphor-icons/react";
import { ApiError } from "@/lib/api/client";

export interface AuthField {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}

export function AuthCard({
  title,
  subtitle,
  fields,
  submitLabel,
  busyLabel,
  footer,
  onSubmit,
}: {
  title: string;
  subtitle: string;
  fields: AuthField[];
  submitLabel: string;
  busyLabel: string;
  footer: ReactNode;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Something went wrong",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                required
                value={values[field.id] ?? ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [field.id]: e.target.value }))
                }
              />
            </div>
          ))}
          {error && (
            <p role="alert" className="flex items-start gap-2 text-sm text-destructive">
              <XCircle size={16} weight="fill" className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? busyLabel : submitLabel}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </div>
  );
}

export function AuthFooterLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="font-medium text-foreground underline-offset-4 hover:underline">
      {label}
    </Link>
  );
}
