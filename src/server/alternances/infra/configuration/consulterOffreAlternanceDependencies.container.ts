import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { ConsulterOffreAlternanceUseCase } from '~/server/alternances/useCases/consulterOffreAlternance.useCase';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface ConsulterOffreAlternanceDependenciesContainer {
  readonly consulterOffreAlternance: ConsulterOffreAlternanceUseCase;
};

export const consulterOffreAlternanceDependenciesContainer = (
  laBonneAlternanceHttpClient: HttpClientService,
): ConsulterOffreAlternanceDependenciesContainer => {
  const alternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

  return {
    consulterOffreAlternance: new ConsulterOffreAlternanceUseCase(alternanceRepository),
  };
};
