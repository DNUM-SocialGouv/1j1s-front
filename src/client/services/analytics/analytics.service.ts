/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PageTags, SITE_TAGS } from '~/client/services/analytics/analytics';
import {
	CookiesService,
	TarteAuCitron,
} from '~/client/services/cookies/cookies.service';

declare global {
	interface Window {
		tarteaucitron: any

		__eaGenericCmpApi(f: any): void

		EA_push(tags: 'event' | Array<string>, eventList?: Array<string>): void
	}
}

const CONSENT_MANAGER_COOKIE_NAME = 'consentement';
const EULERIAN_ANALYTICS_SERVICE = 'eulerian';
const ADFORM_SERVICE = 'adform';
export const YOUTUBE_SERVICE = 'youtube';

export class AnalyticsService {
	private readonly pushDatalayer: (datalayer: Array<string>) => void;
	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.pushDatalayer = this.initialiserEulerianAnalytics();

		this.initialiserAnalyticsCampagneDeCommunication();
		this.initialiserYoutube();
	}

	// TODO à supprimer après la campagne autour de l'apprentissage
	private initialiserAnalyticsCampagneDeCommunication(): void {
		if (window && window.tarteaucitron) {

			window.tarteaucitron.user.adformpm = 2867419;
			if (window.location.pathname === '/choisir-apprentissage') {
				window.tarteaucitron.user.adformpagename = '2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage';
			} else {
				window.tarteaucitron.user.adformpagename = undefined;
			}

			window.tarteaucitron.job.push(ADFORM_SERVICE);
		}

	}

	private initialiserEulerianAnalytics(): (datalayer: Array<string>) => void {
		const fallbackPushDatalayer = () => ({});
		if (!this.isEulerianAnalyticsActive()) {
			return fallbackPushDatalayer;
		}

		try {
			// Voir https://eulerian.wiki/doku.php?id=fr:modules:collect:gdpr:tarteaucitron
			const config: TarteAuCitron.ServiceConfig<any> = {
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
				key: EULERIAN_ANALYTICS_SERVICE,
				name: 'Eulerian Analytics (test)',
				needConsent: true,
				type: 'analytic',
				uri: 'https://eulerian.com/vie-privee',
			};
			this.cookiesService.addService(EULERIAN_ANALYTICS_SERVICE, config);
			return window.EA_push;
		} catch (e) {
			return fallbackPushDatalayer;
		}
	}

	public envoyerAnalyticsPageVue(pageTags: PageTags): void {
		if (this.isAnalyticsAutorisé()) {
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

	public isAnalyticsAutorisé(): boolean {
		return this.isConsentementCookieAutorisé(EULERIAN_ANALYTICS_SERVICE);
	}

	private isEulerianAnalyticsActive(): boolean {
		return process.env.NEXT_PUBLIC_ANALYTICS_EULERIAN_FEATURE === '1';
	}

	public isConsentementCookieAutorisé(service: string): boolean {
		const filteredConsentementCookieParts = document.cookie.match(new RegExp('(^| )' + CONSENT_MANAGER_COOKIE_NAME + '=([^;]+)'));
		if (filteredConsentementCookieParts) {
			const consentementCookieValue: string = filteredConsentementCookieParts[2];
			return consentementCookieValue?.split('!')
				?.reduce((consentements: Record<string, unknown>, consentementCourant: string) => {
					const [key, value]: string[] = consentementCourant.split('=');
					return { ...consentements, [key]: value !== 'false' };
				}, {})?.[service] as unknown as boolean;
		} else {
			return false;
		}
	}

	private initialiserYoutube(): void {
		this.cookiesService.addService('youtube');
	}
}
