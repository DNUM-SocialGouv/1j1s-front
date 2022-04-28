import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { ListeLocalisationUseCase } from '~/server/localisations/useCases/listeLocalisation.useCase';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export interface ListeLocalisationDependenciesContainer {
  readonly listeLocalisation: ListeLocalisationUseCase;
};

export const listeLocalisationDependenciesContainer = (
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
): ListeLocalisationDependenciesContainer => {
  const localisationRepository = new ApiGeoLocalisationRepository(apiGeoGouvHttpClientService,apiAdresseHttpClientService);

  return {
    listeLocalisation: new ListeLocalisationUseCase(localisationRepository),
  };
};
