import {
	removeUndefinedValueInQueryParameterList,
	transformObjectToQueryString,
} from '~/server/services/utils/urlParams.util';

describe('urlParams', () => {
	describe('removeUndefinedValueInQueryParameterList', () => {
		it('supprime les clés vides d’un objet', () => {
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

	describe('transformObjectToQueryString', () => {
		it('transforme un objet en une chaîne de requête', () => {
			const source = {
				date: null,
				domain: 'sante',
				from: 2,
				localisation: undefined,
				size: 15,
				success: false,
			};

			expect(transformObjectToQueryString(source)).toEqual('domain=sante&from=2&size=15&success=false');
		});
	});
});
