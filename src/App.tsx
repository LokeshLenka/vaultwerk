import { Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/landing/HomePage";
import { Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Timeline from "./pages/landing/timeline/Timeline";
import DashboardLayout from "./layouts/DashboardLayout";
import LibraryPage from "./pages/tool/Library";
import { CollectionsPage } from "./pages/collection/CollectionsPage";
import { CollectionDetailsPage } from "./pages/collection/CollectionDetailsPage";
import { TooltipProvider } from "./components/ui/tooltip";
import { GlobalLoader } from "./components/GlobalLoader";
import { Toaster } from "sonner";
import {
  CheckCircle,
  XCircle,
  Info,
  WarningCircle,
  Spinner,
} from "@phosphor-icons/react";
import { Analytics } from "@vercel/analytics/react";
import SitesPage from "./pages/sites/SitesPage";
import SiteDetailsPage from "./pages/sites/SiteDetailsPage";
// import { DocsPage } from "./pages/docs/DocsPage";

function App() {
  const location = useLocation();
  return (
    <>
      <GlobalLoader />
      <Toaster
        position="bottom-right"
        closeButton
        gap={10}
        offset={24}
        visibleToasts={3}
        icons={{
          success: (
            <CheckCircle size={20} weight="fill" className="text-emerald-500" />
          ),
          info: <Info size={20} weight="fill" className="text-blue-500" />,
          warning: (
            <WarningCircle size={20} weight="fill" className="text-amber-500" />
          ),
          error: (
            <XCircle size={20} weight="fill" className="text-destructive" />
          ),
          loading: <Spinner size={20} className="animate-spin" />,
        }}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "group flex items-start rounded-none border bg-background text-foreground shadow-lg w-full max-w-sm p-4 gap-3 data-[type=error]:border-destructive/30",
            content: "flex-1 gap-1",
            title: "text-sm font-medium pr-5",
            description: "text-sm text-muted-foreground",
            icon: "shrink-0 mt-0.5",
            loader: "shrink-0",
            closeButton:
              "absolute top-2 right-2 rounded-none size-6 border border-muted-foreground/20 bg-background text-muted-foreground hover:text-foreground hover:bg-muted grid place-items-center",
          },
        }}
      />
      <TooltipProvider>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="/docs" element={<DocsPage />} /> */}
            <Route path="/timeline" element={<Timeline />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* <Route index element={<Timeline />} /> */}
            <Route path="library" element={<LibraryPage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="collections/:id" element={<CollectionDetailsPage />} />
            <Route path="sites" element={<SitesPage />} />
            <Route path="sites/:id" element={<SiteDetailsPage />} />
          </Route>
        </Routes>
      </TooltipProvider>
      <Analytics />
    </>
  );
}

export default App;
