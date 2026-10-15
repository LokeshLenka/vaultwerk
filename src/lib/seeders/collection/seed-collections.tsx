import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SpinnerIcon } from "@phosphor-icons/react";
import { seedDemoLibrary } from "@/lib/services/demo-seed-service";

type SeedCollectionsButtonProps = {
  onDone?: () => void | Promise<void>;
};

export function SeedCollectionsButton({ onDone }: SeedCollectionsButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSeed = async () => {
    try {
      setIsLoading(true);
      const summary = await seedDemoLibrary({ includeCollections: true });
      toast.success(
        `Loaded ${summary.collectionsInserted} demo collections`,
      );
      await onDone?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not load demo data",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => void handleSeed()}
      disabled={isLoading}
      className="rounded-none"
    >
      {isLoading ? <SpinnerIcon className="mr-2 size-4 animate-spin" /> : null}
      Load demo collections
    </Button>
  );
}
