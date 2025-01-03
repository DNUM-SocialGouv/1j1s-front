import { aStrapiService } from '~/server/cms/infra/repositories/strapi.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { mapCodeCategorieServiceJeuneToLibelle, ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
import { aServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes.fixture';
import {
	aStrapiMesuresJeunesParCategorie,
	aStrapiUnorderedMesuresJeunesParCategorie,
} from '~/server/services-jeunes/infra/strapiMesuresJeunes.fixture';
import { StrapiServicesJeunesRepository } from '~/server/services-jeunes/infra/strapiServicesJeunes.repository';

const RESOURCE_MESURE_JEUNE = 'mesure-jeune';

describe('strapiMesuresJeunesRepository', () => {
	describe('getMesuresJeunesList', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			const strapiService = aStrapiService();
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiMesuresJeunesParCategorie()));
			const strapiMesuresJeunes = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());
			const query = 'populate=deep';

			await strapiMesuresJeunes.getServicesJeunesList();

			expect(strapiService.getSingleType).toHaveBeenCalledWith(RESOURCE_MESURE_JEUNE, query);
		});

		describe('quand les mesures jeunes sont trouvées', () => {
			it('retourne la liste des services jeunes triée alphabétiquement par titre', async () => {
				const strapiService = aStrapiService();
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiUnorderedMesuresJeunesParCategorie()));
				const strapiMesuresJeunes = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());

				const result = await strapiMesuresJeunes.getServicesJeunesList();

				const orderedServicesJeunes = [
					aServiceJeune({
						categorie: { code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT, libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT) },
						titre: 'A une belle formation',
					}),
					aServiceJeune({
						categorie: { code: ServiceJeune.CodeCategorie.AIDES_FINANCIERES, libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.AIDES_FINANCIERES) },
						concerne: 'pour les 12 à 18mois',
						link: 'Une belle url de carte',
						titre: 'Des aides pour financer son permis de conduire',
					}),
					aServiceJeune({
						categorie: { code: ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE, libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE) },
						titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
					}),
					aServiceJeune({
						categorie: { code: ServiceJeune.CodeCategorie.ENGAGEMENT, libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENGAGEMENT) },
						titre: 'Le Service Militaire Volontaire',
					}),
					aServiceJeune({
						categorie: { code: ServiceJeune.CodeCategorie.ORIENTATION_FORMATION, libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ORIENTATION_FORMATION) },
						titre: 'Les Junior Entreprises',
					}),
					aServiceJeune({
						categorie: { code: ServiceJeune.CodeCategorie.LOGEMENT, libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.LOGEMENT) },
						titre: 'Un logement',
					}),
					aServiceJeune({
						categorie: { code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT, libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT) },
						titre: 'Une formation en centre EPIDE',
					}),
				];
				expect(result).toEqual(createSuccess(orderedServicesJeunes));
			});

		});

		describe('si map vers les services jeunes est en erreur', () => {
			it('appelle le service de gestion d’erreur avec l’erreur et le contexte', async () => {
				const strapiService = aStrapiService();
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
			const strapiService = aStrapiService();
			const strapiServicesJeunesRepository = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());
			const expectedStrapiFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(expectedStrapiFailure);

			const result = await strapiServicesJeunesRepository.getServicesJeunesList();

			expect(result).toStrictEqual(expectedStrapiFailure);
		});
	});
});

