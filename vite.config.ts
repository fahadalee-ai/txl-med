import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** Root path for Vercel. Override with VITE_BASE=/txl-Med/ if you still need a subpath. */
const PRODUCTION_BASE = process.env.VITE_BASE || "/";

export default defineConfig({
  nitro: { preset: "vercel" },
  vite: {
    base: PRODUCTION_BASE,
    server: {
      allowedHosts: ["demo.sourapps.com", "localhost", "127.0.0.1"],
    },
    preview: {
      allowedHosts: ["demo.sourapps.com", "localhost", "127.0.0.1"],
    },
  },
});
