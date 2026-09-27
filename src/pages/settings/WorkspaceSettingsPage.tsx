import { useCallback, useEffect, useRef, useState } from "react";
import {
  getSetting,
  removeSetting,
  setSetting,
} from "@/lib/services/settings-service";
import {
  BackupError,
  exportBackup,
  importBackup,
} from "@/lib/services/backup-service";
import {
  createApiKey,
  listApiKeys,
  revokeApiKey,
  type ApiKeyRecord,
} from "@/lib/services/api-key-service";
import { detectBrowser, getBrowserLabel } from "@/lib/browser-detection";
import { track } from "@/lib/telemetry";
import {
  RocketLaunch,
  CheckCircle,
  XCircle,
  Globe,
  Download,
  UploadSimple,
  Key,
  Copy,
  Trash,
} from "@phosphor-icons/react";
import { toast } from "sonner";

const PERMISSION_KEY = "workspacePermissionAcknowledged";

export default function WorkspaceSettingsPage() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKeyRecord[] | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [freshSecret, setFreshSecret] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const browser = detectBrowser();
  const browserLabel = getBrowserLabel(browser);

  useEffect(() => {
    getSetting<boolean>(PERMISSION_KEY).then((val) => {
      setPermissionGranted(val === true);
    });
    listApiKeys().then(setApiKeys).catch(() => setApiKeys([]));
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

  const handleCreateKey = useCallback(async () => {
    const name = newKeyName.trim();
    if (!name) {
      toast.error("Name your key first", {
        description: "e.g. “Browser extension” or “Raycast”.",
      });
      return;
    }
    setIsCreatingKey(true);
    try {
      const { apiKey, secret } = await createApiKey(name);
      setApiKeys((prev) => (prev ? [apiKey, ...prev] : [apiKey]));
      setNewKeyName("");
      // Shown exactly once — the API never returns it again.
      setFreshSecret(secret);
      toast.success("API key created", {
        description: "Copy it now. It won't be shown again.",
      });
    } catch {
      toast.error("Could not create key");
    } finally {
      setIsCreatingKey(false);
    }
  }, [newKeyName]);

  const handleRevokeKey = useCallback(async (id: string, name: string) => {
    try {
      await revokeApiKey(id);
      setApiKeys((prev) => (prev ?? []).filter((key) => key.id !== id));
      toast.success(`Revoked “${name}”`);
    } catch {
      toast.error("Could not revoke key");
    }
  }, []);

  const handleCopySecret = useCallback(async (secret: string) => {
    try {
      await navigator.clipboard.writeText(secret);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Copy failed — select the key manually");
    }
  }, []);

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

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const filename = await exportBackup();
      toast.success("Backup exported", {
        description: `${filename} saved to your downloads.`,
      });
    } catch {
      toast.error("Export failed", {
        description: "Could not read the local database.",
      });
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleImportFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      setIsImporting(true);
      try {
        const summary = await importBackup(file);
        const total =
          summary.tools +
          summary.collections +
          summary.sites +
          summary.settings +
          summary.jobs;
        toast.success("Backup restored", {
          description: `${total} records imported (${summary.tools} tools, ${summary.collections} collections).`,
        });
      } catch (error) {
        toast.error("Import failed", {
          description:
            error instanceof BackupError
              ? error.message
              : "Could not restore from that file.",
        });
      } finally {
        setIsImporting(false);
        // Reset so the same file can be picked again.
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [],
  );

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

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Data &amp; Backup</h3>
          <p className="-mt-1 text-xs text-muted-foreground">
            Your library lives in this browser&apos;s local database. Export a
            backup before clearing site data or switching browsers.
          </p>

          <div className="rounded-lg border">
            <button
              onClick={handleExport}
              disabled={isExporting || isImporting}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted/30 disabled:opacity-50"
            >
              <Download size={18} className="text-muted-foreground" />
              <div>
                <span className="text-foreground">
                  {isExporting ? "Exporting…" : "Export backup"}
                </span>
                <p className="text-xs text-muted-foreground">
                  Download all tools, collections, and sites as JSON.
                </p>
              </div>
            </button>
            <div className="border-t" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isExporting || isImporting}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted/30 disabled:opacity-50"
            >
              <UploadSimple size={18} className="text-muted-foreground" />
              <div>
                <span className="text-foreground">
                  {isImporting ? "Importing…" : "Import backup"}
                </span>
                <p className="text-xs text-muted-foreground">
                  Restore from a VaultWerk backup file. Re-importing is safe.
                </p>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              aria-label="Choose a VaultWerk backup file"
              onChange={(e) => void handleImportFile(e.target.files?.[0])}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Developer API keys</h3>
          <p className="-mt-1 text-xs text-muted-foreground">
            Long-lived keys for the browser extension, CLI, or scripts. They
            act as you — keep them secret.
          </p>

          {freshSecret && (
            <div className="space-y-2 rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
              <p className="text-sm font-medium">
                Copy your key now — it won&apos;t be shown again.
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 truncate rounded bg-muted px-2 py-1.5 font-mono text-xs">
                  {freshSecret}
                </code>
                <button
                  onClick={() => void handleCopySecret(freshSecret)}
                  className="flex items-center gap-1 rounded-md border px-2 py-1.5 text-xs hover:bg-muted/50"
                >
                  <Copy size={14} />
                  Copy
                </button>
              </div>
              <button
                onClick={() => setFreshSecret(null)}
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                I&apos;ve saved it — dismiss
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g. Browser extension"
              maxLength={60}
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              aria-label="New API key name"
            />
            <button
              onClick={() => void handleCreateKey()}
              disabled={isCreatingKey || !newKeyName.trim()}
              className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              <Key size={16} />
              {isCreatingKey ? "Creating…" : "Create key"}
            </button>
          </div>

          <div className="rounded-lg border">
            {apiKeys === null ? (
              <p className="px-4 py-3 text-sm text-muted-foreground">
                Loading keys…
              </p>
            ) : apiKeys.length === 0 ? (
              <p className="px-4 py-3 text-sm text-muted-foreground">
                No API keys yet.
              </p>
            ) : (
              apiKeys.map((key, i) => (
                <div key={key.id}>
                  {i > 0 && <div className="border-t" />}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Key size={18} className="shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">
                        {key.name}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {key.prefix}…
                        {key.lastUsedAt
                          ? ` · used ${new Date(key.lastUsedAt).toLocaleDateString()}`
                          : " · never used"}
                      </p>
                    </div>
                    <button
                      onClick={() => void handleRevokeKey(key.id, key.name)}
                      className="flex shrink-0 items-center gap-1 rounded-md border px-2 py-1.5 text-xs text-destructive hover:bg-destructive/10"
                      aria-label={`Revoke key ${key.name}`}
                    >
                      <Trash size={14} />
                      Revoke
                    </button>
                  </div>
                </div>
              ))
            )}
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
