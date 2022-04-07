import { ClientService } from "../../../services/http/ClientService";
import { ListeMetierRecherche } from "../../usecases/ListeMetierRecherche";
import { ApiLaBonneAlternanceRepository } from "../repositories/ApiLaBonneAlternanceRepository";

export type ListeMetierRechercheDependenciesContainer = Readonly<{
  listeMetierRecherche: ListeMetierRecherche;
}>;

export const listeMetierRechercherDependenciesContainer = (
  httpClientService: ClientService
): ListeMetierRechercheDependenciesContainer => {
  const jobEtudiantRepository = new ApiLaBonneAlternanceRepository(
    httpClientService
  );

  return {
    listeMetierRecherche: new ListeMetierRecherche(jobEtudiantRepository),
  };
};
