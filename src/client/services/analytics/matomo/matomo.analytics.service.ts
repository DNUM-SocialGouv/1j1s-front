import { PageTags } from '~/client/services/analytics/analytics';
import { CookiesService } from '~/client/services/cookies/cookies.service';

import { AnalyticsService } from '../analytics.service';

export class MatomoAnalyticsService implements AnalyticsService {
	private static MATOMO_SERVICE = 'matomo';
	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.cookiesService.addUser('matomoId', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_SITE_ID);
		this.cookiesService.addUser('matomoHost', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_HOST);
		this.cookiesService.addService(MatomoAnalyticsService.MATOMO_SERVICE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	envoyerAnalyticsPageVue(_tags: PageTags): void {
	}

	isAllowed(): boolean {
		return this.cookiesService.isServiceAllowed(MatomoAnalyticsService.MATOMO_SERVICE);
	}
}
