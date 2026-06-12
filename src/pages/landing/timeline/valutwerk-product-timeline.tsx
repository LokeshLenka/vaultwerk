import { Badge } from "../../../components/ui/badge";
import type { ProductTimelineProps } from "../../../lib/types/product-timeline/phase";
import { statusConfig } from "../../../lib/types/product-timeline/sratus-config";

const ProductTimeline = ({ phases }: ProductTimelineProps) => {
  return (
    <>
      <div className="mb-8 space-y-4 text-center md:mb-10 lg:mb-18">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
          VaultWerk Roadmap
        </h2>
        <p className="text-muted-foreground text-xl">
          Built in four phases, evolving from a local-first experience to cloud
          sync, sharing, and community features.
        </p>
      </div>

      {phases.map((phase, index) => {
        const status = statusConfig[phase.status];
        return (
          <div
            key={phase.phase}
            id={String(index + 1)}
            className="relative flex scroll-mt-18 justify-end gap-2"
          >
            {/* Left sidebar */}
            <div className="sticky top-19 flex w-36 flex-col items-end gap-2 self-start pb-4 max-md:hidden">
              <Badge className="flex w-auto justify-end rounded-sm text-sm font-semibold">
                {phase.phase}
              </Badge>
              <div className="text-muted-foreground text-right text-sm font-medium">
                {phase.duration}
              </div>
              <Badge
                className={`h-5 rounded-sm border-none text-xs font-medium ${status.className}`}
              >
                {status.label}
              </Badge>
            </div>

            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className="sticky top-19 flex size-6 items-center justify-center max-sm:top-5">
                <span
                  className={`flex size-4.5 shrink-0 items-center justify-center rounded-full ${
                    phase.status === "in-progress"
                      ? "bg-blue-600/20 dark:bg-blue-400/20"
                      : "bg-primary/20"
                  }`}
                >
                  <span
                    className={`size-3 rounded-full ${
                      phase.status === "in-progress"
                        ? "bg-blue-600 dark:bg-blue-400"
                        : "bg-primary"
                    }`}
                  />
                </span>
              </div>
              <span className="-mt-2.5 w-px flex-1 border" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-4 pb-11 pl-3 md:pl-6 lg:pl-9">
              {/* Mobile header */}
              <div className="flex flex-col gap-2 md:hidden">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="rounded-sm font-semibold">
                    {phase.phase}
                  </Badge>
                  <Badge
                    className={`h-5 rounded-sm border-none text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </Badge>
                </div>
                <div className="text-muted-foreground font-medium text-sm">
                  {phase.label} · {phase.duration}
                </div>
              </div>

              {phase.content}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductTimeline;
