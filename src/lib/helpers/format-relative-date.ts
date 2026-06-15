export function formatRelativeDate(value?: string | null) {
  if (!value) return "Saved recently";

  const diffDays = Math.floor(
    (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24),
  );

  if (Number.isNaN(diffDays)) return "Saved recently";
  if (diffDays <= 0) return "Saved today";
  if (diffDays === 1) return "Saved yesterday";
  if (diffDays < 7) return `Saved ${diffDays} days ago`;
  if (diffDays < 30) {
    const w = Math.floor(diffDays / 7);
    return `Saved ${w} week${w > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 365) {
    const m = Math.floor(diffDays / 30);
    return `Saved ${m} month${m > 1 ? "s" : ""} ago`;
  }

  const y = Math.floor(diffDays / 365);
  return `Saved ${y} year${y > 1 ? "s" : ""} ago`;
}

