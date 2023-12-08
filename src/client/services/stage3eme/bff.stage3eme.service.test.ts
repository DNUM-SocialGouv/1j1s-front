/**
 * @jest-environment jsdom
 */

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
					codeMetier: 'codeMetier',
				});

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith('stages-3eme?codeMetier=codeMetier');
			});
		});
		describe('quand la recherche est effectuée sans code metier', () => {
			it('appelle le endpoint avec les bons paramètres', async () => {
				// Given
				const httpClientService = anHttpClientService();
				const bffStage3emeService = new BffStage3emeService(httpClientService);

				// When
				await bffStage3emeService.rechercherStage3eme({});

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith('stages-3eme?');
			});
		});
	});

	describe('rechercherAppellationMetier', () => {
		describe('quand un mot clé est fourni', () => {
			it('appelle le endpoint avec les bons paramètres', async () => {
				// Given
				const httpClientService = anHttpClientService();
				const bffStage3emeService = new BffStage3emeService(httpClientService);

				// When
				await bffStage3emeService.rechercherAppellationMetier('motCle');

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith('stages-3eme/metiers?motCle=motCle');
			});
		});
		describe('quand aucun mot clé n’est fourni', () => {
			it('appelle le endpoint avec les bons paramètres', async () => {
				// Given
				const httpClientService = anHttpClientService();
				const bffStage3emeService = new BffStage3emeService(httpClientService);

				// When
				await bffStage3emeService.rechercherAppellationMetier();

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith('stages-3eme/metiers');
			});
		});
	});
});
