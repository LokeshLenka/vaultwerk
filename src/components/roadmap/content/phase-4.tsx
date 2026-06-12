import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Badge } from "../../ui/badge";

const Phase4Content = () => {
  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">
              Cloud Sync, Accounts & Community
            </h3>
            <Badge className="h-5 rounded-sm border-none bg-muted text-muted-foreground text-xs">
              Future
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            The cloud and collaboration layer focused on syncing data across
            devices, sharing collections, and enabling community-driven
            discovery. Earlier phases are designed to support future cloud
            capabilities without requiring major rewrites.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Duration
            </p>
            <p className="text-sm font-semibold">6 - 8 Weeks</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Goal
            </p>
            <p className="text-sm font-semibold">Cloud Platform Expansion</p>
          </div>
        </div>

        <Accordion
          multiple
          className="-mt-2 mb-0 w-full border-none"
          defaultValue={[]}
        >
          <AccordionItem value="week-1-2" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 1 - 2
                </Badge>
                <span className="text-sm font-medium">
                  Cloud Infrastructure & Authentication
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>Cloud database schema aligned with the local data model</li>
                <li>
                  Flexible authentication providers and account management
                </li>
                <li>
                  Migration path from local storage to cloud accounts on first
                  sign-in
                </li>
                <li>
                  Cloud-powered metadata processing and enrichment services
                </li>
                <li>
                  Performance, caching, and security infrastructure for public
                  content
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="week-2-4" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 2 - 4
                </Badge>
                <span className="text-sm font-medium">
                  Public Collections & Community Discovery
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Publish a collection with a shareable URL — anyone can view
                  and clone it
                </li>
                <li>
                  Community discovery feed — browse trending collections
                  filtered by category, stack, and tags
                </li>
                <li>
                  One-click clone — copy any public collection into your
                  personal library
                </li>
                <li>
                  Cross-device synchronization across supported valutWerk
                  surfaces
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="week-4-6" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 4 - 6
                </Badge>
                <span className="text-sm font-medium">
                  Community Profiles & Engagement
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Star tools and follow creators — feed of recent activity from
                  followed users
                </li>
                <li>
                  Public profile page — user's published collections and starred
                  tools
                </li>
                <li>Community engagement indicators and collection insights</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="week-6-8" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 6 - 8
                </Badge>
                <span className="text-sm font-medium">
                  Team Workspaces & Scale
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Shared team libraries with collaborative access controls
                </li>
                <li>Onboard new devs with a single collection link</li>
                <li>Advanced discovery and search across community content</li>
                <li>
                  Scale testing, performance polish, and production hardening
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Phase4Content;
