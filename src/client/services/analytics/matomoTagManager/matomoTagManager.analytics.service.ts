import { CookiesService } from '~/client/services/cookies/cookies.service';

import { AnalyticsService } from '../analytics.service';

export class MatomoTagManagerAnalyticsService implements AnalyticsService {
	private static MATOMO_TAG_MANAGER_SERVICE = 'matomotm';
	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.cookiesService.addUser('matomotmUrl', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_TAG_MANAGER_CUSTOM_JS_PATH);
		this.cookiesService.addService(MatomoTagManagerAnalyticsService.MATOMO_TAG_MANAGER_SERVICE);
	}

	isAllowed(): boolean {
		return this.cookiesService.isServiceAllowed(MatomoTagManagerAnalyticsService.MATOMO_TAG_MANAGER_SERVICE);
	}
}
