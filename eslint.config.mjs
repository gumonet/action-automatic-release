import tseslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslintParser from "@typescript-eslint/parser";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "eslint.config.mjs",
    ]
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      '@typescript-eslint/naming-convention': 'error',
      'prettier/prettier': 'error',
    },
  },
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  pluginJs.configs.recommended,
];