import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';

import {
  AlternanceDependencies,
  alternanceDependenciesContainer,
} from '~/server/alternances/configuration/alternanceDependencies';
import {
  ArticleDependencies,
  articleDependenciesContainer,
} from '~/server/articles/configuration/articleDependencies.container';
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
import { StrapiCmsService } from '~/server/services/cms/infra/repositories/strapiCms.service';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';
import { ServerConfigurationService } from '~/server/services/serverConfiguration.service';

export type Dependencies = {
  articleDependencies: ArticleDependencies;
  offreEmploiDependencies: OffresEmploiDependencies;
  alternanceDependencies: AlternanceDependencies;
  cmsDependencies: StrapiCmsService;
  engagementDependencies: EngagementDependencies;
  localisationDependencies: LocalisationsDependencies;
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

  const articleDependencies = articleDependenciesContainer(strapiHttpClientService);
  const offreEmploiDependencies = offresEmploiDependenciesContainer(poleEmploiHttpClientService, apiPoleEmploiRéférentielRepository);
  const alternanceDependencies = alternanceDependenciesContainer(laBonneAlternanceHttpClient);
  const engagementDependencies = engagementDependenciesContainer(apiEngagementHttpClientService);
  const localisationDependencies = localisationDependenciesContainer(
    apiGeoGouvHttpClientService,
    apiAdresseHttpClientService,
    apiPoleEmploiRéférentielRepository,
  );

  return {
    alternanceDependencies,
    articleDependencies,
    cmsDependencies: new StrapiCmsService(
      strapiHttpClientService,
      serverConfigurationService,
    ),
    engagementDependencies,
    localisationDependencies,
    offreEmploiDependencies,
  };
};
