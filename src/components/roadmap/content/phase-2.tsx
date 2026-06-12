import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Badge } from "../../ui/badge";

const Phase2Content = () => {
  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">
              Desktop Application — Tauri v2
            </h3>
            <Badge className="h-5 rounded-sm border-none bg-muted text-muted-foreground text-xs">
              Planned
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Tauri wraps the Phase 1 React codebase in a native WebView, enabling
            a lightweight cross-platform desktop application while reusing the
            existing components, state management, and local data layer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Duration
            </p>
            <p className="text-sm font-semibold">2 - 3 Weeks</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Ships via
            </p>
            <p className="text-sm font-semibold">GitHub Releases</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Platforms
            </p>
            <p className="text-sm font-semibold">Windows · macOS · Linux</p>
          </div>
        </div>

        <Accordion
          multiple
          className="-mt-2 mb-0 w-full border-none"
          defaultValue={[]}
        >
          <AccordionItem value="week-1" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 1
                </Badge>
                <span className="text-sm font-medium">
                  Desktop Foundation & Local Storage
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Tauri v2 scaffolding — Rust backend wrapping the Phase 1 Vite
                  build
                </li>
                <li>
                  Rust commands for file system access — auto-export JSON backup
                  to user-defined folder
                </li>
                <li>
                  Offline-first experience with full access to the local library
                  without an internet connection
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="week-2" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 2
                </Badge>
                <span className="text-sm font-medium">
                  System Tray & OS-Level Features
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  System tray icon — quick-add a tool without opening the full
                  window
                </li>
                <li>Customizable global keyboard shortcut for quick access</li>
                <li>
                  Native desktop notifications for reminders and tool
                  rediscovery
                </li>
                <li>
                  File system backup automation — scheduled JSON export to user
                  folder
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="week-3" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 3
                </Badge>
                <span className="text-sm font-medium">
                  Cross-Platform Testing & Release
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Cross-platform testing across Windows, macOS, and Linux
                  environments
                </li>
                <li>
                  GitHub Actions release pipeline — automated build for all
                  three platforms
                </li>
                <li>
                  GitHub Releases with installation packages and documentation
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Phase2Content;
