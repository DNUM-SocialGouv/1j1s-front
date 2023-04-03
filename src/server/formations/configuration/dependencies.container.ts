import { FormationRepository } from '~/server/formations/domain/formation.repository';
import { StatistiqueRepository } from '~/server/formations/domain/statistique.repository';
import { ConsulterFormationUseCase } from '~/server/formations/useCases/consulterFormation.useCase';
import { RechercherFormationUseCase } from '~/server/formations/useCases/rechercherFormation.useCase';

export interface FormationDependencies {
	rechercherFormation: RechercherFormationUseCase
	consulterFormation: ConsulterFormationUseCase
}

export function formationsDependenciesContainer(formationRepository: FormationRepository, statistiqueRepository: StatistiqueRepository): FormationDependencies {
	return {
		consulterFormation: new ConsulterFormationUseCase(formationRepository, statistiqueRepository),
		rechercherFormation: new RechercherFormationUseCase(formationRepository),
	};
}
