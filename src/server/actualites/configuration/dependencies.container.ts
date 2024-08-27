import { StrapiActualitesRepository } from '../infra/strapiActualites.repository';
import { ConsulterActualitesUseCase } from '../useCases/consulterActualites.useCase';
import { ConsulterActualitesAccueilUseCase } from '../useCases/consulterActualitesAccueil.useCase';

export interface ActualitesDependencies {
	consulterActualitesUseCase: ConsulterActualitesUseCase
	consulterActualitesAccueilUseCase: ConsulterActualitesAccueilUseCase
}

export function actualitesDependenciesContainer(actualitesRepository: StrapiActualitesRepository): ActualitesDependencies {
	return {
		consulterActualitesAccueilUseCase: new ConsulterActualitesAccueilUseCase(actualitesRepository),
		consulterActualitesUseCase: new ConsulterActualitesUseCase(actualitesRepository),
	};
}
