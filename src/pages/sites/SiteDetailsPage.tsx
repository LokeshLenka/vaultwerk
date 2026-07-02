import { useCallback, useMemo, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DotsThreeVertical,
  GlobeHemisphereWest,
  ArrowLeft,
  ArrowSquareOut,
  Star,
  Copy,
  Trash,
  NotePencil,
  MagnifyingGlassIcon,
  X,
} from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSearchShortcut } from "@/hooks/use-search-shortcut";
import { getAutoLabel } from "@/lib/helpers/auto-label";
import { deleteTool, toggleFavoriteTool } from "@/lib/services/tool-service";
import { useWorkspace } from "@/hooks/use-workspace";
import WorkspaceFlow from "@/components/workspace/WorkspaceFlow";
import { toast } from "sonner";

function formatFirstLine(text: string, max = 80): string {
  const firstLine = text.split("\n")[0];
  return firstLine.length > max ? firstLine.slice(0, max) + "..." : firstLine;
}

function formatLastUsed(value?: string | null) {
  if (!value) return null;
  const diffDays = Math.floor(
    (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (Number.isNaN(diffDays)) return null;
  if (diffDays <= 0) return "Opened today";
  if (diffDays === 1) return "Opened yesterday";
  if (diffDays < 7) return `Opened ${diffDays} days ago`;
  if (diffDays < 30) {
    const w = Math.floor(diffDays / 7);
    return `Opened ${w} week${w > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 365) {
    const m = Math.floor(diffDays / 30);
    return `Opened ${m} month${m > 1 ? "s" : ""} ago`;
  }
  const y = Math.floor(diffDays / 365);
  return `Opened ${y} year${y > 1 ? "s" : ""} ago`;
}

function getPathFromUrl(url: string): string {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}

const labelColors: Record<string, string> = {
  Homepage: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Documentation: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Tool: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Page: "bg-muted text-muted-foreground",
};

export default function SiteDetailsPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const workspace = useWorkspace();
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteTool, setConfirmDeleteTool] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  useSearchShortcut(searchInputRef);

  const site = useLiveQuery(() => db.sites.get(id), [id]);
  const allTools =
    useLiveQuery(
      () => (id ? db.tools.where("siteId").equals(id).toArray() : []),
      [id],
    ) ?? [];

  const tools = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = !q
      ? allTools
      : allTools.filter((tool) =>
          [tool.name, tool.url, tool.description ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(q),
        );
    return [...filtered].sort((a) =>
      getAutoLabel(a.url) === "Homepage" ? -1 : 0,
    );
  }, [allTools, query]);

  const handleOpen = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  const handleOpenWorkspace = useCallback(() => {
    if (!site) return;
    const tools = allTools
      .filter((t) => t.url)
      .map((t) => ({ name: t.name, url: t.url! }));
    workspace.launch(tools);
  }, [site, allTools, workspace]);

  const handleCopyUrl = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore clipboard errors */
    }
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!confirmDeleteTool) return;
    setDeletingId(confirmDeleteTool.id);
    try {
      await deleteTool(confirmDeleteTool.id);
      toast.success("Tool deleted");
      setConfirmDeleteTool(null);
      if (allTools.length <= 1) {
        navigate("/dashboard/sites");
      }
    } finally {
      setDeletingId(null);
    }
  }, [confirmDeleteTool, allTools.length, navigate]);

  const handleToggleFavorite = useCallback(async (toolId: string) => {
    await toggleFavoriteTool(toolId);
  }, []);

  if (site === undefined) return null;

  if (!site) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex size-12 items-center justify-center border bg-muted/30">
          <GlobeHemisphereWest size={20} className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Site not found</p>
          <p className="text-sm text-muted-foreground">
            This site may have been removed.
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          render={<Link to="/dashboard/sites" />}
        >
          <ArrowLeft size={14} className="mr-1.5" />
          Back to sites
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b pb-6">
        <Link
          to="/dashboard/sites"
          className="-ml-2 inline-flex h-8 items-center gap-1.5 rounded-none px-2 text-sm text-muted-foreground hover:text-foreground whitespace-nowrap"
        >
          <ArrowLeft size={13} className="shrink-0" />
          <span>Sites</span>
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center overflow-hidden rounded-lg border bg-muted/40">
              {site.faviconUrl ? (
                <img src={site.faviconUrl} alt="" className="size-7" />
              ) : (
                <GlobeHemisphereWest className="size-6 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                {site.displayName}
              </h1>
              <p className="text-sm text-muted-foreground">
                {site.toolCount} {site.toolCount === 1 ? "tool" : "tools"}
                {allTools.length > 0 && " on this site"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {allTools.length > 0 ? (
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:bg-muted hover:text-foreground"
                    onClick={handleOpenWorkspace}
                    aria-label={`Open all ${allTools.length} tools in workspace`}
                  >
                    <ArrowSquareOut size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Open all {allTools.length} tool
                  {allTools.length !== 1 ? "s" : ""}
                </TooltipContent>
              </Tooltip>
            ) : null}
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="relative max-w-md">
          <InputGroup>
            <InputGroupAddon>
              <MagnifyingGlassIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              ref={searchInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools on this site..."
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
                  onClick={() => setQuery("")}
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

        {tools.length === 0 && query ? (
          <div className="border border-dashed bg-muted/20 px-6 py-10 text-center">
            <p className="text-sm font-medium">No matching tools found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different name, URL, or description.
            </p>
          </div>
        ) : tools.length === 0 ? (
          <div className="border border-dashed bg-muted/20 px-6 py-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex size-12 items-center justify-center border bg-background">
                <GlobeHemisphereWest
                  size={18}
                  className="text-muted-foreground"
                />
              </div>
            </div>
            <p className="text-sm font-medium">No tools on this site yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tools will appear here automatically when you save them.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => {
              const label = getAutoLabel(tool.url);
              const path = getPathFromUrl(tool.url);
              const lastUsed = formatLastUsed(tool.lastUsedAt);
              return (
                <div
                  key={tool.id}
                  className="group relative rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-start gap-2.5">
                      {/* <div className="flex size-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border bg-muted/40"
                        onClick={() => handleOpen(tool.url)}
                      >
                        {tool.faviconUrl ? (
                          <img src={tool.faviconUrl} alt="" className="size-5" />
                        ) : (
                          <GlobeHemisphereWest className="size-4 text-muted-foreground" />
                        )}
                      </div> */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="truncate text-sm font-medium underline-offset-2 hover:underline"
                            onClick={() => handleOpen(tool.url)}
                            title={`Open ${tool.name}`}
                          >
                            {tool.name}
                          </button>
                          <Badge
                            variant="secondary"
                            className={`shrink-0 rounded-none text-[10px] font-normal ${labelColors[label]}`}
                          >
                            {label}
                          </Badge>
                        </div>

                        <p className="truncate text-xs text-muted-foreground/60 font-mono">
                          {path}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-muted-foreground/50 hover:bg-amber-500/10 hover:text-amber-500"
                            onClick={() => handleToggleFavorite(tool.id)}
                            aria-label={
                              tool.isFavorite
                                ? `Remove ${tool.name} from favorites`
                                : `Add ${tool.name} to favorites`
                            }
                          >
                            {tool.isFavorite ? (
                              <Star
                                size={14}
                                weight="fill"
                                className="text-amber-500"
                              />
                            ) : (
                              <Star size={14} />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {tool.isFavorite ? "Unfavorite" : "Favorite"}
                        </TooltipContent>
                      </Tooltip>

                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-muted-foreground/50 hover:bg-muted hover:text-foreground"
                            aria-label={`Actions for ${tool.name}`}
                          >
                            <DotsThreeVertical size={16} weight="bold" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={4}>
                          <DropdownMenuItem
                            onClick={() => handleOpen(tool.url)}
                          >
                            <ArrowSquareOut size={16} />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleCopyUrl(tool.url)}
                          >
                            <Copy size={16} />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() =>
                              setConfirmDeleteTool({
                                id: tool.id,
                                name: tool.name,
                              })
                            }
                          >
                            <Trash size={16} />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {tool.description ? (
                    <p className="mt-2 line-clamp-1 text-xs text-muted-foreground/70">
                      {formatFirstLine(tool.description)}
                    </p>
                  ) : null}

                  {tool.notes ? (
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground/50 flex items-center gap-1">
                      <NotePencil size={11} />
                      {tool.notes}
                    </p>
                  ) : null}

                  {lastUsed ? (
                    <p className="mt-2 text-[11px] text-muted-foreground/40">
                      {lastUsed}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <AlertDialog
        open={!!confirmDeleteTool}
        onOpenChange={(open) => !open && setConfirmDeleteTool(null)}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this tool?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              <strong className="text-foreground">
                {confirmDeleteTool?.name ?? "this tool"}
              </strong>{" "}
              from your VaultWerk library. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deletingId === confirmDeleteTool?.id}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingId === confirmDeleteTool?.id
                ? "Deleting..."
                : "Delete tool"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <WorkspaceFlow
        state={workspace.state}
        result={workspace.result}
        onContinue={workspace.continue}
        onRetry={workspace.retry}
        onOpenIndividually={workspace.openIndividually}
        onCancel={workspace.cancel}
      />
    </div>
  );
}
