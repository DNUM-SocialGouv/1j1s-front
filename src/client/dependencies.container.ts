import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';

import { FicheMetierService } from '~/client/services/ficheMetier/ficheMetier.service';
import { HttpClientService } from '~/client/services/httpClient.service';
import {
  LesEntreprisesSEngagentService,
} from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { LocalisationService } from '~/client/services/localisation.service';
import { LoggerService } from '~/client/services/logger.service';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { OffreService } from '~/client/services/offre/offreService';

import { DemandeDeContactService } from './services/demandeDeContact.service';

const MAX_LIMITE_STAGES = 100000;

export type Dependency = Dependencies[keyof Dependencies];
export type Dependencies = {
  localisationService: LocalisationService
  ficheMetierService: FicheMetierService
  missionEngagementService: MissionEngagementService
  offreService: OffreService
  rechercheClientService: SearchClient
  demandeDeContactService: DemandeDeContactService
  lesEntreprisesSEngagementService: LesEntreprisesSEngagentService
}

class DependencyInitException extends Error {
  constructor(dependencyName: string, reason: string) {
    super(`Cannot init ${dependencyName} dependency, reason: ${reason}`);
  }
}

export default function dependenciesContainer(sessionId: string): Dependencies {
  const loggerService = new LoggerService(sessionId);
  const httpClientService =  new HttpClientService(sessionId, loggerService);
  const offreService = new OffreService(httpClientService);
  const localisationService = new LocalisationService(httpClientService);
  const missionEngagementService = new MissionEngagementService(httpClientService);
  const demandeDeContactService = new DemandeDeContactService(httpClientService);
  const ficheMetierService = new FicheMetierService(httpClientService);
  const lesEntreprisesSEngagentService = new LesEntreprisesSEngagentService(httpClientService);

  const meiliSearchBaseUrl = process.env.NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL;
  const meiliSearchApiKey = process.env.NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY;

  if (!meiliSearchApiKey || !meiliSearchBaseUrl) {
    throw new DependencyInitException(
      'rechercheClientService',
      'NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL or NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY environment variable is missing',
    );
  }

  const rechercheClientService = instantMeiliSearch(
    meiliSearchBaseUrl,
    meiliSearchApiKey,
    { keepZeroFacets: true, paginationTotalHits: MAX_LIMITE_STAGES },
  );

  return {
    demandeDeContactService,
    ficheMetierService,
    lesEntreprisesSEngagentService: lesEntreprisesSEngagentService,
    localisationService,
    missionEngagementService,
    offreService: offreService,
    rechercheClientService,
  };
}
