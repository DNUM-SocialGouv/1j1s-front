import { createSuccess, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { anÉtablissementAccompagnementList } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';
import {
  anAxiosError,
  anAxiosResponse,
  anHttpClientService,
} from '~/server/services/http/httpClientService.fixture';

import { aRésultatRechercheÉtablissementPublicResponse } from './apiÉtablissementPublic.fixture';
import { ApiÉtablissementPublicRepository } from './apiÉtablissementPublic.repository';

describe('ApiÉtablissementPublicRepository', () => {
  describe('search', () => {
    describe('lorsque la recherche retourne une 200', () => {
      it('retourne la liste des établissements d‘accompagnement', async () => {
        // given
        const httpClient = anHttpClientService();
        jest
          .spyOn(httpClient, 'get')
          .mockResolvedValue(anAxiosResponse(aRésultatRechercheÉtablissementPublicResponse()));
        const repository = new ApiÉtablissementPublicRepository(httpClient);
        const expected = createSuccess(anÉtablissementAccompagnementList());
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
        const httpClient = anHttpClientService();
        jest.spyOn(httpClient, 'get').mockRejectedValue(anAxiosError({
          response: anAxiosResponse({}, 404),
        }));
        const commune = '46100';
        const typeAccompagnement = 'cij';

        const repository = new ApiÉtablissementPublicRepository(httpClient);
        
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
        const httpClient = anHttpClientService();
        jest.spyOn(httpClient, 'get').mockRejectedValue(anAxiosError({
          response: anAxiosResponse({}, 500),
        }));
        const commune = '46100';
        const typeAccompagnement = 'cij';

        const repository = new ApiÉtablissementPublicRepository(httpClient);
        
        // when
        const result = await repository.search({ commune, typeAccompagnement });
        
        // then
        expect(httpClient.get).toHaveBeenCalledWith('communes/46100/cij');
        expect((result as Failure).errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
      });
    });
  });
});
