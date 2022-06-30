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
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export type AlternanceDependencies =
  RechercherMétierDependenciesContainer
  & RechercherAlternanceDependenciesContainer
  & ConsulterOffreAlternanceDependenciesContainer;

export const alternanceDependenciesContainer = (
  laBonneAlternanceHttpClient: LaBonneAlternanceHttpClientService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): AlternanceDependencies => {
  return {
    ...rechercherMétierDependenciesContainer(laBonneAlternanceHttpClient, apiPoleEmploiRéférentielRepository),
    ...rechercherAlternanceDependenciesContainer(laBonneAlternanceHttpClient, apiPoleEmploiRéférentielRepository),
    ...consulterOffreAlternanceDependenciesContainer(laBonneAlternanceHttpClient, apiPoleEmploiRéférentielRepository),
  };
};
