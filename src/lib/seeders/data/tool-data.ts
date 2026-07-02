import type { ToolCategory, ToolType } from "../../enums";

export type ToolSeedEntry = {
  name: string;
  url: string;
  category: ToolCategory;
  toolType: ToolType;
  description: string;
  tags: string[];
};

export const TOOL_SEED_DATA: ToolSeedEntry[] = [
  {
    "name": "ChatGPT",
    "url": "https://chatgpt.com",
    "category": "ai",
    "toolType": "website",
    "description": "Conversational AI assistant built on GPT-4 for code generation, writing, analysis, and creative tasks.",
    "tags": [
      "ai",
      "chat",
      "writing",
      "code",
      "research"
    ]
  },
  {
    "name": "Claude",
    "url": "https://claude.ai",
    "category": "ai",
    "toolType": "website",
    "description": "Anthropic AI assistant focused on safety, long-context reasoning, and detailed analysis.",
    "tags": [
      "ai",
      "chat",
      "writing",
      "analysis",
      "research"
    ]
  },
  {
    "name": "Gemini",
    "url": "https://gemini.google.com",
    "category": "ai",
    "toolType": "website",
    "description": "Google multimodal AI assistant for text, images, audio, video, and code understanding.",
    "tags": [
      "ai",
      "chat",
      "multimodal",
      "research",
      "writing"
    ]
  },
  {
    "name": "Perplexity",
    "url": "https://www.perplexity.ai",
    "category": "ai",
    "toolType": "website",
    "description": "AI-powered search engine delivering answers with cited sources and real-time web access.",
    "tags": [
      "ai",
      "search",
      "research",
      "citations"
    ]
  },
  {
    "name": "GitHub Copilot",
    "url": "https://github.com/features/copilot",
    "category": "ai",
    "toolType": "extension",
    "description": "AI pair programmer suggesting code completions and functions in real time across editors.",
    "tags": [
      "ai",
      "code",
      "developer",
      "completion",
      "extension"
    ]
  },
  {
    "name": "Cursor",
    "url": "https://www.cursor.com",
    "category": "ai",
    "toolType": "desktop-app",
    "description": "AI-first code editor with deep context understanding, multi-file editing, and agentic coding support.",
    "tags": [
      "ai",
      "code",
      "editor",
      "developer",
      "agent"
    ]
  },
  {
    "name": "Windsurf",
    "url": "https://codeium.com/windsurf",
    "category": "ai",
    "toolType": "desktop-app",
    "description": "AI-powered IDE with flow-accelerating features and deep codebase awareness.",
    "tags": [
      "ai",
      "code",
      "editor",
      "developer",
      "agent"
    ]
  },
  {
    "name": "Poe",
    "url": "https://poe.com",
    "category": "ai",
    "toolType": "website",
    "description": "Platform for accessing multiple AI models including GPT-4, Claude, Gemini, and custom bots.",
    "tags": [
      "ai",
      "chat",
      "multi-model",
      "research"
    ]
  },
  {
    "name": "You.com",
    "url": "https://you.com",
    "category": "ai",
    "toolType": "website",
    "description": "AI search engine and productivity assistant with chat, code, and image generation modes.",
    "tags": [
      "ai",
      "search",
      "code",
      "chat",
      "productivity"
    ]
  },
  {
    "name": "Phind",
    "url": "https://www.phind.com",
    "category": "ai",
    "toolType": "website",
    "description": "AI search engine for developers answering technical questions with source citations.",
    "tags": [
      "ai",
      "search",
      "developer",
      "code",
      "research"
    ]
  },
  {
    "name": "Cody",
    "url": "https://sourcegraph.com/cody",
    "category": "ai",
    "toolType": "extension",
    "description": "AI coding assistant with full codebase context awareness via Sourcegraph search.",
    "tags": [
      "ai",
      "code",
      "developer",
      "search",
      "extension"
    ]
  },
  {
    "name": "Tabnine",
    "url": "https://www.tabnine.com",
    "category": "ai",
    "toolType": "extension",
    "description": "AI code completion assistant running locally with personalized model training.",
    "tags": [
      "ai",
      "code",
      "completion",
      "developer",
      "extension"
    ]
  },
  {
    "name": "Supermaven",
    "url": "https://supermaven.com",
    "category": "ai",
    "toolType": "extension",
    "description": "Blazingly fast AI code completion engine with large context window support.",
    "tags": [
      "ai",
      "code",
      "completion",
      "developer",
      "fast"
    ]
  },
  {
    "name": "Ollama",
    "url": "https://ollama.ai",
    "category": "ai",
    "toolType": "cli",
    "description": "Run and manage local LLMs including Llama, Mistral, Gemma, and Qwen with simple CLI.",
    "tags": [
      "ai",
      "local",
      "cli",
      "llm",
      "self-hosted"
    ]
  },
  {
    "name": "LM Studio",
    "url": "https://lmstudio.ai",
    "category": "ai",
    "toolType": "desktop-app",
    "description": "Desktop application for running and experimenting with local LLMs via GUI.",
    "tags": [
      "ai",
      "local",
      "desktop",
      "llm",
      "experiment"
    ]
  },
  {
    "name": "Hugging Face",
    "url": "https://huggingface.co",
    "category": "ai",
    "toolType": "website",
    "description": "Platform for hosting, sharing, and deploying machine learning models and datasets.",
    "tags": [
      "ai",
      "ml",
      "models",
      "community",
      "deployment"
    ]
  },
  {
    "name": "Replicate",
    "url": "https://replicate.com",
    "category": "ai",
    "toolType": "api",
    "description": "Cloud API for running and deploying open-source ML models at scale.",
    "tags": [
      "ai",
      "ml",
      "api",
      "deployment",
      "cloud"
    ]
  },
  {
    "name": "Leonardo AI",
    "url": "https://leonardo.ai",
    "category": "ai",
    "toolType": "website",
    "description": "AI image generation platform with fine-tuned models, real-time editing, and training.",
    "tags": [
      "ai",
      "image",
      "generation",
      "design",
      "art"
    ]
  },
  {
    "name": "Midjourney",
    "url": "https://www.midjourney.com",
    "category": "ai",
    "toolType": "website",
    "description": "AI image generation tool known for artistic quality and stylized outputs via Discord.",
    "tags": [
      "ai",
      "image",
      "generation",
      "art",
      "design"
    ]
  },
  {
    "name": "Stable Diffusion WebUI",
    "url": "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    "category": "ai",
    "toolType": "github",
    "description": "Gradio-based browser interface for Stable Diffusion with extensive features.",
    "tags": [
      "ai",
      "image",
      "generation",
      "open-source",
      "self-hosted"
    ]
  },
  {
    "name": "RunwayML",
    "url": "https://runwayml.com",
    "category": "ai",
    "toolType": "website",
    "description": "AI video generation and editing platform for creative professionals and studios.",
    "tags": [
      "ai",
      "video",
      "generation",
      "editing",
      "creative"
    ]
  },
  {
    "name": "ElevenLabs",
    "url": "https://elevenlabs.io",
    "category": "ai",
    "toolType": "website",
    "description": "AI voice synthesis platform with realistic text-to-speech, voice cloning, and dubbing.",
    "tags": [
      "ai",
      "voice",
      "tts",
      "audio",
      "speech"
    ]
  },
  {
    "name": "OpenAI API",
    "url": "https://platform.openai.com",
    "category": "ai",
    "toolType": "api",
    "description": "API access to GPT-4, GPT-4o, DALL-E, Whisper, TTS, and embeddings models.",
    "tags": [
      "ai",
      "api",
      "llm",
      "gpt",
      "developer"
    ]
  },
  {
    "name": "Anthropic Console",
    "url": "https://console.anthropic.com",
    "category": "ai",
    "toolType": "api",
    "description": "API console for Claude models with prompt evaluation, testing, and monitoring tools.",
    "tags": [
      "ai",
      "api",
      "claude",
      "developer",
      "console"
    ]
  },
  {
    "name": "Google AI Studio",
    "url": "https://aistudio.google.com",
    "category": "ai",
    "toolType": "website",
    "description": "Google platform for prototyping with Gemini models and generating API keys.",
    "tags": [
      "ai",
      "api",
      "gemini",
      "prototyping",
      "developer"
    ]
  },
  {
    "name": "Cohere",
    "url": "https://cohere.com",
    "category": "ai",
    "toolType": "api",
    "description": "Enterprise AI platform for text generation, embeddings, reranking, and classification.",
    "tags": [
      "ai",
      "api",
      "llm",
      "embeddings",
      "enterprise"
    ]
  },
  {
    "name": "LlamaIndex",
    "url": "https://www.llamaindex.ai",
    "category": "ai",
    "toolType": "library",
    "description": "Data framework for building LLM applications with indexing, retrieval, and RAG capabilities.",
    "tags": [
      "ai",
      "library",
      "rag",
      "data",
      "llm"
    ]
  },
  {
    "name": "LangChain",
    "url": "https://www.langchain.com",
    "category": "ai",
    "toolType": "library",
    "description": "Framework for developing applications powered by language models with chains and agents.",
    "tags": [
      "ai",
      "library",
      "framework",
      "llm",
      "agent"
    ]
  },
  {
    "name": "CrewAI",
    "url": "https://www.crewai.com",
    "category": "ai",
    "toolType": "library",
    "description": "Framework for orchestrating autonomous AI agents that collaborate on complex tasks.",
    "tags": [
      "ai",
      "library",
      "agent",
      "automation",
      "orchestration"
    ]
  },
  {
    "name": "AutoGPT",
    "url": "https://github.com/Significant-Gravitas/AutoGPT",
    "category": "ai",
    "toolType": "github",
    "description": "Autonomous AI agent that breaks down goals into sub-tasks and executes iteratively.",
    "tags": [
      "ai",
      "agent",
      "automation",
      "open-source",
      "goals"
    ]
  },
  {
    "name": "Continue.dev",
    "url": "https://continue.dev",
    "category": "ai",
    "toolType": "extension",
    "description": "Open-source AI code assistant connecting local and cloud models in your IDE.",
    "tags": [
      "ai",
      "code",
      "extension",
      "open-source",
      "assistant"
    ]
  },
  {
    "name": "OpenAI Whisper",
    "url": "https://github.com/openai/whisper",
    "category": "ai",
    "toolType": "github",
    "description": "Open-source speech recognition model for transcription and translation.",
    "tags": [
      "ai",
      "speech",
      "transcription",
      "open-source",
      "audio"
    ]
  },
  {
    "name": "VS Code",
    "url": "https://code.visualstudio.com",
    "category": "development",
    "toolType": "desktop-app",
    "description": "Lightweight source code editor with rich extension ecosystem and built-in Git.",
    "tags": [
      "editor",
      "code",
      "developer",
      "ide",
      "extension"
    ]
  },
  {
    "name": "VSCode Insiders",
    "url": "https://code.visualstudio.com/insiders",
    "category": "development",
    "toolType": "desktop-app",
    "description": "Daily build of VS Code with latest features, fixes, and experimental APIs.",
    "tags": [
      "editor",
      "code",
      "developer",
      "nightly",
      "preview"
    ]
  },
  {
    "name": "Zed",
    "url": "https://zed.dev",
    "category": "development",
    "toolType": "desktop-app",
    "description": "High-performance code editor in Rust with GPU-accelerated rendering and AI.",
    "tags": [
      "editor",
      "code",
      "developer",
      "rust",
      "performance"
    ]
  },
  {
    "name": "Neovim",
    "url": "https://neovim.io",
    "category": "development",
    "toolType": "cli",
    "description": "Modern Vim fork with Lua scripting, async I/O, and plugin architecture.",
    "tags": [
      "editor",
      "code",
      "cli",
      "vim",
      "terminal"
    ]
  },
  {
    "name": "IntelliJ IDEA",
    "url": "https://www.jetbrains.com/idea",
    "category": "development",
    "toolType": "desktop-app",
    "description": "JetBrains IDE for JVM languages with deep code analysis and refactoring.",
    "tags": [
      "editor",
      "ide",
      "java",
      "kotlin",
      "developer"
    ]
  },
  {
    "name": "WebStorm",
    "url": "https://www.jetbrains.com/webstorm",
    "category": "development",
    "toolType": "desktop-app",
    "description": "JetBrains IDE for JavaScript, TypeScript, and web development.",
    "tags": [
      "editor",
      "ide",
      "javascript",
      "typescript",
      "web"
    ]
  },
  {
    "name": "PyCharm",
    "url": "https://www.jetbrains.com/pycharm",
    "category": "development",
    "toolType": "desktop-app",
    "description": "JetBrains IDE for Python with scientific tools, refactoring, and debugging.",
    "tags": [
      "editor",
      "ide",
      "python",
      "science",
      "developer"
    ]
  },
  {
    "name": "GoLand",
    "url": "https://www.jetbrains.com/go",
    "category": "development",
    "toolType": "desktop-app",
    "description": "JetBrains IDE for Go development with code analysis, debugging, and testing.",
    "tags": [
      "editor",
      "ide",
      "go",
      "golang",
      "developer"
    ]
  },
  {
    "name": "RustRover",
    "url": "https://www.jetbrains.com/rust",
    "category": "development",
    "toolType": "desktop-app",
    "description": "JetBrains IDE for Rust with Cargo integration and advanced refactoring.",
    "tags": [
      "editor",
      "ide",
      "rust",
      "developer",
      "cargo"
    ]
  },
  {
    "name": "Android Studio",
    "url": "https://developer.android.com/studio",
    "category": "development",
    "toolType": "desktop-app",
    "description": "Official IDE for Android with emulator, profilers, and layout editor.",
    "tags": [
      "editor",
      "ide",
      "android",
      "mobile",
      "kotlin"
    ]
  },
  {
    "name": "Xcode",
    "url": "https://developer.apple.com/xcode",
    "category": "development",
    "toolType": "desktop-app",
    "description": "Apple IDE for macOS, iOS, watchOS, and tvOS with Swift and Objective-C.",
    "tags": [
      "editor",
      "ide",
      "apple",
      "swift",
      "ios"
    ]
  },
  {
    "name": "Sublime Text",
    "url": "https://www.sublimetext.com",
    "category": "development",
    "toolType": "desktop-app",
    "description": "Fast text editor for code with extensive customization and cross-platform support.",
    "tags": [
      "editor",
      "code",
      "lightweight",
      "fast",
      "customizable"
    ]
  },
  {
    "name": "Helix",
    "url": "https://helix-editor.com",
    "category": "development",
    "toolType": "cli",
    "description": "Modal terminal editor with built-in LSP, tree-sitter, and kakoune-style editing.",
    "tags": [
      "editor",
      "code",
      "terminal",
      "modal",
      "lsp"
    ]
  },
  {
    "name": "Emacs",
    "url": "https://www.gnu.org/software/emacs",
    "category": "development",
    "toolType": "desktop-app",
    "description": "Extensible customizable text editor with Lisp scripting and vast ecosystem.",
    "tags": [
      "editor",
      "code",
      "lisp",
      "extensible",
      "terminal"
    ]
  },
  {
    "name": "Vim",
    "url": "https://www.vim.org",
    "category": "development",
    "toolType": "cli",
    "description": "Highly configurable terminal text editor with efficient modal editing.",
    "tags": [
      "editor",
      "code",
      "terminal",
      "modal",
      "classic"
    ]
  },
  {
    "name": "React",
    "url": "https://react.dev",
    "category": "frontend",
    "toolType": "library",
    "description": "UI library for building interactive user interfaces with declarative components.",
    "tags": [
      "frontend",
      "library",
      "ui",
      "javascript",
      "component"
    ]
  },
  {
    "name": "Next.js",
    "url": "https://nextjs.org",
    "category": "frontend",
    "toolType": "library",
    "description": "React framework for production with SSR, static generation, and App Router.",
    "tags": [
      "frontend",
      "framework",
      "react",
      "ssr",
      "fullstack"
    ]
  },
  {
    "name": "Vue.js",
    "url": "https://vuejs.org",
    "category": "frontend",
    "toolType": "library",
    "description": "Progressive JavaScript framework with composable component architecture.",
    "tags": [
      "frontend",
      "framework",
      "javascript",
      "reactive",
      "component"
    ]
  },
  {
    "name": "Nuxt",
    "url": "https://nuxt.com",
    "category": "frontend",
    "toolType": "library",
    "description": "Full-stack Vue framework with SSR, static generation, and modules.",
    "tags": [
      "frontend",
      "framework",
      "vue",
      "ssr",
      "fullstack"
    ]
  },
  {
    "name": "Svelte",
    "url": "https://svelte.dev",
    "category": "frontend",
    "toolType": "library",
    "description": "Compiler-based UI framework producing minimal JavaScript with reactive updates.",
    "tags": [
      "frontend",
      "framework",
      "compiler",
      "reactive",
      "performant"
    ]
  },
  {
    "name": "SvelteKit",
    "url": "https://kit.svelte.dev",
    "category": "frontend",
    "toolType": "library",
    "description": "Svelte app framework with SSR, routing, form actions, and adapters.",
    "tags": [
      "frontend",
      "framework",
      "svelte",
      "ssr",
      "fullstack"
    ]
  },
  {
    "name": "Angular",
    "url": "https://angular.dev",
    "category": "frontend",
    "toolType": "library",
    "description": "Google app framework with TypeScript, dependency injection, and RxJS.",
    "tags": [
      "frontend",
      "framework",
      "typescript",
      "enterprise",
      "spa"
    ]
  },
  {
    "name": "SolidJS",
    "url": "https://www.solidjs.com",
    "category": "frontend",
    "toolType": "library",
    "description": "Reactive UI library with fine-grained reactivity and no virtual DOM.",
    "tags": [
      "frontend",
      "library",
      "reactive",
      "performant",
      "signals"
    ]
  },
  {
    "name": "Qwik",
    "url": "https://qwik.dev",
    "category": "frontend",
    "toolType": "library",
    "description": "Resumable framework delivering instant loading with fine-grained lazy loading.",
    "tags": [
      "frontend",
      "framework",
      "resumable",
      "fast",
      "hydration-free"
    ]
  },
  {
    "name": "Astro",
    "url": "https://astro.build",
    "category": "frontend",
    "toolType": "library",
    "description": "Content-focused web framework shipping zero JS by default with island architecture.",
    "tags": [
      "frontend",
      "framework",
      "static",
      "content",
      "islands"
    ]
  },
  {
    "name": "Remix",
    "url": "https://remix.run",
    "category": "frontend",
    "toolType": "library",
    "description": "Web framework on Web Standards with nested routes, loaders, and actions.",
    "tags": [
      "frontend",
      "framework",
      "web-standards",
      "fullstack",
      "nested-routes"
    ]
  },
  {
    "name": "Gatsby",
    "url": "https://www.gatsbyjs.com",
    "category": "frontend",
    "toolType": "library",
    "description": "React static site generator with GraphQL data layer and plugin ecosystem.",
    "tags": [
      "frontend",
      "framework",
      "static",
      "graphql",
      "react"
    ]
  },
  {
    "name": "Vite",
    "url": "https://vite.dev",
    "category": "frontend",
    "toolType": "cli",
    "description": "Build tool with instant HMR, native ESM dev server, and Rollup bundling.",
    "tags": [
      "frontend",
      "build",
      "bundler",
      "dev-server",
      "fast"
    ]
  },
  {
    "name": "Tailwind CSS",
    "url": "https://tailwindcss.com",
    "category": "frontend",
    "toolType": "library",
    "description": "Utility-first CSS framework for rapid UI with design system constraints.",
    "tags": [
      "frontend",
      "css",
      "utility",
      "design",
      "responsive"
    ]
  },
  {
    "name": "shadcn/ui",
    "url": "https://ui.shadcn.com",
    "category": "frontend",
    "toolType": "library",
    "description": "Reusable component collection with Radix UI and Tailwind CSS.",
    "tags": [
      "frontend",
      "ui",
      "components",
      "tailwind",
      "radix"
    ]
  },
  {
    "name": "Radix UI",
    "url": "https://www.radix-ui.com",
    "category": "frontend",
    "toolType": "library",
    "description": "Unstyled accessible component primitives for design systems in React.",
    "tags": [
      "frontend",
      "ui",
      "accessibility",
      "primitives",
      "react"
    ]
  },
  {
    "name": "Framer Motion",
    "url": "https://www.framer.com/motion",
    "category": "frontend",
    "toolType": "library",
    "description": "Declarative animation library for React with gestures and layout animations.",
    "tags": [
      "frontend",
      "animation",
      "react",
      "motion",
      "gestures"
    ]
  },
  {
    "name": "Three.js",
    "url": "https://threejs.org",
    "category": "frontend",
    "toolType": "library",
    "description": "JavaScript 3D library for GPU-accelerated 3D graphics in the browser.",
    "tags": [
      "frontend",
      "3d",
      "graphics",
      "webgl",
      "rendering"
    ]
  },
  {
    "name": "D3.js",
    "url": "https://d3js.org",
    "category": "frontend",
    "toolType": "library",
    "description": "Data visualization library for dynamic interactive SVG charts and graphics.",
    "tags": [
      "frontend",
      "data",
      "visualization",
      "svg",
      "charts"
    ]
  },
  {
    "name": "GSAP",
    "url": "https://gsap.com",
    "category": "frontend",
    "toolType": "library",
    "description": "Professional animation library for high-performance web animations.",
    "tags": [
      "frontend",
      "animation",
      "performance",
      "timeline",
      "motion"
    ]
  },
  {
    "name": "Zustand",
    "url": "https://zustand-demo.pmnd.rs",
    "category": "frontend",
    "toolType": "library",
    "description": "Tiny fast state management for React with minimal API and middleware.",
    "tags": [
      "frontend",
      "state",
      "react",
      "store",
      "lightweight"
    ]
  },
  {
    "name": "TanStack Query",
    "url": "https://tanstack.com/query/latest",
    "category": "frontend",
    "toolType": "library",
    "description": "Async state management for server data with caching and optimistic updates.",
    "tags": [
      "frontend",
      "data",
      "query",
      "cache",
      "server-state"
    ]
  },
  {
    "name": "TanStack Router",
    "url": "https://tanstack.com/router/latest",
    "category": "frontend",
    "toolType": "library",
    "description": "Type-safe router for React with file-based routing and search params.",
    "tags": [
      "frontend",
      "routing",
      "typescript",
      "react",
      "type-safe"
    ]
  },
  {
    "name": "Recharts",
    "url": "https://recharts.org",
    "category": "frontend",
    "toolType": "library",
    "description": "Composable React charting library built on D3 with responsive animations.",
    "tags": [
      "frontend",
      "charts",
      "react",
      "d3",
      "visualization"
    ]
  },
  {
    "name": "tRPC",
    "url": "https://trpc.io",
    "category": "frontend",
    "toolType": "library",
    "description": "End-to-end type-safe RPC for TypeScript with automatic type inference.",
    "tags": [
      "frontend",
      "api",
      "typescript",
      "rpc",
      "fullstack"
    ]
  },
  {
    "name": "Node.js",
    "url": "https://nodejs.org",
    "category": "backend",
    "toolType": "cli",
    "description": "JavaScript runtime on V8 engine for scalable server-side applications.",
    "tags": [
      "backend",
      "runtime",
      "javascript",
      "server",
      "event-driven"
    ]
  },
  {
    "name": "Deno",
    "url": "https://deno.com",
    "category": "backend",
    "toolType": "cli",
    "description": "Secure JS/TS runtime with native TypeScript, modules, and permissions.",
    "tags": [
      "backend",
      "runtime",
      "typescript",
      "security",
      "modules"
    ]
  },
  {
    "name": "Bun",
    "url": "https://bun.sh",
    "category": "backend",
    "toolType": "cli",
    "description": "All-in-one JS runtime with bundler, test runner, and npm-compatible PM.",
    "tags": [
      "backend",
      "runtime",
      "javascript",
      "fast",
      "all-in-one"
    ]
  },
  {
    "name": "Express",
    "url": "https://expressjs.com",
    "category": "backend",
    "toolType": "library",
    "description": "Fast unopinionated web framework for Node.js with middleware architecture.",
    "tags": [
      "backend",
      "framework",
      "node",
      "api",
      "middleware"
    ]
  },
  {
    "name": "Fastify",
    "url": "https://fastify.dev",
    "category": "backend",
    "toolType": "library",
    "description": "Low-overhead Node.js web framework with schema validation and serialization.",
    "tags": [
      "backend",
      "framework",
      "node",
      "api",
      "performance"
    ]
  },
  {
    "name": "Hono",
    "url": "https://hono.dev",
    "category": "backend",
    "toolType": "library",
    "description": "Ultralight web framework for Node, Deno, Bun, and Cloudflare Workers.",
    "tags": [
      "backend",
      "framework",
      "edge",
      "multi-runtime",
      "lightweight"
    ]
  },
  {
    "name": "NestJS",
    "url": "https://nestjs.com",
    "category": "backend",
    "toolType": "library",
    "description": "Progressive Node.js framework for efficient enterprise server apps.",
    "tags": [
      "backend",
      "framework",
      "node",
      "typescript",
      "enterprise"
    ]
  },
  {
    "name": "Koa",
    "url": "https://koajs.com",
    "category": "backend",
    "toolType": "library",
    "description": "Next-gen Node.js web framework with async middleware composition.",
    "tags": [
      "backend",
      "framework",
      "node",
      "async",
      "middleware"
    ]
  },
  {
    "name": "AdonisJS",
    "url": "https://adonisjs.com",
    "category": "backend",
    "toolType": "library",
    "description": "Full-stack Node.js framework with opinionated MVC architecture.",
    "tags": [
      "backend",
      "framework",
      "node",
      "mvc",
      "fullstack"
    ]
  },
  {
    "name": "FastAPI",
    "url": "https://fastapi.tiangolo.com",
    "category": "backend",
    "toolType": "library",
    "description": "Modern Python web framework for APIs with automatic OpenAPI docs.",
    "tags": [
      "backend",
      "framework",
      "python",
      "api",
      "async"
    ]
  },
  {
    "name": "Flask",
    "url": "https://flask.palletsprojects.com",
    "category": "backend",
    "toolType": "library",
    "description": "Lightweight Python web framework with extensible design for web apps.",
    "tags": [
      "backend",
      "framework",
      "python",
      "lightweight",
      "micro"
    ]
  },
  {
    "name": "Django",
    "url": "https://www.djangoproject.com",
    "category": "backend",
    "toolType": "library",
    "description": "High-level Python framework with batteries-included ORM and admin.",
    "tags": [
      "backend",
      "framework",
      "python",
      "batteries-included",
      "orm"
    ]
  },
  {
    "name": "Rails",
    "url": "https://rubyonrails.org",
    "category": "backend",
    "toolType": "library",
    "description": "Full-stack Ruby framework with convention-over-configuration philosophy.",
    "tags": [
      "backend",
      "framework",
      "ruby",
      "mvc",
      "fullstack"
    ]
  },
  {
    "name": "Phoenix",
    "url": "https://www.phoenixframework.org",
    "category": "backend",
    "toolType": "library",
    "description": "Elixir web framework with real-time features and fault tolerance.",
    "tags": [
      "backend",
      "framework",
      "elixir",
      "realtime",
      "fault-tolerant"
    ]
  },
  {
    "name": "Spring Boot",
    "url": "https://spring.io/projects/spring-boot",
    "category": "backend",
    "toolType": "library",
    "description": "Java framework for production-grade Spring applications with embedded servers.",
    "tags": [
      "backend",
      "framework",
      "java",
      "enterprise",
      "microservices"
    ]
  },
  {
    "name": "GraphQL",
    "url": "https://graphql.org",
    "category": "backend",
    "toolType": "library",
    "description": "API query language for declarative data fetching with strong types.",
    "tags": [
      "backend",
      "api",
      "query-language",
      "types",
      "data-fetching"
    ]
  },
  {
    "name": "Apollo GraphQL",
    "url": "https://www.apollographql.com",
    "category": "backend",
    "toolType": "library",
    "description": "GraphQL platform with client/server libraries for data management.",
    "tags": [
      "backend",
      "graphql",
      "api",
      "federation",
      "client"
    ]
  },
  {
    "name": "Hasura",
    "url": "https://hasura.io",
    "category": "backend",
    "toolType": "saas",
    "description": "Instant real-time GraphQL API on any database with auth and remote joins.",
    "tags": [
      "backend",
      "graphql",
      "api",
      "database",
      "realtime"
    ]
  },
  {
    "name": "Supabase",
    "url": "https://supabase.com",
    "category": "database",
    "toolType": "saas",
    "description": "Open-source Firebase alternative with PostgreSQL, realtime, and RLS.",
    "tags": [
      "database",
      "postgres",
      "realtime",
      "auth",
      "storage"
    ]
  },
  {
    "name": "Neon",
    "url": "https://neon.tech",
    "category": "database",
    "toolType": "saas",
    "description": "Serverless PostgreSQL with branching and compute-storage separation.",
    "tags": [
      "database",
      "postgres",
      "serverless",
      "branching",
      "cloud"
    ]
  },
  {
    "name": "PlanetScale",
    "url": "https://planetscale.com",
    "category": "database",
    "toolType": "saas",
    "description": "MySQL-compatible serverless database with branching workflows.",
    "tags": [
      "database",
      "mysql",
      "serverless",
      "branching",
      "schema"
    ]
  },
  {
    "name": "MongoDB Atlas",
    "url": "https://www.mongodb.com/atlas",
    "category": "database",
    "toolType": "saas",
    "description": "Managed global MongoDB cloud database with search and analytics.",
    "tags": [
      "database",
      "mongodb",
      "cloud",
      "nosql",
      "managed"
    ]
  },
  {
    "name": "Redis Cloud",
    "url": "https://redis.com",
    "category": "database",
    "toolType": "saas",
    "description": "Managed Redis service with caching, pub/sub, search, and JSON.",
    "tags": [
      "database",
      "redis",
      "cache",
      "cloud",
      "pub-sub"
    ]
  },
  {
    "name": "CockroachDB",
    "url": "https://www.cockroachlabs.com",
    "category": "database",
    "toolType": "saas",
    "description": "Distributed SQL database with scale, survivability, and consistency.",
    "tags": [
      "database",
      "sql",
      "distributed",
      "scalable",
      "cloud"
    ]
  },
  {
    "name": "TiDB",
    "url": "https://tidbcloud.com",
    "category": "database",
    "toolType": "saas",
    "description": "Hybrid transactional/analytical database compatible with MySQL.",
    "tags": [
      "database",
      "sql",
      "htap",
      "mysql",
      "distributed"
    ]
  },
  {
    "name": "DuckDB",
    "url": "https://duckdb.org",
    "category": "database",
    "toolType": "library",
    "description": "Embedded analytical SQL database for OLAP and data science.",
    "tags": [
      "database",
      "sql",
      "analytics",
      "embedded",
      "olap"
    ]
  },
  {
    "name": "SQLite",
    "url": "https://www.sqlite.org",
    "category": "database",
    "toolType": "library",
    "description": "Self-contained zero-config SQL database engine embeddable anywhere.",
    "tags": [
      "database",
      "sql",
      "embedded",
      "lightweight",
      "file-based"
    ]
  },
  {
    "name": "PostgreSQL",
    "url": "https://www.postgresql.org",
    "category": "database",
    "toolType": "cli",
    "description": "Advanced open-source relational database with extensibility.",
    "tags": [
      "database",
      "sql",
      "relational",
      "open-source",
      "extensible"
    ]
  },
  {
    "name": "MySQL",
    "url": "https://www.mysql.com",
    "category": "database",
    "toolType": "cli",
    "description": "Popular open-source relational database management system.",
    "tags": [
      "database",
      "sql",
      "relational",
      "open-source",
      "popular"
    ]
  },
  {
    "name": "MariaDB",
    "url": "https://mariadb.org",
    "category": "database",
    "toolType": "cli",
    "description": "Community-developed MySQL-compatible relational database.",
    "tags": [
      "database",
      "sql",
      "relational",
      "open-source",
      "mysql-compatible"
    ]
  },
  {
    "name": "Prisma",
    "url": "https://www.prisma.io",
    "category": "database",
    "toolType": "cli",
    "description": "Next-gen ORM for TypeScript with auto-generated queries and migrations.",
    "tags": [
      "database",
      "orm",
      "typescript",
      "node",
      "migrations"
    ]
  },
  {
    "name": "Drizzle ORM",
    "url": "https://orm.drizzle.team",
    "category": "database",
    "toolType": "library",
    "description": "TypeScript ORM with SQL-like API and full type safety.",
    "tags": [
      "database",
      "orm",
      "typescript",
      "sql",
      "type-safe"
    ]
  },
  {
    "name": "Kysely",
    "url": "https://kysely.dev",
    "category": "database",
    "toolType": "library",
    "description": "Type-safe SQL query builder for TypeScript with introspection.",
    "tags": [
      "database",
      "sql",
      "query-builder",
      "typescript",
      "type-safe"
    ]
  },
  {
    "name": "Mongoose",
    "url": "https://mongoosejs.com",
    "category": "database",
    "toolType": "library",
    "description": "Elegant MongoDB object modeling for Node.js with schema validation.",
    "tags": [
      "database",
      "mongodb",
      "orm",
      "node",
      "schema"
    ]
  },
  {
    "name": "TablePlus",
    "url": "https://tableplus.com",
    "category": "database",
    "toolType": "desktop-app",
    "description": "Modern native database GUI for MySQL, Postgres, Redis, and more.",
    "tags": [
      "database",
      "gui",
      "editor",
      "native",
      "multi-engine"
    ]
  },
  {
    "name": "DBeaver",
    "url": "https://dbeaver.io",
    "category": "database",
    "toolType": "desktop-app",
    "description": "Universal database management tool for many database engines.",
    "tags": [
      "database",
      "gui",
      "management",
      "cross-platform",
      "universal"
    ]
  },
  {
    "name": "Beekeeper Studio",
    "url": "https://www.beekeeperstudio.io",
    "category": "database",
    "toolType": "desktop-app",
    "description": "Open-source SQL editor for MySQL, Postgres, SQLite, and SQL Server.",
    "tags": [
      "database",
      "gui",
      "sql",
      "editor",
      "open-source"
    ]
  },
  {
    "name": "Redis Insight",
    "url": "https://redis.com/redis-enterprise/redis-insight",
    "category": "database",
    "toolType": "desktop-app",
    "description": "Official Redis GUI for visualizing Redis data structures.",
    "tags": [
      "database",
      "redis",
      "gui",
      "visualization",
      "management"
    ]
  },
  {
    "name": "Drizzle Studio",
    "url": "https://orm.drizzle.team/drizzle-studio",
    "category": "database",
    "toolType": "website",
    "description": "Browser SQL editor for Drizzle with schema visualization.",
    "tags": [
      "database",
      "sql",
      "editor",
      "browser",
      "schema"
    ]
  },
  {
    "name": "Cloudflare D1",
    "url": "https://www.cloudflare.com/developer-platform/d1",
    "category": "database",
    "toolType": "saas",
    "description": "Serverless SQLite database on Cloudflare edge network.",
    "tags": [
      "database",
      "sqlite",
      "serverless",
      "edge",
      "cloudflare"
    ]
  },
  {
    "name": "Turso",
    "url": "https://turso.tech",
    "category": "database",
    "toolType": "saas",
    "description": "Edge-hosted SQLite with per-row replication and sub-ms latency.",
    "tags": [
      "database",
      "sqlite",
      "edge",
      "replication",
      "fast"
    ]
  },
  {
    "name": "InfluxDB",
    "url": "https://www.influxdata.com",
    "category": "database",
    "toolType": "saas",
    "description": "Time-series database for metrics, events, and real-time analytics.",
    "tags": [
      "database",
      "time-series",
      "metrics",
      "analytics",
      "monitoring"
    ]
  },
  {
    "name": "ClickHouse",
    "url": "https://clickhouse.com",
    "category": "database",
    "toolType": "saas",
    "description": "Column-oriented analytical database for real-time big data queries.",
    "tags": [
      "database",
      "analytics",
      "columnar",
      "real-time",
      "olap"
    ]
  },
  {
    "name": "Fauna",
    "url": "https://fauna.com",
    "category": "database",
    "toolType": "saas",
    "description": "Document-relational database with native GraphQL and serverless.",
    "tags": [
      "database",
      "document",
      "graphql",
      "serverless",
      "temporal"
    ]
  },
  {
    "name": "SurrealDB",
    "url": "https://surrealdb.com",
    "category": "database",
    "toolType": "saas",
    "description": "Multi-model database combining document, graph, and relational.",
    "tags": [
      "database",
      "multi-model",
      "graph",
      "realtime",
      "document"
    ]
  },
  {
    "name": "Neo4j",
    "url": "https://neo4j.com",
    "category": "database",
    "toolType": "saas",
    "description": "Leading graph database with Cypher query language.",
    "tags": [
      "database",
      "graph",
      "cypher",
      "relationships",
      "nosql"
    ]
  },
  {
    "name": "TimescaleDB",
    "url": "https://www.timescale.com",
    "category": "database",
    "toolType": "saas",
    "description": "Time-series SQL on PostgreSQL with partitioning and compression.",
    "tags": [
      "database",
      "time-series",
      "postgres",
      "analytics",
      "compression"
    ]
  },
  {
    "name": "PocketBase",
    "url": "https://pocketbase.io",
    "category": "database",
    "toolType": "saas",
    "description": "Open-source backend with embedded SQLite, realtime, and file storage.",
    "tags": [
      "database",
      "backend",
      "sqlite",
      "realtime",
      "auth"
    ]
  },
  {
    "name": "Directus",
    "url": "https://directus.io",
    "category": "database",
    "toolType": "saas",
    "description": "Open-source headless CMS wrapping any SQL database with REST/GraphQL.",
    "tags": [
      "database",
      "cms",
      "headless",
      "api",
      "admin"
    ]
  },
  {
    "name": "Strapi",
    "url": "https://strapi.io",
    "category": "database",
    "toolType": "saas",
    "description": "Open-source headless CMS built with Node.js and customizable admin.",
    "tags": [
      "database",
      "cms",
      "headless",
      "node",
      "api"
    ]
  },
  {
    "name": "Sanity",
    "url": "https://www.sanity.io",
    "category": "database",
    "toolType": "saas",
    "description": "Structured content platform with real-time editor and GROQ queries.",
    "tags": [
      "database",
      "cms",
      "real-time",
      "content",
      "api"
    ]
  },
  {
    "name": "Payload CMS",
    "url": "https://payloadcms.com",
    "category": "database",
    "toolType": "saas",
    "description": "TypeScript headless CMS with React admin and MongoDB.",
    "tags": [
      "database",
      "cms",
      "typescript",
      "react",
      "admin"
    ]
  },
  {
    "name": "Docker",
    "url": "https://www.docker.com",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Container platform for packaging and distributing applications.",
    "tags": [
      "devops",
      "containers",
      "docker",
      "deployment",
      "cli"
    ]
  },
  {
    "name": "Kubernetes",
    "url": "https://kubernetes.io",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Container orchestration for deployment, scaling, and management.",
    "tags": [
      "devops",
      "containers",
      "k8s",
      "orchestration",
      "scaling"
    ]
  },
  {
    "name": "Terraform",
    "url": "https://www.terraform.io",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Infrastructure as Code tool for declarative cloud infrastructure.",
    "tags": [
      "devops",
      "iac",
      "terraform",
      "cloud",
      "infrastructure"
    ]
  },
  {
    "name": "OpenTofu",
    "url": "https://opentofu.org",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Open-source Terraform fork with Linux Foundation governance.",
    "tags": [
      "devops",
      "iac",
      "open-source",
      "terraform",
      "community"
    ]
  },
  {
    "name": "Pulumi",
    "url": "https://www.pulumi.com",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "IaC using TypeScript, Python, Go, and other familiar languages.",
    "tags": [
      "devops",
      "iac",
      "typescript",
      "cloud",
      "programming"
    ]
  },
  {
    "name": "Ansible",
    "url": "https://www.ansible.com",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "IT automation for configuration management and deployment.",
    "tags": [
      "devops",
      "automation",
      "configuration",
      "playbooks",
      "agentless"
    ]
  },
  {
    "name": "Helm",
    "url": "https://helm.sh",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Kubernetes package manager with charts for app deployment.",
    "tags": [
      "devops",
      "k8s",
      "packaging",
      "charts",
      "deployment"
    ]
  },
  {
    "name": "ArgoCD",
    "url": "https://argoproj.github.io/cd",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Declarative GitOps CD for Kubernetes with auto-sync.",
    "tags": [
      "devops",
      "gitops",
      "k8s",
      "cd",
      "declarative"
    ]
  },
  {
    "name": "FluxCD",
    "url": "https://fluxcd.io",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "GitOps operator automating K8s deployment from Git repos.",
    "tags": [
      "devops",
      "gitops",
      "k8s",
      "automation",
      "sync"
    ]
  },
  {
    "name": "Crossplane",
    "url": "https://www.crossplane.io",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "CNCF project for building cloud-native control planes on K8s.",
    "tags": [
      "devops",
      "cloud",
      "control-plane",
      "k8s",
      "cncf"
    ]
  },
  {
    "name": "Nix",
    "url": "https://nixos.org",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Functional package manager with reproducible builds.",
    "tags": [
      "devops",
      "package-manager",
      "reproducible",
      "declarative",
      "functional"
    ]
  },
  {
    "name": "Podman",
    "url": "https://podman.io",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Daemonless container engine with rootless operation.",
    "tags": [
      "devops",
      "containers",
      "daemonless",
      "rootless",
      "oci"
    ]
  },
  {
    "name": "Vagrant",
    "url": "https://www.vagrantup.com",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Portable VM environment management with declarative provisioning.",
    "tags": [
      "devops",
      "vm",
      "virtualization",
      "development",
      "environment"
    ]
  },
  {
    "name": "Packer",
    "url": "https://www.packer.io",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Create identical machine images for multiple platforms.",
    "tags": [
      "devops",
      "images",
      "ami",
      "vm",
      "automation"
    ]
  },
  {
    "name": "Kustomize",
    "url": "https://kustomize.io",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "K8s config customization using overlays without templates.",
    "tags": [
      "devops",
      "k8s",
      "configuration",
      "overlays",
      "customization"
    ]
  },
  {
    "name": "BuildKit",
    "url": "https://github.com/moby/buildkit",
    "category": "devops-infra",
    "toolType": "cli",
    "description": "Concurrent cache-efficient Docker image build engine.",
    "tags": [
      "devops",
      "build",
      "docker",
      "cache",
      "concurrent"
    ]
  },
  {
    "name": "GitHub Actions",
    "url": "https://github.com/features/actions",
    "category": "deployment",
    "toolType": "saas",
    "description": "CI/CD platform integrated with GitHub for build/test/deploy automation.",
    "tags": [
      "ci",
      "cd",
      "github",
      "automation",
      "workflows"
    ]
  },
  {
    "name": "GitLab CI/CD",
    "url": "https://docs.gitlab.com/ee/ci",
    "category": "deployment",
    "toolType": "saas",
    "description": "Built-in CI/CD pipelines with auto-scaling runners and review apps.",
    "tags": [
      "ci",
      "cd",
      "gitlab",
      "pipeline",
      "runners"
    ]
  },
  {
    "name": "CircleCI",
    "url": "https://circleci.com",
    "category": "deployment",
    "toolType": "saas",
    "description": "CI/CD with parallel execution, caching, and Docker support.",
    "tags": [
      "ci",
      "cd",
      "automation",
      "parallel",
      "pipelines"
    ]
  },
  {
    "name": "Jenkins",
    "url": "https://www.jenkins.io",
    "category": "deployment",
    "toolType": "cli",
    "description": "Self-hosted automation server with pipeline-as-code and plugins.",
    "tags": [
      "ci",
      "cd",
      "automation",
      "self-hosted",
      "plugins"
    ]
  },
  {
    "name": "Buildkite",
    "url": "https://buildkite.com",
    "category": "deployment",
    "toolType": "saas",
    "description": "Hybrid CI/CD combining your infrastructure with managed orchestration.",
    "tags": [
      "ci",
      "cd",
      "hybrid",
      "pipelines",
      "self-hosted"
    ]
  },
  {
    "name": "Semaphore CI",
    "url": "https://semaphoreci.com",
    "category": "deployment",
    "toolType": "saas",
    "description": "CI/CD with fast parallel execution and Docker support.",
    "tags": [
      "ci",
      "cd",
      "parallel",
      "docker",
      "pipelines"
    ]
  },
  {
    "name": "Codefresh",
    "url": "https://codefresh.io",
    "category": "deployment",
    "toolType": "saas",
    "description": "Kubernetes CI/CD with ArgoCD integration and GitOps.",
    "tags": [
      "ci",
      "cd",
      "k8s",
      "gitops",
      "docker"
    ]
  },
  {
    "name": "Railway",
    "url": "https://railway.app",
    "category": "deployment",
    "toolType": "saas",
    "description": "Deployment platform with auto-builds, env variables, and one-click deploys.",
    "tags": [
      "deployment",
      "hosting",
      "auto-deploy",
      "developer",
      "cloud"
    ]
  },
  {
    "name": "Vercel",
    "url": "https://vercel.com",
    "category": "deployment",
    "toolType": "saas",
    "description": "Frontend deployment with serverless functions, edge caching, and SSL.",
    "tags": [
      "deployment",
      "hosting",
      "serverless",
      "edge",
      "frontend"
    ]
  },
  {
    "name": "Netlify",
    "url": "https://www.netlify.com",
    "category": "deployment",
    "toolType": "saas",
    "description": "Web deployment with CD, serverless functions, and split testing.",
    "tags": [
      "deployment",
      "hosting",
      "serverless",
      "cdn",
      "jamstack"
    ]
  },
  {
    "name": "Cloudflare Pages",
    "url": "https://pages.cloudflare.com",
    "category": "deployment",
    "toolType": "saas",
    "description": "Edge-hosted static site deployment with serverless functions.",
    "tags": [
      "deployment",
      "hosting",
      "edge",
      "serverless",
      "cdn"
    ]
  },
  {
    "name": "Fly.io",
    "url": "https://fly.io",
    "category": "deployment",
    "toolType": "saas",
    "description": "Container hosting on global edge hardware near users.",
    "tags": [
      "deployment",
      "hosting",
      "containers",
      "edge",
      "global"
    ]
  },
  {
    "name": "Render",
    "url": "https://render.com",
    "category": "deployment",
    "toolType": "saas",
    "description": "Cloud hosting for web services, databases, and static sites.",
    "tags": [
      "deployment",
      "hosting",
      "web-services",
      "databases",
      "ssl"
    ]
  },
  {
    "name": "Koyeb",
    "url": "https://www.koyeb.com",
    "category": "deployment",
    "toolType": "saas",
    "description": "Global serverless platform deploying containers across edge nodes.",
    "tags": [
      "deployment",
      "hosting",
      "serverless",
      "containers",
      "edge"
    ]
  },
  {
    "name": "DigitalOcean App Platform",
    "url": "https://www.digitalocean.com/products/app-platform",
    "category": "deployment",
    "toolType": "saas",
    "description": "PaaS with auto-builds, SSL, and managed databases.",
    "tags": [
      "deployment",
      "hosting",
      "paas",
      "managed",
      "simple"
    ]
  },
  {
    "name": "AWS Amplify",
    "url": "https://aws.amazon.com/amplify",
    "category": "deployment",
    "toolType": "saas",
    "description": "Full-stack hosting with CI/CD, auth, storage, and serverless backend.",
    "tags": [
      "deployment",
      "hosting",
      "aws",
      "fullstack",
      "serverless"
    ]
  },
  {
    "name": "Datadog",
    "url": "https://www.datadoghq.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Full-stack observability with infrastructure, APM, logs, and tracing.",
    "tags": [
      "monitoring",
      "observability",
      "apm",
      "logs",
      "metrics"
    ]
  },
  {
    "name": "Grafana",
    "url": "https://grafana.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Observability dashboards and alerts across multiple data sources.",
    "tags": [
      "monitoring",
      "dashboards",
      "visualization",
      "metrics",
      "alerts"
    ]
  },
  {
    "name": "Prometheus",
    "url": "https://prometheus.io",
    "category": "monitoring",
    "toolType": "cli",
    "description": "Open-source monitoring with dimensional data model and PromQL.",
    "tags": [
      "monitoring",
      "metrics",
      "alerting",
      "open-source",
      "pull-model"
    ]
  },
  {
    "name": "Sentry",
    "url": "https://sentry.io",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Error tracking and APM with real-time crash reporting.",
    "tags": [
      "monitoring",
      "errors",
      "performance",
      "debugging",
      "alerts"
    ]
  },
  {
    "name": "LogRocket",
    "url": "https://logrocket.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Frontend session replay with console logs, network, and activity.",
    "tags": [
      "monitoring",
      "frontend",
      "session-replay",
      "debugging",
      "ux"
    ]
  },
  {
    "name": "PostHog",
    "url": "https://posthog.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Open-source product analytics with session recording and feature flags.",
    "tags": [
      "monitoring",
      "analytics",
      "product",
      "self-hosted",
      "session-recording"
    ]
  },
  {
    "name": "Mixpanel",
    "url": "https://mixpanel.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Product analytics for user behavior, funnels, and retention.",
    "tags": [
      "monitoring",
      "analytics",
      "product",
      "user",
      "funnels"
    ]
  },
  {
    "name": "Amplitude",
    "url": "https://amplitude.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Digital analytics for product intelligence and experimentation.",
    "tags": [
      "monitoring",
      "analytics",
      "product",
      "behavioral",
      "experimentation"
    ]
  },
  {
    "name": "Plausible",
    "url": "https://plausible.io",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Simple privacy-friendly web analytics without cookie consent.",
    "tags": [
      "monitoring",
      "analytics",
      "privacy",
      "simple",
      "open-source"
    ]
  },
  {
    "name": "Umami",
    "url": "https://umami.is",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Self-hosted web analytics with clean dashboard and events.",
    "tags": [
      "monitoring",
      "analytics",
      "self-hosted",
      "privacy",
      "dashboard"
    ]
  },
  {
    "name": "Fathom Analytics",
    "url": "https://usefathom.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Privacy-focused web analytics without personal data tracking.",
    "tags": [
      "monitoring",
      "analytics",
      "privacy",
      "simple",
      "lightweight"
    ]
  },
  {
    "name": "Honeycomb",
    "url": "https://www.honeycomb.io",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Observability for debugging complex systems with high-cardinality events.",
    "tags": [
      "monitoring",
      "observability",
      "debugging",
      "high-cardinality",
      "events"
    ]
  },
  {
    "name": "Better Stack",
    "url": "https://betterstack.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Uptime monitoring, incident management, and logs integrated.",
    "tags": [
      "monitoring",
      "uptime",
      "incidents",
      "logs",
      "status-page"
    ]
  },
  {
    "name": "Checkly",
    "url": "https://www.checklyhq.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "API and browser E2E monitoring with Playwright integration.",
    "tags": [
      "monitoring",
      "playwright",
      "e2e",
      "api",
      "synthetics"
    ]
  },
  {
    "name": "Uptime Robot",
    "url": "https://uptimerobot.com",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Website uptime monitoring with alerts every 5 minutes.",
    "tags": [
      "monitoring",
      "uptime",
      "alerts",
      "status",
      "simple"
    ]
  },
  {
    "name": "Statuspage",
    "url": "https://www.atlassian.com/software/statuspage",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Hosted status page for service incident communication.",
    "tags": [
      "monitoring",
      "status-page",
      "incidents",
      "communication",
      "atlassian"
    ]
  },
  {
    "name": "OpenTelemetry",
    "url": "https://opentelemetry.io",
    "category": "monitoring",
    "toolType": "library",
    "description": "CNCF framework for traces, metrics, and logs from services.",
    "tags": [
      "monitoring",
      "observability",
      "tracing",
      "metrics",
      "cncf"
    ]
  },
  {
    "name": "Jaeger",
    "url": "https://www.jaegertracing.io",
    "category": "monitoring",
    "toolType": "cli",
    "description": "CNCF distributed tracing for microservices troubleshooting.",
    "tags": [
      "monitoring",
      "tracing",
      "distributed",
      "microservices",
      "cncf"
    ]
  },
  {
    "name": "Grafana Loki",
    "url": "https://grafana.com/oss/loki",
    "category": "monitoring",
    "toolType": "cli",
    "description": "Log aggregation with Prometheus-style labels and cost-effective storage.",
    "tags": [
      "monitoring",
      "logs",
      "aggregation",
      "grafana",
      "prometheus"
    ]
  },
  {
    "name": "Figma",
    "url": "https://www.figma.com",
    "category": "design",
    "toolType": "website",
    "description": "Collaborative interface design with vector editing and prototyping.",
    "tags": [
      "design",
      "ui",
      "prototyping",
      "collaboration",
      "vector"
    ]
  },
  {
    "name": "Figma Community",
    "url": "https://www.figma.com/community",
    "category": "design",
    "toolType": "website",
    "description": "Marketplace for Figma plugins, templates, and design resources.",
    "tags": [
      "design",
      "community",
      "plugins",
      "templates",
      "resources"
    ]
  },
  {
    "name": "Figma Plugins",
    "url": "https://www.figma.com/plugin-library",
    "category": "design",
    "toolType": "website",
    "description": "Library of plugins extending Figma functionality.",
    "tags": [
      "design",
      "plugins",
      "automation",
      "workflow",
      "extensions"
    ]
  },
  {
    "name": "Penpot",
    "url": "https://penpot.app",
    "category": "design",
    "toolType": "website",
    "description": "Open-source design and prototyping with SVG and CSS grid.",
    "tags": [
      "design",
      "ui",
      "open-source",
      "prototyping",
      "svg"
    ]
  },
  {
    "name": "Sketch",
    "url": "https://www.sketch.com",
    "category": "design",
    "toolType": "desktop-app",
    "description": "Vector-based macOS design tool for UI/UX prototyping.",
    "tags": [
      "design",
      "ui",
      "vector",
      "macos",
      "prototyping"
    ]
  },
  {
    "name": "Framer",
    "url": "https://www.framer.com",
    "category": "design",
    "toolType": "website",
    "description": "Design-to-code platform for interactive prototypes and websites.",
    "tags": [
      "design",
      "prototyping",
      "website",
      "interactive",
      "code"
    ]
  },
  {
    "name": "Webflow",
    "url": "https://webflow.com",
    "category": "design",
    "toolType": "website",
    "description": "Visual web design with CMS, hosting, and no-code builder.",
    "tags": [
      "design",
      "website",
      "no-code",
      "cms",
      "responsive"
    ]
  },
  {
    "name": "Canva",
    "url": "https://www.canva.com",
    "category": "design",
    "toolType": "website",
    "description": "Online graphic design with templates, photos, and collaboration.",
    "tags": [
      "design",
      "graphics",
      "templates",
      "collaboration",
      "online"
    ]
  },
  {
    "name": "Excalidraw",
    "url": "https://excalidraw.com",
    "category": "design",
    "toolType": "website",
    "description": "Virtual whiteboard for hand-drawn style diagrams with collaboration.",
    "tags": [
      "design",
      "diagrams",
      "whiteboard",
      "sketching",
      "collaboration"
    ]
  },
  {
    "name": "tldraw",
    "url": "https://www.tldraw.com",
    "category": "design",
    "toolType": "website",
    "description": "Infinite canvas whiteboard with shapes and multiplayer.",
    "tags": [
      "design",
      "whiteboard",
      "drawing",
      "canvas",
      "multiplayer"
    ]
  },
  {
    "name": "Spline",
    "url": "https://spline.design",
    "category": "design",
    "toolType": "website",
    "description": "3D design tool for interactive web experiences.",
    "tags": [
      "design",
      "3d",
      "interactive",
      "webgl",
      "scene"
    ]
  },
  {
    "name": "Rive",
    "url": "https://rive.app",
    "category": "design",
    "toolType": "website",
    "description": "Interactive animation tool for motion graphics on any platform.",
    "tags": [
      "design",
      "animation",
      "interactive",
      "motion",
      "runtime"
    ]
  },
  {
    "name": "LottieFiles",
    "url": "https://lottiefiles.com",
    "category": "design",
    "toolType": "website",
    "description": "Platform for lightweight real-time Lottie JSON animations.",
    "tags": [
      "design",
      "animation",
      "lottie",
      "lightweight",
      "free"
    ]
  },
  {
    "name": "Haikei",
    "url": "https://haikei.app",
    "category": "design",
    "toolType": "website",
    "description": "Generative tool for unique SVG backgrounds and visual assets.",
    "tags": [
      "design",
      "svg",
      "generator",
      "backgrounds",
      "visual"
    ]
  },
  {
    "name": "Heroicons",
    "url": "https://heroicons.com",
    "category": "design",
    "toolType": "website",
    "description": "MIT-licensed SVG icons by Tailwind Labs with outline/solid variants.",
    "tags": [
      "design",
      "icons",
      "svg",
      "tailwind",
      "free"
    ]
  },
  {
    "name": "Lucide",
    "url": "https://lucide.dev",
    "category": "design",
    "toolType": "library",
    "description": "Open-source icon library with consistent design and framework packages.",
    "tags": [
      "design",
      "icons",
      "open-source",
      "svg",
      "consistent"
    ]
  },
  {
    "name": "Phosphor Icons",
    "url": "https://phosphoricons.com",
    "category": "design",
    "toolType": "website",
    "description": "Flexible icon family with multiple weights and raw SVG exports.",
    "tags": [
      "design",
      "icons",
      "svg",
      "flexible",
      "weights"
    ]
  },
  {
    "name": "Dribbble",
    "url": "https://dribbble.com",
    "category": "design",
    "toolType": "website",
    "description": "Community for showcasing and discovering UI/UX design work.",
    "tags": [
      "design",
      "portfolio",
      "community",
      "inspiration",
      "ui"
    ]
  },
  {
    "name": "Behance",
    "url": "https://www.behance.net",
    "category": "design",
    "toolType": "website",
    "description": "Adobe platform for showcasing creative work across design and art.",
    "tags": [
      "design",
      "portfolio",
      "adobe",
      "creative",
      "showcase"
    ]
  },
  {
    "name": "Mobbin",
    "url": "https://mobbin.com",
    "category": "design",
    "toolType": "website",
    "description": "Hand-picked mobile and web UI references for design inspiration.",
    "tags": [
      "design",
      "ui",
      "references",
      "inspiration",
      "mobile"
    ]
  },
  {
    "name": "Screenlane",
    "url": "https://screenlane.com",
    "category": "design",
    "toolType": "website",
    "description": "Curated mobile UI inspiration with screenshots and patterns.",
    "tags": [
      "design",
      "ui",
      "inspiration",
      "mobile",
      "patterns"
    ]
  },
  {
    "name": "Coolors",
    "url": "https://coolors.co",
    "category": "design",
    "toolType": "website",
    "description": "Color palette generator with contrast checker and export.",
    "tags": [
      "design",
      "color",
      "palette",
      "generator",
      "accessibility"
    ]
  },
  {
    "name": "Colorhunt",
    "url": "https://colorhunt.co",
    "category": "design",
    "toolType": "website",
    "description": "Curated collection of beautiful color palettes.",
    "tags": [
      "design",
      "color",
      "palette",
      "curated",
      "inspiration"
    ]
  },
  {
    "name": "Fontsource",
    "url": "https://fontsource.org",
    "category": "design",
    "toolType": "library",
    "description": "Self-hostable open-source fonts as npm packages.",
    "tags": [
      "design",
      "fonts",
      "self-hosted",
      "npm",
      "typography"
    ]
  },
  {
    "name": "Playwright",
    "url": "https://playwright.dev",
    "category": "testing-qa",
    "toolType": "library",
    "description": "E2E testing with cross-browser, mobile, and API support.",
    "tags": [
      "testing",
      "e2e",
      "browser",
      "automation",
      "cross-browser"
    ]
  },
  {
    "name": "Cypress",
    "url": "https://www.cypress.io",
    "category": "testing-qa",
    "toolType": "library",
    "description": "Fast E2E testing with real-time reloads and time-travel debugging.",
    "tags": [
      "testing",
      "e2e",
      "debugging",
      "real-time",
      "component"
    ]
  },
  {
    "name": "Vitest",
    "url": "https://vitest.dev",
    "category": "testing-qa",
    "toolType": "library",
    "description": "Blazing fast unit test framework with Vite-native HMR.",
    "tags": [
      "testing",
      "unit",
      "vite",
      "fast",
      "typescript"
    ]
  },
  {
    "name": "Jest",
    "url": "https://jestjs.io",
    "category": "testing-qa",
    "toolType": "library",
    "description": "JS testing framework with built-in mocking and snapshot testing.",
    "tags": [
      "testing",
      "unit",
      "javascript",
      "mocking",
      "snapshots"
    ]
  },
  {
    "name": "Testing Library",
    "url": "https://testing-library.com",
    "category": "testing-qa",
    "toolType": "library",
    "description": "Testing utilities focused on user behavior over implementation.",
    "tags": [
      "testing",
      "unit",
      "react",
      "accessibility",
      "user-centric"
    ]
  },
  {
    "name": "Storybook",
    "url": "https://storybook.js.org",
    "category": "testing-qa",
    "toolType": "library",
    "description": "Frontend workshop for UI component development and documentation.",
    "tags": [
      "testing",
      "ui",
      "components",
      "documentation",
      "visual"
    ]
  },
  {
    "name": "Chromatic",
    "url": "https://www.chromatic.com",
    "category": "testing-qa",
    "toolType": "saas",
    "description": "Visual regression testing integrated with Storybook.",
    "tags": [
      "testing",
      "visual",
      "regression",
      "storybook",
      "review"
    ]
  },
  {
    "name": "MSW",
    "url": "https://mswjs.io",
    "category": "testing-qa",
    "toolType": "library",
    "description": "API mocking at the network level using service workers.",
    "tags": [
      "testing",
      "api",
      "mocking",
      "interception",
      "service-worker"
    ]
  },
  {
    "name": "K6",
    "url": "https://k6.io",
    "category": "testing-qa",
    "toolType": "cli",
    "description": "Load testing with JS scripting and Grafana dashboards.",
    "tags": [
      "testing",
      "performance",
      "load",
      "scripting",
      "grafana"
    ]
  },
  {
    "name": "Artillery",
    "url": "https://www.artillery.io",
    "category": "testing-qa",
    "toolType": "cli",
    "description": "Cloud-scale load testing for HTTP, WebSocket, and Socket.io.",
    "tags": [
      "testing",
      "performance",
      "load",
      "websockets",
      "cloud"
    ]
  },
  {
    "name": "Postman",
    "url": "https://www.postman.com",
    "category": "testing-qa",
    "toolType": "desktop-app",
    "description": "API platform for building, testing, and documenting APIs.",
    "tags": [
      "testing",
      "api",
      "collections",
      "documentation",
      "mock"
    ]
  },
  {
    "name": "Bruno",
    "url": "https://www.usebruno.com",
    "category": "testing-qa",
    "toolType": "desktop-app",
    "description": "Offline-first API client with Git-friendly storage.",
    "tags": [
      "testing",
      "api",
      "offline",
      "git",
      "open-source"
    ]
  },
  {
    "name": "Insomnia",
    "url": "https://insomnia.rest",
    "category": "testing-qa",
    "toolType": "desktop-app",
    "description": "API client with GraphQL, gRPC, and OpenAPI support.",
    "tags": [
      "testing",
      "api",
      "graphql",
      "grpc",
      "design"
    ]
  },
  {
    "name": "Hoppscotch",
    "url": "https://hoppscotch.io",
    "category": "testing-qa",
    "toolType": "website",
    "description": "Open-source API dev ecosystem with WebSocket testing.",
    "tags": [
      "testing",
      "api",
      "open-source",
      "websocket",
      "realtime"
    ]
  },
  {
    "name": "Swagger",
    "url": "https://swagger.io",
    "category": "testing-qa",
    "toolType": "website",
    "description": "OpenAPI tooling for API design, docs, and testing.",
    "tags": [
      "testing",
      "api",
      "openapi",
      "documentation",
      "design"
    ]
  },
  {
    "name": "Stoplight",
    "url": "https://stoplight.io",
    "category": "testing-qa",
    "toolType": "saas",
    "description": "API design platform with visual editor and mock servers.",
    "tags": [
      "testing",
      "api",
      "openapi",
      "design",
      "documentation"
    ]
  },
  {
    "name": "Faker.js",
    "url": "https://fakerjs.dev",
    "category": "testing-qa",
    "toolType": "library",
    "description": "Generate realistic fake data for testing and development.",
    "tags": [
      "testing",
      "data",
      "fake",
      "generator",
      "development"
    ]
  },
  {
    "name": "1Password",
    "url": "https://1password.com",
    "category": "security",
    "toolType": "desktop-app",
    "description": "Password manager with biometric unlocks and team vaults.",
    "tags": [
      "security",
      "passwords",
      "vault",
      "teams",
      "2fa"
    ]
  },
  {
    "name": "Bitwarden",
    "url": "https://bitwarden.com",
    "category": "security",
    "toolType": "saas",
    "description": "Open-source password manager with self-hosting option.",
    "tags": [
      "security",
      "passwords",
      "open-source",
      "self-hosted",
      "vault"
    ]
  },
  {
    "name": "1Password CLI",
    "url": "https://developer.1password.com/docs/cli",
    "category": "security",
    "toolType": "cli",
    "description": "CLI for vault management, secrets injection, and SSH agent.",
    "tags": [
      "security",
      "cli",
      "secrets",
      "ssh",
      "developer"
    ]
  },
  {
    "name": "Vaultwarden",
    "url": "https://github.com/dani-garcia/vaultwarden",
    "category": "security",
    "toolType": "github",
    "description": "Lightweight Bitwarden-compatible self-hosted server.",
    "tags": [
      "security",
      "passwords",
      "self-hosted",
      "lightweight",
      "compatible"
    ]
  },
  {
    "name": "HashiCorp Vault",
    "url": "https://www.vaultproject.io",
    "category": "security",
    "toolType": "cli",
    "description": "Secrets management for API keys, certificates, and encryption.",
    "tags": [
      "security",
      "secrets",
      "encryption",
      "dynamic",
      "infrastructure"
    ]
  },
  {
    "name": "Let's Encrypt",
    "url": "https://letsencrypt.org",
    "category": "security",
    "toolType": "website",
    "description": "Free automated CA providing SSL/TLS certificates via ACME.",
    "tags": [
      "security",
      "ssl",
      "certificates",
      "free",
      "automation"
    ]
  },
  {
    "name": "Cloudflare SSL",
    "url": "https://www.cloudflare.com/ssl",
    "category": "security",
    "toolType": "saas",
    "description": "Global SSL/TLS encryption with DDoS protection and WAF.",
    "tags": [
      "security",
      "ssl",
      "cdn",
      "ddos",
      "waf"
    ]
  },
  {
    "name": "Snyk",
    "url": "https://snyk.io",
    "category": "security",
    "toolType": "saas",
    "description": "Developer security for finding and fixing vulnerabilities.",
    "tags": [
      "security",
      "vulnerabilities",
      "dependencies",
      "devsecops",
      "containers"
    ]
  },
  {
    "name": "Dependabot",
    "url": "https://github.com/dependabot",
    "category": "security",
    "toolType": "saas",
    "description": "Automated dependency updates creating pull requests.",
    "tags": [
      "security",
      "dependencies",
      "automation",
      "github",
      "updates"
    ]
  },
  {
    "name": "Renovate",
    "url": "https://renovatebot.com",
    "category": "security",
    "toolType": "saas",
    "description": "Automated dependency updates with custom config.",
    "tags": [
      "security",
      "dependencies",
      "automation",
      "configuration",
      "multi-platform"
    ]
  },
  {
    "name": "Trivy",
    "url": "https://trivy.dev",
    "category": "security",
    "toolType": "cli",
    "description": "Scanner for container, filesystem, Git, and K8s vulnerabilities.",
    "tags": [
      "security",
      "vulnerabilities",
      "containers",
      "kubernetes",
      "scanning"
    ]
  },
  {
    "name": "Grype",
    "url": "https://github.com/anchore/grype",
    "category": "security",
    "toolType": "cli",
    "description": "Fast vulnerability scanner with SPDX SBOM support.",
    "tags": [
      "security",
      "vulnerabilities",
      "containers",
      "sbom",
      "fast"
    ]
  },
  {
    "name": "Semgrep",
    "url": "https://semgrep.dev",
    "category": "security",
    "toolType": "cli",
    "description": "Static analysis for security bugs and code standards.",
    "tags": [
      "security",
      "static-analysis",
      "rules",
      "code-quality",
      "linting"
    ]
  },
  {
    "name": "SonarQube",
    "url": "https://www.sonarsource.com/products/sonarqube",
    "category": "security",
    "toolType": "saas",
    "description": "Continuous code quality with security analysis.",
    "tags": [
      "security",
      "code-quality",
      "static-analysis",
      "technical-debt",
      "ci"
    ]
  },
  {
    "name": "CodeQL",
    "url": "https://github.com/github/codeql",
    "category": "security",
    "toolType": "github",
    "description": "GitHub semantic code analysis for security vulnerabilities.",
    "tags": [
      "security",
      "code-analysis",
      "vulnerabilities",
      "github",
      "semantic"
    ]
  },
  {
    "name": "SOPS",
    "url": "https://github.com/getsops/sops",
    "category": "security",
    "toolType": "cli",
    "description": "Encrypted file editor for secrets in Git.",
    "tags": [
      "security",
      "secrets",
      "encryption",
      "git",
      "files"
    ]
  },
  {
    "name": "Age",
    "url": "https://github.com/FiloSottile/age",
    "category": "security",
    "toolType": "cli",
    "description": "Simple modern file encryption with auditable Rust.",
    "tags": [
      "security",
      "encryption",
      "simple",
      "rust",
      "keys"
    ]
  },
  {
    "name": "Wireshark",
    "url": "https://www.wireshark.org",
    "category": "security",
    "toolType": "desktop-app",
    "description": "Network protocol analyzer for traffic inspection.",
    "tags": [
      "security",
      "network",
      "analysis",
      "packets",
      "protocol"
    ]
  },
  {
    "name": "Notion",
    "url": "https://www.notion.so",
    "category": "productivity",
    "toolType": "website",
    "description": "All-in-one workspace for notes, docs, wikis, and project management.",
    "tags": [
      "productivity",
      "notes",
      "docs",
      "wiki",
      "database"
    ]
  },
  {
    "name": "Notion Templates",
    "url": "https://www.notion.so/templates",
    "category": "productivity",
    "toolType": "website",
    "description": "Template gallery with dashboards, trackers, and layouts.",
    "tags": [
      "productivity",
      "templates",
      "notion",
      "dashboards",
      "tracking"
    ]
  },
  {
    "name": "Notion Academy",
    "url": "https://www.notion.so/guides",
    "category": "productivity",
    "toolType": "website",
    "description": "Official guides for learning Notion workflows and features.",
    "tags": [
      "productivity",
      "learning",
      "notion",
      "guides",
      "tutorials"
    ]
  },
  {
    "name": "Linear",
    "url": "https://linear.app",
    "category": "productivity",
    "toolType": "website",
    "description": "Issue tracking for high-velocity product teams.",
    "tags": [
      "productivity",
      "project-management",
      "issues",
      "tracking",
      "teams"
    ]
  },
  {
    "name": "Todoist",
    "url": "https://todoist.com",
    "category": "productivity",
    "toolType": "website",
    "description": "Task management with natural language input and productivity tracking.",
    "tags": [
      "productivity",
      "tasks",
      "gtd",
      "cross-platform",
      "organization"
    ]
  },
  {
    "name": "TickTick",
    "url": "https://ticktick.com",
    "category": "productivity",
    "toolType": "website",
    "description": "Tasks with Pomodoro timer, habits, and calendar views.",
    "tags": [
      "productivity",
      "tasks",
      "pomodoro",
      "habits",
      "calendar"
    ]
  },
  {
    "name": "Things",
    "url": "https://culturedcode.com/things",
    "category": "productivity",
    "toolType": "desktop-app",
    "description": "Personal task management for Apple devices.",
    "tags": [
      "productivity",
      "tasks",
      "apple",
      "gtd",
      "personal"
    ]
  },
  {
    "name": "Jira",
    "url": "https://www.atlassian.com/software/jira",
    "category": "productivity",
    "toolType": "saas",
    "description": "Issue tracking for agile teams with Scrum and Kanban.",
    "tags": [
      "productivity",
      "project-management",
      "agile",
      "issues",
      "atlassian"
    ]
  },
  {
    "name": "Asana",
    "url": "https://asana.com",
    "category": "productivity",
    "toolType": "saas",
    "description": "Work management with timelines, workflows, and goals.",
    "tags": [
      "productivity",
      "project-management",
      "teams",
      "workflows",
      "goals"
    ]
  },
  {
    "name": "Monday.com",
    "url": "https://monday.com",
    "category": "productivity",
    "toolType": "saas",
    "description": "Visual work OS with customizable boards and automations.",
    "tags": [
      "productivity",
      "project-management",
      "boards",
      "automation",
      "visual"
    ]
  },
  {
    "name": "ClickUp",
    "url": "https://clickup.com",
    "category": "productivity",
    "toolType": "saas",
    "description": "All-in-one platform with tasks, docs, goals, and whiteboards.",
    "tags": [
      "productivity",
      "project-management",
      "all-in-one",
      "docs",
      "time-tracking"
    ]
  },
  {
    "name": "Raycast",
    "url": "https://www.raycast.com",
    "category": "productivity",
    "toolType": "desktop-app",
    "description": "Mac launcher with extensible plugins and quick actions.",
    "tags": [
      "productivity",
      "launcher",
      "mac",
      "extensions",
      "quick"
    ]
  },
  {
    "name": "Alfred",
    "url": "https://www.alfredapp.com",
    "category": "productivity",
    "toolType": "desktop-app",
    "description": "Mac productivity with hotkeys, workflows, and text expansion.",
    "tags": [
      "productivity",
      "launcher",
      "mac",
      "workflows",
      "hotkeys"
    ]
  },
  {
    "name": "Keyboard Maestro",
    "url": "https://www.keyboardmaestro.com",
    "category": "productivity",
    "toolType": "desktop-app",
    "description": "Mac macros and keyboard shortcut automation.",
    "tags": [
      "productivity",
      "automation",
      "mac",
      "macros",
      "shortcuts"
    ]
  },
  {
    "name": "BetterTouchTool",
    "url": "https://folivora.ai",
    "category": "productivity",
    "toolType": "desktop-app",
    "description": "Mac input customizer for trackpad, mouse, and keyboard.",
    "tags": [
      "productivity",
      "gestures",
      "mac",
      "customization",
      "automation"
    ]
  },
  {
    "name": "TextExpander",
    "url": "https://textexpander.com",
    "category": "productivity",
    "toolType": "desktop-app",
    "description": "Text expansion and snippet management for fast typing.",
    "tags": [
      "productivity",
      "text",
      "snippets",
      "macros",
      "typing"
    ]
  },
  {
    "name": "Espanso",
    "url": "https://espanso.org",
    "category": "productivity",
    "toolType": "desktop-app",
    "description": "Cross-platform text expander with package support.",
    "tags": [
      "productivity",
      "text",
      "cross-platform",
      "open-source",
      "snippets"
    ]
  },
  {
    "name": "Notion Calendar",
    "url": "https://www.notion.so/product/calendar",
    "category": "productivity",
    "toolType": "desktop-app",
    "description": "Calendar integrated with Notion for time-blocking.",
    "tags": [
      "productivity",
      "calendar",
      "notion",
      "time-blocking",
      "scheduling"
    ]
  },
  {
    "name": "Cron",
    "url": "https://cron.com",
    "category": "productivity",
    "toolType": "desktop-app",
    "description": "Modern calendar with beautiful UI and smart scheduling.",
    "tags": [
      "productivity",
      "calendar",
      "mac",
      "scheduling",
      "beautiful"
    ]
  },
  {
    "name": "Motion",
    "url": "https://www.usemotion.com",
    "category": "productivity",
    "toolType": "website",
    "description": "AI-powered calendar auto-scheduling focus time.",
    "tags": [
      "productivity",
      "calendar",
      "ai",
      "scheduling",
      "focus"
    ]
  },
  {
    "name": "Sunsama",
    "url": "https://sunsama.com",
    "category": "productivity",
    "toolType": "website",
    "description": "Daily planner combining calendar, tasks, and goals.",
    "tags": [
      "productivity",
      "planner",
      "daily",
      "goals",
      "mindful"
    ]
  },
  {
    "name": "Notion AI",
    "url": "https://www.notion.so/product/ai",
    "category": "productivity",
    "toolType": "website",
    "description": "AI writing assistant integrated into Notion workspace.",
    "tags": [
      "productivity",
      "ai",
      "writing",
      "notion",
      "assistant"
    ]
  },
  {
    "name": "Obsidian",
    "url": "https://obsidian.md",
    "category": "notes",
    "toolType": "desktop-app",
    "description": "Knowledge base with local Markdown, graph view, and plugins.",
    "tags": [
      "notes",
      "knowledge",
      "markdown",
      "local",
      "graph"
    ]
  },
  {
    "name": "Roam Research",
    "url": "https://roamresearch.com",
    "category": "notes",
    "toolType": "website",
    "description": "Networked thought note-taking with bidirectional links.",
    "tags": [
      "notes",
      "knowledge",
      "networked",
      "blocks",
      "research"
    ]
  },
  {
    "name": "Logseq",
    "url": "https://logseq.com",
    "category": "notes",
    "toolType": "desktop-app",
    "description": "Open-source knowledge platform with block-based Markdown.",
    "tags": [
      "notes",
      "knowledge",
      "open-source",
      "outliner",
      "markdown"
    ]
  },
  {
    "name": "Bear",
    "url": "https://bear.app",
    "category": "notes",
    "toolType": "desktop-app",
    "description": "Apple-native note-taking with Markdown and tags.",
    "tags": [
      "notes",
      "writing",
      "apple",
      "markdown",
      "minimal"
    ]
  },
  {
    "name": "Craft",
    "url": "https://www.craft.do",
    "category": "notes",
    "toolType": "desktop-app",
    "description": "Document editor with rich text and blocks for Apple.",
    "tags": [
      "notes",
      "writing",
      "docs",
      "apple",
      "blocks"
    ]
  },
  {
    "name": "Typora",
    "url": "https://typora.io",
    "category": "notes",
    "toolType": "desktop-app",
    "description": "Minimal Markdown editor with live preview.",
    "tags": [
      "notes",
      "markdown",
      "minimal",
      "preview",
      "writing"
    ]
  },
  {
    "name": "Readwise",
    "url": "https://readwise.io",
    "category": "knowledge",
    "toolType": "website",
    "description": "Bookmark and highlight sync from Kindle and web.",
    "tags": [
      "knowledge",
      "reading",
      "highlights",
      "notes",
      "sync"
    ]
  },
  {
    "name": "Mem",
    "url": "https://mem.ai",
    "category": "knowledge",
    "toolType": "website",
    "description": "AI-powered knowledge management auto-organizing notes.",
    "tags": [
      "knowledge",
      "ai",
      "notes",
      "organization",
      "connections"
    ]
  },
  {
    "name": "Reflect",
    "url": "https://reflect.app",
    "category": "knowledge",
    "toolType": "website",
    "description": "Notes app with AI, bidirectional links, and daily notes.",
    "tags": [
      "knowledge",
      "notes",
      "ai",
      "links",
      "daily"
    ]
  },
  {
    "name": "Capacities",
    "url": "https://capacities.io",
    "category": "knowledge",
    "toolType": "website",
    "description": "Object-based note-taking with typed content and graphs.",
    "tags": [
      "knowledge",
      "notes",
      "objects",
      "graph",
      "search"
    ]
  },
  {
    "name": "Anytype",
    "url": "https://anytype.io",
    "category": "knowledge",
    "toolType": "desktop-app",
    "description": "Local-first knowledge management with E2E encryption.",
    "tags": [
      "knowledge",
      "notes",
      "local-first",
      "encrypted",
      "relations"
    ]
  },
  {
    "name": "Tana",
    "url": "https://tana.inc",
    "category": "knowledge",
    "toolType": "website",
    "description": "Structured knowledge work with supertags and AI.",
    "tags": [
      "knowledge",
      "notes",
      "structured",
      "ai",
      "supertags"
    ]
  },
  {
    "name": "Dendron",
    "url": "https://www.dendron.so",
    "category": "knowledge",
    "toolType": "extension",
    "description": "VS Code knowledge management with hierarchies.",
    "tags": [
      "knowledge",
      "vs-code",
      "notes",
      "hierarchy",
      "plugin"
    ]
  },
  {
    "name": "Foam",
    "url": "https://foambubble.github.io/foam",
    "category": "knowledge",
    "toolType": "extension",
    "description": "VS Code personal knowledge management on GitHub.",
    "tags": [
      "knowledge",
      "vs-code",
      "notes",
      "roam-like",
      "github"
    ]
  },
  {
    "name": "Eagle",
    "url": "https://eagle.cool",
    "category": "knowledge",
    "toolType": "desktop-app",
    "description": "Digital asset manager for design files and screenshots.",
    "tags": [
      "knowledge",
      "assets",
      "organization",
      "design",
      "media"
    ]
  },
  {
    "name": "Slack",
    "url": "https://slack.com",
    "category": "communication",
    "toolType": "website",
    "description": "Team messaging with channels, threads, and integrations.",
    "tags": [
      "communication",
      "messaging",
      "team",
      "channels",
      "integrations"
    ]
  },
  {
    "name": "Discord",
    "url": "https://discord.com",
    "category": "communication",
    "toolType": "website",
    "description": "Voice, video, and text chat for communities.",
    "tags": [
      "communication",
      "voice",
      "chat",
      "community",
      "gaming"
    ]
  },
  {
    "name": "Microsoft Teams",
    "url": "https://www.microsoft.com/microsoft-teams",
    "category": "communication",
    "toolType": "saas",
    "description": "Enterprise collaboration with chat and Office integration.",
    "tags": [
      "communication",
      "teams",
      "enterprise",
      "meetings",
      "office"
    ]
  },
  {
    "name": "Zoom",
    "url": "https://zoom.us",
    "category": "communication",
    "toolType": "saas",
    "description": "Video conferencing with meetings, webinars, and recording.",
    "tags": [
      "communication",
      "video",
      "meetings",
      "webinars",
      "remote"
    ]
  },
  {
    "name": "Google Meet",
    "url": "https://meet.google.com",
    "category": "communication",
    "toolType": "website",
    "description": "Google video conferencing with live captions.",
    "tags": [
      "communication",
      "video",
      "meetings",
      "google",
      "captions"
    ]
  },
  {
    "name": "Loom",
    "url": "https://www.loom.com",
    "category": "communication",
    "toolType": "website",
    "description": "Async video messaging with screen recording.",
    "tags": [
      "communication",
      "video",
      "async",
      "screen-recording",
      "messaging"
    ]
  },
  {
    "name": "Mattermost",
    "url": "https://mattermost.com",
    "category": "communication",
    "toolType": "saas",
    "description": "Open-source self-hosted team messaging.",
    "tags": [
      "communication",
      "messaging",
      "self-hosted",
      "open-source",
      "compliance"
    ]
  },
  {
    "name": "Element",
    "url": "https://element.io",
    "category": "communication",
    "toolType": "website",
    "description": "Secure Matrix-based communication with E2E encryption.",
    "tags": [
      "communication",
      "matrix",
      "encrypted",
      "decentralized",
      "secure"
    ]
  },
  {
    "name": "Signal",
    "url": "https://signal.org",
    "category": "communication",
    "toolType": "desktop-app",
    "description": "Private messaging with end-to-end encryption.",
    "tags": [
      "communication",
      "encrypted",
      "privacy",
      "messaging",
      "open-source"
    ]
  },
  {
    "name": "Telegram",
    "url": "https://telegram.org",
    "category": "communication",
    "toolType": "website",
    "description": "Cloud messaging with channels, bots, and file sharing.",
    "tags": [
      "communication",
      "messaging",
      "cloud",
      "channels",
      "bots"
    ]
  },
  {
    "name": "Miro",
    "url": "https://miro.com",
    "category": "collaboration",
    "toolType": "website",
    "description": "Collaborative whiteboard for brainstorming and workshops.",
    "tags": [
      "collaboration",
      "whiteboard",
      "brainstorming",
      "workshop",
      "diagrams"
    ]
  },
  {
    "name": "Whimsical",
    "url": "https://whimsical.com",
    "category": "collaboration",
    "toolType": "website",
    "description": "Collaborative workspace for wireframes and mind maps.",
    "tags": [
      "collaboration",
      "wireframes",
      "mind-maps",
      "flowcharts",
      "visual"
    ]
  },
  {
    "name": "Zapier",
    "url": "https://zapier.com",
    "category": "automation",
    "toolType": "website",
    "description": "No-code automation connecting thousands of apps.",
    "tags": [
      "automation",
      "no-code",
      "integrations",
      "workflows",
      "zaps"
    ]
  },
  {
    "name": "Make",
    "url": "https://www.make.com",
    "category": "automation",
    "toolType": "website",
    "description": "Visual automation with 2000+ app integrations.",
    "tags": [
      "automation",
      "no-code",
      "scenarios",
      "integrations",
      "visual"
    ]
  },
  {
    "name": "n8n",
    "url": "https://n8n.io",
    "category": "automation",
    "toolType": "website",
    "description": "Open-source workflow automation with visual editor.",
    "tags": [
      "automation",
      "open-source",
      "self-hosted",
      "visual",
      "workflows"
    ]
  },
  {
    "name": "Pipedream",
    "url": "https://pipedream.com",
    "category": "automation",
    "toolType": "website",
    "description": "Developer workflow platform with code-first approach.",
    "tags": [
      "automation",
      "developer",
      "code",
      "workflows",
      "integrations"
    ]
  },
  {
    "name": "IFTTT",
    "url": "https://ifttt.com",
    "category": "automation",
    "toolType": "website",
    "description": "Simple conditional automation for apps and devices.",
    "tags": [
      "automation",
      "simple",
      "applets",
      "smart-home",
      "consumer"
    ]
  },
  {
    "name": "ActivePieces",
    "url": "https://www.activepieces.com",
    "category": "automation",
    "toolType": "website",
    "description": "Open-source automation with TypeScript pieces.",
    "tags": [
      "automation",
      "open-source",
      "typescript",
      "self-hosted",
      "pieces"
    ]
  },
  {
    "name": "Node-RED",
    "url": "https://nodered.org",
    "category": "automation",
    "toolType": "cli",
    "description": "Flow-based visual programming for IoT and APIs.",
    "tags": [
      "automation",
      "visual",
      "iot",
      "flow",
      "node-js"
    ]
  },
  {
    "name": "Prefect",
    "url": "https://www.prefect.io",
    "category": "automation",
    "toolType": "saas",
    "description": "Workflow orchestration for Python data pipelines.",
    "tags": [
      "automation",
      "workflows",
      "python",
      "data",
      "orchestration"
    ]
  },
  {
    "name": "Dagster",
    "url": "https://dagster.io",
    "category": "automation",
    "toolType": "saas",
    "description": "Data orchestration with asset-based approach.",
    "tags": [
      "automation",
      "data",
      "orchestration",
      "python",
      "assets"
    ]
  },
  {
    "name": "Apache Airflow",
    "url": "https://airflow.apache.org",
    "category": "automation",
    "toolType": "cli",
    "description": "Batch workflow orchestration with DAG scheduling.",
    "tags": [
      "automation",
      "workflows",
      "python",
      "dags",
      "scheduling"
    ]
  },
  {
    "name": "Temporal",
    "url": "https://temporal.io",
    "category": "automation",
    "toolType": "saas",
    "description": "Reliable durable workflow execution platform.",
    "tags": [
      "automation",
      "workflows",
      "durable",
      "scalable",
      "microservices"
    ]
  },
  {
    "name": "Stripe",
    "url": "https://stripe.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Payment processing for subscriptions and invoices.",
    "tags": [
      "api",
      "payments",
      "billing",
      "subscriptions",
      "ecommerce"
    ]
  },
  {
    "name": "Paddle",
    "url": "https://www.paddle.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Revenue delivery for SaaS with global tax compliance.",
    "tags": [
      "api",
      "payments",
      "saas",
      "tax",
      "subscriptions"
    ]
  },
  {
    "name": "Lemon Squeezy",
    "url": "https://www.lemonsqueezy.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Payments for digital products with affiliate management.",
    "tags": [
      "api",
      "payments",
      "digital-products",
      "affiliates",
      "tax"
    ]
  },
  {
    "name": "RevenueCat",
    "url": "https://www.revenuecat.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "In-app purchase management and analytics for mobile.",
    "tags": [
      "api",
      "payments",
      "mobile",
      "subscriptions",
      "analytics"
    ]
  },
  {
    "name": "Twilio",
    "url": "https://www.twilio.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Cloud communications for SMS, voice, and video APIs.",
    "tags": [
      "api",
      "sms",
      "voice",
      "communications",
      "messaging"
    ]
  },
  {
    "name": "SendGrid",
    "url": "https://sendgrid.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Email delivery with deliverability analytics and templates.",
    "tags": [
      "api",
      "email",
      "delivery",
      "transactional",
      "marketing"
    ]
  },
  {
    "name": "Resend",
    "url": "https://resend.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Email API for developers with React email templates.",
    "tags": [
      "api",
      "email",
      "react",
      "developer",
      "delivery"
    ]
  },
  {
    "name": "Mailgun",
    "url": "https://www.mailgun.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Email API for sending, receiving, and tracking at scale.",
    "tags": [
      "api",
      "email",
      "sending",
      "tracking",
      "analytics"
    ]
  },
  {
    "name": "Postmark",
    "url": "https://postmarkapp.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Fast transactional email with guaranteed delivery times.",
    "tags": [
      "api",
      "email",
      "transactional",
      "fast",
      "reliable"
    ]
  },
  {
    "name": "Algolia",
    "url": "https://www.algolia.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Hosted search with typo tolerance and real-time indexing.",
    "tags": [
      "api",
      "search",
      "hosted",
      "fast",
      "typo-tolerance"
    ]
  },
  {
    "name": "Meilisearch",
    "url": "https://www.meilisearch.com",
    "category": "apis-services",
    "toolType": "saas",
    "description": "Open-source search with instant results and typo tolerance.",
    "tags": [
      "api",
      "search",
      "open-source",
      "fast",
      "self-hosted"
    ]
  },
  {
    "name": "Typesense",
    "url": "https://typesense.org",
    "category": "apis-services",
    "toolType": "saas",
    "description": "Fast typo-tolerant search engine in C++.",
    "tags": [
      "api",
      "search",
      "fast",
      "typo-tolerant",
      "developer"
    ]
  },
  {
    "name": "Cloudinary",
    "url": "https://cloudinary.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Cloud image/video management with transformation and CDN.",
    "tags": [
      "api",
      "images",
      "video",
      "optimization",
      "cdn"
    ]
  },
  {
    "name": "Imgix",
    "url": "https://www.imgix.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Real-time image processing API with on-the-fly transforms.",
    "tags": [
      "api",
      "images",
      "optimization",
      "real-time",
      "cdn"
    ]
  },
  {
    "name": "UploadThing",
    "url": "https://uploadthing.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "File upload API with CDN and serverless integration.",
    "tags": [
      "api",
      "uploads",
      "files",
      "storage",
      "serverless"
    ]
  },
  {
    "name": "TinyPNG",
    "url": "https://tinypng.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Smart PNG and JPEG compression without quality loss.",
    "tags": [
      "api",
      "images",
      "compression",
      "optimization",
      "web"
    ]
  },
  {
    "name": "Mapbox",
    "url": "https://www.mapbox.com",
    "category": "apis-services",
    "toolType": "api",
    "description": "Maps and location with custom styling and geocoding.",
    "tags": [
      "api",
      "maps",
      "location",
      "geocoding",
      "navigation"
    ]
  },
  {
    "name": "Airtable",
    "url": "https://www.airtable.com",
    "category": "apis-services",
    "toolType": "website",
    "description": "Spreadsheet-database hybrid with automations and API.",
    "tags": [
      "api",
      "database",
      "spreadsheet",
      "no-code",
      "automation"
    ]
  },
  {
    "name": "Firebase",
    "url": "https://firebase.google.com",
    "category": "apis-services",
    "toolType": "saas",
    "description": "Google app platform with auth, database, and analytics.",
    "tags": [
      "api",
      "backend",
      "auth",
      "database",
      "google"
    ]
  },
  {
    "name": "Warp",
    "url": "https://www.warp.dev",
    "category": "cli-terminal",
    "toolType": "desktop-app",
    "description": "GPU-accelerated terminal with AI command suggestions.",
    "tags": [
      "cli",
      "terminal",
      "modern",
      "gpu",
      "ai"
    ]
  },
  {
    "name": "iTerm2",
    "url": "https://iterm2.com",
    "category": "cli-terminal",
    "toolType": "desktop-app",
    "description": "Mac terminal emulator with split panes and profiles.",
    "tags": [
      "cli",
      "terminal",
      "macos",
      "tabs",
      "customization"
    ]
  },
  {
    "name": "Alacritty",
    "url": "https://alacritty.org",
    "category": "cli-terminal",
    "toolType": "desktop-app",
    "description": "GPU-accelerated terminal focused on simplicity.",
    "tags": [
      "cli",
      "terminal",
      "gpu",
      "minimal",
      "fast"
    ]
  },
  {
    "name": "Kitty",
    "url": "https://sw.kovidgoyal.net/kitty",
    "category": "cli-terminal",
    "toolType": "desktop-app",
    "description": "GPU-based terminal with image rendering and kittens.",
    "tags": [
      "cli",
      "terminal",
      "gpu",
      "images",
      "plugins"
    ]
  },
  {
    "name": "Ghostty",
    "url": "https://ghostty.org",
    "category": "cli-terminal",
    "toolType": "desktop-app",
    "description": "Fast native terminal built in Zig with GPU acceleration.",
    "tags": [
      "cli",
      "terminal",
      "zig",
      "native",
      "fast"
    ]
  },
  {
    "name": "Tabby",
    "url": "https://tabby.sh",
    "category": "cli-terminal",
    "toolType": "desktop-app",
    "description": "Modern terminal with SSH, serial, and Telnet client.",
    "tags": [
      "cli",
      "terminal",
      "ssh",
      "modern",
      "typescript"
    ]
  },
  {
    "name": "tmux",
    "url": "https://github.com/tmux/tmux",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Terminal multiplexer for managing sessions and panes.",
    "tags": [
      "cli",
      "terminal",
      "multiplexer",
      "sessions",
      "productivity"
    ]
  },
  {
    "name": "fish shell",
    "url": "https://fishshell.com",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Friendly shell with autosuggestions and web config.",
    "tags": [
      "cli",
      "shell",
      "autosuggestions",
      "highlighting",
      "friendly"
    ]
  },
  {
    "name": "zsh",
    "url": "https://www.zsh.org",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Powerful shell with extensive customization.",
    "tags": [
      "cli",
      "shell",
      "customizable",
      "plugins",
      "completion"
    ]
  },
  {
    "name": "starship",
    "url": "https://starship.rs",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Minimal cross-platform shell prompt with modules.",
    "tags": [
      "cli",
      "prompt",
      "customizable",
      "fast",
      "cross-platform"
    ]
  },
  {
    "name": "oh-my-zsh",
    "url": "https://ohmyz.sh",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Zsh framework with 300+ plugins and themes.",
    "tags": [
      "cli",
      "shell",
      "zsh",
      "plugins",
      "themes"
    ]
  },
  {
    "name": "powerlevel10k",
    "url": "https://github.com/romkatv/powerlevel10k",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Fast Zsh theme with instant prompt and rich indicators.",
    "tags": [
      "cli",
      "prompt",
      "zsh",
      "theme",
      "fast"
    ]
  },
  {
    "name": "fzf",
    "url": "https://github.com/junegunn/fzf",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Command-line fuzzy finder with preview and Vim plugin.",
    "tags": [
      "cli",
      "fuzzy",
      "search",
      "find",
      "interactive"
    ]
  },
  {
    "name": "ripgrep",
    "url": "https://github.com/BurntSushi/ripgrep",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Blazing fast line-oriented regex search tool.",
    "tags": [
      "cli",
      "search",
      "grep",
      "fast",
      "rust"
    ]
  },
  {
    "name": "fd",
    "url": "https://github.com/sharkdp/fd",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Fast find alternative with intuitive syntax.",
    "tags": [
      "cli",
      "find",
      "fast",
      "rust",
      "colorized"
    ]
  },
  {
    "name": "bat",
    "url": "https://github.com/sharkdp/bat",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Cat clone with syntax highlighting and Git integration.",
    "tags": [
      "cli",
      "cat",
      "syntax-highlighting",
      "git",
      "pager"
    ]
  },
  {
    "name": "eza",
    "url": "https://eza.rocks",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Modern ls replacement with icons and tree view.",
    "tags": [
      "cli",
      "ls",
      "icons",
      "tree",
      "rust"
    ]
  },
  {
    "name": "jq",
    "url": "https://jqlang.github.io/jq",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Command-line JSON processor for transforming data.",
    "tags": [
      "cli",
      "json",
      "processor",
      "query",
      "transform"
    ]
  },
  {
    "name": "btop",
    "url": "https://github.com/aristocratos/btop",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Resource monitor with GPU support and theming.",
    "tags": [
      "cli",
      "monitoring",
      "system",
      "gpu",
      "themeable"
    ]
  },
  {
    "name": "lazygit",
    "url": "https://github.com/jesseduffield/lazygit",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Terminal UI for Git with interactive rebasing.",
    "tags": [
      "cli",
      "git",
      "tui",
      "interactive",
      "productivity"
    ]
  },
  {
    "name": "lazydocker",
    "url": "https://github.com/jesseduffield/lazydocker",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Terminal UI for Docker container management.",
    "tags": [
      "cli",
      "docker",
      "tui",
      "management",
      "logs"
    ]
  },
  {
    "name": "k9s",
    "url": "https://k9scli.io",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Terminal UI for Kubernetes cluster management.",
    "tags": [
      "cli",
      "k8s",
      "tui",
      "monitoring",
      "management"
    ]
  },
  {
    "name": "htop",
    "url": "https://htop.dev",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Interactive process viewer with tree and filtering.",
    "tags": [
      "cli",
      "monitoring",
      "process",
      "system",
      "interactive"
    ]
  },
  {
    "name": "kubectx",
    "url": "https://github.com/ahmetb/kubectx",
    "category": "cli-terminal",
    "toolType": "cli",
    "description": "Fast kubectl context and namespace switching.",
    "tags": [
      "cli",
      "k8s",
      "context",
      "namespace",
      "fuzzy"
    ]
  },
  {
    "name": "MDN Web Docs",
    "url": "https://developer.mozilla.org",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Comprehensive web docs for HTML, CSS, JS, and APIs.",
    "tags": [
      "docs",
      "web",
      "html",
      "css",
      "javascript"
    ]
  },
  {
    "name": "DevDocs",
    "url": "https://devdocs.io",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Fast offline-capable API docs combining multiple sets.",
    "tags": [
      "docs",
      "api",
      "offline",
      "browser",
      "fast"
    ]
  },
  {
    "name": "Stack Overflow",
    "url": "https://stackoverflow.com",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Community Q&A for programming questions.",
    "tags": [
      "learning",
      "community",
      "qa",
      "programming",
      "answers"
    ]
  },
  {
    "name": "roadmap.sh",
    "url": "https://roadmap.sh",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Community roadmaps for developer skills and careers.",
    "tags": [
      "learning",
      "roadmaps",
      "career",
      "skills",
      "guides"
    ]
  },
  {
    "name": "awesome lists",
    "url": "https://github.com/sindresorhus/awesome",
    "category": "learning-docs",
    "toolType": "github",
    "description": "Curated list of awesome software lists.",
    "tags": [
      "learning",
      "lists",
      "curated",
      "resources",
      "github"
    ]
  },
  {
    "name": "Learn X in Y Minutes",
    "url": "https://learnxinyminutes.com",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Quick language tours covering syntax and concepts.",
    "tags": [
      "learning",
      "languages",
      "quick",
      "reference",
      "syntax"
    ]
  },
  {
    "name": "cheat.sh",
    "url": "https://cheat.sh",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Command-line cheat sheet with curl access.",
    "tags": [
      "learning",
      "cheatsheet",
      "cli",
      "reference",
      "quick"
    ]
  },
  {
    "name": "ExplainShell",
    "url": "https://explainshell.com",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Visualize and understand shell commands.",
    "tags": [
      "learning",
      "shell",
      "cli",
      "visualization",
      "command"
    ]
  },
  {
    "name": "Regex101",
    "url": "https://regex101.com",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Online regex tester with explanation and cheat sheet.",
    "tags": [
      "learning",
      "regex",
      "testing",
      "debugger",
      "explanation"
    ]
  },
  {
    "name": "QuickRef.ME",
    "url": "https://quickref.me",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Quick reference cheatsheets for languages and tools.",
    "tags": [
      "learning",
      "cheatsheet",
      "reference",
      "quick",
      "languages"
    ]
  },
  {
    "name": "Codecademy",
    "url": "https://www.codecademy.com",
    "category": "learning-docs",
    "toolType": "website",
    "description": "Interactive coding education with hands-on exercises.",
    "tags": [
      "learning",
      "interactive",
      "courses",
      "coding",
      "beginner"
    ]
  },
  {
    "name": "Google Scholar",
    "url": "https://scholar.google.com",
    "category": "research",
    "toolType": "website",
    "description": "Academic search for papers, theses, and citations.",
    "tags": [
      "research",
      "academic",
      "papers",
      "citations",
      "scholar"
    ]
  },
  {
    "name": "arXiv",
    "url": "https://arxiv.org",
    "category": "research",
    "toolType": "website",
    "description": "Open-access preprint repository for sciences.",
    "tags": [
      "research",
      "papers",
      "preprints",
      "open-access",
      "science"
    ]
  },
  {
    "name": "Semantic Scholar",
    "url": "https://www.semanticscholar.org",
    "category": "research",
    "toolType": "website",
    "description": "AI-powered scientific literature with citation graphs.",
    "tags": [
      "research",
      "ai",
      "papers",
      "citations",
      "summaries"
    ]
  },
  {
    "name": "Papers with Code",
    "url": "https://paperswithcode.com",
    "category": "research",
    "toolType": "website",
    "description": "Research papers linked to code implementations.",
    "tags": [
      "research",
      "papers",
      "code",
      "benchmarks",
      "ml"
    ]
  },
  {
    "name": "Connected Papers",
    "url": "https://www.connectedpapers.com",
    "category": "research",
    "toolType": "website",
    "description": "Visual tool for exploring paper relationships.",
    "tags": [
      "research",
      "visualization",
      "graph",
      "papers",
      "discovery"
    ]
  },
  {
    "name": "Zotero",
    "url": "https://www.zotero.org",
    "category": "research",
    "toolType": "desktop-app",
    "description": "Open-source reference management with citation tools.",
    "tags": [
      "research",
      "citations",
      "references",
      "bibliography",
      "open-source"
    ]
  },
  {
    "name": "Mendeley",
    "url": "https://www.mendeley.com",
    "category": "research",
    "toolType": "desktop-app",
    "description": "Reference manager with PDF organization and annotation.",
    "tags": [
      "research",
      "citations",
      "pdf",
      "organization",
      "collaboration"
    ]
  },
  {
    "name": "GitHub",
    "url": "https://github.com",
    "category": "development",
    "toolType": "website",
    "description": "Code hosting with Git, PRs, code review, and CI/CD.",
    "tags": [
      "git",
      "github",
      "code",
      "collaboration",
      "version-control"
    ]
  },
  {
    "name": "GitHub Issues",
    "url": "https://github.com/features/issues",
    "category": "development",
    "toolType": "website",
    "description": "Issue tracking integrated into GitHub repos.",
    "tags": [
      "git",
      "issues",
      "tracking",
      "project-management",
      "github"
    ]
  },
  {
    "name": "GitHub Pull Requests",
    "url": "https://github.com/pulls",
    "category": "development",
    "toolType": "website",
    "description": "Code review with inline comments and approvals.",
    "tags": [
      "git",
      "review",
      "collaboration",
      "code-quality",
      "github"
    ]
  },
  {
    "name": "GitHub Projects",
    "url": "https://github.com/features/projects",
    "category": "development",
    "toolType": "website",
    "description": "Kanban boards with custom fields and automation.",
    "tags": [
      "git",
      "project-management",
      "kanban",
      "automation",
      "github"
    ]
  },
  {
    "name": "GitLab",
    "url": "https://gitlab.com",
    "category": "development",
    "toolType": "website",
    "description": "DevOps platform with repos, CI/CD, and registry.",
    "tags": [
      "git",
      "devops",
      "ci-cd",
      "self-hosted",
      "integrated"
    ]
  },
  {
    "name": "Sourcegraph",
    "url": "https://sourcegraph.com",
    "category": "development",
    "toolType": "website",
    "description": "Code search for navigating large codebases.",
    "tags": [
      "git",
      "search",
      "code-intelligence",
      "navigate",
      "review"
    ]
  },
  {
    "name": "GitKraken",
    "url": "https://www.gitkraken.com",
    "category": "development",
    "toolType": "desktop-app",
    "description": "Git GUI with visual commit graph and drag-drop.",
    "tags": [
      "git",
      "gui",
      "visual",
      "client",
      "cross-platform"
    ]
  },
  {
    "name": "Sourcetree",
    "url": "https://www.sourcetreeapp.com",
    "category": "development",
    "toolType": "desktop-app",
    "description": "Free Git GUI for Windows and Mac.",
    "tags": [
      "git",
      "gui",
      "visual",
      "free",
      "atlassian"
    ]
  },
  {
    "name": "GitLens",
    "url": "https://www.gitkraken.com/gitlens",
    "category": "development",
    "toolType": "extension",
    "description": "VS Code Git blame annotations and file history.",
    "tags": [
      "git",
      "vscode",
      "blame",
      "history",
      "visualization"
    ]
  },
  {
    "name": "Sublime Merge",
    "url": "https://www.sublimemerge.com",
    "category": "development",
    "toolType": "desktop-app",
    "description": "Fast Git client with side-by-side merging.",
    "tags": [
      "git",
      "gui",
      "fast",
      "merge",
      "commit"
    ]
  },
  {
    "name": "npm",
    "url": "https://www.npmjs.com",
    "category": "development",
    "toolType": "website",
    "description": "Node package registry with 2M+ JavaScript packages.",
    "tags": [
      "packages",
      "registry",
      "node",
      "javascript",
      "open-source"
    ]
  },
  {
    "name": "pnpm",
    "url": "https://pnpm.io",
    "category": "development",
    "toolType": "cli",
    "description": "Fast disk-efficient package manager with workspaces.",
    "tags": [
      "packages",
      "node",
      "fast",
      "disk-efficient",
      "monorepo"
    ]
  },
  {
    "name": "Yarn",
    "url": "https://yarnpkg.com",
    "category": "development",
    "toolType": "cli",
    "description": "Fast reliable JS package manager with offline cache.",
    "tags": [
      "packages",
      "node",
      "fast",
      "offline",
      "workspaces"
    ]
  },
  {
    "name": "crates.io",
    "url": "https://crates.io",
    "category": "development",
    "toolType": "website",
    "description": "Rust package registry with Cargo integration.",
    "tags": [
      "packages",
      "rust",
      "cargo",
      "registry",
      "open-source"
    ]
  },
  {
    "name": "PyPI",
    "url": "https://pypi.org",
    "category": "development",
    "toolType": "website",
    "description": "Python Package Index for pip packages.",
    "tags": [
      "packages",
      "python",
      "pip",
      "registry",
      "open-source"
    ]
  },
  {
    "name": "Homebrew",
    "url": "https://brew.sh",
    "category": "development",
    "toolType": "cli",
    "description": "Package manager for macOS and Linux.",
    "tags": [
      "packages",
      "macos",
      "linux",
      "cli",
      "formulas"
    ]
  },
  {
    "name": "Docker Hub",
    "url": "https://hub.docker.com",
    "category": "development",
    "toolType": "website",
    "description": "Container image registry with auto-builds.",
    "tags": [
      "packages",
      "docker",
      "containers",
      "registry",
      "images"
    ]
  },
  {
    "name": "ghcr.io",
    "url": "https://ghcr.io",
    "category": "development",
    "toolType": "website",
    "description": "GitHub Container Registry for OCI images.",
    "tags": [
      "packages",
      "containers",
      "github",
      "registry",
      "oci"
    ]
  },
  {
    "name": "AWS Console",
    "url": "https://aws.amazon.com/console",
    "category": "devops-infra",
    "toolType": "website",
    "description": "Management console for 200+ AWS cloud services.",
    "tags": [
      "cloud",
      "aws",
      "infrastructure",
      "compute",
      "storage"
    ]
  },
  {
    "name": "Google Cloud Console",
    "url": "https://console.cloud.google.com",
    "category": "devops-infra",
    "toolType": "website",
    "description": "GCP web interface for managing cloud services.",
    "tags": [
      "cloud",
      "gcp",
      "infrastructure",
      "compute",
      "google"
    ]
  },
  {
    "name": "Azure Portal",
    "url": "https://portal.azure.com",
    "category": "devops-infra",
    "toolType": "website",
    "description": "Microsoft Azure management for cloud resources.",
    "tags": [
      "cloud",
      "azure",
      "microsoft",
      "infrastructure",
      "enterprise"
    ]
  },
  {
    "name": "Cloudflare Dashboard",
    "url": "https://dash.cloudflare.com",
    "category": "devops-infra",
    "toolType": "website",
    "description": "Cloudflare management for DNS, CDN, and security.",
    "tags": [
      "cloud",
      "cdn",
      "dns",
      "security",
      "edge"
    ]
  },
  {
    "name": "DigitalOcean",
    "url": "https://www.digitalocean.com",
    "category": "devops-infra",
    "toolType": "saas",
    "description": "Simple cloud with droplets, K8s, and storage.",
    "tags": [
      "cloud",
      "droplets",
      "vps",
      "simple",
      "developer"
    ]
  },
  {
    "name": "Linode",
    "url": "https://www.linode.com",
    "category": "devops-infra",
    "toolType": "saas",
    "description": "Cloud hosting with Linux VMs and managed DB.",
    "tags": [
      "cloud",
      "vps",
      "compute",
      "linux",
      "developer"
    ]
  },
  {
    "name": "Hetzner",
    "url": "https://www.hetzner.com",
    "category": "devops-infra",
    "toolType": "saas",
    "description": "European cloud provider with dedicated servers.",
    "tags": [
      "cloud",
      "server",
      "dedicated",
      "europe",
      "cost-effective"
    ]
  },
  {
    "name": "Vultr",
    "url": "https://www.vultr.com",
    "category": "devops-infra",
    "toolType": "saas",
    "description": "Global cloud with GPU compute instances.",
    "tags": [
      "cloud",
      "vps",
      "global",
      "gpu",
      "compute"
    ]
  },
  {
    "name": "React Developer Tools",
    "url": "https://react.dev/learn/react-developer-tools",
    "category": "development",
    "toolType": "extension",
    "description": "Inspect React component trees and state.",
    "tags": [
      "extension",
      "react",
      "debugging",
      "devtools",
      "browser"
    ]
  },
  {
    "name": "Vue.js Devtools",
    "url": "https://devtools.vuejs.org",
    "category": "development",
    "toolType": "extension",
    "description": "Inspect Vue component hierarchy and state.",
    "tags": [
      "extension",
      "vue",
      "debugging",
      "devtools",
      "browser"
    ]
  },
  {
    "name": "Redux DevTools",
    "url": "https://github.com/reduxjs/redux-devtools",
    "category": "development",
    "toolType": "extension",
    "description": "Debug Redux state with time travel.",
    "tags": [
      "extension",
      "redux",
      "debugging",
      "state",
      "devtools"
    ]
  },
  {
    "name": "uBlock Origin",
    "url": "https://ublockorigin.com",
    "category": "productivity",
    "toolType": "extension",
    "description": "Efficient CPU/memory-friendly content blocker.",
    "tags": [
      "extension",
      "privacy",
      "adblock",
      "performance",
      "browser"
    ]
  },
  {
    "name": "Bitwarden Extension",
    "url": "https://bitwarden.com/products/browser",
    "category": "security",
    "toolType": "extension",
    "description": "Bitwarden password autofill browser extension.",
    "tags": [
      "extension",
      "passwords",
      "autofill",
      "security",
      "vault"
    ]
  },
  {
    "name": "Grammarly",
    "url": "https://www.grammarly.com",
    "category": "productivity",
    "toolType": "extension",
    "description": "AI writing assistant for grammar and clarity.",
    "tags": [
      "extension",
      "writing",
      "grammar",
      "ai",
      "communication"
    ]
  },
  {
    "name": "JSON Viewer",
    "url": "https://github.com/tulios/json-viewer",
    "category": "development",
    "toolType": "extension",
    "description": "Visualize JSON with syntax highlighting.",
    "tags": [
      "extension",
      "json",
      "visualization",
      "debugging",
      "api"
    ]
  },
  {
    "name": "Wappalyzer",
    "url": "https://www.wappalyzer.com",
    "category": "development",
    "toolType": "extension",
    "description": "Identify website technologies and frameworks.",
    "tags": [
      "extension",
      "technology",
      "profiling",
      "analysis",
      "website"
    ]
  },
  {
    "name": "React Native",
    "url": "https://reactnative.dev",
    "category": "development",
    "toolType": "library",
    "description": "Build native mobile apps with React.",
    "tags": [
      "mobile",
      "react",
      "native",
      "ios",
      "android"
    ]
  },
  {
    "name": "Expo",
    "url": "https://expo.dev",
    "category": "development",
    "toolType": "library",
    "description": "Managed React Native with build and deploy services.",
    "tags": [
      "mobile",
      "react-native",
      "managed",
      "build",
      "deploy"
    ]
  },
  {
    "name": "Flutter",
    "url": "https://flutter.dev",
    "category": "development",
    "toolType": "library",
    "description": "Google UI toolkit for cross-platform apps.",
    "tags": [
      "mobile",
      "dart",
      "cross-platform",
      "google",
      "ui"
    ]
  },
  {
    "name": "Kotlin Multiplatform",
    "url": "https://kotlinlang.org/docs/multiplatform.html",
    "category": "development",
    "toolType": "library",
    "description": "Share business logic across platforms with Kotlin.",
    "tags": [
      "mobile",
      "kotlin",
      "cross-platform",
      "shared",
      "jvm"
    ]
  },
  {
    "name": "Swift",
    "url": "https://www.swift.org",
    "category": "development",
    "toolType": "library",
    "description": "Apple programming language for all Apple platforms.",
    "tags": [
      "mobile",
      "apple",
      "swift",
      "ios",
      "language"
    ]
  },
  {
    "name": "Capacitor",
    "url": "https://capacitorjs.com",
    "category": "development",
    "toolType": "library",
    "description": "Native runtime for web-native mobile apps.",
    "tags": [
      "mobile",
      "web",
      "hybrid",
      "native",
      "plugins"
    ]
  },
  {
    "name": "Fastlane",
    "url": "https://fastlane.tools",
    "category": "development",
    "toolType": "cli",
    "description": "Mobile app automation for build and deploy.",
    "tags": [
      "mobile",
      "ci",
      "deployment",
      "automation",
      "app-store"
    ]
  },
  {
    "name": "Firebase Crashlytics",
    "url": "https://firebase.google.com/products/crashlytics",
    "category": "monitoring",
    "toolType": "saas",
    "description": "Mobile crash reporting with real-time alerts.",
    "tags": [
      "mobile",
      "crash",
      "reporting",
      "analytics",
      "firebase"
    ]
  },
  {
    "name": "Bark",
    "url": "https://bark.us",
    "category": "other",
    "toolType": "api",
    "description": "Push notifications for macOS and iOS.",
    "tags": [
      "other",
      "notifications",
      "push",
      "macos",
      "ios"
    ]
  },
  {
    "name": "Ntfy",
    "url": "https://ntfy.sh",
    "category": "other",
    "toolType": "api",
    "description": "Simple push notifications via HTTP PUT/POST.",
    "tags": [
      "other",
      "notifications",
      "push",
      "simple",
      "http"
    ]
  },
  {
    "name": "Pipedream Connect",
    "url": "https://pipedream.com/connect",
    "category": "automation",
    "toolType": "api",
    "description": "Embeddable integrations platform for SaaS.",
    "tags": [
      "automation",
      "api",
      "integrations",
      "saas",
      "embedded"
    ]
  },
  {
    "name": "Svix",
    "url": "https://www.svix.com",
    "category": "other",
    "toolType": "api",
    "description": "Webhook delivery service with retry and monitoring.",
    "tags": [
      "other",
      "webhooks",
      "delivery",
      "retries",
      "monitoring"
    ]
  },
  {
    "name": "Convoy",
    "url": "https://convoy.com",
    "category": "other",
    "toolType": "api",
    "description": "Open-source webhooks gateway with rate limiting.",
    "tags": [
      "other",
      "webhooks",
      "open-source",
      "rate-limiting",
      "gateway"
    ]
  }
];
