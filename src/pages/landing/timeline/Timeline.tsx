import Phase1Content from "../../../components/roadmap/content/phase-1";
import Phase2Content from "../../../components/roadmap/content/phase-2";
import Phase3Content from "../../../components/roadmap/content/phase-3";
import Phase4Content from "../../../components/roadmap/content/phase-4";
import type { Phase } from "../../../lib/types/product-timeline/phase";
import ProductTimeline from "./valutwerk-product-timeline";

export const phases: Phase[] = [
  {
    phase: "Phase 1",
    label: "Web App — MVP",
    duration: "3 - 4 Weeks",
    status: "in-progress",
    content: <Phase1Content />,
  },
  {
    phase: "Phase 2",
    label: "Desktop — Tauri v2",
    duration: "2 - 3 Weeks",
    status: "planned",
    content: <Phase2Content />,
  },
  {
    phase: "Phase 3",
    label: "Browser Extension — WXT",
    duration: "2 - 3 Weeks",
    status: "planned",
    content: <Phase3Content />,
  },
  {
    phase: "Phase 4",
    label: "Cloud & Community",
    duration: "6 - 8 Weeks",
    status: "future",
    content: <Phase4Content />,
  },
];

function  Timeline() {
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
