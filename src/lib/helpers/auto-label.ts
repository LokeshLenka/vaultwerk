const docPatterns = ["/docs", "/documentation", "/guide", "/learn", "/api"];
const toolPatterns = ["/tool", "/tools", "/playground", "/editor", "/builder", "/generator"];

export type AutoLabel = "Homepage" | "Documentation" | "Tool" | "Page";

export function getAutoLabel(url: string): AutoLabel {
  try {
    const path = new URL(url).pathname;
    const normalized = path.endsWith("/") ? path : path + "/";

    if (normalized === "/") return "Homepage";

    const lowerPath = path.toLowerCase();

    if (docPatterns.some((p) => lowerPath.startsWith(p))) return "Documentation";
    if (toolPatterns.some((p) => lowerPath.startsWith(p))) return "Tool";

    return "Page";
  } catch {
    return "Page";
  }
}
