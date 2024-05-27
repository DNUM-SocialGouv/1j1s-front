import isRelativeURL from '~/shared/isRelativeURL';

describe('isRelativeURL', () => {
	it("return true si l'url est relative", () => {
		const url = '/test';

		const isRelative = isRelativeURL(url);

		expect(isRelative).toBe(true);
	});
	it("return true si l'url est une ancre", () => {
		const url = '#test';

		const isRelative = isRelativeURL(url);

		expect(isRelative).toBe(true);
	});
	it("return false si l'url est absolue", () => {
		const url = 'https://www.1jeune1solution.gouv.fr/';

		const isRelative = isRelativeURL(url);

		expect(isRelative).toBe(false);
	});
	it('throw un erreur si l‘url est invalide', () => {
		const url = 'url invalide';

		expect(() => isRelativeURL(url)).toThrow(new TypeError('Invalid URL "url invalide"'));
	});
});
