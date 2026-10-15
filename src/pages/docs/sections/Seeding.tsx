export function SeedingSection() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seeding</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          VaultWerk ships with a server-side demo seeder that populates an
          account with real-world developer tools and themed collections for
          testing and demo purposes — one bulk request, not hundreds of
          client calls.
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
          The seeding pipeline runs inside the API in three steps:
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <li>
            <strong>Tools are bulk-inserted</strong> &mdash; Templates are
            shuffled, normalized, and checked against the account&apos;s
            existing URLs in a single query; new rows go in with one{" "}
            <code>insertMany</code>.
          </li>
          <li>
            <strong>Collections are populated</strong> &mdash; For each
            collection template, its tags are matched against the tags of
            seeded tools. Matching tools are automatically assigned to the
            collection.
          </li>
          <li>
            <strong>Sites are synced</strong> &mdash; After insertion, a
            single site-sync pass rebuilds the domain-grouped sites layer.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Usage</h2>
        <div className="space-y-3 text-sm leading-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            From the app, the empty-state buttons call the gated endpoint:
          </p>
          <pre className="overflow-x-auto rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-6">
            <span className="text-zinc-500">{"// One request seeds tools + collections (max 50, rate-limited)"}</span>
            {"\n"}
            <span className="text-blue-600 dark:text-blue-400">await</span>
            {" seedDemoLibrary({ count: 25 });"}
            {"\n\n"}
            <span className="text-zinc-500">{"// POST /api/seed/demo — disabled in production unless ALLOW_SEED=true"}</span>
          </pre>
          <p className="text-zinc-600 dark:text-zinc-400">
            Operators can seed an account from the server instead:
          </p>
          <pre className="overflow-x-auto rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-6">
            npm run server:seed -- --email you@example.com --count 25
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
