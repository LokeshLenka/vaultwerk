/**
 * Rule-based category + tag suggestions for a saved tool.
 *
 * Deliberately dependency-free: a scored keyword map over the page title,
 * description, domain, and URL path. Suggestions only ever *fill empty
 * fields* — the user always wins. Also reused by the bookmark importer.
 */

export type SuggestionInput = {
  title?: string | null;
  description?: string | null;
  url: string;
};

const CATEGORY_RULES: { category: string; patterns: RegExp[] }[] = [
  {
    category: "ai-ml",
    patterns: [
      /\bai\b/, /machine.?learning/, /\bllm\b/, /gpt/, /claude/,
      /artificial intelligence/, /diffusion/, /neural/, /chatbot/,
      /copilot/, /perplexity/, /midjourney/,
    ],
  },
  {
    category: "security",
    patterns: [
      /secur/, /oauth/, /\bvpn\b/, /password/, /encrypt/,
      /firewall/, /pentest/, /\bauth\b/, /zero.?trust/,
    ],
  },
  {
    category: "database",
    patterns: [
      /database/, /postgres/, /mysql/, /mongo/, /redis/, /supabase/,
      /neon/, /\bsql\b/, /vector.?db/, /prisma/, /drizzle/, /sqlite/,
    ],
  },
  {
    category: "testing-qa",
    patterns: [
      /testing/, /\bqa\b/, /cypress/, /playwright/, /jest/, /vitest/,
      /selenium/, /e2e/,
    ],
  },
  {
    category: "design-ui",
    patterns: [
      /figma/, /\bdesign\b/, /\bux\b/, /prototype/, /framer/, /canva/,
      /tailwind/, /font/, /icon/, /color palette/,
    ],
  },
  {
    category: "development",
    patterns: [
      /\bcode\b/, /github/, /gitlab/, /developer/, /programming/,
      /\bnpm\b/, /package/, /\brepo\b/, /\bide\b/, /vscode/,
      /stack ?overflow/,
    ],
  },
  {
    category: "deployment",
    patterns: [
      /vercel/, /netlify/, /hosting/, /\brender\b/, /fly\.io/,
      /railway/, /\bdeploy\b/,
    ],
  },
  {
    category: "devops-infra",
    patterns: [
      /devops/, /kubernetes/, /\bk8s\b/, /docker/, /terraform/,
      /infrastructure/, /\baws\b/, /\bgcp\b/, /azure/, /cloudflare/,
      /\bci\b/, /\bcd\b/, /pipeline/, /serverless/,
    ],
  },
  {
    category: "monitoring",
    patterns: [
      /monitor/, /observability/, /grafana/, /prometheus/, /datadog/,
      /sentry/, /uptime/, /status page/, /logging/,
    ],
  },
  {
    category: "apis-services",
    patterns: [
      /\bapi\b/, /\bsdk\b/, /rest/, /graphql/, /webhook/, /postman/,
      /bruno/, /insomnia/, /stripe/, /twilio/, /resend/,
    ],
  },
  {
    category: "automation",
    patterns: [
      /automat/, /zapier/, /n8n/, /ifttt/, /\bcron\b/, /workflow/,
    ],
  },
  {
    category: "cli-terminal",
    patterns: [
      /\bcli\b/, /terminal/, /\bshell\b/, /command.?line/, /tmux/,
      /neovim/, /\bvim\b/, /warp/, /iterm/, /alacritty/, /\bzsh\b/,
    ],
  },
  {
    category: "notes",
    patterns: [
      /obsidian/, /roam/, /logseq/, /evernote/, /journal/,
      /second brain/, /\bnotes?\b/,
    ],
  },
  {
    category: "knowledge",
    patterns: [
      /knowledge/, /\bwiki\b/, /readwise/, /pocket/, /bookmark/,
      /\bpkm\b/,
    ],
  },
  {
    category: "learning-docs",
    patterns: [
      /documentation/, /\bdocs\b/, /tutorial/, /course/, /handbook/,
      /cheatsheet/, /cookbook/, /learn/,
    ],
  },
  {
    category: "research",
    patterns: [
      /research/, /scholar/, /arxiv/, /papers?/, /search engine/,
    ],
  },
  {
    category: "collaboration",
    patterns: [
      /collaborat/, /whiteboard/, /miro/, /mural/, /team workspace/,
    ],
  },
  {
    category: "communication",
    patterns: [
      /slack/, /discord/, /\bchat\b/, /email/, /\bmeet\b/, /zoom/,
      /message/, /forum/, /video call/,
    ],
  },
  {
    category: "productivity",
    patterns: [
      /productiv/, /\btodo\b/, /task manag/, /kanban/, /pomodoro/,
      /calendar/, /linear/, /trello/, /asana/, /todoist/, /notion/,
    ],
  },
  {
    category: "frontend",
    patterns: [
      /frontend/, /react/, /vue/, /svelte/, /angular/, /next\.?js/,
      /component/, /\bcss\b/,
    ],
  },
  {
    category: "backend",
    patterns: [
      /backend/, /node\.?js/, /django/, /rails/, /laravel/, /fastapi/,
      /express/, /server.?side/, /golang/,
    ],
  },
];

function haystackOf(input: SuggestionInput): string {
  let path = input.url;
  let host = "";
  try {
    const parsed = new URL(input.url);
    path = parsed.pathname.replace(/\//g, " ");
    host = parsed.hostname.replace(/^www\./, "").replace(/\./g, " ");
  } catch {
    // Unparseable URL — the raw string is the only signal.
  }
  return [input.title, input.description, host, path]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/**
 * Highest pattern-match count wins; ties break toward the earlier rule, so
 * distinctive categories (ai-ml, security, database) keep priority. Null
 * means "no confident suggestion".
 */
export function suggestCategory(input: SuggestionInput): string | null {
  const haystack = haystackOf(input);
  if (!haystack.trim()) return null;
  let best: string | null = null;
  let bestScore = 0;
  for (const rule of CATEGORY_RULES) {
    const score = rule.patterns.filter((pattern) =>
      pattern.test(haystack),
    ).length;
    if (score > bestScore) {
      best = rule.category;
      bestScore = score;
    }
  }
  return best;
}

const STOPWORDS = new Set(
  "the,a,an,and,or,for,with,from,that,this,these,those,your,you,yours,our,their,they,them,its,it,is,are,was,were,has,have,had,will,would,can,could,should,all,any,each,more,most,other,some,such,than,then,there,here,when,where,which,while,who,whom,what,how,why,not,but,into,over,after,before,between,through,during,about,against,under,again,once,open,free,best,new,top,online,web,site,website,app,tool,tools,platform,use,used,using,easily,simply,just,like,get,make,made,help,helps,one,two,first,yourself,itself,also,well,much,many,may,might,must,shall,lets,let,per,via,within,without,every,everything,across,home,page,welcome,official".split(
    ",",
  ),
);

/** Topical keyword tags from title + description, most frequent first. */
export function suggestTags(input: SuggestionInput, max = 5): string[] {
  const text = [input.title, input.description].filter(Boolean).join(" ");
  const counts = new Map<string, number>();
  for (const raw of text.toLowerCase().split(/[^a-z0-9+#]+/)) {
    const token = raw.replace(/^[+#]+|[+#]+$/g, "");
    if (token.length < 3 || token.length > 20) continue;
    if (STOPWORDS.has(token)) continue;
    if (/^\d+$/.test(token)) continue;
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  // The domain's own name is usually the best tag ("supabase" beats "open").
  try {
    const host = new URL(input.url).hostname.replace(/^www\./, "");
    const labels = host.split(".");
    const owner = (labels.length > 2 ? labels.slice(1, -1) : labels.slice(0, -1))
      .join("")
      .replace(/[^a-z0-9]/g, "");
    if (owner.length >= 3 && owner.length <= 20 && !STOPWORDS.has(owner)) {
      counts.set(owner, (counts.get(owner) ?? 0) + 2);
    }
  } catch {
    // Unparseable URL — keyword tags only.
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, max)
    .map(([token]) => token);
}
