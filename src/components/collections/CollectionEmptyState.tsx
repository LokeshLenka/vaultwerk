import { Kbd } from "@/components/ui/kbd";
import { Button } from "../ui/button";
import BlurText from "../BlurText";

function CollectionEmptyState({
  query,
  hasQuery,
  onClearSearch,
}: {
  query: string;
  hasQuery: boolean;
  onClearSearch: () => void;
}) {
  if (hasQuery) {
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center">
        <h3 className="text-base font-medium">
          No results for &ldquo;{query}&rdquo;
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try a different name or description.
        </p>
        <Button variant="outline" className="mt-4" onClick={onClearSearch}>
          Clear search
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed p-10 text-center">
      <BlurText
        text="No collections yet"
        delay={120}
        animateBy="words"
        className="justify-center text-base font-medium"
      />

      <p className="mt-2 text-sm text-muted-foreground">
        Group tools into stacks you can open, share, and rediscover together.
      </p>

      <div className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <span>New collection:</span>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>Shift</Kbd>
        <span>+</span>
        <Kbd>C</Kbd>
      </div>
    </div>
  );
}

export default CollectionEmptyState;
