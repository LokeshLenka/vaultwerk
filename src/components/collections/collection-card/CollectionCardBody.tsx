// CollectionCardBody.tsx
type Props = {
  description?: string | null;
};

export default function CollectionCardBody({ description }: Props) {
  if (!description?.trim()) {
    return (
      <p className="text-sm italic leading-6 text-muted-foreground/70">
        No description added.
      </p>
    );
  }

  return (
    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
      {description}
    </p>
  );
}
