import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Badge } from "../../ui/badge";

const Phase3Content = () => {
  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Browser Extension — WXT</h3>
            <Badge className="h-5 rounded-sm border-none bg-muted text-muted-foreground text-xs">
              Planned
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Developers save tools at the exact moment of discovery — while
            actively browsing — with one click. Works across modern browsers
            while sharing the same experience as the main application.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Duration
            </p>
            <p className="text-sm font-semibold">2 - 3 Weeks</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Browsers
            </p>
            <p className="text-sm font-semibold">
              Chrome · Edge · Firefox · Brave
            </p>
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
                  WXT Setup & Popup UI
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  WXT scaffolding — background script, popup page, content
                  scripts sharing Phase 1 React components
                </li>
                <li>
                  One-click save — click icon → active tab URL pre-filled →
                  metadata auto-fetches → review and save with minimal friction
                </li>
                <li>
                  Auto metadata extraction from the active tab (title, logo,
                  description, tags)
                </li>
                <li>Quick-access shortcut support for faster tool saving</li>
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
                  Dexie Sync & Deduplication
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Library synchronization between the extension and supported
                  valutWerk surfaces
                </li>
                <li>
                  Duplicate detection — if URL already saved, show existing
                  entry instead of creating a duplicate
                </li>
                <li>Collection selector for organizing tools while saving</li>
                <li>
                  Quick access to recently saved tools directly from the
                  extension
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
                  Store Submission & Cross-Browser Testing
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Chrome Web Store submission with store listing, screenshots,
                  and privacy policy
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="bg-primary/10 text-destructive rounded-sm px-3 py-1 text-xs font-medium">
                  Chrome Web Store
                </div>
                <div className="bg-primary/10 text-destructive rounded-sm px-3 py-1 text-xs font-medium">
                  Firefox Add-ons
                </div>
                <div className="bg-primary/10 text-destructive rounded-sm px-3 py-1 text-xs font-medium">
                  Edge Add-ons
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Phase3Content;
