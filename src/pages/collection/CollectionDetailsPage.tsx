import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ToolRecord } from "@/lib/types/tool";
import {
  addToolToCollection,
  removeToolFromCollection,
} from "@/lib/services/collection-service";

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
      <p className="text-sm text-muted-foreground">Collection not found.</p>
    );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{collection.name}</h1>
        <p className="text-sm text-muted-foreground">
          {collection.description || "No description"}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Tools in collection</h2>
        {selectedTools.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tools added yet.</p>
        ) : (
          <div className="space-y-2">
            {selectedTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between gap-3 rounded-md border p-3"
              >
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-muted-foreground">{tool.domain}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    removeToolFromCollection(collection.id, tool.id)
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Add tools from database</h2>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools by name, domain, or tag"
          />
        </div>

        {availableTools.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No matching tools available.
          </p>
        ) : (
          <div className="space-y-2">
            {availableTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between gap-3 rounded-md border p-3"
              >
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-muted-foreground">{tool.domain}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => addToolToCollection(collection.id, tool.id)}
                >
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
