import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const githubPagesBase = "/future-compass/trait-explorer/";

/**
 * Pure static Vite configuration.
 * The deployed site lives at https://iguanayang.github.io/future-compass/trait-explorer/.
 * Keep this prefix fixed so every generated JS, CSS, and public asset URL resolves in that subdirectory.
 */
export default defineConfig({
  base: githubPagesBase,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});
