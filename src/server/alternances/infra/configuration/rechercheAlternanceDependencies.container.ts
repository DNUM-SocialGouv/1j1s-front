import {
  ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { RechercherAlternanceUseCase } from '~/server/alternances/useCases/rechercherAlternance.useCase';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface RechercherAlternanceDependenciesContainer {
  rechercherAlternance: RechercherAlternanceUseCase;
}

export function rechercherAlternanceDependenciesContainer(
  laBonneAlternanceHttpClient: HttpClientService,
): RechercherAlternanceDependenciesContainer {
  const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

  return {
    rechercherAlternance: new RechercherAlternanceUseCase(apiLaBonneAlternanceRepository),
  };
}
