import { ApiPoleEmploiJobÉtudiantRepository } from '~/server/jobsÉtudiant/infra/repositories/apiPoleEmploiJobÉtudiant.repository';
import { ListeJobÉtudiantUseCase } from '~/server/jobsÉtudiant/useCases/listeJobÉtudiant.useCase';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export interface ListeJobÉtudiantDependenciesContainer {
  readonly listeJobÉtudiant: ListeJobÉtudiantUseCase;
};

export const listeJobÉtudiantDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
): ListeJobÉtudiantDependenciesContainer => {
  const jobÉtudiantRepository = new ApiPoleEmploiJobÉtudiantRepository(poleEmploiHttpClientService);

  return {
    listeJobÉtudiant: new ListeJobÉtudiantUseCase(jobÉtudiantRepository),
  };
};
