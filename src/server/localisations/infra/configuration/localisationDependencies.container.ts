import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { RécupérerLocalisationAvecCodeInseeUseCase } from '~/server/localisations/useCases/récupérerLocalisationAvecCodeInseeUseCase';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export interface LocalisationDependenciesContainer {
  readonly récupérerLocalisation: RécupérerLocalisationAvecCodeInseeUseCase;
};

export const récupérerLocalisationAvecDependenciesContainer = (
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
): LocalisationDependenciesContainer => {
  const localisationRepository = new ApiGeoLocalisationRepository(apiGeoGouvHttpClientService,apiAdresseHttpClientService);

  return {
    récupérerLocalisation: new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository),
  };
};
