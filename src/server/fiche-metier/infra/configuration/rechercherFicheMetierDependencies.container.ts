import { MeiliSearch } from 'meilisearch';

import {
  FicheMetierMeilisearchRepository,
} from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.repository';
import { RechercherFicheMetierUseCase } from '~/server/fiche-metier/useCases/rechercherFicheMetier.useCase';

export interface RechercherFicheMetierDependencies {
  readonly rechercherFicheMetier: RechercherFicheMetierUseCase
}

export const rechercherFicheMetierDependenciesContainer = (client: MeiliSearch): RechercherFicheMetierDependencies => {
  const ficheMetierRepository = new FicheMetierMeilisearchRepository(client);
	
  return {
    rechercherFicheMetier: new RechercherFicheMetierUseCase(ficheMetierRepository),
  };
};
