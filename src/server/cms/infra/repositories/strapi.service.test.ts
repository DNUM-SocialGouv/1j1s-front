import { aStrapiCollectionType, aStrapiSingleType } from '~/server/cms/infra/repositories/strapi.fixture';
import { StrapiService } from '~/server/cms/infra/repositories/strapi.service';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { Severity } from '~/server/services/error/errorManagement.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
	aPublicHttpClientService,
} from '~/server/services/http/publicHttpClient.service.fixture';

describe('strapiService', () => {
	describe('getSingleType', () => {
		it('appelle strapi avec les bons parametres', async () => {
			const httpClientService = aPublicHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aStrapiSingleType({})));
			const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), anErrorManagementService());

			await strapiService.getSingleType('ressource', 'query');

			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith('ressource?query');
		});

		it('lorsque l‘appel à Strapi est en succès, renvoie un succès avec les données à récupérées', async () => {
			const httpClientService = aPublicHttpClientService();
			const data = {
				test1: 'test1',
				test2: 'test2',
			};
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aStrapiSingleType(data)));
			const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), anErrorManagementService());

			const result = await strapiService.getSingleType('ressource', 'query');

			expect(result).toEqual(createSuccess(data));
		});

		it('lorsque l‘appel à Strapi est en échec, appelle le service de management d‘erreur et relais l‘erreur', async () => {
			const httpClientService = aPublicHttpClientService();
			const httpError = anHttpError(500);
			const ressource = 'ressource';
			const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
			const errorManagementService = anErrorManagementService();
			jest.spyOn(httpClientService, 'get').mockRejectedValue(httpError);
			jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));
			const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), errorManagementService);

			const result = await strapiService.getSingleType(ressource, 'query');

			expect(errorManagementService.handleFailureError).toHaveBeenCalledTimes(1);
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
				apiSource: 'API Strapi',
				contexte: 'get single type strapi',
				message: `Erreur inconnue - Impossible de récupérer la ressource ${ressource}`,
			}));
			expect(result).toEqual(createFailure(errorReturnedByErrorManagementService));
		});
	});

	describe('getCollectionType', () => {
		describe('lorsque les appels à Strapi sont en succès', () => {
			it('fait un premier appel à strapi pour récupérer les informations de pagination et la première page', async () => {
				const MAX_PAGINATION_SIZE = '100';
				const httpClientService = aPublicHttpClientService();
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aStrapiCollectionType([])));
				const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), anErrorManagementService());

				await strapiService.getCollectionType('ressource', 'query');

				expect(httpClientService.get).toHaveBeenCalledWith(`ressource?query&pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=1`);
			});

			it('lorsqu‘il y a qu‘une seule page, appelle une seule fois strapi et créer un succès avec les données de la première page', async () => {
				const httpClientService = aPublicHttpClientService();
				const data = [
					{ test1: 'test1' },
					{ test1: 'test2' },
				];
				const responseStrapi = anAxiosResponse(aStrapiCollectionType(data, {
					page: 1,
					pageCount: 1,
				}));
				jest.spyOn(httpClientService, 'get').mockResolvedValue(responseStrapi);

				const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), anErrorManagementService());

				const result = await strapiService.getCollectionType('ressource', 'query');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(result).toEqual(createSuccess(data));
			});

			it('lorsqu‘il y a plusieurs pages, appelle strapi autant de fois qu‘il existe de page et créer un succès avec la concatenation des données des différentes pages', async () => {
				const MAX_PAGINATION_SIZE = '100';
				const httpClientService = aPublicHttpClientService();
				const dataPremierePage = [{ test: 'page1' }, { test: 'page1' }];
				const dataDeuxiemePage = [{ test: 'page2' }, { test: 'page2' }];
				const dataTroisiemePage = [{ test: 'page3' }, { test: 'page3' }];
				const dataQuatriemePage = [{ test: 'page4' }, { test: 'page4' }];
				const responseStrapiPremierePage = aStrapiCollectionType(dataPremierePage, { page: 1, pageCount: 4 });
				const responseStrapiDeuxiemePage = aStrapiCollectionType(dataDeuxiemePage, { page: 2, pageCount: 4 });
				const responseStrapiTroisiemePage = aStrapiCollectionType(dataTroisiemePage, { page: 3, pageCount: 4 });
				const responseStrapiQuatriemePage = aStrapiCollectionType(dataQuatriemePage, { page: 4, pageCount: 4 });

				jest.spyOn(httpClientService, 'get')
					.mockResolvedValueOnce(anAxiosResponse(responseStrapiPremierePage))
					.mockResolvedValueOnce(anAxiosResponse(responseStrapiDeuxiemePage))
					.mockResolvedValueOnce(anAxiosResponse(responseStrapiTroisiemePage))
					.mockResolvedValueOnce(anAxiosResponse(responseStrapiQuatriemePage));

				const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), anErrorManagementService());

				const result = await strapiService.getCollectionType('ressource', 'query');

				expect(httpClientService.get).toHaveBeenCalledTimes(4);
				expect(httpClientService.get).toHaveBeenCalledWith(`ressource?query&pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=1`);
				expect(httpClientService.get).toHaveBeenCalledWith(`ressource?query&pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=2`);
				expect(httpClientService.get).toHaveBeenCalledWith(`ressource?query&pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=3`);
				expect(httpClientService.get).toHaveBeenCalledWith(`ressource?query&pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=4`);
				expect(result).toEqual(createSuccess([...dataPremierePage, ...dataDeuxiemePage, ...dataTroisiemePage, ...dataQuatriemePage]));
			});
		});

		it('lorsqu‘un appel à Strapi est en echec, appelle le service de management d‘erreur et relais l‘erreur', async () => {
			const httpClientService = aPublicHttpClientService();
			const httpError = anHttpError(500);
			const ressource = 'ressource';
			const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
			const errorManagementService = anErrorManagementService();
			jest.spyOn(httpClientService, 'get').mockRejectedValue(httpError);
			jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));
			const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), errorManagementService);

			const result = await strapiService.getCollectionType(ressource, 'query');

			expect(errorManagementService.handleFailureError).toHaveBeenCalledTimes(1);
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
				apiSource: 'API Strapi',
				contexte: 'get collection type strapi',
				message: `Erreur inconnue - Impossible de récupérer la ressource ${ressource}`,
			}));
			expect(result).toEqual(createFailure(errorReturnedByErrorManagementService));
		});
	});

	describe('getFirstFromCollectionType', () => {
		it('appelle une fois strapi et avec les bons paramètres', async () => {
			const MAX_PAGINATION_SIZE = '100';
			const httpClientService = aPublicHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aStrapiCollectionType([])));
			const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), anErrorManagementService());

			await strapiService.getFirstFromCollectionType('ressource', 'query');

			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(`ressource?query&pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=1`);
		});

		describe('lorsque l‘appel à Strapi est en succès', () => {
			it('lorsqu‘il n‘y a pas de résultat, renvoie une failure de contenu indisponible', async () => {
				const httpClientService = aPublicHttpClientService();
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aStrapiCollectionType([])));
				const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), anErrorManagementService());

				const result = await strapiService.getFirstFromCollectionType('ressource', 'query');

				expect(result).toEqual(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));
			});

			it('lorsqu‘il y a plusieurs résultats, renvoie un succès avec le premier résultat de la liste', async () => {
				const httpClientService = aPublicHttpClientService();
				const data = [{ test: 'test1' }, { test: 'test2' }, { test: 'test3' }];
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aStrapiCollectionType(data)));
				const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), anErrorManagementService());

				const result = await strapiService.getFirstFromCollectionType('ressource', 'query');

				expect(result).toEqual(createSuccess({ test: 'test1' }));
			});
		});

		it('lorsqu‘un appel à Strapi est en echec, appelle le service de management d‘erreur et relais l‘erreur', async () => {
			const httpClientService = aPublicHttpClientService();
			const httpError = anHttpError(500);
			const ressource = 'ressource';
			const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
			const errorManagementService = anErrorManagementService();
			jest.spyOn(httpClientService, 'get').mockRejectedValue(httpError);
			jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));
			const strapiService = new StrapiService(httpClientService, anAuthenticatedHttpClientService(), errorManagementService);

			const result = await strapiService.getFirstFromCollectionType(ressource, 'query');

			expect(errorManagementService.handleFailureError).toHaveBeenCalledTimes(1);
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
				apiSource: 'API Strapi',
				contexte: 'get first from collection type strapi',
				message: `Erreur inconnue - Impossible de récupérer la ressource ${ressource}`,
			}));
			expect(result).toEqual(createFailure(errorReturnedByErrorManagementService));
		});
	});

	describe('save', () => {
		it('appelle Strapi avec les bons paramètres', async () => {
			const authenticatedHttpClientService = anAuthenticatedHttpClientService();
			const bodyASauvegarder = { test: 'test' };
			jest.spyOn(authenticatedHttpClientService, 'post').mockResolvedValue(anAxiosResponse({}));
			const strapiService = new StrapiService(aPublicHttpClientService(), authenticatedHttpClientService, anErrorManagementService());

			await strapiService.save('ressource', bodyASauvegarder);

			expect(authenticatedHttpClientService.post).toHaveBeenCalledTimes(1);
			expect(authenticatedHttpClientService.post).toHaveBeenCalledWith('ressource', { data: bodyASauvegarder });
		});

		it('lorsque l‘appel à Strapi est en succès, renvoie un succès avec le retour de strapi', async () => {
			const authenticatedHttpClientService = anAuthenticatedHttpClientService();
			const bodyASauvegarder = { test: 'test' };
			const retourDuPostStrapi = 'la requête est un succès';
			jest.spyOn(authenticatedHttpClientService, 'post').mockResolvedValue(anAxiosResponse(retourDuPostStrapi));
			const strapiService = new StrapiService(aPublicHttpClientService(), authenticatedHttpClientService, anErrorManagementService());

			const result = await strapiService.save('ressource', bodyASauvegarder);

			expect(result).toEqual(createSuccess(retourDuPostStrapi));
		});

		it('lorsque l‘appel à Strapi est en echec, appelle le service de management d‘erreur avec une criticité fatal et relais l‘erreur', async () => {
			const authenticatedHttpClientService = anAuthenticatedHttpClientService();
			const httpError = anHttpError(500);
			const ressource = 'ressource';
			const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
			const errorManagementService = anErrorManagementService();
			jest.spyOn(authenticatedHttpClientService, 'post').mockRejectedValue(httpError);
			jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));
			const strapiService = new StrapiService(aPublicHttpClientService(), authenticatedHttpClientService, errorManagementService);

			const result = await strapiService.save('ressource', { test: 'test' });

			expect(errorManagementService.handleFailureError).toHaveBeenCalledTimes(1);
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
				apiSource: 'API Strapi',
				contexte: 'save strapi',
				message: `Erreur inconnue - Impossible de sauvegarder la ressource ${ressource}`,
				severity: Severity.FATAL,
			}));
			expect(result).toEqual(createFailure(errorReturnedByErrorManagementService));
		});
	});
});
