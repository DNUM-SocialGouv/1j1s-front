import { removeNullOrEmptyValue } from '~/client/utils/removeNullOrEmptyValue.util';

describe('removeNullOrEmptyValue', () => {
	it('retourne la donnée formattée', () => {
		// Given
		const object = { chose: null, machin: 42, quoi: undefined, toto: 'truc' };
		const expectedResult = { machin: 42, toto: 'truc' };

		// When
		const result = removeNullOrEmptyValue(object);

		// Then
		expect(result).toEqual(expectedResult);
	});
});
