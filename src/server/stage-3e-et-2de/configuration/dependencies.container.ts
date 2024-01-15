import {
	EnvoyerCandidatureStage3eEt2deUseCase,
} from '~/server/stage-3e-et-2de/useCase/envoyerCandidatureStage3eEt2de.useCase';
import {
	RecupererAppellationMetiersParAppellationCodesUseCase,
} from '~/server/stage-3e-et-2de/useCase/recupererAppellationMetiersParAppellationCodes.useCase';

import { MetierStage3eEt2deRepository } from '../domain/metierStage3eEt2de.repository';
import { Stage3eEt2deRepository } from '../domain/stage3eEt2de.repository';
import { RechercherAppellationMetierUseCase } from '../useCase/rechercherAppellationMetier.useCase';
import { RechercherStage3eEt2deUseCase } from '../useCase/rechercherStage3eEt2de.useCase';

export interface Stage3eEt2deDependencies {
	rechercherStage3eEt2de: RechercherStage3eEt2deUseCase
	rechercherAppellationMetier: RechercherAppellationMetierUseCase
	recupererAppellationMetiersParAppellationCodesUseCase: RecupererAppellationMetiersParAppellationCodesUseCase
	envoyerCandidatureStage3eEt2deUseCase: EnvoyerCandidatureStage3eEt2deUseCase
}

export function stage3eEt2deDependenciesContainer(repository: Stage3eEt2deRepository, metierRepository: MetierStage3eEt2deRepository): Stage3eEt2deDependencies {
	return {
		envoyerCandidatureStage3eEt2deUseCase: new EnvoyerCandidatureStage3eEt2deUseCase(repository),
		rechercherAppellationMetier: new RechercherAppellationMetierUseCase(metierRepository),
		rechercherStage3eEt2de: new RechercherStage3eEt2deUseCase(repository),
		recupererAppellationMetiersParAppellationCodesUseCase: new RecupererAppellationMetiersParAppellationCodesUseCase(metierRepository),
	};
}
