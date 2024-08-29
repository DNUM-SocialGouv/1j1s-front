import { StrapiActualitesRepository } from '../infra/strapiActualites.repository';
import { ConsulterActualitesUseCase } from '../useCases/consulterActualites.useCase';
import { ConsulterActualitesEchantillonUseCase } from '../useCases/consulterActualitesEchantillon.useCase';

export interface ActualitesDependencies {
	consulterActualitesUseCase: ConsulterActualitesUseCase
	consulterActualitesEchantillonUseCase: ConsulterActualitesEchantillonUseCase
}

export function actualitesDependenciesContainer(actualitesRepository: StrapiActualitesRepository): ActualitesDependencies {
	return {
		consulterActualitesEchantillonUseCase: new ConsulterActualitesEchantillonUseCase(actualitesRepository),
		consulterActualitesUseCase: new ConsulterActualitesUseCase(actualitesRepository),
	};
}
