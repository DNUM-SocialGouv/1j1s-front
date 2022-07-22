import {
  ListeCommuneDependenciesContainer,
  rechercherCommuneDependenciesContainer,
} from '~/server/localisations/infra/configuration/listCommuneDependencies.container';
import {
  ListeLocalisationDependenciesContainer,
  listeLocalisationDependenciesContainer,
} from '~/server/localisations/infra/configuration/listeLocalisationDependencies.container';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';


export type LocalisationsDependencies = ListeLocalisationDependenciesContainer & ListeCommuneDependenciesContainer;

export const localisationDependenciesContainer = (
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): LocalisationsDependencies => {
  return {
    ...listeLocalisationDependenciesContainer(apiAdresseHttpClientService, apiGeoGouvHttpClientService, apiPoleEmploiRéférentielRepository),
    ...rechercherCommuneDependenciesContainer(apiAdresseHttpClientService),
  };
};
