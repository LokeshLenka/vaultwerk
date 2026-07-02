

const categories = [
  {
    title: "UI Primitives",
    description: "Headless, unstyled building blocks built on @base-ui/react",
    components: [
      { name: "Accordion", file: "accordion.tsx", variants: "Animated caret icons" },
      { name: "AlertDialog", file: "alert-dialog.tsx", variants: "default, sm sizes" },
      { name: "Badge", file: "badge.tsx", variants: "default, secondary, destructive, outline, ghost, link" },
      { name: "Breadcrumb", file: "breadcrumb.tsx", variants: "nav, list, item, link, separator, ellipsis" },
      { name: "Button", file: "button.tsx", variants: "7 variants, 5 sizes (icon, icon-sm)" },
      { name: "Card", file: "card.tsx", variants: "Header, Title, Description, Content, Footer, Action" },
      { name: "Dialog", file: "dialog.tsx", variants: "Animated, showCloseButton option" },
      { name: "DropdownMenu", file: "dropdown-menu.tsx", variants: "Check/radio items, separators" },
      { name: "Input", file: "input.tsx", variants: "Focus ring, error state" },
      { name: "InputGroup", file: "input-group.tsx", variants: "Addon, Input, Button composition" },
      { name: "Kbd", file: "kbd.tsx", variants: "Kbd + KbdGroup" },
      { name: "Label", file: "label.tsx", variants: "peer-disabled state" },
      { name: "NavigationMenu", file: "navigation-menu.tsx", variants: "Viewport indicator" },
      { name: "ScrollArea", file: "scroll-area.tsx", variants: "Horizontal/vertical custom scrollbar" },
      { name: "Select", file: "select.tsx", variants: "Scroll, size variants" },
      { name: "Separator", file: "separator.tsx", variants: "Horizontal/vertical orientation" },
      { name: "Sheet", file: "sheet.tsx", variants: "4 slide-in sides" },
      { name: "Skeleton", file: "skeleton.tsx", variants: "animate-pulse" },
      { name: "Switch", file: "switch.tsx", variants: "sm/default sizes, thumb animation" },
      { name: "Sidebar", file: "sidebar.tsx", variants: "9 subcomponents, collapsible, Ctrl+B shortcut" },
      { name: "Textarea", file: "textarea.tsx", variants: "field-sizing-content auto-resize" },
      { name: "Tooltip", file: "tooltip.tsx", variants: "side/align/offset config, dark bg" },
    ],
  },
  {
    title: "Feature Components",
    description: "Domain-specific components that compose primitives and hooks",
    components: [
      { name: "ToolLibrary", file: "tools/ToolLibrary.tsx", variants: "Search, grid, sheet, empty/skeleton states" },
      { name: "ToolSheet", file: "tools/tool-sheet/ToolSheet.tsx", variants: "Add/edit dialog, URL duplicate check" },
      { name: "ToolSheetForm", file: "tools/tool-sheet/ToolSheetForm.tsx", variants: "Name, URL, category, tags, description" },
      { name: "ToolDeleteDialog", file: "tools/ToolDeleteDialog.tsx", variants: "Confirm with name verification" },
      { name: "ToolCard", file: "tools/tool-card/ToolCard.tsx", variants: "Header, Body, Footer sub-components" },
      { name: "CollectionCard", file: "collections/collection-card/CollectionCard.tsx", variants: "Header, Tags, Body, Footer" },
      { name: "CollectionCardFooter", file: "collections/collection-card/CollectionCardFooter.tsx", variants: "Open all, navigate, workspace flow" },
      { name: "UpsertCollectionDialog", file: "collections/UpsertCollectionDialog.tsx", variants: "Create/edit with validation" },
      { name: "DeleteCollectionDialog", file: "collections/DeleteCollectionDialog.tsx", variants: "Confirm with caution" },
      { name: "ToolCollectionSelector", file: "collections/ToolCollectionSelector.tsx", variants: "Search + add to collection" },
      { name: "WorkspaceFlow", file: "workspace/WorkspaceFlow.tsx", variants: "State machine: onboarding, blocked, success" },
      { name: "WorkspaceOnboardingModal", file: "workspace/WorkspaceOnboardingModal.tsx", variants: "First-time popup permission dialog" },
      { name: "WorkspaceBlockedDialog", file: "workspace/WorkspaceBlockedDialog.tsx", variants: "Browser-specific instructions, retry" },
      { name: "WorkspaceLoadingOverlay", file: "workspace/WorkspaceLoadingOverlay.tsx", variants: "Animated loading indicator" },
      { name: "AppSidebar", file: "dashboard/AppSidebar.tsx", variants: "Collapsible sidebar with nav items" },
      { name: "AppHeader", file: "dashboard/AppHeader.tsx", variants: "Breadcrumb, theme toggle, sidebar toggle" },
      { name: "Navbar", file: "navbar.tsx", variants: "Public nav with mobile sheet" },
    ],
  },
  {
    title: "Pages",
    description: "Top-level route components",
    components: [
      { name: "HomePage", file: "pages/landing/HomePage.tsx", variants: "Hero section with CTAs" },
      { name: "DocsPage", file: "pages/docs/DocsPage.tsx", variants: "Sidebar nav + markdown content sections" },
      { name: "Timeline", file: "pages/landing/timeline/Timeline.tsx", variants: "4-phase roadmap display" },
      { name: "Library", file: "pages/tool/Library.tsx", variants: "Wraps ToolLibrary component" },
      { name: "CollectionsPage", file: "pages/collection/CollectionsPage.tsx", variants: "Card grid, search, create/edit/delete" },
      { name: "CollectionDetailsPage", file: "pages/collection/CollectionDetailsPage.tsx", variants: "Tool list, open all, add/remove" },
      { name: "SitesPage", file: "pages/sites/SitesPage.tsx", variants: "Search by domain, sort by updatedAt" },
      { name: "SiteDetailsPage", file: "pages/sites/SiteDetailsPage.tsx", variants: "Tool grid, search, favorites, workspace" },
      { name: "WorkspaceSettingsPage", file: "pages/settings/WorkspaceSettingsPage.tsx", variants: "Popup permission test, reset" },
    ],
  },
];

export function ComponentsSection() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          A catalog of every reusable component in the codebase, organized by
          layer.
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat.title} className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{cat.title}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {cat.description}
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 font-medium">Component</th>
                  <th className="px-4 py-2 font-medium">File</th>
                  <th className="px-4 py-2 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {cat.components.map((c) => (
                  <tr key={c.name} className="border-b last:border-0">
                    <td className="whitespace-nowrap px-4 py-2 font-medium">
                      {c.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-mono text-xs text-muted-foreground">
                      {c.file}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">
                      {c.variants}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Custom Hooks</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 font-medium">Hook</th>
                <th className="px-4 py-2 font-medium">File</th>
                <th className="px-4 py-2 font-medium">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">useWorkspace</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">use-workspace.ts</td>
                <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">Batch tab opening with popup detection + state machine</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">useCollections</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">use-collections.ts</td>
                <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">Live query for all collections</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">useSearchShortcut</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">use-search-shortcut.ts</td>
                <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">Ctrl+K / Cmd+K focus search input</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">useUrlDuplicateCheck</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">use-url-duplicate-check.ts</td>
                <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">Debounced normalized URL duplicate check</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">usePagination</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">use-pagination.ts</td>
                <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">Page-based pagination state</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">useMobile</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">use-mobile.ts</td>
                <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">Responsive mobile detection</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">usePopupPermission</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">use-popup-permission.ts</td>
                <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">Test browser popup permissions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
