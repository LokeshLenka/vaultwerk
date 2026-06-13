import { Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/landing/HomePage";
import { Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Timeline from "./pages/landing/timeline/Timeline";
import { TooltipProvider } from "./components/ui/tooltip";
import DashboardShell from "./components/dashboard/Dashboard";

function App() {
  const location = useLocation();
  return (
    <TooltipProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/timeline" element={<Timeline />} />
        </Route>
        <Route path="/dashboard" element={<DashboardShell />} />
      </Routes>
    </TooltipProvider>
  );
}

export default App;
