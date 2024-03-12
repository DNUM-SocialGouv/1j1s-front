import { aStrapiSingleType } from '~/server/cms/infra/repositories/strapi.fixture';
import { StrapiService } from '~/server/cms/infra/repositories/strapi.service';
import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { Severity } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
	aPublicHttpClientService,
} from '~/server/services/http/publicHttpClient.service.fixture';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('strapiService', () => {
	let httpClientService: PublicHttpClientService;
	let authenticatedHttpClientService: AuthenticatedHttpClientService;
	let strapiCmsRepository: StrapiService;

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

	// TODO (SULI 23-10-2023): écrire le test complet de getCollectionType
	describe('getCollectionType', () => {
		it('retourne une erreur lorsque il y a une erreur', async () => {
			const ressource = 'ressource';
			const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
			const errorManagementService = anErrorManagementService(({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) }));
			const httpClientService = aPublicHttpClientService({
				get: jest.fn(async () => {
					throw httpError;
				}),
			});
			const httpError = anAxiosResponse(anHttpError(404));
			strapiCmsRepository = new StrapiService(httpClientService, authenticatedHttpClientService, errorManagementService);

			const result = await strapiCmsRepository.getCollectionType(ressource, 'query');

			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API Strapi',
				contexte: 'get collection type strapi',
				message: `Erreur inconnue - Impossible de récupérer la ressource ${ressource}`,
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
	});

	describe('save', () => {
		it('retourne une erreur lorsque il y a une erreur', async () => {
			const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
			const errorManagementService = anErrorManagementService(({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) }));
			const authenticatedHttpClientService = anAuthenticatedHttpClientService({
				post: jest.fn(async () => {
					throw httpError;
				}),
			});
			const httpError = anAxiosResponse(anHttpError(404));
			strapiCmsRepository = new StrapiService(httpClientService, authenticatedHttpClientService, errorManagementService);
			const result = await strapiCmsRepository.save('url', 'body erreur');

			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API Strapi',
				contexte: 'save strapi',
				message: 'Erreur inconnue - Impossible de sauvegarder la ressource url',
				severity: Severity.FATAL,
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
	});
});
