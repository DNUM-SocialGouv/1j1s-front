import '@testing-library/jest-dom/jest-globals';
import '~/test-utils';
import { act, waitFor } from '@testing-library/react';

jest.mock('@testing-library/react', () => ({
	...(jest.requireActual('@testing-library/react')),
	render: async (...args: any) => {
		let renderResult: any;
		act(() => {
			renderResult = jest.requireActual('@testing-library/react').render(...args);
		});
		await waitFor(async () => { await expect(renderResult.container).toBeAccessible(); });
		return renderResult;
	},
}));

beforeEach(() => {
	jest.spyOn(console, 'error').mockImplementation((...args) => {
		throw new Error(`console.error called with : ${args}`);
	});
	jest.spyOn(console, 'warn').mockImplementation((...args) => {
		throw new Error(`console.warn called with : ${args}`);
	});
});
