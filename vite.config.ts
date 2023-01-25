import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
});
