import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { ConsulterOffreAlternanceUseCase } from '~/server/alternances/useCases/consulterOffreAlternance.useCase';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface ConsulterOffreAlternanceDependenciesContainer {
  readonly consulterOffreAlternance: ConsulterOffreAlternanceUseCase;
};

export const consulterOffreAlternanceDependenciesContainer = (
  httpClientService: HttpClientService,
  cacheService : CacheService,
): ConsulterOffreAlternanceDependenciesContainer => {
  const alternanceRepository = new ApiLaBonneAlternanceRepository(httpClientService, cacheService);

  return {
    consulterOffreAlternance: new ConsulterOffreAlternanceUseCase(alternanceRepository),
  };
};
