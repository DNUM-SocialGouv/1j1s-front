import { ClientService } from "../../services/http/ClientService";
import { ApiTokenRepository } from "../../tokens/infra/ApiTokenRepository";
import {
  ListeOffreEmploiDependenciesContainer,
  listeOffreEmploiDependenciesContainer,
} from "../infra/configuration/ListeOffreEmploiDependenciesContainer";

export type OffreEmploiDependencies = ListeOffreEmploiDependenciesContainer;

export const offreEmploiDependenciesContainer = (
  httpClientService: ClientService,
  apiTokenRepository: ApiTokenRepository
): OffreEmploiDependencies => {
  return {
    ...listeOffreEmploiDependenciesContainer(
      httpClientService,
      apiTokenRepository
    ),
  };
};
