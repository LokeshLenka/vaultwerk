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
              Sharing & Community Discovery
            </h3>
            <Badge className="h-5 rounded-sm border-none bg-muted text-muted-foreground text-xs">
              Planned
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Because every library already lives in the cloud, sharing is a
            permission — not a migration. Publish a collection with a link,
            browse what the community curates, and clone stacks into your
            own library in one click.
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
              Goal
            </p>
            <p className="text-sm font-semibold">Shareable libraries</p>
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
                  Public Collections & Clone
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
                  One-click clone — copy any public collection into your
                  personal library
                </li>
                <li>
                  Cross-device sync falls out of the cloud model — sign in
                  anywhere, same library
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="week-3-4" className="bg-transparent">
            <AccordionTrigger className="px-0 hover:no-underline [&>svg]:size-6!">
              <div className="flex items-center gap-2">
                <Badge className="h-6 rounded-sm border-none bg-muted text-muted-foreground text-xs font-medium">
                  Week 3 - 4
                </Badge>
                <span className="text-sm font-medium">
                  Discovery Feed & Profiles
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-inside list-disc space-y-3 text-sm">
                <li>
                  Community discovery feed — browse trending collections
                  filtered by category, stack, and tags
                </li>
                <li>
                  Star tools and follow creators — feed of recent activity
                  from followed users
                </li>
                <li>
                  Public profile page — published collections and starred
                  tools
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
