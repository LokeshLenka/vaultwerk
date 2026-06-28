import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowSquareOut, ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { db } from "@/lib/db";
import type { ToolRecord } from "@/lib/types/tool";
import type { CollectionRecord } from "@/lib/types/collection";
import { formatRelativeDate } from "@/lib/helpers/format-relative-date";
import { useWorkspace } from "@/hooks/use-workspace";
import WorkspaceFlow from "@/components/workspace/WorkspaceFlow";


type Props = {
  collectionId: string;
  collection: Pick<CollectionRecord, "name" | "createdAt">;
  toolIds: string[];
};

export default function CollectionCardFooter({
  collectionId,
  collection,
  toolIds,
}: Props) {
  const toolCacheRef = useRef<ToolRecord[]>([]);
  const workspace = useWorkspace();

  useEffect(() => {
    if (toolIds.length === 0) {
      toolCacheRef.current = [];
      return;
    }
    let cancelled = false;
    db.tools.bulkGet(toolIds).then((tools) => {
      if (!cancelled) {
        toolCacheRef.current = tools.filter((t): t is ToolRecord => t != null);
      }
    });
    return () => { cancelled = true; };
  }, [toolIds]);

  const handleOpenAll = useCallback(() => {
    const tools = toolCacheRef.current
      .filter((t) => t?.url)
      .map((t) => ({ name: t.name, url: t.url! }));
    workspace.launch(tools);
  }, [workspace]);

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">
        {formatRelativeDate(collection.createdAt)}
      </span>

      <div className="flex items-center gap-0.5">
        {toolIds.length > 0 ? (
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={handleOpenAll}
                aria-label={`Open all ${toolIds.length} tools in new tabs`}
              >
                <ArrowSquareOut size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Open all {toolIds.length} tool{toolIds.length !== 1 ? "s" : ""}
            </TooltipContent>
          </Tooltip>
        ) : null}

        <Tooltip>
          <TooltipTrigger>
            <Link
              to={`/dashboard/collections/${collectionId}`}
              aria-label={`Open ${collection.name}`}
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowRight size={16} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            {collection.name}
          </TooltipContent>
        </Tooltip>
      </div>

      <WorkspaceFlow
        state={workspace.state}
        result={workspace.result}
        onContinue={workspace.continue}
        onRetry={workspace.retry}
        onOpenIndividually={workspace.openIndividually}
        onCancel={workspace.cancel}
      />
    </div>
  );
}
