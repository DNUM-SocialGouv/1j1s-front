import { StrapiServicesJeunesRepository } from '../infra/strapiServicesJeunes.repository';
import { ConsulterLesServicesJeunesUseCase } from '../useCases/consulterLesServicesJeunes.useCase';

export interface ServicesJeunesDependencies {
	consulterLesServicesJeunesUseCase: ConsulterLesServicesJeunesUseCase
}

export function servicesJeunesDependenciesContainer(servicesJeuneRepository: StrapiServicesJeunesRepository): ServicesJeunesDependencies {
	return {
		consulterLesServicesJeunesUseCase: new ConsulterLesServicesJeunesUseCase(servicesJeuneRepository),
	};
}
