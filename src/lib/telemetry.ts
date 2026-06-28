type TelemetryEvent =
  | "workspace_modal_shown"
  | "workspace_continue"
  | "workspace_popup_success"
  | "workspace_popup_blocked"
  | "workspace_retry"
  | "workspace_cancelled"
  | "workspace_open_completed"
  | "workspace_open_partial"
  | "workspace_dismissed";

const isDev = typeof window !== "undefined"
  && typeof (window as unknown as Record<string, unknown>).__VITE_DEVTOOLS_GLOBAL_HOOK__ !== "undefined";

export function track(event: TelemetryEvent, data?: Record<string, unknown>) {
  if (isDev) {
    console.log(`[Telemetry] ${event}`, data ?? "");
  }

  if (typeof window !== "undefined" && "fetch" in window) {
    fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, data, timestamp: new Date().toISOString() }),
      keepalive: true,
    }).catch(() => {});
  }
}
