import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Plus, FloppyDisk } from "@phosphor-icons/react";
import type { ToolRecord } from "../../../lib/types/tool";
import {
  createTool,
  deleteTool,
  updateTool,
} from "../../../lib/services/tool-service";
import ToolSheetForm, { type ToolFormState } from "./ToolSheetForm";
import { useUrlDuplicateCheck } from "@/hooks/use-url-duplicate-check";
import { useUrlMetadata } from "@/hooks/use-url-metadata";
import Magnet from "../../Magnet";
import ClickSpark from "../../ClickSpark";
import { Separator } from "../../ui/separator";
import { toast } from "sonner";
import ToolDeleteDialog from "./ToolDeleteDialog";
import { cn } from "@/lib/utils";

const emptyForm: ToolFormState = {
  name: "",
  url: "https://",
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
  // Page icon captured from the metadata probe; persisted on create.
  const [autoFavicon, setAutoFavicon] = useState<string | null>(null);

  const { isDuplicate, duplicateName, isChecking } = useUrlDuplicateCheck(
    form.url.trim(),
    tool?.id,
  );

  // Create-mode only, and never for a URL that's already saved.
  const { metadata, isFetching: isFetchingMetadata } = useUrlMetadata(
    form.url.trim(),
    !isEdit && !isDuplicate,
  );

  const setOpen = (value: boolean) => {
    onOpenChange?.(value);
    if (open === undefined) setInternalOpen(value);
  };

  /* eslint-disable react-hooks/set-state-in-effect -- intentional prop-to-state
     sync: reset transient dialog state when closed, and populate the form
     when a different tool is passed in for editing. */
  useEffect(() => {
    if (!controlledOpen) {
      setDeleteDialogOpen(false);
    }
  }, [controlledOpen]);

  useEffect(() => {
    if (!tool) {
      setForm(emptyForm);
      setAutoFavicon(null);
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
    setAutoFavicon(null);
  }, [tool]);

  // Page preview: pre-fill empty fields from the fetched page. Only fields
  // the user hasn't touched are filled, and only while the previewed URL
  // still matches the input — typing a new URL starts a fresh probe.
  const trimmedUrl = form.url.trim();
  const metadataApplied =
    !isEdit &&
    !!metadata &&
    metadata.url === trimmedUrl &&
    (!!metadata.title ||
      !!metadata.description ||
      !!metadata.suggestedCategory ||
      metadata.suggestedTags.length > 0);
  const urlMetadataStatus: "idle" | "fetching" | "applied" = isFetchingMetadata
    ? "fetching"
    : metadataApplied
      ? "applied"
      : "idle";
  useEffect(() => {
    if (isEdit || !metadata || metadata.url !== trimmedUrl) return;
    if (metadata.faviconUrl) setAutoFavicon(metadata.faviconUrl);
    setForm((prev) => {
      const fills: Partial<ToolFormState> = {};
      if (!prev.name.trim() && metadata.title) fills.name = metadata.title;
      if (!prev.description.trim() && metadata.description) {
        fills.description = metadata.description;
      }
      if (!prev.category.trim() && metadata.suggestedCategory) {
        fills.category = metadata.suggestedCategory;
      }
      if (!prev.tags.trim() && metadata.suggestedTags.length > 0) {
        fills.tags = metadata.suggestedTags.join(", ");
      }
      return Object.keys(fills).length > 0 ? { ...prev, ...fills } : prev;
    });
  }, [isEdit, metadata, trimmedUrl]);
  /* eslint-enable react-hooks/set-state-in-effect */

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
    // A hand-edited URL invalidates the captured page icon.
    if (key === "url") setAutoFavicon(null);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedUrl = form.url.trim();

    if (!trimmedUrl || trimmedUrl === "https://") return;
    if (isDuplicate || isChecking) return;

    setSaving(true);

    const payload = {
      name: form.name.trim(),
      url: trimmedUrl,
      category: form.category.trim() || null,
      description: form.description.trim() || null,
      tags: parsedTags,
      isFavorite: form.isFavorite,
      // Page icon captured by the preview probe; create-only so edits
      // never clobber the stored favicon.
      ...(!isEdit ? { faviconUrl: autoFavicon } : null),
    };

    try {
      if (isEdit && tool?.id) {
        await updateTool(tool.id, payload);
        toast.success("Tool updated");
      } else {
        await createTool(payload);
        toast.success("Tool added");
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
      toast.success("Tool deleted");
      setDeleteDialogOpen(false);
      await onSuccess?.();
      setOpen(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={setOpen}>
      {!tool ? (
        <DialogTrigger>
          <Button
            size="icon"
            className="fixed bottom-8 right-8 z-10 size-12 overflow-hidden shadow-xl sm:h-12 sm:w-auto sm:px-4"
          >
            {/* Bits live inside the button: a transformed ancestor would
                break `fixed` positioning, so Magnet/ClickSpark wrap content. */}
            <ClickSpark sparkCount={10} sparkColor="#a3a3a3">
              <Magnet magnetStrength={1.5} padding={30}>
                <span className="inline-flex items-center">
                  <Plus className="size-6" />
                  <span className="ml-2 hidden sm:inline">Add tool</span>
                </span>
              </Magnet>
            </ClickSpark>
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogContent
        className={cn(
          "sm:max-w-lg max-h-[90dvh] overflow-y-auto",
          deleteDialogOpen && "pointer-events-none blur-sm",
        )}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit tool" : "Add tool"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the essentials. We take care of the rest."
              : "Save a tool quickly now and organize it later."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ToolSheetForm
            form={form}
            parsedTags={parsedTags}
            onChange={handleFieldChange}
            urlIsDuplicate={isDuplicate}
            urlDuplicateName={duplicateName}
            urlIsChecking={isChecking}
            urlMetadataStatus={urlMetadataStatus}
          />

          {isEdit ? <Separator /> : null}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
            {isEdit ? (
              <div className="w-full sm:w-auto">
                <ToolDeleteDialog
                  toolName={tool?.name ?? "this tool"}
                  deleting={deleting}
                  onDelete={handleDelete}
                  open={deleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                />
              </div>
            ) : null}
            {isEdit ? (
              <div className="pb-3">
                <Separator className="sm:hidden" />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving || isDuplicate || isChecking}
                className="w-full sm:w-auto"
              >
                <FloppyDisk className="mr-2 size-4" />
                {saving ? "Saving..." : isEdit ? "Save changes" : "Save tool"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
