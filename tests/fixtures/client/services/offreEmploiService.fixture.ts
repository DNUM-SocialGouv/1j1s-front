import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

export function anOffreEmploiService(): OffreEmploiService {
  return {
    rechercherOffreEmploi: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffreEmploi() }),
  } as unknown as OffreEmploiService;
}

export function emptyOffreEmploiService(): OffreEmploiService {
  return {
    rechercherOffreEmploi: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffreEmploi({ nombreRésultats: 0, résultats: [] }),
    }),
  } as unknown as OffreEmploiService;
}
