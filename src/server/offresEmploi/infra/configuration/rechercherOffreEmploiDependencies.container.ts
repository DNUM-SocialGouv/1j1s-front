import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { RechercherOffreEmploiUseCase } from '~/server/offresEmploi/useCases/rechercherOffreEmploi.useCase';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';


export interface RechercherOffreEmploiDependenciesContainer {
  readonly rechercherOffreEmploi: RechercherOffreEmploiUseCase;
};

export const rechercherOffreEmploiDependenciesContainer = (
  poleEmploiHttpClientService: HttpClientServiceWithAuthentification,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): RechercherOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(poleEmploiHttpClientService, apiPoleEmploiRéférentielRepository);

  return {
    rechercherOffreEmploi: new RechercherOffreEmploiUseCase(emploiRepository),
  };
};
