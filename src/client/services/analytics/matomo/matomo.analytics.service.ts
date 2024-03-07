import { CookiesService } from '~/client/services/cookies/cookies.service';

import { AnalyticsService } from '../analytics.service';

export class MatomoAnalyticsService implements AnalyticsService {
	private static MATOMO_SERVICE = 'matomocloud';
	private static MATOMO_TM = 'matomotm';
	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.cookiesService.addUser('matomotmUrl', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_HOST);

		this.cookiesService.addUser('matomoId', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_SITE_ID);
		this.cookiesService.addUser('matomoHost', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_HOST);
		this.cookiesService.addUser('matomoCustomJSPath', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_CUSTOM_JS_PATH);

		this.cookiesService.addService(MatomoAnalyticsService.MATOMO_TM);
		this.cookiesService.addService(MatomoAnalyticsService.MATOMO_SERVICE);
	}

	isAllowed(): boolean {
		return this.cookiesService.isServiceAllowed(MatomoAnalyticsService.MATOMO_SERVICE);
	}
}
