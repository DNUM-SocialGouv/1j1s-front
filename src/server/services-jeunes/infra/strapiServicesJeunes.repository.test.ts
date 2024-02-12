import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
import { aServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes.fixture';
import {
	aStrapiMesureJeune,
	aStrapiMesuresJeunesParCategorie,
	aStrapiUnorderedMesuresJeunesParCategorie,
} from '~/server/services-jeunes/infra/strapiMesuresJeunes.fixture';
import { StrapiServicesJeunesRepository } from '~/server/services-jeunes/infra/strapiServicesJeunes.repository';

const RESOURCE_MESURE_JEUNE = 'mesure-jeune';

describe('strapiMesuresJeunesRepository', () => {
	describe('getMesuresJeunesList', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiMesuresJeunesParCategorie()));
			const strapiMesuresJeunes = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());
			const query = 'populate=deep';

			await strapiMesuresJeunes.getServicesJeunesList();

			expect(strapiService.getSingleType).toHaveBeenCalledWith(RESOURCE_MESURE_JEUNE, query);
		});

		describe('quand les mesures jeunes sont trouvées', () => {
			it('retourne la liste des services jeunes triée alphabétiquement par titre', async () => {
				const strapiService = aStrapiCmsRepository();
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiUnorderedMesuresJeunesParCategorie()));
				const strapiMesuresJeunes = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());

				const result = await strapiMesuresJeunes.getServicesJeunesList();

				const orderedServicesJeunes = [
					aServiceJeune({
						categorie: ServiceJeune.Categorie.ACCOMPAGNEMENT,
						titre: 'A une belle formation',
					}),
					aServiceJeune({
						categorie: ServiceJeune.Categorie.ENTREE_VIE_PROFESSIONELLE,
						titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
					}),
					aServiceJeune({
						categorie: ServiceJeune.Categorie.ORIENTATION_FORMATION,
						titre: 'Les Junior Entreprises',
					}),
					aServiceJeune({
						categorie: ServiceJeune.Categorie.ACCOMPAGNEMENT,
						titre: 'Une formation en centre EPIDE',
					}),
				];
				expect(result).toEqual(createSuccess(orderedServicesJeunes));
			});

			it('retourne la liste des services jeunes sans la catégorie aides financières', async () => {
				const strapiService = aStrapiCmsRepository();
				const strapiMesuresJeunesParCategorie = aStrapiMesuresJeunesParCategorie({
					accompagnement: [],
					aidesFinancieres: [aStrapiMesureJeune()],
					orienterFormer: [],
					vieProfessionnelle: [],
				});
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(strapiMesuresJeunesParCategorie));
				const strapiMesuresJeunes = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());

				const result = await strapiMesuresJeunes.getServicesJeunesList();

				expect(result).toEqual(createSuccess([]));
			});
		});

		describe('si le mapping vers les services jeunes est en erreur', () => {
			it('appelle le service de gestion d’erreur avec l’erreur et le contexte', async () => {
				const strapiService = aStrapiCmsRepository();
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess({
					accompagnement: [],
				}));
				const errorManagementService = anErrorManagementService();
				const strapiMesuresJeunes = new StrapiServicesJeunesRepository(strapiService, errorManagementService);

				await strapiMesuresJeunes.getServicesJeunesList();

				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(
					expect.any(Error),
					{
						apiSource: 'Strapi - Services Jeunes',
						contexte: 'récupérer les services jeunes',
						message: 'impossible de mapper vers les services jeunes',
					});
			});
		});
	});

	describe('quand la récupération des mesures jeunes est en échec', () => {
		it('relais l’échec du strapi service', async () => {
			const strapiService = aStrapiCmsRepository();
			const strapiServicesJeunesRepository = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());
			const expectedStrapiFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(expectedStrapiFailure);

			const result = await strapiServicesJeunesRepository.getServicesJeunesList();

			expect(result).toStrictEqual(expectedStrapiFailure);
		});
	});
});

