import {
  ListeCommuneDependenciesContainer,
  rechercherCommuneDependenciesContainer,
} from '~/server/localisations/infra/configuration/listCommuneDependencies.container';
import {
  ListeLocalisationDependenciesContainer,
  listeLocalisationDependenciesContainer,
} from '~/server/localisations/infra/configuration/listeLocalisationDependencies.container';
import {
  LocalisationDependenciesContainer,
  récupérerLocalisationAvecDependenciesContainer,
} from '~/server/localisations/infra/configuration/localisationDependencies.container';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';


export type LocalisationsDependencies = ListeLocalisationDependenciesContainer & LocalisationDependenciesContainer & ListeCommuneDependenciesContainer;

export const localisationDependenciesContainer = (
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): LocalisationsDependencies => {
  return {
    ...listeLocalisationDependenciesContainer(apiAdresseHttpClientService, apiGeoGouvHttpClientService, apiPoleEmploiRéférentielRepository),
    ...récupérerLocalisationAvecDependenciesContainer(apiGeoGouvHttpClientService, apiPoleEmploiRéférentielRepository),
    ...rechercherCommuneDependenciesContainer(apiAdresseHttpClientService),
  };
};
