/**
 * @jest-environment jsdom
 */
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { BffLocalisationService } from '~/client/services/localisation/bff.localisation.service';
import { createSuccess } from '~/server/errors/either';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { aRésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';

describe('BffLocalisationService', () => {
	describe('isInvalidLocalisationQuery', () => {
		it('enlève les espaces en début et fin de recherche', () => {
			const value = ' t ';
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			const result = bffLocalisationService.isInvalidLocalisationQuery(value);

			expect(result).toEqual(true);
		});

		it('quand la recherche contient un seul chiffre, on renvoie true', () => {
			const value = '1';
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			const result = bffLocalisationService.isInvalidLocalisationQuery(value);

			expect(result).toEqual(true);
		});

		it('quand la recherche contient un caractère spécial sauf accents et espaces, on renvoie true', () => {
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			const result = bffLocalisationService.isInvalidLocalisationQuery('$$');

			expect(result).toEqual(true);
		});

		it('quand la recherche contient qu‘une seule lettre, on renvoie true', () => {
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			const result = bffLocalisationService.isInvalidLocalisationQuery('a');

			expect(result).toEqual(true);
		});

		it('quand on recherche un nombre au format département métropolitain (sauf la corse), renvoie false', async () => {
			// Given
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			// When
			const result = bffLocalisationService.isInvalidLocalisationQuery('34');

			// Then
			expect(result).toEqual(false);
		});

		it('quand on recherche un nombre au format département d’outre-mer, renvoie false', () => {
			// Given
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			// When
			const result = bffLocalisationService.isInvalidLocalisationQuery('974');

			// Then
			expect(result).toEqual(false);
		});

		it('quand la recherche est le département de la Corse-du-Sud, renvoie false', async () => {
			// Given
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			// When
			const result = bffLocalisationService.isInvalidLocalisationQuery('2A');

			// Then
			expect(result).toEqual(false);
		});

		it('quand la recherche est le département de la Haute-Corse, renvoie false', async () => {
			// Given
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			// When
			const result = bffLocalisationService.isInvalidLocalisationQuery('2B');

			// Then
			expect(result).toEqual(false);
		});

		it('quand la recherche est un code postal, renvoie false', async () => {
			// Given
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			// When
			const result = bffLocalisationService.isInvalidLocalisationQuery('02141');

			// Then
			expect(result).toEqual(false);
		});

		it('quand la recherche contient des lettres, renvoie false', async () => {
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			const result = bffLocalisationService.isInvalidLocalisationQuery('Haut');

			expect(result).toEqual(false);
		});

		it('renvoie true quand la recherche contient moins de 3 caractères dont au moins 1 lettre', async () => {
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			const result = bffLocalisationService.isInvalidLocalisationQuery('1A');

			expect(result).toEqual(true);
		});

		it('renvoie true quand la recherche contient moins de 3 caractères dont au moins 1 lettre et un espace', async () => {
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			const result = bffLocalisationService.isInvalidLocalisationQuery('1A ');

			expect(result).toEqual(true);
		});
	});
	describe('rechercherLocalisation', () => {
		it('enlève les espaces en début et fin de recherche', async () => {
			const value = ' test  ';
			const valueTrimmed = 'test';
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);

			await bffLocalisationService.rechercherLocalisation(value);

			expect(httpClientService.get).toHaveBeenCalledWith(`localisations?recherche=${valueTrimmed}`);
		});
	});

	describe('rechercherCommune', () => {
		it('appelle communes avec la recherche', async () => {
			const httpClientService = anHttpClientService();
			const bffLocalisationService = new BffLocalisationService(httpClientService);
			const query='pari';
			const expected: RésultatsRechercheCommune = {
				résultats: [
					{
						code: '75056',
						codePostal: '75006',
						coordonnées: {
							latitude: 48.859,
							longitude: 2.347,
						},
						libelle: 'Paris (75006)',
						ville: 'Paris',
					},
					{
						code: '75115',
						codePostal: '75015',
						coordonnées: {
							latitude: 48.863367,
							longitude: 2.397152,
						},
						libelle: 'Paris 15e Arrondissement (75015)',
						ville: 'Paris 15e Arrondissement',
					},
				],
			};

			jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheCommune()));

			const result = await bffLocalisationService.rechercherCommune(query);

			expect(result).toEqual({
				instance: 'success',
				result: expected,
			});
			expect(httpClientService.get).toHaveBeenCalledWith('communes?q=pari');
		});
	});
});
