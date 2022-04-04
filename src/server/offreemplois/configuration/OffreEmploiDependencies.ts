import { CacheService } from "../../services/cache/CacheService";
import { HttpClientService } from "../../services/http/HttpClientService";
import { ApiTokenRepository } from "../../tokens/infra/ApiTokenRepository";
import {
  ListeOffreEmploiDependenciesContainer,
  listeOffreEmploiDependenciesContainer,
} from "../infra/configuration/ListeOffreEmploiDependenciesContainer";

export type OffreEmploiDependencies = ListeOffreEmploiDependenciesContainer;

export const offreEmploiDependenciesContainer = (
  httpClientService: HttpClientService,
  apiTokenRepository: ApiTokenRepository,
  cacheService: CacheService
): OffreEmploiDependencies => {
  return {
    ...listeOffreEmploiDependenciesContainer(
      httpClientService,
      apiTokenRepository,
      cacheService
    ),
  };
};
