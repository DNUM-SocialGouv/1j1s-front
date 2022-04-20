import { LaBonneAlternanceHttpClient } from "../../../services/http/laBonneAlternanceHttpClient.service";
import { ListeMetierRechercheUseCase } from "../../usecases/listeMetierRecherche.useCase";
import { ApiLaBonneAlternanceRepository } from "../repositories/apiLaBonneAlternance.repository";

export type ListeMetierRechercheDependenciesContainer = Readonly<{
  listeMetierRecherche: ListeMetierRechercheUseCase;
}>;

export const listeMetierRechercherDependenciesContainer = (
  laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient
): ListeMetierRechercheDependenciesContainer => {
  const jobEtudiantRepository = new ApiLaBonneAlternanceRepository(
    laBonneAlternanceHttpClient
  );

  return {
    listeMetierRecherche: new ListeMetierRechercheUseCase(jobEtudiantRepository),
  };
};
