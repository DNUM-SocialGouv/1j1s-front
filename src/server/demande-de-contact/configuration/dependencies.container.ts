import {
	DemandeDeContactAccompagnementRepository,
} from '~/server/demande-de-contact/infra/repositories/accompagnement/demandeDeContactAccompagnement.repository';
import {
	DemandeDeContactCEJRepository,
} from '~/server/demande-de-contact/infra/repositories/cej/demandeDeContactCEJ.repository';
import {
	DemandeDeContactPOERepository,
} from '~/server/demande-de-contact/infra/repositories/poe/demandeDeContactPOE.repository';
import {
	EnvoyerDemandeDeContactAccompagnementUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactAccompagnement.usecase';
import {
	EnvoyerDemandeDeContactCEJUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import {
	EnvoyerDemandeDeContactPOEUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactPOE.usecase';

export interface DemandeDeContactDependencies {
	envoyerDemandeDeContactCEJUseCase: EnvoyerDemandeDeContactCEJUseCase
	envoyerDemandeDeContactPOEUseCase: EnvoyerDemandeDeContactPOEUseCase
	envoyerDemandeDeContactAccompagnementUseCase: EnvoyerDemandeDeContactAccompagnementUseCase
}

export function demandeDeContactDependenciesContainer(
	demandeDeContactAccompagnementRepository: DemandeDeContactAccompagnementRepository,
	demandeDeContactCEJRepository: DemandeDeContactCEJRepository,
	demandeDeContactPOERepository: DemandeDeContactPOERepository,
): DemandeDeContactDependencies {
	return {
		envoyerDemandeDeContactAccompagnementUseCase: new EnvoyerDemandeDeContactAccompagnementUseCase(demandeDeContactAccompagnementRepository),
		envoyerDemandeDeContactCEJUseCase: new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactCEJRepository),
		envoyerDemandeDeContactPOEUseCase: new EnvoyerDemandeDeContactPOEUseCase(demandeDeContactPOERepository),
	};
}
