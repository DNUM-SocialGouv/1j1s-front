import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';

import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { AnalyticsService, DiscreteAdformService, EulerianService } from '~/client/services/analytics/analytics.service';
import { CookiesService, NullCookiesService, TarteAuCitronCookiesService } from '~/client/services/cookies/cookies.service';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import {
	ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
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
import { VideoService, YoutubeService } from '~/client/services/video/video.service';

export type Dependency = Dependencies[keyof Dependencies];
export type Dependencies = {
	alternanceService: AlternanceService
	cookiesService: CookiesService
	analyticsService: AnalyticsService
	demandeDeContactService: DemandeDeContactService
	formationService: FormationService
	lesEntreprisesSEngagentService: LesEntreprisesSEngagentService
	localisationService: LocalisationService
	missionEngagementService: MissionEngagementService
	offreService: OffreService
	rechercheClientService: SearchClient
	stageService: StageService
	métierService: MétierService
	youtubeService: VideoService
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
	const lesEntreprisesSEngagentService = new LesEntreprisesSEngagentService(httpClientService);
	const établissementAccompagnementService = new ÉtablissementAccompagnementService(httpClientService);
	const stageService = new StageService(httpClientService);
	const cookiesService = process.env.NODE_ENV === 'production' && window?.tarteaucitron != undefined
		? new TarteAuCitronCookiesService(window.tarteaucitron)
		: new NullCookiesService();
	const analyticsService = new EulerianService(cookiesService);
	new DiscreteAdformService(cookiesService);
	const youtubeService = new YoutubeService(cookiesService);

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
		cookiesService,
		demandeDeContactService,
		formationService,
		lesEntreprisesSEngagentService,
		localisationService,
		missionEngagementService,
		métierService,
		offreService,
		rechercheClientService,
		stageService,
		youtubeService,
		établissementAccompagnementService,
	};
}
