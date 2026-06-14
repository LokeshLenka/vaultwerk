import { Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/landing/HomePage";
import { Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Timeline from "./pages/landing/timeline/Timeline";
import { TooltipProvider } from "./components/ui/tooltip";
import DashboardLayout from "./layouts/DashboardLayout";
import LibraryPage from "./pages/Library";
import { CollectionsPage } from "./components/collections/collections-page";
import { CollectionDetailsPage } from "./components/collections/collection-details-page";

function App() {
  const location = useLocation();
  return (
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
        </Route>
      </Routes>
    </TooltipProvider>
  );
}

export default App;
