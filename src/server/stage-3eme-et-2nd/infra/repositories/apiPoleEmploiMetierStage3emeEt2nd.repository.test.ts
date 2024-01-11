import { Success } from '~/server/errors/either';
import { aCacheService } from '~/server/services/cache/cache.service.fixture';
import { NullCacheService } from '~/server/services/cache/nullCache.service';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';
import { MetierStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/metierStage3emeEt2nd';
import { aMetierStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/metierStage3emeEt2nd.fixture';
import {
	anApiPoleEmploiMetierStage3emeEt2nd,
} from '~/server/stage-3eme-et-2nd/infra/repositories/anApiPoleEmploiMetierStage3emeEt2nd';
import {
	ApiPoleEmploiMetierStage3emeEt2ndRepository,
} from '~/server/stage-3eme-et-2nd/infra/repositories/apiPoleEmploiMetierStage3emeEt2nd.repository';

describe('ApiPoleEmploiMetierStage3emeEt2ndRepository', () => {
	describe('search', () => {
		describe('quand le cache des appellations métier est disponible', () => {
			it('utilise le cache pour récupérer les appellations métiers', async () => {
				// Given
				const cacheService = aCacheService();
				jest.spyOn(cacheService, 'get').mockResolvedValueOnce([
					anApiPoleEmploiMetierStage3emeEt2nd({ code: '11573', libelle: 'Boulanger/Boulangère' }),
					anApiPoleEmploiMetierStage3emeEt2nd({ code: '11564', libelle: 'Boucher/Bouchère' }),
				]);
				const httpClientService = anAuthenticatedHttpClientService();

				const repository = new ApiPoleEmploiMetierStage3emeEt2ndRepository(httpClientService, cacheService, anErrorManagementService());

				// When
				await repository.search('boulanger');

				// Then
				expect(cacheService.get).toHaveBeenCalledWith('REFERENTIEL_METIER_STAGE_3EME');
				expect(httpClientService.get).not.toHaveBeenCalled();
			});
		});

		describe('quand le cache des appellations métier n’est pas disponible', () => {
			it('appelle l’api Pole Emploi avec les bon paramètres', async () => {
				// Given
				const cacheService = aCacheService();
				jest.spyOn(cacheService, 'get').mockResolvedValue(null);
				const httpClientService = anAuthenticatedHttpClientService();
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([]));

				const repository = new ApiPoleEmploiMetierStage3emeEt2ndRepository(httpClientService, cacheService, anErrorManagementService());

				// When
				await repository.search('boulanger');

				// Then
				expect(cacheService.get).toHaveBeenCalledWith('REFERENTIEL_METIER_STAGE_3EME');
				expect(httpClientService.get).toHaveBeenCalledWith('/appellations');
			});
			it('sauvegarde le résultat de l’appel en cache pour 24 heures', async () => {
				// Given
				const cacheService = aCacheService();
				jest.spyOn(cacheService, 'get').mockResolvedValue(null);
				const httpClientService = anAuthenticatedHttpClientService();
				const apiResponse = [anApiPoleEmploiMetierStage3emeEt2nd()];
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(apiResponse));

				const repository = new ApiPoleEmploiMetierStage3emeEt2ndRepository(httpClientService, cacheService, anErrorManagementService());

				// When
				await repository.search('boulanger');

				// Then
				expect(cacheService.set).toHaveBeenCalledWith('REFERENTIEL_METIER_STAGE_3EME', apiResponse, 24 );
			});
		});

		it('retourne la liste des appellations métier filtrée par mot clé recherché', async () => {
			// Given
			const httpClientService = anAuthenticatedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
				anApiPoleEmploiMetierStage3emeEt2nd({ code: '11573', libelle: 'Boulanger/Boulangère' }),
				anApiPoleEmploiMetierStage3emeEt2nd({ code: '11564', libelle: 'Boucher/Bouchère' }),
				anApiPoleEmploiMetierStage3emeEt2nd({ code: '17564', libelle: 'Apprenti boulanger' }),
			]));
			const repository = new ApiPoleEmploiMetierStage3emeEt2ndRepository(httpClientService, new NullCacheService(), anErrorManagementService());

			// When
			const resultsMetiersStage3eme = await repository.search('boulanger') as Success<MetierStage3emeEt2nd[]>;

			// Then
			const expectedMetiersStage3eme = [
				aMetierStage3emeEt2nd({
					code: '11573',
					label: 'Boulanger/Boulangère',
				}),
				aMetierStage3emeEt2nd({
					code: '17564',
					label: 'Apprenti boulanger',
				}),
			];
			expect(resultsMetiersStage3eme.instance).toBe('success');
			expect((resultsMetiersStage3eme as Success<MetierStage3emeEt2nd[]>).result).toStrictEqual(expectedMetiersStage3eme);
		});

		describe('en cas d’erreur pendant la récupération des appellations métier', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// Given
				const httpError = anHttpError(500);
				const httpClientService = anAuthenticatedHttpClientService();
				jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(httpError);
				const errorManagementService = anErrorManagementService();
				const repository = new ApiPoleEmploiMetierStage3emeEt2ndRepository(httpClientService, aCacheService(), errorManagementService);

				// When
				await repository.search('boulanger');

				// Then
				expect(httpClientService.get).toHaveBeenCalled();
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
					apiSource: 'API Pole Emploi',
					contexte: 'search appellation metiers stage 3eme et 2nd',
					message: 'impossible d’effectuer une recherche d’appellation metiers stage 3eme et 2nd',
				}));
			});
		});
	});
});
