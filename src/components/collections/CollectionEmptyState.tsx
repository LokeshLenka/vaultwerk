import { Kbd } from "@/components/ui/kbd";
import { Button } from "../ui/button";

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
      <h3 className="text-base font-medium">No tools saved yet</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        Save websites, libraries, frameworks, and tools you want to find again.
      </p>

      <div className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <span>Add a tool:</span>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>Shift</Kbd>
        <span>+</span>
        <Kbd>A</Kbd>
      </div>
    </div>
  );
}

export default CollectionEmptyState;
