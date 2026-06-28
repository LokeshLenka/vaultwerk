import { useCallback, useEffect, useState } from "react";
import {
  getSetting,
  removeSetting,
  setSetting,
} from "@/lib/services/settings-service";
import { detectBrowser, getBrowserLabel } from "@/lib/browser-detection";
import { track } from "@/lib/telemetry";
import {
  RocketLaunch,
  CheckCircle,
  XCircle,
  Globe,
} from "@phosphor-icons/react";
import { toast } from "sonner";

const PERMISSION_KEY = "workspacePermissionAcknowledged";

export default function WorkspaceSettingsPage() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const browser = detectBrowser();
  const browserLabel = getBrowserLabel(browser);

  useEffect(() => {
    getSetting<boolean>(PERMISSION_KEY).then((val) => {
      setPermissionGranted(val === true);
    });
  }, []);

  const handleReset = useCallback(async () => {
    await removeSetting(PERMISSION_KEY);
    setPermissionGranted(false);
    toast.success("Workspace permission reset", {
      description:
        "You will be asked to enable Workspace Mode on your next launch.",
    });
  }, []);

  const handleTestPopup = useCallback(() => {
    const win = window.open("about:blank", "_blank", "noopener,noreferrer");
    if (!win || win.closed || typeof win.closed === "undefined") {
      toast.error("Popup blocked", {
        description:
          `${browserLabel} is blocking popups. Please allow popups for this site.`,
      });
    } else {
      win.close();
      toast.success("Popup permission granted", {
        description: `${browserLabel} allows popups for this site.`,
      });
    }
  }, [browserLabel]);

  const handleOpenSample = useCallback(() => {
    const urls = [
      { name: "GitHub", url: "https://github.com" },
      { name: "Vercel", url: "https://vercel.com" },
    ];
    track("workspace_modal_shown");

    const blocked: { name: string; url: string }[] = [];
    for (const { name, url } of urls) {
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === "undefined") {
        blocked.push({ name, url });
      }
    }

    if (blocked.length > 0) {
      toast.error("Workspace blocked", {
        description: `${blocked.length} tab${blocked.length !== 1 ? "s" : ""} blocked by ${browserLabel}.`,
      });
    } else {
      toast.success("Workspace launched", {
        description: "All tools opened successfully.",
      });
    }
  }, [browserLabel]);

  const handleToggle = useCallback(async () => {
    if (permissionGranted) {
      await removeSetting(PERMISSION_KEY);
      setPermissionGranted(false);
      toast.success("Workspace Mode disabled");
    } else {
      await setSetting(PERMISSION_KEY, true);
      setPermissionGranted(true);
      toast.success("Workspace Mode enabled");
    }
  }, [permissionGranted]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Workspace Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage how Workspace launches your tools in browser tabs.
        </p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <RocketLaunch size="100%" weight="fill" className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Enable Workspace Mode</p>
              <p className="text-xs text-muted-foreground">
                {permissionGranted
                  ? "Workspace is allowed to open multiple tabs."
                  : "Workspace will ask for permission before launching."}
              </p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={permissionGranted === true}
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
              permissionGranted ? "bg-primary" : "bg-input"
            }`}
          >
            <span
              className={`inline-block size-5 transform rounded-full bg-white shadow-sm transition-transform ${
                permissionGranted ? "translate-x-[22px]" : "translate-x-[2px]"
              }`}
            />
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Actions</h3>

          <div className="rounded-lg border">
            <button
              onClick={handleReset}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted/30"
            >
              <XCircle size={18} className="text-muted-foreground" />
              <div>
                <span className="text-foreground">Reset Workspace Permission</span>
                <p className="text-xs text-muted-foreground">
                  Clear saved permission and show onboarding again.
                </p>
              </div>
            </button>
            <div className="border-t" />
            <button
              onClick={handleTestPopup}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted/30"
            >
              <CheckCircle size={18} className="text-muted-foreground" />
              <div>
                <span className="text-foreground">Test Popup Permission</span>
                <p className="text-xs text-muted-foreground">
                  Check if your browser allows popups for this site.
                </p>
              </div>
            </button>
            <div className="border-t" />
            <button
              onClick={handleOpenSample}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted/30"
            >
              <Globe size={18} className="text-muted-foreground" />
              <div>
                <span className="text-foreground">Open Sample Workspace</span>
                <p className="text-xs text-muted-foreground">
                  Test with GitHub and Vercel to verify functionality.
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4">
          <h3 className="mb-2 text-sm font-medium">Browser Compatibility</h3>
          <div className="space-y-2 text-sm">
            {(["chrome", "edge", "firefox", "brave", "safari"] as const).map(
              (b) => (
                <div key={b} className="flex items-center justify-between">
                  <span>{getBrowserLabel(b)}</span>
                  <span
                    className={`flex items-center gap-1 text-xs ${
                      b === browser ? "text-emerald-500" : "text-muted-foreground"
                    }`}
                  >
                    {b === browser ? (
                      <>
                        <CheckCircle size={12} weight="fill" />
                        Detected
                      </>
                    ) : (
                      "Supported"
                    )}
                  </span>
                </div>
              ),
            )}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Detected: {browserLabel}
          </p>
        </div>
      </section>
    </div>
  );
}
