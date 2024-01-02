import { anOffreDeStageDepot } from '~/client/services/stage/stageService.fixture';
import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { OffreStageDepot } from '~/server/stages/domain/stages';
import { anOffreDeStage } from '~/server/stages/domain/stages.fixture';
import { OffreStageResponseStrapi } from '~/server/stages/repository/strapiStages';
import { anOffreDeStageDepotStrapi, anOffreDeStageResponse } from '~/server/stages/repository/strapiStages.fixture';
import { StrapiStagesRepository } from '~/server/stages/repository/strapiStages.repository';
import OffreDeStageDepot = OffreStageDepot.OffreDeStageDepot;


const RESOURCE_OFFRE_DE_STAGE = 'offres-de-stage';
jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('strapiStagesRepository', () => {
	describe('getOffreDeStageBySlug', () => {
		it('appelle le strapi service avec les bons paramètres et renvoie un success de l‘offre de stage mappé', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(anOffreDeStageResponse()));
			const slug = 'slug';
			const query = `filters[slug][$eq]=${slug}&populate=deep`;

			const strapiStagesRepository = new StrapiStagesRepository(strapiService, anErrorManagementService());
			await strapiStagesRepository.getOffreDeStageBySlug(slug);

			expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledTimes(1);
			expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledWith(RESOURCE_OFFRE_DE_STAGE, query);
		});

		it('lorsque la requete est en succès, renvoie un success de l‘offre de stage mappé', async () => {
			const strapiService = aStrapiCmsRepository();

			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(anOffreDeStageResponse()));
			const slug = 'slug';

			const strapiStagesRepository = new StrapiStagesRepository(strapiService, anErrorManagementService());
			const stage = await strapiStagesRepository.getOffreDeStageBySlug(slug);

			expect(stage).toStrictEqual(createSuccess(anOffreDeStage()));
		});

		it('lorsque la requete est en succès mais le résulat ne correspond pas au contrat d‘interface, log l‘erreur et renvoie la failure associée', async () => {
			const strapiService = aStrapiCmsRepository();
			const errorManagementService = anErrorManagementService();
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(expectedFailure);
			const slug = 'slug';
			const offreDeStageAvecDonnéesErronées = anOffreDeStageResponse({ domaines: 35 } as unknown as Partial<OffreStageResponseStrapi.OffreStage>);
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValue(createSuccess(offreDeStageAvecDonnéesErronées));
			const strapiStagesRepository = new StrapiStagesRepository(strapiService, errorManagementService);

			const stage = await strapiStagesRepository.getOffreDeStageBySlug(slug);

			expect(stage).toStrictEqual(expectedFailure);
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(expect.any(Error), aLogInformation({
				apiSource: 'STRAPI - offre de stage',
				contexte: 'get offre de stage par slug',
				message: 'impossible de mapper les stages par slug',
			}));
		});

		it('lorsque la requete est en echec, renvoie cet echec', async () => {
			const slug = 'slug';
			const strapiService = aStrapiCmsRepository();
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(expectedFailure);

			const strapiStagesRepository = new StrapiStagesRepository(strapiService, anErrorManagementService());
			const stage = await strapiStagesRepository.getOffreDeStageBySlug(slug);

			expect(stage).toStrictEqual(expectedFailure);
		});
	});

	describe('listAllOffreDeStageSlug', () => {
		it('appelle le strapi service avec les bons paramètres et renvoie un success de l‘offre de stage mappé', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess([anOffreDeStageResponse({ slug: 'slug 1' }), anOffreDeStageResponse({ slug: 'slug 2' })]));
			const query = 'fields[0]=slug';

			const strapiStagesRepository = new StrapiStagesRepository(strapiService, anErrorManagementService());
			await strapiStagesRepository.listAllOffreDeStageSlug();

			expect(strapiService.getCollectionType).toHaveBeenCalledTimes(1);
			expect(strapiService.getCollectionType).toHaveBeenCalledWith(RESOURCE_OFFRE_DE_STAGE, query);
		});

		it('lorsque la requete est en succès, renvoie un success avec la liste des slugs', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess([anOffreDeStageResponse({ slug: 'slug 1' }), anOffreDeStageResponse({ slug: 'slug 2' })]));

			const strapiStagesRepository = new StrapiStagesRepository(strapiService, anErrorManagementService());
			const listSlugs = await strapiStagesRepository.listAllOffreDeStageSlug();

			expect(listSlugs).toStrictEqual(createSuccess(['slug 1', 'slug 2']));
		});

		it('lorsque la requete est en echec, renvoie cet echec', async () => {
			const strapiService = aStrapiCmsRepository();
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(expectedFailure);

			const strapiStagesRepository = new StrapiStagesRepository(strapiService, anErrorManagementService());
			const stage = await strapiStagesRepository.listAllOffreDeStageSlug();

			expect(stage).toStrictEqual(expectedFailure);
		});
	});

	describe('saveOffreDeStage', () => {
		it('lorsque le mapping de l‘offre a enregistrer est en erreur, log l‘erreur et renvoie une failure', async () => {
			const strapiService = aStrapiCmsRepository();
			const errorManagementService = anErrorManagementService();
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(expectedFailure);
			const offreSauvegarde = anOffreDeStageDepotStrapi();
			jest.spyOn(strapiService, 'save').mockResolvedValueOnce(createSuccess(offreSauvegarde));
			const strapiStagesRepository = new StrapiStagesRepository(strapiService, errorManagementService);

			const result = await strapiStagesRepository.saveOffreDeStage({
				...anOffreDeStageResponse(),
				employeur: null,
			} as unknown as OffreDeStageDepot);

			expect(result).toStrictEqual(expectedFailure);
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(expect.any(Error), aLogInformation({
				apiSource: 'STRAPI - offre de stage',
				contexte: 'save offre de stage',
				message: 'impossible de mapper l‘offre a enregistrer',
			}));
		});

		it('appelle le strapi service avec les bons paramètres et renvoie la reponse', async () => {
			// Given
			const strapiService = aStrapiCmsRepository();
			const offreSauvegarde = anOffreDeStageDepotStrapi();
			jest.spyOn(strapiService, 'save').mockResolvedValueOnce(createSuccess(offreSauvegarde));

			const offreDeStageDepot = anOffreDeStageDepot();

			// When
			const strapiStagesRepository = new StrapiStagesRepository(strapiService, anErrorManagementService());
			const result = await strapiStagesRepository.saveOffreDeStage(offreDeStageDepot);

			// Then
			expect(strapiService.save).toHaveBeenCalledTimes(1);
			expect(strapiService.save).toHaveBeenCalledWith(RESOURCE_OFFRE_DE_STAGE, offreSauvegarde);
			expect(result).toEqual(createSuccess(offreSauvegarde));
		});
	});
});
