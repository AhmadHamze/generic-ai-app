import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // Disable error overlay to save memory
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable code splitting in dev to reduce memory
      },
    },
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" }, // Reduce console spam
  },
});
