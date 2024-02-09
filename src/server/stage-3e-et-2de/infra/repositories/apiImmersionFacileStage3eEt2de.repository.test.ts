import { createFailure, createSuccess, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';
import { aCandidatureTelephoneStage3eEt2de } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de.fixture';
import {
	ResultatRechercheStage3eEt2de,
	Stage3eEt2deFiltre,
} from '~/server/stage-3e-et-2de/domain/stage3eEt2de';
import {
	aResultatRechercheStage3eEt2de,
	aStage3eEt2de,
	aStage3eEt2deFiltre,
} from '~/server/stage-3e-et-2de/domain/stage3eEt2de.fixture';
import {
	anApiImmersionFacileStage3eEt2de, anApiImmersionFacileStage3eEt2deCandidatureTelephone,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de.fixture';
import {
	ApiImmersionFacileStage3eEt2deRepository,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de.repository';

describe('ApiImmersionFacileStage3eEt2deRepository', () => {
	describe('search', () => {
		it('appelle le bon endpoint de l’api Immersion Facile', () => {
			// Given
			const filtre: Stage3eEt2deFiltre = aStage3eEt2deFiltre();
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, anErrorManagementService());

			// When
			repository.search(filtre);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('/search'));
		});

		it('appelle l’api Immersion Facile avec la localisation fournie', () => {
			// Given
			const filtre: Stage3eEt2deFiltre = aStage3eEt2deFiltre({
				distanceCommune: '10',
				latitudeCommune: '2',
				longitudeCommune: '3',
			});
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, anErrorManagementService());

			// When
			repository.search(filtre);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('&latitude=2&longitude=3&distanceKm=10'));
		});

		it('appelle l‘api Immersion Facile avec l’option pour trier les offres par date', () => {
			// Given
			const filtre: Stage3eEt2deFiltre = aStage3eEt2deFiltre({
				distanceCommune: '10',
				latitudeCommune: '2',
				longitudeCommune: '3',
			});
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, anErrorManagementService());

			// When
			repository.search(filtre);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('&sortedBy=date'));
		});

		it('appelle l‘api Immersion Facile avec le filtre qui ne remonte que les entreprise volontaires', () => {
			// Given
			const filtre: Stage3eEt2deFiltre = aStage3eEt2deFiltre({
				codeMetier: undefined,
				distanceCommune: '10',
				latitudeCommune: '2',
				longitudeCommune: '3',
			});
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, anErrorManagementService());

			// When
			repository.search(filtre);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('&voluntaryToImmersion=true'));
		});
		describe('quand un code métier est fourni', () => {
			it('appelle l’api Immersion Facile avec le code métier fourni', () => {
				// Given
				const filtre: Stage3eEt2deFiltre = aStage3eEt2deFiltre({
					codeMetier: 'codeMetier',
				});
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, anErrorManagementService());

				// When
				repository.search(filtre);

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('&appellationCodes[]=codeMetier'));
			});
		});

		describe('quand aucun code métier n’est fourni', () => {
			it('appelle l’api Immersion Facile sans le code métier fourni', () => {
				// Given
				const filtre: Stage3eEt2deFiltre = aStage3eEt2deFiltre();
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, anErrorManagementService());

				// When
				repository.search(filtre);

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith(expect.not.stringContaining('&appellationCodes[]='));
			});
		});

		describe('quand l’api Immersion Facile répond avec des données valide', () => {
			it('retourne les données de l’api Immersion Facile', async () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([anApiImmersionFacileStage3eEt2de(
					{
						address: {
							city: 'Paris',
							departmentCode: '75',
							postcode: '75001',
							streetNumberAndAddress: '1 Rue de la Lune',
						},
						name: 'La Boulangerie',
						romeLabel: 'Boulangerie',
					},
				)]));
				const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, anErrorManagementService());

				// When
				const result = await repository.search(aStage3eEt2deFiltre()) as Success<ResultatRechercheStage3eEt2de>;

				// Then
				expect(result.result).toEqual(aResultatRechercheStage3eEt2de({
					nombreDeResultats: 1,
					resultats: [
						aStage3eEt2de({
							adresse: {
								codeDepartement: '75',
								codePostal: '75001',
								rueEtNumero: '1 Rue de la Lune',
								ville: 'Paris',
							},
							domaine: 'Boulangerie',
							nomEntreprise: 'La Boulangerie',
						}),
					],
				}));
			});
		});

		describe('quand l’api répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// GIVEN
				const httpError = anHttpError(500);
				const httpClientService = aPublicHttpClientService();
				const errorManagementService = anErrorManagementService();
				jest.spyOn(httpClientService, 'get').mockRejectedValue(httpError);
				const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, errorManagementService);
				const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));

				// WHEN
				const result = await repository.search(aStage3eEt2deFiltre());

				// THEN
				expect(result).toEqual(createFailure(errorReturnedByErrorManagementService));
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Immersion Facile Stage 3e et 2de',
					contexte: 'search stage 3e et 2de',
					message: 'impossible d’effectuer une recherche de stage 3e et 2de',
				});
			});
		});
	});

	describe('sendCandidatureStage3eEt2de', () => {
		it('appelle le bon endpoint de l’api Immersion Facile avec les bonnes données', () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, anErrorManagementService());
			const candidature = aCandidatureTelephoneStage3eEt2de();

			// When
			repository.sendCandidatureStage3eEt2de(candidature);

			// Then
			expect(httpClientService.post).toHaveBeenCalledWith('/contact-establishment', anApiImmersionFacileStage3eEt2deCandidatureTelephone());
		});

		describe('quand la candidature est correctement envoyée', () => {
			it('retourne un succès', async () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, anErrorManagementService());
				const candidature = aCandidatureTelephoneStage3eEt2de();

				// When
				const result = await repository.sendCandidatureStage3eEt2de(candidature);

				// Then
				expect(result).toEqual(createSuccess(undefined));
			});
		});

		describe('quand l’api répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// GIVEN
				const httpError = anHttpError(500);
				const httpClientService = aPublicHttpClientService();
				const errorManagementService = anErrorManagementService();
				jest.spyOn(httpClientService, 'post').mockRejectedValue(httpError);
				const repository = new ApiImmersionFacileStage3eEt2deRepository(httpClientService, errorManagementService);
				const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));
				const candidature = aCandidatureTelephoneStage3eEt2de();

				// WHEN
				const result = await repository.sendCandidatureStage3eEt2de(candidature);

				// THEN
				expect(result).toEqual(createFailure(errorReturnedByErrorManagementService));
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Immersion Facile Stage 3e et 2de',
					contexte: 'candidature stage 3e et 2de',
					message: 'impossible d’envoyer la candidature de stage 3e et 2de',
				});
			});
		});
	});
});
