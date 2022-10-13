import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ConsulterOffreEmploiUseCase } from '~/server/offresEmploi/useCases/consulterOffreEmploi.useCase';
import { CacheService } from '~/server/services/cache/cache.service';
import {
  HttpClientServiceWithAuthentificationPoleEmploi,
} from '~/server/services/http/httpClientWithAuthentificationPoleEmploi.service';

export interface ConsulterOffreEmploiDependenciesContainer {
  readonly consulterOffreEmploi: ConsulterOffreEmploiUseCase;
}

export const consulterOffreEmploiDependenciesContainer = (
  httpClientServiceWithAuthentification: HttpClientServiceWithAuthentificationPoleEmploi,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  cacheService: CacheService,
): ConsulterOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(httpClientServiceWithAuthentification, apiPoleEmploiRéférentielRepository, cacheService);

  return {
    consulterOffreEmploi: new ConsulterOffreEmploiUseCase(emploiRepository),
  };
};
