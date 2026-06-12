import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Badge } from "./ui/badge";
import { GitHubStarsButton } from "./animate-ui/components/buttons/github-stars";

export function Navbar() {
  return (
    <header className="z-10 h-16 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          VaultWerk
          <Badge
            variant="outline"
            className="ml-2 px-1.5 text-xs border border-green-500 text-green-500"
          >
            Beta
          </Badge>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Home
          </Link>
          <Link
            to="/library"
            className="text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Library
          </Link>
          <Link
            to="/collections"
            className="text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Collections
          </Link>
          <Link
            to="/settings"
            className="text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Settings
          </Link>{" "}
          <Link
            to="/timeline"
            className="text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Product Timeline
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <ModeToggle />
        </div>
      </div>
      <GitHubStarsButton
        username="imskyleen"
        repo="animate-ui"
        inView={true}
        variant="default"
      />
    </header>
  );
}
