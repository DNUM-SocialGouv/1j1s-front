import { CookiesService } from '~/client/services/cookies/cookies.service';
import { TarteAuCitron } from '~/client/services/cookies/tarteaucitron/tarteAuCitron.cookies.service';

import { PageTags, SITE_TAGS } from '../analytics';
import { ManualAnalyticsService } from '../analytics.service';

declare global {
	interface Window {
		tarteaucitron: TarteAuCitron

		__eaGenericCmpApi(f: unknown): void

		EA_push(tags: 'event' | Array<string>, eventList?: Array<string>): void
	}
}

export class EulerianAnalyticsService implements ManualAnalyticsService {
	private static EULERIAN_ANALYTICS_SERVICE = 'eulerian';
	private readonly pushDatalayer: (datalayer: Array<string>) => void;
	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		const fallbackPushDatalayer = () => ({});

		if (!EulerianAnalyticsService.isEulerianAnalyticsActive()) {
			this.pushDatalayer = fallbackPushDatalayer;
		} else {
			this.cookiesService.addUser('eulerianHost', process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN);
			this.cookiesService.addService(EulerianAnalyticsService.EULERIAN_ANALYTICS_SERVICE);
			this.pushDatalayer = window.EA_push;
		}
	}

	public envoyerAnalyticsPageVue(pageTags: PageTags): void {
		if (this.isAllowed()) {
			const datalayer: Array<string> = [];
			Object.entries(SITE_TAGS).forEach(([key, value]) => {
				datalayer.push(key, value);
			});
			Object.entries(pageTags).forEach(([key, value]) => {
				datalayer.push(key, value);
			});
			this.pushDatalayer(datalayer);
		}
	}

	public isAllowed(): boolean {
		return this.cookiesService.isServiceAllowed(EulerianAnalyticsService.EULERIAN_ANALYTICS_SERVICE);
	}

	private static isEulerianAnalyticsActive(): boolean {
		return process.env.NEXT_PUBLIC_ANALYTICS_EULERIAN_FEATURE === '1';
	}
}
