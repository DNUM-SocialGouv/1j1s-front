import { Actualité } from '~/server/cms/domain/actualité';
import { anActualite } from '~/server/cms/domain/actualite.fixture';
import { Article } from '~/server/cms/domain/article';
import { anArticle } from '~/server/cms/domain/article.fixture';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';
import { aMesureEmployeurList } from '~/server/cms/domain/mesureEmployeur.fixture';
import {
	anActualiteFixture,
	aStrapiArticleCollectionType,
	aStrapiArticleSlugList,
	aStrapiLesMesuresEmployeurs,
	aStrapiSingleType,
} from '~/server/cms/infra/repositories/strapi.fixture';
import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { Severity } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
	aPublicHttpClientService,
} from '~/server/services/http/publicHttpClient.service.fixture';
import { anArticlePathList } from '~/server/sitemap/domain/sitemap.fixture';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('strapi cms repository', () => {
	let httpClientService: PublicHttpClientService;
	let authenticatedHttpClientService: AuthenticatedHttpClientService;
	let strapiCmsRepository: StrapiRepository;

	describe('getSingleTypeDeprecated', () => {
		it('retourne une erreur lorsque il y a une erreur', async () => {
			const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
			const errorManagementService = anErrorManagementService(({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) }));
			const httpClientService = aPublicHttpClientService({
				get: jest.fn(async () => {
					throw httpError;
				}),
			});
			const httpError = anAxiosResponse(anHttpError(404));
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, errorManagementService);

			const result = await strapiCmsRepository.getActualitéList();

			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
				apiSource: 'API Strapi',
				contexte: 'get single type strapi',
				message: 'Erreur inconnue - Impossible de récupérer la ressource actualite',
			}));
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
	});

	describe('getCollectionTypeDeprecated', () => {
		it('retourne une erreur lorsque il y a une erreur', async () => {
			const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
			const errorManagementService = anErrorManagementService(({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) }));
			const httpClientService = aPublicHttpClientService({
				get: jest.fn(async () => {
					throw httpError;
				}),
			});
			const httpError = anAxiosResponse(anHttpError(404));
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, errorManagementService);

			const result = await strapiCmsRepository.getArticleBySlug('bad slug');

			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API Strapi',
				contexte: 'get collection type strapi',
				message: 'Erreur inconnue - Impossible de récupérer la ressource articles',
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
	});

	// TODO (SULI 23-10-2023): écrire le test complet de getCollectionType
	describe('getCollectionType', () => {
		it('retourne une erreur lorsque il y a une erreur', async () => {
			const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
			const errorManagementService = anErrorManagementService(({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) }));
			const httpClientService = aPublicHttpClientService({
				get: jest.fn(async () => {
					throw httpError;
				}),
			});
			const httpError = anAxiosResponse(anHttpError(404));
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, errorManagementService);

			const result = await strapiCmsRepository.getArticleBySlug('bad slug');

			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API Strapi',
				contexte: 'get collection type strapi',
				message: 'Erreur inconnue - Impossible de récupérer la ressource articles',
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
	});

	describe('save', () => {
		it('retourne une erreur lorsque il y a une erreur', async () => {
			const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
			const errorManagementService = anErrorManagementService(({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) }));
			const authenticatedHttpClientService = anAuthenticatedHttpClientService({
				post: jest.fn(async () => {
					throw httpError;
				}),
			});
			const httpError = anAxiosResponse(anHttpError(404));
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, errorManagementService);
			const result = await strapiCmsRepository.save('url', 'body erreur');

			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API Strapi',
				contexte: 'save strapi',
				message: 'Erreur inconnue - Impossible de sauvegarder la ressource url',
				severity: Severity.FATAL,
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
	});

	describe('getActualites', () => {
		describe('Si les actualités sont trouvées', () => {
			it('récupère les actualités', async () => {
				httpClientService = anAuthenticatedHttpClientService();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService());

				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(anActualiteFixture()));
				const expectedCartesActualite = [anActualite({ titre: 'Actualité 1' })];
				const result = await strapiCmsRepository.getActualitéList() as Success<Actualité[]>;

				expect(httpClientService.get).toHaveBeenCalledWith('actualite?populate=deep');
				expect(result.result).toEqual(expectedCartesActualite);
			});
		});
	});

	describe('getArticleBySlug', () => {
		describe('Si un article est trouvé', () => {
			it('récupère l‘article selon le slug', async () => {
				httpClientService = aPublicHttpClientService();
				authenticatedHttpClientService = anAuthenticatedHttpClientService();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
				);

				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiArticleCollectionType()));
				const expectedArticle = anArticle();
				const slug = 'mon-article';

				const result = await strapiCmsRepository.getArticleBySlug(slug) as Success<Article>;

				expect(result.result).toEqual(expectedArticle);
				expect(httpClientService.get).toHaveBeenCalledWith(`articles?filters[slug][$eq]=${slug}&populate=deep&pagination[pageSize]=100&pagination[page]=1`);
			});
		});
	});

	describe('listAllArticleSlug', () => {
		it('liste tous les identifiants d’article publiés sauf celles des faq', async () => {
			httpClientService = aPublicHttpClientService();
			authenticatedHttpClientService = anAuthenticatedHttpClientService();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
			);
			(httpClientService.get as jest.Mock)
				.mockResolvedValueOnce(anAxiosResponse(aStrapiArticleSlugList()));
			const expected = anArticlePathList();

			const { result } = await strapiCmsRepository.listAllArticleSlug() as Success<Array<string>>;

			expect(result).toEqual(expected);
			expect(httpClientService.get).toHaveBeenCalledWith('articles?fields[0]=slug&pagination[pageSize]=100&pagination[page]=1');
		});
	});

	describe('getMentionObligatoire', () => {
		it('retourne le mention obligatoire a consulter', async () => {
			httpClientService = anAuthenticatedHttpClientService();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
			);

			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({
				data: {
					attributes: {
						contenu: 'La présente politique de confidentialité définit et vous informe de la manière dont le Ministère du Travail utilise les données à caractère personnel en conformité à le Règlement t européen (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 et la loi nᵒ 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés. \n\n[...]\n\n**Gestion des cookies**\n\n**<u>Cookie présent sur le Site</u>**\n| Type de cookie | Nom | Finalité | Durée de conservation |\n| - | - | - | - |\n| ... | Cookie chocolat blanc | Être mangé | Courte |\n| ... | Cookie myrtille | Être mangé, normal | Extrèmement courte |\n\n[...]\n\n<u>**Comment paramétrer les cookies ?**</u>\n\n[...]\n\nLors de votre utilisation du Site, il vous est possible de configurer vos préférences sur les cookies à tout moment en vous rendant sur l’onglet « Gestion des cookies » disponible en bas de la page d’accueil du Site. \n',
						titre: 'Politique de confidentialité',
					},
				},
			}));

			const result = await strapiCmsRepository.getMentionObligatoire(MentionsObligatoires.POLITIQUES_CONFIDENTIALITES) as Success<Article>;

			expect(result.result).toEqual({
				contenu: 'La présente politique de confidentialité définit et vous informe de la manière dont le Ministère du Travail utilise les données à caractère personnel en conformité à le Règlement t européen (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 et la loi nᵒ 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés. \n\n[...]\n\n**Gestion des cookies**\n\n**<u>Cookie présent sur le Site</u>**\n| Type de cookie | Nom | Finalité | Durée de conservation |\n| - | - | - | - |\n| ... | Cookie chocolat blanc | Être mangé | Courte |\n| ... | Cookie myrtille | Être mangé, normal | Extrèmement courte |\n\n[...]\n\n<u>**Comment paramétrer les cookies ?**</u>\n\n[...]\n\nLors de votre utilisation du Site, il vous est possible de configurer vos préférences sur les cookies à tout moment en vous rendant sur l’onglet « Gestion des cookies » disponible en bas de la page d’accueil du Site. \n',
				titre: 'Politique de confidentialité',
			});
			expect(httpClientService.get).toHaveBeenCalledWith('politique-de-confidentialite?populate=deep');
		});
	});

	describe('getMesuresEmployeurs()', () => {
		describe('quand les cartes sont trouvées', () => {
			it('récupère les cartes jeunes', async () => {
				httpClientService = anAuthenticatedHttpClientService();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
				);

				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiSingleType(aStrapiLesMesuresEmployeurs())));
				const expectedMesuresEmployeurs = aMesureEmployeurList();
				const result = await strapiCmsRepository.getMesuresEmployeurs() as Success<MesureEmployeur[]>;

				expect(result.result).toEqual(expectedMesuresEmployeurs);
				expect(httpClientService.get).toHaveBeenCalledWith('les-mesures-employeurs?populate=deep');
			});
		});
	});
});
