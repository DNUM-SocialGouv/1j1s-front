import { aResultatRechercheStage3eme, aStage3eme } from '~/server/stage-3eme/domain/stage3eme.fixture';
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
				contactMode: 'IN_PERSON',
				name: 'La Boulangerie',
				numberOfEmployeeRange: '1-9',
				romeLabel: 'Boulangerie',
				voluntaryToImmersion: true,
			}),
			anApiImmersionFacileStage3eme({
				address: {
					city: 'Paris',
					departmentCode: '75',
					postcode: '75002',
					streetNumberAndAddress: '2 Rue de la Lune',
				},
				contactMode: undefined,
				name: 'La Boulangerie 2',
				numberOfEmployeeRange: undefined,
				romeLabel: 'Boulangerie',
				voluntaryToImmersion: undefined,
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
					modeDeContact: 'Candidature en personne',
					nomEntreprise: 'La Boulangerie',
					nombreDeSalaries: '1-9',
				},
				{
					adresse: {
						codeDepartement: '75',
						codePostal: '75002',
						rueEtNumero: '2 Rue de la Lune',
						ville: 'Paris',
					},
					domaine: 'Boulangerie',
					modeDeContact: undefined,
					nomEntreprise: 'La Boulangerie 2',
					nombreDeSalaries: undefined,
				},
			],
		}));
	});
	it('map les modes de contact', () => {
		// Given
		const apiImmersionFacileStage3eme = [
			anApiImmersionFacileStage3eme({
				contactMode: 'IN_PERSON',
			}),
			anApiImmersionFacileStage3eme({
				contactMode: 'EMAIL',
			}),
			anApiImmersionFacileStage3eme({
				contactMode: 'PHONE',
			}),
			anApiImmersionFacileStage3eme({
				contactMode: undefined,
				voluntaryToImmersion: true,
			}),
			anApiImmersionFacileStage3eme({
				contactMode: undefined,
				voluntaryToImmersion: false,
			}),
		];

		// When
		const result = mapRechercheStage3eme(apiImmersionFacileStage3eme);

		// Then
		expect(result).toEqual(aResultatRechercheStage3eme({
			nombreDeResultats: 5,
			resultats: [
				aStage3eme({
					modeDeContact: 'Candidature en personne',
				}),
				aStage3eme({
					modeDeContact: 'Candidature par e-mail',
				}),
				aStage3eme({
					modeDeContact: 'Candidature par téléphone',
				}),
				aStage3eme({
					modeDeContact: 'Candidature spontanée',
				}),
				aStage3eme({
					modeDeContact: undefined,
				}),
			],
		}));
	});
});
