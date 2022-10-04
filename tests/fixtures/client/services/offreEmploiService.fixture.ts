import { aBarmanOffreEmploi, aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

export function anOffreEmploiService(): OffreEmploiService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffreEmploi() }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffreEmploi() }),
    récupérerEchantillonJobÉtudiant: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffreEmploi() }),
    récupérerEchantillonOffreEmploi: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatsRechercheOffreEmploi() }),
  } as unknown as OffreEmploiService;
}

export function aSingleResultOffreEmploiService(): OffreEmploiService {
  return {
    rechercherJobÉtudiant: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffreEmploi({ nombreRésultats: 1, résultats: [aBarmanOffreEmploi()] }),
    }),
    rechercherOffreEmploi: jest.fn().mockResolvedValue({
      instance: 'success',
      result: aRésultatsRechercheOffreEmploi({ nombreRésultats: 1, résultats: [aBarmanOffreEmploi()] }),
    }),
  } as unknown as OffreEmploiService;
}

export function aNoResultOffreEmploiService(): OffreEmploiService {
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
