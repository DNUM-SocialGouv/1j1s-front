import { HttpClientService } from "../../services/http/HttpClientService";
import { ApiTokenRepository } from "../../tokens/infra/ApiTokenRepository";
import {
  ListeOffreEmploiDependenciesContainer,
  listeOffreEmploiDependenciesContainer,
} from "../infra/configuration/ListeOffreEmploiDependenciesContainer";

export type OffreEmploiDependencies = ListeOffreEmploiDependenciesContainer;

export const offreEmploiDependenciesContainer = (
  httpClientService: HttpClientService,
  apiTokenRepository: ApiTokenRepository
): OffreEmploiDependencies => {
  return {
    ...listeOffreEmploiDependenciesContainer(
      httpClientService,
      apiTokenRepository
    ),
  };
};
