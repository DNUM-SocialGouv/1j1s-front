import { MetierStage3emeRepository } from '../domain/metierStage3eme.repository';
import { Stage3emeRepository } from '../domain/stage3eme.repository';
import { RechercherAppellationMetierUseCase } from '../useCase/rechercherAppellationMetier.useCase';
import { RechercherStage3emeUseCase } from '../useCase/rechercherStage3eme.useCase';

export interface Stage3emeDependencies {
	rechercherStage3eme: RechercherStage3emeUseCase
	rechercherAppellationMetier: RechercherAppellationMetierUseCase
}

export function stage3emeDependenciesContainer(repository: Stage3emeRepository, metierRepository: MetierStage3emeRepository): Stage3emeDependencies {
	return {
		rechercherAppellationMetier: new RechercherAppellationMetierUseCase(metierRepository),
		rechercherStage3eme: new RechercherStage3emeUseCase(repository),
	};
}
