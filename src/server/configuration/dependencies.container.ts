import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';

import {
  AlternanceDependencies,
  alternanceDependenciesContainer,
} from '~/server/alternances/configuration/alternanceDependencies';
import { CmsDependencies, cmsDependenciesContainer } from '~/server/cms/configuration/cmsDependencies.container';
import {
  ContratEngagementJeuneDependencies,
  contratEngagementJeuneDependenciesContainer,
} from '~/server/contrat-engagement-jeune/configuration/contratEngagementJeuneDependencies';
import {
  StrapiDemandeDeContactRepository,
} from '~/server/contrat-engagement-jeune/infra/strapiDemandeDeContact.repository';
import {
  EngagementDependencies,
  engagementDependenciesContainer,
} from '~/server/engagement/configuration/engagementDependencies';
import {
  localisationDependenciesContainer,
  LocalisationsDependencies,
} from '~/server/localisations/configuration/localisations.dependencies';
import {
  OffresEmploiDependencies,
  offresEmploiDependenciesContainer,
} from '~/server/offresEmploi/configuration/offresEmploi.dependencies';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { CacheService } from '~/server/services/cache/cache.service';
import { RedisCacheService } from '~/server/services/cache/redisCache.service';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';
import { ServerConfigurationService } from '~/server/services/serverConfiguration.service';

export type Dependencies = {
  offreEmploiDependencies: OffresEmploiDependencies;
  alternanceDependencies: AlternanceDependencies;
  cmsDependencies: CmsDependencies;
  engagementDependencies: EngagementDependencies;
  localisationDependencies: LocalisationsDependencies;
  contratEngagementJeuneDependencies: ContratEngagementJeuneDependencies
};

export const dependenciesContainer = (): Dependencies => {
  const serverConfigurationService = new ServerConfigurationService();
  let cacheService: CacheService;
  if(process.env.NODE_ENV === 'test') {
    cacheService = new MockedCacheService();
  } else {
    cacheService  = new RedisCacheService(serverConfigurationService);
  }
  const poleEmploiHttpClientService = new PoleEmploiHttpClientService(serverConfigurationService);
  const laBonneAlternanceHttpClient = new LaBonneAlternanceHttpClientService(serverConfigurationService);
  const strapiHttpClientService = new StrapiHttpClientService(serverConfigurationService);
  const apiGeoGouvHttpClientService = new ApiGeoHttpClientService(serverConfigurationService);
  const apiAdresseHttpClientService = new ApiAdresseHttpClientService(serverConfigurationService);
  const apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiHttpClientService, cacheService);
  const apiEngagementHttpClientService = new EngagementHttpClientService(serverConfigurationService);

  const cmsDependencies = cmsDependenciesContainer(strapiHttpClientService);
  const offreEmploiDependencies = offresEmploiDependenciesContainer(poleEmploiHttpClientService, apiPoleEmploiRéférentielRepository);
  const alternanceDependencies = alternanceDependenciesContainer(laBonneAlternanceHttpClient);
  const engagementDependencies = engagementDependenciesContainer(apiEngagementHttpClientService);
  const localisationDependencies = localisationDependenciesContainer(
    apiGeoGouvHttpClientService,
    apiAdresseHttpClientService,
  );
  const contratEngagementJeuneDependencies = contratEngagementJeuneDependenciesContainer(
    new StrapiDemandeDeContactRepository(strapiHttpClientService),
  );

  return {
    alternanceDependencies,
    cmsDependencies,
    contratEngagementJeuneDependencies,
    engagementDependencies,
    localisationDependencies,
    offreEmploiDependencies,
  };
};
