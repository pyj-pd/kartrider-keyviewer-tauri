// @ts-check

import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"

export default tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
  },
  {
    ignores: [
      "node_modules/*",
      "src/dist/*",
      "src-tauri/target/*",
      "dist/*",
      "src/vite-env.d.ts",
    ],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
)
