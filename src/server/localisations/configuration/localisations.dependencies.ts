import {
  ListeCommuneDependenciesContainer,
  rechercherCommuneDependenciesContainer,
} from '~/server/localisations/infra/configuration/listCommuneDependencies.container';
import {
  ListeLocalisationDependenciesContainer,
  listeLocalisationDependenciesContainer,
} from '~/server/localisations/infra/configuration/listeLocalisationDependencies.container';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';


export type LocalisationsDependencies = ListeLocalisationDependenciesContainer & ListeCommuneDependenciesContainer;

export const localisationDependenciesContainer = (
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
): LocalisationsDependencies => {
  return {
    ...listeLocalisationDependenciesContainer(apiAdresseHttpClientService, apiGeoGouvHttpClientService),
    ...rechercherCommuneDependenciesContainer(apiAdresseHttpClientService),
  };
};
