import Phase1Content from "../../../components/roadmap/content/phase-1";
import Phase2Content from "../../../components/roadmap/content/phase-2";
import Phase3Content from "../../../components/roadmap/content/phase-3";
import type { Phase } from "../../../lib/types/product-timeline/phase";
import ProductTimeline from "./valutwerk-product-timeline";

// Module-private (not exported): react-refresh only-export-components
// requires component files to export components, so shared data stays local.
const phases: Phase[] = [
  {
    phase: "Phase 1",
    label: "Cloud Platform — Accounts, API & Sync",
    duration: "3 - 4 Weeks",
    status: "in-progress",
    content: <Phase1Content />,
  },
  {
    phase: "Phase 2",
    label: "Sharing & Community Discovery",
    duration: "3 - 4 Weeks",
    status: "planned",
    content: <Phase2Content />,
  },
  {
    phase: "Phase 3",
    label: "Team Workspaces & Scale",
    duration: "4 - 6 Weeks",
    status: "future",
    content: <Phase3Content />,
  },
];

function Timeline() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-16">
        <div className="flex flex-col items-start">
          <ProductTimeline phases={phases} />
        </div>
      </div>
    </div>
  );
}

export default Timeline;
