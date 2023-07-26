import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { FormationInitialeRepository } from '~/server/formations-initiales/domain/formationInitiale.repository';
import {
	ConsulterDetailFormationInitialeUseCase,
} from '~/server/formations-initiales-detail/useCases/consulterDetailFormationInitiale.useCase';


export interface FormationInitialeDetailDependencies {
	consulterDetailFormationInitiale: ConsulterDetailFormationInitialeUseCase
}

export function formationInitialeDetailDependenciesContainer(formationInitialeRepository: FormationInitialeRepository, cmsRepository: CmsRepository): FormationInitialeDetailDependencies {
	return {
		consulterDetailFormationInitiale: new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, cmsRepository),
	};
}
