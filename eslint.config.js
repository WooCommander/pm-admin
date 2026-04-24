// eslint.config.js — flat config по мотивам wiki-section 2026.

import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

const vueFlatRecommended = pluginVue.configs?.['flat/recommended'] ?? [];

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**',
      'env.d.ts',
      'src/api/**/dataSource/**',
    ],
  },

  ...vueFlatRecommended,

  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      js,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },

  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'vue/multi-word-component-names': 'off',
    },
  },

  eslintConfigPrettier,
]);
