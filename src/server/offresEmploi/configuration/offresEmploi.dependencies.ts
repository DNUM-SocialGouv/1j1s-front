import {
  ListeOffreEmploiDependenciesContainer,
  listeOffreEmploiDependenciesContainer,
} from "~/server/offresEmploi/infra/configuration/listeOffreEmploiDependencies.container";
import { PoleEmploiHttpClientService } from "~/server/services/http/poleEmploiHttpClient.service";

export type OffresEmploiDependencies = ListeOffreEmploiDependenciesContainer;

export const offresEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService
): OffresEmploiDependencies => {
  return {
    ...listeOffreEmploiDependenciesContainer(poleEmploiHttpClientService),
  };
};
