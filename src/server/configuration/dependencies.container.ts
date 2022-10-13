import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';
import { MeiliSearch } from 'meilisearch';

import {
  AlternanceDependencies,
  alternanceDependenciesContainer,
} from '~/server/alternances/configuration/alternanceDependencies';
import { CmsDependencies, cmsDependenciesContainer } from '~/server/cms/configuration/cmsDependencies.container';
import {
  DemandeDeContactDependencies,
  demandeDeContactDependenciesContainer,
} from '~/server/demande-de-contact/configuration/demandeDeContactDependencies';
import {
  StrapiDemandeDeContactRepository,
} from '~/server/demande-de-contact/infra/strapiDemandeDeContact.repository';
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
import { FicheMetierDependencies, ficheMetierDependenciesContainer } from '~/server/fiche-metier/configuration/ficheMetier.dependencies';
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
import {
  HttpClientServiceWithAuthentificationPoleEmploi,
} from '~/server/services/http/httpClientWithAuthentificationPoleEmploi.service';
import { ServerConfigurationService } from '~/server/services/serverConfiguration.service';

import { ApiRejoindreLaMobilisationRepository } from '../entreprises/infra/ApiRejoindreLaMobilisation.repository';

export type Dependencies = {
  offreEmploiDependencies: OffresEmploiDependencies;
  alternanceDependencies: AlternanceDependencies;
  cmsDependencies: CmsDependencies;
  engagementDependencies: EngagementDependencies;
  fichesMetierDependencies: FicheMetierDependencies;
  localisationDependencies: LocalisationsDependencies;
  demandeDeContactDependencies: DemandeDeContactDependencies
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
    strapiAuthClientService,
    lesEntreprisesSEngagentClientService,
  } = buildHttpClientConfigList(serverConfigurationService);


  const { NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY, NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL } = serverConfigurationService.getConfiguration();
  const meiliSearchClient = new MeiliSearch({ apiKey: NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY, host: NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL });

  const httpClientPoleEmploiBase = new HttpClientServiceWithAuthentificationPoleEmploi(serverConfigurationService, serverConfigurationService.getConfiguration().API_POLE_EMPLOI_OFFRES_URL);
  const httpClientPoleEmploiRéférentiel = new HttpClientServiceWithAuthentificationPoleEmploi(serverConfigurationService, serverConfigurationService.getConfiguration().API_POLE_EMPLOI_REFERENTIEL_URL);
  const apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(httpClientPoleEmploiRéférentiel, cacheService);

  const cmsDependencies = cmsDependenciesContainer(strapiClientService, serverConfigurationService);
  const offreEmploiDependencies = offresEmploiDependenciesContainer(httpClientPoleEmploiBase, apiPoleEmploiRéférentielRepository, cacheService);
  const alternanceDependencies = alternanceDependenciesContainer(laBonneAlternanceClientService, cacheService);
  const engagementDependencies = engagementDependenciesContainer(engagementClientService);
  const localisationDependencies = localisationDependenciesContainer(serverConfigurationService);
  const demandeDeContactDependencies = demandeDeContactDependenciesContainer(
    new StrapiDemandeDeContactRepository(strapiAuthClientService),
  );
  const entrepriseDependencies = entrepriseDependenciesContainer(
    new ApiRejoindreLaMobilisationRepository(lesEntreprisesSEngagentClientService),
    new StrapiRejoindreLaMobilisationRepository(strapiAuthClientService),
  );
  const fichesMetierDependencies = ficheMetierDependenciesContainer(meiliSearchClient);

  return {
    alternanceDependencies,
    cmsDependencies,
    demandeDeContactDependencies,
    engagementDependencies,
    entrepriseDependencies,
    fichesMetierDependencies,
    localisationDependencies,
    offreEmploiDependencies,
  };
};
