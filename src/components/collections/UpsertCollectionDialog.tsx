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
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
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

const NAME_MAX = 50;
const DESC_MAX = 300;

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

  const isEditing = Boolean(collection);

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
        toast.success("Collection updated");
      } else {
        await createCollection({
          id: `collection_${nanoid(8)}`,
          ...result.normalized,
        });
        toast.success("Collection created");
      }
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit collection" : "New collection"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-5 pt-1" onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="collection-name">Name</Label>
              <span className="text-xs text-muted-foreground tabular-nums">
                {values.name.length}/{NAME_MAX}
              </span>
            </div>
            <Input
              id="collection-name"
              value={values.name}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g. Design tools, Dev utilities"
              maxLength={NAME_MAX}
              autoFocus
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Description field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="collection-description">
                Description
                <span className="ml-1 text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <span className="text-xs text-muted-foreground tabular-nums">
                {values.description.length}/{DESC_MAX}
              </span>
            </div>
            <Textarea
              id="collection-description"
              value={values.description}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="What is this collection for?"
              maxLength={DESC_MAX}
              rows={3}
              className="resize-none"
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting
                ? isEditing
                  ? "Saving…"
                  : "Creating…"
                : isEditing
                ? "Save changes"
                : "Create collection"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
