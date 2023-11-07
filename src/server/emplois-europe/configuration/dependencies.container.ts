import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import { ConsulterEmploiEuropeUseCase } from '~/server/emplois-europe/useCases/consulterEmploiEurope.useCase';
import { RechercherEmploiEuropeUseCase } from '~/server/emplois-europe/useCases/rechercherEmploiEurope.useCase';

export interface EmploiEuropeDependencies {
	consulterEmploiEuropeUseCase: ConsulterEmploiEuropeUseCase
	rechercherEmploiEuropeUseCase: RechercherEmploiEuropeUseCase
}

export function emploiEuropeDependenciesContainer(emploiEuropeRepository: EmploiEuropeRepository): EmploiEuropeDependencies {
	return {
		consulterEmploiEuropeUseCase: new ConsulterEmploiEuropeUseCase(emploiEuropeRepository),
		rechercherEmploiEuropeUseCase: new RechercherEmploiEuropeUseCase(emploiEuropeRepository),
	};
}
