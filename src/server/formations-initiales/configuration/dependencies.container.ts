import { FormationInitialeRepository } from '../domain/formationInitiale.repository';
import { RechercherFormationsInitialesUseCase } from '../useCases/rechercherFormationsInitiales.useCase';

export interface FormationInitialeDependencies {
	rechercherFormationsInitiales: RechercherFormationsInitialesUseCase
}

export function formationInitialeDependenciesContainer(formationInitialeRepository: FormationInitialeRepository): FormationInitialeDependencies {
	return {
		rechercherFormationsInitiales: new RechercherFormationsInitialesUseCase(formationInitialeRepository),
	};
}
