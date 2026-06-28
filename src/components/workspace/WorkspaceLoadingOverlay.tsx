import { RocketLaunch } from "@phosphor-icons/react";

interface Props {
  open: boolean;
  totalTools: number;
}

export default function WorkspaceLoadingOverlay({ open, totalTools }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-popover p-8 shadow-xl ring-1 ring-foreground/10">
        <div className="flex size-12 items-center justify-center">
          <RocketLaunch
            size="100%"
            weight="fill"
            className="size-7 text-primary"
            style={{ animation: "workspace-loading-bounce 0.8s ease-in-out infinite" }}
          />
        </div>
        <p className="text-sm font-medium text-foreground">
          Opening {totalTools} tool{totalTools !== 1 ? "s" : ""}
        </p>
        <div className="flex gap-1">
          {Array.from({ length: Math.min(totalTools, 5) }).map((_, i) => (
            <div
              key={i}
              className="size-1.5 rounded-full bg-primary/40"
              style={{
                animation: `workspace-loading-dot 1s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes workspace-loading-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          @keyframes workspace-loading-dot {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
