import {
	DemandeDeContactAccompagnementRepository,
} from '~/server/demande-de-contact/infra/repositories/accompagnement/demandeDeContactAccompagnement.repository';
import {
	DemandeDeContactCEJRepository,
} from '~/server/demande-de-contact/infra/repositories/cej/demandeDeContactCEJ.repository';
import {
	DemandeDeContactEntrepriseRepository,
} from '~/server/demande-de-contact/infra/repositories/entreprise/demandeDeContactEntreprise.repository';
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
	EnvoyerDemandeDeContactEntrepriseUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactEntreprise.usecase';
import {
	EnvoyerDemandeDeContactPOEUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactPOE.usecase';

export interface DemandeDeContactDependencies {
	envoyerDemandeDeContactCEJUseCase: EnvoyerDemandeDeContactCEJUseCase
	envoyerDemandeDeContactEntrepriseUseCase: EnvoyerDemandeDeContactEntrepriseUseCase
	envoyerDemandeDeContactPOEUseCase: EnvoyerDemandeDeContactPOEUseCase
	envoyerDemandeDeContactAccompagnementUseCase: EnvoyerDemandeDeContactAccompagnementUseCase
}

export function demandeDeContactDependenciesContainer(
	demandeDeContactAccompagnementRepository: DemandeDeContactAccompagnementRepository,
	demandeDeContactCEJRepository: DemandeDeContactCEJRepository,
	demandeDeContactEntrepriseRepository: DemandeDeContactEntrepriseRepository,
	demandeDeContactPOERepository: DemandeDeContactPOERepository,
): DemandeDeContactDependencies {
	return {
		envoyerDemandeDeContactAccompagnementUseCase: new EnvoyerDemandeDeContactAccompagnementUseCase(demandeDeContactAccompagnementRepository),
		envoyerDemandeDeContactCEJUseCase: new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactCEJRepository),
		envoyerDemandeDeContactEntrepriseUseCase: new EnvoyerDemandeDeContactEntrepriseUseCase(demandeDeContactEntrepriseRepository),
		envoyerDemandeDeContactPOEUseCase: new EnvoyerDemandeDeContactPOEUseCase(demandeDeContactPOERepository),
	};
}
