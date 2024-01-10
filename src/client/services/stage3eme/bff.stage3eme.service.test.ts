/**
 * @jest-environment jsdom
 */

import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { BffStage3emeService } from '~/client/services/stage3eme/bff.stage3eme.service';

describe('BffStage3emeService', () => {
	describe('rechercherStage3eme', () => {
		describe('quand la recherche est effectuée avec un code metier', () => {
			it('appelle le endpoint avec les bons paramètres', async () => {
				// Given
				const httpClientService = anHttpClientService();
				const bffStage3emeService = new BffStage3emeService(httpClientService);

				// When
				await bffStage3emeService.rechercherStage3eme({
					...aCommuneQuery({
						codeCommune: '75056',
						codePostal: '75006',
						latitudeCommune: '48.859',
						libelleCommune: 'Paris (75006)',
						longitudeCommune: '2.347',
						ville: 'Paris',
					}),
					codeMetier: 'codeMetier',
					distanceCommune: '10',
				});

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('stages-3eme?codeMetier=codeMetier'));
			});
		});
		describe('quand la recherche est effectuée sans code metier', () => {
			it('appelle le endpoint avec les bons paramètres', async () => {
				// Given
				const httpClientService = anHttpClientService();
				const bffStage3emeService = new BffStage3emeService(httpClientService);

				// When
				await bffStage3emeService.rechercherStage3eme({
					...aCommuneQuery({
						codeCommune: '75056',
						codePostal: '75006',
						latitudeCommune: '48.859',
						libelleCommune: 'Paris (75006)',
						longitudeCommune: '2.347',
						ville: 'Paris',
					}),
					distanceCommune: '10',
				});

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith('stages-3eme?distanceCommune=10&latitudeCommune=48.859&longitudeCommune=2.347');
			});
		});
	});
});
