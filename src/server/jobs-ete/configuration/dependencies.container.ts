import { ConsulterOffreJobEteUseCase } from '~/server/jobs-ete/useCases/consulterOffreJobEteUseCase';
import { RechercherOffreJobEteUseCase } from '~/server/jobs-ete/useCases/rechercherOffreJobEteUseCase';
import { OffreRepository } from '~/server/offres/domain/offre.repository';


export interface OffresJobEteDependencies {
	consulterOffreJobEte: ConsulterOffreJobEteUseCase
	rechercherOffreJobEte: RechercherOffreJobEteUseCase
}

export function jobsEteDependenciesContainer(offreRepository: OffreRepository): OffresJobEteDependencies {
	return {
		consulterOffreJobEte: new ConsulterOffreJobEteUseCase(offreRepository),
		rechercherOffreJobEte: new RechercherOffreJobEteUseCase(offreRepository),
	};
}
