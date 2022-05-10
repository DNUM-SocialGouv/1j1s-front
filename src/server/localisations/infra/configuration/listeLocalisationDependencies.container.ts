import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { RechercherLocalisationUseCase } from '~/server/localisations/useCases/rechercherLocalisation.useCase';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export interface ListeLocalisationDependenciesContainer {
  readonly listeLocalisation: RechercherLocalisationUseCase;
};

export const listeLocalisationDependenciesContainer = (
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
): ListeLocalisationDependenciesContainer => {
  const localisationRepository = new ApiGeoLocalisationRepository(apiGeoGouvHttpClientService,apiAdresseHttpClientService);

  return {
    listeLocalisation: new RechercherLocalisationUseCase(localisationRepository),
  };
};
