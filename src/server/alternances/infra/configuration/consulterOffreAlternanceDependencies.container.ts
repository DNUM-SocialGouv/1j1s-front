import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { ConsulterOffreAlternanceUseCase } from '~/server/alternances/useCases/consulterOffreAlternance.useCase';
import { ConfigurationService } from '~/server/services/configuration.service';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export interface ConsulterOffreAlternanceDependenciesContainer {
  readonly consulterOffreAlternance: ConsulterOffreAlternanceUseCase;
};

export const consulterOffreAlternanceDependenciesContainer = (
  laBonneAlternanceHttpClient: LaBonneAlternanceHttpClientService,
  configurationService: ConfigurationService,
): ConsulterOffreAlternanceDependenciesContainer => {
  const alternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient, configurationService);

  return {
    consulterOffreAlternance: new ConsulterOffreAlternanceUseCase(alternanceRepository),
  };
};
