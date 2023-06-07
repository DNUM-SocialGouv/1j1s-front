import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	anOrderedÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';
import {
	aRésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.fixture';
import {
	ApiÉtablissementPublicRepository,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

const logInformation = aLogInformation({
	apiSource: 'API Établissement Public',
	contexte: 'search établissement public',
	message: '[API Établissement Public] Impossible d‘effectuer la recherche d‘Établissement Public',
});
describe('ApiÉtablissementPublicRepository', () => {
	describe('search', () => {

		describe('lorsque la recherche retourne une 200', () => {
			it('retourne la liste des établissements d‘accompagnement', async () => {
				// given
				const httpClient = aPublicHttpClientService();
				jest
					.spyOn(httpClient, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatRechercheÉtablissementPublicResponse()));
				const repository = new ApiÉtablissementPublicRepository(httpClient, anErrorManagementService());
				const expected = createSuccess(anOrderedÉtablissementAccompagnementList());
				const commune = '46100';
				const typeAccompagnement = 'cij';

				// when
				const result = await repository.search({ commune, typeAccompagnement });

				// then
				expect(httpClient.get).toHaveBeenCalledWith('communes/46100/cij');
				expect(result).toEqual(expected);
			});
		});
		describe('lorsqu‘il y a une erreur lors de la recherche des établissements public', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// given
				const httpError = anHttpError(404, '', anAxiosResponse({}, 404));
				const httpClient = aPublicHttpClientService({
					get: jest.fn(async () => {
						throw httpError;
					}),
				});
				const expectedError = ErreurMétier.DEMANDE_INCORRECTE;
				const errorManagementService = anErrorManagementService({
					handleFailureError: jest.fn(() => createFailure(expectedError)),
				});
				const commune = '46100';
				const typeAccompagnement = 'cij';
				const repository = new ApiÉtablissementPublicRepository(httpClient, errorManagementService);

				// when
				const result = await repository.search({ commune, typeAccompagnement });

				// then
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, logInformation);
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
		});
	});
});
