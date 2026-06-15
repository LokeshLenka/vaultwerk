// ToolLibrary.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MagnifyingGlassIcon, X } from "@phosphor-icons/react";
import { listTools, markToolUsed } from "@/lib/services/tool-service";
import type { ToolRecord } from "@/lib/types/tool";
import { SeedToolsButton } from "@/lib/seeders/tool/seedtools";
import ToolSheet from "./tool-sheet/ToolSheet";
import ToolListSkeleton from "./tool-list-states/ToolListSkeleton";
import ToolEmptyState from "./tool-list-states/ToolEmptyState";
import ToolVaultCard from "./tool-card/ToolCard";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Kbd } from "../ui/kbd";

export default function ToolLibrary() {
  const [tools, setTools] = useState<ToolRecord[] | null>(null);
  const [query, setQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState<ToolRecord | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const loadTools = useCallback(async () => {
    const rows = await listTools();
    setTools(rows);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const rows = await listTools();
      if (mounted) setTools(rows);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.ctrlKey || e.metaKey;
      if (!isModifier) return;

      const key = e.key.toLowerCase();

      if (key === "a" && e.shiftKey) {
        e.preventDefault();
        setSelectedTool(null);
        setSheetOpen(true);
        return;
      }

      if (key === "k" && !e.shiftKey) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTools = useMemo(() => {
    if (!tools) return [];
    if (!normalizedQuery) return tools;
    return tools.filter((tool) => {
      const haystack = [
        tool.name,
        tool.domain,
        tool.category,
        tool.description,
        tool.notes,
        ...(tool.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [tools, normalizedQuery]);

  const favoriteCount = useMemo(
    () => tools?.filter((t) => t.isFavorite).length ?? 0,
    [tools],
  );

  const handleEdit = useCallback((tool: ToolRecord) => {
    setSelectedTool(tool);
    setSheetOpen(true);
  }, []);

  const handleOpen = useCallback(async (tool: ToolRecord) => {
    await markToolUsed(tool.id);
  }, []);

  const handleClearSearch = useCallback(() => setQuery(""), []);

  const handleSheetChange = useCallback((open: boolean) => {
    setSheetOpen(open);
    if (!open) setSelectedTool(null);
  }, []);

  const handleSuccess = useCallback(async () => {
    setSheetOpen(false);
    setSelectedTool(null);
    await loadTools();
  }, [loadTools]);

  if (!tools) return <ToolListSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Tool library</h2>
          <p className="text-sm text-muted-foreground">
            A personal vault of tools worth remembering and reopening.
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

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{tools.length} saved</span>
        <span> - </span>
        <span>{favoriteCount} favorites</span>
      </div>

      {filteredTools.length === 0 ? (
        <ToolEmptyState
          query={query}
          hasQuery={!!normalizedQuery}
          onClearSearch={handleClearSearch}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolVaultCard
              key={tool.id}
              tool={tool}
              onEdit={handleEdit}
              onOpen={handleOpen}
            />
          ))}
        </div>
      )}

      <ToolSheet
        open={sheetOpen}
        onOpenChange={handleSheetChange}
        tool={selectedTool}
        onSuccess={handleSuccess}
      />

      <SeedToolsButton onDone={loadTools} />
    </div>
  );
}
