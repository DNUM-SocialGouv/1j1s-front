import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercherMétierUseCase } from '~/server/alternances/useCases/rechercherMétierUseCase';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface RechercherMétierDependenciesContainer {
  readonly rechercherMétier: RechercherMétierUseCase;
}

export function rechercherMétierDependenciesContainer(
  httpClientService: HttpClientService,
  cacheService: CacheService,
): RechercherMétierDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(httpClientService, cacheService);

  return {
    rechercherMétier: new RechercherMétierUseCase(apiLaBonneAlternanceRepository),
  };
}
