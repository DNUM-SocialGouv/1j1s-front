// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/nextjs";
import path from "node:path";
import type { RuleSetRule, RuleSetUseItem } from 'webpack';

import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const projectRoot = path.resolve(__dirname, '..');

function addSassIncludePaths(rules: unknown[] | undefined) {
  if (!rules) return;
  for (const rule of rules) {
    if (!rule || typeof rule !== 'object') continue;
    const r = rule as RuleSetRule;
    if (r.oneOf) addSassIncludePaths(r.oneOf);
    if (!r.use) continue;
    const loaders = (Array.isArray(r.use) ? r.use : [r.use]).filter(Boolean) as RuleSetUseItem[];
    for (const loader of loaders) {
      if (typeof loader !== 'object' || !loader.loader) continue;
      if (!String(loader.loader).includes('sass-loader')) continue;
      const options = (loader.options || {}) as Record<string, unknown>;
      const sassOptions = (options.sassOptions || {}) as Record<string, unknown>;
      const existingInclude = (sassOptions.includePaths || []) as string[];
      const existingLoad = (sassOptions.loadPaths || []) as string[];
      sassOptions.includePaths = [...existingInclude, projectRoot];
      sassOptions.loadPaths = [...existingLoad, projectRoot];
      options.sassOptions = sassOptions;
      loader.options = options;
    }
  }
}

const config: StorybookConfig = {
  webpackFinal: async (config) => {
    config.resolve!.plugins = [
      ...(config.resolve!.plugins || []),
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ];

    const alias = config.resolve!.alias as Record<string, string>;
    alias['@styles'] = path.resolve(__dirname, '../src/styles');

    config.resolve!.roots = [
      path.resolve(__dirname, '../public'),
      'node_modules',
    ];

    addSassIncludePaths(config.module?.rules as unknown[]);

    return config;
  },

  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  staticDirs: ['../public']
};
export default config;
