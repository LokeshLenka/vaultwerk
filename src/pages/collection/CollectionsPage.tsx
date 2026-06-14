import { useMemo, useState } from "react";
import { useCollections } from "@/hooks/use-collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { UpsertCollectionDialog } from "@/components/collections/UpsertCollectionDialog";
import { DeleteCollectionDialog } from "@/components/collections/DeleteCollectionDialog";
import type { CollectionRecord } from "@/lib/types/collection";

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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Collections</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage tool collections.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>Create collection</Button>
      </div>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search collections"
        className="max-w-md"
      />

      {filteredCollections.length === 0 ? (
        <div className="rounded-md border p-6 text-sm text-muted-foreground">
          No collections found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
