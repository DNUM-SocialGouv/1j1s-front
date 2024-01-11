import {
	aResultatRechercheStage3emeEt2nd,
	aStage3emeEt2nd,
} from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd.fixture';
import {
	anApiImmersionFacileStage3emeEt2nd,
} from '~/server/stage-3eme-et-2nd/infra/repositories/apiImmersionFacileStage3emeEt2nd.fixture';
import {
	mapRechercheStage3emeEt2nd,
} from '~/server/stage-3eme-et-2nd/infra/repositories/apiImmersionFacileStage3emeEt2nd.mapper';

describe('mapRechercheStage3eme.mapper', () => {
	it('retourne un ResultatRechercheStage3eme avec les données de l’api Immersion Facile', () => {
		// Given
		const apiImmersionFacileStage3eme = [
			anApiImmersionFacileStage3emeEt2nd({
				address: {
					city: 'Paris',
					departmentCode: '75',
					postcode: '75001',
					streetNumberAndAddress: '1 Rue de la Lune',
				},
				contactMode: 'IN_PERSON',
				fitForDisabledWorkers: true,
				name: 'La Boulangerie',
				numberOfEmployeeRange: '1-9',
				romeLabel: 'Boulangerie',
				voluntaryToImmersion: true,
			}),
			anApiImmersionFacileStage3emeEt2nd({
				address: {
					city: 'Paris',
					departmentCode: '75',
					postcode: '75002',
					streetNumberAndAddress: '2 Rue de la Lune',
				},
				contactMode: undefined,
				fitForDisabledWorkers: false,
				name: 'La Boulangerie 2',
				numberOfEmployeeRange: undefined,
				romeLabel: 'Boulangerie',
				voluntaryToImmersion: false,
			}),
		];

		// When
		const result = mapRechercheStage3emeEt2nd(apiImmersionFacileStage3eme);

		// Then
		expect(result).toEqual(aResultatRechercheStage3emeEt2nd({
			nombreDeResultats: 2,
			resultats: [
				{
					accessiblePersonnesEnSituationDeHandicap: true,
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
					accessiblePersonnesEnSituationDeHandicap: false,
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
			anApiImmersionFacileStage3emeEt2nd({
				contactMode: 'IN_PERSON',
			}),
			anApiImmersionFacileStage3emeEt2nd({
				contactMode: 'EMAIL',
			}),
			anApiImmersionFacileStage3emeEt2nd({
				contactMode: 'PHONE',
			}),
			anApiImmersionFacileStage3emeEt2nd({
				contactMode: undefined,
				voluntaryToImmersion: true,
			}),
			anApiImmersionFacileStage3emeEt2nd({
				contactMode: undefined,
				voluntaryToImmersion: false,
			}),
		];

		// When
		const result = mapRechercheStage3emeEt2nd(apiImmersionFacileStage3eme);

		// Then
		expect(result).toEqual(aResultatRechercheStage3emeEt2nd({
			nombreDeResultats: 5,
			resultats: [
				aStage3emeEt2nd({
					modeDeContact: 'Candidature en personne',
				}),
				aStage3emeEt2nd({
					modeDeContact: 'Candidature par e-mail',
				}),
				aStage3emeEt2nd({
					modeDeContact: 'Candidature par téléphone',
				}),
				aStage3emeEt2nd({
					modeDeContact: 'Candidature spontanée',
				}),
				aStage3emeEt2nd({
					modeDeContact: undefined,
				}),
			],
		}));
	});
});
