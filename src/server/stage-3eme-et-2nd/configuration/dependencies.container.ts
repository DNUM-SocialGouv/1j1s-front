import { MetierStage3emeEt2ndRepository } from '../domain/metierStage3emeEt2nd.repository';
import { Stage3emeEt2ndRepository } from '../domain/stage3emeEt2nd.repository';
import { RechercherAppellationMetierUseCase } from '../useCase/rechercherAppellationMetier.useCase';
import { RechercherStage3emeEt2ndUseCase } from '../useCase/rechercherStage3emeEt2nd.useCase';

export interface Stage3emeDependencies {
	rechercherStage3eme: RechercherStage3emeEt2ndUseCase
	rechercherAppellationMetier: RechercherAppellationMetierUseCase
}

export function stage3emeDependenciesContainer(repository: Stage3emeEt2ndRepository, metierRepository: MetierStage3emeEt2ndRepository): Stage3emeDependencies {
	return {
		rechercherAppellationMetier: new RechercherAppellationMetierUseCase(metierRepository),
		rechercherStage3eme: new RechercherStage3emeEt2ndUseCase(repository),
	};
}
