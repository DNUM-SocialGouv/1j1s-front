import { anOffreDeStageDepot } from '~/client/services/stage/stageService.fixture';
import { Actualité } from '~/server/cms/domain/actualité';
import { anActualite } from '~/server/cms/domain/actualite.fixture';
import { anAnnonceDeLogement, anAnnonceDeLogementResponse } from '~/server/cms/domain/annonceDeLogement.fixture';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { Article } from '~/server/cms/domain/article';
import { anArticle } from '~/server/cms/domain/article.fixture';
import { anUnorderedServiceJeuneList } from '~/server/cms/domain/espaceJeune.fixture';
import {
	uneListeDeQuestion,
	uneListeDeQuestionStrapiResponse,
	uneQuestionRéponse,
} from '~/server/cms/domain/FAQ.fixture';
import { Question } from '~/server/cms/domain/FAQ.type';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';
import { aMesureEmployeurList } from '~/server/cms/domain/mesureEmployeur.fixture';
import { anOffreDeStage } from '~/server/cms/domain/offreDeStage.fixture';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';
import {
	anActualiteFixture,
	anOffreDeStageDepotStrapi,
	anOffreDeStageResponse,
	aStrapiAnnonceDeLogementSlugList,
	aStrapiArticleCollectionType,
	aStrapiArticleSlugList,
	aStrapiCollectionType,
	aStrapiLesMesuresEmployeurs,
	aStrapiLesMesuresJeunesSingleType,
	aStrapiOffreDeStageSlugList,
	aStrapiSingleType,
	aStrapiVideosCampagneApprentissage,
} from '~/server/cms/infra/repositories/strapi.fixture';
import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { createFailure, createSuccess, Failure, Success } from '~/server/errors/either';
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
import {
	anAnnonceDeLogementPathList,
	anArticlePathList,
	anOffreDeStagePathList,
} from '~/server/sitemap/domain/sitemap.fixture';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('strapi cms repository', () => {
	let httpClientService: PublicHttpClientService;
	let authenticatedHttpClientService: AuthenticatedHttpClientService;
	let strapiCmsRepository: StrapiRepository;

	describe('getSingleType', () => {
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

	describe('getServiceJeuneList', () => {
		it('récupère les services jeunes', async () => {
			httpClientService = anAuthenticatedHttpClientService();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
			);

			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aStrapiLesMesuresJeunesSingleType()));
			const expected = anUnorderedServiceJeuneList();
			const response = await strapiCmsRepository.getServiceJeuneList() as Success<Array<ServiceJeune>>;

			expect(response.result).toEqual(expected);
			expect(httpClientService.get).toHaveBeenCalledWith('mesure-jeune?populate=deep');
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

	describe('getAnnonceDeLogementBySlug', () => {
		describe('Si un logement est trouvé', () => {
			it('récupère l‘annonce de logement selon le slug', async () => {
				httpClientService = aPublicHttpClientService();
				authenticatedHttpClientService = anAuthenticatedHttpClientService();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
				);
				httpClientService.get = jest.fn().mockResolvedValue(anAxiosResponse(aStrapiCollectionType([anAnnonceDeLogementResponse()])));
				const slug = anAnnonceDeLogementResponse().slug;

				const { result } = await strapiCmsRepository.getAnnonceDeLogementBySlug(slug) as Success<AnnonceDeLogement>;
				expect(result).toEqual(anAnnonceDeLogement());
				expect(httpClientService.get).toHaveBeenCalledWith(`annonces-de-logement?filters[slug][$eq]=${slug}&populate=deep&pagination[pageSize]=100&pagination[page]=1`);
			});
		});

		describe('Si le logement n‘est pas trouvé', () => {
			it('retourne une erreur', async () => {
				const httpError = anHttpError(500);
				authenticatedHttpClientService = anAuthenticatedHttpClientService();
				const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
				const errorManagementService = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
				const httpClientService = aPublicHttpClientService({
					get: jest.fn(async () => {
						throw httpError;
					}),
				});
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, errorManagementService);
				const slug = 'bad-slug';

				const result = await strapiCmsRepository.getAnnonceDeLogementBySlug(slug);
				expect((result as Failure).errorType).toEqual(expectedFailure);
			});
		});
	});

	describe('getOffreDeStageBySlug', () => {
		describe('Si un stage est trouvé', () => {
			it('récupère l‘offre de stage selon le slug', async () => {
				httpClientService = aPublicHttpClientService();
				authenticatedHttpClientService = anAuthenticatedHttpClientService();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
				);
				httpClientService.get = jest.fn().mockResolvedValue(anAxiosResponse(aStrapiCollectionType([anOffreDeStageResponse()])));
				const slug = anOffreDeStageResponse().slug;

				const { result } = await strapiCmsRepository.getOffreDeStageBySlug(slug) as Success<OffreDeStage>;
				expect(result).toEqual(anOffreDeStage());
				expect(httpClientService.get).toHaveBeenCalledWith(`offres-de-stage?filters[slug][$eq]=${slug}&populate=deep&pagination[pageSize]=100&pagination[page]=1`);
			});
		});
	});

	describe('saveOffreDeStage', () => {
		describe('Si un stage est fourni', () => {
			it('il est enregistré dans le cms', async () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const authenticatedHttpClientService = anAuthenticatedHttpClientService();
				const strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
				);

				const offreDeStageDepot = anOffreDeStageDepot();
				const offreDeStageDepotStrapi = anOffreDeStageDepotStrapi();

				// When
				(authenticatedHttpClientService.post as jest.Mock).mockResolvedValue(anAxiosResponse(anOffreDeStageDepotStrapi()));
				const result = await strapiCmsRepository.saveOffreDeStage(offreDeStageDepot);

				// Then
				expect(result).toEqual(createSuccess(anOffreDeStageDepotStrapi()));
				expect(authenticatedHttpClientService.post).toHaveBeenCalledWith('offres-de-stage', { data: offreDeStageDepotStrapi });
			});
		});
	});

	describe('getAllFAQ', () => {
		describe('quand la liste des questions est trouvée', () => {
			it('retourne la liste des questions avec la problématique et le slug', async () => {
				httpClientService = aPublicHttpClientService();
				authenticatedHttpClientService = anAuthenticatedHttpClientService();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
				);
				httpClientService.get = jest.fn().mockResolvedValue(anAxiosResponse(aStrapiCollectionType(uneListeDeQuestionStrapiResponse())));


				const { result } = await strapiCmsRepository.getAllFAQ() as Success<Array<Question>>;
				expect(result).toEqual(uneListeDeQuestion());
				expect(httpClientService.get).toHaveBeenCalledWith('faqs?fields[0]=problematique&fields[1]=slug&pagination[pageSize]=100&pagination[page]=1');
			});

		});

		describe('quand la liste des questions n’est pas trouvée', () => {
			it('retourne une erreur', async () => {
				httpClientService = aPublicHttpClientService();
				authenticatedHttpClientService = anAuthenticatedHttpClientService();
				const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
				const errorManagementService = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, errorManagementService);
				httpClientService.get = jest.fn().mockRejectedValue(anHttpError(404));

				const result = await strapiCmsRepository.getAllFAQ() as Failure;
				expect(result.errorType).toEqual(expectedFailure);
			});
		});
	});

	describe('getFAQBySlug', () => {
		describe('quand la question réponse est trouvée', () => {
			it('retourne la question réponse', async () => {
				const slug = uneListeDeQuestionStrapiResponse()[0].slug;
				httpClientService = aPublicHttpClientService();
				authenticatedHttpClientService = anAuthenticatedHttpClientService();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
				);
				httpClientService.get = jest.fn().mockResolvedValue(anAxiosResponse(aStrapiCollectionType(uneListeDeQuestionStrapiResponse())));


				const { result } = await strapiCmsRepository.getFAQBySlug(slug) as Success<Question.QuestionRéponse>;
				expect(result).toEqual(uneQuestionRéponse('Comment constituer un dossier locatif ?'));
				expect(httpClientService.get).toHaveBeenCalledWith(`faqs?filters[slug][$eq]=${slug}&pagination[pageSize]=100&pagination[page]=1`);
			});
		});

		describe('quand la question réponse n’est pas trouvée', () => {
			it('retourne une erreur', async () => {
				httpClientService = aPublicHttpClientService();
				authenticatedHttpClientService = anAuthenticatedHttpClientService();
				const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
				const errorManagementService = anErrorManagementService(({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) }));
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, errorManagementService);
				httpClientService.get = jest.fn().mockRejectedValue(anHttpError(404));

				const result = await strapiCmsRepository.getFAQBySlug('not-found-slug') as Failure;
				expect(result.errorType).toEqual(ErreurMetier.CONTENU_INDISPONIBLE);
			});
		});
	});

	describe('listAllOffreDeStageSlug', () => {
		it('retourne un tableau contenant tous les slugs d’offre de stage', async () => {
			httpClientService = aPublicHttpClientService();
			authenticatedHttpClientService = anAuthenticatedHttpClientService();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService(),
			);
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiOffreDeStageSlugList()));
			const expected = anOffreDeStagePathList();

			const { result } = await strapiCmsRepository.listAllOffreDeStageSlug() as Success<Array<string>>;

			expect(result).toEqual(expected);
			expect(httpClientService.get).toHaveBeenCalledWith('offres-de-stage?fields[0]=slug&pagination[pageSize]=100&pagination[page]=1');

		});
	});

	describe('listAllAnnonceDeLogementSlug', () => {
		it('retourne un tableau contenant tous les slugs d’annonce de logement', async () => {
			httpClientService = aPublicHttpClientService();
			authenticatedHttpClientService = anAuthenticatedHttpClientService();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService());
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiAnnonceDeLogementSlugList()));
			const expected = anAnnonceDeLogementPathList();

			const { result } = await strapiCmsRepository.listAllAnnonceDeLogementSlug() as Success<Array<string>>;

			expect(result).toEqual(expected);
			expect(httpClientService.get).toHaveBeenCalledWith('annonces-de-logement?fields[0]=slug&pagination[pageSize]=100&pagination[page]=1');

		});
	});

	describe('getAllVideosCampagneApprentissage', () => {
		it('retourne la liste de videos', async () => {
			httpClientService = aPublicHttpClientService();
			authenticatedHttpClientService = anAuthenticatedHttpClientService();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, anErrorManagementService());
			httpClientService.get = jest.fn().mockResolvedValue(anAxiosResponse(aStrapiVideosCampagneApprentissage()));

			const { result } = await strapiCmsRepository.getAllVideosCampagneApprentissage() as Success<Array<VideoCampagneApprentissage>>;
			expect(result).toEqual([
				{
					titre: "Contrat d'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…",
					transcription: '[transcription]',
					videoId: 'V3cxW3ZRV-I',
				},
			]);
			expect(httpClientService.get).toHaveBeenCalledWith('videos-campagne-apprentissages?sort[0]=Index&pagination[pageSize]=100&pagination[page]=1');
		});
	});
});
