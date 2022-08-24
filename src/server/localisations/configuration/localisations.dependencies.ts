import {
  ListeCommuneDependenciesContainer,
  rechercherCommuneDependenciesContainer,
} from '~/server/localisations/infra/configuration/listCommuneDependencies.container';
import {
  ListeLocalisationDependenciesContainer,
  listeLocalisationDependenciesContainer,
} from '~/server/localisations/infra/configuration/listeLocalisationDependencies.container';
import { ConfigurationService } from '~/server/services/configuration.service';
import { buildHttpClientConfigList } from '~/server/services/http/httpClientConfig';

export type LocalisationsDependencies = ListeLocalisationDependenciesContainer & ListeCommuneDependenciesContainer;

export const localisationDependenciesContainer = (
  configurationService: ConfigurationService,
): LocalisationsDependencies => {
  const { adresseClientService } = buildHttpClientConfigList(configurationService);
  return {
    ...listeLocalisationDependenciesContainer(configurationService),
    ...rechercherCommuneDependenciesContainer(adresseClientService),
  };
};
