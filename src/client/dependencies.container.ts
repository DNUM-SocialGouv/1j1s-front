import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';

import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { EulerianAnalyticsService } from '~/client/services/analytics/eulerian/eulerian.analytics.service';
import { CookiesService } from '~/client/services/cookies/cookies.service';
import { NullCookiesService } from '~/client/services/cookies/null/null.cookies.service';
import { TarteAuCitronCookiesService } from '~/client/services/cookies/tarteaucitron/tarteAuCitron.cookies.service';
import { DateService } from '~/client/services/date/date.service';
import { JsDateService } from '~/client/services/date/js/js.date.service';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import {
	ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { FormationService } from '~/client/services/formation/formation.service';
import {
	FormationInitialeInterface,
	FormationInitialeService,
} from '~/client/services/formationInitiale/formationInitiale.service';
import { HttpClientService } from '~/client/services/httpClient.service';
import {
	LesEntreprisesSEngagentService,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagent.service';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { LoggerService } from '~/client/services/logger.service';
import { AdformMarketingService } from '~/client/services/marketing/adform/adform.marketing.service';
import { MarketingService } from '~/client/services/marketing/marketing.service';
import { NullMarketingService } from '~/client/services/marketing/null/null.marketing.service';
import { BffMetierService } from '~/client/services/metiers/bff.metier.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { OffreService } from '~/client/services/offre/offre.service';
import { StageService } from '~/client/services/stage/stage.service';
import { VideoService } from '~/client/services/video/video.service';
import { YoutubeVideoService } from '~/client/services/video/youtube/youtube.video.service';

export type Dependency = Dependencies[keyof Dependencies];
export type Dependencies = {
	alternanceService: AlternanceService
	cookiesService: CookiesService
	analyticsService: AnalyticsService
	demandeDeContactService: DemandeDeContactService
	formationService: FormationService
	formationInitialeService: FormationInitialeInterface
	lesEntreprisesSEngagentService: LesEntreprisesSEngagentService
	localisationService: LocalisationService
	missionEngagementService: MissionEngagementService
	offreService: OffreService
	rechercheClientService: SearchClient
	stageService: StageService
	metierService: MetierService
	youtubeService: VideoService
	établissementAccompagnementService: ÉtablissementAccompagnementService
	marketingService: MarketingService
	dateService: DateService
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
	const metierService = new BffMetierService(httpClientService);
	const formationService = new FormationService(httpClientService);
	const formationInitialeService = new FormationInitialeService(httpClientService);
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
	const analyticsService = new EulerianAnalyticsService(cookiesService);
	const marketingService = process.env.NEXT_PUBLIC_CAMPAGNE_ADFORM_FEATURE === '1'
		? new AdformMarketingService(cookiesService)
		: new NullMarketingService();
	const youtubeService = new YoutubeVideoService(cookiesService);
	const dateService = new JsDateService();

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
		dateService,
		demandeDeContactService,
		formationInitialeService,
		formationService,
		lesEntreprisesSEngagentService,
		localisationService,
		marketingService,
		metierService,
		missionEngagementService,
		offreService,
		rechercheClientService,
		stageService,
		youtubeService,
		établissementAccompagnementService,
	};
}
