import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercherAlternanceUseCase } from '~/server/alternances/useCases/rechercherAlternance.useCase';
import { ConfigurationService } from '~/server/services/configuration.service';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export interface RechercherAlternanceDependenciesContainer {
  rechercherAlternance: RechercherAlternanceUseCase;
}

export function rechercherAlternanceDependenciesContainer (laBonneAlternanceHttpClient: LaBonneAlternanceHttpClientService, configurationService: ConfigurationService): RechercherAlternanceDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient, configurationService);

  return {
    rechercherAlternance: new RechercherAlternanceUseCase(apiLaBonneAlternanceRepository),
  };
}
