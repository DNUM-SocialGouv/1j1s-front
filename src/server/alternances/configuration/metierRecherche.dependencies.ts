import { LaBonneAlternanceHttpClient } from "../../services/http/laBonneAlternanceHttpClient.service";
import {
  ListeMetierRechercheDependenciesContainer,
  listeMetierRechercherDependenciesContainer,
} from "../infra/configuration/listeMetierRechercheDependencies.container";

export type MetierRechercheDependencies =
  ListeMetierRechercheDependenciesContainer;

export const metierRechercheDependenciesContainer = (
  laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient
): MetierRechercheDependencies => {
  return {
    ...listeMetierRechercherDependenciesContainer(laBonneAlternanceHttpClient),
  };
};
