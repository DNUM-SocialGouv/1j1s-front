import { anOffreDeStageDepot } from '~/client/services/stage/stageService.fixture';
import { Actualite } from '~/server/cms/domain/actualite';
import { anActualite } from '~/server/cms/domain/actualite.fixture';
import { uneAnnonceDeLogement, uneAnnonceDeLogementResponse } from '~/server/cms/domain/annonceDeLogement.fixture';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { Article } from '~/server/cms/domain/article';
import { anArticle } from '~/server/cms/domain/article.fixture';
import { anUnorderedServiceJeuneList } from '~/server/cms/domain/espaceJeune.fixture';
import {
	uneFaqList,
	uneFaqListResponse,
} from '~/server/cms/domain/foireAuxQuestions.fixture';
import { FoireAuxQuestions } from '~/server/cms/domain/foireAuxQuestions.type';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';
import { desMesuresEmployeurs } from '~/server/cms/domain/mesureEmployeur.fixture';
import { uneOffreDeStage } from '~/server/cms/domain/offreDeStage.fixture';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import {
	anActualiteFixture,
	anOffreDeStageDepotStrapi,
	aStrapiAnnonceDeLogementSlugList,
	aStrapiArticleCollectionType,
	aStrapiArticleSlugList,
	aStrapiCollectionType,
	aStrapiFaqArticleSlugList,
	aStrapiFicheMetier,
	aStrapiFicheMetierNomMetierList,
	aStrapiLesMesuresEmployeurs,
	aStrapiLesMesuresJeunesSingleType,
	aStrapiOffreDeStageSlugList,
	aStrapiPage2FicheMetierNomMetierList,
	aStrapiSingleType,
	uneOffreDeStageResponse,
} from '~/server/cms/infra/repositories/strapi.fixture';
import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { aFicheMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import { HttpClientService } from '~/server/services/http/httpClientService';
import {
	anAxiosError,
	anAxiosResponse,
	anHttpClientService,
	anHttpClientServiceWithAuthentification,
} from '~/server/services/http/httpClientService.fixture';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';
import {
	aFicheMetierNomMetierList,
	anAnnonceDeLogementPathList,
	anArticlePathList,
	anOffreDeStagePathList,
} from '~/server/sitemap/domain/sitemap.fixture';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('strapi cms repository', () => {
	let httpClientService: HttpClientService;
	let authenticatedHttpClientService: HttpClientServiceWithAuthentification;
	let strapiCmsRepository: StrapiRepository;

	describe('getActualites', () => {
		describe('Si les actualités sont trouvées', () => {
			it('récupère les actualités', async () => {
				httpClientService = anHttpClientServiceWithAuthentification();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);

				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(anActualiteFixture()));
				const expectedCartesActualite = [anActualite({ titre: 'Actualité 1' })];
				const result = await strapiCmsRepository.getActualitéList() as Success<Actualite[]>;

				expect(httpClientService.get).toHaveBeenCalledWith('actualite?populate=deep');
				expect(result.result).toEqual(expectedCartesActualite);
			});
		});
	});

	describe('getArticleBySlug', () => {
		describe('Si un article est trouvé', () => {
			it('récupère l‘article selon le slug', async () => {
				httpClientService = anHttpClientService();
				authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);

				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiArticleCollectionType()));
				const expectedArticle = anArticle();
				const slug = 'mon-article';

				const result = await strapiCmsRepository.getArticleBySlug(slug) as Success<Article>;

				expect(result.result).toEqual(expectedArticle);
				expect(httpClientService.get).toHaveBeenCalledWith(`articles?filters[slug][$eq]=${slug}&populate=deep&pagination[pageSize]=100&pagination[page]=1`);
			});
		});
	});

	describe('getFicheMetierByNom', () => {
		const nomMetier = 'Mon super metier';
		const expectedFicheMetier = aFicheMetier();

		beforeEach(() => {
			httpClientService = anHttpClientServiceWithAuthentification();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
		});
		afterEach(() => {
			jest.clearAllMocks();
		});
		it('appelle l‘endpoint avec les bons paramètres', async () => {
			jest.spyOn(httpClientService, 'get');

			await strapiCmsRepository.getFicheMetierByNom(nomMetier);

			expect(httpClientService.get).toHaveBeenCalledWith(`fiche-metiers?filters[nom_metier][$eq]=${encodeURIComponent(nomMetier)}&populate=deep&pagination[pageSize]=100&pagination[page]=1`);
		});
		describe('Si une fiche métier est trouvée', () => {
			it('récupère la fiche métier selon le nom', async () => {
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiFicheMetier()));

				const result = await strapiCmsRepository.getFicheMetierByNom(nomMetier) as Success<FicheMétier>;

				expect(result.result).toEqual(expectedFicheMetier);
			});
		});
		describe('Si aucune fiche métier n‘est trouvée', () => {
			it('retourne une erreur', async () => {
				jest.spyOn(httpClientService, 'get').mockRejectedValue(anAxiosError({ response: anAxiosResponse({}, 404) }));

				const result = await strapiCmsRepository.getFicheMetierByNom(nomMetier) as Failure;

				expect(result.errorType).toEqual(ErreurMétier.CONTENU_INDISPONIBLE);
			});
		});
	});

	describe('listAllFicheMetierNomMetier', () => {
		it('liste tous les noms métier des fiches metier', async () => {
			httpClientService = anHttpClientService();
			authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
			(httpClientService.get as jest.Mock)
				.mockResolvedValueOnce(anAxiosResponse(aStrapiFicheMetierNomMetierList()))
				.mockResolvedValueOnce(anAxiosResponse(aStrapiPage2FicheMetierNomMetierList()));
			const expected = aFicheMetierNomMetierList();

			const { result } = await strapiCmsRepository.listAllFicheMetierNomMetier() as Success<Array<string>>;

			expect(result).toEqual(expected);
			expect(httpClientService.get).toHaveBeenNthCalledWith(1, 'fiche-metiers?fields[]=nom_metier&pagination[pageSize]=100&pagination[page]=1');
			expect(httpClientService.get).toHaveBeenNthCalledWith(2, 'fiche-metiers?fields[]=nom_metier&pagination[pageSize]=100&pagination[page]=2');
		});
	});

	describe('listAllArticleSlug', () => {
		it('liste tous les identifiants d’article publiés sauf celles des faq', async () => {
			httpClientService = anHttpClientService();
			authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
			(httpClientService.get as jest.Mock)
				.mockResolvedValueOnce(anAxiosResponse(aStrapiFaqArticleSlugList()))
				.mockResolvedValueOnce(anAxiosResponse(aStrapiArticleSlugList()));
			const expected = anArticlePathList();

			const { result } = await strapiCmsRepository.listAllArticleSlug() as Success<Array<string>>;

			expect(result).toEqual(expected);
			expect(httpClientService.get).toHaveBeenNthCalledWith(1, 'foire-aux-questions?populate[reponse][fields][0]=slug&pagination[pageSize]=100&pagination[page]=1');
			expect(httpClientService.get).toHaveBeenNthCalledWith(2, 'articles?fields[0]=slug&filters[$and][0][slug][$ne]=comment-constituer-un-dossier-locatif-jeune&filters[$and][1][slug][$ne]=comment-faire-son-service-civique&filters[$and][2][slug][$ne]=que-faire-site-la-recherche-d-emploi-ne-fonctionne-pas&pagination[pageSize]=100&pagination[page]=1');
		});
	});

	describe('getMentionObligatoire', () => {
		it('retourne le mention obligatoire a consulter', async () => {
			httpClientService = anHttpClientServiceWithAuthentification();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);

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
			httpClientService = anHttpClientServiceWithAuthentification();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);

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
				httpClientService = anHttpClientServiceWithAuthentification();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);

				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiSingleType(aStrapiLesMesuresEmployeurs())));
				const expectedMesuresEmployeurs = desMesuresEmployeurs();
				const result = await strapiCmsRepository.getMesuresEmployeurs() as Success<MesureEmployeur[]>;

				expect(result.result).toEqual(expectedMesuresEmployeurs);
				expect(httpClientService.get).toHaveBeenCalledWith('les-mesures-employeurs?populate=deep');
			});
		});
	});

	describe('getAnnonceDeLogementBySlug', () => {
		describe('Si un logement est trouvé', () => {
			it('récupère l‘annonce de logement selon le slug', async () => {
				httpClientService = anHttpClientService();
				authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
				httpClientService.get = jest.fn().mockResolvedValue(anAxiosResponse(aStrapiCollectionType([uneAnnonceDeLogementResponse()])));
				const slug = uneAnnonceDeLogementResponse().slug;

				const { result } = await strapiCmsRepository.getAnnonceDeLogementBySlug(slug) as Success<AnnonceDeLogement>;
				expect(result).toEqual(uneAnnonceDeLogement());
				expect(httpClientService.get).toHaveBeenCalledWith(`annonces-de-logement?filters[slug][$eq]=${slug}&populate=deep&pagination[pageSize]=100&pagination[page]=1`);
			});
		});

		describe('Si le logement n‘est pas trouvé', () => {
			it('retourne une erreur', async () => {
				httpClientService = anHttpClientService();
				authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
				httpClientService.get = jest.fn().mockRejectedValue(anAxiosError({ response: anAxiosResponse({}, 404) }));
				const slug = 'bad-slug';

				const result = await strapiCmsRepository.getAnnonceDeLogementBySlug(slug) as Failure;
				expect(result.errorType).toEqual(ErreurMétier.CONTENU_INDISPONIBLE);
			});
		});
	});

	describe('getOffreDeStageBySlug', () => {
		describe('Si un stage est trouvé', () => {
			it('récupère l‘offre de stage selon le slug', async () => {
				httpClientService = anHttpClientService();
				authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
				httpClientService.get = jest.fn().mockResolvedValue(anAxiosResponse(aStrapiCollectionType([uneOffreDeStageResponse()])));
				const slug = uneOffreDeStageResponse().slug;

				const { result } = await strapiCmsRepository.getOffreDeStageBySlug(slug) as Success<OffreDeStage>;
				expect(result).toEqual(uneOffreDeStage());
				expect(httpClientService.get).toHaveBeenCalledWith(`offres-de-stage?filters[slug][$eq]=${slug}&populate=deep&pagination[pageSize]=100&pagination[page]=1`);
			});
		});
	});

	describe('saveOffreDeStage', () => {
		describe('Si un stage est fourni', () => {
			it('il est enregistré dans le cms', async () => {
				// Given
				const httpClientService = anHttpClientService();
				const authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				const strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);

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

	describe('getAllFoireAuxQuestions', () => {
		describe('quand la liste des questions est trouvée', () => {
			it('retourne la liste des questions avec l’url de leur réponse', async () => {
				httpClientService = anHttpClientService();
				authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
				httpClientService.get = jest.fn().mockResolvedValue(anAxiosResponse(aStrapiCollectionType(uneFaqListResponse())));


				const { result } = await strapiCmsRepository.getAllFoireAuxQuestions() as Success<Array<FoireAuxQuestions>>;
				expect(result).toEqual(uneFaqList());
				expect(httpClientService.get).toHaveBeenCalledWith('foire-aux-questions?fields[0]=problematique&populate[reponse][fields][0]=slug&pagination[pageSize]=100&pagination[page]=1');
			});
		});

		describe('quand la liste des questions n’est trouvée', () => {
			it('retourne une erreur', async () => {
				httpClientService = anHttpClientService();
				authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
				strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
				httpClientService.get = jest.fn().mockRejectedValue(anAxiosError({ response: anAxiosResponse({}, 404) }));

				const result = await strapiCmsRepository.getAllFoireAuxQuestions() as Failure;
				expect(result.errorType).toEqual(ErreurMétier.CONTENU_INDISPONIBLE);
			});
		});
	});

	describe('listAllOffreDeStageSlug', () => {
		it('retourne un tableau contenant tous les slugs d’offre de stage', async () => {
			httpClientService = anHttpClientService();
			authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiOffreDeStageSlugList()));
			const expected = anOffreDeStagePathList();

			const { result } = await strapiCmsRepository.listAllOffreDeStageSlug() as Success<Array<string>>;

			expect(result).toEqual(expected);
			expect(httpClientService.get).toHaveBeenCalledWith('offres-de-stage?fields[0]=slug&pagination[pageSize]=100&pagination[page]=1');

		});
	});

	describe('listAllAnnonceDeLogementSlug', () => {
		it('retourne un tableau contenant tous les slugs d’annonce de logement', async () => {
			httpClientService = anHttpClientService();
			authenticatedHttpClientService = anHttpClientServiceWithAuthentification();
			strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService);
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiAnnonceDeLogementSlugList()));
			const expected = anAnnonceDeLogementPathList();

			const { result } = await strapiCmsRepository.listAllAnnonceDeLogementSlug() as Success<Array<string>>;

			expect(result).toEqual(expected);
			expect(httpClientService.get).toHaveBeenCalledWith('annonces-de-logement?fields[0]=slug&pagination[pageSize]=100&pagination[page]=1');

		});
	});
});
