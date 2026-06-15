import { Link } from "react-router-dom";
import { PencilSimple, Trash, Folder, ArrowRight } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CollectionRecord } from "@/lib/types/collection";

interface CollectionCardProps {
  collection: CollectionRecord;
  onEdit: (collection: CollectionRecord) => void;
  onDelete: (collection: CollectionRecord) => void;
}

export function CollectionCard({
  collection,
  onEdit,
  onDelete,
}: CollectionCardProps) {
  return (
    <Card className="group flex flex-col gap-0 transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Folder
              size={16}
              weight="duotone"
              className="shrink-0 text-muted-foreground"
            />
            <span className="font-semibold text-sm truncate leading-tight">
              {collection.name}
            </span>
          </div>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {collection.toolIds.length}{" "}
            {collection.toolIds.length === 1 ? "tool" : "tools"}
          </Badge>
        </div>
        {collection.description ? (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 ml-6">
            {collection.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground/50 italic mt-1 ml-6">
            No description
          </p>
        )}
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-2 pt-0">
        <Button
           
          size="sm"
          variant="ghost"
          className="gap-1.5 px-2 text-muted-foreground hover:text-foreground"
        >
          <Link to={`/dashboard/collections/${collection.id}`}>
            Open
            <ArrowRight size={14} />
          </Link>
        </Button>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="size-8 text-muted-foreground hover:text-foreground"
            aria-label="Edit collection"
            onClick={() => onEdit(collection)}
          >
            <PencilSimple size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="size-8 text-muted-foreground hover:text-destructive"
            aria-label="Delete collection"
            onClick={() => onDelete(collection)}
          >
            <Trash size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
