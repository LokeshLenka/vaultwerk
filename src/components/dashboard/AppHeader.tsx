import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const AppHeader = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const collectionId = segments[1] === "collections" && segments[2] ? segments[2] : null;
  const collection = useLiveQuery(
    () => (collectionId ? db.collections.get(collectionId) : undefined),
    [collectionId],
  );

  const crumbs: { label: string; to?: string }[] = [];

  if (segments.length <= 1) {
    crumbs.push({ label: "Dashboard" });
  } else {
    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      const isLast = i === segments.length - 1;

      if (isLast && segment === collectionId) {
        crumbs.push({ label: collection?.name ?? "..." });
      } else {
        crumbs.push({
          label: formatSegment(segment),
          to: isLast ? undefined : "/" + segments.slice(0, i + 1).join("/"),
        });
      }
    }
  }

  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="[&_svg]:size-5!" />

          <Separator orientation="vertical" className="hidden h-4 sm:block" />

          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              {crumbs.map((crumb, i) => (
                <BreadcrumbItem key={i}>
                  {crumb.to ? (
                    <>
                      <BreadcrumbLink render={<Link to={crumb.to} />}>
                        {crumb.label}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
};
