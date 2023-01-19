import { OffreService } from '~/client/services/offre/offre.service';
import { aBarmanOffre, aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';

export function anOffreService(): OffreService {
	return {
		rechercherAlternance: jest.fn().mockResolvedValue({ instance: 'success', result: aRésultatsRechercheOffre() }),
		rechercherJobÉtudiant: jest.fn().mockResolvedValue({ instance: 'success', result: aRésultatsRechercheOffre() }),
		rechercherOffreEmploi: jest.fn().mockResolvedValue({ instance: 'success', result: aRésultatsRechercheOffre() }),
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
