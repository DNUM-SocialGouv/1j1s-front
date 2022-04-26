import {
  ListeJobEtudiantDependenciesContainer,
  listeJobEtudiantDependenciesContainer,
} from '~/server/jobsEtudiant/infra/configuration/listeJobEtudiantDependencies.container';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export type JobsEtudiantDependencies = ListeJobEtudiantDependenciesContainer;

export const jobsEtudiantDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
): JobsEtudiantDependencies => {
  return {
    ...listeJobEtudiantDependenciesContainer(poleEmploiHttpClientService),
  };
};
