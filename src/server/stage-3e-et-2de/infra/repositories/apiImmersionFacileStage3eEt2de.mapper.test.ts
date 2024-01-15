import { aCandidatureStage3eEt2de } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de.fixture';
import {
	aResultatRechercheStage3eEt2de,
	aStage3eEt2de,
} from '~/server/stage-3e-et-2de/domain/stage3eEt2de.fixture';
import {
	anApiImmersionFacileStage3eEt2de, anApiImmersionFacileStage3eEt2deCandidature,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de.fixture';
import {
	mapCandidatureStage3eEt2de,
	mapRechercheStage3eEt2de,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de.mapper';

describe('map ApiImmersionFacileStage3eEt2de', () => {
	describe('mapRechercheStage3eEt2de', () => {
		it('retourne un ResultatRechercheStage3eEt2de avec les données de l’api Immersion Facile', () => {
			// Given
			const apiImmersionFacileStage3eEt2de = [
				anApiImmersionFacileStage3eEt2de({
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
				anApiImmersionFacileStage3eEt2de({
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
			const result = mapRechercheStage3eEt2de(apiImmersionFacileStage3eEt2de);

			// Then
			expect(result).toEqual(aResultatRechercheStage3eEt2de({
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
			const apiImmersionFacileStage3eEt2de = [
				anApiImmersionFacileStage3eEt2de({
					contactMode: 'IN_PERSON',
				}),
				anApiImmersionFacileStage3eEt2de({
					contactMode: 'EMAIL',
				}),
				anApiImmersionFacileStage3eEt2de({
					contactMode: 'PHONE',
				}),
				anApiImmersionFacileStage3eEt2de({
					contactMode: undefined,
					voluntaryToImmersion: true,
				}),
				anApiImmersionFacileStage3eEt2de({
					contactMode: undefined,
					voluntaryToImmersion: false,
				}),
			];

			// When
			const result = mapRechercheStage3eEt2de(apiImmersionFacileStage3eEt2de);

			// Then
			expect(result).toEqual(aResultatRechercheStage3eEt2de({
				nombreDeResultats: 5,
				resultats: [
					aStage3eEt2de({
						modeDeContact: 'Candidature en personne',
					}),
					aStage3eEt2de({
						modeDeContact: 'Candidature par e-mail',
					}),
					aStage3eEt2de({
						modeDeContact: 'Candidature par téléphone',
					}),
					aStage3eEt2de({
						modeDeContact: 'Candidature spontanée',
					}),
					aStage3eEt2de({
						modeDeContact: undefined,
					}),
				],
			}));
		});
	});

	describe('mapCandidatureStage3eEt2de', () => {
		it('retourne une ApiImmersionFacileStage3eEt2deCandidature avec les données de la candidature', () => {
			// Given
			const candidature = aCandidatureStage3eEt2de({
				appellationCode: '11573',
				email: 'email@example.com',
				modeDeContact: 'PHONE',
				nom: 'Doe',
				prenom: 'John',
				siret: '12345678912345',
			});

			// When
			const result = mapCandidatureStage3eEt2de(candidature);

			// Then
			expect(result).toEqual(anApiImmersionFacileStage3eEt2deCandidature({
				appellationCode: '11573',
				contactMode: 'PHONE',
				potentialBeneficiaryEmail: 'email@example.com',
				potentialBeneficiaryFirstName: 'John',
				potentialBeneficiaryLastName: 'Doe',
				siret: '12345678912345',
			}));
		});
	});
});
