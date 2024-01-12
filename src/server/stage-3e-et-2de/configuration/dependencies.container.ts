import { MetierStage3eEt2deRepository } from '../domain/metierStage3eEt2de.repository';
import { Stage3eEt2deRepository } from '../domain/stage3eEt2de.repository';
import { RechercherAppellationMetierUseCase } from '../useCase/rechercherAppellationMetier.useCase';
import { RechercherStage3eEt2deUseCase } from '../useCase/rechercherStage3eEt2de.useCase';

export interface Stage3eEt2deDependencies {
	rechercherStage3eEt2de: RechercherStage3eEt2deUseCase
	rechercherAppellationMetier: RechercherAppellationMetierUseCase
}

export function stage3eEt2deDependenciesContainer(repository: Stage3eEt2deRepository, metierRepository: MetierStage3eEt2deRepository): Stage3eEt2deDependencies {
	return {
		rechercherAppellationMetier: new RechercherAppellationMetierUseCase(metierRepository),
		rechercherStage3eEt2de: new RechercherStage3eEt2deUseCase(repository),
	};
}
