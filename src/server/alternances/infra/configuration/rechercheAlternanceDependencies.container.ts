import {
  ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercherAlternanceUseCase } from '~/server/alternances/useCases/rechercherAlternance.useCase';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface RechercherAlternanceDependenciesContainer {
  rechercherAlternance: RechercherAlternanceUseCase;
}

export function rechercherAlternanceDependenciesContainer(
  httpClientService: HttpClientService,
  cacheService: CacheService,
): RechercherAlternanceDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(httpClientService, cacheService);

  return {
    rechercherAlternance: new RechercherAlternanceUseCase(apiLaBonneAlternanceRepository),
  };
}
