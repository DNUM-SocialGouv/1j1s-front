import { FormationInitialeRepository } from '../domain/formationInitiale.repository';
import { RechercherFormationInitialeUseCase } from '../useCases/rechercherFormationInitiale.useCase';

export interface FormationInitialeDependencies {
	rechercherFormationInitiale: RechercherFormationInitialeUseCase
}

export function formationInitialeDependenciesContainer(formationInitialeRepository: FormationInitialeRepository): FormationInitialeDependencies {
	return {
		rechercherFormationInitiale: new RechercherFormationInitialeUseCase(formationInitialeRepository),
	};
}
