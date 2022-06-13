import {
  ConsulterOffreAlternanceDependenciesContainer,
  consulterOffreAlternanceDependenciesContainer,
} from '~/server/alternances/infra/configuration/consulterOffreAlternanceDependencies.container';
import {
  RechercherAlternanceDependenciesContainer,
  rechercherAlternanceDependenciesContainer,
} from '~/server/alternances/infra/configuration/rechercheAlternanceDependencies.container';
import {
  RechercherMétierDependenciesContainer,
  rechercherMétierDependenciesContainer,
} from '~/server/alternances/infra/configuration/rechercheMétierDependencies.container';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export type AlternanceDependencies =
  RechercherMétierDependenciesContainer
  & RechercherAlternanceDependenciesContainer
  & ConsulterOffreAlternanceDependenciesContainer;

export const alternanceDependenciesContainer = (laBonneAlternanceHttpClient: LaBonneAlternanceHttpClientService): AlternanceDependencies => {
  return {
    ...rechercherMétierDependenciesContainer(laBonneAlternanceHttpClient),
    ...rechercherAlternanceDependenciesContainer(laBonneAlternanceHttpClient),
    ...consulterOffreAlternanceDependenciesContainer(laBonneAlternanceHttpClient),
  };
};
