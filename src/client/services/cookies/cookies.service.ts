export type Environment = {
	tarteaucitron: {
		init: (config: unknown) => void;
		job: unknown[]
	}
}

export interface CookieService {
	isCookieAccepted(nom: string): boolean;
	// FIXME (GAFI 10-05-2023): fix le typage de la config
	addCookie(nom: string, config: unknown): void;
}

export class TarteAuCitronService implements CookieService {
	public static readonly CONSENT_MANAGER_COOKIE_NAME = 'consentement';

	private static readonly defaultConfig = {
		AcceptAllCta: true,
		DenyAllCta: true,
		adblocker: false,
		bodyPosition: 'bottom',
		closePopup: false,
		cookieName: this.CONSENT_MANAGER_COOKIE_NAME,
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
	};
  
	constructor(config = TarteAuCitronService.defaultConfig, environment: Environment = window) {
		if (environment && environment.tarteaucitron) {
			environment.tarteaucitron.init(config);
			environment.tarteaucitron.job = environment.tarteaucitron.job || [];
		}
	}

	isCookieAccepted(nom: string): boolean {
		const filteredConsentementCookieParts = document.cookie.match(new RegExp('(^| )' + TarteAuCitronService.CONSENT_MANAGER_COOKIE_NAME + '=([^;]+)'));
		if (filteredConsentementCookieParts) {
			const consentementCookieValue: string = filteredConsentementCookieParts[2];
			return consentementCookieValue?.split('!')
				?.reduce((consentements: Record<string, unknown>, consentementCourant: string) => {
					const [key, value]: string[] = consentementCourant.split('=');
					return { ...consentements, [key]: value !== 'false' };
				}, {})?.[nom] as unknown as boolean;
		} else {
			return false;
		}
	}

	addCookie(nom: string, config: unknown) {
		window.tarteaucitron.services[nom] = config;
		window.tarteaucitron.job.push(nom);
	}
}
