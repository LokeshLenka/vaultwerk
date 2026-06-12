import type { ReactNode } from "react";

export type PhaseStatus = "in-progress" | "planned" | "future";

export interface Phase {
  phase: string;
  label: string;
  duration: string;
  status: PhaseStatus;
  content: ReactNode;
}

export interface ProductTimelineProps {
  phases: Phase[];
}
