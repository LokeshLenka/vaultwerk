// tool-vault-card/ToolCardBody.tsx
import { Badge } from "../../ui/badge";
import type { ToolRecord } from "../../../lib/types/tool";

type Props = {
  tool: ToolRecord;
  description: string | undefined;
};

export default function ToolCardBody({ tool, description }: Props) {
  const visibleTags = tool.tags?.slice(0, 3) ?? [];
  const overflowCount = (tool.tags?.length ?? 0) - visibleTags.length;

  return (
    <div className="space-y-3">
      {tool.category ? (
        <Badge variant="secondary" className="text-xs">
          {tool.category}
        </Badge>
      ) : null}

      {description ? (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground/50 italic">
          No notes added.
        </p>
      )}

      {visibleTags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              #{tag}
            </Badge>
          ))}
          {overflowCount > 0 ? (
            <Badge variant="outline" className="text-xs font-normal">
              +{overflowCount}
            </Badge>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
