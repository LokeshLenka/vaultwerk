import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { seedDemoLibrary } from "@/lib/services/demo-seed-service";

type SeedToolsButtonProps = {
  onDone?: () => void | Promise<void>;
};

export function SeedToolsButton({ onDone }: SeedToolsButtonProps) {
  const [busy, setBusy] = useState(false);

  const handleSeed = async () => {
    setBusy(true);
    try {
      const summary = await seedDemoLibrary({ includeCollections: true });
      toast.success(
        `Loaded ${summary.toolsInserted} demo tools` +
          (summary.collectionsInserted > 0
            ? ` and ${summary.collectionsInserted} collections`
            : ""),
      );
      await onDone?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not load demo tools",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => void handleSeed()}
      disabled={busy}
    >
      {busy ? "Loading demo…" : "Load demo tools"}
    </Button>
  );
}
