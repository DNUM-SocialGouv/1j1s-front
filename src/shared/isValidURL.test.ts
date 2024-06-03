import { isValidURL } from '~/shared/isValidURL';

describe('isValidURL()', () => {
	it.each([
		'https://localhost:3000',
		'https://www.1jeune1solution.gouv.fr',
		'https://localhost:3000/',
		'https://localhost:3000/test',
		'mailto:1j1s@example.com',
	])('%s/%s est une URL valide', (url) => {
		expect(isValidURL(url)).toBe(true);
	});
	it.each([
		'www.1jeune1solution.gouv.fr',
		'/test',
	])('%s n‘est pas une URL valide', (url) => {
		expect(isValidURL(url)).toBe(false);
	});
});
