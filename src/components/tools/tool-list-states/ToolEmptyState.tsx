import { Button } from "../../ui/button";

function ToolEmptyState({
  hasQuery,
  onClearSearch,
}: {
  hasQuery: boolean;
  onClearSearch: () => void;
}) {
  if (hasQuery) {
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center">
        <h3 className="text-base font-medium">No matching tools</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try a different tool name, tag, category, or note.
        </p>
        <Button variant="outline" className="mt-4" onClick={onClearSearch}>
          Clear search
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed p-10 text-center">
      <h3 className="text-base font-medium">Start your tool vault</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Save the tools you want to remember, revisit, and reopen later.
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Add your first tool to begin building your personal developer memory
        system.
      </p>
    </div>
  );
}

export default ToolEmptyState;
