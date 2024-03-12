import { StrapiService } from '~/server/cms/infra/repositories/strapi.service';
import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
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
