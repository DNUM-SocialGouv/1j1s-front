import { FormationInitialeRepository } from '../domain/formationInitiale.repository';
import { RechercherFormationsInitialesUseCase } from '../useCases/rechercherFormationsInitiales.useCase';

export interface MétierDependencies {
	rechercherFormationsInitiales: RechercherFormationsInitialesUseCase
}

export function formationInitialeDependenciesContainer(formationInitialeRepository: FormationInitialeRepository): MétierDependencies {
	return {
		rechercherFormationsInitiales: new RechercherFormationsInitialesUseCase(formationInitialeRepository),
	};
}
