import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';

describe('AlternanceService', () => {
	describe('rechercherAlternance', () => {
		it('appelle alternance avec la query', async () => {
			const httpClientService = anHttpClientService();
			const alternanceService = new AlternanceService(httpClientService);
			const alternanceQuery = {
				codeCommune: '13180',
				codeRomes: 'D123,D122',
				distanceCommune: '30',
				latitudeCommune: '2.37',
				longitudeCommune: '15.845',
			};

			await alternanceService.rechercherAlternance(alternanceQuery);

			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('alternances'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('codeCommune=13180'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('codeRomes=D123%2CD122'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('distanceCommune=30'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('latitudeCommune=2.37'));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('longitudeCommune=15.845'));
		});
		it('filtre les queries à undefined', async () => {
			const httpClientService = anHttpClientService();
			const alternanceService = new AlternanceService(httpClientService);
			const alternanceQuery = {
				codeCommune: undefined,
			};

			await alternanceService.rechercherAlternance(alternanceQuery);

			expect(httpClientService.get).not.toHaveBeenCalledWith(expect.stringContaining('codeCommune'));
		});
	});

});
