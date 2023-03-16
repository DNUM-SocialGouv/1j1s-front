import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';

describe('removeUndefinedKeys', () => {
	it('supprime les clefs dont les valeurs sont undefined', async () => {
	    const payload = {
			id: 'id',
			nom: 'nom-de-famille',
			prénom: undefined,
		};
	    const expected = {
			id: 'id',
			nom: 'nom-de-famille',
		};

		const result = removeUndefinedKeys(payload);

		expect(result).toEqual(expected);
	});
});
