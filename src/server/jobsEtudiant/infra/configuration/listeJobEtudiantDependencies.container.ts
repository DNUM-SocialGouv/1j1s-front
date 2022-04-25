import { ApiPoleEmploiJobEtudiantRepository } from "~/server/jobsEtudiant/infra/repositories/apiPoleEmploiJobEtudiant.repository";
import { ListeJobEtudiantUseCase } from "~/server/jobsEtudiant/useCases/listeJobEtudiant.useCase";
import { PoleEmploiHttpClientService } from "~/server/services/http/poleEmploiHttpClient.service";

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
