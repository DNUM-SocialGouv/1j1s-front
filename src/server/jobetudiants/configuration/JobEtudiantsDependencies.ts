import { ApiTokenRepository } from "../../tokens/infra/ApiTokenRepository";
import { ClientService } from "../../services/http/ClientService";
import {
  listeJobEtudiantDependenciesContainer,
  ListeJobEtudiantDependenciesContainer
} from "../infra/configuration/ListeJobEtudiantDependenciesContainer";

export type JobEtudiantDependencies = ListeJobEtudiantDependenciesContainer;

export const jobEtudiantDependenciesContainer = (
  httpClientService: ClientService,
  apiTokenRepository: ApiTokenRepository
): JobEtudiantDependencies => {
  return {
    ...listeJobEtudiantDependenciesContainer(
      httpClientService,
      apiTokenRepository
    ),
  };
};
