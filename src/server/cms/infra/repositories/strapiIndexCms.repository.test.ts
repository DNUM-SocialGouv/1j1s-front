import { anOffreDeStageDepot } from '~/client/services/stage/stageService.fixture';
import { uneAnnonceDeLogement, uneAnnonceDeLogementResponse } from '~/server/cms/domain/annonceDeLogement.fixture';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import {
	anOffreDeStageDepotStrapi,
	uneOffreDeStage,
	uneOffreDeStageResponse,
} from '~/server/cms/domain/offreDeStage.fixture';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';
import { StrapiIndexCmsRepository } from '~/server/cms/infra/repositories/strapiIndexCms.repository';
import { createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClientService';
import {
	anAxiosError,
	anAxiosResponse,
	anHttpClientService,
	anHttpClientServiceWithAuthentification,
} from '~/server/services/http/httpClientService.fixture';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('strapi index cms repository', () => {
	let httpClientService: HttpClientService;
	let authenticatedHttpClientService: HttpClientServiceWithAuthentification;
	let strapiIndexCmsRepository: StrapiIndexCmsRepository;


	describe('getAnnonceDeLogementBySlug', () => {
		describe('Si un logement est trouvé', () => {
			it('récupère l‘annonce de logement selon le slug', async () => {
				httpClientService = anHttpClientService();
				authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				strapiIndexCmsRepository = new StrapiIndexCmsRepository(httpClientService, authenticatedHttpClientService);
				(httpClientService.get as jest.Mock).mockResolvedValue({ data: { data: { attributes: uneAnnonceDeLogementResponse() } } });
				const slug = uneAnnonceDeLogementResponse().slug;

				const { result } = await strapiIndexCmsRepository.getAnnonceDeLogementBySlug(slug) as Success<AnnonceDeLogement>;
				expect(result).toEqual(uneAnnonceDeLogement());
				expect(httpClientService.get).toHaveBeenCalledWith(`slugify/slugs/annonce-de-logement/${slug}?populate=deep`);
			});
		});

		describe('Si le logement n‘est pas trouvé', () => {
			it('retourne une erreur', async () => {
				httpClientService = anHttpClientService();
				authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				strapiIndexCmsRepository = new StrapiIndexCmsRepository(httpClientService, authenticatedHttpClientService);
				(httpClientService.get as jest.Mock).mockRejectedValue(anAxiosError({ response: anAxiosResponse({}, 404) }));
				const slug = 'bad-slug';

				const result = await strapiIndexCmsRepository.getAnnonceDeLogementBySlug(slug) as Failure;
				expect(result.errorType).toEqual(ErreurMétier.CONTENU_INDISPONIBLE);
			});
		});
	});

	describe('getOffreDeStageBySlug', () => {
		describe('Si un stage est trouvé', () => {
			it('récupère l‘offre de stage selon le slug', async () => {
				httpClientService = anHttpClientService();
				authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				strapiIndexCmsRepository = new StrapiIndexCmsRepository(httpClientService, authenticatedHttpClientService);
				(httpClientService.get as jest.Mock).mockResolvedValue({ data: { data: { attributes: uneOffreDeStageResponse() } } });
				const slug = uneOffreDeStageResponse().slug;

				const { result } = await strapiIndexCmsRepository.getOffreDeStageBySlug(slug) as Success<OffreDeStage>;
				expect(result).toEqual(uneOffreDeStage());
				expect(httpClientService.get).toHaveBeenCalledWith(`slugify/slugs/offre-de-stage/${slug}?populate=deep`);
			});
		});
	});

	describe('saveOffreDeStage', () => {
		describe('Si un stage est fourni', () => {
			it('il est enregistré dans le cms', async () => {
				// Given

				const httpClientService = anHttpClientService();
				const authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				const strapiIndexCmsRepository = new StrapiIndexCmsRepository(httpClientService, authenticatedHttpClientService);

				const offreDeStageDepot = anOffreDeStageDepot();
				const offreDeStageDepotStrapi = anOffreDeStageDepotStrapi();

				// When
				jest.spyOn(authenticatedHttpClientService, 'post').mockResolvedValue(anAxiosResponse(anOffreDeStageDepotStrapi()));
				const result = await strapiIndexCmsRepository.saveOffreDeStage(offreDeStageDepot);

				// Then
				expect(result).toEqual(createSuccess(anOffreDeStageDepotStrapi()));
				expect(authenticatedHttpClientService.post).toHaveBeenCalledWith('offre-de-stage', { data: offreDeStageDepotStrapi });
			});
		});
	});
});
