import { createFailure, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';
import { ResultatRechercheStage3eme, Stage3emeFiltre } from '~/server/stage-3eme/domain/stage3eme';
import { aResultatRechercheStage3eme, aStage3eme } from '~/server/stage-3eme/domain/stage3eme.fixture';
import {
	anApiImmersionFacileStage3eme,
} from '~/server/stage-3eme/infra/repositories/apiImmersionFacileStage3eme.fixture';
import {
	ApiImmersionFacileStage3emeRepository,
} from '~/server/stage-3eme/infra/repositories/apiImmersionFacileStage3eme.repository';

describe('ApiImmersionFacileStage3emeRepository', () => {
	describe('search', () => {
		describe('quand un code métier est fourni', () => {
			it('appelle l’api Immersion Facile avec les bon paramètres', () => {
				// Given
				const filtre: Stage3emeFiltre = {
					codeMetier: 'codeMetier',
				};
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiImmersionFacileStage3emeRepository(httpClientService, anErrorManagementService());

				// When
				repository.search(filtre);

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith('/search?latitude=48.8535&longitude=2.34839&distanceKm=10&appellationCodes=codeMetier');
			});
		});

		describe('quand aucun code métier n’est fourni', () => {
			it('appelle l’api Immersion Facile avec les bon paramètres', () => {
				// Given
				const filtre: Stage3emeFiltre = {};
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiImmersionFacileStage3emeRepository(httpClientService, anErrorManagementService());

				// When
				repository.search(filtre);

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith('/search?latitude=48.8535&longitude=2.34839&distanceKm=10');
			});
		});

		describe('quand l’api Immersion Facile répond avec des données valide', () => {
			it('retourne les données de l’api Immersion Facile', async () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([anApiImmersionFacileStage3eme(
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
				const repository = new ApiImmersionFacileStage3emeRepository(httpClientService, anErrorManagementService());

				// When
				const result = await repository.search({}) as Success<ResultatRechercheStage3eme>;

				// Then
				expect(result.result).toEqual(aResultatRechercheStage3eme({
					nombreDeResultats: 1,
					resultats: [
						aStage3eme({
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
				const repository = new ApiImmersionFacileStage3emeRepository(httpClientService, errorManagementService);
				const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));
				
				// WHEN
				const result = await repository.search({});
				
				// THEN
				expect(result).toEqual(createFailure(errorReturnedByErrorManagementService));
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Immersion Facile Stage 3eme',
					contexte: 'search stage 3eme',
					message: 'impossible d’effectuer une recherche de stage 3eme',
				});
			});
		});
	});
});
