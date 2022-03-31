import { HttpClientService } from "../../services/http/HttpClientService";
import {
  ListeMetierRechercheDependenciesContainer,
  listeMetierRechercherDependenciesContainer,
} from "../infra/configuration/ListeMetierRechercheDependenciesContainer";

export type MetierRechercheDependencies =
  ListeMetierRechercheDependenciesContainer;

export const metierRechercheDependenciesContainer = (
  httpClientService: HttpClientService
): MetierRechercheDependencies => {
  return {
    ...listeMetierRechercherDependenciesContainer(httpClientService),
  };
};
