import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface DashboardShellProps {
  children?: React.ReactNode;
  breadcrumb?: string;
}

const DashboardShell = ({ children, breadcrumb }: DashboardShellProps) => (
  <div className="flex min-h-dvh w-full">
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppHeader breadcrumb={breadcrumb} />
        <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  </div>
);

export default DashboardShell;
