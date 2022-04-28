import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { HttpClientService } from '~/client/services/httpClient.service';
import { LoggerService } from '~/client/services/logger.service';
import { OffreEmploiService } from '~/client/services/offreEmploi.service';

describe('OffreEmploiService', () => {
  describe('rechercherOffreEmploi', () => {
    it('appelle emploi avec le filtre', async () => {
      const sessionId = 'ma-session-id';
      const loggerService = new LoggerService(sessionId);
      const httpClientService = new HttpClientService(sessionId, loggerService);
      const offreEmploiService = new OffreEmploiService(httpClientService);
      const filtre = 'barman';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploi());

      const result = await offreEmploiService.rechercherOffreEmploi(filtre);

      expect(result).toEqual(aRésultatsRechercheOffreEmploi());
    });
  });
});
