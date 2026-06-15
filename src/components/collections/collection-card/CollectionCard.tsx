// CollectionCard.tsx
import { memo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { CollectionRecord } from "@/lib/types/collection";
import CollectionCardHeader from "./CollectionCardHeader";
import CollectionCardFooter from "./CollectionCardFooter";
import CollectionCardBody from "./CollectionCardBody";

type Props = {
  collection: CollectionRecord;
  onEdit: (collection: CollectionRecord) => void;
  onDelete: (collection: CollectionRecord) => void;
};

function CollectionCardComponent({ collection }: Props) {
  return (
    <Card className="flex h-full flex-col rounded-none border-border/70 bg-card shadow-none transition-colors hover:bg-accent/30">
      <CardHeader className="space-y-0 px-4 sm:px-5">
        <CollectionCardHeader
          name={collection.name}
          toolCount={collection.toolIds.length}
        />
      </CardHeader>

      <CardContent className="flex-1 px-4 pb-4 pt-0 sm:px-5">
        <CollectionCardBody description={collection.description} />
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t border-border/70 px-4 sm:px-5">
        <CollectionCardFooter
          collectionId={collection.id}
          collection={collection}
        />
      </CardFooter>
    </Card>
  );
}

const CollectionCard = memo(CollectionCardComponent);
export default CollectionCard;
