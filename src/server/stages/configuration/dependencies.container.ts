import { EnregistrerOffreDeStageUseCase } from '~/server/stages/useCase/enregistrerOffreDeStage.useCase';

import { StagesRepository } from '../domain/stages.repository';
import { ConsulterOffreStageUseCase } from '../useCase/consulterOffreStage.useCase';
import { ListerStagesSlugsUseCase } from '../useCase/listerStagesSlugs.useCase';

export interface StagesDependencies {
	consulterOffreStage: ConsulterOffreStageUseCase
	listerStagesSlugs: ListerStagesSlugsUseCase
	enregistrerOffreDeStage: EnregistrerOffreDeStageUseCase
}

export function stagesDependenciesContainer(stagesRepository: StagesRepository): StagesDependencies {
	return {
		consulterOffreStage: new ConsulterOffreStageUseCase(stagesRepository),
		enregistrerOffreDeStage: new EnregistrerOffreDeStageUseCase(stagesRepository),
		listerStagesSlugs: new ListerStagesSlugsUseCase(stagesRepository),
	};
}
