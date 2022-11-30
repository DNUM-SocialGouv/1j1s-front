import {
  ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { createSuccess } from '~/server/errors/either';
import {
  anÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';

describe('établissementAccompagnementService', () => {
  describe('rechercher', () => {
    it('retourne la liste des établissement d‘accompagnement', async () => {
      const httpClient = anHttpClientService();
      jest.spyOn(httpClient, 'get').mockResolvedValue(createSuccess(anÉtablissementAccompagnementList()));
      const établissementAccompagnementService = new ÉtablissementAccompagnementService(httpClient);
      const query = 'codeCommune=41600';

      const actual = await établissementAccompagnementService.rechercher(query);

      expect(httpClient.get).toHaveBeenCalledWith('etablissements-accompagnement?codeCommune=41600');
      expect(actual).toEqual(createSuccess(anÉtablissementAccompagnementList()));
    });
  });
});
