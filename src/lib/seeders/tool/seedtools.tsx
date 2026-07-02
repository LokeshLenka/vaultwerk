import { Button } from "@/components/ui/button";
import { seedAllData } from "../massive-seed";

type SeedToolsButtonProps = {
  onDone?: () => void | Promise<void>;
};

export function SeedToolsButton({ onDone }: SeedToolsButtonProps) {
  const handleSeed = async () => {
    await seedAllData({ clearExisting: true, skipDuplicates: true });
    await onDone?.();
  };

  return (
    <Button type="button" variant="outline" onClick={handleSeed}>
      Seed tools
    </Button>
  );
}
