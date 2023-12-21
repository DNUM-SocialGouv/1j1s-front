import { AlternanceQueryParams } from '~/client/hooks/useAlternanceQuery';
import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';

describe('AlternanceService', () => {
	describe('rechercherAlternance', () => {
		it('appelle alternance avec la query', async () => {
			const httpClientService = anHttpClientService();
			const alternanceService = new AlternanceService(httpClientService);
			const alternanceQuery = {
				codeRomes: ['D123', 'D122'],
				distanceCommune: '30',
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
				...aCommuneQuery({
					codeCommune: '13180',
					latitudeCommune: '2.37',
					longitudeCommune: '15.845',
				}),
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
				codeRomes: ['D123', 'D122'],
				distanceCommune: '30',
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
				...aCommuneQuery({
					codeCommune: undefined,
					latitudeCommune: '2.37',
					longitudeCommune: '15.845',
				}),
			};

			await alternanceService.rechercherAlternance(alternanceQuery);

			expect(httpClientService.get).not.toHaveBeenCalledWith(expect.stringContaining('codeCommune'));
		});
		it('filtres les queries d’affichage', async () => {
			const httpClientService = anHttpClientService();
			const alternanceService = new AlternanceService(httpClientService);
			const alternanceQuery: AlternanceQueryParams = {
				codeRomes: ['D123', 'D122'],
				distanceCommune: '30',
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
				...aCommuneQuery({
					libelleCommune: 'Paris (75001)',
				}),
			};

			await alternanceService.rechercherAlternance(alternanceQuery);

			expect(httpClientService.get).not.toHaveBeenCalledWith(expect.stringContaining('libelleCommune'));
		});
	});
});
