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
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export type AlternanceDependencies =
  RechercherMétierDependenciesContainer
  & RechercherAlternanceDependenciesContainer
  & ConsulterOffreAlternanceDependenciesContainer;

export const alternanceDependenciesContainer = (
  httpClientService: HttpClientService,
  cacheService: CacheService,
): AlternanceDependencies => {
  return {
    ...rechercherMétierDependenciesContainer(httpClientService, cacheService),
    ...rechercherAlternanceDependenciesContainer(httpClientService, cacheService),
    ...consulterOffreAlternanceDependenciesContainer(httpClientService, cacheService),
  };
};
