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


export type LocalisationsDependencies = ListeLocalisationDependenciesContainer & LocalisationDependenciesContainer;

export const localisationDependenciesContainer = (
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): LocalisationsDependencies => {
  return {
    ...listeLocalisationDependenciesContainer(apiGeoGouvHttpClientService, apiAdresseHttpClientService, apiPoleEmploiRéférentielRepository),
    ...récupérerLocalisationAvecDependenciesContainer(apiGeoGouvHttpClientService, apiAdresseHttpClientService, apiPoleEmploiRéférentielRepository),
  };
};
