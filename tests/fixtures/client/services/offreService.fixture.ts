import { aBarmanOffre, aRésultatsRechercheOffre } from '@tests/fixtures/domain/offre.fixture';

import { OffreService } from '~/client/services/offre/offre.service';

export function anOffreService(): OffreService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffre() }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffre() }),
  } as unknown as OffreService;
}

export function aSingleResultOffreService(): OffreService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffre({ nombreRésultats: 1, résultats: [aBarmanOffre()] }),
    }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffre({ nombreRésultats: 1, résultats: [aBarmanOffre()] }),
    }),
  } as unknown as OffreService;
}

export function aNoResultOffreService(): OffreService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffre({ nombreRésultats: 0, résultats: [] }),
    }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffre({ nombreRésultats: 0, résultats: [] }),
    }),
  } as unknown as OffreService;
}
