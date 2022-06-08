import {
  AlternanceDependencies,
  alternanceDependenciesContainer,
} from '~/server/alternances/configuration/alternanceDependencies';
import {
  localisationDependenciesContainer,
  LocalisationsDependencies,
} from '~/server/localisations/configuration/localisations.dependencies';
import {
  OffresEmploiDependencies,
  offresEmploiDependenciesContainer,
} from '~/server/offresEmploi/configuration/offresEmploi.dependencies';
import { StrapiCmsService } from '~/server/services/cms/infra/repositories/strapiCms.service';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';
import { ServerConfigurationService } from '~/server/services/serverConfiguration.service';

export type Dependencies = {
  offreEmploiDependencies: OffresEmploiDependencies;
  alternanceDependencies: AlternanceDependencies;
  cmsDependencies: StrapiCmsService;
  localisationDependencies: LocalisationsDependencies;
};

export const dependenciesContainer = (): Dependencies => {
  const serverConfigurationService = new ServerConfigurationService();
  const poleEmploiHttpClientService = new PoleEmploiHttpClientService(serverConfigurationService);
  const laBonneAlternanceHttpClient = new LaBonneAlternanceHttpClient(serverConfigurationService);
  const strapiHttpClientService = new StrapiHttpClientService(serverConfigurationService);
  const apiGeoGouvHttpClientService = new ApiGeoHttpClientService(serverConfigurationService);
  const apiAdresseHttpClientService = new ApiAdresseHttpClientService(serverConfigurationService);

  const offreEmploiDependencies = offresEmploiDependenciesContainer(poleEmploiHttpClientService);
  const alternanceDependencies = alternanceDependenciesContainer(laBonneAlternanceHttpClient);
  const localisationDependencies = localisationDependenciesContainer(
    apiGeoGouvHttpClientService,
    apiAdresseHttpClientService,
  );

  return {
    alternanceDependencies,
    cmsDependencies: new StrapiCmsService(
      strapiHttpClientService,
      serverConfigurationService,
    ),
    localisationDependencies,
    offreEmploiDependencies,
  };
};
