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
            <h3 className="text-xl font-semibold">Team Workspaces & Scale</h3>
            <Badge className="h-5 rounded-sm border-none bg-muted text-muted-foreground text-xs">
              Future
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Shared team libraries with access controls, built on the same
            owner-scoped data model — plus the performance and search
            depth a multi-thousand-user service needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Duration
            </p>
            <p className="text-sm font-semibold">4 - 6 Weeks</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Goal
            </p>
            <p className="text-sm font-semibold">Multi-user scale</p>
          </div>
        </div>

        <Accordion
          multiple
          className="-mt-2 mb-0 w-full border-none"
          defaultValue={[]}
        >
          <AccordionItem value="week-1-3" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 1 - 3
                </Badge>
                <span className="text-sm font-medium">
                  Organizations & Shared Libraries
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Clerk organizations for team membership, roles, and invites
                </li>
                <li>
                  Shared team libraries with collaborative access controls
                </li>
                <li>Onboard new devs with a single collection link</li>
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
                  Search Depth & Production Scale
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Atlas Search for typo-tolerant, ranked discovery across
                  community content
                </li>
                <li>
                  Cursor pagination and caching for large libraries and feeds
                </li>
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

export default Phase3Content;
