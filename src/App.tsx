import { Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/landing/HomePage";
import { Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Timeline from "./pages/landing/timeline/Timeline";
import DashboardLayout from "./layouts/DashboardLayout";
import LibraryPage from "./pages/tool/Library";
import { CollectionsPage } from "./pages/collection/CollectionsPage";
import { CollectionDetailsPage } from "./pages/collection/CollectionDetailsPage";
import WorkspaceSettingsPage from "./pages/settings/WorkspaceSettingsPage";
import { TooltipProvider } from "./components/ui/tooltip";
import { GlobalLoader } from "./components/GlobalLoader";
import { Toaster } from "sonner";

function App() {
  const location = useLocation();
  return (
    <>
      <GlobalLoader />
      <Toaster />
      <TooltipProvider>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/timeline" element={<Timeline />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* <Route index element={<Timeline />} /> */}
            <Route path="library" element={<LibraryPage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="collections/:id" element={<CollectionDetailsPage />} />
            <Route path="settings" element={<WorkspaceSettingsPage />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </>
  );
}

export default App;
