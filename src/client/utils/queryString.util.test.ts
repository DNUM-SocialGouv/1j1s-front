import { estQueryIdentiqueAAsPath } from '~/client/utils/queryString.util';

describe('estQueryIdentiqueAAsPath', () => {
	it('retourne true lorsque l‘asPath n‘a pas de query et que la query est vide', () => {
		expect(estQueryIdentiqueAAsPath('/emplois', '')).toBe(true);
	});

	it('retourne true lorsque les paramètres sont identiques', () => {
		expect(estQueryIdentiqueAAsPath('/emplois?motCle=boulanger&page=1', 'motCle=boulanger&page=1')).toBe(true);
	});

	it('retourne true lorsque seul l‘ordre des paramètres diffère', () => {
		expect(estQueryIdentiqueAAsPath('/emplois?a=1&b=2', 'b=2&a=1')).toBe(true);
	});

	it('retourne false lorsqu‘une valeur diffère', () => {
		expect(estQueryIdentiqueAAsPath('/emplois?motCle=boulanger', 'motCle=informatique')).toBe(false);
	});

	it('retourne false lorsqu‘un paramètre supplémentaire est présent', () => {
		expect(estQueryIdentiqueAAsPath('/emplois?motCle=boulanger', 'motCle=boulanger&page=1')).toBe(false);
	});

	it('retourne false lorsque l‘asPath n‘a pas de query et que la query est renseignée', () => {
		expect(estQueryIdentiqueAAsPath('/emplois', 'motCle=boulanger')).toBe(false);
	});
});
