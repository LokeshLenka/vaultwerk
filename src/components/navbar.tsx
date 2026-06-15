import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListIcon, Gear, MapPin, House } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "../lib/utils";
import { GitHubStarsButton } from "./github-stars-button";
import LogoLightTheme from "../../public/vaultwerk-light-logo.png";
import LogoDarkTheme from "../../public/vaultwerk-dark-logo.png";

interface NavItem {
  title: string;
  to: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { title: "Home", to: "/", icon: <House size={16} /> },
  {
    title: "Docs",
    to: "/docs",
    icon: <Gear size={16} />,
  },
  {
    title: "Roadmap",
    to: "/timeline",
    icon: <MapPin size={16} />,
  },
  // { title: "Go to dashboard", to: "/dashboard", icon: <Books size={16} /> },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          <img
            src={LogoLightTheme}
            alt="ValutWerk Logo"
            className="h-10 w-10 bg-black block dark:hidden"
          />{" "}
          <img
            src={LogoDarkTheme}
            alt="ValutWerk Logo"
            className="h-10 w-10 dark:bg-white hidden dark:block"
          />
          <span className="font-brand">ValutWerk</span>
          <Badge
            variant="outline"
            className="ml-1 px-1.5 text-xs border-green-500 text-green-500"
          >
            Beta
          </Badge>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* GitHub Stars — hidden on mobile to keep header clean */}
          <div className="hidden sm:block">
            <GitHubStarsButton username="LokeshLenka" repo="valutwerk" />
          </div>
          <Link to={"/dashboard/library"}>
            <Button>Get started</Button>
          </Link>

          {/* <ModeToggle /> */}

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Button variant="outline" size="icon" className="md:hidden">
                <ListIcon className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader className="mb-6">
                <SheetTitle></SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  );
                })}
              </nav>

              {/* GitHub Stars inside mobile sheet */}
              <div className="mt-6 px-1 bg-zinc-500">
                <GitHubStarsButton
                  username="LokeshLenka"
                  repo="valutwerk"
                  className="border-none"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
