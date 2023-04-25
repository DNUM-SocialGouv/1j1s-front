/**
 * @jest-environment jsdom
 */

import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { OffreService } from '~/client/services/offre/offre.service';
import { createSuccess } from '~/server/errors/either';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';

describe('OffreService', () => {
	describe('rechercherOffreEmploi', () => {
		it('appelle emploi avec la requête', async () => {
			const httpClientService = anHttpClientService();
			const offreService = new OffreService(httpClientService);
			const offreEmploiQuery = {
				motCle: 'barman',
				page: '1',
				typeDeContrat: [
					'CDD',
					'CDI',
				],
			};

			jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

			const result = await offreService.rechercherOffreEmploi(offreEmploiQuery);

			expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffre() });
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('emplois'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('motCle=barman'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('typeDeContrat=CDD'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('typeDeContrat=CDI'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('page=1'));
		});
		it('nettoie les clés vides', async () => {
			const httpClientService = anHttpClientService();
			const offreService = new OffreService(httpClientService);
			const offreEmploiQuery = {
				motCle: undefined,
			};

			jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

			await offreService.rechercherOffreEmploi(offreEmploiQuery);

			expect(httpClientService.get).toHaveBeenCalledWith(expect.not.stringContaining('motCle'));
		});
	});

	describe('rechercherJobÉtudiant', () => {
		it('appelle emploi avec la requête', async () => {
			const httpClientService = anHttpClientService();
			const offreService = new OffreService(httpClientService);
			const offreEmploiQuery = {
				motCle: 'barman',
				page: '1',
			};

			jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

			const result = await offreService.rechercherJobÉtudiant(offreEmploiQuery);

			expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffre() });
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('jobs-etudiants'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('motCle=barman'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('page=1'));
		});
	});
});
