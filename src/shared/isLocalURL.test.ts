import isLocalURL from '~/shared/isLocalURL';

describe('isLocalURL()', () => {
	it('renvoie true si l‘url commence par "/"', () => {
		const url = '/home';

		const isLocal = isLocalURL(url);

		expect(isLocal).toBe(true);
	});
});
