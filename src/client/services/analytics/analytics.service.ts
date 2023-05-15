/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PageTags, SITE_TAGS } from '~/client/services/analytics/analytics';

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

export class AnalyticsService {
	private readonly pushDatalayer: (datalayer: Array<string>) => void;

	constructor() {
		this.initialiserGestionnaireConsentementsCookie();
		this.pushDatalayer = this.initialiserEulerianAnalytics();

		this.initialiserAnalyticsCampagneDeCommunication();
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
			window.tarteaucitron.services[EULERIAN_ANALYTICS_SERVICE] = {
				cookies: ['etuix'],
				fallback: function () {
					this.js();
				},
				js: function () {
					'use strict';
					(function (x, w) {
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
				name: 'Tracking (services : Amnet, Seedtag, Yahoo, Snapchat, Meta, TikTok)',
				needConsent: true,
				type: 'analytic',
				uri: 'https://eulerian.com/vie-privee',
			};
			window.tarteaucitron.job.push(EULERIAN_ANALYTICS_SERVICE);
			return window.EA_push;
		} catch (e) {
			return fallbackPushDatalayer;
		}
	}

	private initialiserGestionnaireConsentementsCookie(): void {
		/**
		 * adblocker: Show a Warning if an adblocker is detected (true - false)
		 * AcceptAllCta: Show the accept all button when highPrivacy on (true - false)
		 * bodyPosition: bottom, or top to bring it as first element for accessibility
		 * cookieName: Cookie name…
		 * closePopup: Show a close X on the banner (true - false)
		 * cookieDomain: Shared cookie for multisite (.my-multisite-domaine.fr)
		 * cookieslist: Show the cookie list (true - false)
		 * DenyAllCta: Show the deny all button (true - false)
		 * groupServices: Group services by category (true - false)
		 * handleBrowserDNTRequest: If Do Not Track == 1, disallow all (true - false)
		 * hashtag: Open the panel with this hashtag
		 * highPrivacy: HIGHLY RECOMMENDED Disable auto consent (true - false)
		 * iconPosition: Icon position… (BottomLeft - BottomRight - BottomLeft - TopRight - TopLeft)
		 * iconSrc: URL or base64 encoded image (optional)
		 * mandatory: Show a message about mandatory cookies
		 * mandatoryCta: Show the disabled accept button when mandatory on
		 * moreInfoLink: Show more info link (true - false)
		 * orientation: Banner position (top - middle - bottom)
		 * privacyUrl: Privacy policy url
		 * readmoreLink: Change the default readmore link ("/confidentialite")
		 * removeCredit: Remove credit link (true - false)
		 * serviceDefaultState Default state (true - wait - false)
		 * showAlertSmall: Show the small banner on bottom right (true - false)
		 * showIcon: Show cookie icon to manage cookies (true - false)
		 * useExternalCss: If false, the tarteaucitron.css file will be loaded
		 * useExternalJs: If false, the tarteaucitron.js file will be loaded
		 * */

		if (window && window.tarteaucitron) {
			window.tarteaucitron.init({
				AcceptAllCta: true,
				DenyAllCta: true,
				adblocker: false,
				bodyPosition: 'bottom',
				closePopup: false,
				cookieName: CONSENT_MANAGER_COOKIE_NAME,
				cookieslist: true,
				groupServices: false,
				handleBrowserDNTRequest: false,
				hashtag: '#tarteaucitron',
				highPrivacy: true,
				iconPosition: 'BottomLeft',
				iconSrc: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAxQzE1LjMxMzcgMSAxOCAzLjY4NjI5IDE4IDdWOEgyMEMyMC41NTIzIDggMjEgOC40NDc3MiAyMSA5VjIxQzIxIDIxLjU1MjMgMjAuNTUyMyAyMiAyMCAyMkg0QzMuNDQ3NzIgMjIgMyAyMS41NTIzIDMgMjFWOUMzIDguNDQ3NzIgMy40NDc3MiA4IDQgOEg2VjdDNiAzLjY4NjI5IDguNjg2MjkgMSAxMiAxWk0xOSAxMEg2VjIwSDE5VjEwWk05IDE3VjE5SDdWMTdIOVpNOSAxNFYxNkg3VjE0SDlaTTkgMTFWMTNIN1YxMUg5Wk0xMiAzQzkuNzkwODYgMyA4IDQuNzkwODYgOCA3VjhIMTZWN0MxNiA0Ljc5MDg2IDE0LjIwOTEgMyAxMiAzWiIgZmlsbD0iIzAwMDA5MSIvPgo8L3N2Zz4K',
				mandatory: true,
				mandatoryCta: true,
				moreInfoLink: true,
				orientation: 'middle',
				privacyUrl: '/confidentialite',
				readmoreLink: '/confidentialite',
				removeCredit: true,
				serviceDefaultState: 'wait',
				showAlertSmall: false,
				showIcon: true,
				useExternalCss: false,
				useExternalJs: false,
			});

			window.tarteaucitron.job = window.tarteaucitron.job || [];
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

	private isConsentementCookieAutorisé(service: string): boolean {
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
}
