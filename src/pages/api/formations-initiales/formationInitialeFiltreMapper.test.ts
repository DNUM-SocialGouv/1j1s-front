import { FormationInitialeQueryParams } from '~/client/hooks/useFormationInitialeQuery';
import { formationInitialeRechercheFiltreMapper } from '~/pages/api/formations-initiales/formationInitialeFiltreMapper';


describe('formationInitialeFiltreMapper', () => {
	it('map les params de la requete vers un filtre de formation initiale', () => {
		const query: FormationInitialeQueryParams = {
			motCle: 'informatique',
		};

		const result = formationInitialeRechercheFiltreMapper(query);

		expect(result).toEqual({
			motCle: 'informatique',
		});
	});
});
