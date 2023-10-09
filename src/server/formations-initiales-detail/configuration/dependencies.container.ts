import { FormationInitialeRepository } from '~/server/formations-initiales/domain/formationInitiale.repository';
import {
	FormationInitialeDetailRepository,
} from '~/server/formations-initiales-detail/domain/formationInitialeDetail.repository';
import {
	ConsulterDetailFormationInitialeUseCase,
} from '~/server/formations-initiales-detail/useCases/consulterDetailFormationInitiale.useCase';


export interface FormationInitialeDetailDependencies {
	consulterDetailFormationInitiale: ConsulterDetailFormationInitialeUseCase
}

export function formationInitialeDetailDependenciesContainer(formationInitialeRepository: FormationInitialeRepository, formationInitialeDetailRepository: FormationInitialeDetailRepository): FormationInitialeDetailDependencies {
	return {
		consulterDetailFormationInitiale: new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, formationInitialeDetailRepository),
	};
}
