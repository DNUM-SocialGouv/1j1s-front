/**
 * @jest-environment jsdom
 */
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { createSuccess } from '~/server/errors/either';
import { aCommuneListApiResponse, aDépartementListApiResponse } from '~/server/localisations/domain/localisation.fixture';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { aRésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';
import {
	RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

describe('LocalisationService', () => {
	describe('rechercherLocalisation', () => {
		const list = ['1','3','4','6'];
		list.forEach((value) => {
			it(`quand la recherche contient ${value}, on renvoie null`, async () => {
				const httpClientService = anHttpClientService();
				const localisationService = new LocalisationService(httpClientService);

				const result = await localisationService.rechercherLocalisation(value);

				expect(result).toEqual(null);
			});
		});

		it('quand la recherche contient un caractère spécial sauf accents et espaces, on renvoie null', async () => {
			const httpClientService = anHttpClientService();
			const localisationService = new LocalisationService(httpClientService);

			const result = await localisationService.rechercherLocalisation('$$');

			expect(result).toEqual(null);
		});

		it('quand la recherche contient qu‘un seul caractère, on renvoie null', async () => {
			const httpClientService = anHttpClientService();
			const localisationService = new LocalisationService(httpClientService);

			const result = await localisationService.rechercherLocalisation('a');

			expect(result).toEqual(null);
		});

		it('quand on recherche un nombre, on renvoie les départements et les communes', async () => {
			// Given
			const httpClientService = anHttpClientService();
			const localisationService = new LocalisationService(httpClientService);
			const expected: RechercheLocalisationApiResponse = {
				communeList: [
					{
						code: '34299',
						codePostal: '34290',
						libelle: 'Abeilhan (34290)',
						nom: 'Abeilhan',
					},
					{
						code: '34233',
						codePostal: '34230',
						libelle: 'Adissan (34230)',
						nom: 'Adissan',
					},
				],
				départementList: [
					{
						code: '34',
						libelle: 'Hérault (34)',
						nom: 'Hérault',
					},
				],
				régionList: [],
			};

			jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess({
				communeList: aCommuneListApiResponse(),
				départementList: aDépartementListApiResponse(),
				régionList: [],
			}));

			// When
			const result = await localisationService.rechercherLocalisation('34');

			// Then
			expect(result).toEqual(createSuccess(expected));
			expect(httpClientService.get).toHaveBeenCalledWith('localisations?recherche=34');
		});

		it('quand la recherche contient des lettres, on renvoie les communes, départements et régions correspondantes', async () => {
			const httpClientService = anHttpClientService();
			const localisationService = new LocalisationService(httpClientService);

			const rechercheLocalisationApiResponse: RechercheLocalisationApiResponse = {
				communeList: [{
					code: '02141',
					codePostal: '02140',
					libelle: 'Haution (02140)',
					nom: 'Haution',
				}],
				départementList: [{
					code: '68',
					libelle: 'Haut-Rhin (68)',
					nom: 'Haut-Rhin',
				}],
				régionList: [{
					code: '32',
					libelle: 'Haut-de-France (32)',
					nom: 'Haut-de-France',
				}],
			};

			jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(rechercheLocalisationApiResponse));

			const result = await localisationService.rechercherLocalisation('Haut');

			const expected: RechercheLocalisationApiResponse = {
				communeList: [{
					code: '02141',
					codePostal: '02140',
					libelle: 'Haution (02140)',
					nom: 'Haution',
				}],
				départementList: [{
					code: '68',
					libelle: 'Haut-Rhin (68)',
					nom: 'Haut-Rhin',
				}],
				régionList: [{
					code: '32',
					libelle: 'Haut-de-France (32)',
					nom: 'Haut-de-France',
				}],
			};

			expect(result).toEqual(createSuccess(expected));
			expect(httpClientService.get).toHaveBeenCalledWith('localisations?recherche=Haut');
		});

		it('renvoie null quand la recherche contient moins de 3 caractères dont au moins 1 lettre', async () => {
			const httpClientService = anHttpClientService();
			const localisationService = new LocalisationService(httpClientService);

			const result = await localisationService.rechercherLocalisation('1A');

			expect(result).toEqual(null);
		});
	});

	describe('rechercherCommune', () => {
		it('appelle communes avec la recherche', async () => {
			const httpClientService = anHttpClientService();
			const localisationService = new LocalisationService(httpClientService);
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

			const result = await localisationService.rechercherCommune(query);

			expect(result).toEqual({
				instance: 'success',
				result: expected,
			});
			expect(httpClientService.get).toHaveBeenCalledWith('communes?q=pari');
		});
	});
});
