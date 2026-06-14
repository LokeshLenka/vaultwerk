import { Link } from "react-router-dom";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="text-base">{collection.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {collection.description || "No description"}
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          {collection.toolIds.length} tools
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline">
            <Link to={`/dashboard/collections/${collection.id}`}>Open</Link>
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => onEdit(collection)}
          >
            <PencilSimple size={16} />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(collection)}
          >
            <Trash size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
