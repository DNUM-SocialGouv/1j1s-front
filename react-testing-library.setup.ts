import '@testing-library/jest-dom/jest-globals';

beforeEach(() => {
	jest.spyOn(console, 'error').mockImplementation((...args) => {
		throw new Error(`console.error called with : ${args}`);
	});
	jest.spyOn(console, 'warn').mockImplementation((...args) => {
		throw new Error(`console.warn called with : ${args}`);
	});
});
