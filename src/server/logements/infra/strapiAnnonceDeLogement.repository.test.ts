import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { AnnonceDeLogement } from '~/server/logements/domain/annonceDeLogement';
import { anAnnonceDeLogement } from '~/server/logements/domain/annonceDeLogement.fixture';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';

import { aStrapiAnnonceDeLogement } from './strapiAnnonceDeLogement.fixture';
import { StrapiAnnonceDeLogementRepository } from './strapiAnnonceDeLogement.repository';

describe('Strapi annonces de logements', () => {
	describe('getAnnonceDeLogementBySlug', () => {
		it('appelle le service Strapi avec les bons paramètres', async () => {
			// GIVEN
			const strapiService = aStrapiCmsRepository();
			const strapiAnnonceDeLogementRepository = new StrapiAnnonceDeLogementRepository(strapiService, anErrorManagementService());
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiAnnonceDeLogement()));
			const slug = aStrapiAnnonceDeLogement().slug;
			const logementCollectionName = 'annonces-de-logement';

			// WHEN
			await strapiAnnonceDeLogementRepository.getAnnonceDeLogementBySlug(slug);

			// THEN
			expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledWith(logementCollectionName, `filters[slug][$eq]=${slug}&populate=deep`);
		});

		describe('si un logement est trouvé', () => {
			it('récupère l‘annonce de logement selon le slug', async () => {
				// GIVEN
				const strapiService = aStrapiCmsRepository();
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiAnnonceDeLogement()));
				const strapiAnnonceDeLogementRepository = new StrapiAnnonceDeLogementRepository(strapiService, anErrorManagementService());
				const slug = aStrapiAnnonceDeLogement().slug;

				// WHEN
				const result = await strapiAnnonceDeLogementRepository.getAnnonceDeLogementBySlug(slug);

				// THEN
				expect(result.instance).toBe('success');
				expect((result as Success<AnnonceDeLogement>).result).toEqual(anAnnonceDeLogement());
			});

			describe('si le mapping vers annonce de logement est en erreur', () => {
				it('appelle le service de gestion d’erreur avec l’erreur et le contexte', async () => {
					// GIVEN
					const strapiService = aStrapiCmsRepository();
					const errorManagementService = anErrorManagementService();
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiAnnonceDeLogement({ servicesInclus: 'n’est pas un array' })));
					const strapiAnnonceDeLogementRepository = new StrapiAnnonceDeLogementRepository(strapiService, errorManagementService);
					const slug = aStrapiAnnonceDeLogement().slug;

					// WHEN
					await strapiAnnonceDeLogementRepository.getAnnonceDeLogementBySlug(slug);

					// THEN
					expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(
						expect.any(Error),
						{ apiSource: 'Strapi - annonce de logement', contexte: 'consulter détail', message: 'impossible de mapper vers une annonce de logement' });
				});
				it('relaye l’erreur du service de gestion d’erreur', async () => {
					// GIVEN
					const strapiService = aStrapiCmsRepository();
					const errorManagementService = anErrorManagementService();
					const errorReturnedByService = ErreurMetier.CONTENU_INDISPONIBLE;
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiAnnonceDeLogement({ servicesInclus: 'n’est pas un array' })));
					jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(createFailure(errorReturnedByService));
					const strapiAnnonceDeLogementRepository = new StrapiAnnonceDeLogementRepository(strapiService, errorManagementService);
					const slug = aStrapiAnnonceDeLogement().slug;

					// WHEN
					const result = await strapiAnnonceDeLogementRepository.getAnnonceDeLogementBySlug(slug);

					// THEN
					expect(result.instance).toBe('failure');
					expect((result as Failure).errorType).toEqual(errorReturnedByService);
				});
			});
		});

		describe('si la récupération est en échec', () => {
			it('relais l’échec du service strapi', async () => {
				const strapiService = aStrapiCmsRepository();
				const strapiFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValue(strapiFailure);
				const strapiAnnonceDeLogementRepository = new StrapiAnnonceDeLogementRepository(strapiService, anErrorManagementService());
				const slug = aStrapiAnnonceDeLogement().slug;

				const result = await strapiAnnonceDeLogementRepository.getAnnonceDeLogementBySlug(slug);

				expect(result).toStrictEqual(strapiFailure);
			});
		});
	});

	describe('listAllAnnonceDeLogementSlug', () => {
		it('appelle le service Strapi avec les bon paramètres', async () => {
			// GIVEN
			const strapiService = aStrapiCmsRepository();
			const strapiAnnonceDeLogementRepository = new StrapiAnnonceDeLogementRepository(strapiService, anErrorManagementService());
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess([]));
			const logementCollectionName = 'annonces-de-logement';

			// WHEN
			await strapiAnnonceDeLogementRepository.listAllAnnonceDeLogementSlug();

			// THEN
			expect(strapiService.getCollectionType).toHaveBeenCalledWith(logementCollectionName, 'fields[0]=slug');
		});

		describe('si la liste des logements est trouvée', () => {
			it('retourne la liste des slugs', async () => {
				// GIVEN
				const strapiService = aStrapiCmsRepository();
				const strapiAnnoncesDeLogements = [
					aStrapiAnnonceDeLogement({ slug: 'slug-logement-1' }),
					aStrapiAnnonceDeLogement({ slug: 'slug-logement-2' }),
				];
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess(strapiAnnoncesDeLogements));
				const strapiAnnonceDeLogementRepository = new StrapiAnnonceDeLogementRepository(strapiService, anErrorManagementService());

				// WHEN
				const result = await strapiAnnonceDeLogementRepository.listAllAnnonceDeLogementSlug();

				// THEN
				expect(result.instance).toBe('success');
				expect((result as Success<Array<string>>).result).toStrictEqual(['slug-logement-1', 'slug-logement-2']);
			});
		});

		describe('si la récupération est en échec', () => {
			it('relais l’échec du service strapi', async () => {
				const strapiService = aStrapiCmsRepository();
				const strapiFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValue(strapiFailure);
				const strapiAnnonceDeLogementRepository = new StrapiAnnonceDeLogementRepository(strapiService, anErrorManagementService());

				const result = await strapiAnnonceDeLogementRepository.listAllAnnonceDeLogementSlug();

				expect(result).toStrictEqual(strapiFailure);
			});
		});
	});
});
