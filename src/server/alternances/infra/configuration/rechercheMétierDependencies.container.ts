import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercherMétierUseCase } from '~/server/alternances/useCases/rechercherMétierUseCase';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ConfigurationService } from '~/server/services/configuration.service';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export interface RechercherMétierDependenciesContainer {
  readonly rechercherMétier: RechercherMétierUseCase;
}

export function rechercherMétierDependenciesContainer(
  laBonneAlternanceHttpClient: LaBonneAlternanceHttpClientService,
  configurationService: ConfigurationService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): RechercherMétierDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient, configurationService, apiPoleEmploiRéférentielRepository);

  return {
    rechercherMétier: new RechercherMétierUseCase(apiLaBonneAlternanceRepository),
  };
}
