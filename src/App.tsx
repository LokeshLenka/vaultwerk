import { Suspense, lazy } from "react";
import { Navigate, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/landing/HomePage";
import { Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Timeline from "./pages/landing/timeline/Timeline";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { RequireAuth } from "./components/auth/RequireAuth";
import { TooltipProvider } from "./components/ui/tooltip";
import { GlobalLoader } from "./components/GlobalLoader";
import { Toaster } from "sonner";
import {
  CheckCircle,
  XCircle,
  Info,
  WarningCircle,
  Spinner,
  SpinnerGap,
} from "@phosphor-icons/react";
import { Analytics } from "@vercel/analytics/react";
// import { DocsPage } from "./pages/docs/DocsPage";

// Dashboard routes are code-split: the library/collections/sites views pull
// in Dexie live queries, tables and dialogs that the landing page never needs.
const LibraryPage = lazy(() => import("./pages/tool/Library"));
const CollectionsPage = lazy(() =>
  import("./pages/collection/CollectionsPage").then((m) => ({
    default: m.CollectionsPage,
  })),
);
const CollectionDetailsPage = lazy(() =>
  import("./pages/collection/CollectionDetailsPage").then((m) => ({
    default: m.CollectionDetailsPage,
  })),
);
const SitesPage = lazy(() => import("./pages/sites/SitesPage"));
const SiteDetailsPage = lazy(() => import("./pages/sites/SiteDetailsPage"));
const WorkspaceSettingsPage = lazy(
  () => import("./pages/settings/WorkspaceSettingsPage"),
);

function DashboardFallback() {
  return (
    <div
      className="flex min-h-[40dvh] items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <SpinnerGap size={24} className="animate-spin text-muted-foreground" />
    </div>
  );
}

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Suspense fallback={<DashboardFallback />}>
                  <DashboardLayout />
                </Suspense>
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="library" replace />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="collections/:id" element={<CollectionDetailsPage />} />
            <Route path="sites" element={<SitesPage />} />
            <Route path="sites/:id" element={<SiteDetailsPage />} />
            <Route path="settings" element={<WorkspaceSettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </TooltipProvider>
      <Analytics />
    </>
  );
}

export default App;
