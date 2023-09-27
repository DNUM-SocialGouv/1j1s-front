import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import { RechercherEmploiEuropeUseCase } from '~/server/emplois-europe/useCases/rechercherEmploiEurope.useCase';

export interface EmploiEuropeDependencies {
	rechercherEmploiEuropeUseCase: RechercherEmploiEuropeUseCase;
}

export function emploiEuropeDependenciesContainer(emploiEuropeRepository: EmploiEuropeRepository): EmploiEuropeDependencies {
	return {
		rechercherEmploiEuropeUseCase: new RechercherEmploiEuropeUseCase(emploiEuropeRepository),
	};
}
