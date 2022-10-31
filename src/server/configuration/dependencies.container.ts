import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';
import { MeiliSearch } from 'meilisearch';

import {
  ApiPoleEmploiAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiPoleEmploiAlternance.repository';
import { ConsulterOffreAlternanceUseCase } from '~/server/alternances/useCases/consulterOffreAlternance.useCase';
import { RechercherAlternanceUseCase } from '~/server/alternances/useCases/rechercherAlternance.useCase';
import { CmsDependencies, cmsDependenciesContainer } from '~/server/cms/configuration/cmsDependencies.container';
import {
  DemandeDeContactDependencies,
  demandeDeContactDependenciesContainer,
} from '~/server/demande-de-contact/configuration/demandeDeContactDependencies';
import { StrapiDemandeDeContactRepository } from '~/server/demande-de-contact/infra/strapiDemandeDeContact.repository';
import { ApiPoleEmploiOffreRepository } from '~/server/emplois/infra/repositories/apiPoleEmploiOffre.repository';
import { ConsulterOffreEmploiUseCase } from '~/server/emplois/useCases/consulterOffreEmploi.useCase';
import { RechercherOffreEmploiUseCase } from '~/server/emplois/useCases/rechercherOffreEmploi.useCase';
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
  FicheMetierDependencies,
  ficheMetierDependenciesContainer,
} from '~/server/fiche-metier/configuration/ficheMetier.dependencies';
import {
  ApiPoleEmploiJobÉtudiantRepository,
} from '~/server/jobs-étudiants/infra/repositories/apiPoleEmploiJobÉtudiantRepository';
import { ConsulterOffreJobÉtudiantUseCase } from '~/server/jobs-étudiants/useCases/consulterOffreJobÉtudiantUseCase';
import { RechercherOffreJobÉtudiantUseCase } from '~/server/jobs-étudiants/useCases/rechercherOffreJobÉtudiantUseCase';
import {
  localisationDependenciesContainer,
  LocalisationsDependencies,
} from '~/server/localisations/configuration/localisations.dependencies';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiRéférentiel.repository';
import {
  PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { CacheService } from '~/server/services/cache/cache.service';
import { RedisCacheService } from '~/server/services/cache/redisCache.service';
import { buildHttpClientConfigList } from '~/server/services/http/httpClientConfig';
import { ServerConfigurationService } from '~/server/services/serverConfiguration.service';

import { ApiRejoindreLaMobilisationRepository } from '../entreprises/infra/ApiRejoindreLaMobilisation.repository';

export type Dependencies = {
  offreEmploiDependencies: OffresEmploiDependencies;
  cmsDependencies: CmsDependencies;
  engagementDependencies: EngagementDependencies;
  fichesMetierDependencies: FicheMetierDependencies;
  localisationDependencies: LocalisationsDependencies;
  demandeDeContactDependencies: DemandeDeContactDependencies
  entrepriseDependencies: EntrepriseDependencies
  offreJobÉtudiantDependencies: OffresJobÉtudiantDependencies
  offreAlternanceDependencies: OffresAlternanceDependencies
};

export interface OffresEmploiDependencies {
  consulterOffreEmploi: ConsulterOffreEmploiUseCase
  rechercherOffreEmploi: RechercherOffreEmploiUseCase
}

export interface OffresJobÉtudiantDependencies {
  consulterOffreJobÉtudiant: ConsulterOffreJobÉtudiantUseCase
  rechercherOffreJobÉtudiant: RechercherOffreJobÉtudiantUseCase
}

export interface OffresAlternanceDependencies {
  consulterOffreAlternance: ConsulterOffreAlternanceUseCase
  rechercherOffreAlternance: RechercherAlternanceUseCase
}

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
    lesEntreprisesSEngagentClientService,
    poleEmploiOffresClientService,
    poleEmploiReferentielsClientService,
    strapiAuthClientService,
    strapiClientService,
  } = buildHttpClientConfigList(serverConfigurationService);


  const { NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY, NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL } = serverConfigurationService.getConfiguration();
  const meiliSearchClient = new MeiliSearch({ apiKey: NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY, host: NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL });

  const cmsDependencies = cmsDependenciesContainer(strapiClientService, serverConfigurationService);
  
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

  const apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiReferentielsClientService, cacheService);
  const poleEmploiParamètreBuilderService = new PoleEmploiParamètreBuilderService(apiPoleEmploiRéférentielRepository);
  const apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(poleEmploiOffresClientService, poleEmploiParamètreBuilderService, cacheService);
  const offreEmploiDependencies: OffresEmploiDependencies = {
    consulterOffreEmploi: new ConsulterOffreEmploiUseCase(apiPoleEmploiOffreRepository),
    rechercherOffreEmploi: new RechercherOffreEmploiUseCase(apiPoleEmploiOffreRepository),
  };

  const apiPoleEmploiJobÉtudiantOffreRepository = new ApiPoleEmploiJobÉtudiantRepository(poleEmploiOffresClientService, poleEmploiParamètreBuilderService, cacheService);
  const offreJobÉtudiantDependencies: OffresJobÉtudiantDependencies = {
    consulterOffreJobÉtudiant: new ConsulterOffreJobÉtudiantUseCase(apiPoleEmploiJobÉtudiantOffreRepository),
    rechercherOffreJobÉtudiant: new RechercherOffreJobÉtudiantUseCase(apiPoleEmploiJobÉtudiantOffreRepository),
  };
  
  const apiPoleEmploiAlternanceRepository = new ApiPoleEmploiAlternanceRepository(poleEmploiOffresClientService, poleEmploiParamètreBuilderService, cacheService);
  const offreAlternanceDependencies: OffresAlternanceDependencies = {
    consulterOffreAlternance: new ConsulterOffreAlternanceUseCase(apiPoleEmploiAlternanceRepository),
    rechercherOffreAlternance: new RechercherAlternanceUseCase(apiPoleEmploiAlternanceRepository),
  };
  
  

  return {
    cmsDependencies,
    demandeDeContactDependencies,
    engagementDependencies,
    entrepriseDependencies,
    fichesMetierDependencies,
    localisationDependencies,
    offreAlternanceDependencies,
    offreEmploiDependencies,
    offreJobÉtudiantDependencies: offreJobÉtudiantDependencies,
  };
};
