import type { PhaseStatus } from "./phase";

export const statusConfig: Record<PhaseStatus, { label: string; className: string }> =
  {
    "in-progress": {
      label: "In Progress",
      className:
        "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
    },
    planned: {
      label: "Planned",
      className:
        "bg-amber-600/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
    },
    future: {
      label: "Future",
      className: "bg-muted text-muted-foreground",
    },
  };
