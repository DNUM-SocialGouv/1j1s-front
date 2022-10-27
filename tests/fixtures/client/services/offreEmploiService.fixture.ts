import { aBarmanOffre, aRésultatsRechercheOffre } from '@tests/fixtures/domain/offre.fixture';

import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

export function anOffreEmploiService(): OffreEmploiService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffre() }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffre() }),
  } as unknown as OffreEmploiService;
}

export function aSingleResultOffreEmploiService(): OffreEmploiService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffre({ nombreRésultats: 1, résultats: [aBarmanOffre()] }),
    }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffre({ nombreRésultats: 1, résultats: [aBarmanOffre()] }),
    }),
  } as unknown as OffreEmploiService;
}

export function aNoResultOffreEmploiService(): OffreEmploiService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffre({ nombreRésultats: 0, résultats: [] }),
    }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffre({ nombreRésultats: 0, résultats: [] }),
    }),
  } as unknown as OffreEmploiService;
}
