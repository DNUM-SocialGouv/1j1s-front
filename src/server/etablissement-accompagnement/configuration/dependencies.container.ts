import {
	EtablissementAccompagnementRepository,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.repository';
import {
	RechercherEtablissementAccompagnementUseCase,
} from '~/server/etablissement-accompagnement/useCase/rechercherEtablissementAccompagnement.useCase';

export interface EtablissementAccompagnementDependencies {
	rechercherEtablissementAccompagnementUseCase: RechercherEtablissementAccompagnementUseCase
}

export function etablissementAccompagnementDependenciesContainer(etablissementAccompagnementRepository: EtablissementAccompagnementRepository): EtablissementAccompagnementDependencies {
	return {
		rechercherEtablissementAccompagnementUseCase: new RechercherEtablissementAccompagnementUseCase(etablissementAccompagnementRepository),
	};
}
