import { removeNullOrEmptyValue } from '~/client/utils/removeNullOrEmptyValue.util';

describe('removeNullOrEmptyValue', () => {
	it('retourne la donnée formattée sur un object à un niveau d’imbriquation', () => {
		// Given
		const object = { chose: null, emptyString: '', machin: 42, quoi: undefined, toto: 'truc' };

		const expectedResult = { machin: 42, toto: 'truc' };

		// When
		const result = removeNullOrEmptyValue(object);

		// Then
		expect(result).toEqual(expectedResult);
	});

	it('retourne la donnée formattée sur un object à plusieurs niveau d’imbriquation', () => {
		// Given
		const object = {
			chose: null,
			emptyString: '',
			grandMachin: {
				emptyString: '',
				machin: 42,
				quoi: undefined,
				superNull: null,
				toto: 'truc',
			},
		};

		const expectedResult = {
			grandMachin: {
				machin: 42,
				toto: 'truc',
			},
		};

		// When
		const result = removeNullOrEmptyValue(object);

		// Then
		expect(result).toEqual(expectedResult);
	});
});
