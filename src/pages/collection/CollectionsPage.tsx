import { useMemo, useState } from "react";
import { useCollections } from "@/hooks/use-collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { UpsertCollectionDialog } from "@/components/collections/UpsertCollectionDialog";
import { DeleteCollectionDialog } from "@/components/collections/DeleteCollectionDialog";
import type { CollectionRecord } from "@/lib/types/collection";
import { Folder, MagnifyingGlass, X, Plus } from "@phosphor-icons/react";

export function CollectionsPage() {
  const collections = useCollections() ?? [];
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<CollectionRecord | null>(null);
  const [deleting, setDeleting] = useState<CollectionRecord | null>(null);

  const filteredCollections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return collections;
    return collections.filter((collection) =>
      [collection.name, collection.description ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [collections, query]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold leading-tight">Collections</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Group and organise your saved tools.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 shrink-0" onClick={() => setCreateOpen(true)}>
          <Plus size={14} weight="bold" />
          New collection
        </Button>
      </div>

      

      {/* Search */}
      {collections.length > 0 && (
        <div className="relative max-w-sm">
          <MagnifyingGlass
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search collections…"
            className="pl-8 pr-8"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* Content */}
      {collections.length === 0 ? (
        // Empty state — no collections yet
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Folder size={22} weight="duotone" className="text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">No collections yet</p>
            <p className="text-sm text-muted-foreground max-w-[28ch]">
              Create a collection to start grouping related tools together.
            </p>
          </div>
          <Button size="sm" className="gap-1.5" onClick={() => setCreateOpen(true)}>
            <Plus size={14} weight="bold" />
            Create your first collection
          </Button>
        </div>
      ) : filteredCollections.length === 0 ? (
        // Empty state — search returned nothing
        <div className="rounded-lg border border-dashed px-6 py-10 text-center">
          <p className="text-sm font-medium">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try a different name or description.
          </p>
          <button
            onClick={() => setQuery("")}
            className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onEdit={setEditing}
              onDelete={setDeleting}
            />
          ))}
        </div>
      )}

      <UpsertCollectionDialog open={createOpen} onOpenChange={setCreateOpen} />
      <UpsertCollectionDialog
        open={Boolean(editing)}
        onOpenChange={(open) => !open && setEditing(null)}
        collection={editing}
      />
      <DeleteCollectionDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        collection={deleting}
      />
    </div>
  );
}
