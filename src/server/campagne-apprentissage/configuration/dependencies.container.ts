import { AnnonceDeLogementRepository } from '../domain/annonceDeLogement.repository';
import { VideoCampagneApprentissageRepository } from '../domain/videoCampagneApprentissage.repository';
import { ConsulterAnnonceLogementUseCase } from '../useCases/consulterAnnonceDeLogement.useCase';
import { RecupererVideosCampagneApprentissageUseCase } from '../useCases/recupererVideosCampagneApprentissage.useCase';

export interface CampagneApprentissageDependencies {
	recupererVideosCampagneApprentissageUseCase: RecupererVideosCampagneApprentissageUseCase
}

export function campagneApprentissageDependenciesContainer(videoCampagneApprentissageRepository: VideoCampagneApprentissageRepository): AnnonceDeLogementDependencies {
	return {
		recupererVideosCampagneApprentissageUseCase: new RecupererVideosCampagneApprentissageUseCase(videoCampagneApprentissageRepository),
	};
}
