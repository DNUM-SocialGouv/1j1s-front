import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ConsulterOffreEmploiUseCase } from '~/server/offresEmploi/useCases/consulterOffreEmploi.useCase';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

export interface ConsulterOffreEmploiDependenciesContainer {
  readonly consulterOffreEmploi: ConsulterOffreEmploiUseCase;
};

export const consulterOffreEmploiDependenciesContainer = (
  httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  cacheService: CacheService,
): ConsulterOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(httpClientServiceWithAuthentification, apiPoleEmploiRéférentielRepository, cacheService);

  return {
    consulterOffreEmploi: new ConsulterOffreEmploiUseCase(emploiRepository),
  };
};
