const tables = [
  {
    name: "tools",
    description: "The primary entity — stores every developer tool, one row per account per URL.",
    indexes: ["{ ownerId: 1, normalizedUrl: 1 } unique", "{ ownerId: 1, createdAt: -1 }", "text(name, description, notes, tags, domain, category)"],
    fields: [
      { name: "id", type: "string", notes: "ObjectId serialized as string" },
      { name: "ownerId", type: "string", notes: "Owning account (Clerk-linked user)" },
      { name: "url", type: "string", notes: "Original URL as entered" },
      { name: "normalizedUrl", type: "string", notes: "Canonical URL for dedup (unique per owner)" },
      { name: "name", type: "string", notes: "Display name" },
      { name: "domain", type: "string", notes: "Extracted hostname (www- stripped)" },
      { name: "faviconUrl", type: "string | null", notes: "Favicon URL" },
      { name: "category", type: "string | null", notes: "ToolCategory enum value" },
      { name: "tags", type: "string[]", notes: "Tag array" },
      { name: "description", type: "string | null", notes: "Auto-enriched or manual" },
      { name: "notes", type: "string | null", notes: "User notes" },
      { name: "siteId", type: "string | null", notes: "FK to sites collection" },
      { name: "isFavorite", type: "boolean", notes: "Favorite flag" },
      { name: "createdAt", type: "string (ISO)", notes: "Creation timestamp" },
      { name: "updatedAt", type: "string (ISO)", notes: "Update timestamp" },
      { name: "lastUsedAt", type: "string | null", notes: "Last opened timestamp" },
    ],
  },
  {
    name: "collections",
    description: "Thematic groups of tools for workflows, stacks, or sharing.",
    indexes: ["{ ownerId: 1, updatedAt: -1 }"],
    fields: [
      { name: "id", type: "string", notes: "ObjectId serialized as string" },
      { name: "ownerId", type: "string", notes: "Owning account" },
      { name: "name", type: "string", notes: "Collection name" },
      { name: "description", type: "string | null", notes: "Short description" },
      { name: "toolIds", type: "string[]", notes: "FKs to tools" },
      { name: "createdAt", type: "string (ISO)", notes: "Creation timestamp" },
      { name: "updatedAt", type: "string (ISO)", notes: "Update timestamp" },
    ],
  },
  {
    name: "sites",
    description: "Aggregated view grouping tools by domain.",
    indexes: ["{ ownerId: 1, domain: 1 } unique"],
    fields: [
      { name: "id", type: "string", notes: "ObjectId serialized as string" },
      { name: "ownerId", type: "string", notes: "Owning account" },
      { name: "domain", type: "string", notes: "Unique domain per owner" },
      { name: "displayName", type: "string", notes: "Human-readable name" },
      { name: "faviconUrl", type: "string | null", notes: "Site favicon" },
      { name: "toolCount", type: "number", notes: "Denormalized count of tools" },
      { name: "createdAt", type: "string (ISO)", notes: "Creation timestamp" },
      { name: "updatedAt", type: "string (ISO)", notes: "Update timestamp" },
    ],
  },
  {
    name: "jobs",
    description: "Background job queue for metadata fetch, AI enrichment, imports.",
    indexes: ["{ status: 1 }", "{ ownerId: 1 }"],
    fields: [
      { name: "id", type: "string", notes: "ObjectId serialized as string" },
      { name: "ownerId", type: "string", notes: "Owning account" },
      { name: "type", type: "JobType enum", notes: "metadata_fetch, ai_enrich, import_json, import_bookmarks" },
      { name: "status", type: "JobStatus enum", notes: "queued, running, done, failed" },
      { name: "entityType", type: "string", notes: "'tool' | 'collection' | 'system'" },
      { name: "entityId", type: "string | null", notes: "FK to the target entity" },
      { name: "payload", type: "Record | null", notes: "Job-specific data" },
      { name: "errorMessage", type: "string | null", notes: "Failure details" },
      { name: "attempts", type: "number", notes: "Retry count" },
      { name: "createdAt", type: "string (ISO)", notes: "Creation timestamp" },
      { name: "updatedAt", type: "string (ISO)", notes: "Update timestamp" },
    ],
  },
  {
    name: "settings",
    description: "Key-value store for per-account configuration (theme, API keys).",
    indexes: ["{ ownerId: 1, key: 1 } unique"],
    fields: [
      { name: "ownerId", type: "string", notes: "Owning account" },
      { name: "key", type: "string", notes: "Unique setting key per owner" },
      { name: "value", type: "T (generic)", notes: "Any JSON-serializable value" },
      { name: "updatedAt", type: "string (ISO)", notes: "Update timestamp" },
    ],
  },
];

export function DataModelSection() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Model</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          VaultWerk stores data in MongoDB Atlas via Mongoose models. Every
          library row carries an <code>ownerId</code> so accounts are
          isolated; identity comes from Clerk (linked to the user row on
          first sign-in). Documents serialize with string ids and ISO dates
          so frontend types stay stable.
        </p>
      </div>

      {tables.map((table) => (
        <section key={table.name} className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{table.name}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {table.description}
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 font-medium">Field</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {table.fields.map((f) => (
                  <tr key={f.name} className="border-b last:border-0">
                    <td className="whitespace-nowrap px-4 py-2 font-mono text-xs">
                      {f.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-mono text-xs text-muted-foreground">
                      {f.type}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">
                      {f.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <details className="group text-sm">
            <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">
              Mongo indexes
            </summary>
            <pre className="mt-2 overflow-x-auto rounded-lg border bg-muted/30 p-3 font-mono text-xs leading-5">
              {table.indexes.join(",\n" + " ".repeat(6))}
            </pre>
          </details>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Relationships</h2>
        <div className="space-y-3 text-sm leading-6">
          <div className="rounded-lg border bg-muted/30 p-4 font-mono text-xs">
            <div>
              <span className="text-blue-600 dark:text-blue-400">tools</span>
              <span className="text-muted-foreground"> {">"}-- </span>
              <span className="text-emerald-600 dark:text-emerald-400">sites</span>
              <span className="text-muted-foreground">
                {" "}
                (many-to-one via siteId)
              </span>
            </div>
            <div>
              <span className="text-emerald-600 dark:text-emerald-400">collections</span>
              <span className="text-muted-foreground"> {">"}-- </span>
              <span className="text-blue-600 dark:text-blue-400">tools</span>
              <span className="text-muted-foreground">
                {" "}
                (many-to-many via toolIds)
              </span>
            </div>
            <div>
              <span className="text-amber-600 dark:text-amber-400">jobs</span>
              <span className="text-muted-foreground"> {">"}-- </span>
              <span className="text-blue-600 dark:text-blue-400">tools</span>
              <span className="text-muted-foreground">
                {" "}
                | collections | system (polymorphic via entityId)
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border bg-amber-50/50 p-4 dark:bg-amber-950/20">
        <p className="text-xs leading-5 text-amber-800 dark:text-amber-300">
          <strong>Note:</strong> MongoDB does not enforce cross-collection
          foreign keys. Uniqueness (one URL per account, one domain per
          account) is enforced by unique indexes; row visibility is enforced
          by owner-scoped queries that return 404 — never 403 — for
          strangers, so resource existence is not leaked.
        </p>
      </section>
    </div>
  );
}
