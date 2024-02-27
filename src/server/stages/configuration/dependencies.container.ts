import { StagesRepository } from '~/server/stages/domain/stages.repository';
import { ConsulterOffreStageUseCase } from '~/server/stages/useCase/consulterOffreStage.useCase';
import { EnregistrerOffreDeStageUseCase } from '~/server/stages/useCase/enregistrerOffreDeStage.useCase';

export interface StagesDependencies {
	consulterOffreStage: ConsulterOffreStageUseCase
	enregistrerOffreDeStage: EnregistrerOffreDeStageUseCase
}

export function stagesDependenciesContainer(stagesRepository: StagesRepository): StagesDependencies {
	return {
		consulterOffreStage: new ConsulterOffreStageUseCase(stagesRepository),
		enregistrerOffreDeStage: new EnregistrerOffreDeStageUseCase(stagesRepository),
	};
}
