const tree = [
  { depth: 0, name: "src/", note: "Application source", dir: true },
  { depth: 1, name: "App.tsx", note: "Root component — routes, theme provider, toaster", dir: false },
  { depth: 1, name: "main.tsx", note: "Entry point — React StrictMode + BrowserRouter", dir: false },
  { depth: 1, name: "index.css", note: "Tailwind CSS v4 entry, theme variables, fonts", dir: false },
  { depth: 1, name: "assets/", note: "Static assets (logo images)", dir: true },
  { depth: 1, name: "components/", note: "React components", dir: true },
  { depth: 2, name: "collections/", note: "Collection card, dialogs, selectors", dir: true },
  { depth: 2, name: "dashboard/", note: "AppSidebar, AppHeader, nav items", dir: true },
  { depth: 2, name: "tools/", note: "ToolLibrary, ToolSheet, ToolCard, ToolDeleteDialog", dir: true },
  { depth: 2, name: "ui/", note: "22+ headless UI primitives (Button, Card, Dialog, etc.)", dir: true },
  { depth: 2, name: "workspace/", note: "WorkspaceFlow, onboarding, blocked dialog, loading overlay", dir: true },
  { depth: 2, name: "navbar.tsx", note: "Public site navigation bar", dir: false },
  { depth: 2, name: "mode-toggle.tsx", note: "Light/Dark/System theme switcher", dir: false },
  { depth: 2, name: "GlobalLoader.tsx", note: "Route transition loading indicator", dir: false },
  { depth: 2, name: "github-stars-button.tsx", note: "Live GitHub star count badge", dir: false },
  { depth: 1, name: "hooks/", note: "Custom React hooks", dir: true },
  { depth: 2, name: "use-collections.ts", note: "Live query for all collections", dir: false },
  { depth: 2, name: "use-mobile.ts", note: "Responsive mobile detection (<768px)", dir: false },
  { depth: 2, name: "use-pagination.ts", note: "Page-based pagination state", dir: false },
  { depth: 2, name: "use-popup-permission.ts", note: "Browser popup permission test", dir: false },
  { depth: 2, name: "use-search-shortcut.ts", note: "Ctrl+K / Cmd+K focus handler", dir: false },
  { depth: 2, name: "use-url-duplicate-check.ts", note: "Debounced normalized URL duplicate check", dir: false },
  { depth: 2, name: "use-workspace.ts", note: "Batch tab opening with popup detection + state machine", dir: false },
  { depth: 1, name: "layouts/", note: "Route layout shells", dir: true },
  { depth: 2, name: "MainLayout.tsx", note: "Public layout — Navbar + Outlet", dir: false },
  { depth: 2, name: "DashboardLayout.tsx", note: "App layout — Sidebar + Header + Outlet", dir: false },
  { depth: 1, name: "lib/", note: "Core application logic", dir: true },
  { depth: 2, name: "db.ts", note: "Dexie database class with schema definitions", dir: false },
  { depth: 2, name: "enums.ts", note: "ToolCategory, ToolType, ToolSource, JobType, etc.", dir: false },
  { depth: 2, name: "utils.ts", note: "cn() — clsx + tailwind-merge helper", dir: false },
  { depth: 2, name: "telemetry.ts", note: "Analytics event tracking (POST /api/telemetry)", dir: false },
  { depth: 2, name: "browser-detection.ts", note: "Browser detect + popup unblocking instructions", dir: false },
  { depth: 2, name: "collections.ts", note: "Collection validation constants", dir: false },
  { depth: 2, name: "factories/", note: "Record creation helpers (ToolFactory, CollectionFactory, etc.)", dir: true },
  { depth: 2, name: "helpers/", note: "URL normalization, relative date, auto-label", dir: true },
  { depth: 2, name: "queries/", note: "Tool query helpers (search, recent, forgotten, related)", dir: true },
  { depth: 2, name: "seeders/", note: "Seed data (402 tools, 83 collections) + seed scripts", dir: true },
  { depth: 2, name: "services/", note: "Business logic layer (tool, collection, site, job, settings services)", dir: true },
  { depth: 2, name: "types/", note: "TypeScript type definitions for all entities", dir: true },
  { depth: 1, name: "pages/", note: "Page components (one per route)", dir: true },
  { depth: 2, name: "collection/", note: "CollectionsPage + CollectionDetailsPage", dir: true },
  { depth: 2, name: "docs/", note: "Documentation page with section components", dir: true },
  { depth: 2, name: "landing/", note: "HomePage + Timeline roadmap page", dir: true },
  { depth: 2, name: "settings/", note: "Workspace settings page", dir: true },
  { depth: 2, name: "sites/", note: "SitesPage + SiteDetailsPage", dir: true },
  { depth: 2, name: "tool/", note: "Library page", dir: true },
];

export function ProjectStructureSection() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Project Structure</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          An annotated walkthrough of every directory and key file in the
          codebase.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Directory Tree</h2>
        <div className="overflow-x-auto rounded-lg border bg-muted/30 p-4">
          <pre className="font-mono text-xs leading-6">
            {tree.map((item) => (
              <div key={item.name} className="flex">
                <span className="shrink-0">
                  {"  ".repeat(item.depth)}
                  {item.dir ? (
                    <span className="text-amber-600 dark:text-amber-400">
                      {item.name}
                    </span>
                  ) : (
                    <span className="text-blue-600 dark:text-blue-400">
                      {item.name}
                    </span>
                  )}
                </span>
                <span className="ml-3 text-muted-foreground">
                  {/* {'//'} {item.note} */}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Key Directories</h2>

        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium">components/</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Houses all React components. The <code>ui/</code> subdirectory
              contains 22+ headless primitives built on @base-ui/react. Feature
              components (ToolLibrary, CollectionCard, WorkspaceFlow) live in
              their own subdirectories alongside their sub-components.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium">hooks/</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              7 custom hooks covering workspace orchestration, pagination,
              mobile detection, keyboard shortcuts, URL duplicate checking, and
              popup permissions.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium">lib/</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Core application logic: Dexie database schema, type definitions,
              enums, service layer (CRUD for all 5 entities), query helpers,
              factories, seeders, URL normalization, and telemetry.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium">pages/</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              One subdirectory per route. Each page component composes feature
              components and hooks into a complete view.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
