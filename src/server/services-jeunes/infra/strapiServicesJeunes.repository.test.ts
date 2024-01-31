import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anUnorderedServiceJeuneList, aServiceJeuneList } from '~/server/services-jeunes/domain/servicesJeunes.fixture';
import {
	aStrapiMesuresJeunes,
	aStrapiUnorderedMesuresJeunes,
} from '~/server/services-jeunes/infra/strapiMesuresJeunes.fixture';
import { StrapiServicesJeunesRepository } from '~/server/services-jeunes/infra/strapiServicesJeunes.repository';

const RESOURCE_MESURE_JEUNE = 'mesure-jeune';

describe('strapiMesuresJeunesRepository', () => {
	describe('getMesuresJeunesList', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiMesuresJeunes()));
			const strapiMesuresJeunes = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());
			const query = 'populate=deep';

			await strapiMesuresJeunes.getServicesJeunesList();

			expect(strapiService.getSingleType).toHaveBeenCalledWith(RESOURCE_MESURE_JEUNE, query);
		});

		describe('quand les mesures jeunes sont trouvés', () => {
			it('retourne la liste des services jeunes triée alphabétiquement dans le titre', async () => {
				const strapiService = aStrapiCmsRepository();
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiUnorderedMesuresJeunes()));
				const strapiMesuresJeunes = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());

				const result = await strapiMesuresJeunes.getServicesJeunesList();

				expect(result).toEqual(createSuccess(aServiceJeuneList()));
			});

			it('retourne la liste des services jeunes sans aides financières', async () => {
				const strapiService = aStrapiCmsRepository();
				jest.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess([aServiceJeune({ categorie: ServiceJeune.Categorie.AIDES_FINANCIERES })]));
				const strapiMesuresJeunes = new StrapiServicesJeunesRepository(strapiService, anErrorManagementService());



				cmsRepository.getServiceJeuneList = jest.fn().mockResolvedValue(createSuccess());
				const listerServicesJeunesUseCase = new ListerServicesJeunesUseCase(cmsRepository);

				const result = await listerServicesJeunesUseCase.handle();

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
})
;
