import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { CollectionRecord } from "@/lib/types/collection";
import { formatRelativeDate } from "@/lib/helpers/format-relative-date";


type Props = {
  collectionId: string;
  collection: Pick<CollectionRecord, "name" | "createdAt">;
};

export default function CollectionCardFooter({
  collectionId,
  collection,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">
        {formatRelativeDate(collection.createdAt)}
      </span>

      <Button
        variant="ghost"
        size="sm"
        className="h-9 min-w-[96px] rounded-none px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Link
          to={`/dashboard/collections/${collectionId}`}
          aria-label={`Open ${collection.name}`}
          className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <span>Open</span>
          <ArrowRight className="size-4 shrink-0" />
        </Link>
      </Button>
    </div>
  );
}
