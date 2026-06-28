import { useEffect, useMemo, useRef } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  WarningCircle,
  ArrowClockwise,
  ArrowSquareOut,
  X,
} from "@phosphor-icons/react";
import { detectBrowser, getBrowserInstructions, getBrowserLabel } from "@/lib/browser-detection";
import type { WorkspaceResult } from "@/hooks/use-workspace";

interface Props {
  open: boolean;
  result: WorkspaceResult | null;
  onRetry: () => void;
  onOpenIndividually: () => void;
  onCancel: () => void;
}

export default function WorkspaceBlockedDialog({
  open,
  result,
  onRetry,
  onOpenIndividually,
  onCancel,
}: Props) {
  const retryRef = useRef<HTMLButtonElement>(null);

  const browser = useMemo(() => detectBrowser(), []);
  const instructions = useMemo(() => getBrowserInstructions(browser), [browser]);
  const browserLabel = useMemo(() => getBrowserLabel(browser), [browser]);

  useEffect(() => {
    if (open) {
      setTimeout(() => retryRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!result) return null;

  const blockedFirst = result.blocked.slice(0, 5);
  const remaining = result.blocked.length - 5;

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) onCancel(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-amber-500/10">
                <WarningCircle
                  size="100%"
                  weight="fill"
                  className="size-6 text-amber-500"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Browser blocked Workspace
                </h2>
                <p className="text-sm text-muted-foreground">
                  {browserLabel} prevented this website from opening multiple tabs.
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="mb-2 text-xs font-medium text-foreground">
              To enable Workspace Mode:
            </p>
            <ol className="space-y-1.5">
              {instructions.steps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3.5 py-2.5">
            <WarningCircle size={16} className="shrink-0 text-amber-500" />
            <span className="text-xs text-muted-foreground">
              {result.blocked.length} tab{result.blocked.length !== 1 ? "s" : ""} blocked
              {result.opened.length > 0
                ? `, ${result.opened.length} opened`
                : ""}
            </span>
          </div>

          {blockedFirst.length > 0 ? (
            <div className="-my-1 space-y-1">
              {blockedFirst.map((tool, i) => (
                <p
                  key={i}
                  className="truncate text-sm text-muted-foreground"
                >
                  <span className="mr-2 text-amber-500">&oplus;</span>
                  {tool.name}
                </p>
              ))}
              {remaining > 0 ? (
                <p className="text-sm text-muted-foreground">
                  ...and {remaining} more
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="outline" size="sm" onClick={onOpenIndividually}>
              <ArrowSquareOut size={14} className="mr-1" />
              Open Individually
            </Button>
            <Button size="sm" onClick={onRetry} ref={retryRef}>
              <ArrowClockwise size={14} className="mr-1" />
              Retry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
