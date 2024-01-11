import { createFailure, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';
import {
	ResultatRechercheStage3emeEt2nd,
	Stage3emeEt2ndFiltre,
} from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd';
import {
	aResultatRechercheStage3emeEt2nd,
	aStage3emeEt2nd,
	aStage3emeEt2ndFiltre,
} from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd.fixture';
import {
	anApiImmersionFacileStage3emeEt2nd,
} from '~/server/stage-3eme-et-2nd/infra/repositories/apiImmersionFacileStage3emeEt2nd.fixture';
import {
	ApiImmersionFacileStage3emeEt2ndRepository,
} from '~/server/stage-3eme-et-2nd/infra/repositories/apiImmersionFacileStage3emeEt2nd.repository';

describe('ApiImmersionFacileStage3emeEt2ndRepository', () => {
	describe('search', () => {
		it('appelle le bon endpoint de l’api Immersion Facile', () => {
			// Given
			const filtre: Stage3emeEt2ndFiltre = aStage3emeEt2ndFiltre();
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiImmersionFacileStage3emeEt2ndRepository(httpClientService, anErrorManagementService());

			// When
			repository.search(filtre);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('/search'));
		});

		it('appelle l’api Immersion Facile avec la localisation fournie', () => {
			// Given
			const filtre: Stage3emeEt2ndFiltre = aStage3emeEt2ndFiltre({
				distanceCommune: '10',
				latitudeCommune: '2',
				longitudeCommune: '3',
			});
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiImmersionFacileStage3emeEt2ndRepository(httpClientService, anErrorManagementService());

			// When
			repository.search(filtre);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('latitude=2&longitude=3&distanceKm=10'));
		});

		it('appelle l‘api Immersion Facile avec le filtre qui ne remonte que les entreprise volontaires', () => {
			// Given
			const filtre: Stage3emeEt2ndFiltre = aStage3emeEt2ndFiltre({
				codeMetier: undefined,
				distanceCommune: '10',
				latitudeCommune: '2',
				longitudeCommune: '3',
			});
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiImmersionFacileStage3emeEt2ndRepository(httpClientService, anErrorManagementService());

			// When
			repository.search(filtre);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('&voluntaryToImmersion=true'));
		});
		describe('quand un code métier est fourni', () => {
			it('appelle l’api Immersion Facile avec le code métier fourni', () => {
				// Given
				const filtre: Stage3emeEt2ndFiltre = aStage3emeEt2ndFiltre({
					codeMetier: 'codeMetier',
				});
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiImmersionFacileStage3emeEt2ndRepository(httpClientService, anErrorManagementService());

				// When
				repository.search(filtre);

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('&appellationCodes[]=codeMetier'));
			});
		});

		describe('quand aucun code métier n’est fourni', () => {
			it('appelle l’api Immersion Facile sans le code métier fourni', () => {
				// Given
				const filtre: Stage3emeEt2ndFiltre = aStage3emeEt2ndFiltre();
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiImmersionFacileStage3emeEt2ndRepository(httpClientService, anErrorManagementService());

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
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([anApiImmersionFacileStage3emeEt2nd(
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
				const repository = new ApiImmersionFacileStage3emeEt2ndRepository(httpClientService, anErrorManagementService());

				// When
				const result = await repository.search(aStage3emeEt2ndFiltre()) as Success<ResultatRechercheStage3emeEt2nd>;

				// Then
				expect(result.result).toEqual(aResultatRechercheStage3emeEt2nd({
					nombreDeResultats: 1,
					resultats: [
						aStage3emeEt2nd({
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
				const repository = new ApiImmersionFacileStage3emeEt2ndRepository(httpClientService, errorManagementService);
				const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));

				// WHEN
				const result = await repository.search(aStage3emeEt2ndFiltre());

				// THEN
				expect(result).toEqual(createFailure(errorReturnedByErrorManagementService));
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Immersion Facile Stage 3eme et 2nd',
					contexte: 'search stage 3eme et 2nd',
					message: 'impossible d’effectuer une recherche de stage 3eme et 2nd',
				});
			});
		});
	});
});
