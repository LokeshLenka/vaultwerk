import WorkspaceOnboardingModal from "./WorkspaceOnboardingModal";
import WorkspaceBlockedDialog from "./WorkspaceBlockedDialog";
import type { FlowState, WorkspaceResult } from "@/hooks/use-workspace";

interface Props {
  state: FlowState;
  result: WorkspaceResult | null;
  onContinue: () => void;
  onRetry: () => void;
  onOpenIndividually: () => void;
  onCancel: () => void;
}

export default function WorkspaceFlow({
  state,
  result,
  onContinue,
  onRetry,
  onOpenIndividually,
  onCancel,
}: Props) {
  return (
    <>
      <WorkspaceOnboardingModal
        open={state === "onboarding"}
        onContinue={onContinue}
        onCancel={onCancel}
      />

      <WorkspaceBlockedDialog
        open={state === "blocked"}
        result={result}
        onRetry={onRetry}
        onOpenIndividually={onOpenIndividually}
        onCancel={onCancel}
      />
    </>
  );
}
