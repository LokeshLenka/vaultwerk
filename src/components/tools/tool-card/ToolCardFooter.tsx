import { ArrowSquareOut, PencilSimple } from "@phosphor-icons/react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import type { ToolRecord } from "../../../lib/types/tool";
import { formatRelativeDate } from "@/lib/helpers/format-relative-date";

type Props = {
  tool: ToolRecord;
  onEdit: (tool: ToolRecord) => void;
  onOpen?: (tool: ToolRecord) => void | Promise<void>;
};

export default function ToolCardFooter({ tool, onEdit, onOpen }: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">
        {formatRelativeDate(tool.createdAt)}
      </span>

      <div className="flex items-center gap-0.5">
        {tool.url ? (
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={`Open ${tool.name}`}
                onClick={() => {
                  window.open(tool.url, "_blank", "noopener,noreferrer");
                  onOpen?.(tool);
                }}
              >
                <ArrowSquareOut size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open</TooltipContent>
          </Tooltip>
        ) : null}

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label={`Edit ${tool.name}`}
              onClick={() => onEdit(tool)}
            >
              <PencilSimple size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
