import { PoleEmploiHttpClientService } from "../../../services/http/poleEmploiHttpClient.service";
import { ListeJobEtudiantUseCase } from "../../usecases/listeJobEtudiant.useCase";
import { ApiPoleEmploiJobEtudiantRepository } from "../repositories/apiPoleEmploiJobEtudiant.repository";

export type ListeJobEtudiantDependenciesContainer = Readonly<{
  listeJobEtudiant: ListeJobEtudiantUseCase;
}>;

export const listeJobEtudiantDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService
): ListeJobEtudiantDependenciesContainer => {
  const jobEtudiantRepository = new ApiPoleEmploiJobEtudiantRepository(
    poleEmploiHttpClientService
  );

  return {
    listeJobEtudiant: new ListeJobEtudiantUseCase(jobEtudiantRepository),
  };
};
