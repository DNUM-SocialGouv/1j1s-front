/**
 * @jest-environment jsdom
 */

import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { BffStage3eEt2deService } from '~/client/services/stage3eEt2de/bff.stage3eEt2de.service';
import { aCandidatureStage3eEt2de } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de.fixture';

describe('BffStage3eEt2deService', () => {
	describe('rechercherStage3eEt2de', () => {
		describe('quand la recherche est effectuée avec un code metier', () => {
			it('appelle le endpoint avec les bons paramètres', async () => {
				// Given
				const httpClientService = anHttpClientService();
				const bffStage3eEt2deService = new BffStage3eEt2deService(httpClientService);

				// When
				await bffStage3eEt2deService.rechercherStage3eEt2de({
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
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('stages-3e-et-2de?codeMetier=codeMetier'));
			});
		});
		describe('quand la recherche est effectuée sans code metier', () => {
			it('appelle le endpoint avec les bons paramètres', async () => {
				// Given
				const httpClientService = anHttpClientService();
				const bffStage3eEt2deService = new BffStage3eEt2deService(httpClientService);

				// When
				await bffStage3eEt2deService.rechercherStage3eEt2de({
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
				expect(httpClientService.get).toHaveBeenCalledWith('stages-3e-et-2de?distanceCommune=10&latitudeCommune=48.859&longitudeCommune=2.347');
			});
		});
	});

	describe('candidaterStage3eEt2de', () => {
		it('doit envoyer les bonnes données sur le bon endpoint bff', async () => {
			// Given
			const httpClientService = anHttpClientService();
			const bffStage3eEt2deService = new BffStage3eEt2deService(httpClientService);
			const candidatureStage3eEt2de = aCandidatureStage3eEt2de();

			// When
			await bffStage3eEt2deService.candidaterStage3eEt2de(candidatureStage3eEt2de);

			// Then
			expect(httpClientService.post).toHaveBeenCalledWith(expect.stringContaining('stages-3e-et-2de/candidature'), candidatureStage3eEt2de);
		});
	});
});
