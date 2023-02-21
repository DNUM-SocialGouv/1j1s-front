import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';

import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { AnalyticsService } from '~/client/services/analytics/analytics';
import { AnalyticsDevService } from '~/client/services/analytics/analytics.dev.service';
import { AnalyticsProdService } from '~/client/services/analytics/analytics.prod.service';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import {
	ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { FicheMetierService } from '~/client/services/ficheMetier/ficheMetier.service';
import { FormationService } from '~/client/services/formation/formation.service';
import { HttpClientService } from '~/client/services/httpClient.service';
import {
	LesEntreprisesSEngagentService,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagent.service';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { LoggerService } from '~/client/services/logger.service';
import { MétierService } from '~/client/services/métiers/métier.service';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { OffreService } from '~/client/services/offre/offre.service';
import { StageService } from '~/client/services/stage/stage.service';

export type Dependency = Dependencies[keyof Dependencies];
export type Dependencies = {
	alternanceService: AlternanceService
	analyticsService: AnalyticsService
	demandeDeContactService: DemandeDeContactService
	ficheMetierService: FicheMetierService
	formationService: FormationService
	lesEntreprisesSEngagentService: LesEntreprisesSEngagentService
	localisationService: LocalisationService
	missionEngagementService: MissionEngagementService
	offreService: OffreService
	rechercheClientService: SearchClient
	stageService: StageService
	métierService: MétierService
	établissementAccompagnementService: ÉtablissementAccompagnementService
}

class DependencyInitException extends Error {
	constructor(dependencyName: string, reason: string) {
		super(`Cannot init ${dependencyName} dependency, reason: ${reason}`);
	}
}

export default function dependenciesContainer(sessionId: string): Dependencies {
	const loggerService = new LoggerService(sessionId);
	const httpClientService = new HttpClientService(sessionId, loggerService);
	const alternanceService = new AlternanceService(httpClientService);
	const métierService = new MétierService(httpClientService);
	const formationService = new FormationService(httpClientService);
	const offreService = new OffreService(httpClientService);
	const localisationService = new LocalisationService(httpClientService);
	const missionEngagementService = new MissionEngagementService(httpClientService);
	const demandeDeContactService = new DemandeDeContactService(httpClientService);
	const ficheMetierService = new FicheMetierService(httpClientService);
	const lesEntreprisesSEngagentService = new LesEntreprisesSEngagentService(httpClientService);
	const établissementAccompagnementService = new ÉtablissementAccompagnementService(httpClientService);
	const stageService = new StageService(httpClientService);
	const analyticsService = process.env.NODE_ENV === 'production' ? new AnalyticsProdService() : new AnalyticsDevService();

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
		{
			keepZeroFacets: true,
			primaryKey: 'slug',
		},
	);

	return {
		alternanceService,
		analyticsService,
		demandeDeContactService,
		ficheMetierService,
		formationService,
		lesEntreprisesSEngagentService,
		localisationService,
		missionEngagementService,
		métierService,
		offreService,
		rechercheClientService,
		stageService,
		établissementAccompagnementService,
	};
}
