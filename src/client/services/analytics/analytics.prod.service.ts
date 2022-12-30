/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AnalyticsService } from '~/client/services/analytics/analytics';

declare global {
  interface Window {
    ATInternet: any
    tarteaucitron: any
  }
}

const CONSENT_MANAGER_COOKIE_NAME = 'consentement';
const CONSENT_MANAGER_TRACKING_SERVICE = 'atinternet';

export class AnalyticsProdService implements AnalyticsService {
	private tag;

	constructor() {
		this.initCookieConsent();
		this.tag = this.initTagTracker();
	}

	private initTagTracker() {
		try {
			return new window.ATInternet.Tracker.Tag();
		} catch(e) {
			return {
				click: { send: () => ({}) },
				dispatch: () => ({}),
				page: { set: () => ({}) },
			};
		}
	}

	private initCookieConsent() {
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

		window.tarteaucitron.init({
			AcceptAllCta : true,
			DenyAllCta : true,
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
		window.tarteaucitron.job.push(CONSENT_MANAGER_TRACKING_SERVICE);
		window.tarteaucitron.user.atLibUrl = '/scripts/smarttag.js';
		window.tarteaucitron.user.atinternetSendData = false;
		window.tarteaucitron.user.atNoFallback = false;
	}

	sendPage(name: string): void {
		if(this.isCookieConsentAllowed(CONSENT_MANAGER_TRACKING_SERVICE)) {
			this.tag.page.set({ name });
			this.tag.dispatch();
		}
	}

	sendClick(action: string): void {
		if(this.isCookieConsentAllowed(CONSENT_MANAGER_TRACKING_SERVICE)) {
			this.tag.click.send({ name: action });
		}
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
