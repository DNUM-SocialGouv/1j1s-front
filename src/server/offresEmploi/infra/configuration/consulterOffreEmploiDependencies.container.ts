import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ConsulterOffreEmploiUseCase } from '~/server/offresEmploi/useCases/consulterOffreEmploi.useCase';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export interface ConsulterOffreEmploiDependenciesContainer {
  readonly consulterOffreEmploi: ConsulterOffreEmploiUseCase;
};

export const consulterOffreEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): ConsulterOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(poleEmploiHttpClientService, apiPoleEmploiRéférentielRepository);

  return {
    consulterOffreEmploi: new ConsulterOffreEmploiUseCase(emploiRepository),
  };
};
