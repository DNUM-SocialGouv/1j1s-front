import { StrapiActualitesRepository } from '../infra/strapiActualites.repository';
import { ConsulterActualitesUseCase } from '../useCases/consulterActualites.useCase';

export interface ActualitesDependencies {
	consulterActualitesUseCase: ConsulterActualitesUseCase
}

export function actualitesDependenciesContainer(actualitesRepository: StrapiActualitesRepository): ActualitesDependencies {
	return {
		consulterActualitesUseCase: new ConsulterActualitesUseCase(actualitesRepository),
	};
}
