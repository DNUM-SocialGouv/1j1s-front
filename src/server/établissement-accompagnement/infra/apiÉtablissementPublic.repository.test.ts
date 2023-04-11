import { createSuccess, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { anOrderedÉtablissementAccompagnementList } from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';
import { aRésultatRechercheÉtablissementPublicResponse } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.fixture';
import { ApiÉtablissementPublicRepository } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAxiosResponse,
	aPublicHttpClientService,
} from '~/server/services/http/publicHttpClient.service.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

describe('ApiÉtablissementPublicRepository', () => {
	describe('search', () => {
		describe('lorsque la recherche retourne une 200', () => {
			it('retourne la liste des établissements d‘accompagnement', async () => {
				// given
				const httpClient = aPublicHttpClientService();
				jest
					.spyOn(httpClient, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatRechercheÉtablissementPublicResponse()));
				const repository = new ApiÉtablissementPublicRepository(httpClient, aLoggerService());
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

		describe('lorsque l‘api retourne une erreur 404', () => {
			it('renvoie une erreur demande incorrecte', async () => {
				// given
				const httpClient = aPublicHttpClientService();
				jest.spyOn(httpClient, 'get').mockRejectedValue(anHttpError(404, '',
					anAxiosResponse({}, 404),
				));
				const commune = '46100';
				const typeAccompagnement = 'cij';

				const repository = new ApiÉtablissementPublicRepository(httpClient, aLoggerService());
        
				// when
				const result = await repository.search({ commune, typeAccompagnement });
        
				// then
				expect(httpClient.get).toHaveBeenCalledWith('communes/46100/cij');
				expect((result as Failure).errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
		});
    
		describe('lorsque l‘api retourne une erreur autre que 404', () => {
			it('renvoie une erreur service indisponible', async () => {
				// given
				const httpClient = aPublicHttpClientService();
				jest.spyOn(httpClient, 'get').mockRejectedValue(anHttpError(500));
				const commune = '46100';
				const typeAccompagnement = 'cij';

				const repository = new ApiÉtablissementPublicRepository(httpClient, aLoggerService());
        
				// when
				const result = await repository.search({ commune, typeAccompagnement });
        
				// then
				expect(httpClient.get).toHaveBeenCalledWith('communes/46100/cij');
				expect((result as Failure).errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
			});
		});
	});
});
