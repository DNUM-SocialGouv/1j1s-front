import empty from './empty';

describe('empty()', () => {
	it('renvoie true quand l’objet est vide', () => {
		const isEmpty = empty({});
		expect(isEmpty).toBe(true);
	});
	it('renvoie false quand l’objet contient une clé non-vide', () => {
		const isEmpty = empty({ test: 'test' });
		expect(isEmpty).toBe(false);
	});
	it('renvoie true quand l’objet contient une clé undefined', () => {
		const isEmpty = empty({ test: undefined });
		expect(isEmpty).toBe(true);
	});
});
