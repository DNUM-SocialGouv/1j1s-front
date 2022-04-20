import { PoleEmploiHttpClientService } from "../../services/http/poleEmploiHttpClient.service";
import {
  ListeOffreEmploiDependenciesContainer,
  listeOffreEmploiDependenciesContainer,
} from "../infra/configuration/listeOffreEmploiDependencies.container";

export type OffreEmploiDependencies = ListeOffreEmploiDependenciesContainer;

export const offreEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService
): OffreEmploiDependencies => {
  return {
    ...listeOffreEmploiDependenciesContainer(poleEmploiHttpClientService),
  };
};
