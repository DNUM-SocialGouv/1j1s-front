import { aResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme.fixture';
import {
	anApiImmersionFacileStage3eme,
} from '~/server/stage-3eme/infra/repositories/apiImmersionFacileStage3eme.fixture';
import { mapRechercheStage3eme } from '~/server/stage-3eme/infra/repositories/apiImmersionFacileStage3eme.mapper';

describe('mapRechercheStage3eme.mapper', () => {
	it('retourne un ResultatRechercheStage3eme avec les données de l’api Immersion Facile', () => {
		// Given
		const apiImmersionFacileStage3eme = [
			anApiImmersionFacileStage3eme({
				address: {
					city: 'Paris',
					departmentCode: '75',
					postcode: '75001',
					streetNumberAndAddress: '1 Rue de la Lune',
				},
				name: 'La Boulangerie',
				romeLabel: 'Boulangerie',
			}),
			anApiImmersionFacileStage3eme({
				address: {
					city: 'Paris',
					departmentCode: '75',
					postcode: '75002',
					streetNumberAndAddress: '2 Rue de la Lune',
				},
				name: 'La Boulangerie 2',
				romeLabel: 'Boulangerie',
			}),
		];

		// When
		const result = mapRechercheStage3eme(apiImmersionFacileStage3eme);

		// Then
		expect(result).toEqual(aResultatRechercheStage3eme({
			nombreDeResultats: 2,
			resultats: [
				{
					adresse: {
						codeDepartement: '75',
						codePostal: '75001',
						rueEtNumero: '1 Rue de la Lune',
						ville: 'Paris',
					},
					domaine: 'Boulangerie',
					nomEntreprise: 'La Boulangerie',
				},
				{
					adresse: {
						codeDepartement: '75',
						codePostal: '75002',
						rueEtNumero: '2 Rue de la Lune',
						ville: 'Paris',
					},
					domaine: 'Boulangerie',
					nomEntreprise: 'La Boulangerie 2',
				},
			],
		}));
	});
});
