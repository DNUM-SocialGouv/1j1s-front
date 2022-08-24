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
  EntrepriseDependencies,
  entrepriseDependenciesContainer,
} from '~/server/entreprises/configuration/entrepriseDependencies';
import {
  StrapiRejoindreLaMobilisationRepository,
} from '~/server/entreprises/infra/strapiRejoindreLaMobilisation.repository';
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
import { buildHttpClientConfigList } from '~/server/services/http/httpClientConfig';
import { ServerConfigurationService } from '~/server/services/serverConfiguration.service';

export type Dependencies = {
  offreEmploiDependencies: OffresEmploiDependencies;
  alternanceDependencies: AlternanceDependencies;
  cmsDependencies: CmsDependencies;
  engagementDependencies: EngagementDependencies;
  localisationDependencies: LocalisationsDependencies;
  contratEngagementJeuneDependencies: ContratEngagementJeuneDependencies
  entrepriseDependencies: EntrepriseDependencies
};

export const dependenciesContainer = (): Dependencies => {
  const serverConfigurationService = new ServerConfigurationService();
  let cacheService: CacheService;
  if(process.env.NODE_ENV === 'test') {
    cacheService = new MockedCacheService();
  } else {
    cacheService  = new RedisCacheService(serverConfigurationService);
  }
  
  const {
    engagementClientService,
    laBonneAlternanceClientService,
    strapiClientService,
    poleEmploiClientService,
  } = buildHttpClientConfigList(serverConfigurationService);

  const apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiClientService, cacheService);

  const cmsDependencies = cmsDependenciesContainer(strapiClientService);
  const offreEmploiDependencies = offresEmploiDependenciesContainer(poleEmploiClientService, apiPoleEmploiRéférentielRepository);
  const alternanceDependencies = alternanceDependenciesContainer(laBonneAlternanceClientService);
  const engagementDependencies = engagementDependenciesContainer(engagementClientService);
  const localisationDependencies = localisationDependenciesContainer(serverConfigurationService);
  const contratEngagementJeuneDependencies = contratEngagementJeuneDependenciesContainer(
    new StrapiDemandeDeContactRepository(strapiClientService),
  );
  const entrepriseDependencies = entrepriseDependenciesContainer(
    new StrapiRejoindreLaMobilisationRepository(strapiHttpClientService),
  );

  return {
    alternanceDependencies,
    cmsDependencies,
    contratEngagementJeuneDependencies,
    engagementDependencies,
    entrepriseDependencies,
    localisationDependencies,
    offreEmploiDependencies,
  };
};
