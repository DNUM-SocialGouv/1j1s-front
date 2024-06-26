import { anchorRegex } from '~/shared/anchorRegex';

describe('anchorRegex', () => {
	it('doit renvoyer true si l‘url est une ancre', () => {
		// WHEN
		const url = '#home';
		const isAnchor = new RegExp(anchorRegex).test(url);

		// THEN
		expect(isAnchor).toBe(true);
	});

	it('doit renvoyer false si l‘url n‘est pas une ancre', () => {
		// WHEN
		const url = 'https://www.1jeune1solution.gouv.fr/';
		const isAnchor = new RegExp(anchorRegex).test(url);

		// THEN
		expect(isAnchor).toBe(false);
	});
});
