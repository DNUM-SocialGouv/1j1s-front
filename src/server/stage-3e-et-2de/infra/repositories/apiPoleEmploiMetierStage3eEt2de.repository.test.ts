import { Success } from '~/server/errors/either';
import { aCacheService } from '~/server/services/cache/cache.service.fixture';
import { NullCacheService } from '~/server/services/cache/nullCache.service';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';
import { MetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de';
import { aMetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de.fixture';
import {
	anApiPoleEmploiMetierStage3eEt2de,
} from '~/server/stage-3e-et-2de/infra/repositories/apiPoleEmploiMetierStage3eEt2de.fixture';
import {
	ApiPoleEmploiMetierStage3eEt2deRepository,
} from '~/server/stage-3e-et-2de/infra/repositories/apiPoleEmploiMetierStage3eEt2de.repository';

describe('ApiPoleEmploiMetierStage3eEt2deRepository', () => {
	describe('search', () => {
		describe('quand le cache des appellations métier est disponible', () => {
			it('utilise le cache pour récupérer les appellations métiers', async () => {
				// Given
				const cacheService = aCacheService();
				jest.spyOn(cacheService, 'get').mockResolvedValueOnce([
					anApiPoleEmploiMetierStage3eEt2de({ code: '11573', libelle: 'Boulanger/Boulangère' }),
					anApiPoleEmploiMetierStage3eEt2de({ code: '11564', libelle: 'Boucher/Bouchère' }),
				]);
				const httpClientService = anAuthenticatedHttpClientService();

				const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, cacheService, anErrorManagementService());

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

				const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, cacheService, anErrorManagementService());

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
				const apiResponse = [anApiPoleEmploiMetierStage3eEt2de()];
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(apiResponse));

				const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, cacheService, anErrorManagementService());

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
				anApiPoleEmploiMetierStage3eEt2de({ code: '11573', libelle: 'Boulanger/Boulangère' }),
				anApiPoleEmploiMetierStage3eEt2de({ code: '11564', libelle: 'Boucher/Bouchère' }),
				anApiPoleEmploiMetierStage3eEt2de({ code: '17564', libelle: 'Apprenti boulanger' }),
			]));
			const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, new NullCacheService(), anErrorManagementService());

			// When
			const resultsMetiersStage3eEt2de = await repository.search('boulanger');

			// Then
			const expectedMetiersStage3eEt2de = [
				aMetierStage3eEt2de({
					code: '11573',
					label: 'Boulanger/Boulangère',
				}),
				aMetierStage3eEt2de({
					code: '17564',
					label: 'Apprenti boulanger',
				}),
			];
			expect(resultsMetiersStage3eEt2de.instance).toBe('success');
			expect((resultsMetiersStage3eEt2de as Success<MetierStage3eEt2de[]>).result).toStrictEqual(expectedMetiersStage3eEt2de);
		});

		describe('en cas d’erreur pendant la récupération des appellations métier', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// Given
				const httpError = anHttpError(500);
				const httpClientService = anAuthenticatedHttpClientService();
				jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(httpError);
				const errorManagementService = anErrorManagementService();
				const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, aCacheService(), errorManagementService);

				// When
				await repository.search('boulanger');

				// Then
				expect(httpClientService.get).toHaveBeenCalled();
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
					apiSource: 'API Pole Emploi',
					contexte: 'search appellation metiers stage 3e et 2de',
					message: 'impossible d’effectuer une recherche d’appellation metiers stage 3e et 2de',
				}));
			});
		});
	});

	describe('getMetiersByAppellationCodes', () => {
		describe('quand le cache des appellations métier est disponible', () => {
			it('utilise le cache pour récupérer les appellations métiers', async () => {
				// Given
				const cacheService = aCacheService();
				jest.spyOn(cacheService, 'get').mockResolvedValueOnce([
					anApiPoleEmploiMetierStage3eEt2de({ code: '11573', libelle: 'Boulanger/Boulangère' }),
					anApiPoleEmploiMetierStage3eEt2de({ code: '11564', libelle: 'Boucher/Bouchère' }),
					anApiPoleEmploiMetierStage3eEt2de({ code: '11565', libelle: 'Styliste' }),
				]);
				const httpClientService = anAuthenticatedHttpClientService();

				const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, cacheService, anErrorManagementService());

				// When
				await repository.getMetiersByAppellationCodes(['11573', '11564']);

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

				const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, cacheService, anErrorManagementService());

				// When
				await repository.getMetiersByAppellationCodes(['11573', '11564']);

				// Then
				expect(cacheService.get).toHaveBeenCalledWith('REFERENTIEL_METIER_STAGE_3EME');
				expect(httpClientService.get).toHaveBeenCalledWith('/appellations');
			});
			it('sauvegarde le résultat de l’appel en cache pour 24 heures', async () => {
				// Given
				const cacheService = aCacheService();
				jest.spyOn(cacheService, 'get').mockResolvedValue(null);
				const httpClientService = anAuthenticatedHttpClientService();
				const apiResponse = [anApiPoleEmploiMetierStage3eEt2de()];
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(apiResponse));

				const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, cacheService, anErrorManagementService());

				// When
				await repository.getMetiersByAppellationCodes(['11573', '11564']);

				// Then
				expect(cacheService.set).toHaveBeenCalledWith('REFERENTIEL_METIER_STAGE_3EME', apiResponse, 24 );
			});
		});

		it('retourne la liste des appellations métier en fonction des appellationCodes', async () => {
			// Given
			const httpClientService = anAuthenticatedHttpClientService();
			const apiResponse = [
				anApiPoleEmploiMetierStage3eEt2de({ code: '11573', libelle: 'Boulanger/Boulangère' }),
				anApiPoleEmploiMetierStage3eEt2de({ code: '11564', libelle: 'Boucher/Bouchère' }),
				anApiPoleEmploiMetierStage3eEt2de({ code: '11565', libelle: 'Styliste' }),
			];
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(apiResponse));
			const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, new NullCacheService(), anErrorManagementService());

			// When
			const resultsMetiersStage3eEt2de =
				await repository.getMetiersByAppellationCodes([apiResponse[0].code, apiResponse[2].code]);

			// Then
			const expectedMetiersStage3eEt2de = [
				aMetierStage3eEt2de({
					code: apiResponse[0].code,
					label: apiResponse[0].libelle,
				}),
				aMetierStage3eEt2de({
					code: apiResponse[2].code,
					label: apiResponse[2].libelle,
				}),
			];
			expect(resultsMetiersStage3eEt2de.instance).toBe('success');
			expect((resultsMetiersStage3eEt2de as Success<MetierStage3eEt2de[]>).result).toStrictEqual(expectedMetiersStage3eEt2de);
		});

		it('retourne une liste vide si aucun appellationCode n’est fourni', async () => {
			// Given
			const httpClientService = anAuthenticatedHttpClientService();
			const apiResponse = [
				anApiPoleEmploiMetierStage3eEt2de({ code: '11573', libelle: 'Boulanger/Boulangère' }),
				anApiPoleEmploiMetierStage3eEt2de({ code: '11564', libelle: 'Boucher/Bouchère' }),
				anApiPoleEmploiMetierStage3eEt2de({ code: '11565', libelle: 'Styliste' }),
			];
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(apiResponse));
			const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, new NullCacheService(), anErrorManagementService());

			// When
			const resultsMetiersStage3eEt2de =
				await repository.getMetiersByAppellationCodes([]);

			// Then
			const expectedMetiersStage3eEt2de: MetierStage3eEt2de[] = [];
			expect(resultsMetiersStage3eEt2de.instance).toBe('success');
			expect((resultsMetiersStage3eEt2de as Success<MetierStage3eEt2de[]>).result).toStrictEqual(expectedMetiersStage3eEt2de);
		});

		it('retourne seulement la liste des appellations ayant un appellationCode valide', async () => {
			// Given
			const httpClientService = anAuthenticatedHttpClientService();
			const apiResponse = [
				anApiPoleEmploiMetierStage3eEt2de({ code: '11573', libelle: 'Boulanger/Boulangère' }),
				anApiPoleEmploiMetierStage3eEt2de({ code: '11564', libelle: 'Boucher/Bouchère' }),
				anApiPoleEmploiMetierStage3eEt2de({ code: '11565', libelle: 'Styliste' }),
			];
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(apiResponse));
			const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, new NullCacheService(), anErrorManagementService());

			// When
			const resultsMetiersStage3eEt2de =
				await repository.getMetiersByAppellationCodes([apiResponse[0].code, 'invalid-code']);

			// Then
			const expectedMetiersStage3eEt2de = [
				aMetierStage3eEt2de({
					code: apiResponse[0].code,
					label: apiResponse[0].libelle,
				}),
			];
			expect(resultsMetiersStage3eEt2de.instance).toBe('success');
			expect((resultsMetiersStage3eEt2de as Success<MetierStage3eEt2de[]>).result).toStrictEqual(expectedMetiersStage3eEt2de);
		});

		describe('en cas d’erreur pendant la récupération des appellations métier', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// Given
				const httpError = anHttpError(500);
				const httpClientService = anAuthenticatedHttpClientService();
				jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(httpError);
				const errorManagementService = anErrorManagementService();
				const repository = new ApiPoleEmploiMetierStage3eEt2deRepository(httpClientService, aCacheService(), errorManagementService);

				// When
				await repository.getMetiersByAppellationCodes([]);

				// Then
				expect(httpClientService.get).toHaveBeenCalled();
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
					apiSource: 'API Pole Emploi',
					contexte: 'get appellations métiers à partir des appellationCodes stage 3e et 2de',
					message: 'impossible de récupérer les appellations métiers à partir des appellationCodes stage 3e et 2de',
				}));
			});
		});
	});
});
