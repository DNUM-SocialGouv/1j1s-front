import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  globalSetup: "./jest.setup.ts",
  testEnvironment: "jest-environment-jsdom",
};

export default config;
