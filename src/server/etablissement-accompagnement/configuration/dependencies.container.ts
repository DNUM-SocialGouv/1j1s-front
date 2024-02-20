import {
	EtablissementAccompagnementRepository,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.repository';
import {
	RechercherEtablissementAccompagnementUseCase,
} from '~/server/etablissement-accompagnement/useCase/rechercherEtablissementAccompagnement.useCase';

export interface ÉtablissementAccompagnementDependencies {
	rechercherÉtablissementAccompagnementUseCase: RechercherEtablissementAccompagnementUseCase
}

export function établissementAccompagnementDependenciesContainer(établissementAccompagnementRepository: EtablissementAccompagnementRepository): ÉtablissementAccompagnementDependencies {
	return {
		rechercherÉtablissementAccompagnementUseCase: new RechercherEtablissementAccompagnementUseCase(établissementAccompagnementRepository),
	};
}
