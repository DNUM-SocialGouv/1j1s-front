import { capitalizeFirstLetter } from '~/server/services/utils/capitalizeFirstLetter.util';

describe('capitalizeFirstLetter', () => {
	it('transforme la première lettre en majuscule', () => {
		const sentence = 'je suis une phrase';
		expect(capitalizeFirstLetter(sentence)).toEqual('Je suis une phrase');
	});
});
