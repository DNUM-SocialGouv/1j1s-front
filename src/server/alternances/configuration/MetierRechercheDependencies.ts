import { ClientService } from "../../services/http/ClientService";
import {
  ListeMetierRechercheDependenciesContainer,
  listeMetierRechercherDependenciesContainer,
} from "../infra/configuration/ListeMetierRechercheDependenciesContainer";

export type MetierRechercheDependencies =
  ListeMetierRechercheDependenciesContainer;

export const metierRechercheDependenciesContainer = (
  httpClientService: ClientService
): MetierRechercheDependencies => {
  return {
    ...listeMetierRechercherDependenciesContainer(httpClientService),
  };
};
