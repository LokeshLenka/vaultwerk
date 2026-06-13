// tool-vault-card/ToolCardHeader.tsx
import { Globe, Star } from "@phosphor-icons/react";
import type { ToolRecord } from "../../../lib/types/tool";

type Props = {
  tool: ToolRecord;
  favicon: string | null;
};

export default function ToolCardHeader({ tool, favicon }: Props) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted/40">
        {favicon ? (
          <img
            src={favicon}
            alt={`${tool.name} favicon`}
            className="size-8 rounded-sm"
          />
        ) : (
          <Globe className="size-5 text-muted-foreground" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-base font-semibold tracking-tight">
              {tool.name}
            </h3>
            <p className="mt-1 truncate text-sm text-muted-foreground">
              {tool.domain || "Unknown domain"}
            </p>
          </div>

          {tool.isFavorite ? (
            <Star
              weight="fill"
              className="mt-0.5 size-4 shrink-0 text-amber-500"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
