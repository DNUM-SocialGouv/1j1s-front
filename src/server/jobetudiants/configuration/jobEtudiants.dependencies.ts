import { PoleEmploiHttpClientService } from "../../services/http/poleEmploiHttpClient.service";
import {
  ListeJobEtudiantDependenciesContainer,
  listeJobEtudiantDependenciesContainer,
} from "../infra/configuration/listeJobEtudiantDependencies.container";

export type JobEtudiantDependencies = ListeJobEtudiantDependenciesContainer;

export const jobEtudiantDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService
): JobEtudiantDependencies => {
  return {
    ...listeJobEtudiantDependenciesContainer(poleEmploiHttpClientService),
  };
};
