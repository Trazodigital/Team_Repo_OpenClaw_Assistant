import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "apps/*/src/**/*.{test,spec}.ts",
      "packages/*/src/**/*.{test,spec}.ts",
      "tests/**/*.{test,spec}.ts",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      exclude: ["**/node_modules/**", "**/dist/**"],
    },
  },
});
