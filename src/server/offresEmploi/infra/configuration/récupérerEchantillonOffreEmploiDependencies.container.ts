import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { RécupérerEchantillonOffreEmploiUseCase } from '~/server/offresEmploi/useCases/récupérerEchantillonOffreEmploi.useCase';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';


export interface RécupérerEchantillonOffreEmploiDependenciesContainer {
  readonly récupérerEchantillonOffreEmploi: RécupérerEchantillonOffreEmploiUseCase
};

export const récupérerEchantillonOffreEmploiDependenciesContainer = (
  httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  cacheService: CacheService,
): RécupérerEchantillonOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(httpClientServiceWithAuthentification, apiPoleEmploiRéférentielRepository, cacheService);

  return {
    récupérerEchantillonOffreEmploi: new RécupérerEchantillonOffreEmploiUseCase(emploiRepository),
  };
};
