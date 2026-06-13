import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

interface AppHeaderProps {
  breadcrumb?: string;
}

export const AppHeader = ({ breadcrumb = "Dashboard" }: AppHeaderProps) => (
  <header className="bg-card sticky top-0 z-50 border-b">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="[&_svg]:size-5!" />
        <Separator
          orientation="vertical"
          className="hidden h-4! data-vertical:self-center sm:block"
        />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{breadcrumb}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-1.5">
        <ModeToggle />
      </div>
    </div>
  </header>
);
