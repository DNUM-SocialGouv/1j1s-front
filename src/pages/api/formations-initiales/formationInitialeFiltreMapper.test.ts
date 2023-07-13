import { FormationInitialeQueryParams } from '~/client/hooks/useFormationInitialeQuery';
import { formationInitialeRechercheFiltreMapper } from '~/pages/api/formations-initiales/formationInitialeFiltreMapper';


describe('formationInitialeFiltreMapper', () => {
	it('map les params de la requete vers un filtre de formation initiale', () => {
		const query: FormationInitialeQueryParams = {
			motCle: 'informatique',
			page: '1',
		};

		const result = formationInitialeRechercheFiltreMapper(query);

		expect(result).toEqual({
			motCle: 'informatique',
			page: 1,
		});
	});

	it('lorsque la page n‘est pas fournise', () => {
		const query: FormationInitialeQueryParams = {
			motCle: 'informatique',
			page: undefined,
		};

		const result = formationInitialeRechercheFiltreMapper(query);

		expect(result).toEqual({
			motCle: 'informatique',
			page: 1,
		});
	});

	it('lorsque la page est incorrect', () => {
		const query: FormationInitialeQueryParams = {
			motCle: 'informatique',
			page: 'pas une page',
		};

		const result = formationInitialeRechercheFiltreMapper(query);

		expect(result).toEqual({
			motCle: 'informatique',
			page: 1,
		});
	});
});
