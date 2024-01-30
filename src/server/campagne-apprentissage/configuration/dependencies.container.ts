import { VideoCampagneApprentissageRepository } from '../domain/videoCampagneApprentissage.repository';
import { RecupererVideosCampagneApprentissageUseCase } from '../useCases/recupererVideosCampagneApprentissage.useCase';

export interface CampagneApprentissageDependencies {
	recupererVideosCampagneApprentissageUseCase: RecupererVideosCampagneApprentissageUseCase
}

export function campagneApprentissageDependenciesContainer(videoCampagneApprentissageRepository: VideoCampagneApprentissageRepository): CampagneApprentissageDependencies {
	return {
		recupererVideosCampagneApprentissageUseCase: new RecupererVideosCampagneApprentissageUseCase(videoCampagneApprentissageRepository),
	};
}
