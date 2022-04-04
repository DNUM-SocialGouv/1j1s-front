import { ApiTokenRepository } from "../../tokens/infra/ApiTokenRepository";
import { HttpClientService } from "../../services/http/HttpClientService";
import {
  listeJobEtudiantDependenciesContainer,
  ListeJobEtudiantDependenciesContainer
} from "../infra/configuration/ListeJobEtudiantDependenciesContainer";

export type JobEtudiantDependencies = ListeJobEtudiantDependenciesContainer;

export const jobEtudiantDependenciesContainer = (
  httpClientService: HttpClientService,
  apiTokenRepository: ApiTokenRepository
): JobEtudiantDependencies => {
  return {
    ...listeJobEtudiantDependenciesContainer(
      httpClientService,
      apiTokenRepository
    ),
  };
};
