import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon, House } from "@phosphor-icons/react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-2">
        <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          404
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          This tool doesn&apos;t exist
        </h1>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          The page you&apos;re looking for was moved, deleted, or never saved to
          your vault.
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link to="/" className={cn(buttonVariants())}>
          <House className="mr-2 size-4" />
          Back home
        </Link>
        <Link
          to="/dashboard/library"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <MagnifyingGlassIcon className="mr-2 size-4" />
          Open library
        </Link>
      </div>
    </div>
  );
}
