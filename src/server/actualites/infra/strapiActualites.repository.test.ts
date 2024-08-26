import {anActualiteList, anActualiteLongList} from '~/server/actualites/domain/actualite.fixture';
import {aStrapiListeActualites, aStrapiLongueListeActualites} from '~/server/actualites/infra/strapiActualites.fixture';
import { StrapiActualitesRepository } from '~/server/actualites/infra/strapiActualites.repository';
import { aStrapiService } from '~/server/cms/infra/repositories/strapi.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';

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
				const strapiService = aStrapiService();
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiListeActualites()));
				const strapiActualites = new StrapiActualitesRepository(strapiService, anErrorManagementService());

				const result = await strapiActualites.getActualitesList();
				expect(result).toStrictEqual(createSuccess(anActualiteList()));
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
	describe('getActualitesAccueilList', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			// Given
			const strapiService = aStrapiService();
			const strapiActualites = new StrapiActualitesRepository(strapiService, anErrorManagementService());
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiListeActualites()));

			// When
			await strapiActualites.getActualitesAccueilList();

			// Then
			const expectedQuery = 'populate=deep';
			expect(strapiService.getSingleType).toHaveBeenCalledWith(RESOURCE_ACTUALITE, expectedQuery);
		});

		describe('quand les actualités sont récupérées', () => {
			it('lorsque le mapping est en succès, renvoie au plus	3 actualités', async () => {
				// Given
				const strapiService = aStrapiService();
				const strapiActualites = new StrapiActualitesRepository(strapiService, anErrorManagementService());
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiLongueListeActualites()));

				// When
				const result = await strapiActualites.getActualitesAccueilList();

				// Then
				expect(result).toStrictEqual(createSuccess(anActualiteLongList().slice(0,3)));
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
				const result = await strapiActualites.getActualitesAccueilList();

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
			const result = await strapiActualites.getActualitesAccueilList();

			//Then
			expect(result).toStrictEqual(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
		});
	});
});
