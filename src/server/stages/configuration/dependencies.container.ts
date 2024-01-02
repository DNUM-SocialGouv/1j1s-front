import { StagesRepository } from '~/server/stages/domain/stages.repository';
import { ConsulterOffreStageUseCase } from '~/server/stages/useCase/consulterOffreStage.useCase';
import { EnregistrerOffreDeStageUseCase } from '~/server/stages/useCase/enregistrerOffreDeStage.useCase';
import { ListerStagesSlugsUseCase } from '~/server/stages/useCase/listerStagesSlugs.useCase';

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
