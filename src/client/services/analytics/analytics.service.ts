/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PAGE_TAGS_CONFIG, PageTagsConfig, SITE_TAGS } from '~/client/services/analytics/analytics';

declare global {
	interface Window {
		tarteaucitron: any

		__eaGenericCmpApi(f: any): void

		EA_push(tags: 'event' | Array<string>, eventList?: Array<string>): void
	}
}

const CONSENT_MANAGER_COOKIE_NAME = 'consentement';
const EULERIAN_ANALYTICS_SERVICE = 'eulerian';

export class AnalyticsService {
	private readonly pushDatalayer;

	constructor() {
		this.initCookieConsent();
		this.pushDatalayer = this.initEulerianAnalytics();
	}

	private initEulerianAnalytics(): (datalayer: Array<string>) => void {
		const fallbackPushDatalayer = () => ({});
		if (!this.isEulerianAnalyticsActive()) {
			return fallbackPushDatalayer;
		}

		try {
			// Voir https://eulerian.wiki/doku.php?id=fr:modules:collect:gdpr:tarteaucitron
			window.tarteaucitron.services.eulerian = {
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
				key: 'eulerian',
				name: 'Eulerian Analytics',
				needConsent: true,
				type: 'analytic',
				uri: 'https://eulerian.com/vie-privee',
			};
			window.tarteaucitron.job.push('eulerian');
			return window.EA_push;
		} catch (e) {
			return fallbackPushDatalayer;
		}
	}

	private initCookieConsent(): void {
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
				serviceDefaultState: true,
				showAlertSmall: false,
				showIcon: true,
				useExternalCss: false,
				useExternalJs: false,
			});

			window.tarteaucitron.job = window.tarteaucitron.job || [];
		}
	}

	trackPageView(pageKey: keyof PageTagsConfig): void {
		this.trackEulerianPageView(pageKey);
	}

	private trackEulerianPageView(pageKey: keyof PageTagsConfig): void {
		if (this.isCookieConsentAllowed(EULERIAN_ANALYTICS_SERVICE)) {
			const datalayer: Array<string> = [];
			Object.entries(SITE_TAGS).forEach(([key, value]) => {
				datalayer.push(key, value);
			});
			Object.entries(PAGE_TAGS_CONFIG[pageKey]).forEach(([key, value]) => {
				datalayer.push(key, value);
			});
			this.pushDatalayer(datalayer);
		}
	}

	private isEulerianAnalyticsActive(): boolean {
		return process.env.NEXT_PUBLIC_ANALYTICS_EULERIAN_FEATURE === '1';
	}

	private isCookieConsentAllowed(service: string): boolean {
		const filteredConsentementCookieParts = document.cookie.match(new RegExp('(^| )' + CONSENT_MANAGER_COOKIE_NAME + '=([^;]+)'));
		if (filteredConsentementCookieParts) {
			const consentementCookieValue: string = filteredConsentementCookieParts[2];
			return consentementCookieValue?.split('!')
				?.reduce((acc: Record<string, unknown>, entry: string) => {
					const [key, value]: string[] = entry.split('=');
					return { ...acc, [key]: value !== 'false' };
				}, {})?.[service] as unknown as boolean;
		} else {
			return false;
		}
	}
}
