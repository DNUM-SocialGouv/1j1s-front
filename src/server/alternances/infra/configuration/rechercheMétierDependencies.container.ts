import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercherMétierUseCase } from '~/server/alternances/useCases/rechercherMétierUseCase';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export interface RechercherMétierDependenciesContainer {
  readonly rechercherMétier: RechercherMétierUseCase;
}

export function rechercherMétierDependenciesContainer (laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient): RechercherMétierDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

  return {
    rechercherMétier: new RechercherMétierUseCase(apiLaBonneAlternanceRepository),
  };
}
