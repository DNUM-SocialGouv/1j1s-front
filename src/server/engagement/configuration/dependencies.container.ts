import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import { ConsulterMissionEngagementUseCase } from '~/server/engagement/useCases/consulterMissionEngagement.useCase';
import { RechercherMissionBénévolatUseCase } from '~/server/engagement/useCases/rechercherMissionBenevolat.useCase';
import { RechercherMissionServiceCiviqueUseCase } from '~/server/engagement/useCases/rechercherMissionServiceCivique.useCase';

export interface EngagementDependencies {
	rechercherMissionBénévolat: RechercherMissionBénévolatUseCase;
	rechercherMissionServiceCivique: RechercherMissionServiceCiviqueUseCase;
	consulterMissionEngagement: ConsulterMissionEngagementUseCase;
}

export function engagementDependenciesContainer(engagementRepository: EngagementRepository): EngagementDependencies {
	return {
		consulterMissionEngagement: new ConsulterMissionEngagementUseCase(engagementRepository),
		rechercherMissionBénévolat: new RechercherMissionBénévolatUseCase(engagementRepository),
		rechercherMissionServiceCivique: new RechercherMissionServiceCiviqueUseCase(engagementRepository),
	};
}
