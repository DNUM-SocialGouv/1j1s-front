import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { OffreDeStage, OffreStageDepot } from '~/server/stages/domain/stages';
import { StagesRepository } from '~/server/stages/domain/stages.repository';
import { OffreStageDepotStrapi, OffreStageResponseStrapi } from '~/server/stages/repository/strapiStages';
import { mapEnregistrerOffreDeStage, mapOffreStage } from '~/server/stages/repository/strapiStages.mapper';
import OffreDeStageDepot = OffreStageDepot.OffreDeStageDepot;

export const RESOURCE_OFFRE_DE_STAGE = 'offres-de-stage';
const API_SOURCE_OFFRE_STAGE = 'STRAPI - offre de stage';

export class StrapiStagesRepository implements StagesRepository {
	constructor(private readonly strapiService: CmsRepository, private readonly errorManagementService: ErrorManagementService) {
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
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: API_SOURCE_OFFRE_STAGE,
				contexte: 'get offre de stage par slug',
				message: 'impossible de mapper les stages par slug',
			});
		}
	}

	async listAllOffreDeStageSlug(): Promise<Either<Array<string>>> {
		const query = 'fields[0]=slug';
		const strapiResponseOffreDeStages = await this.strapiService.getCollectionType<OffreStageResponseStrapi.OffreStage>(RESOURCE_OFFRE_DE_STAGE, query);
		if (isFailure(strapiResponseOffreDeStages)) {
			return strapiResponseOffreDeStages;
		}

		const listAllOffreDeStageSlug = strapiResponseOffreDeStages.result.map((offreStage) => offreStage.slug);
		return createSuccess(listAllOffreDeStageSlug);
	}

	async saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>> {
		try {
			const offreStrapi = mapEnregistrerOffreDeStage(offre);
			return this.strapiService.save<OffreStageDepotStrapi, void>(RESOURCE_OFFRE_DE_STAGE, offreStrapi);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: API_SOURCE_OFFRE_STAGE,
				contexte: 'save offre de stage',
				message: 'impossible de mapper l‘offre a enregistrer',
			});
		}
	}
}

