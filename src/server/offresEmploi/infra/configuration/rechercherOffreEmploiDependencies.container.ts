import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { RechercherOffreEmploiUseCase } from '~/server/offresEmploi/useCases/rechercherOffreEmploi.useCase';
import { CacheService } from '~/server/services/cache/cache.service';
import {
  HttpClientServiceWithAuthentificationPoleEmploi,
} from '~/server/services/http/httpClientWithAuthentificationPoleEmploi.service';


export interface RechercherOffreEmploiDependenciesContainer {
  readonly rechercherOffreEmploi: RechercherOffreEmploiUseCase;
};

export const rechercherOffreEmploiDependenciesContainer = (
  httpClientServiceWithAuthentification: HttpClientServiceWithAuthentificationPoleEmploi,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  cacheService: CacheService,
): RechercherOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(httpClientServiceWithAuthentification, apiPoleEmploiRéférentielRepository, cacheService);

  return {
    rechercherOffreEmploi: new RechercherOffreEmploiUseCase(emploiRepository),
  };
};
