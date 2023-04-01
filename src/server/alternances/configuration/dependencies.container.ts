import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import {
	ConsulterOffreAlternanceLaBonneAlternanceUseCase,
} from '~/server/alternances/useCases/consulterOffreAlternanceLaBonneAlternance.useCase';
import {
	ConsulterOffreAlternancePoleEmploiUseCase,
} from '~/server/alternances/useCases/consulterOffreAlternancePoleEmploi.useCase';
import {
	RechercherAlternanceLaBonneAlternanceUseCase,
} from '~/server/alternances/useCases/rechercherAlternanceLaBonneAlternance.useCase';
import {
	RechercherAlternancePoleEmploiUseCase,
} from '~/server/alternances/useCases/rechercherAlternancePoleEmploi.useCase';
import { OffreRepository } from '~/server/offres/domain/offre.repository';

export interface AlternanceDependencies {
	consulterAlternance: ConsulterOffreAlternanceLaBonneAlternanceUseCase
	rechercherAlternance: RechercherAlternanceLaBonneAlternanceUseCase
}

export function alternancesDependenciesContainer(alternanceRepository: AlternanceRepository): AlternanceDependencies {
	return {
		consulterAlternance: new ConsulterOffreAlternanceLaBonneAlternanceUseCase(alternanceRepository),
		rechercherAlternance: new RechercherAlternanceLaBonneAlternanceUseCase(alternanceRepository),
	};
}

export interface OffresAlternanceDependencies {
	consulterOffreAlternance: ConsulterOffreAlternancePoleEmploiUseCase
	rechercherOffreAlternance: RechercherAlternancePoleEmploiUseCase
}

export function offresAlternancesDependenciesContainer(offreRepository: OffreRepository): OffresAlternanceDependencies {
	return {
		consulterOffreAlternance: new ConsulterOffreAlternancePoleEmploiUseCase(offreRepository),
		rechercherOffreAlternance: new RechercherAlternancePoleEmploiUseCase(offreRepository),
	};
}
