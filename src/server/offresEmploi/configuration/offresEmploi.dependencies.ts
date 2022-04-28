import {
  RechercherOffreEmploiDependenciesContainer,
  rechercherOffreEmploiDependenciesContainer,
} from '~/server/offresEmploi/infra/configuration/rechercherOffreEmploiDependencies.container';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export type OffresEmploiDependencies = RechercherOffreEmploiDependenciesContainer;

export const offresEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
): OffresEmploiDependencies => {
  return {
    ...rechercherOffreEmploiDependenciesContainer(poleEmploiHttpClientService),
  };
};
