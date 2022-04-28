import {
  ListeLocalisationDependenciesContainer,
  listeLocalisationDependenciesContainer,
} from '~/server/localisations/infra/configuration/listeLocalisationDependencies.container';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export type LocalisationsDependencies = ListeLocalisationDependenciesContainer;

export const localisationDependenciesContainer = (
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
): LocalisationsDependencies => {
  return {
    ...listeLocalisationDependenciesContainer(apiGeoGouvHttpClientService, apiAdresseHttpClientService),
  };
};
