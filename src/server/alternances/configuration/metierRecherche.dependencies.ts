import {
  ListeMetierRechercheDependenciesContainer,
  listeMetierRechercherDependenciesContainer,
} from '~/server/alternances/infra/configuration/listeMetierRechercheDependencies.container';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export type MetierRechercheDependencies =
  ListeMetierRechercheDependenciesContainer;

export const metierRechercheDependenciesContainer = (
  laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient,
): MetierRechercheDependencies => {
  return {
    ...listeMetierRechercherDependenciesContainer(laBonneAlternanceHttpClient),
  };
};
