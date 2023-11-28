import { Stage3emeRepository } from '../domain/stage3eme.repository';
import { RechercherStage3emeUseCase } from '../useCase/rechercherStage3eme.useCase';

export interface Stage3emeDependencies {
	rechercherStage3eme: RechercherStage3emeUseCase
}

export function stage3emeDependenciesContainer(repository: Stage3emeRepository): Stage3emeDependencies {
	return {
		rechercherStage3eme: new RechercherStage3emeUseCase(repository),
	};
}
