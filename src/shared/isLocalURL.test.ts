import isLocalURL from '~/shared/isLocalURL';

describe('isLocalURL()', () => {
	it('renvoie true si l‘url est relative', () => {
		const url = '/home';
		const origin = 'https://www.1jeune1solution.gouv.fr';

		const isLocal = isLocalURL(url, origin);

		expect(isLocal).toBe(true);
	});
	it('renvoie true si l‘url est une ancre', () => {
		const url = '#section1';
		const origin = 'https://www.1jeune1solution.gouv.fr';

		const isLocal = isLocalURL(url, origin);

		expect(isLocal).toBe(true);
	});
	it('renvoie false si l‘url est absolue et sur un domaine différent', () => {
		const url = 'https://www.monstagedeseconde.gouv.fr/stages';
		const origin = 'https://www.1jeune1solution.gouv.fr';

		const isLocal = isLocalURL(url, origin);

		expect(isLocal).toBe(false);
	});
	it.each(
		['https', 'http', 'ws', 'mailto', 'tel'],
	)('renvoie false si l‘url est absolue et sur un domaine différent en %s', (protocol) => {
		const url = `${protocol}://www.monstagedeseconde.gouv.fr/stages`;
		const origin = 'https://www.1jeune1solution.gouv.fr';

		const isLocal = isLocalURL(url, origin);

		expect(isLocal).toBe(false);
	});
	it('renvoie true si l‘url est absolue mais sur le domaine actuel', () => {
		const url = 'https://www.1jeune1solution.gouv.fr/stages';
		const origin = 'https://www.1jeune1solution.gouv.fr';

		const isLocal = isLocalURL(url, origin);

		expect(isLocal).toBe(true);
	});
});
