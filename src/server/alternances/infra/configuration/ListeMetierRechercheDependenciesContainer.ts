import { HttpClientService } from "../../../services/http/HttpClientService";
import { ListeMetierRecherche } from "../../usecases/ListeMetierRecherche";
import { ApiLaBonneAlternanceRepository } from "../repositories/ApiLaBonneAlternanceRepository";

export type ListeMetierRechercheDependenciesContainer = Readonly<{
  listeMetierRecherche: ListeMetierRecherche;
}>;

export const listeMetierRechercherDependenciesContainer = (
  httpClientService: HttpClientService
): ListeMetierRechercheDependenciesContainer => {
  const jobEtudiantRepository = new ApiLaBonneAlternanceRepository(
    httpClientService
  );

  return {
    listeMetierRecherche: new ListeMetierRecherche(jobEtudiantRepository),
  };
};
