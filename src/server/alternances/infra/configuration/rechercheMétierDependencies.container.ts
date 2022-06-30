import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercherMétierUseCase } from '~/server/alternances/useCases/rechercherMétierUseCase';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export interface RechercherMétierDependenciesContainer {
  readonly rechercherMétier: RechercherMétierUseCase;
}

export function rechercherMétierDependenciesContainer(
  laBonneAlternanceHttpClient: LaBonneAlternanceHttpClientService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): RechercherMétierDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient, apiPoleEmploiRéférentielRepository);

  return {
    rechercherMétier: new RechercherMétierUseCase(apiLaBonneAlternanceRepository),
  };
}
