import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

describe('urlParams', () => {
	it('supprime les clés vides d‘ un objet', () => {
		//GIVEN
		const queryList = {
			dureeHebdoMax: '',
			experienceExigence: 'D',
			grandDomaine: '',
			motsCles: '',
			range: '0-29',
			tempsPlein: '',
			typeContrat: 'CDD',
		};

		//WHEN
		removeUndefinedValueInQueryParameterList(queryList);
		const expected = { experienceExigence: 'D', range: '0-29', typeContrat: 'CDD' };

		//THEN
		expect(queryList).toEqual(expected);
	});
});
