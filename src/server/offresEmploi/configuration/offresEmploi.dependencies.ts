import {
  ConsulterOffreEmploiDependenciesContainer,
  consulterOffreEmploiDependenciesContainer,
} from '~/server/offresEmploi/infra/configuration/consulterOffreEmploiDependencies.container';
import {
  RechercherOffreEmploiDependenciesContainer,
  rechercherOffreEmploiDependenciesContainer,
} from '~/server/offresEmploi/infra/configuration/rechercherOffreEmploiDependencies.container';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { CacheService } from '~/server/services/cache/cache.service';
import {
  HttpClientServiceWithAuthentificationPoleEmploi,
} from '~/server/services/http/httpClientWithAuthentificationPoleEmploi.service';

export type OffresEmploiDependencies = ConsulterOffreEmploiDependenciesContainer
  & RechercherOffreEmploiDependenciesContainer

export const offresEmploiDependenciesContainer = (
  httpClientServiceWithAuthentification: HttpClientServiceWithAuthentificationPoleEmploi,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  cacheService: CacheService,
): OffresEmploiDependencies => {
  return {
    ...consulterOffreEmploiDependenciesContainer(httpClientServiceWithAuthentification, apiPoleEmploiRéférentielRepository, cacheService),
    ...rechercherOffreEmploiDependenciesContainer(httpClientServiceWithAuthentification, apiPoleEmploiRéférentielRepository, cacheService),
  };
};
