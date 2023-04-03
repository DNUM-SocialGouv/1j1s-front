import { CacheAxiosResponse } from 'axios-cache-interceptor';

import { Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';
import {
	aCacheAxiosResponse,
	aCachedHttpClientService,
	anAxiosError,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

describe('ApiAdresseRepository', () => {
	let httpClientService: CachedHttpClientService;
	let apiAdresseRepository: ApiAdresseRepository;

	beforeEach(() => {
		httpClientService = aCachedHttpClientService();
		apiAdresseRepository = new ApiAdresseRepository(httpClientService);
	});

	describe('getCommuneList', () => {
		describe('quand la liste de communes est trouvée',() => {
			it('retourne la liste des communes', async () => {
				jest
					.spyOn(httpClientService, 'get')
					.mockResolvedValue(aCacheAxiosResponse({
						attribution: 'BAN',
						features: [
							{
								geometry: {
									coordinates: [
										0.657551,
										47.336276,
									],
									type: 'Point',
								},
								properties: {
									city: 'Joué-lès-Tours',
									citycode: '37122',
									context: '37, Indre-et-Loire, Centre-Val de Loire',
									id: '37122',
									importance: 0.47292,
									label: 'Joué-lès-Tours',
									name: 'Joué-lès-Tours',
									population: 38444,
									postcode: '37300',
									score: 0.8611745454545454,
									type: 'municipality',
									x: 523139.52,
									y: 6695506.53,
								},
								type: 'Feature',
							},
							{
								geometry: {
									coordinates: [
										2.037578,
										49.012546,
									],
									type: 'Point',
								},
								properties: {
									city: 'Jouy-le-Moutier',
									citycode: '95323',
									context: '95, Val-d‘Oise, Île-de-France',
									id: '95323',
									importance: 0.43136,
									label: 'Jouy-le-Moutier',
									name: 'Jouy-le-Moutier',
									population: 16741,
									postcode: '95280',
									score: 0.8573963636363635,
									type: 'municipality',
									x: 629596.61,
									y: 6879611,
								},
								type: 'Feature',
							},
						],
						filters: {
							type: 'municipality',
						},
						licence: 'ETALAB-2.0',
						limit: 2,
						query: 'jou',
						type: 'FeatureCollection',
						version: 'draft',
					}) as CacheAxiosResponse);
				const recherche = 'jou';
				const expected = {
					résultats: [
						{
							code: '37122',
							codePostal: '37300',
							coordonnées: {
								latitude: 47.336276,
								longitude: 0.657551,
							},
							libelle: 'Joué-lès-Tours (37300)',
							ville: 'Joué-lès-Tours',
						},
						{
							code: '95323',
							codePostal: '95280',
							coordonnées: {
								latitude: 49.012546,
								longitude: 2.037578,
							},
							libelle: 'Jouy-le-Moutier (95280)',
							ville: 'Jouy-le-Moutier',
						},
					],
				};

				const { result } = await apiAdresseRepository.getCommuneList(recherche) as Success<RésultatsRechercheCommune>;

				expect(result).toEqual(expected);
			});
		});

		describe('quand l’api renvoie une erreur connue', () => {
			it('renvoie une demande incorrecte', async () => {
				jest
					.spyOn(httpClientService, 'get')
					.mockRejectedValue(anAxiosError({
						response: anAxiosResponse(
							{ message: 'q must contain at least 3 chars and start with a number or a letter' },
							400),
					}));
				const recherche = 'jou';

				const result = await apiAdresseRepository.getCommuneList(recherche) as Failure;

				expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
		});
	});
});
