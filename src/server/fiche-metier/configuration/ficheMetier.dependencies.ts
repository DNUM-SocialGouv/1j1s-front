import { MeiliSearch } from 'meilisearch';

import {
  RechercherFicheMetierDependencies,
  rechercherFicheMetierDependenciesContainer,
} from '~/server/fiche-metier/infra/configuration/rechercherFicheMetierDependencies.container';

export type FicheMetierDependencies = RechercherFicheMetierDependencies

export const ficheMetierDependenciesContainer = (client: MeiliSearch) => {
  return { ...rechercherFicheMetierDependenciesContainer(client) };
};
