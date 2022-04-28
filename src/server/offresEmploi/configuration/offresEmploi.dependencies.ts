import {
  ConsulterOffreEmploiDependenciesContainer,
  consulterOffreEmploiDependenciesContainer,
} from '~/server/offresEmploi/infra/configuration/consulterOffreEmploiDependencies.container';
import {
  RechercherOffreEmploiDependenciesContainer,
  rechercherOffreEmploiDependenciesContainer,
} from '~/server/offresEmploi/infra/configuration/rechercherOffreEmploiDependencies.container';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export type OffresEmploiDependencies = ConsulterOffreEmploiDependenciesContainer & RechercherOffreEmploiDependenciesContainer;

export const offresEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
): OffresEmploiDependencies => {
  return {
    ...consulterOffreEmploiDependenciesContainer(poleEmploiHttpClientService),
    ...rechercherOffreEmploiDependenciesContainer(poleEmploiHttpClientService),
  };
};
