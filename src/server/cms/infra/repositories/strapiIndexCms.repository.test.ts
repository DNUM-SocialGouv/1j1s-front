import {
	uneAnnonceDeLogement,
	uneAnnonceDeLogementResponse,
} from '~/server/cms/domain/annonceDeLogement.fixture';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import {
	uneOffreDeStage,
	uneOffreDeStageResponse,
} from '~/server/cms/domain/offreDeStage.fixture';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';
import { StrapiIndexCmsRepository } from '~/server/cms/infra/repositories/strapiIndexCms.repository';
import {
	Failure,
	Success,
} from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClientService';
import {
	anAxiosError,
	anAxiosResponse,
	anHttpClientService,
} from '~/server/services/http/httpClientService.fixture';

describe('strapi index cms repository', () => {
	let httpClientService: HttpClientService;
	let strapiIndexCmsRepository: StrapiIndexCmsRepository;


	describe('getAnnonceDeLogementBySlug', () => {
		describe('Si un logement est trouvé', () => {
			it('récupère l‘annonce de logement selon le slug', async () => {
				httpClientService = anHttpClientService();
				strapiIndexCmsRepository = new StrapiIndexCmsRepository(httpClientService);
				(httpClientService.get as jest.Mock).mockResolvedValue({ data: { attributes: uneAnnonceDeLogementResponse() } });
				const slug = uneAnnonceDeLogementResponse().slug;

				const { result } = await strapiIndexCmsRepository.getAnnonceDeLogementBySlug(slug) as Success<AnnonceDeLogement>;
				expect(result).toEqual(uneAnnonceDeLogement());
				expect(httpClientService.get).toHaveBeenCalledWith(`slugify/slugs/annonce-de-logement/${slug}?populate=deep`);
			});
		});

		describe('Si le logement n‘est pas trouvé', () => {
			it('retourne une erreur', async () => {
				httpClientService = anHttpClientService();
				strapiIndexCmsRepository = new StrapiIndexCmsRepository(httpClientService);
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
				strapiIndexCmsRepository = new StrapiIndexCmsRepository(httpClientService);
				(httpClientService.get as jest.Mock).mockResolvedValue({ data: { attributes: uneOffreDeStageResponse() } });
				const slug = uneOffreDeStageResponse().slug;

				const { result } = await strapiIndexCmsRepository.getOffreDeStageBySlug(slug) as Success<OffreDeStage>;
				expect(result).toEqual(uneOffreDeStage());
				expect(httpClientService.get).toHaveBeenCalledWith(`slugify/slugs/offre-de-stage/${slug}?populate=deep`);
			});
		});
	});

});
