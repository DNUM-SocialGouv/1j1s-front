import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import singletonRouter from 'next/router';
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs';

import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { ManualAnalyticsService } from '~/client/services/analytics/analytics.service';
import { EulerianAnalyticsService } from '~/client/services/analytics/eulerian/eulerian.analytics.service';
import { MatomoAnalyticsService } from '~/client/services/analytics/matomo/matomo.analytics.service';
import { CookiesService } from '~/client/services/cookies/cookies.service';
import { NullCookiesService } from '~/client/services/cookies/null/null.cookies.service';
import { TarteAuCitronCookiesService } from '~/client/services/cookies/tarteaucitron/tarteAuCitron.cookies.service';
import { DateService } from '~/client/services/date/date.service';
import { JsDateService } from '~/client/services/date/js/js.date.service';
import { BffDemandeDeContactService } from '~/client/services/demandeDeContact/bff.demandeDeContact.service';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import {
	ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { BffEmploiEuropeService } from '~/client/services/europe/bff.emploiEurope.service';
import { EmploiEuropeService } from '~/client/services/europe/emploiEurope.service';
import { FormationService } from '~/client/services/formation/formation.service';
import {
	FormationInitialeInterface,
	FormationInitialeService,
} from '~/client/services/formationInitiale/formationInitiale.service';
import { HttpClientService } from '~/client/services/httpClient.service';
import {
	LesEntreprisesSEngagentService,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagent.service';
import { BffLocalisationService } from '~/client/services/localisation/bff.localisation.service';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { LoggerService } from '~/client/services/logger.service';
import { AdformMarketingService } from '~/client/services/marketing/adform/adform.marketing.service';
import { MarketingService } from '~/client/services/marketing/marketing.service';
import { NullMarketingService } from '~/client/services/marketing/null/null.marketing.service';
import { BffAlternanceMetierService } from '~/client/services/metiers/bff.alternance.metier.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { RoutingService } from '~/client/services/routing/routing.service';
import { BffStageService } from '~/client/services/stage/bff.stage.service';
import { StageService } from '~/client/services/stage/stage.service';
import { BffStage3emeEt2ndService } from '~/client/services/stage3emeEt2nd/bff.stage3emeEt2nd.service';
import {
	BffStage3emeEt2ndMetierService,
} from '~/client/services/stage3emeEt2nd/metier/bff.stage3emeEt2ndMetier.service';
import { Stage3emeEt2ndService } from '~/client/services/stage3emeEt2nd/stage3emeEt2nd.service';
import { VideoService } from '~/client/services/video/video.service';
import { YoutubeVideoService } from '~/client/services/video/youtube/youtube.video.service';

export type Dependency = Dependencies[keyof Dependencies];
export type Dependencies = {
	alternanceService: AlternanceService
	cookiesService: CookiesService
	analyticsService: ManualAnalyticsService
	demandeDeContactService: DemandeDeContactService
	formationService: FormationService
	formationInitialeService: FormationInitialeInterface
	lesEntreprisesSEngagentService: LesEntreprisesSEngagentService
	localisationService: LocalisationService
	metierLbaService: MetierService
	metierStage3emeEt2ndService: MetierService
	missionEngagementService: MissionEngagementService
	rechercheClientService: SearchClient
	routingService: RoutingService
	stageService: StageService
	youtubeService: VideoService
	établissementAccompagnementService: ÉtablissementAccompagnementService
	marketingService: MarketingService
	dateService: DateService
	emploiEuropeService: EmploiEuropeService
	stage3emeEt2ndService: Stage3emeEt2ndService
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
	const metierLbaService = new BffAlternanceMetierService(httpClientService);
	const metierStage3emeEt2ndService = new BffStage3emeEt2ndMetierService(httpClientService);
	const formationService = new FormationService(httpClientService);
	const formationInitialeService = new FormationInitialeService(httpClientService);
	const localisationService = new BffLocalisationService(httpClientService);
	const missionEngagementService = new MissionEngagementService(httpClientService);
	const demandeDeContactService = new BffDemandeDeContactService(httpClientService);
	const lesEntreprisesSEngagentService = new LesEntreprisesSEngagentService(httpClientService);
	const établissementAccompagnementService = new ÉtablissementAccompagnementService(httpClientService);
	const emploiEuropeService = new BffEmploiEuropeService(httpClientService);
	const stageService = new BffStageService(httpClientService);
	const cookiesService = process.env.NODE_ENV === 'production' && window?.tarteaucitron != undefined
		? new TarteAuCitronCookiesService(window.tarteaucitron)
		: new NullCookiesService();
	const marketingService = process.env.NEXT_PUBLIC_CAMPAGNE_ADFORM_FEATURE === '1'
		? new AdformMarketingService(cookiesService)
		: new NullMarketingService();

	if (process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_FEATURE === '1') {
		new MatomoAnalyticsService(cookiesService);
	}
	const analyticsService = new EulerianAnalyticsService(cookiesService);

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
	const instantMeiliSearchObject  = instantMeiliSearch(
		meiliSearchBaseUrl,
		meiliSearchApiKey,
		{
			keepZeroFacets: true,
			primaryKey: 'slug',
		},
	);
	const rechercheClientService = instantMeiliSearchObject.searchClient;

	const stage3emeEt2ndService = new BffStage3emeEt2ndService(httpClientService);

	const routingService = new RoutingService(createInstantSearchRouterNext({ singletonRouter }));

	return {
		alternanceService,
		analyticsService,
		cookiesService,
		dateService,
		demandeDeContactService,
		emploiEuropeService,
		formationInitialeService,
		formationService,
		lesEntreprisesSEngagentService,
		localisationService,
		marketingService,
		metierLbaService,
		metierStage3emeEt2ndService,
		missionEngagementService,
		rechercheClientService,
		routingService,
		stage3emeEt2ndService,
		stageService,
		youtubeService,
		établissementAccompagnementService,
	};
}
