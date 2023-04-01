import { RejoindreLaMobilisationRepository } from '~/server/entreprises/domain/RejoindreLaMobilisation.repository';
import { LesEntreprisesSEngagentUseCase } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';

export interface EntrepriseDependencies {
	lesEntreprisesSEngagentUseCase: LesEntreprisesSEngagentUseCase
}

export function entreprisesDependenciesContainer(
	apiRejoindreLaMobilisationRepository: RejoindreLaMobilisationRepository,
	cmsRejoindreLaMobilisationRepository: RejoindreLaMobilisationRepository,
) {
	return {
		lesEntreprisesSEngagentUseCase: new LesEntreprisesSEngagentUseCase(apiRejoindreLaMobilisationRepository, cmsRejoindreLaMobilisationRepository),
	};
}
