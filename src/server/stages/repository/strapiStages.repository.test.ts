import { anOffreDeStageDepot } from '~/client/services/stage/stageService.fixture';
import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anOffreDeStage } from '~/server/stages/domain/stages.fixture';
import { anOffreDeStageDepotStrapi, anOffreDeStageResponse } from '~/server/stages/repository/strapiStages.fixture';
import { StrapiStagesRepository } from '~/server/stages/repository/strapiStages.repository';


const RESOURCE_OFFRE_DE_STAGE = 'offres-de-stage';
jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('strapiStagesRepository', () => {
	describe('getOffreDeStageBySlug', () => {
		it('appelle le strapi service avec les bons paramètres et renvoie un success de l‘offre de stage mappé', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(anOffreDeStageResponse()));
			const slug = 'slug';
			const query = `filters[slug][$eq]=${slug}&populate=deep`;

			const strapiStagesRepository = new StrapiStagesRepository(strapiService);
			await strapiStagesRepository.getOffreDeStageBySlug(slug);

			expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledTimes(1);
			expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledWith(RESOURCE_OFFRE_DE_STAGE, query);
		});

		it('lorsque la requete est en succès, renvoie un success de l‘offre de stage mappé', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(anOffreDeStageResponse()));
			const slug = 'slug';

			const strapiStagesRepository = new StrapiStagesRepository(strapiService);
			const stage = await strapiStagesRepository.getOffreDeStageBySlug(slug);

			expect(stage).toStrictEqual(createSuccess(anOffreDeStage()));
		});

		it('lorsque la requete est en echec, renvoie cet echec', async () => {
			const slug = 'slug';
			const strapiService = aStrapiCmsRepository();
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(expectedFailure);

			const strapiStagesRepository = new StrapiStagesRepository(strapiService);
			const stage = await strapiStagesRepository.getOffreDeStageBySlug(slug);

			expect(stage).toStrictEqual(expectedFailure);
		});
	});

	describe('listAllOffreDeStageSlug', () => {
		it('appelle le strapi service avec les bons paramètres et renvoie un success de l‘offre de stage mappé', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess([anOffreDeStageResponse({ slug: 'slug 1' }), anOffreDeStageResponse({ slug: 'slug 2' })]));
			const query = 'fields[0]=slug';

			const strapiStagesRepository = new StrapiStagesRepository(strapiService);
			await strapiStagesRepository.listAllOffreDeStageSlug();

			expect(strapiService.getCollectionType).toHaveBeenCalledTimes(1);
			expect(strapiService.getCollectionType).toHaveBeenCalledWith(RESOURCE_OFFRE_DE_STAGE, query);
		});

		it('lorsque la requete est en succès, renvoie un success avec la liste des slugs', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess([anOffreDeStageResponse({ slug: 'slug 1' }), anOffreDeStageResponse({ slug: 'slug 2' })]));

			const strapiStagesRepository = new StrapiStagesRepository(strapiService);
			const listSlugs = await strapiStagesRepository.listAllOffreDeStageSlug();

			expect(listSlugs).toStrictEqual(createSuccess(['slug 1', 'slug 2']));
		});

		it('lorsque la requete est en echec, renvoie cet echec', async () => {
			const strapiService = aStrapiCmsRepository();
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(expectedFailure);

			const strapiStagesRepository = new StrapiStagesRepository(strapiService);
			const stage = await strapiStagesRepository.listAllOffreDeStageSlug();

			expect(stage).toStrictEqual(expectedFailure);
		});
	});

	describe('saveOffreDeStage', () => {
		it('appelle le strapi service avec les bons paramètres et renvoie la reponse', async () => {
			// Given
			const strapiService = aStrapiCmsRepository();
			const offreSauvegarde = anOffreDeStageDepotStrapi();
			jest.spyOn(strapiService, 'save').mockResolvedValueOnce(createSuccess(offreSauvegarde));

			const offreDeStageDepot = anOffreDeStageDepot();

			// When
			const strapiStagesRepository = new StrapiStagesRepository(strapiService);
			const result = await strapiStagesRepository.saveOffreDeStage(offreDeStageDepot);

			// Then
			expect(strapiService.save).toHaveBeenCalledTimes(1);
			expect(strapiService.save).toHaveBeenCalledWith(RESOURCE_OFFRE_DE_STAGE, offreSauvegarde);
			expect(result).toEqual(createSuccess(offreSauvegarde));
		});
	});
});
