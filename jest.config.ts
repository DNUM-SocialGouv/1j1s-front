import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  globalSetup: "./jest.setup.ts",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
};

export default config;
