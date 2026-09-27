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

/**
 * Telemetry is opt-in and endpoint-driven:
 * - dev: logs to the console so flows can be inspected locally.
 * - prod: silent no-op unless VITE_TELEMETRY_ENDPOINT is configured.
 *
 * Previously this POSTed unconditionally to a relative /api/telemetry that
 * doesn't exist on the static Vercel deployment, producing a 404 on every
 * workspace action. Never ship network calls to endpoints that don't exist.
 */
const ENDPOINT = import.meta.env.VITE_TELEMETRY_ENDPOINT as string | undefined;

export function track(event: TelemetryEvent, data?: Record<string, unknown>) {
  if (import.meta.env.DEV) {
    console.log(`[Telemetry] ${event}`, data ?? "");
  }

  if (!ENDPOINT || typeof window === "undefined" || !("fetch" in window)) {
    return;
  }

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, data, timestamp: new Date().toISOString() }),
    keepalive: true,
  }).catch(() => {
    // Telemetry must never break the user flow.
  });
}
