import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ToolRecord } from "@/lib/types/tool";
import {
  addToolToCollection,
  removeToolFromCollection,
} from "@/lib/services/collection-service";
import {
  ArrowLeft,
  MagnifyingGlass,
  X,
  Wrench,
  Plus,
  Minus,
} from "@phosphor-icons/react";

export function CollectionDetailsPage() {
  const { id = "" } = useParams();
  const [query, setQuery] = useState("");

  const collection = useLiveQuery(() => db.collections.get(id), [id]);
  const allTools =
    useLiveQuery(() => db.tools.orderBy("createdAt").reverse().toArray(), []) ??
    [];

  const selectedTools = useMemo(() => {
    if (!collection) return [] as ToolRecord[];
    const ids = new Set(collection.toolIds);
    return allTools.filter((tool) => ids.has(tool.id));
  }, [allTools, collection]);

  const availableTools = useMemo(() => {
    if (!collection) return [] as ToolRecord[];
    const ids = new Set(collection.toolIds);
    const q = query.trim().toLowerCase();

    return allTools.filter((tool) => {
      if (ids.has(tool.id)) return false;
      if (!q) return true;
      return [
        tool.name,
        tool.domain,
        tool.description ?? "",
        ...(tool.tags ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [allTools, collection, query]);

  if (collection === undefined) return null;

  if (!collection)
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <p className="text-sm font-medium">Collection not found</p>
        <Button   size="sm" variant="outline">
          <Link to="/dashboard/collections">
            <ArrowLeft size={14} className="mr-1.5" />
            Back to collections
          </Link>
        </Button>
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Breadcrumb + header */}
      <div className="space-y-3">
        <Button
           
          size="sm"
          variant="ghost"
          className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground px-2 h-7"
        >
          <Link to="/dashboard/collections">
            <ArrowLeft size={13} />
            Collections
          </Link>
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <h1 className="text-xl font-semibold leading-tight">
              {collection.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {collection.description || "No description"}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0 mt-0.5">
            {selectedTools.length}{" "}
            {selectedTools.length === 1 ? "tool" : "tools"}
          </Badge>
        </div>
      </div>

      {/* Tools in collection */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Tools in this collection
        </h2>

        {selectedTools.length === 0 ? (
          <div className="rounded-lg border border-dashed px-6 py-10 text-center">
            <div className="flex justify-center mb-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                <Wrench size={18} weight="duotone" className="text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm font-medium">No tools added yet</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Add tools from the database below.
            </p>
          </div>
        ) : (
          <div className="divide-y rounded-lg border overflow-hidden">
            {selectedTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-card hover:bg-muted/40 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{tool.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {tool.domain}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs h-7"
                  onClick={() =>
                    removeToolFromCollection(collection.id, tool.id)
                  }
                >
                  <Minus size={12} weight="bold" />
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add tools */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Add from database
        </h2>

        <div className="relative max-w-sm">
          <MagnifyingGlass
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, domain, or tag…"
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

        {availableTools.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">
            {query ? `No tools match "${query}".` : "All tools are already in this collection."}
          </p>
        ) : (
          <div className="divide-y rounded-lg border overflow-hidden">
            {availableTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-card hover:bg-muted/40 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{tool.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {tool.domain}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0 gap-1.5 text-xs h-7 hover:bg-primary/10"
                  onClick={() => addToolToCollection(collection.id, tool.id)}
                >
                  <Plus size={12} weight="bold" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
