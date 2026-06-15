import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  Stack,
  Toolbox,
  Trash,
} from "@phosphor-icons/react";

function formatRelativeDate(value?: string | null) {
  if (!value) return "Saved recently";

  const diffDays = Math.floor(
    (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24),
  );

  if (Number.isNaN(diffDays)) return "Saved recently";
  if (diffDays <= 0) return "Saved today";
  if (diffDays === 1) return "Saved yesterday";
  if (diffDays < 7) return `Saved ${diffDays} days ago`;
  if (diffDays < 30) {
    const w = Math.floor(diffDays / 7);
    return `Saved ${w} week${w > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 365) {
    const m = Math.floor(diffDays / 30);
    return `Saved ${m} month${m > 1 ? "s" : ""} ago`;
  }

  const y = Math.floor(diffDays / 365);
  return `Saved ${y} year${y > 1 ? "s" : ""} ago`;
}

export function CollectionDetailsPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [editingField, setEditingField] = useState<
    "name" | "description" | null
  >(null);
  const [nameDraft, setNameDraft] = useState("");
  const [descriptionDraft, setDescriptionDraft] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement | null>(null);

  const collection = useLiveQuery(() => db.collections.get(id), [id]);
  const allTools =
    useLiveQuery(() => db.tools.orderBy("createdAt").reverse().toArray(), []) ??
    [];

  useEffect(() => {
    if (!collection) return;
    if (editingField === null) {
      setNameDraft(collection.name);
      setDescriptionDraft(collection.description ?? "");
    }
  }, [collection, editingField]);

  useEffect(() => {
    if (editingField === "name") {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
    if (editingField === "description") {
      descriptionInputRef.current?.focus();
      descriptionInputRef.current?.select();
    }
  }, [editingField]);

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

  const hasAnyToolsInDatabase = allTools.length > 0;
  const hasSearchQuery = query.trim().length > 0;
  const allToolsAlreadyAdded =
    hasAnyToolsInDatabase && availableTools.length === 0 && !hasSearchQuery;
  const noSearchMatches =
    hasAnyToolsInDatabase && availableTools.length === 0 && hasSearchQuery;

  const saveField = async (field: "name" | "description") => {
    if (!collection) return;

    if (field === "name") {
      const trimmed = nameDraft.trim();
      const nextName = trimmed || collection.name;

      if (nextName !== collection.name) {
        await db.collections.update(collection.id, {
          name: nextName,
          updatedAt: new Date().toISOString(),
        });
      } else {
        setNameDraft(collection.name);
      }
    }

    if (field === "description") {
      const trimmed = descriptionDraft.trim();
      const nextDescription = trimmed || null;

      if (nextDescription !== (collection.description ?? null)) {
        await db.collections.update(collection.id, {
          description: nextDescription,
          updatedAt: new Date().toISOString(),
        });
      } else {
        setDescriptionDraft(collection.description ?? "");
      }
    }

    setEditingField((current) => (current === field ? null : current));
  };

  const cancelField = (field: "name" | "description") => {
    if (!collection) return;

    if (field === "name") {
      setNameDraft(collection.name);
    } else {
      setDescriptionDraft(collection.description ?? "");
    }

    setEditingField((current) => (current === field ? null : current));
  };

  const handleDeleteCollection = async () => {
    if (!collection) return;

    try {
      setIsDeleting(true);
      await db.collections.delete(collection.id);
      navigate("/dashboard/collections");
    } finally {
      setIsDeleting(false);
    }
  };

  if (collection === undefined) return null;

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex size-12 items-center justify-center border bg-muted/30">
          <Stack size={20} className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Collection not found</p>
          <p className="text-sm text-muted-foreground">
            This collection may have been removed.
          </p>
        </div>
        <Button size="sm" variant="outline" className="rounded-none">
          <Link to="/dashboard/collections">
            <ArrowLeft size={14} className="mr-1.5" />
            Back to collections
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b pb-6">
        <Button
          size="sm"
          variant="ghost"
          className="-ml-2 h-8 rounded-none px-2 text-muted-foreground hover:text-foreground"
        >
          <Link
            to="/dashboard/collections"
            className="inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <ArrowLeft size={13} className="shrink-0" />
            <span>Collections</span>
          </Link>
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            {editingField === "name" ? (
              <Input
                ref={nameInputRef}
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onBlur={() => void saveField("name")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }

                  if (e.key === "Escape") {
                    e.preventDefault();
                    cancelField("name");
                    e.currentTarget.blur();
                  }
                }}
                className="h-11 rounded-none text-2xl font-semibold tracking-tight"
                aria-label="Collection name"
              />
            ) : (
              <h1
                className="cursor-text text-2xl font-semibold tracking-tight hover:text-foreground/80"
                onDoubleClick={() => setEditingField("name")}
                title="Double-click to edit"
              >
                {collection.name}
              </h1>
            )}

            {editingField === "description" ? (
              <Textarea
                ref={descriptionInputRef}
                value={descriptionDraft}
                onChange={(e) => setDescriptionDraft(e.target.value)}
                onBlur={() => void saveField("description")}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }

                  if (e.key === "Escape") {
                    e.preventDefault();
                    cancelField("description");
                    e.currentTarget.blur();
                  }
                }}
                rows={2}
                className="resize-none rounded-none text-sm leading-6"
                aria-label="Collection description"
              />
            ) : (
              <p
                className="cursor-text text-sm leading-6 text-muted-foreground hover:text-foreground/80"
                onDoubleClick={() => setEditingField("description")}
                title="Double-click to edit"
              >
                {collection.description || "No description added."}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Double-click name or description to edit.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Badge variant="secondary" className="mt-1 shrink-0 rounded-none">
              {selectedTools.length}{" "}
              {selectedTools.length === 1 ? "tool" : "tools"}
            </Badge>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-none px-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash size={14} className="mr-1.5" />
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="rounded-none">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete collection?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove{" "}
                    <strong>{collection.name}</strong>. The tools themselves
                    will remain in your library.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-none">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => void handleDeleteCollection()}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete collection"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Created {formatRelativeDate(collection.createdAt)}
        </p>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Tools in this collection
          </h2>
          {selectedTools.length > 0 ? (
            <p className="text-xs text-muted-foreground">
              Remove tools here anytime.
            </p>
          ) : null}
        </div>

        {selectedTools.length === 0 ? (
          <div className="border border-dashed bg-muted/20 px-6 py-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex size-12 items-center justify-center border bg-background">
                <Wrench size={18} className="text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm font-medium">
              No tools in this collection yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add tools from your library below to start organizing this
              collection.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden border bg-background">
            <div className="divide-y">
              {selectedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/30"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">
                        {tool.name}
                      </p>
                      {tool.category ? (
                        <Badge
                          variant="secondary"
                          className="hidden rounded-none text-[11px] sm:inline-flex"
                        >
                          {tool.category}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {tool.domain || "Unknown domain"}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 shrink-0 rounded-none px-2 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() =>
                      removeToolFromCollection(collection.id, tool.id)
                    }
                  >
                    <Minus size={12} className="mr-1.5" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Add from database
          </h2>
          <p className="text-sm text-muted-foreground">
            Search existing tools and attach them to this collection.
          </p>
        </div>

        <div className="relative max-w-md">
          <MagnifyingGlass
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, domain, or tag..."
            className="rounded-none pl-9 pr-9"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>

        {!hasAnyToolsInDatabase ? (
          <div className="border border-dashed bg-muted/20 px-6 py-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex size-12 items-center justify-center border bg-background">
                <Toolbox size={18} className="text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm font-medium">No tools in your database yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add tools to your library first, then attach them to this
              collection.
            </p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="rounded-none">
                <Link to="/dashboard/library">Go to library</Link>
              </Button>
            </div>
          </div>
        ) : noSearchMatches ? (
          <div className="border border-dashed bg-muted/20 px-6 py-10 text-center">
            <p className="text-sm font-medium">No matching tools found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different name, domain, or tag for “{query}”.
            </p>
          </div>
        ) : allToolsAlreadyAdded ? (
          <div className="border border-dashed bg-muted/20 px-6 py-10 text-center">
            <p className="text-sm font-medium">
              All available tools are already added
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              This collection already contains every tool in your library.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden border bg-background">
            <div className="divide-y">
              {availableTools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/30"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">
                        {tool.name}
                      </p>
                      {tool.category ? (
                        <Badge
                          variant="secondary"
                          className="hidden rounded-none text-[11px] sm:inline-flex"
                        >
                          {tool.category}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {tool.domain || "Unknown domain"}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 shrink-0 rounded-none px-2 text-xs hover:bg-muted"
                    onClick={() => addToolToCollection(collection.id, tool.id)}
                  >
                    <Plus size={12} className="mr-1.5" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
