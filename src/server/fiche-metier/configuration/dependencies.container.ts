import { StrapiFicheMetierRepository } from '~/server/fiche-metier/infra/strapiFicheMetier.repository';
import { ConsulterFicheMetierUseCase } from '~/server/fiche-metier/useCases/consulterFicheMetier.useCase';
import { ListerNomsMetiersUseCase } from '~/server/fiche-metier/useCases/listerNomsMetiers.useCase';

export interface FicheMetierDependencies {
	consulterFicheMetier: ConsulterFicheMetierUseCase
	listerNomsMetiers: ListerNomsMetiersUseCase
}

export function ficheMetierDependenciesContainer(ficheMetierRepository: StrapiFicheMetierRepository): FicheMetierDependencies {
	return {
		consulterFicheMetier: new ConsulterFicheMetierUseCase(ficheMetierRepository),
		listerNomsMetiers: new ListerNomsMetiersUseCase(ficheMetierRepository),
	};
}
