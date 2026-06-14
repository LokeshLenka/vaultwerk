import { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import type { CollectionRecord } from "@/lib/types/collection";
import {
  createCollection,
  updateCollection,
} from "@/lib/services/collection-service";
import {
  validateCollectionInput,
  type CollectionFormValues,
} from "@/lib/collections";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UpsertCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection?: CollectionRecord | null;
}

const EMPTY_VALUES: CollectionFormValues = {
  name: "",
  description: "",
};

export function UpsertCollectionDialog({
  open,
  onOpenChange,
  collection,
}: UpsertCollectionDialogProps) {
  const [values, setValues] = useState<CollectionFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CollectionFormValues, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const initialValues = useMemo<CollectionFormValues>(() => {
    if (!collection) return EMPTY_VALUES;
    return {
      name: collection.name,
      description: collection.description ?? "",
    };
  }, [collection]);

  useEffect(() => {
    if (!open) return;
    setValues(initialValues);
    setErrors({});
  }, [open, initialValues]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = validateCollectionInput(values);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setSubmitting(true);
    try {
      if (collection) {
        await updateCollection(collection.id, result.normalized);
      } else {
        await createCollection({
          id: `collection_${nanoid(8)}`,
          ...result.normalized,
        });
      }
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {collection ? "Edit collection" : "Create collection"}
          </DialogTitle>
          <DialogDescription>Name and description only.</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="collection-name">Name</Label>
            <Input
              id="collection-name"
              value={values.name}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
              maxLength={50}
            />
            {errors.name ? (
              <p className="text-sm text-destructive">{errors.name}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="collection-description">Description</Label>
            <Textarea
              id="collection-description"
              value={values.description}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, description: e.target.value }))
              }
              maxLength={300}
            />
            {errors.description ? (
              <p className="text-sm text-destructive">{errors.description}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Optional</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {collection ? "Save changes" : "Create collection"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
