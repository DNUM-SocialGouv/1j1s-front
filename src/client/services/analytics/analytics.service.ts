import { PageTags, SITE_TAGS } from '~/client/services/analytics/analytics';
import { CookiesService } from '~/client/services/cookies/cookies.service';
import { TarteAuCitron } from '~/client/services/cookies/tarteaucitron/tarteaucitron.cookies.service';

declare global {
	interface Window {
		tarteaucitron: TarteAuCitron

		__eaGenericCmpApi(f: unknown): void

		EA_push(tags: 'event' | Array<string>, eventList?: Array<string>): void
	}
}

export interface AnalyticsService {
	envoyerAnalyticsPageVue(tags: PageTags): void;
	isAllowed(): boolean;
}

export class EulerianService implements AnalyticsService {
	private static EULERIAN_ANALYTICS_SERVICE = 'eulerian';
	private readonly pushDatalayer: (datalayer: Array<string>) => void;
	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.pushDatalayer = this.initialiserEulerianAnalytics();
	}

	private initialiserEulerianAnalytics(): (datalayer: Array<string>) => void {
		const fallbackPushDatalayer = () => ({});
		if (!EulerianService.isEulerianAnalyticsActive()) {
			return fallbackPushDatalayer;
		}

		try {
			// Voir https://eulerian.wiki/doku.php?id=fr:modules:collect:gdpr:tarteaucitron
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			type ConfigObject = any;
			const config: TarteAuCitron.ServiceConfig<ConfigObject> = {
				cookies: ['etuix'],
				fallback: function () {
					this.js();
				},
				js: function () {
					'use strict';
					(function (x: ConfigObject, w) {
						if (!x._ld) {
							x._ld = 1;
							const ff = function () {
								if (x._f) {
									x._f('tac', window.tarteaucitron, 1);
								}
							};
							w.__eaGenericCmpApi = function (f) {
								x._f = f;
								ff();
							};
							w.addEventListener('tac.close_alert', ff);
							w.addEventListener('tac.close_panel', ff);
						}
					})(this, window);
				},
				key: EulerianService.EULERIAN_ANALYTICS_SERVICE,
				name: 'Eulerian Analytics',
				needConsent: true,
				type: 'analytic',
				uri: 'https://eulerian.com/vie-privee',
			};
			this.cookiesService.addService(EulerianService.EULERIAN_ANALYTICS_SERVICE, config);
			return window.EA_push;
		} catch (e) {
			return fallbackPushDatalayer;
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
		return this.cookiesService.isServiceAllowed(EulerianService.EULERIAN_ANALYTICS_SERVICE);
	}

	private static isEulerianAnalyticsActive(): boolean {
		return process.env.NEXT_PUBLIC_ANALYTICS_EULERIAN_FEATURE === '1';
	}
}

