// tool-vault-card/ToolVaultCard.tsx
import { memo, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import type { ToolRecord } from "../../../lib/types/tool";
import ToolCardHeader from "./ToolCardHeader";
import ToolCardBody from "./ToolCardBody";
import ToolCardFooter from "./ToolCardFooter";

function getFaviconUrl(tool: ToolRecord): string | null {
  return (
    tool.faviconUrl ||
    (tool.domain
      ? `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`
      : null)
  );
}

type Props = {
  tool: ToolRecord;
  onEdit: (tool: ToolRecord) => void;
  onOpen?: (tool: ToolRecord) => void | Promise<void>;
};

function ToolVaultCardComponent({ tool, onEdit, onOpen }: Props) {
  const favicon = useMemo(() => getFaviconUrl(tool), [tool]);
  const description = tool.description?.trim() || tool.notes?.trim();

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <ToolCardHeader tool={tool} favicon={favicon} />
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <ToolCardBody tool={tool} description={description} />
      </CardContent>

      <CardFooter className="border-t pt-3">
        <ToolCardFooter tool={tool} onEdit={onEdit} onOpen={onOpen} />
      </CardFooter>
    </Card>
  );
}

const ToolVaultCard = memo(ToolVaultCardComponent);
export default ToolVaultCard;
