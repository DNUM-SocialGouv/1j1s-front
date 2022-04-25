import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  globalSetup: "./jest.setup.ts",
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/tests/style.mock.ts",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
};

export default config;
