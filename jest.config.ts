import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  globalSetup: './jest.setup.ts',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/tests/style.mock.ts',
    '\\.(png|jpg|jpeg)$': '<rootDir>/tests/image.mock.ts',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['./react-testing-library.setup.ts'],
};

export default config;
