import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createFailure, createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { OffreDeStage, OffreStageDepot } from '~/server/stages/domain/stages';
import { StagesRepository } from '~/server/stages/domain/stages.repository';
import { OffreStageDepotStrapi, OffreStageResponseStrapi } from '~/server/stages/repository/strapiStages';
import { flatMapSlug, mapEnregistrerOffreDeStage, mapOffreStage } from '~/server/stages/repository/strapiStages.mapper';
import OffreDeStageDepot = OffreStageDepot.OffreDeStageDepot;

export const RESOURCE_OFFRE_DE_STAGE = 'offres-de-stage';

export class StrapiStagesRepository implements StagesRepository {
	constructor(private readonly strapiService: CmsRepository) {
	}

	async getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>> {
		const query = `filters[slug][$eq]=${slug}&populate=deep`;
		const offreStageList = await this.strapiService.getFirstFromCollectionType<OffreStageResponseStrapi.OffreStage>(RESOURCE_OFFRE_DE_STAGE, query);
		if (isFailure(offreStageList)) {
			return offreStageList;
		}

		try {
			const offreStageMapped = mapOffreStage(offreStageList.result);
			return createSuccess(offreStageMapped);
		} catch (e) {
			// TODO (BRUJ 05/12/2023): rajouter quelque chose ici (log erreur + verifier que l'erreur est la bonne) + le test associé
			return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
		}
	}

	async listAllOffreDeStageSlug(): Promise<Either<Array<string>>> {
		const query = 'fields[0]=slug';
		const strapiResponseOffreDeStages = await this.strapiService.getCollectionType<OffreStageResponseStrapi.OffreStage>(RESOURCE_OFFRE_DE_STAGE, query);
		if (isFailure(strapiResponseOffreDeStages)) {
			return strapiResponseOffreDeStages;
		}

		try {
			const listAllOffreDeStageSlug = strapiResponseOffreDeStages.result.map((offreStage) => flatMapSlug(offreStage));
			return createSuccess(listAllOffreDeStageSlug);
		} catch (e) {
			return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
		}
	}

	async saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>> {
		const offreStrapi = mapEnregistrerOffreDeStage(offre);
		return this.strapiService.save<OffreStageDepotStrapi, void>(RESOURCE_OFFRE_DE_STAGE, offreStrapi);
	}
}

