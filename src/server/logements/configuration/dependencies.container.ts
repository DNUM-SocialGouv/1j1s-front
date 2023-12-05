import { AnnonceDeLogementRepository } from '../domain/annonceDeLogement.repository';
import { ConsulterAnnonceLogementUseCase } from '../useCases/consulterAnnonceDeLogement.useCase';

export interface AnnonceDeLogementDependencies {
	consulterAnnonceLogementUseCase: ConsulterAnnonceLogementUseCase
}

export function annonceDeLogementDependenciesContainer(annonceDeLogementRepository: AnnonceDeLogementRepository): AnnonceDeLogementDependencies {
	return {
		consulterAnnonceLogementUseCase: new ConsulterAnnonceLogementUseCase(annonceDeLogementRepository),
	};
}
