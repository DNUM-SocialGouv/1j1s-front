/**
 * @jest-environment jsdom
 */
import { stringify } from 'querystring';

import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { OffreService } from '~/client/services/offre/offre.service';
import { createSuccess, Success } from '~/server/errors/either';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';
import { anAxiosResponse } from '~/server/services/http/httpClientService.fixture';

describe('OffreService', () => {
	describe('rechercherOffreEmploi', () => {
		it('appelle emploi avec la requête', async () => {
			const httpClientService = anHttpClientService();
			const offreService = new OffreService(httpClientService);
			const offreEmploiQuery = 'motCle=barman&typeDeContrats=CDD%2CCDI&page=1';

			jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

			const result = await offreService.rechercherOffreEmploi(offreEmploiQuery);

			expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffre() });
			expect(httpClientService.get).toHaveBeenCalledWith('emplois?motCle=barman&typeDeContrats=CDD%2CCDI&page=1');
		});
	});

	describe('rechercherJobÉtudiant', () => {
		it('appelle emploi avec la requête', async () => {
			const httpClientService = anHttpClientService();
			const offreService = new OffreService(httpClientService);
			const offreEmploiQuery = 'motCle=barman&page=1';

			jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

			const result = await offreService.rechercherJobÉtudiant(offreEmploiQuery);

			expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffre() });
			expect(httpClientService.get).toHaveBeenCalledWith('jobs-etudiants?motCle=barman&page=1');
		});
	});

	describe('rechercherAlternance', () => {
		it('appelle le usecase avec la query', async () => {
			const client = anHttpClientService();
			const expectedAlternances = createSuccess(aRésultatsRechercheOffre());
			(client.get as jest.Mock).mockResolvedValue(expectedAlternances);

			const alternances = await new OffreService(client).rechercherAlternance({
				motCle: 'Boulanger',
			});

			expect(client.get).toHaveBeenCalledTimes(1);
			expect(client.get).toHaveBeenCalledWith(expect.stringContaining('alternances-pole-emploi'));
			expect(client.get).toHaveBeenCalledWith(expect.stringContaining('motCle=Boulanger'));
			expect(alternances).toEqual(expectedAlternances);
		});
	});
});
