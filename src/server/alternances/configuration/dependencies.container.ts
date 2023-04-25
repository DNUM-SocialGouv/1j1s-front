import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import {
	ConsulterOffreAlternanceLaBonneAlternanceUseCase,
} from '~/server/alternances/useCases/consulterOffreAlternanceLaBonneAlternance.useCase';
import {
	RechercherAlternanceLaBonneAlternanceUseCase,
} from '~/server/alternances/useCases/rechercherAlternanceLaBonneAlternance.useCase';

export interface AlternanceDependencies {
	consulterAlternance: ConsulterOffreAlternanceLaBonneAlternanceUseCase
	rechercherAlternance: RechercherAlternanceLaBonneAlternanceUseCase
}

export function alternancesDependenciesContainer(alternanceRepository: AlternanceRepository): AlternanceDependencies {
	return {
		consulterAlternance: new ConsulterOffreAlternanceLaBonneAlternanceUseCase(alternanceRepository),
		rechercherAlternance: new RechercherAlternanceLaBonneAlternanceUseCase(alternanceRepository),
	};
}
