import { Button } from "@/components/ui/button";
import { seedTools } from "./seed-tools";

type SeedToolsButtonProps = {
  onDone?: () => void | Promise<void>;
};

export function SeedToolsButton({ onDone }: SeedToolsButtonProps) {
  const handleSeed = async () => {
    await seedTools({ count: 20, skipDuplicates: true });
    await onDone?.();
  };

  return (
    <Button type="button" variant="outline" onClick={handleSeed}>
      Seed tools
    </Button>
  );
}
