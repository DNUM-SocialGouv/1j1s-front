import { anActualite } from '~/server/actualites/domain/actualite.fixture';
import {
	aStrapiActualite,
	aStrapiListeActualites,
	aStrapiLongueListeActualites,
} from '~/server/actualites/infra/strapiActualites.fixture';
import { StrapiActualitesRepository } from '~/server/actualites/infra/strapiActualites.repository';
import { anArticle } from '~/server/articles/domain/article.fixture';
import { aStrapiArticle } from '~/server/articles/infra/strapiArticle.fixture';
import { aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';
import { aStrapiService } from '~/server/cms/infra/repositories/strapi.service.fixture';
import { createFailure, createSuccess, isSuccess, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';

import { Actualite } from '../domain/actualite';

const RESOURCE_ACTUALITE = 'actualite';

describe('strapiActualitesRepository', () => {
	describe('getActualitesList', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			const strapiService = aStrapiService();
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiListeActualites()));
			const strapiActualites = new StrapiActualitesRepository(strapiService, anErrorManagementService());
			const query = 'populate=deep';

			await strapiActualites.getActualitesList();

			expect(strapiService.getSingleType).toHaveBeenCalledWith(RESOURCE_ACTUALITE, query);
		});

		describe('quand les actualités sont récupérées', () => {
			it('lorsque le mapping est en succès, renvoie les actualités', async () => {
				const strapiListeActus = aStrapiListeActualites({ listeActualites: [
					aStrapiActualite({
						article: aStrapiSingleRelation(aStrapiArticle({
							banniere: aStrapiSingleRelation(aStrapiImage({
								alternativeText: '',
								url: 'https://image.example.com/',
							})),
							contenu: 'Contenu article',
							slug: 'titre-article',
							titre: 'Titre article',
							updatedAt: '2024-01-01T00:00:00.000Z',
						})),
						banniere: aStrapiSingleRelation(aStrapiImage({
							alternativeText: '',
							url: 'https://image.example.com/',
						})),
						contenu: 'Contenu',
						titre: 'Titre',
						url: 'https://www.google.com',
					})],
				});
				const strapiService = aStrapiService({
					getSingleType: jest.fn().mockResolvedValue(createSuccess(strapiListeActus)),
				});
				const strapiActualites = new StrapiActualitesRepository(strapiService, anErrorManagementService());

				const result = await strapiActualites.getActualitesList();
				expect(result).toStrictEqual(createSuccess([
					anActualite({
						article: anArticle({
							bannière:  {
								alt: '',
								src: 'https://image.example.com/',
							},
									 contenu: 'Contenu article',
					         dateDerniereMiseAJour: '2024-01-01T00:00:00.000Z',
					         slug: 'titre-article',
					         titre: 'Titre article',
						}),
						bannière: {
							alt: '',
							src: 'https://image.example.com/',
						},
						contenu: 'Contenu',
						dateMiseAJour: new Date('2024-01-01T00:00:00.000Z'),
						extraitContenu: 'Contenu',
						link: '/articles/titre-article',
						titre: 'Titre',
					}),
				]));
			});

			it('lorsque le mapping est en échec, appelle le service de gestion d’erreur avec l’erreur et le contexte', async () => {
				const strapiService = aStrapiService();
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiListeActualites({
					// @ts-expect-error
					listeActualites: [{}],
				})));

				const errorManagementService = anErrorManagementService();
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				const strapiActualites = new StrapiActualitesRepository(strapiService, errorManagementService);

				const result = await strapiActualites.getActualitesList();


				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(
					expect.any(Error),
					{
						apiSource: 'Strapi - Actualités',
						contexte: 'récupérer les actualités',
						message: 'impossible de mapper vers les actualités',
					});
				expect(result).toStrictEqual(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
			});
		});

		it('quand la récupération des actualités est en échec, relais l‘échec du strapi service', async () => {
			const strapiService = aStrapiService();
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

			const strapiActualites = new StrapiActualitesRepository(strapiService, anErrorManagementService());

			const result = await strapiActualites.getActualitesList();
			expect(result).toStrictEqual(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
		});
	});
	describe('getActualitesEchantillonList', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			// Given
			const strapiService = aStrapiService();
			const strapiActualites = new StrapiActualitesRepository(strapiService, anErrorManagementService());
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiListeActualites()));

			// When
			await strapiActualites.getActualitesEchantillonList();

			// Then
			const expectedQuery = 'populate=deep';
			expect(strapiService.getSingleType).toHaveBeenCalledWith(RESOURCE_ACTUALITE, expectedQuery);
		});

		describe('quand les actualités sont récupérées', () => {
			it('lorsque le mapping est en succès, renvoie au plus 3 actualités', async () => {
				// Given
				const strapiService = aStrapiService();
				const strapiActualites = new StrapiActualitesRepository(strapiService, anErrorManagementService());
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiLongueListeActualites()));

				// When
				const result = await strapiActualites.getActualitesEchantillonList();

				// Then
				expect(isSuccess(result)).toBe(true);
				expect((result as Success<Actualite[]>).result).toHaveLength(3);
			});
			it('lorsque le mapping est en échec, appelle le service de gestion d’erreur avec l’erreur et le contexte', async () => {
				// Given
				const strapiService = aStrapiService();
				const errorManagementService = anErrorManagementService();
				const strapiActualites = new StrapiActualitesRepository(strapiService, errorManagementService);

				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiListeActualites({
					// @ts-expect-error
					listeActualites: [{}],
				})));
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				// When
				const result = await strapiActualites.getActualitesEchantillonList();

				// Then
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(
					expect.any(Error),
					{
						apiSource: 'Strapi - Actualités',
						contexte: 'récupérer les actualités',
						message: 'impossible de mapper vers les actualités',
					});
				expect(result).toStrictEqual(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
			});
		});
		it('quand la récupération des actualités est en échec, relais l‘échec du strapi service', async () => {
			// Given
			const strapiService = aStrapiService();
			const strapiActualites = new StrapiActualitesRepository(strapiService, anErrorManagementService());
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

			// When
			const result = await strapiActualites.getActualitesEchantillonList();

			//Then
			expect(result).toStrictEqual(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
		});
	});
});
