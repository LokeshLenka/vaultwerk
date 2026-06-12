import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { GithubLogoIcon, Star } from "@phosphor-icons/react";

interface GitHubStarsButtonProps {
  username: string;
  repo: string;
  className?: string;
}

export function GitHubStarsButton({
  username,
  repo,
  className,
}: GitHubStarsButtonProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${username}/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, [username, repo]);

  const formatted =
    stars === null
      ? null
      : stars >= 1000
        ? `${(stars / 1000).toFixed(1)}k`
        : String(stars);

  return (
    <a
      href={`https://github.com/${username}/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
        className,
      )}
    >
      <GithubLogoIcon className="size-4 shrink-0" />
      <span>Star</span>
      {formatted !== null && (
        <span className="flex items-center gap-0.5 rounded-sm bg-zinc-100 px-1.5 py-0.5 text-xs font-semibold tabular-nums dark:bg-zinc-800">
          <Star className="size-3 fill-yellow-400 stroke-yellow-400" />
          {formatted}
        </span>
      )}
    </a>
  );
}
