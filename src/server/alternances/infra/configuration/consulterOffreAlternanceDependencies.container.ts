import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { ConsulterOffreAlternanceUseCase } from '~/server/alternances/useCases/consulterOffreAlternance.useCase';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export interface ConsulterOffreAlternanceDependenciesContainer {
  readonly consulterOffreAlternance: ConsulterOffreAlternanceUseCase;
};

export const consulterOffreAlternanceDependenciesContainer = (
  laBonneAlternanceHttpClient: LaBonneAlternanceHttpClientService,
): ConsulterOffreAlternanceDependenciesContainer => {
  const alternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

  return {
    consulterOffreAlternance: new ConsulterOffreAlternanceUseCase(alternanceRepository),
  };
};
