import { PageTags } from '~/client/services/analytics/analytics';
import { CookiesService } from '~/client/services/cookies/cookies.service';

import { AnalyticsService } from '../analytics.service';

declare global {
	interface Window {
		_paq: {
			push(args: [string, ...unknown[]]): void
		}
	}
}

export class MatomoAnalyticsService implements AnalyticsService {
	private static MATOMO_SERVICE = 'matomocloud';
	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.cookiesService.addUser('matomoId', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_SITE_ID);
		this.cookiesService.addUser('matomoHost', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_HOST);
		this.cookiesService.addUser('matomoCustomJSPath', process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_CUSTOM_JS_PATH);
		this.cookiesService.addService(MatomoAnalyticsService.MATOMO_SERVICE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	envoyerAnalyticsPageVue(_tags: PageTags): void {
		(window as Window)._paq.push(['trackPageView']);
	}

	isAllowed(): boolean {
		return this.cookiesService.isServiceAllowed(MatomoAnalyticsService.MATOMO_SERVICE);
	}
}
