// CollectionCardHeader.tsx
import { Folder } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";

type Props = {
  name: string;
  toolCount: number;
};

export default function CollectionCardHeader({ name, toolCount }: Props) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center border border-border/70 bg-muted/40">
          <Folder
            size={16}
            weight="duotone"
            className="text-muted-foreground"
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold leading-5 text-foreground">
            {name}
          </h3>
        </div>
      </div>

      <Badge
        variant="secondary"
        className="rounded-none border border-border/60 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
      >
        {toolCount} {toolCount === 1 ? "tool" : "tools"}
      </Badge>
    </div>
  );
}
