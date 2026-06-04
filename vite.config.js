import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("lucide-react")) {
            return "lucide-vendor";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("@headlessui") ||
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
