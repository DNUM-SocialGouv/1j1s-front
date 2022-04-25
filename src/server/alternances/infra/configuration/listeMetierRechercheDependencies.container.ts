import { ApiLaBonneAlternanceRepository } from "~/server/alternances/infra/repositories/apiLaBonneAlternance.repository";
import { ListeMetierRechercheUseCase } from "~/server/alternances/useCases/listeMetierRecherche.useCase";
import { LaBonneAlternanceHttpClient } from "~/server/services/http/laBonneAlternanceHttpClient.service";

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
    listeMetierRecherche: new ListeMetierRechercheUseCase(
      jobEtudiantRepository
    ),
  };
};
