/* eslint-disable  @typescript-eslint/no-explicit-any */

import { PageTags, SITE_TAGS } from '~/client/services/analytics/analytics';
import { CookieService } from '~/client/services/cookies/cookies.service';

declare global {
	interface Window {
		tarteaucitron: any

		__eaGenericCmpApi(f: any): void

		EA_push(tags: 'event' | Array<string>, eventList?: Array<string>): void
	}
}

const EULERIAN_ANALYTICS_SERVICE = 'eulerian';
export class AnalyticsService {
	private readonly pushDatalayer: (datalayer: Array<string>) => void;
	private readonly cookiesService: CookieService;

	constructor(cookiesService: CookieService) {
		this.cookiesService = cookiesService;
		this.pushDatalayer = this.initialiserEulerianAnalytics();
	}

	private initialiserEulerianAnalytics(): (datalayer: Array<string>) => void {
		const fallbackPushDatalayer = () => ({});
		if (!this.isEulerianAnalyticsActive()) {
			return fallbackPushDatalayer;
		}

		try {
			// Voir https://eulerian.wiki/doku.php?id=fr:modules:collect:gdpr:tarteaucitron
			const config = {
				cookies: ['etuix'],
				fallback: function () {
					this.js();
				},
				js: function () {
					'use strict';
					(function (x: any, w) {
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
			};
			this.cookiesService.addCookie(EULERIAN_ANALYTICS_SERVICE, config);
			return window.EA_push;
		} catch (e) {
			return fallbackPushDatalayer;
		}
	}
	envoyerAnalyticsPageVue(pageTags: PageTags): void {
		if (this.cookiesService.isCookieAccepted(EULERIAN_ANALYTICS_SERVICE)) {
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

	private isEulerianAnalyticsActive(): boolean {
		return process.env.NEXT_PUBLIC_ANALYTICS_EULERIAN_FEATURE === '1';
	}
}
