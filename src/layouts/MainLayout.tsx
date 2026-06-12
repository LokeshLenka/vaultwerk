import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 selection:bg-zinc-300 dark:selection:bg-zinc-900">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
