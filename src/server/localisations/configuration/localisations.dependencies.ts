import {
  ListeCommuneDependenciesContainer,
  rechercherCommuneDependenciesContainer,
} from '~/server/localisations/infra/configuration/listCommuneDependencies.container';
import {
  ListeLocalisationDependenciesContainer,
  listeLocalisationDependenciesContainer,
} from '~/server/localisations/infra/configuration/listeLocalisationDependencies.container';
import { HttpClientService } from '~/server/services/http/httpClient.service';


export type LocalisationsDependencies = ListeLocalisationDependenciesContainer & ListeCommuneDependenciesContainer;

export const localisationDependenciesContainer = (
  apiGeoGouvHttpClientService: HttpClientService,
  apiAdresseHttpClientService: HttpClientService,
): LocalisationsDependencies => {
  return {
    ...listeLocalisationDependenciesContainer(apiAdresseHttpClientService, apiGeoGouvHttpClientService),
    ...rechercherCommuneDependenciesContainer(apiAdresseHttpClientService),
  };
};
