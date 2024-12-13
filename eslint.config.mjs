import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const languageOptions = {
  globals: {
    ...globals.node,
    ...globals.jest,
  },
  ecmaVersion: "latest",
  sourceType: "module",
  parser: tsParser,
};

const pluginsOptions = {
  import: importPlugin,
  "import/parsers": tsParser,
  "react-hooks": fixupPluginRules(reactHooksPlugin),
  prettier: prettierPlugin,
};

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { ignores: ["**/node_modules", "**/dist"] },
  {
    plugins: {
      ...pluginsOptions,
    },
  },
  {
    languageOptions: {
      ...languageOptions,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Basic ESLint rules
      indent: ["error", 2, { SwitchCase: 1 }],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],

      // React and React Hooks rules
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // TypeScript specific rules
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "error",

      // Import rules
      "import/no-cycle": ["error"],
      "import/prefer-default-export": "off",
      "import/group-exports": "error",
      "import/exports-last": "error",

      // Miscellaneous
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@mui/*/*/*"],
        },
      ],

      // Prettier integration
      "prettier/prettier": ["error", { endOfLine: "lf" }],
    },
  },
];
