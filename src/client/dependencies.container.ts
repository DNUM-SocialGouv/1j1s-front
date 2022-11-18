import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';

import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { ÉtablissementAccompagnementService } from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { FicheMetierService } from '~/client/services/ficheMetier/ficheMetier.service';
import { HttpClientService } from '~/client/services/httpClient.service';
import { LesEntreprisesSEngagentService } from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { LocalisationService } from '~/client/services/localisation.service';
import { LoggerService } from '~/client/services/logger.service';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { OffreService } from '~/client/services/offre/offre.service';

const MAX_LIMITE_STAGES = 100000;
const MARKETING_QUERY_PARAMS = 'xtor'|| 'dclid';

export type Dependency = Dependencies[keyof Dependencies];
export type Dependencies = {
  localisationService: LocalisationService
  ficheMetierService: FicheMetierService
  missionEngagementService: MissionEngagementService
  offreService: OffreService
  rechercheClientService: SearchClient
  demandeDeContactService: DemandeDeContactService
  lesEntreprisesSEngagentService: LesEntreprisesSEngagentService
  établissementAccompagnementService: ÉtablissementAccompagnementService
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
  const établissementAccompagnementService = new ÉtablissementAccompagnementService(httpClientService);

  const meiliSearchBaseUrl = process.env.NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL;
  const meiliSearchApiKey = process.env.NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY;

  if (!meiliSearchApiKey || !meiliSearchBaseUrl) {
    throw new DependencyInitException(
      'rechercheClientService',
      'NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL or NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY environment variable is missing',
    );
  }

  const searchClient = instantMeiliSearch(
    meiliSearchBaseUrl,
    meiliSearchApiKey,
    { keepZeroFacets: true, paginationTotalHits: MAX_LIMITE_STAGES },
  );

  const rechercheClientService: SearchClient = {
    ...searchClient,
    search(requests) {
      if (requests.every(({ params }) => params && params.query?.includes(MARKETING_QUERY_PARAMS))) {
        return Promise.resolve({
          results: requests.map(() => ({
            exhaustiveNbHits: false,
            hits: [],
            hitsPerPage: 0,
            nbHits: 0,
            nbPages: 0,
            page: 0,
            params: '',
            processingTimeMS: 0,
            query: '',
          })),
        });
      }

      return searchClient.search(requests);
    },
  };

  return {
    demandeDeContactService,
    ficheMetierService,
    lesEntreprisesSEngagentService,
    localisationService,
    missionEngagementService,
    offreService,
    rechercheClientService,
    établissementAccompagnementService,
  };
}
