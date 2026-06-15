import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SpinnerIcon } from "@phosphor-icons/react";
import { seedCollections } from "./seed-collection";

type SeedCollectionsButtonProps = {
  onDone?: () => void | Promise<void>;
};

export function SeedCollectionsButton({ onDone }: SeedCollectionsButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSeed = async () => {
    try {
      setIsLoading(true);
      await seedCollections({ count: 8, skipDuplicates: true });
      await onDone?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleSeed}
      disabled={isLoading}
      className="rounded-none"
    >
      {isLoading ? <SpinnerIcon className="mr-2 size-4 animate-spin" /> : null}
      Seed collections
    </Button>
  );
}

