import {
  ListeJobÉtudiantDependenciesContainer,
  listeJobÉtudiantDependenciesContainer,
} from '~/server/jobsÉtudiant/infra/configuration/listeJobÉtudiantDependencies.container';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export type JobsÉtudiantDependencies = ListeJobÉtudiantDependenciesContainer;

export const jobsÉtudiantDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
): JobsÉtudiantDependencies => {
  return {
    ...listeJobÉtudiantDependenciesContainer(poleEmploiHttpClientService),
  };
};
