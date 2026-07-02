import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Save tools in seconds",
    description:
      "Add any developer tool URL — VaultWerk auto-extracts the name, domain, favicon, and metadata. No tedious manual entry.",
  },
  {
    title: "Organize with categories & tags",
    description:
      "Classify tools into categories (AI, frontend, database, devops) and attach tags for granular filtering and search.",
  },
  {
    title: "Build curated collections",
    description:
      "Group tools into collections for specific stacks, projects, or workflows. Share them with your team.",
  },
  {
    title: "Batch open tools",
    description:
      "Open every tool in a collection at once with the workspace launcher. Popup detection and browser-specific instructions included.",
  },
  {
    title: "Rediscover forgotten tools",
    description:
      "Use search, site groupings, and recency filters to find tools you haven't touched in months.",
  },
  {
    title: "Local-first & private",
    description:
      "All data lives in your browser's IndexedDB. No accounts, no servers, no data leaks.",
  },
];

export function OverviewSection() {
  return (
    <div className="space-y-10">
      <div>
        <Badge variant="outline" className="mb-3 border-blue-500 text-blue-500">
          v0.0.1 &mdash; MVP
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          VaultWerk Documentation
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          The developer memory system for tools. Save, organize, search, and
          rediscover developer tools before they disappear into the browser
          bookmark graveyard.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">The Problem</h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Every developer has done this: discover a useful tool, save it as a
          browser bookmark, forget it exists, then search Google for the exact
          same tool two weeks later. Browser bookmarks were never designed for
          modern developer workflows.
        </p>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          VaultWerk treats your tool stack like source code &mdash; versioned,
          organized, searchable, and always at your fingertips.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              <h3 className="text-sm font-medium">{f.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Quick Start</h2>
        <div className="space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <p>
            <strong>1.</strong> Open the{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">Library</strong>{" "}
            page from the dashboard sidebar.
          </p>
          <p>
            <strong>2.</strong> Click the <strong>+ Add Tool</strong> button (or
            press <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">
              Ctrl+Shift+A
            </kbd>) and paste a tool URL &mdash; the name, domain, and
            favicon are fetched automatically.
          </p>
          <p>
            <strong>3.</strong> Assign a <strong>category</strong> and some{" "}
            <strong>tags</strong> so you can find it later.
          </p>
          <p>
            <strong>4.</strong> Head to{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">
              Collections
            </strong>{" "}
            to group tools into themed stacks.
          </p>
          <p>
            <strong>5.</strong> Use the <strong>Open All</strong> button on any
            collection to launch every tool at once.
          </p>
        </div>
      </section>

      <section className="rounded-lg border bg-amber-50/50 p-4 dark:bg-amber-950/20">
        <p className="text-xs leading-5 text-amber-800 dark:text-amber-300">
          <strong>Note:</strong> VaultWerk is currently in MVP stage. All data
          is stored locally in your browser (IndexedDB). Clearing your browser
          data will remove your tools and collections.
        </p>
      </section>
    </div>
  );
}
