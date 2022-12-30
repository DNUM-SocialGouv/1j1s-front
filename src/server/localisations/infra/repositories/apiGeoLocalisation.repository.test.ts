import { createSuccess } from '~/server/errors/either';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { anAxiosResponse, anHttpClientService } from '~/server/services/http/httpClientService.fixture';

describe('ApiGeoLocalisationRepository', () => {
	let apiGeoLocalisationRepository: ApiGeoLocalisationRepository;

	let httpClientService: HttpClientService;

	beforeEach(() => {
		httpClientService = anHttpClientService();

		apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(
			httpClientService,
		);
	});

	describe('getCommuneListByNom', () => {
		it('retourne la liste des communes par nom trouvées par l‘api decoupage administratif', async () => {
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
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
			]));

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
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
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
			]));

			const result = await apiGeoLocalisationRepository.getCommuneListByNom('par');

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

			expect(result).toEqual(expected);
		});
	});

	describe('getDépartementListByNom', () => {
		it('retourne la liste des départements par nom trouvées par l‘api decoupage administratif', async () => {
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
				{
					_score: 1,
					code: '78',
					codeRegion: '11',
					nom: 'Yvelines',
				},
			]));

			const expected = createSuccess([
				{
					code: '78',
					nom: 'Yvelines',
				},
			]);

			const result = await apiGeoLocalisationRepository.getDépartementListByNom('yve');

			expect(result).toEqual(expected);
		});
	});

	describe('getRégionListByNom', () => {
		it('retourne la liste des régions par nom trouvées par l‘api decoupage administratif', async () => {
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
				{
					_score: 0.6920702684582538,
					code: '32',
					nom: 'Hauts-de-France',
				},
			]));

			const result = await apiGeoLocalisationRepository.getRégionListByNom('haut');

			const expected = createSuccess([
				{
					code: '32',
					nom: 'Hauts-de-France',
				},
			]);

			expect(result).toEqual(expected);
		});
	});

	describe('getCommuneListByCodePostal', () => {
		it('retourne la liste des communes par code postal trouvées par l‘api decoupage administratif', async () => {
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
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
			]));

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
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
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
			]));

			const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('78350');

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

			expect(result).toEqual(expected);
		});
	});

	describe('getCommuneListByNuméroDépartement', () => {
		it('retourne la liste des communes du département par numéro du département trouvées par l‘api decoupage administratif', async () => {
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
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
			]));

			const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

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

			expect(result).toEqual(expected);
		});
	});

	describe('getDépartementListByNuméroDépartement', () => {
		it('retourne la liste du département par numéro du département trouvées par l‘api decoupage administratif', async () => {
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
				{
					code: '78',
					codeRegion: '11',
					nom: 'Yvelines',
				},
			]));

			const result = await apiGeoLocalisationRepository.getDépartementListByNuméroDépartement('78');

			const expected = createSuccess([
				{
					code: '78',
					nom: 'Yvelines',
				},
			]);

			expect(result).toEqual(expected);
		});
	});
});
