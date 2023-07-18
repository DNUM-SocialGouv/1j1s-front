import { StrapiFicheMetierRepository } from '~/server/fiche-metier/infra/strapiFicheMetier.repository';
import { ConsulterFicheMetierUseCase } from '~/server/fiche-metier/useCases/consulterFicheMetier.useCase';
import { ListerNomMetierFicheMétierUseCase } from '~/server/fiche-metier/useCases/listerNomMetierFicheMetier.useCase';

export interface FicheMetierDependencies {
	consulterFicheMetier: ConsulterFicheMetierUseCase
	listerNomMetierFicheMetier: ListerNomMetierFicheMétierUseCase
}

export function ficheMetierDependenciesContainer(strapiFicheMetierRepository: StrapiFicheMetierRepository): FicheMetierDependencies {
	return {
		consulterFicheMetier: new ConsulterFicheMetierUseCase(strapiFicheMetierRepository),
		listerNomMetierFicheMetier: new ListerNomMetierFicheMétierUseCase(strapiFicheMetierRepository),
	};
}
