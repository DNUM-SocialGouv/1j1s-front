import { CacheAxiosResponse } from 'axios-cache-interceptor';

import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ApiGeoRepository } from '~/server/localisations/infra/repositories/apiGeo.repository';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	aCacheAxiosResponse,
	aCachedHttpClientService,
} from '~/server/services/http/publicHttpClient.service.fixture';

const aLogInformationApiGeo = (contexte: string) => aLogInformation({
	apiSource: 'API Geo',
	contexte: `get ${contexte}`,
	message: `impossible de récupérer une ressource de type ${contexte}`,
});

describe('ApiGeoLocalisationRepository', () => {
	describe('getCommuneListByNom', () => {
		it('retourne la liste des communes par nom trouvées par l‘api decoupage administratif', async () => {
			const httpClientService = aCachedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					_score: 0.17971023846171058,
					code: '11177',
					codeDepartement: '11',
					codeEpci: '200043776',
					codeRegion: '76',
					codesPostaux: [
						'11140',
					],
					nom: 'Joucou',
					population: 32,
					siren: '211101779',
				},
				{
					_score: 0.17971023846171058,
					code: '21325',
					codeDepartement: '21',
					codeEpci: '200071173',
					codeRegion: '27',
					codesPostaux: [
						'21230',
					],
					nom: 'Jouey',
					population: 183,
					siren: '212103253',
				},
			]) as CacheAxiosResponse);
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());

			const result = await apiGeoLocalisationRepository.getCommuneListByNom('jou');

			const expected = createSuccess([
				{
					code: '11140',
					nom: 'Joucou',
				},
				{
					code: '21230',
					nom: 'Jouey',
				},
			]);
			expect(result).toEqual(expected);
		});

		it('quand les communes contiennent plusieurs code postaux retourne le premier code postal et pas le code insee lui meme', async () => {
			const httpClientService = aCachedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					_score: 0.3835418052804487,
					code: '81202',
					codeDepartement: '81',
					codeEpci: '200066124',
					codeRegion: '76',
					codesPostaux: [
						'81310',
					],
					nom: 'Parisot',
					population: 960,
					siren: '218102028',
				},
				{
					_score: 0.2965861155755376,
					code: '75056',
					codeDepartement: '75',
					codeEpci: '200054781',
					codeRegion: '11',
					codesPostaux: [
						'75001',
						'75002',
						'75003',
						'75004',
						'75005',
						'75006',
						'75007',
						'75008',
						'75009',
						'75010',
						'75011',
						'75012',
						'75013',
						'75014',
						'75015',
						'75116',
						'75016',
						'75017',
						'75018',
						'75019',
						'75020',
					],
					nom: 'Paris',
					population: 2165423,
					siren: '217500016',
				},
			]) as CacheAxiosResponse);
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());
			const expected = createSuccess([
				{
					code: '81310',
					nom: 'Parisot',
				},
				{
					code: '75001',
					nom: 'Paris',
				},
			]);

			const result = await apiGeoLocalisationRepository.getCommuneListByNom('par');

			expect(result).toEqual(expected);
		});

		describe('quand l’api renvoie une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const errorHttp = anHttpError(400, 'an http error');
				const httpClientService = aCachedHttpClientService();
				const errorManagementService = anErrorManagementService();
				jest.spyOn(httpClientService, 'get').mockRejectedValue(errorHttp);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, errorManagementService);

				const result = await apiGeoLocalisationRepository.getCommuneListByNom('par');

				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorHttp, aLogInformationApiGeo('communes'));
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
		});
	});

	describe('getDépartementListByNom', () => {
		it('supprime les parenthèses de la recherche avant d’appeler l’api', async () => {
			const httpClientService = aCachedHttpClientService();
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());

			await apiGeoLocalisationRepository.getDépartementListByNom('Yvelines (78)');

			expect(httpClientService.get).toHaveBeenCalledWith('departements?nom=Yvelines 78');
		});

		it('supprime le numéro du département si c’est un département corse avant d’appeler l’api', async () => {
			const httpClientService = aCachedHttpClientService();
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());

			await apiGeoLocalisationRepository.getDépartementListByNom('Haute-Corse (2B)');

			expect(httpClientService.get).toHaveBeenCalledWith('departements?nom=Haute-Corse');
		});

		it('retourne la liste des départements par nom trouvées par l‘api decoupage administratif', async () => {
			const httpClientService = aCachedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					_score: 1,
					code: '78',
					codeRegion: '11',
					nom: 'Yvelines',
				},
			]) as CacheAxiosResponse);
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());
			const expected = createSuccess([
				{
					code: '78',
					nom: 'Yvelines',
				},
			]);

			const result = await apiGeoLocalisationRepository.getDépartementListByNom('yve');

			expect(result).toEqual(expected);
		});

		describe('quand l’api renvoie une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const errorHttp = anHttpError(400, 'an http error');
				const httpClientService = aCachedHttpClientService();
				const errorManagementService = anErrorManagementService();
				jest.spyOn(httpClientService, 'get').mockRejectedValue(errorHttp);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, errorManagementService);

				const result = await apiGeoLocalisationRepository.getDépartementListByNom('yve');

				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorHttp, aLogInformationApiGeo('départements'));
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
		});
	});

	describe('getRégionListByNom', () => {
		it('retourne la liste des régions par nom trouvées par l‘api decoupage administratif', async () => {
			const httpClientService = aCachedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					_score: 0.6920702684582538,
					code: '32',
					nom: 'Hauts-de-France',
				},
			]) as CacheAxiosResponse);
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());

			const result = await apiGeoLocalisationRepository.getRégionListByNom('haut');

			const expected = createSuccess([
				{
					code: '32',
					nom: 'Hauts-de-France',
				},
			]);

			expect(result).toEqual(expected);
		});

		describe('quand l’api renvoie une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const errorHttp = anHttpError(400, 'an http error');
				const httpClientService = aCachedHttpClientService();
				const errorManagementService = anErrorManagementService();
				jest.spyOn(httpClientService, 'get').mockRejectedValue(errorHttp);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, errorManagementService);

				const result = await apiGeoLocalisationRepository.getRégionListByNom('haut');

				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorHttp, aLogInformationApiGeo('régions'));
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
		});
	});

	describe('getCommuneListByCodePostal', () => {
		it('retourne la liste des communes par code postal trouvées par l‘api decoupage administratif', async () => {
			const httpClientService = aCachedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					code: '92022',
					codeDepartement: '92',
					codeEpci: '200054781',
					codeRegion: '11',
					codesPostaux: [
						'92370',
					],
					nom: 'Chaville',
					population: 20771,
					siren: '219200227',
				},
			]) as CacheAxiosResponse);
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());

			const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('92370');

			const expected = createSuccess([
				{
					code: '92370',
					nom: 'Chaville',
				},
			]);

			expect(result).toEqual(expected);
		});

		it('quand les communes contiennent plusieurs code postaux retourne le code insee de la commune avec le premier code postal et pas le code insee lui meme', async () => {
			const httpClientService = aCachedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					code: '78322',
					codeDepartement: '78',
					codeEpci: '247800584',
					codeRegion: '11',
					codesPostaux: [
						'78350',
					],
					nom: 'Jouy-en-Josas',
					population: 8049,
					siren: '217803220',
				},
				{
					code: '78343',
					codeDepartement: '78',
					codeEpci: '247800584',
					codeRegion: '11',
					codesPostaux: [
						'78350',
					],
					nom: 'Les Loges-en-Josas',
					population: 1629,
					siren: '217803436',
				},
			]) as CacheAxiosResponse);
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());
			const expected = createSuccess([
				{
					code: '78350',
					nom: 'Jouy-en-Josas',
				},
				{
					code: '78350',
					nom: 'Les Loges-en-Josas',
				},
			]);

			const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('78350');

			expect(result).toEqual(expected);
		});

		describe('quand l’api renvoie une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const errorHttp = anHttpError(400, 'an http error');
				const httpClientService = aCachedHttpClientService();
				const errorManagementService = anErrorManagementService();
				jest.spyOn(httpClientService, 'get').mockRejectedValue(errorHttp);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, errorManagementService);

				const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('78350');

				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorHttp, aLogInformationApiGeo('communes'));
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
		});
	});

	describe('getCommuneListByNuméroDépartement', () => {
		it('retourne la liste des communes du département par numéro du département trouvées par l‘api decoupage administratif', async () => {
			const httpClientService = aCachedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					code: '92002',
					codeDepartement: '92',
					codeEpci: '200054781',
					codeRegion: '11',
					codesPostaux: [
						'92160',
					],
					nom: 'Antony',
					population: 62760,
					siren: '219200029',
				},
				{
					code: '92004',
					codeDepartement: '92',
					codeEpci: '200054781',
					codeRegion: '11',
					codesPostaux: [
						'92600',
					],
					nom: 'Asnières-sur-Seine',
					population: 87143,
					siren: '219200045',
				},
			]) as CacheAxiosResponse);
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());
			const expected = createSuccess([
				{
					code: '92160',
					nom: 'Antony',
				},
				{
					code: '92600',
					nom: 'Asnières-sur-Seine',
				},
			]);

			const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

			expect(result).toEqual(expected);
		});

		describe('quand l’api renvoie une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const errorHttp = anHttpError(400, 'an http error');
				const httpClientService = aCachedHttpClientService();
				const errorManagementService = anErrorManagementService();
				jest.spyOn(httpClientService, 'get').mockRejectedValue(errorHttp);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, errorManagementService);

				const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorHttp, aLogInformationApiGeo('communes'));
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
		});
	});

	describe('getDépartementListByNuméroDépartement', () => {
		it('Met en majuscule la recherche', async () => {
			const httpClientService = aCachedHttpClientService();
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());

			await apiGeoLocalisationRepository.getDépartementListByNuméroDépartement('2a');

			expect(httpClientService.get).toHaveBeenCalledWith('departements?code=2A');
		});
		it('retourne la liste du département par numéro du département trouvées par l‘api decoupage administratif', async () => {
			const httpClientService = aCachedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					code: '78',
					codeRegion: '11',
					nom: 'Yvelines',
				},
			]) as CacheAxiosResponse);
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());
			const expected = createSuccess([
				{
					code: '78',
					nom: 'Yvelines',
				},
			]);

			const result = await apiGeoLocalisationRepository.getDépartementListByNuméroDépartement('78');

			expect(result).toEqual(expected);
		});

		describe('quand l’api renvoie une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const errorHttp = anHttpError(400, 'an http error');
				const httpClientService = aCachedHttpClientService();
				const errorManagementService = anErrorManagementService();
				jest.spyOn(httpClientService, 'get').mockRejectedValue(errorHttp);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, errorManagementService);

				const result = await apiGeoLocalisationRepository.getDépartementListByNuméroDépartement('78');

				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorHttp, aLogInformationApiGeo('départements'));
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
		});
	});

	describe('getCodeRegionByLongitudeLatitude', () => {
		it('appelle l’api geoLocalisation avec les bons paramètres', async () => {
			const longitude = 2;
			const latitude = 1;
			const httpClientService = aCachedHttpClientService();
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());

			await apiGeoLocalisationRepository.getCodeRegionByLongitudeLatitude(longitude, latitude);

			expect(httpClientService.get).toHaveBeenCalledWith(`communes?lon=${longitude}&lat=${latitude}`);
		});

		it('retourne le code Région du premier élément remonté par l‘api decoupage administratif quand le code région est défini', async () => {
			const httpClientService = aCachedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					code: '92022',
					codeDepartement: '92',
					codeEpci: '200054781',
					codeRegion: '11',
					codesPostaux: [
						'92370',
					],
					nom: 'Chaville',
					population: 20771,
					siren: '219200227',
				},
			]) as CacheAxiosResponse);
			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, anErrorManagementService());
			const expected = createSuccess('11');

			const result = await apiGeoLocalisationRepository.getCodeRegionByLongitudeLatitude(1, 2);

			expect(result).toEqual(expected);
		});

		it('log une erreur et retourne une failure quand il n’y a aucun résultat', async () => {
			const failureReturnedByErrorManagement = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
			const httpClientService = aCachedHttpClientService();
			const errorManagementService = anErrorManagementService();
			const noAssociatedCodeRegionError = new Error('Il n‘y a pas de code région associé au code postal fourni');
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([]) as CacheAxiosResponse);
			jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(failureReturnedByErrorManagement);

			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, errorManagementService);

			const result = await apiGeoLocalisationRepository.getCodeRegionByLongitudeLatitude(1, 2);

			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(noAssociatedCodeRegionError,
				aLogInformation({ apiSource: 'API Geo', contexte: 'get communes', message: 'impossible de récupérer une ressource de type communes' }),
			);
			expect(result).toEqual(failureReturnedByErrorManagement);
		});

		it('log une erreur et retourne une failure quand le code région n’est pas définie', async () => {
			const failureReturnedByErrorManagement = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
			const httpClientService = aCachedHttpClientService();
			const errorManagementService = anErrorManagementService();
			const noAssociatedCodeRegionError = new Error('Il n‘y a pas de code région associé au code postal fourni');
			jest.spyOn(httpClientService, 'get').mockResolvedValue(aCacheAxiosResponse([
				{
					code: '92022',
					codeDepartement: '92',
					codeEpci: '200054781',
					codeRegion: undefined,
					codesPostaux: [
						'92370',
					],
					nom: 'Chaville',
					population: 20771,
					siren: '219200227',
				},
			]) as CacheAxiosResponse);
			jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(failureReturnedByErrorManagement);

			const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, errorManagementService);

			const result = await apiGeoLocalisationRepository.getCodeRegionByLongitudeLatitude(1, 2);

			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(noAssociatedCodeRegionError,
				aLogInformation({ apiSource: 'API Geo', contexte: 'get communes', message: 'impossible de récupérer une ressource de type communes' }),
			);
			expect(result).toEqual(failureReturnedByErrorManagement);
		});

		describe('quand l’api renvoie une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const errorHttp = anHttpError(400, 'an http error');
				const httpClientService = aCachedHttpClientService();
				const errorManagementService = anErrorManagementService();
				jest.spyOn(httpClientService, 'get').mockRejectedValue(errorHttp);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				const apiGeoLocalisationRepository = new ApiGeoRepository(httpClientService, errorManagementService);

				const result = await apiGeoLocalisationRepository.getCodeRegionByLongitudeLatitude(1, 2);

				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorHttp, aLogInformationApiGeo('communes'));
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
		});
	});
});
