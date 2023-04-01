import {
	ÉtablissementAccompagnementRepository,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.repository';
import {
	RechercherÉtablissementAccompagnementUseCase,
} from '~/server/établissement-accompagnement/useCase/rechercherÉtablissementAccompagnement.useCase';

export interface ÉtablissementAccompagnementDependencies {
	rechercherÉtablissementAccompagnementUseCase: RechercherÉtablissementAccompagnementUseCase
}

export function établissementAccompagnementDependenciesContainer(établissementAccompagnementRepository: ÉtablissementAccompagnementRepository): ÉtablissementAccompagnementDependencies {
	return {
		rechercherÉtablissementAccompagnementUseCase: new RechercherÉtablissementAccompagnementUseCase(établissementAccompagnementRepository),
	};
}
