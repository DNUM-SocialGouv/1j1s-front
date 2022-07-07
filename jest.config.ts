import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  globalSetup: './jest.setup.ts',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/tests/style.mock.ts',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['./react-testing-library.setup.ts'],
};

export default config;
