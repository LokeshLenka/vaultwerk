import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { WarningCircle } from "@phosphor-icons/react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Top-level crash guard. Local-first apps can hit unrecoverable states
 * (corrupt IndexedDB, failed Dexie migration, broken render after a bad
 * deploy with cached chunks) — without a boundary the user gets a blank
 * page with no recovery path. This renders an actionable fallback instead.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    // Visible in Vercel logs / browser console for post-mortems.
    console.error("[VaultWerk] Uncaught render error:", error, info);
  }

  private handleReset = () => {
    this.setState({ error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.assign("/");
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
          <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-destructive/10">
            <WarningCircle size={22} weight="fill" className="text-destructive" />
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              VaultWerk hit an unexpected error. Your saved tools live in this
              browser&apos;s local database and are unaffected by this screen.
            </p>
          </div>
          {import.meta.env.DEV && (
            <pre className="max-h-32 overflow-auto rounded bg-muted p-2 text-left text-xs text-muted-foreground">
              {error.message}
            </pre>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button onClick={this.handleReset}>Try again</Button>
            <Button variant="outline" onClick={this.handleReload}>
              Reload app
            </Button>
            <Button variant="ghost" onClick={this.handleGoHome}>
              Go home
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
