import { defineConfig } from "tsdown";
export default defineConfig({
  entry: ["apps/api/src/HelloWorldTest.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  outDir: "apps/api/dist",
});
