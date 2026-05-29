import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("@headlessui") ||
            id.includes("lucide-react") ||
            id.includes("@heroicons")
          ) {
            return "ui-vendor";
          }

          if (id.includes("framer-motion") || id.includes("/motion/")) {
            return "motion-vendor";
          }
        },
      },
    },
  },
});
