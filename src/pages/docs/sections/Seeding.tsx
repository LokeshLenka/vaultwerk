export function SeedingSection() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seeding</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          VaultWerk ships with a built-in mass seed system that populates the
          database with real-world developer tools and themed collections for
          testing and demo purposes.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Seed Data Files</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-mono text-sm font-medium">
              src/lib/seeders/data/tool-data.ts
            </h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Exports <code>TOOL_SEED_DATA</code> &mdash; an array of 402
              real-world tools spanning every category. Each entry includes
              name, URL, category, toolType, description, and tags. Tools range
              from AI/ML (ChatGPT, Claude, Ollama) through frontend (React,
              Next.js, Tailwind) to devops (Docker, Terraform, Kubernetes) and
              security (1Password, Snyk, Semgrep).
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-mono text-sm font-medium">
              src/lib/seeders/data/collection-data.ts
            </h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Exports <code>COLLECTION_SEED_DATA</code> &mdash; an array of 83
              themed collections (AI Chat &amp; Assistants, SQL Databases,
              Deployment Platforms, Mac Productivity, etc.). Each collection has
              a name, description, and tag-based matching criteria.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">How it Works</h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          The seeding pipeline works in two phases:
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <li>
            <strong>Tools are inserted</strong> &mdash; Each tool template is
            processed through the URL normalizer, duplicate checker, and
            ToolFactory to create a full ToolRecord. URLs are normalized for
            deduplication. Tools get randomized timestamps spread across the
            last 180 days.
          </li>
          <li>
            <strong>Collections are populated</strong> &mdash; For each
            collection template, its tags are matched against the tags of seeded
            tools. Matching tools are automatically assigned to the collection.
            If fewer than 2 tools match, random tools are picked as a fallback.
          </li>
          <li>
            <strong>Sites are synced</strong> &mdash; After tool insertion, the
            site sync service auto-creates SiteRecord entries grouped by domain.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Usage</h2>
        <div className="space-y-3 text-sm leading-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Import and call the seed function from anywhere in the app:
          </p>
          <pre className="overflow-x-auto rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-6">
            <span className="text-blue-600 dark:text-blue-400">import</span>
            {" { seedAllData } "}
            <span className="text-blue-600 dark:text-blue-400">from</span>
            {' "@/lib/seeders/massive-seed";'}
            {"\n\n"}
            <span className="text-zinc-500">// Seed everything (402 tools + 83 collections)</span>
            {"\n"}
            <span className="text-blue-600 dark:text-blue-400">await</span>
            {" seedAllData();"}
            {"\n\n"}
            <span className="text-zinc-500">// With options</span>
            {"\n"}
            <span className="text-blue-600 dark:text-blue-400">await</span>
            {" seedAllData({"}
            {"\n  "}count: 200,
            {"\n  "}clearExisting: true,
            {"\n  "}skipDuplicates: true,
            {"\n"});{"\n\n"}
            <span className="text-zinc-500">// Clear all seeded data</span>
            {"\n"}
            <span className="text-blue-600 dark:text-blue-400">await</span>
            {" clearAllSeedData();"}
          </pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Category Breakdown</h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          The 402 seed tools are distributed across 22 categories:
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 font-medium">Category</th>
                <th className="px-4 py-2 font-medium">Count</th>
                <th className="px-4 py-2 font-medium">Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-2">AI</td><td className="px-4 py-2">32</td><td className="px-4 py-2 text-xs text-muted-foreground">ChatGPT, Claude, Copilot, LangChain</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Development</td><td className="px-4 py-2">15</td><td className="px-4 py-2 text-xs text-muted-foreground">VS Code, IntelliJ, Zed, Neovim</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Frontend</td><td className="px-4 py-2">25</td><td className="px-4 py-2 text-xs text-muted-foreground">React, Next.js, Vue, Svelte, Tailwind</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Backend</td><td className="px-4 py-2">18</td><td className="px-4 py-2 text-xs text-muted-foreground">Express, Fastify, Hono, NestJS</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Database</td><td className="px-4 py-2">35</td><td className="px-4 py-2 text-xs text-muted-foreground">Supabase, Neon, Prisma, Drizzle, SQLite</td></tr>
              <tr className="border-b"><td className="px-4 py-2">DevOps</td><td className="px-4 py-2">16</td><td className="px-4 py-2 text-xs text-muted-foreground">Docker, K8s, Terraform, ArgoCD</td></tr>
              <tr className="border-b"><td className="px-4 py-2">CI/CD</td><td className="px-4 py-2">16</td><td className="px-4 py-2 text-xs text-muted-foreground">GitHub Actions, CircleCI, Vercel</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Monitoring</td><td className="px-4 py-2">19</td><td className="px-4 py-2 text-xs text-muted-foreground">Datadog, Sentry, Grafana, PostHog</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Design</td><td className="px-4 py-2">24</td><td className="px-4 py-2 text-xs text-muted-foreground">Figma, Penpot, Framer, Spline</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Testing</td><td className="px-4 py-2">17</td><td className="px-4 py-2 text-xs text-muted-foreground">Playwright, Cypress, Vitest, Postman</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Security</td><td className="px-4 py-2">18</td><td className="px-4 py-2 text-xs text-muted-foreground">1Password, Bitwarden, Snyk, Trivy</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Productivity</td><td className="px-4 py-2">22</td><td className="px-4 py-2 text-xs text-muted-foreground">Notion, Linear, Raycast, Todoist</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Notes/Knowledge</td><td className="px-4 py-2">15</td><td className="px-4 py-2 text-xs text-muted-foreground">Obsidian, Roam, Logseq, Capacities</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Communication</td><td className="px-4 py-2">12</td><td className="px-4 py-2 text-xs text-muted-foreground">Slack, Discord, Zoom, Loom</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Automation</td><td className="px-4 py-2">11</td><td className="px-4 py-2 text-xs text-muted-foreground">Zapier, n8n, Make, Airflow</td></tr>
              <tr className="border-b"><td className="px-4 py-2">API Services</td><td className="px-4 py-2">19</td><td className="px-4 py-2 text-xs text-muted-foreground">Stripe, Twilio, Algolia, Cloudinary</td></tr>
              <tr className="border-b"><td className="px-4 py-2">CLI/Terminal</td><td className="px-4 py-2">24</td><td className="px-4 py-2 text-xs text-muted-foreground">Warp, tmux, ripgrep, fzf, lazygit</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Git/VCS</td><td className="px-4 py-2">10</td><td className="px-4 py-2 text-xs text-muted-foreground">GitHub, GitLab, GitKraken, GitLens</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Cloud</td><td className="px-4 py-2">8</td><td className="px-4 py-2 text-xs text-muted-foreground">AWS, GCP, Azure, Cloudflare</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Learning</td><td className="px-4 py-2">11</td><td className="px-4 py-2 text-xs text-muted-foreground">MDN, Stack Overflow, Codecademy</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Mobile</td><td className="px-4 py-2">8</td><td className="px-4 py-2 text-xs text-muted-foreground">React Native, Flutter, Expo, Fastlane</td></tr>
              <tr className="border-b"><td className="px-4 py-2">Extensions</td><td className="px-4 py-2">8</td><td className="px-4 py-2 text-xs text-muted-foreground">React DevTools, uBlock, Grammarly</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
