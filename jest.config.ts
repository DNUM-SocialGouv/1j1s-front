import nextJest from 'next/jest';

process.env.TZ = 'utc';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
	moduleDirectories: ['node_modules', '<rootDir>/'],
	moduleNameMapper: {
		'\\.(css|scss)$': '<rootDir>/tests/style.mock.ts',
		'\\.(png|jpg|jpeg)$': '<rootDir>/tests/image.mock.ts',
		'^@tests/(.*)$': '<rootDir>/tests/$1',
		'^~/(.*)$': '<rootDir>/src/$1',
		uuid: require.resolve('uuid'),
	},
	setupFilesAfterEnv: ['./react-testing-library.setup.ts'],
};

module.exports = createJestConfig(customJestConfig);
