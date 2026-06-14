import { useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ToolRecord } from "@/lib/types/tool";
import { addToolToCollection } from "@/lib/services/collection-service";

interface ToolCollectionSelectorProps {
  collectionId: string;
  selectedToolIds: string[];
}

export function ToolCollectionSelector({
  collectionId,
  selectedToolIds,
}: ToolCollectionSelectorProps) {
  const [query, setQuery] = useState("");
  const tools =
    useLiveQuery(() => db.tools.orderBy("createdAt").reverse().toArray(), []) ??
    [];

  const items = useMemo(() => {
    const selected = new Set(selectedToolIds);
    const q = query.trim().toLowerCase();

    return tools.filter((tool: ToolRecord) => {
      if (selected.has(tool.id)) return false;
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
  }, [tools, selectedToolIds, query]);

  return (
    <div className="space-y-3">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools from database"
      />

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No tools available.</p>
      ) : (
        <div className="space-y-2">
          {items.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p className="font-medium">{tool.name}</p>
                <p className="text-sm text-muted-foreground">{tool.domain}</p>
              </div>
              <Button
                size="sm"
                onClick={() => addToolToCollection(collectionId, tool.id)}
              >
                Add
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
