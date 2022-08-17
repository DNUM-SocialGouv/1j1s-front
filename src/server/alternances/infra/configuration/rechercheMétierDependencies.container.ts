import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercherMétierUseCase } from '~/server/alternances/useCases/rechercherMétierUseCase';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface RechercherMétierDependenciesContainer {
  readonly rechercherMétier: RechercherMétierUseCase;
}

export function rechercherMétierDependenciesContainer(
  laBonneAlternanceHttpClient: HttpClientService,
): RechercherMétierDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

  return {
    rechercherMétier: new RechercherMétierUseCase(apiLaBonneAlternanceRepository),
  };
}
