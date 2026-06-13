import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/dashboard/AppHeader";
import { AppSidebar } from "../components/dashboard/AppSidebar";

const DashboardLayout = () => {
  return (
    <div className="selection:bg-zinc-300 dark:selection:bg-zinc-600">
      <SidebarProvider>
        <div className="flex min-h-dvh w-full">
          <AppSidebar />

          <div className="flex flex-1 flex-col">
            <AppHeader />

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
