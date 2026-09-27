import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
  server: {
    host: true, // allows external connections
    allowedHosts: [".ngrok-free.app"], // allow all ngrok subdomains
    // Local API during development (`npm run dev:api` on :4000).
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
      },
    },
  },
  build: {
    // The default 500kB warning tripped on the single 1.1MB bundle.
    // Vendor splitting below keeps the initial landing chunk lean.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("recharts")) return "charts";
          if (id.includes("dexie")) return "db";
          if (
            /node_modules\/(react|react-dom|react-router-dom|scheduler)\//.test(
              id,
            )
          ) {
            return "vendor";
          }
          return undefined;
        },
      },
    },
  },
});
