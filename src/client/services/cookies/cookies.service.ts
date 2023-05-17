export interface CookiesService {
}

export class TarteAuCitronService implements CookiesService {
	public static CONSENT_MANAGER_COOKIE_NAME = 'consentement';
	constructor() {
		if (window?.tarteaucitron) {
			window.tarteaucitron.init({
				AcceptAllCta: true,
				DenyAllCta: true,
				adblocker: false,
				bodyPosition: 'bottom',
				closePopup: false,
				cookieName: TarteAuCitronService.CONSENT_MANAGER_COOKIE_NAME,
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
		}

	// 			if (window && window.tarteaucitron) {
		// 			window.tarteaucitron.init({
		// 				AcceptAllCta: true,
		// 				DenyAllCta: true,
		// 				adblocker: false,
		// 				bodyPosition: 'bottom',
		// 				closePopup: false,
		// 				cookieName: CONSENT_MANAGER_COOKIE_NAME,
		// 				cookieslist: true,
		// 				groupServices: false,
		// 				handleBrowserDNTRequest: false,
		// 				hashtag: '#tarteaucitron',
		// 				highPrivacy: true,
		// 				iconPosition: 'BottomLeft',
		// 				iconSrc: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAxQzE1LjMxMzcgMSAxOCAzLjY4NjI5IDE4IDdWOEgyMEMyMC41NTIzIDggMjEgOC40NDc3MiAyMSA5VjIxQzIxIDIxLjU1MjMgMjAuNTUyMyAyMiAyMCAyMkg0QzMuNDQ3NzIgMjIgMyAyMS41NTIzIDMgMjFWOUMzIDguNDQ3NzIgMy40NDc3MiA4IDQgOEg2VjdDNiAzLjY4NjI5IDguNjg2MjkgMSAxMiAxWk0xOSAxMEg2VjIwSDE5VjEwWk05IDE3VjE5SDdWMTdIOVpNOSAxNFYxNkg3VjE0SDlaTTkgMTFWMTNIN1YxMUg5Wk0xMiAzQzkuNzkwODYgMyA4IDQuNzkwODYgOCA3VjhIMTZWN0MxNiA0Ljc5MDg2IDE0LjIwOTEgMyAxMiAzWiIgZmlsbD0iIzAwMDA5MSIvPgo8L3N2Zz4K',
		// 				mandatory: true,
		// 				mandatoryCta: true,
		// 				moreInfoLink: true,
		// 				orientation: 'middle',
		// 				privacyUrl: '/confidentialite',
		// 				readmoreLink: '/confidentialite',
		// 				removeCredit: true,
		// 				serviceDefaultState: 'wait',
		// 				showAlertSmall: false,
		// 				showIcon: true,
		// 				useExternalCss: false,
		// 				useExternalJs: false,
		// 			});
		//
		// 			window.tarteaucitron.job = window.tarteaucitron.job || [];
	}
}
