import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { useSearchShortcut } from "@/hooks/use-search-shortcut";
import {
  GlobeHemisphereWest,
  MagnifyingGlassIcon,
  X,
  ArrowRight,
} from "@phosphor-icons/react";

function formatRelativeDate(value?: string | null) {
  if (!value) return "";
  const diffDays = Math.floor(
    (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (Number.isNaN(diffDays)) return "";
  if (diffDays <= 0) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  if (diffDays < 30) {
    const w = Math.floor(diffDays / 7);
    return `Updated ${w} week${w > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 365) {
    const m = Math.floor(diffDays / 30);
    return `Updated ${m} month${m > 1 ? "s" : ""} ago`;
  }
  const y = Math.floor(diffDays / 365);
  return `Updated ${y} year${y > 1 ? "s" : ""} ago`;
}

export default function SitesPage() {
  const sites = useLiveQuery(() => db.sites.orderBy("updatedAt").reverse().toArray(), []) ?? [];
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  useSearchShortcut(searchInputRef);

  const filteredSites = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sites;
    return sites.filter((site) =>
      site.domain.toLowerCase().includes(q) ||
      site.displayName.toLowerCase().includes(q),
    );
  }, [sites, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Sites</h2>
          <p className="text-sm text-muted-foreground">
            Automatically grouped websites from your saved tools.
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
                placeholder="Search sites by domain..."
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
        </div>
      </div>

      {sites.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <GlobeHemisphereWest
              size={22}
              weight="duotone"
              className="text-muted-foreground"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">No grouped websites yet</p>
            <p className="text-sm text-muted-foreground">
              Saving multiple tools from the same website automatically creates a Site.
            </p>
          </div>
          <Button size="sm" variant="outline" render={<Link to="/dashboard/library" />}>
            Go to library
          </Button>
        </div>
      ) : filteredSites.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
          <p className="text-sm font-medium">No sites match &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted-foreground">
            Try a different domain name.
          </p>
          <Button size="sm" variant="ghost" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredSites.map((site) => (
            <Link
              key={site.id}
              to={`/dashboard/sites/${site.id}`}
              className="group rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted/40">
                    {site.faviconUrl ? (
                      <img
                        src={site.faviconUrl}
                        alt=""
                        className="size-6"
                      />
                    ) : (
                      <GlobeHemisphereWest className="size-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {site.displayName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {site.toolCount} {site.toolCount === 1 ? "tool" : "tools"}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="mt-2 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {formatRelativeDate(site.updatedAt)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
