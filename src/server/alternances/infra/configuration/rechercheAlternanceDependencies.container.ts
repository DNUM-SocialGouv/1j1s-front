import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercherAlternanceUseCase } from '~/server/alternances/useCases/rechercherAlternance.useCase';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export interface RechercherAlternanceDependenciesContainer {
  rechercherAlternance: RechercherAlternanceUseCase;
}

export function rechercherAlternanceDependenciesContainer (laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient): RechercherAlternanceDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

  return {
    rechercherAlternance: new RechercherAlternanceUseCase(apiLaBonneAlternanceRepository),
  };
}
