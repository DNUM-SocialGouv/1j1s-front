import {
  RechercherAlternanceDependenciesContainer,
  rechercherAlternanceDependenciesContainer,
} from '~/server/alternances/infra/configuration/rechercheAlternanceDependencies.container';
import {
  RechercherMétierDependenciesContainer,
  rechercherMétierDependenciesContainer,
} from '~/server/alternances/infra/configuration/rechercheMétierDependencies.container';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export type AlternanceDependencies =
  RechercherMétierDependenciesContainer & RechercherAlternanceDependenciesContainer;

export const alternanceDependenciesContainer = (laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient): AlternanceDependencies => {
  return {
    ...rechercherMétierDependenciesContainer(laBonneAlternanceHttpClient),
    ...rechercherAlternanceDependenciesContainer(laBonneAlternanceHttpClient),
  };
};
