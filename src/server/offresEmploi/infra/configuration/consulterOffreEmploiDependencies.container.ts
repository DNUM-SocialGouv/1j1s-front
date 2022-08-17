import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ConsulterOffreEmploiUseCase } from '~/server/offresEmploi/useCases/consulterOffreEmploi.useCase';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

export interface ConsulterOffreEmploiDependenciesContainer {
  readonly consulterOffreEmploi: ConsulterOffreEmploiUseCase;
};

export const consulterOffreEmploiDependenciesContainer = (
  poleEmploiHttpClientService: HttpClientServiceWithAuthentification,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): ConsulterOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(poleEmploiHttpClientService, apiPoleEmploiRéférentielRepository);

  return {
    consulterOffreEmploi: new ConsulterOffreEmploiUseCase(emploiRepository),
  };
};
