import { useSearchParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BookOpenText,
  Cube,
  Database,
  FolderOpen,
  PuzzlePiece,
} from "@phosphor-icons/react";
import { OverviewSection } from "./sections/Overview";
import { ArchitectureSection } from "./sections/Architecture";
import { DataModelSection } from "./sections/DataModel";
import { ProjectStructureSection } from "./sections/ProjectStructure";
import { SeedingSection } from "./sections/Seeding";
import { ComponentsSection } from "./sections/Components";

const sections = [
  { id: "overview", label: "Overview", icon: BookOpenText },
  { id: "architecture", label: "Architecture", icon: Cube },
  { id: "data-model", label: "Data Model", icon: Database },
  { id: "project-structure", label: "Project Structure", icon: FolderOpen },
  { id: "seeding", label: "Seeding", icon: Cube },
  { id: "components", label: "Components", icon: PuzzlePiece },
] as const;

const sectionComponents: Record<string, () => React.ReactNode> = {
  overview: OverviewSection,
  architecture: ArchitectureSection,
  "data-model": DataModelSection,
  "project-structure": ProjectStructureSection,
  seeding: SeedingSection,
  components: ComponentsSection,
};

export function DocsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("section") || "overview";

  const setActive = (id: string) => {
    setSearchParams({ section: id }, { replace: true });
  };

  const ActiveSection = sectionComponents[active] || OverviewSection;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 gap-0 px-0 sm:px-4 lg:px-6">
      <aside className="hidden w-56 shrink-0 border-r py-8 sm:block">
        <nav className="sticky top-24 space-y-1 pr-4">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                active === id
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
              )}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b px-4 py-3 sm:hidden">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={cn(
                "whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                active === id
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <ScrollArea className="flex-1">
          <div className="px-4 py-8 sm:px-8 lg:px-12">
            <ActiveSection />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
