import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  RocketLaunch,
  ShieldCheck,
  CheckCircle,
  X,
} from "@phosphor-icons/react";

interface Props {
  open: boolean;
  onContinue: () => void;
  onCancel: () => void;
}

export default function WorkspaceOnboardingModal({
  open,
  onContinue,
  onCancel,
}: Props) {
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => continueRef.current?.focus(), 100);
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

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) onCancel(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-lg">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <RocketLaunch size="100%" weight="fill" className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Enable Workspace Mode
                </h2>
                <p className="text-sm text-muted-foreground">
                  Launch all your tools in separate browser tabs instantly.
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

          <p className="text-sm leading-relaxed text-muted-foreground">
            Opening multiple tabs requires your browser's permission. This is a
            one-time setup for this website. After permission is granted, your
            workspaces will launch with one click.
          </p>

          <div className="grid gap-2">
            {[
              "Opens all selected tools automatically",
              "Only works after you click Open Workspace",
              "We never open tabs without your permission",
              "This setting is controlled by your browser",
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3.5 py-2.5 text-sm"
              >
                <CheckCircle
                  size={16}
                  weight="fill"
                  className="shrink-0 text-emerald-500"
                />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3.5 py-2.5 text-xs text-muted-foreground">
            <ShieldCheck size={16} weight="fill" className="text-emerald-500" />
            <span className="font-medium text-foreground">Secure</span>
            <span aria-hidden="true" className="text-muted-foreground/40">&middot;</span>
            Only this website can request workspace launches.
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={onContinue} ref={continueRef}>
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
