import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

export function anOffreEmploiService(): OffreEmploiService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffreEmploi() }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffreEmploi() }),
  } as unknown as OffreEmploiService;
}

export function emptyOffreEmploiService(): OffreEmploiService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffreEmploi({ nombreRésultats: 0, résultats: [] }),
    }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffreEmploi({ nombreRésultats: 0, résultats: [] }),
    }),
  } as unknown as OffreEmploiService;
}
