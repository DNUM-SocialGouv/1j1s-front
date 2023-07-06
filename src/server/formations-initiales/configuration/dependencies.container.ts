import {
	ConsulterDetailFormationInitialeUseCase,
} from '~/server/formations-initiales/useCases/consulterDetailFormationInitiale.useCase';

import { FormationInitialeRepository } from '../domain/formationInitiale.repository';
import { RechercherFormationInitialeUseCase } from '../useCases/rechercherFormationInitiale.useCase';

export interface FormationInitialeDependencies {
	consulterDetailFormationInitiale: ConsulterDetailFormationInitialeUseCase
	rechercherFormationInitiale: RechercherFormationInitialeUseCase
}

export function formationInitialeDependenciesContainer(formationInitialeRepository: FormationInitialeRepository): FormationInitialeDependencies {
	return {
		consulterDetailFormationInitiale: new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository),
		rechercherFormationInitiale: new RechercherFormationInitialeUseCase(formationInitialeRepository),
	};
}
