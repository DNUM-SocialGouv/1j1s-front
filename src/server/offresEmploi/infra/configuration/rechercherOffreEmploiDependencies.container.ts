import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { RechercherOffreEmploiUseCase } from '~/server/offresEmploi/useCases/rechercherOffreEmploi.useCase';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

export interface RechercherOffreEmploiDependenciesContainer {
  readonly rechercherOffreEmploi: RechercherOffreEmploiUseCase;
};

export const rechercherOffreEmploiDependenciesContainer = (
  httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  cacheService: CacheService,
): RechercherOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(httpClientServiceWithAuthentification, apiPoleEmploiRéférentielRepository, cacheService);

  return {
    rechercherOffreEmploi: new RechercherOffreEmploiUseCase(emploiRepository),
  };
};
