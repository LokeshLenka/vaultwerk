import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Badge } from "../../ui/badge";

const Phase1Content = () => {
  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">
              Web Application — Local-First MVP
            </h3>
            <Badge className="h-5 rounded-sm border-none bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 text-xs">
              In Progress
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            A fully functional web app deployed on cloud. Zero backend cost. No
            account required. Local-first via IndexedDB. Usable in under 30
            seconds after landing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Duration
            </p>
            <p className="text-sm font-semibold">3 - 4 Weeks</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Deliverable
            </p>
            <p className="text-sm font-semibold">Live web app</p>
          </div>
        </div>

        <Accordion
          multiple
          className="-mt-2 mb-0 w-full border-none"
          defaultValue={[]}
        >
          <AccordionItem value="week 1" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 1
                </Badge>
                <span className="text-sm font-medium">
                  Project Setup & Data Layer
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Project scaffold — React 19 + TypeScript + Vite + Tailwind CSS
                  + shadcn/ui
                </li>
                <li>
                  Dexie.js IndexedDB schema — <code>tools</code>,{" "}
                  <code>collections</code>, <code>settings</code> tables with
                  full indexing
                </li>
                <li>
                  Zustand stores wired up for tools, collections, and UI state
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
                  URL Save Flow & Suggestions
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>Add tools by pasting a URL</li>
                <li>
                  Automatically fetch website title, description, favicon, and
                  preview image
                </li>
                <li>Display a logo or icon when available</li>
                <li>Generate tags automatically</li>
                <li>Suggest a category for the tool</li>
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
                  Library, Search & Collections
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Full-text Library search across name, description, tags,
                  category, and notes
                </li>
                <li>
                  Filter by category, tool type, tags, favorites. Sort by
                  recently added, most used, alphabetical
                </li>
                <li>
                  Collections editor — create, name, color-code, and reorder
                  tool stacks
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="week-4" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 4
                </Badge>
                <span className="text-sm font-medium">
                  Polish, Import/Export & Deploy
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Smart surfaces — Recently Added, Frequently Used, Forgotten
                  Tools (90+ days idle), Related Tools
                </li>
                <li>
                  Export full library as portable JSON backup; export individual
                  collections as JSON
                </li>
                <li>
                  Import JSON backup + browser bookmark HTML file with
                  auto-categorization
                </li>
                <li>
                  Deploy to cloud — zero config, auto-deploy on push.
                  Open-source on GitHub under MIT license
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Phase1Content;
