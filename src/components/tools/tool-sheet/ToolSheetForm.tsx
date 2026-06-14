// tool-sheet/ToolSheetForm.tsx
import { SpinnerIcon, WarningIcon } from "@phosphor-icons/react";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Textarea } from "../../ui/textarea";
import { cn } from "@/lib/utils";

export type ToolFormState = {
  name: string;
  url: string;
  category: string;
  tags: string;
  description: string;
  isFavorite: boolean;
};

type Props = {
  form: ToolFormState;
  parsedTags: string[];
  onChange: <K extends keyof ToolFormState>(
    key: K,
    value: ToolFormState[K],
  ) => void;
  urlIsDuplicate?: boolean;
  urlDuplicateName?: string | null;
  urlIsChecking?: boolean;
};

function safeHostname(input?: string) {
  if (!input) return "";
  try {
    return new URL(input).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function ToolSheetForm({
  form,
  parsedTags,
  onChange,
  urlIsDuplicate,
  urlDuplicateName,
  urlIsChecking,
}: Props) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="tool-name">Name *</Label>
        <Input
          id="tool-name"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Perplexity, Figma, Supabase..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tool-url">URL *</Label>
        <Input
          id="tool-url"
          value={form.url}
          onChange={(e) => {
            const value = e.target.value;

            // Allow full clear by backspace/delete
            if (value === "") {
              onChange("url", "");
              return;
            }

            onChange("url", value);
          }}
          onFocus={() => {
            // Re-add protocol only when field is empty
            if (!form.url) {
              onChange("url", "https://");
            }
          }}
          placeholder="https://perplexity.ai"
          type="url"
          required
          aria-invalid={urlIsDuplicate ? "true" : undefined}
          aria-describedby="url-feedback"
          className={cn(
            urlIsDuplicate &&
              "border-destructive focus-visible:ring-destructive",
          )}
        />

        {/* Feedback line: checking spinner → duplicate error → domain hint */}
        <p
          id="url-feedback"
          className={cn(
            "flex min-h-[1rem] items-center gap-1 text-xs",
            urlIsDuplicate ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {urlIsChecking ? (
            <>
              <SpinnerIcon className="size-3 animate-spin" />
              Checking…
            </>
          ) : urlIsDuplicate ? (
            <>
              <WarningIcon className="size-3 shrink-0" />
              Already saved as{" "}
              <strong className="font-medium">{urlDuplicateName}</strong>
            </>
          ) : form.url ? (
            `Domain: ${safeHostname(form.url) || "Will be resolved on save"}`
          ) : null}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tool-category">Category</Label>
        <Input
          id="tool-category"
          value={form.category}
          onChange={(e) => onChange("category", e.target.value)}
          placeholder="AI, Backend, Design, DevOps..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tool-tags">Tags</Label>
        <Input
          id="tool-tags"
          value={form.tags}
          onChange={(e) => onChange("tags", e.target.value)}
          placeholder="search, llm, research"
        />
        {parsedTags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {parsedTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tool-notes">Notes</Label>
        <Textarea
          id="tool-notes"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Why you saved it, best use case, quick thoughts..."
          rows={4}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-1">
          <Label htmlFor="tool-favorite">Favorite</Label>
          <p className="text-xs text-muted-foreground">
            Mark this tool for quick access.
          </p>
        </div>
        <Switch
          id="tool-favorite"
          checked={form.isFavorite}
          onCheckedChange={(checked) => onChange("isFavorite", checked)}
        />
      </div>
    </div>
  );
}
