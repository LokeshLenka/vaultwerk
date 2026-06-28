export type Browser = "chrome" | "edge" | "firefox" | "brave" | "safari" | "unknown";

export function detectBrowser(): Browser {
  const ua = navigator.userAgent.toLowerCase();

  if ((ua as string).includes("brave")) return "brave";
  if ((ua as string).includes("edg/")) return "edge";
  if ((ua as string).includes("chrome")) return "chrome";
  if ((ua as string).includes("firefox")) return "firefox";
  if ((ua as string).includes("safari")) return "safari";

  return "unknown";
}

export function getBrowserLabel(browser: Browser): string {
  switch (browser) {
    case "chrome": return "Google Chrome";
    case "edge": return "Microsoft Edge";
    case "firefox": return "Mozilla Firefox";
    case "brave": return "Brave";
    case "safari": return "Safari";
    default: return "your browser";
  }
}

export function getBrowserInstructions(browser: Browser) {
  if (browser === "chrome" || browser === "edge") {
    return {
      steps: [
        'Click the popup blocked icon in the address bar.',
        'Select "Always allow popups from this site".',
        'Click Done.',
        'Press Retry below.',
      ],
      iconLabel: "Popup blocked icon in address bar",
    };
  }

  if (browser === "brave") {
    return {
      steps: [
        'Click the Brave Shields icon in the address bar.',
        'Under "Controls", set "Cross-site cookies" to Standard.',
        'Press Retry below.',
      ],
      iconLabel: "Brave Shields icon in address bar",
    };
  }

  if (browser === "firefox") {
    return {
      steps: [
        'Click the popup blocked icon in the address bar.',
        'Select "Allow popups for this site".',
        'Click Save Changes.',
        'Press Retry below.',
      ],
      iconLabel: "Popup blocked icon in address bar",
    };
  }

  if (browser === "safari") {
    return {
      steps: [
        'Click Safari menu > Settings for This Website.',
        'Set "Pop-up Windows" to Allow.',
        'Press Retry below.',
      ],
      iconLabel: "Safari browser settings",
    };
  }

  return {
    steps: [
      'Allow popups for this site in your browser settings.',
      'Press Retry below.',
    ],
    iconLabel: "Browser settings",
  };
}
