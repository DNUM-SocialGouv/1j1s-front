import { ConsulterOffreEmploiUseCase } from '~/server/emplois/useCases/consulterOffreEmploi.useCase';
import { RechercherOffreEmploiUseCase } from '~/server/emplois/useCases/rechercherOffreEmploi.useCase';
import { OffreRepository } from '~/server/offres/domain/offre.repository';

export interface OffresEmploiDependencies {
	consulterOffreEmploi: ConsulterOffreEmploiUseCase
	rechercherOffreEmploi: RechercherOffreEmploiUseCase
}

export function offresEmploiDependenciesContainer(offreRepository: OffreRepository): OffresEmploiDependencies {
	return {
		consulterOffreEmploi: new ConsulterOffreEmploiUseCase(offreRepository),
		rechercherOffreEmploi: new RechercherOffreEmploiUseCase(offreRepository),
	};
}
