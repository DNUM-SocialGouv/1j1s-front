/**
 * @jest-environment jsdom
 */

import { BffEmploiEuropeService } from '~/client/services/europe/bff.emploiEurope.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';

describe('BffEmploiEuropeService', () => {
	describe('rechercherEmploiEurope', () => {
		it('appelle le endpoint avec les bons paramètres', async () => {
			// Given
			const emploiEuropeQuery = {
				motCle: 'barman',
				page: '1',
			};
			const httpClientService = anHttpClientService();
			const bffEmploiEuropeService = new BffEmploiEuropeService(httpClientService);

			// When
			await bffEmploiEuropeService.rechercherEmploiEurope(emploiEuropeQuery);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith('emplois-europe?motCle=barman&page=1');
		});
	});
});
