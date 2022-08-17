import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { RechercherLocalisationUseCase } from '~/server/localisations/useCases/rechercherLocalisation.useCase';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface ListeLocalisationDependenciesContainer {
  readonly listeLocalisation: RechercherLocalisationUseCase;
}

export const listeLocalisationDependenciesContainer = (
  apiAdresseHttpClientService: HttpClientService,
  apiGeoGouvHttpClientService: HttpClientService,
): ListeLocalisationDependenciesContainer => {
  const localisationRepository = new ApiGeoLocalisationRepository(
    apiGeoGouvHttpClientService,
  );
  const localisationAvecCoordonnéesRepository = new ApiAdresseRepository(apiAdresseHttpClientService);

  return {
    listeLocalisation: new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonnéesRepository),
  };
};
