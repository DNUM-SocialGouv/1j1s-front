import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercheMétierUseCase } from '~/server/alternances/useCases/rechercheMétierUseCase';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export interface RechercherMétierDependenciesContainer {
  readonly rechercherMétier: RechercheMétierUseCase;
}

export function rechercherMétierDependenciesContainer (laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient): RechercherMétierDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

  return {
    rechercherMétier: new RechercheMétierUseCase(apiLaBonneAlternanceRepository),
  };
}
