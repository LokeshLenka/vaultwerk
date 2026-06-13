// tool-sheet/ToolSheet.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Plus, FloppyDisk } from "@phosphor-icons/react";
import type { ToolRecord } from "../../../lib/types/tool";
import {
  createTool,
  deleteTool,
  updateTool,
} from "../../../lib/services/tool-service";
import ToolSheetForm, { type ToolFormState } from "./ToolSheetForm";
import ToolDeleteDialog from "./ToolDeleteDialog";
import { cn } from "@/lib/utils";

const emptyForm: ToolFormState = {
  name: "",
  url: "",
  category: "",
  tags: "",
  description: "",
  isFavorite: false,
};

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  tool?: ToolRecord | null;
  onSuccess?: () => void | Promise<void>;
};

export default function ToolSheet({
  open,
  onOpenChange,
  tool,
  onSuccess,
}: Props) {
  const isEdit = !!tool;

  const [internalOpen, setInternalOpen] = useState(false);
  const controlledOpen = open ?? internalOpen;

  const [form, setForm] = useState<ToolFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const setOpen = (value: boolean) => {
    onOpenChange?.(value);
    if (open === undefined) setInternalOpen(value);
  };

  useEffect(() => {
    if (!tool) {
      setForm(emptyForm);
      return;
    }
    setForm({
      name: tool.name ?? "",
      url: tool.normalizedUrl ?? "",
      category: tool.category ?? "",
      tags: Array.isArray(tool.tags) ? tool.tags.join(", ") : "",
      description: tool.description ?? tool.notes ?? "",
      isFavorite: !!tool.isFavorite,
    });
  }, [tool]);

  const parsedTags = useMemo(
    () =>
      form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [form.tags],
  );

  function handleFieldChange<K extends keyof ToolFormState>(
    key: K,
    value: ToolFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      url: form.url.trim(),
      category: (form.category.trim() || null) as any,
      description: form.description.trim() || null,
      tags: parsedTags,
      isFavorite: form.isFavorite,
    };
    try {
      if (isEdit && tool?.id) {
        await updateTool(tool.id, payload);
      } else {
        await createTool(payload);
      }
      await onSuccess?.();
      setOpen(false);
      if (!isEdit) setForm(emptyForm);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!tool?.id) return;
    setDeleting(true);
    try {
      await deleteTool(tool.id);
      await onSuccess?.();
      setOpen(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Sheet open={controlledOpen} onOpenChange={setOpen}>
      {!tool ? (
        <SheetTrigger>
          <Button
            size="icon"
            className="fixed bottom-8 right-8 z-10 size-12 shadow-xl sm:h-12 sm:w-auto sm:px-4"
          >
            <Plus className="size-6" />
            <span className="ml-2 hidden sm:inline">Add tool</span>
          </Button>
        </SheetTrigger>
      ) : null}
  
      <SheetContent
        className={cn(
          "min-w-xs sm:min-w-lg w-full overflow-y-auto px-4",
          deleteDialogOpen && "pointer-events-none blur-sm",
        )}
      >
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit tool" : "Add tool"}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update the important details. Everything else is handled automatically."
              : "Save a tool quickly now and organize it later."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <ToolSheetForm
            form={form}
            parsedTags={parsedTags}
            onChange={handleFieldChange}
          />

          <SheetFooter>
            <Button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto"
            >
              <FloppyDisk className="mr-2 size-4" />
              {saving ? "Saving..." : isEdit ? "Save changes" : "Save tool"}
            </Button>
          </SheetFooter>
          <div className="mb-4">
            {isEdit ? (
              <ToolDeleteDialog
                toolName={tool?.name ?? "this tool"}
                deleting={deleting}
                onDelete={handleDelete}
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              />
            ) : null}
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
