// tool-vault-card/ToolCardFooter.tsx
import { ArrowSquareOut, PencilSimple } from "@phosphor-icons/react";
import { Button } from "../../ui/button";
import type { ToolRecord } from "../../../lib/types/tool";

function formatRelativeDate(value?: string | null) {
  if (!value) return "Saved recently";
  const diffDays = Math.floor(
    (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (Number.isNaN(diffDays)) return "Saved recently";
  if (diffDays <= 0) return "Saved today";
  if (diffDays === 1) return "Saved yesterday";
  if (diffDays < 7) return `Saved ${diffDays} days ago`;
  if (diffDays < 30) {
    const w = Math.floor(diffDays / 7);
    return `Saved ${w} week${w > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 365) {
    const m = Math.floor(diffDays / 30);
    return `Saved ${m} month${m > 1 ? "s" : ""} ago`;
  }
  const y = Math.floor(diffDays / 365);
  return `Saved ${y} year${y > 1 ? "s" : ""} ago`;
}

type Props = {
  tool: ToolRecord;
  onEdit: (tool: ToolRecord) => void;
  onOpen?: (tool: ToolRecord) => void | Promise<void>;
};

export default function ToolCardFooter({ tool, onEdit, onOpen }: Props) {
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">
        {formatRelativeDate(tool.createdAt)}
      </span>

      <div className="flex items-center gap-2">
        {tool.url ? (
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Open ${tool.name}`}
             
          >
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpen?.(tool)}
            >
              <ArrowSquareOut className="size-4" />
            </a>
          </Button>
        ) : null}

        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label={`Edit ${tool.name}`}
          onClick={() => onEdit(tool)}
        >
          <PencilSimple className="size-4" />
        </Button>
      </div>
    </div>
  );
}
