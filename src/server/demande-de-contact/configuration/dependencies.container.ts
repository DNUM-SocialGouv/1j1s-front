import {
	DemandeDeContactAccompagnementRepository,
} from '~/server/demande-de-contact/infra/repositories/accompagnement/demandeDeContactAccompagnement.repository';
import {
	DemandeDeContactCEJRepository,
} from '~/server/demande-de-contact/infra/repositories/cej/demandeDeContactCEJ.repository';
import {
	EnvoyerDemandeDeContactAccompagnementUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactAccompagnement.usecase';
import {
	EnvoyerDemandeDeContactCEJUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';

export interface DemandeDeContactDependencies {
	envoyerDemandeDeContactCEJUseCase: EnvoyerDemandeDeContactCEJUseCase
	envoyerDemandeDeContactAccompagnementUseCase: EnvoyerDemandeDeContactAccompagnementUseCase
}

export function demandeDeContactDependenciesContainer(
	demandeDeContactAccompagnementRepository: DemandeDeContactAccompagnementRepository,
	demandeDeContactCEJRepository: DemandeDeContactCEJRepository,
): DemandeDeContactDependencies {
	return {
		envoyerDemandeDeContactAccompagnementUseCase: new EnvoyerDemandeDeContactAccompagnementUseCase(demandeDeContactAccompagnementRepository),
		envoyerDemandeDeContactCEJUseCase: new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactCEJRepository),
	};
}
