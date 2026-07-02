const techStack = [
  { area: "Framework", tech: "React 19 + TypeScript 6.3" },
  { area: "Build", tech: "Vite 8" },
  { area: "Styling", tech: "Tailwind CSS 4 + CSS variables (OKLCH)" },
  { area: "UI Primitives", tech: "@base-ui/react (headless), shadcn/ui style" },
  { area: "Database", tech: "Dexie.js 4 (IndexedDB wrapper)" },
  { area: "Routing", tech: "react-router-dom 7" },
  { area: "Icons", tech: "@phosphor-icons/react" },
  { area: "Notifications", tech: "sonner" },
  { area: "Animation", tech: "motion (framer-motion)" },
  { area: "Charts", tech: "recharts" },
];

const dataFlow = [
  { from: "User Action", arrow: "->", to: "React Component" },
  { from: "React Component", arrow: "->", to: "Service Layer (lib/services)" },
  { from: "Service Layer", arrow: "->", to: "Dexie.js (IndexedDB)" },
  { from: "IndexedDB", arrow: "->", to: "Reactive Query (useLiveQuery)" },
  { from: "Reactive Query", arrow: "->", to: "Component Re-render" },
];

export function ArchitectureSection() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Architecture</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          VaultWerk is a purely client-side application. There is no backend
          server, no database to provision, and no API to deploy.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tech Stack</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2.5 font-medium">Area</th>
                <th className="px-4 py-2.5 font-medium">Technology</th>
              </tr>
            </thead>
            <tbody>
              {techStack.map(({ area, tech }) => (
                <tr key={area} className="border-b last:border-0">
                  <td className="px-4 py-2 text-muted-foreground">{area}</td>
                  <td className="px-4 py-2 font-mono text-xs">{tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Data Flow</h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Data flows unidirectionally through the application:
        </p>
        <div className="space-y-1 rounded-lg border bg-muted/30 p-4 font-mono text-xs">
          {dataFlow.map(({ from, arrow, to }) => (
            <div key={from} className="flex items-center gap-2">
              <span className="text-zinc-900 dark:text-zinc-100">{from}</span>
              <span className="text-muted-foreground">{arrow}</span>
              <span className="text-zinc-900 dark:text-zinc-100">{to}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Local-First Design</h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          All application state lives in the browser's IndexedDB via Dexie.js.
          This means:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <li>Zero latency &mdash; no network requests for CRUD operations</li>
          <li>Offline by default &mdash; works without internet</li>
          <li>No accounts or authentication required</li>
          <li>
            Live queries via <code className="rounded bg-muted px-1 font-mono text-xs">
              dexie-react-hooks
            </code>{" "}
            auto-subscribe to database changes
          </li>
          <li>
            Schema migrations handled by Dexie versioning (currently v5)
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Route Layout</h2>
        <div className="space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <p>
            The app uses two layout shells:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                MainLayout
              </strong>{" "}
              &mdash; public pages: landing page, docs, timeline. Renders the
              Navbar + page content.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                DashboardLayout
              </strong>{" "}
              &mdash; authenticated app area: library, collections, sites,
              settings. Renders sidebar + header + page content.
            </li>
          </ul>
          <div className="mt-3 rounded-lg border bg-muted/30 p-4 font-mono text-xs">
            <div className="text-muted-foreground">/</div>
            <div className="pl-4 text-muted-foreground">
              (landing page &mdash; HomePage)
            </div>
            <div className="pl-4">/docs &mdash; Documentation</div>
            <div className="pl-4">/timeline &mdash; Roadmap</div>
            <div className="mt-1 text-muted-foreground">
              /dashboard/library &mdash; Tool library
            </div>
            <div className="pl-4 text-muted-foreground">
              /dashboard/collections &mdash; Collections list
            </div>
            <div className="pl-4 text-muted-foreground">
              /dashboard/collections/:id &mdash; Collection detail
            </div>
            <div className="pl-4 text-muted-foreground">
              /dashboard/sites &mdash; Sites list
            </div>
            <div className="pl-4 text-muted-foreground">
              /dashboard/sites/:id &mdash; Site detail
            </div>
            <div className="pl-4 text-muted-foreground">
              /dashboard/settings &mdash; Settings
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Workspace System</h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          The workspace module handles batch-opening tools in new browser tabs.
          It manages:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <li>
            <strong>Permission gating</strong> &mdash; shows an onboarding modal
            explaining popup requirements before the first launch
          </li>
          <li>
            <strong>Popup detection</strong> &mdash; detects when the browser
            blocks popups and shows browser-specific unblocking instructions
          </li>
          <li>
            <strong>Tab limit</strong> &mdash; caps at 20 tabs per batch with a
            warning toast
          </li>
          <li>
            <strong>Retry &amp; fallback</strong> &mdash; offers retry, open
            individually, or cancel when popups are blocked
          </li>
        </ul>
      </section>
    </div>
  );
}
