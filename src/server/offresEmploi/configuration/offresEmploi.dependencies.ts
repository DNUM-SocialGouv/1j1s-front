import {
  ConsulterOffreEmploiDependenciesContainer,
  consulterOffreEmploiDependenciesContainer,
} from '~/server/offresEmploi/infra/configuration/consulterOffreEmploiDependencies.container';
import {
  RechercherOffreEmploiDependenciesContainer,
  rechercherOffreEmploiDependenciesContainer,
} from '~/server/offresEmploi/infra/configuration/rechercherOffreEmploiDependencies.container';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export type OffresEmploiDependencies = ConsulterOffreEmploiDependenciesContainer
  & RechercherOffreEmploiDependenciesContainer

export const offresEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): OffresEmploiDependencies => {
  return {
    ...consulterOffreEmploiDependenciesContainer(poleEmploiHttpClientService),
    ...rechercherOffreEmploiDependenciesContainer(poleEmploiHttpClientService, apiPoleEmploiRéférentielRepository),
  };
};
