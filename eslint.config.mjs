import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
export default defineConfig([
  globalIgnores([".next/**", "node_modules/**", "legacy/**", "next-env.d.ts", "public/theme-init.js"]),
  eslint.configs.recommended,
  ...tseslint.configs.recommended
]);
