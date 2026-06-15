// tool-vault-card/ToolCardFooter.tsx
import { ArrowSquareOut, PencilSimple } from "@phosphor-icons/react";
import { Button } from "../../ui/button";
import type { ToolRecord } from "../../../lib/types/tool";
import { formatRelativeDate } from "@/lib/helpers/format-relative-date";

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
