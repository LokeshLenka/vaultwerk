import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCollections } from "@/hooks/use-collections";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UpsertCollectionDialog } from "@/components/collections/UpsertCollectionDialog";
import { DeleteCollectionDialog } from "@/components/collections/DeleteCollectionDialog";
import type { CollectionRecord } from "@/lib/types/collection";
import { Folder, X, Plus, MagnifyingGlassIcon } from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import CollectionEmptyState from "@/components/collections/CollectionEmptyState";
import CollectionCard from "@/components/collections/collection-card/CollectionCard";
import { SeedCollectionsButton } from "@/lib/seeders/collection/seed-collections";
import { useSearchShortcut } from "@/hooks/use-search-shortcut";

export function CollectionsPage() {
  const collections = useCollections() ?? [];
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<CollectionRecord | null>(null);
  const [deleting, setDeleting] = useState<CollectionRecord | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  useSearchShortcut(searchInputRef);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c" && !e.repeat) {
        e.preventDefault();
        setCreateOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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

  const normalizedQuery = query.trim().toLowerCase();

  const handleClearSearch = useCallback(() => setQuery(""), []);

  return (
    <div className="space-y-6">
      {/* Page header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Collections</h2>
          <p className="text-sm text-muted-foreground">
            Group and organise your saved tools.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[360px]">
            <InputGroup>
              <InputGroupAddon>
                <MagnifyingGlassIcon className="size-4" />
              </InputGroupAddon>

              <InputGroupInput
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, tags, categories, or notes..."
                className="pl-9"
                style={{ paddingRight: "0.1rem" }}
              />

              <InputGroupAddon
                align="inline-end"
                className="flex items-center gap-1 pr-2"
              >
                {query ? (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </button>
                ) : null}
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>

      {/* Content */}
      {collections.length === 0 ? (
        // Empty state — no collections yet
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Folder
              size={22}
              weight="duotone"
              className="text-muted-foreground"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">No collections yet</p>
            <p className="text-sm text-muted-foreground">
              Create a collection to start grouping related tools together.
            </p>
          </div>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => setCreateOpen(true)}
          >
            <Plus size={14} weight="bold" />
            Create your first collection
          </Button>
        </div>
      ) : filteredCollections.length === 0 ? (
        <CollectionEmptyState
          hasQuery={!!normalizedQuery}
          query={query}
          onClearSearch={handleClearSearch}
        />
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

      <SeedCollectionsButton />

      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            className="fixed bottom-8 right-8 z-10 size-12 shadow-xl sm:h-12 sm:w-auto sm:px-4"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="size-6" />
            <span className="ml-2 hidden sm:inline">Add collection</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="flex items-center gap-1.5">
          <span>New collection</span>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>C</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
